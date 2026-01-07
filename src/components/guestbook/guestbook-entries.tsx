import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlurFade from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

dayjs.extend(relativeTime);

const BLUR_FADE_DELAY = 0.04;

export default async function GuestbookEntries() {
  const { rows } =
    await sql`SELECT * from "Guestbook" ORDER BY last_modified DESC;`;

  if (rows.length === 0) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-3">
          <MessageSquare className="size-10 text-muted-foreground" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs text-muted-foreground">
              Be the first to leave a message!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        {rows.length} {rows.length === 1 ? "message" : "messages"}
      </h3>

      <div className="space-y-3">
        {rows.map((entry, index) => (
          <BlurFade
            key={entry.id}
            delay={BLUR_FADE_DELAY * 5 + index * 0.05}
            inView
          >
            <Card>
              <CardContent className="py-4">
                <div className="space-y-1">
                  <div className="text-sm flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {entry.created_by || "Anonymous"}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {dayjs(entry.created_at?.toString()).fromNow()}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 break-words">
                    {entry.body}
                  </p>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
