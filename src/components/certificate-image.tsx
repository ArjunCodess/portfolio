import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogImage,
  DialogContainer,
} from "@/components/motion-primitives/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export default function CertificateImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: object;
}) {
  return (
    <Dialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <DialogTrigger>
        <DialogImage
          src={src}
          alt={alt}
          className={cn("max-w-xs", className)}
          style={style}
        />
      </DialogTrigger>
      <DialogContainer>
        <DialogContent className="relative -mt-8 lg:-mt-12">
          <DialogImage
            src={src}
            alt={alt}
            className="h-auto w-full max-w-[90vw] object-cover lg:h-[80vh]"
          />
        </DialogContent>
        <DialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </DialogClose>
      </DialogContainer>
    </Dialog>
  );
}
