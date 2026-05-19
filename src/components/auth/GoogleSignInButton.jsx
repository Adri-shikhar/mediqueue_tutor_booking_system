"use client";

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/app/lib/auth-client";

export default function GoogleSignInButton({
  label = "Continue with Google",
  callbackURL = "/",
}) {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2f4aa5]/40 hover:bg-[#eef7ff] hover:text-[#2f4aa5] hover:shadow-md"
    >
      <FcGoogle className="h-5 w-5" aria-hidden />
      {label}
    </button>
  );
}
