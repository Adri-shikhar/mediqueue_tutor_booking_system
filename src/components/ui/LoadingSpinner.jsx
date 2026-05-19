"use client";

import { Spinner } from "flowbite-react";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="xl" color="info" aria-label={label} />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  );
}
