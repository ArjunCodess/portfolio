import BlurFade from "@/components/magicui/blur-fade";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function SectionHeader({ badge, title, description, delay = BLUR_FADE_DELAY * 11 }: SectionHeaderProps) {
  return (
    <BlurFade delay={delay}>
      <div className="flex flex-col items-center justify-center space-y-3 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs">
            {badge}
          </div>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </BlurFade>
  );
}
