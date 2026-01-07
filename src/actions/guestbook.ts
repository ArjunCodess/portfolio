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

export async function deleteGuestbookEntry(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorised");

  const userEmail = session.user?.email as string;
  if (!userEmail) throw new Error("Unauthorised");

  const { rows } = await sql`SELECT email FROM "Guestbook" WHERE id = ${id};`;
  
  if (rows.length === 0) {
    throw new Error("Entry not found");
  }

  if (rows[0].email !== userEmail) {
    throw new Error("Unauthorised: You can only delete your own entries");
  }

  await sql`DELETE FROM "Guestbook" WHERE id = ${id};`;

  revalidatePath("/guestbook");
}
