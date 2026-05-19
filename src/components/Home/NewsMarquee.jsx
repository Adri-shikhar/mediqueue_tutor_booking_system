"use client";

const newsItems = [
  "New tutors added in Computer Science and Mathematics this week!",
  "Book evening slots Sun–Thu — flexible times for working students.",
  "Mediqueue now supports both online and offline tutoring sessions.",
  "Join as a tutor and share your expertise with learners nationwide.",
];

export default function NewsMarquee() {
  const text = newsItems.join("   •   ");

  return (
    <section className="mt-6 flex overflow-hidden rounded-xl border border-[#2f4aa5]/20 bg-[#eef7ff] shadow-sm dark:border-[#8fb0ff]/30 dark:bg-[#1a2440]">
      <div className="flex shrink-0 items-center gap-2 bg-[#2f4aa5] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
        <span aria-hidden>📢</span>
        Latest
      </div>
      <div className="relative flex-1 overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium text-[#2f4aa5]">
          <span>{text}</span>
          <span className="mx-12">{text}</span>
        </div>
      </div>
    </section>
  );
}
