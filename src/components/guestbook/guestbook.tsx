import { SignIn, SignOut } from "@/components/guestbook/custom-buttons";
import { auth } from "@/lib/auth";
import GuestbookForm from "./guestbook-form";

export default async function Guestbook() {
  const session = await auth();

  return session ? (
    <>
      <GuestbookForm />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}
