import { toId } from "@/app/lib/helpers";
import { canBook } from "@/app/lib/slots";
import MqButton from "@/components/flowbite/MqButton";
import AnimatedCard from "@/components/motion/AnimatedCard";
import SlotBadge from "@/components/Tutor/SlotBadge";
import Image from "next/image";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const teachingModeStyles = {
  Online: "bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-200 dark:ring-sky-800",
  Offline:
    "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-800",
  Both: "bg-violet-100 text-violet-800 ring-violet-200 dark:bg-violet-900/40 dark:text-violet-200 dark:ring-violet-800",
};

function DetailItem({ label, value }) {
  if (value == null || value === "") return null;
  return (
    <div className="text-sm">
      <dt className="font-medium text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-0.5 leading-snug text-slate-800 dark:text-slate-200">{value}</dd>
    </div>
  );
}

export default function TutorsGrid({ tutors, emptyMessage }) {
  if (tutors.length === 0) {
    return (
      <p className="mt-12 text-center text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor, index) => {
        const tutorId = toId(tutor._id);
        const modeClass =
          teachingModeStyles[tutor.teachingMode] ??
          "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-200";

        return (
          <AnimatedCard key={tutorId} index={index} className="h-full">
          <article
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]"
          >
            <div className="border-b border-slate-100 bg-gradient-to-b from-[#eef7ff] to-white px-5 pb-4 pt-6 dark:border-[#2a3655] dark:from-[#1a2440] dark:to-[#151c2f]">
              <div className="relative mx-auto w-fit">
                {tutor.photo ? (
                  <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover object-center shadow-md dark:border-slate-700"
                    width={96}
                    height={96}
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#2f4aa5] text-3xl font-bold text-white shadow-md dark:border-slate-700">
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
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-700">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                    {tutor.tutorName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#2f4aa5] dark:text-blue-300">
                    {tutor.subject}
                  </p>
                </div>
                <p className="shrink-0 text-right leading-none">
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    ${tutor.hourlyFee}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                    / hour
                  </span>
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
                <div className="text-sm">
                  <dt className="font-medium text-slate-500 dark:text-slate-400">
                    Slots left
                  </dt>
                  <dd className="mt-0.5">
                    <SlotBadge count={tutor.totalSlot} />
                  </dd>
                </div>
              </dl>

              {canBook(tutor) ? (
                <MqButton href={`/Tutors/${tutorId}`} className="mt-5 w-full">
                  Book session
                </MqButton>
              ) : (
                <span className="mt-5 block w-full cursor-not-allowed rounded-full bg-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                  Fully booked
                </span>
              )}
            </div>
          </article>
          </AnimatedCard>
        );
      })}
    </div>
  );
}
