"use client";

import { useState, useRef, useTransition } from "react";
import { saveGuestbookEntry } from "@/actions/guestbook";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const MAX_CHARS = 500;

export default function GuestbookForm() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const charCount = message.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isEmpty = charCount === 0;

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await saveGuestbookEntry(formData);
      setMessage("");
      formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          name="entry"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isPending}
          required
          rows={3}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${
            isOverLimit
              ? "text-red-500"
              : charCount > MAX_CHARS * 0.8
                ? "text-yellow-500"
                : "text-muted-foreground"
          }`}
        >
          {charCount}/{MAX_CHARS}
        </span>

        <Button
          type="submit"
          disabled={isPending || isOverLimit || isEmpty}
          size="sm"
        >
          <Send className="size-4" />
          {isPending ? "Posting..." : "Post Message"}
        </Button>
      </div>
    </form>
  );
}
