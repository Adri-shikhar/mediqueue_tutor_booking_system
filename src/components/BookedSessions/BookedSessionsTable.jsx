"use client";

import { updateBooking } from "@/app/lib/data";
import { getBearerToken } from "@/app/lib/get-bearer-token";
import { toId } from "@/app/lib/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export default function BookedSessionsTable({ bookings }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState("");

  async function cancelSession(booking) {
    const id = toId(booking._id);
    setBusyId(id);

    try {
      const token = await getBearerToken();
      if (!token) {
        toast.error("Please log in again.");
        setBusyId("");
        return;
      }

      const updated = { ...booking };
      delete updated._id;
      updated.status = "cancelled";

      // Server will do totalSlot + 1 when status is cancelled
      await updateBooking(id, updated, token);
      toast.success("Cancelled. 1 slot returned to tutor.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not cancel session.");
    }

    setBusyId("");
  }

  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
      <table className="w-full min-w-[900px] text-left text-sm dark:text-slate-200">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-[#2a3655] dark:bg-[#1a2440]">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Tutor Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-center font-semibold">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const id = toId(booking._id);
            const status = booking.status || "Confirmed";
            const isCancelled = status.toLowerCase() === "cancelled";

            return (
              <tr key={id} className="border-b border-slate-100 hover:bg-slate-50 dark:border-[#2a3655] dark:hover:bg-[#1a2440]">
                <td className="px-4 py-3 font-medium">{booking.subject}</td>
                <td className="px-4 py-3">{booking.phone || "—"}</td>
                <td className="px-4 py-3">{booking.tutorName}</td>
                <td className="px-4 py-3">{booking.userEmail}</td>
                <td className="px-4 py-3">
                  {isCancelled ? (
                    <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                      cancelled
                    </span>
                  ) : (
                    <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">
                      Confirmed
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    disabled={isCancelled || busyId === id}
                    onClick={() => cancelSession(booking)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40"
                  >
                    <FiX className="size-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
