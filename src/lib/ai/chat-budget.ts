import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { ChatLimitError } from "./chat-policy";

async function reserve(
  key: string,
  limit: number,
  expires: string,
  signal: AbortSignal,
  retryAfter: number,
) {
  if (!process.env.POSTGRES_URL)
    throw new Error("POSTGRES_URL is required for chat budgets");
  const sql = neon(process.env.POSTGRES_URL, {
    fetchOptions: {
      signal: AbortSignal.any([signal, AbortSignal.timeout(2500)]),
    },
  });
  const rows = await sql`
    INSERT INTO portfolio_chat_budget (key, attempts, expires_at)
    VALUES (${key}, 1, ${expires}::timestamptz)
    ON CONFLICT (key) DO UPDATE SET attempts = portfolio_chat_budget.attempts + 1
    WHERE portfolio_chat_budget.attempts < ${limit}
    RETURNING attempts
  `;
  if (!rows.length)
    throw new ChatLimitError(
      retryAfter > 60
        ? "Today's chat limit has been reached. Please try again tomorrow."
        : "Too many questions at once. Please wait a minute and try again.",
      retryAfter,
    );
}

export async function reserveChatBudget(req: Request, signal: AbortSignal) {
  const now = Date.now();
  // Vercel overwrites this header at the edge; do not trust arbitrary x-forwarded-for.
  const ip = process.env.VERCEL
    ? req.headers.get("x-vercel-forwarded-for") || "unknown"
    : "local";
  const identity = createHash("sha256")
    .update(`${ip}:${Math.floor(now / 86_400_000)}`)
    .digest("hex")
    .slice(0, 32);
  const minute = Math.floor(now / 60_000);
  const day = Math.floor(now / 86_400_000);
  const expires = new Date(now + 2 * 86_400_000).toISOString();
  const minuteReset = Math.ceil(((minute + 1) * 60_000 - now) / 1000);
  const dayReset = Math.ceil(((day + 1) * 86_400_000 - now) / 1000);
  await reserve(
    `visitor:${identity}:${minute}`,
    5,
    expires,
    signal,
    minuteReset,
  );
  await reserve(`visitor:${identity}:${day}`, 20, expires, signal, dayReset);
  // Conservative defaults. Align with Groq's token and request quotas.
  const rpm = Math.max(1, Number(process.env.CHAT_RPM_LIMIT) || 8);
  const rpd = Math.max(1, Number(process.env.CHAT_DAILY_LIMIT) || 100);
  await reserve(`global:minute:${minute}`, rpm, expires, signal, minuteReset);
  await reserve(`global:day:${day}`, rpd, expires, signal, dayReset);
}
