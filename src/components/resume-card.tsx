"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import Markdown from "react-markdown";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  return (
    <Card className="flex">
      <div className="flex-none">
        <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow ml-4 items-center flex-col group">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-1 gap-x-2 text-base">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-2 min-w-0">
              <h3 className="font-semibold leading-none text-xs sm:text-sm">
                {title}
              </h3>
              {badges && (
                <div className="flex flex-wrap gap-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground sm:text-right shrink-0">
              {period}
            </div>
          </div>
          {subtitle && <div className="font-sans text-xs mt-1">{subtitle}</div>}
        </CardHeader>
        {description && (
          <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
            <Markdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 dark:text-blue-400 underline cursor-pointer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {description}
            </Markdown>
          </div>
        )}
      </div>
    </Card>
  );
};
