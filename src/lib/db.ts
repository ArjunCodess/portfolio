import { neon } from "@neondatabase/serverless";

// Importing shared UI utilities must not initialize a database connection.
export async function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is required for the guestbook");
  const rows = await neon(url)(strings, ...values);
  return { rows };
}
