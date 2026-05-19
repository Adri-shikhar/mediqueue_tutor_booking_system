"use client";

import { formatLongDate, toId } from "@/app/lib/helpers";
import DeleteTutorButton from "@/components/Tutor/DeleteTutorButton";
import SlotBadge from "@/components/Tutor/SlotBadge";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

export default function MyTutorsTable({ tutors }) {
  if (tutors.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
      <table className="w-full min-w-[800px] text-left text-sm dark:text-slate-200">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-[#2a3655] dark:bg-[#1a2440]">
          <tr>
            <th className="px-4 py-3 font-semibold">Tutor Name</th>
            <th className="px-4 py-3 font-semibold">Subject</th>
            <th className="px-4 py-3 font-semibold">Available</th>
            <th className="px-4 py-3 font-semibold">Hourly Fee</th>
            <th className="px-4 py-3 font-semibold">Total Slot</th>
            <th className="px-4 py-3 font-semibold">Registration Date</th>
            <th className="px-4 py-3 text-center font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => {
            const id = toId(tutor._id);

            return (
              <tr key={id} className="border-b border-slate-100 hover:bg-slate-50 dark:border-[#2a3655] dark:hover:bg-[#1a2440]">
                <td className="px-4 py-3 font-medium">{tutor.tutorName}</td>
                <td className="px-4 py-3">{tutor.subject}</td>
                <td className="px-4 py-3">{tutor.availability}</td>
                <td className="px-4 py-3">${tutor.hourlyFee}</td>
                <td className="px-4 py-3">
                  <SlotBadge count={tutor.totalSlot} />
                </td>
                <td className="px-4 py-3">{formatLongDate(tutor.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <DeleteTutorButton
                      tutorId={id}
                      tutorName={tutor.tutorName}
                      iconOnly={true}
                    />
                    <Link
                      href={"/Tutors/" + id}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      title="Edit"
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
