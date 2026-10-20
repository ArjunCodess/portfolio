import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { ChatLimitError } from "./chat-policy";

function quota(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 && parsed <= 2_147_483_647
    ? parsed
    : fallback;
}

export async function reserveChatBudget(req: Request, signal: AbortSignal) {
  signal.throwIfAborted();
  if (!process.env.POSTGRES_URL)
    throw new Error("POSTGRES_URL is required for chat budgets");
  const now = Date.now();
  // vercel overwrites this header at the edge.
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
  const limits = [
    { key: `visitor:${identity}:${minute}`, limit: 5, retry: minuteReset },
    { key: `visitor:${identity}:${day}`, limit: 20, retry: dayReset },
    {
      key: `global:minute:${minute}`,
      limit: quota(process.env.CHAT_RPM_LIMIT, 8),
      retry: minuteReset,
    },
    {
      key: `global:day:${day}`,
      limit: quota(process.env.CHAT_DAILY_LIMIT, 100),
      retry: dayReset,
    },
  ];
  const sql = neon(process.env.POSTGRES_URL, {
    fetchOptions: {
      signal: AbortSignal.any([signal, AbortSignal.timeout(2500)]),
    },
  });
  const ceilings = JSON.stringify(
    Object.fromEntries(limits.map(({ key, limit }) => [key, limit])),
  );
  // consistent lock order avoids deadlocks across simultaneous visitors.
  const rows = await sql`
    INSERT INTO portfolio_chat_budget (key, attempts, expires_at)
    SELECT key, 1, ${expires}::timestamptz
    FROM jsonb_each_text(${ceilings}::jsonb) ORDER BY key
    ON CONFLICT (key) DO UPDATE SET attempts = portfolio_chat_budget.attempts + 1
    WHERE portfolio_chat_budget.attempts < (${ceilings}::jsonb ->> portfolio_chat_budget.key)::int
    RETURNING key
  `;
  const reserved = new Set(rows.map((row) => row.key));
  const denied = limits.filter(({ key }) => !reserved.has(key));
  if (denied.length) {
    const retryAfter = Math.max(...denied.map(({ retry }) => retry));
    throw new ChatLimitError(
      "chat limit reached. please try again later.",
      retryAfter,
    );
  }
}
