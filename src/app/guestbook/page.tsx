import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import GuestbookEntries from "@/components/guestbook/guestbook-entries";
import Guestbook from "@/components/guestbook/guestbook";
import Loader from "@/components/loader";
import { SectionHeader } from "@/components/section-header";
import { auth } from "@/lib/auth";

const BLUR_FADE_DELAY = 0.04;

export default async function GuestbookPage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center min-h-[100dvh] space-y-10">
      <section className="mx-auto w-full max-w-2xl space-y-8 py-8">
        <SectionHeader
          badge="Guestbook"
          title="Sign My Guestbook"
          description="Leave a message, share your thoughts, or just say hello! Sign in with GitHub to join the conversation."
          delay={BLUR_FADE_DELAY}
        />

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Suspense fallback={<Loader />}>
            <div className="space-y-8">
              <Guestbook session={session} />
              <GuestbookEntries />
            </div>
          </Suspense>
        </BlurFade>
      </section>
    </main>
  );
}
