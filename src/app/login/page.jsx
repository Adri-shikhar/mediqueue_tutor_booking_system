"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import MqButton from "@/components/flowbite/MqButton";
import MqCard from "@/components/flowbite/MqCard";
import FadeIn from "@/components/motion/FadeIn";

function safeCallbackUrl(raw) {
  if (!raw || typeof raw !== "string") return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.info(
      "Password reset is not available during review. Contact your instructor if needed."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);

    const { data, error } = await authClient.signIn.email({
      email: formDataObject.email,
      password: formDataObject.password,
    });

    if (error) {
      toast.error(error.message || "Login failed. Check your email and password.");
      return;
    }

    if (data) {
      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <FadeIn>
        <h1 className="text-center text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
          Login
        </h1>
      </FadeIn>

      {user ? (
        <p className="mx-auto mt-6 max-w-md text-center text-slate-600 dark:text-slate-400">
          You are already signed in.{" "}
          <Link
            href="/My_Booked_Sessions"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Go to my booked sessions
          </Link>
        </p>
      ) : null}

      <div className="mx-auto mt-10 max-w-md space-y-4">
        <GoogleSignInButton label="Sign in with Google" callbackURL={callbackUrl} />

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-slate-300" />
          <span className="mx-4 shrink text-xs font-medium uppercase text-slate-500">
            or
          </span>
          <div className="grow border-t border-slate-300" />
        </div>
      </div>

      <FadeIn delay={0.1}>
      <MqCard className="mx-auto max-w-md !p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-[#2f4aa5] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Enter your password"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
        </div>

        <MqButton type="submit" className="w-full">
          Sign in
        </MqButton>
      </form>
      </MqCard>
      </FadeIn>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#2f4aa5] hover:underline"
        >
          Register
        </Link>
      </p>
    </main>
  );
}
