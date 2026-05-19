"use client";

import { formatDate } from "@/app/lib/helpers";
import Link from "next/link";

/** Simple card for one booked session (no edit/delete here) */
export default function BookedSessionCard({ booking, tutorHref }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">{booking.tutorName}</h2>
      <p className="mt-1 text-sm text-[#2f4aa5]">{booking.subject}</p>
      <p className="mt-4 text-sm text-slate-600">
        Session: {formatDate(booking.bookingDate)}
      </p>
      <p className="text-sm text-slate-600">
        ${booking.hourlyFee}/hr · {booking.teachingMode}
      </p>

      {tutorHref ? (
        <Link
          href={tutorHref}
          className="mt-4 inline-block text-sm font-semibold text-[#2f4aa5] hover:underline"
        >
          View tutor →
        </Link>
      ) : null}
    </li>
  );
}
