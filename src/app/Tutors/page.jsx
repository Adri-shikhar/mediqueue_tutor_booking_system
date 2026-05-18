export const dynamic = "force-dynamic";

import { getTutors } from "../lib/data";
import Image from "next/image";
import Link from "next/link";

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

const Tutors = async () => {
  const tutors = await getTutors();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">Our Tutors</h1>
      <p className="mt-2 text-center text-slate-600">
        Browse tutors and book a session that fits your schedule.
      </p>

      {tutors.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">No tutors available yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => {
            const modeClass =
              teachingModeStyles[tutor.teachingMode] ??
              "bg-slate-100 text-slate-700 ring-slate-200";

            return (
              <article
                key={String(tutor._id)}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="border-b border-slate-100 bg-gradient-to-b from-[#eef7ff] to-white px-5 pb-4 pt-6">
                  <div className="relative mx-auto w-fit">
                    {tutor.photo ? (
                      <Image
                        src={tutor.photo}
                        alt={tutor.tutorName}
                        className="h-24 w-24 rounded-full border-4 border-white object-cover object-center shadow-md"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#2f4aa5] text-3xl font-bold text-white shadow-md">
                        {tutor.tutorName?.charAt(0) ?? "?"}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${modeClass}`}
                    >
                      {tutor.teachingMode}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-6">
                  <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold leading-tight text-slate-900">
                        {tutor.tutorName}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-[#2f4aa5]">
                        {tutor.subject}
                      </p>
                    </div>
                    <p className="shrink-0 text-right leading-none">
                      <span className="text-xl font-bold text-slate-900">
                        ${tutor.hourlyFee}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">/ hour</span>
                    </p>
                  </div>

                  <dl className="flex flex-1 flex-col gap-3">
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

                  <Link
                    href={`/Tutors/${tutor._id}`}
                    className="mt-5 w-full rounded-full bg-[#2f4aa5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263f8b]"
                  >
                    Book session
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Tutors;
