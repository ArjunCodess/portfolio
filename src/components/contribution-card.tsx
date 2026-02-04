import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  href: string;
  date: string;
}

export function ContributionCard({ title, description, href, date }: Props) {
  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-all">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm truncate">{title}</span>
          <Badge variant="outline" className="text-[10px] shrink-0">
            {date}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {description}
        </p>
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-0.5 text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ExternalLink className="size-4" />
      </Link>
    </div>
  );
}
