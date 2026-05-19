import Image from "next/image";
import Link from "next/link";
import { toId } from "@/app/lib/helpers";
import { canBook, getSlots } from "@/app/lib/slots";
import SlotBadge from "@/components/Tutor/SlotBadge";

export default function HomeTutorCard({ tutor }) {
  const tutorId = toId(tutor._id);
  const slotsLeft = getSlots(tutor);
  const userCanBook = canBook(tutor);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[#eef7ff] px-4 py-5 text-center">
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={tutor.tutorName}
            width={80}
            height={80}
            className="mx-auto h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2f4aa5] text-2xl font-bold text-white">
            {tutor.tutorName?.charAt(0) || "?"}
          </div>
        )}
        <p className="mt-2 text-xs font-semibold text-[#2f4aa5]">{tutor.teachingMode}</p>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold">{tutor.tutorName}</h3>
        <p className="text-sm text-[#2f4aa5]">{tutor.subject}</p>
        <p className="mt-2 font-bold">${tutor.hourlyFee}/hr</p>
        <p className="mt-3 text-sm">
          Slots: <SlotBadge count={slotsLeft} />
        </p>

        {userCanBook ? (
          <Link
            href={"/Tutors/" + tutorId}
            className="mt-4 block rounded-full bg-[#2f4aa5] py-2.5 text-center text-sm font-semibold text-white"
          >
            Book Session
          </Link>
        ) : (
          <span className="mt-4 block rounded-full bg-slate-300 py-2.5 text-center text-sm font-semibold text-slate-600">
            Fully Booked
          </span>
        )}
      </div>
    </article>
  );
}
