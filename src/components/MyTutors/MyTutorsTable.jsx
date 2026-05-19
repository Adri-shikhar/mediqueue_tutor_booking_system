"use client";

import { formatLongDate, toId } from "@/app/lib/helpers";
import DeleteTutorButton from "@/components/Tutor/DeleteTutorButton";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

export default function MyTutorsTable({ tutors }) {
  if (tutors.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Tutor Name</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Subject</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Available</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Hourly Fee</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Total Slot</th>
            <th className="px-4 py-3 font-semibold text-slate-700">
              Registration Date
            </th>
            <th className="px-4 py-3 text-center font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => {
            const tutorId = toId(tutor._id);
            return (
              <tr
                key={tutorId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {tutor.tutorName}
                </td>
                <td className="px-4 py-3 text-slate-700">{tutor.subject}</td>
                <td className="max-w-[200px] px-4 py-3 text-slate-600">
                  {tutor.availability}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  ${tutor.hourlyFee}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    {tutor.totalSlot ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatLongDate(tutor.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <DeleteTutorButton
                      tutorId={tutorId}
                      tutorName={tutor.tutorName}
                      iconOnly
                    />
                    <Link
                      href={`/Tutors/${tutorId}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200"
                      title="Edit tutor"
                    >
                      <FiEdit2 className="size-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
