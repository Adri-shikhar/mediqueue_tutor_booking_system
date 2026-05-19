import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MediQueue | Profile",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">Profile</h1>
        <p className="mt-6 text-center text-slate-600">
          <Link
            href="/login"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Log in
          </Link>{" "}
          to view your profile.
        </p>
      </main>
    );
  }

  const photo = user.image || user.photoURL;

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">My Profile</h1>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
          {photo ? (
            <img
              src={photo}
              alt={user.name || "Profile"}
              className="h-24 w-24 rounded-full border-4 border-[#eef7ff] object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2f4aa5] text-3xl font-bold text-white">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </span>
          )}
          <div className="w-full space-y-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </p>
              <p className="mt-1 text-lg font-medium text-slate-900">
                {user.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </p>
              <p className="mt-1 text-slate-800">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link
            href="/My_Booked_Sessions"
            className="rounded-full border border-[#2f4aa5] px-4 py-2 text-sm font-semibold text-[#2f4aa5] hover:bg-[#eef7ff] dark:border-[#8fb0ff] dark:text-[#8fb0ff] dark:hover:bg-[#1a2440]"
          >
            My sessions
          </Link>
          <Link
            href="/My_Tutors"
            className="rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
          >
            My tutors
          </Link>
        </div>
      </div>
    </main>
  );
}
