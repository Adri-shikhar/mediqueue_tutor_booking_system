"use client";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
export default function LoginPage() {
  const {data:session,error:sessionError}=authClient.useSession();
  const user=session?.user;
  
  if (sessionError) {
    console.error(sessionError);
  }
  if (session) {
    console.log(session);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    const {data,error}=await authClient.signIn.email({
      email: formDataObject.email,
      password: formDataObject.password,
    });
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  };
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-center text-[#2f4aa5]">Login</h1>

      <div className="mx-auto mt-10 max-w-md space-y-4">
        <GoogleSignInButton label="Sign in with Google" />

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-slate-300" />
          <span className="mx-4 shrink text-xs font-medium uppercase text-slate-500">
            or
          </span>
          <div className="grow border-t border-slate-300" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Enter your password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-[#2f4aa5] hover:underline">
          Register
        </Link>
      </p>
    </main>
  );
}
