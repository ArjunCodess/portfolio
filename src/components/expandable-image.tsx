"use client";

// Aceternity UI expandable card pattern: the card, image, title, and subtitle
// share layout IDs between the grid and expanded states. Radix adds focus
// trapping, Escape/outside dismissal, scroll locking, and focus restoration.
// Reference: https://ui.aceternity.com/components/expandable-card
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExpandableImageProps = {
  src: string;
  title: string;
  description?: string;
  content?: string;
  className?: string;
  hideCaption?: boolean;
};

export function ExpandableImage({
  src,
  title,
  description,
  content,
  className,
  hideCaption = false,
}: ExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const sharedId = (part: string) =>
    reducedMotion ? undefined : `${part}-${id}`;
  const transition = {
    duration: reducedMotion ? 0 : 0.3,
    ease: "easeInOut" as const,
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          layoutId={sharedId("card")}
          transition={transition}
          type="button"
          aria-label={`Expand ${title}`}
          className={cn(
            "group flex h-full w-full flex-col rounded-xl border bg-card p-3 text-left transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4",
            className,
          )}
        >
          <motion.div
            layoutId={sharedId("image")}
            transition={transition}
            className="w-full"
          >
            <Image
              src={src}
              alt={title}
              width={900}
              height={650}
              sizes="(max-width: 640px) 90vw, 340px"
              className="h-36 w-full rounded-md object-contain"
            />
          </motion.div>
          <motion.span
            layoutId={sharedId("title")}
            transition={transition}
            className={cn(
              hideCaption
                ? "sr-only"
                : "mt-3 flex w-full items-center justify-between gap-3 text-sm font-medium",
            )}
          >
            {title}
            <Maximize2
              aria-hidden="true"
              className="size-3 shrink-0 text-muted-foreground"
            />
          </motion.span>
          {description && !hideCaption && (
            <motion.span
              layoutId={sharedId("description")}
              transition={transition}
              className="mt-1 block text-xs text-muted-foreground"
            >
              {description}
            </motion.span>
          )}
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <div key="expanded" className="fixed inset-0 z-[60]">
              <Dialog.Overlay forceMount asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="absolute inset-0 bg-black/50"
                />
              </Dialog.Overlay>
              <div className="pointer-events-none absolute inset-0 grid place-items-center p-4">
                <Dialog.Content forceMount asChild>
                  <motion.div
                    layoutId={sharedId("card")}
                    layoutRoot
                    transition={transition}
                    className="pointer-events-auto relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-y-auto rounded-xl border bg-background p-5 sm:p-6"
                  >
                    <Dialog.Close
                      aria-label="Close image"
                      className="absolute right-3 top-3 z-10 rounded-full bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2"
                    >
                      <X className="size-4" />
                    </Dialog.Close>
                    <motion.div
                      layoutId={sharedId("image")}
                      transition={transition}
                      className="mx-auto w-full max-w-sm"
                    >
                      <Image
                        src={src}
                        alt={title}
                        width={900}
                        height={650}
                        sizes="(max-width: 480px) 80vw, 384px"
                        className="h-44 w-full rounded-md object-contain sm:h-52"
                      />
                    </motion.div>
                    <div className="mt-5 flex flex-col gap-1">
                      <Dialog.Title asChild>
                        <motion.h3
                          layoutId={sharedId("title")}
                          transition={transition}
                          className="pr-4 text-base font-semibold"
                        >
                          {title}
                        </motion.h3>
                      </Dialog.Title>
                      {description && (
                        <motion.p
                          layoutId={sharedId("description")}
                          transition={transition}
                          className="text-xs text-muted-foreground"
                        >
                          {description}
                        </motion.p>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        ...transition,
                        delay: reducedMotion ? 0 : 0.1,
                      }}
                    >
                      <Dialog.Description className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {content ||
                          "Project screenshot. Open the original image to view it at full resolution."}
                      </Dialog.Description>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-9 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        Open original image
                      </a>
                    </motion.div>
                  </motion.div>
                </Dialog.Content>
              </div>
            </div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
