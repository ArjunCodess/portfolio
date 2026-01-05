import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import GuestbookEntries from "@/components/guestbook/guestbook-entries";
import Guestbook from "@/components/guestbook/guestbook";
import Loader from "@/components/loader";

const BLUR_FADE_DELAY = 0.04;

export default function page() {
  return (
    <main
      className="flex flex-col items-center space-y-10"
      suppressHydrationWarning
    >
      <section
        id="guestbook-intro"
        className="mx-auto w-full max-w-2xl space-y-8"
      >
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h2 className="text-3xl font-bold">Sign My Guestbook</h2>
        </BlurFade>
      </section>

      <section className="mx-auto w-full max-w-2xl space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Suspense fallback={<Loader />}>
            <Guestbook />
            <GuestbookEntries />
          </Suspense>
        </BlurFade>
      </section>
    </main>
  );
}
