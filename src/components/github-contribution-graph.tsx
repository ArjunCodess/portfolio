"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import BlurFade from "@/components/magicui/blur-fade";

interface GitHubContributionGraphProps {
  username: string;
}

const GITHUB_CALENDAR_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GitHubContributionGraph({
  username,
}: GitHubContributionGraphProps) {
  const { resolvedTheme } = useTheme();

  return (
    <BlurFade delay={0.04 * 4.75}>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme as "light" | "dark"}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
          theme={GITHUB_CALENDAR_THEME}
        />
      </div>
    </BlurFade>
  );
}
