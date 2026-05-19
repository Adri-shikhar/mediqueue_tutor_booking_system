export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-[#eef7ff] border-t-[#2f4aa5] dark:border-[#1a2440] dark:border-t-[#8fb0ff]"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  );
}
