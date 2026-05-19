"use client";

import FadeIn from "@/components/motion/FadeIn";

export default function TutorsPageHeader() {
  return (
    <FadeIn className="text-center">
      <h1 className="text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
        Our Tutors
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Browse tutors and book a session that fits your schedule.
      </p>
    </FadeIn>
  );
}
