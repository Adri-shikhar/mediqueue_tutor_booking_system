import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorById } from "../../lib/data";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const teachingModeStyles = {
  Online: "bg-sky-100 text-sky-800 ring-sky-200",
  Offline: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Both: "bg-violet-100 text-violet-800 ring-violet-200",
};

function DetailItem({ label, value }) {
  if (value == null || value === "") return null;
  return (
    <div className="text-sm">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="mt-0.5 leading-snug text-slate-800">{value}</dd>
    </div>
  );
}

export default async function TutorDetails({ params }) {
  const { id } = await params;
  const tutor = await getTutorById(id);

  if (!tutor) {
    notFound();
  }

  const modeClass =
    teachingModeStyles[tutor.teachingMode] ??
    "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <Link
        href="/Tutors"
        className="inline-flex items-center text-sm font-medium text-[#2f4aa5] hover:underline"
      >
        ← Back to tutors
      </Link>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-100 bg-gradient-to-b from-[#eef7ff] to-white px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              {tutor.photo ? (
                <Image
                  src={tutor.photo}
                  alt={tutor.tutorName}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover object-center shadow-md sm:h-40 sm:w-40"
                  width={160}
                  height={160}
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#2f4aa5] text-4xl font-bold text-white shadow-md sm:h-40 sm:w-40">
                  {tutor.tutorName?.charAt(0) ?? "?"}
                </div>
              )}
              <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-0.5 text-xs font-semibold ring-1 ${modeClass}`}
              >
                {tutor.teachingMode}
              </span>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {tutor.tutorName}
              </h1>
              <p className="mt-2 text-lg font-medium text-[#2f4aa5]">
                {tutor.subject}
              </p>
              <p className="mt-4 text-slate-600">
                <span className="text-3xl font-bold text-slate-900">
                  ${tutor.hourlyFee}
                </span>
                <span className="ml-1 text-base text-slate-500">/ hour</span>
              </p>
            </div>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-10">
          <h2 className="text-lg font-bold text-[#2f4aa5]">Tutor details</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <DetailItem label="Availability" value={tutor.availability} />
            <DetailItem label="Location" value={tutor.location} />
            <DetailItem
              label="Experience"
              value={tutor.institutionAndExperience}
            />
            <DetailItem
              label="Sessions"
              value={`${formatDate(tutor.sessionStartDate)} – ${formatDate(tutor.sessionEndDate)}`}
            />
            <DetailItem
              label="Slots left"
              value={
                tutor.totalSlot != null ? String(tutor.totalSlot) : null
              }
            />
          </dl>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-[#2f4aa5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#263f8b] sm:max-w-xs"
          >
            Book session
          </button>
        </section>
      </article>
    </main>
  );
}
