"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LogOut } from "lucide-react";

export function SignInButton() {
  return (
    <Button onClick={() => signIn("github")} className="gap-2">
      <Icons.github className="size-4" />
      Sign in with GitHub
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut()}
      className="text-muted-foreground hover:text-foreground"
    >
      <LogOut className="size-4" />
      Sign out
    </Button>
  );
}
