import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { getTutorsByCreatorId } from "@/app/lib/data";

export const dynamic = "force-dynamic";

function toId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  return id.$oid ?? String(id);
}

export default async function MyTutorsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">
          My Tutors
        </h1>
        <p className="mt-6 text-center text-slate-600">
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
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">
        My Tutors
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Signed in as {user.name || user.email}
      </p>

      {tutors.length === 0 ? (
        <p className="mt-8 text-center text-slate-600">
          No tutors yet.{" "}
          <Link
            href="/Add_Tutor"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Add a tutor
          </Link>
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <li
              key={toId(tutor._id)}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {tutor.photo ? (
                  <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f4aa5] text-lg font-bold text-white">
                    {tutor.tutorName?.charAt(0) ?? "?"}
                  </span>
                )}
                <div>
                  <h2 className="font-bold text-slate-900">{tutor.tutorName}</h2>
                  <p className="text-sm text-[#2f4aa5]">{tutor.subject}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                ${tutor.hourlyFee}/hr · {tutor.teachingMode}
              </p>
              <Link
                href={`/Tutors/${toId(tutor._id)}`}
                className="mt-4 inline-block text-sm font-semibold text-[#2f4aa5] hover:underline"
              >
                View tutor →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
