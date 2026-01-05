"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function ChatTrigger() {
  const { open, toggleSidebar } = useSidebar();

  if (open) return null;

  return (
    <Button
      onClick={toggleSidebar}
      size="icon"
      className={cn(
        "size-14 rounded-full fixed z-50 shadow-xl",
        "bottom-20 right-4 md:bottom-4 md:right-4",
      )}
      aria-label="Open chat"
    >
      <MessageCircle className="size-4" />
    </Button>
  );
}
