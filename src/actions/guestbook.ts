"use server";

import { auth } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function saveGuestbookEntry(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorised");

  const email = session.user?.email as string;
  const created_by = session.user?.name as string;

  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await sql`INSERT INTO "Guestbook" (email, created_by, body, last_modified) VALUES (${email}, ${created_by}, ${body}, ${new Date().toISOString()});`;

  revalidatePath("/");
}
