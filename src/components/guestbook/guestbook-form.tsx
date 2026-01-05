"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import BlurFade from "../magicui/blur-fade";
import { saveGuestbookEntry } from "@/actions/guestbook";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const BLUR_FADE_DELAY = 0.04;

export default function GuestbookForm() {
  const formRef = useRef(null);
  const { pending } = useFormStatus();

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 5}>
      <form
        action={async (formData) => await saveGuestbookEntry(formData)}
        className="flex w-full items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Your message"
          aria-label="Your message"
          required
          disabled={pending}
          name="entry"
          className="w-3/4"
        />
        <Button type="submit" disabled={pending} className="w-1/4">
          Submit
        </Button>
      </form>
    </BlurFade>
  );
}
