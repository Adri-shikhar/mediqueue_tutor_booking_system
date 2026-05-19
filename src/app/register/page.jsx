"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { getPasswordErrors } from "@/app/lib/passwordValidation";

export default function RegisterPage() {
  const router = useRouter();
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);

    const errors = getPasswordErrors(formDataObject.password);
    if (formDataObject.password !== formDataObject.confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setPasswordErrors(errors);
      toast.error("Please fix the password errors below.");
      return;
    }

    setPasswordErrors([]);

    const { data, error } = await authClient.signUp.email({
      email: formDataObject.email,
      password: formDataObject.password,
      name: formDataObject.name,
      image: formDataObject.photoURL || undefined,
    });

    if (error) {
      toast.error(error.message || "Registration failed. Try again.");
      return;
    }

    if (data) {
      toast.success("Account created! Please log in.");
      router.push("/login");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordErrors(getPasswordErrors(e.target.value));
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">Register</h1>

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
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
          <label
            htmlFor="photoURL"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Profile photo URL
          </label>
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            placeholder="https://example.com/photo.jpg"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handlePasswordChange}
            placeholder="Min 6 chars, upper & lower case"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
          {passwordErrors.length > 0 ? (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-600">
              {passwordErrors.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              Must be 6+ characters with uppercase and lowercase letters.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="Re-enter your password"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#2f4aa5] hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
}
