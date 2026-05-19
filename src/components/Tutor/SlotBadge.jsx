import { getSlots, isFullyBooked } from "@/app/lib/slots";

// Green number = slots left | Red 0 = fully booked
export default function SlotBadge({ count }) {
  const slots = getSlots(count);
  const full = isFullyBooked(slots);

  if (full) {
    return (
      <span className="inline-block rounded-md bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/50 dark:text-red-300">
        0
      </span>
    );
  }

  return (
    <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
      {slots}
    </span>
  );
}
