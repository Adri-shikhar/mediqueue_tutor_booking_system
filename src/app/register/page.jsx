"use client";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
export default function RegisterPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);
    const {data,error}=await authClient.signUp.email({
        email: formDataObject.email,
        password: formDataObject.password,
        name: formDataObject.name,
        image: formDataObject.photoURL || undefined,
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
      <h1 className="text-3xl font-bold text-center text-[#2f4aa5]">Register</h1>

      <div className="mx-auto mt-10 max-w-md space-y-4">
        <GoogleSignInButton label="Sign up with Google" />

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
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
          />
        </div>

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
            htmlFor="photoURL"
            className="block text-sm font-medium text-slate-700"
          >
            Profile photo URL
          </label>
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            placeholder="https://example.com/photo.jpg"
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
            placeholder="At least 8 characters"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            placeholder="Re-enter your password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#2f4aa5] hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
}
