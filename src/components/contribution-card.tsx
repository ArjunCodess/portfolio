import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ContributionCard({
  title,
  description,
  href,
  date,
}: {
  title: string;
  description: string;
  href: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="min-w-0 flex-1 leading-relaxed">
        <span className="font-medium text-foreground">{title}</span>
        <span aria-hidden="true" className="mx-2 text-muted-foreground">
          /
        </span>
        <span className="text-muted-foreground">{description}</span>
      </span>
      <span className="hidden shrink-0 text-muted-foreground sm:inline">
        {date}
      </span>
      <ExternalLink
        aria-hidden="true"
        className="size-3 shrink-0 text-muted-foreground"
      />
    </Link>
  );
}
