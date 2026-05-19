import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { getTutorsByCreatorId } from "@/app/lib/data";
import MyTutorsTable from "@/components/MyTutors/MyTutorsTable";

export const dynamic = "force-dynamic";

export default async function MyTutorsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
          My Tutors
        </h1>
        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          <Link
            href="/login"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Log in
          </Link>{" "}
          to see tutors you added.
        </p>
      </main>
    );
  }

  const tutors = await getTutorsByCreatorId(user.id);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">My Tutors</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Signed in as {user.name || user.email}
          </p>
        </div>
        <Link
          href="/Add_Tutor"
          className="rounded-full bg-[#2f4aa5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          + Add tutor
        </Link>
      </div>

      {tutors.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">
          No tutors yet.{" "}
          <Link
            href="/Add_Tutor"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Add your first tutor
          </Link>
        </p>
      ) : (
        <MyTutorsTable tutors={tutors} />
      )}
    </main>
  );
}
