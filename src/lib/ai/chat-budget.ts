import { createHash } from "node:crypto";
import { sql } from "@/lib/db";
import { ChatLimitError } from "./chat-policy";

async function reserve(key: string, limit: number, expires: string) {
  const { rows } = await sql`
    INSERT INTO portfolio_chat_budget (key, attempts, expires_at)
    VALUES (${key}, 1, ${expires}::timestamptz)
    ON CONFLICT (key) DO UPDATE SET attempts = portfolio_chat_budget.attempts + 1
    WHERE portfolio_chat_budget.attempts < ${limit}
    RETURNING attempts
  `;
  if (!rows.length)
    throw new ChatLimitError(
      "Chat limit reached. Please try again later or contact Arjun directly.",
    );
}

export async function reserveChatBudget(req: Request) {
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
  await reserve(`visitor:${identity}:${minute}`, 5, expires);
  await reserve(`visitor:${identity}:${day}`, 20, expires);
  // Conservative defaults. Align with this project's actual AI Studio quotas.
  const rpm = Math.max(1, Number(process.env.CHAT_RPM_LIMIT) || 8);
  const rpd = Math.max(1, Number(process.env.CHAT_DAILY_LIMIT) || 100);
  await reserve(`global:minute:${minute}`, rpm, expires);
  await reserve(`global:day:${day}`, rpd, expires);
}
