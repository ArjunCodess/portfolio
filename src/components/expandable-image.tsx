"use client";

// Adapted from Aceternity UI's expandable card. Radix adds focus trapping,
// Escape, outside clicks, and focus restoration to the shared-layout animation.
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useId } from "react";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExpandableImage({
  src,
  title,
  description,
  className,
  hideCaption = false,
}: {
  src: string;
  title: string;
  description?: string;
  className?: string;
  hideCaption?: boolean;
}) {
  const id = useId();
  const reducedMotion = useReducedMotion();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Expand ${title}`}
          className={cn(
            "group w-full rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4",
            className,
          )}
        >
          <motion.div layoutId={reducedMotion ? undefined : `image-${id}`}>
            <Image
              src={src}
              alt={title}
              width={900}
              height={650}
              sizes="(max-width: 640px) 90vw, 350px"
              className="h-40 w-full rounded-md object-contain"
            />
          </motion.div>
          <span
            className={cn(
              hideCaption
                ? "sr-only"
                : "mt-3 flex items-center justify-between gap-3 text-sm font-medium",
            )}
          >
            {title}
            <Maximize2
              aria-hidden="true"
              className="size-3 text-muted-foreground"
            />
          </span>
          {description && (
            <span className="mt-1 block text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border bg-background p-4 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-semibold">{title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                {description ||
                  "Certificate preview. Open the original for full resolution."}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="rounded-md p-2 hover:bg-muted focus-visible:outline-2"
              aria-label="Close image"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <motion.div
            layoutId={reducedMotion ? undefined : `image-${id}`}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={src}
              alt={title}
              width={1600}
              height={1150}
              sizes="90vw"
              className="max-h-[65dvh] w-full object-contain"
            />
          </motion.div>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm underline underline-offset-4"
          >
            Open original image
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
