"use client";

import { signIn, signOut } from "next-auth/react";
import GuestbookForm from "./guestbook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LogOut } from "lucide-react";

interface GuestbookProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

export default function Guestbook({ session }: GuestbookProps) {
  if (!session) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center">
            Sign in to leave your mark in the guestbook
          </p>
          <Button onClick={() => signIn("github")} className="gap-2">
            <Icons.github className="size-4" />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              {session.user?.name || "Anonymous"}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Signed in with GitHub
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <GuestbookForm />
      </CardContent>
    </Card>
  );
}
