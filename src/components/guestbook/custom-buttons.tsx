"use client";

import { signIn, signOut } from "next-auth/react";
import ShinyButton from "../magicui/shiny-button";

export function SignOut() {
  return (
    <div
      onClick={() => signOut()}
      className="mb-10 mt-7"
      suppressHydrationWarning
    >
      <ShinyButton text="Sign Out" />
    </div>
  );
}

export function SignIn() {
  return (
    <div
      onClick={() => signIn("github")}
      className="mb-10"
      suppressHydrationWarning
    >
      <ShinyButton text="Sign in with GitHub" />
    </div>
  );
}
