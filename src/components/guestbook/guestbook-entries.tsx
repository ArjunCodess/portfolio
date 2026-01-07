import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlurFade from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import GuestbookEntryCard from "./guestbook-entry-card";
import { getGuestbookEntries } from "@/actions/guestbook";

dayjs.extend(relativeTime);

const BLUR_FADE_DELAY = 0.04;

interface GuestbookEntriesProps {
  session: {
    user?: {
      email?: string | null;
    };
  } | null;
}

export default async function GuestbookEntries({ session }: GuestbookEntriesProps) {
  const rows = await getGuestbookEntries();

  const userEmail = session?.user?.email;

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
        {rows.map((entry, index) => {
          const canDelete = Boolean(userEmail && entry.email === userEmail);
          
          return (
            <BlurFade
              key={entry.id}
              delay={BLUR_FADE_DELAY * 5 + index * 0.05}
              inView
            >
              <GuestbookEntryCard
                entry={{
                  id: entry.id as number,
                  created_by: entry.created_by as string | null,
                  created_at: entry.created_at as string | Date | null,
                  body: entry.body as string,
                }}
                canDelete={canDelete}
              />
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
