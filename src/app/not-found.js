import Link from "next/link";

export const metadata = {
  title: "MediQueue | Page Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-6xl font-bold text-[#2f4aa5]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#2f4aa5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#263f8b]"
      >
        Back to Home
      </Link>
    </main>
  );
}
