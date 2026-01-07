"use client";

import { useState, useTransition } from "react";
import { deleteGuestbookEntry } from "@/actions/guestbook";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface GuestbookEntryCardProps {
  entry: {
    id: number;
    created_by: string | null;
    created_at: string | Date | null;
    body: string;
  };
  canDelete: boolean;
}

export default function GuestbookEntryCard({
  entry,
  canDelete,
}: GuestbookEntryCardProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        await deleteGuestbookEntry(entry.id);
        setOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete entry");
      }
    });
  };

  return (
    <Card>
      <CardContent className="py-4">
        <div className="space-y-1">
          <div className="text-sm flex items-center gap-2 flex-wrap justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-neutral-800 dark:text-neutral-100">
                {entry.created_by || "Anonymous"}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {dayjs(entry.created_at?.toString()).fromNow()}
              </span>
            </div>
            {canDelete && (
              <div className="flex items-center gap-2">
                {error && (
                  <span className="text-xs text-destructive">{error}</span>
                )}
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={isPending}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete message?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Your message will be permanently removed from the guestbook.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isPending ? "Removing..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 break-words">
            {entry.body}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
