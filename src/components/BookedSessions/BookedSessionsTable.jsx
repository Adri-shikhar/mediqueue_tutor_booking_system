"use client";

import { updateBooking } from "@/app/lib/data";
import { toId } from "@/app/lib/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function StatusBadge({ status }) {
  const normalized = (status || "Confirmed").toLowerCase();
  if (normalized === "cancelled") {
    return (
      <span className="inline-block rounded-md bg-red-100 px-2.5 py-1 text-xs font-semibold capitalize text-red-700">
        cancelled
      </span>
    );
  }
  return (
    <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-800">
      Confirmed
    </span>
  );
}

export default function BookedSessionsTable({ bookings }) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState("");

  async function cancelBooking(booking) {
    const bookingId = toId(booking._id);
    setCancellingId(bookingId);
    try {
      const data = { ...booking };
      delete data._id;
      await updateBooking(bookingId, { ...data, status: "cancelled" });
      toast.success("Session cancelled.");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel session.");
    } finally {
      setCancellingId("");
    }
  }

  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Phone</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Tutor Name</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
            <th className="px-4 py-3 text-center font-semibold text-slate-700">
              Cancel
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const bookingId = toId(booking._id);
            const isCancelled =
              (booking.status || "Confirmed").toLowerCase() === "cancelled";

            return (
              <tr
                key={bookingId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {booking.subject}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {booking.phone || "—"}
                </td>
                <td className="px-4 py-3 text-slate-700">{booking.tutorName}</td>
                <td className="px-4 py-3 text-slate-700">{booking.userEmail}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    disabled={isCancelled || cancellingId === bookingId}
                    onClick={() => cancelBooking(booking)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Cancel session"
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
