import { sql } from "@vercel/postgres";
import dayjs from "dayjs";

export default async function GuestbookEntries() {
  const { rows } =
    await sql`SELECT * from "Guestbook" ORDER BY last_modified DESC;`;

  return rows.map((entry) => (
    <div
      key={entry.id}
      className="flex flex-col space-y-1 mb-8"
      suppressHydrationWarning
    >
      <div className="w-full text-base md:text-md break-words">
        <span className="text-neutral-800 dark:text-neutral-300 mr-1">
          {entry.created_by}:
        </span>

        {entry.body}
      </div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">
        {dayjs(entry.created_at.toString()).format("MMM D, YYYY h:mm A")}
      </div>
    </div>
  ));
}
