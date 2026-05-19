"use client";

import { formatDate, toId } from "@/app/lib/helpers";
import DeleteTutorButton from "@/components/Tutor/DeleteTutorButton";
import Image from "next/image";
import Link from "next/link";

/** One tutor card on My Tutors page */
export default function MyTutorCard({ tutor }) {
  const tutorId = toId(tutor._id);

  return (
    <li className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="absolute right-4 top-4">
        <DeleteTutorButton tutorId={tutorId} tutorName={tutor.tutorName} />
      </div>

      <div className="flex items-center gap-3 pr-20">
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={tutor.tutorName}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2f4aa5] text-xl font-bold text-white">
            {tutor.tutorName?.charAt(0) ?? "?"}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="truncate font-bold text-slate-900">{tutor.tutorName}</h2>
          <p className="text-sm text-[#2f4aa5]">{tutor.subject}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm text-slate-600">
        <div>
          <dt className="font-medium text-slate-500">Rate</dt>
          <dd>
            ${tutor.hourlyFee}/hr · {tutor.teachingMode}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Location</dt>
          <dd>{tutor.location || "—"}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Sessions</dt>
          <dd>
            {formatDate(tutor.sessionStartDate)} –{" "}
            {formatDate(tutor.sessionEndDate)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Slots left</dt>
          <dd>{tutor.totalSlot ?? "—"}</dd>
        </div>
      </dl>

      <Link
        href={`/Tutors/${tutorId}`}
        className="mt-5 inline-block rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
      >
        View tutor
      </Link>
    </li>
  );
}
