import dotenv from "dotenv";
import { sql } from "../src/lib/db";
dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  await sql`CREATE TABLE IF NOT EXISTS portfolio_chat_budget (
  key text PRIMARY KEY, attempts integer NOT NULL, expires_at timestamptz NOT NULL
)`;
  await sql`DELETE FROM portfolio_chat_budget WHERE expires_at < NOW()`;
  console.log(
    "Chat budget table is ready. Existing guestbook and vector data are unchanged.",
  );
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Operation failed");
  process.exitCode = 1;
});
