"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-5xl font-bold text-red-600">Error</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Something went wrong</h1>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
        We could not load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full bg-[#2f4aa5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#263f8b]"
      >
        Try again
      </button>
    </main>
  );
}
