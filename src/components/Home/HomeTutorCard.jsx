"use client";

import Image from "next/image";
import { toId } from "@/app/lib/helpers";
import { canBook, getSlots } from "@/app/lib/slots";
import MqButton from "@/components/flowbite/MqButton";
import SlotBadge from "@/components/Tutor/SlotBadge";
import { Badge } from "flowbite-react";

export default function HomeTutorCard({ tutor }) {
  const tutorId = toId(tutor._id);
  const slotsLeft = getSlots(tutor);
  const userCanBook = canBook(tutor);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-[#2a3655] dark:bg-[#151c2f]">
      <div className="border-b border-slate-100 bg-[#eef7ff] px-4 py-5 text-center dark:border-[#2a3655] dark:bg-[#1a2440]">
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={tutor.tutorName}
            width={80}
            height={80}
            className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-white dark:ring-[#2a3655]"
          />
        ) : (
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2f4aa5] text-2xl font-bold text-white">
            {tutor.tutorName?.charAt(0) || "?"}
          </div>
        )}
        <Badge color="info" className="mt-2">
          {tutor.teachingMode}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100">{tutor.tutorName}</h3>
        <p className="text-sm text-[#2f4aa5] dark:text-[#8fb0ff]">{tutor.subject}</p>
        <p className="mt-2 font-bold text-slate-900 dark:text-slate-100">
          ${tutor.hourlyFee}/hr
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Slots: <SlotBadge count={slotsLeft} />
        </p>

        {userCanBook ? (
          <MqButton href={"/Tutors/" + tutorId} className="mt-4 w-full">
            Book Session
          </MqButton>
        ) : (
          <span className="mt-4 block rounded-full bg-slate-300 py-2.5 text-center text-sm font-semibold text-slate-600 dark:bg-slate-600 dark:text-slate-300">
            Fully Booked
          </span>
        )}
      </div>
    </article>
  );
}
