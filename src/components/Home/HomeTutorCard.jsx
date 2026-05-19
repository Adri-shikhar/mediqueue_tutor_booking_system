import Image from "next/image";
import Link from "next/link";
import { toId } from "@/app/lib/helpers";

const modeStyles = {
  Online: "bg-sky-100 text-sky-800",
  Offline: "bg-emerald-100 text-emerald-800",
  Both: "bg-violet-100 text-violet-800",
};

export default function HomeTutorCard({ tutor }) {
  const tutorId = toId(tutor._id);
  const modeClass = modeStyles[tutor.teachingMode] ?? "bg-slate-100 text-slate-700";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="border-b border-slate-100 bg-gradient-to-b from-[#eef7ff] to-white px-4 py-5 text-center">
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={tutor.tutorName}
            width={80}
            height={80}
            className="mx-auto h-20 w-20 rounded-full border-4 border-white object-cover shadow"
          />
        ) : (
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2f4aa5] text-2xl font-bold text-white">
            {tutor.tutorName?.charAt(0) ?? "?"}
          </div>
        )}
        <span
          className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${modeClass}`}
        >
          {tutor.teachingMode}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-slate-900">{tutor.tutorName}</h3>
        <p className="text-sm text-[#2f4aa5]">{tutor.subject}</p>
        <p className="mt-2 text-lg font-bold text-slate-900">
          ${tutor.hourlyFee}
          <span className="text-sm font-normal text-slate-500">/hr</span>
        </p>
        <p className="mt-2 line-clamp-2 text-xs text-slate-500">
          {tutor.availability}
        </p>
        <Link
          href={`/Tutors/${tutorId}`}
          className="mt-4 block w-full rounded-full bg-[#2f4aa5] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          Book Session
        </Link>
      </div>
    </article>
  );
}
