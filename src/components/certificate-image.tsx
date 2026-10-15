import { ExpandableImage } from "@/components/expandable-image";

export default function CertificateImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <ExpandableImage src={src} title={alt} className={className} />;
}
