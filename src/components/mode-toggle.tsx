"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2 rounded-full size-12"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="size-4 text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden size-4 text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
