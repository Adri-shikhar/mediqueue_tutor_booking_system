export const dynamic = "force-dynamic";

import Link from "next/link";
import { getTutorsWithLimit } from "@/app/lib/data";
import { toId } from "@/app/lib/helpers";
import HeroCarousel from "@/components/Home/HeroCarousel";
import HomeTutorCard from "@/components/Home/HomeTutorCard";
import HowItWorks from "@/components/Home/HowItWorks";
import NewsMarquee from "@/components/Home/NewsMarquee";
import WhyMediqueue from "@/components/Home/WhyMediqueue";

export default async function Home() {
  const tutors = await getTutorsWithLimit(6);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <HeroCarousel />
      <NewsMarquee />

      <section className="mt-16">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-[#2f4aa5]">Available Tutors</h2>
            <p className="mt-1 text-slate-600">
              Top tutors from our database — book a session today.
            </p>
          </div>
          <Link
            href="/Tutors"
            className="rounded-full border border-[#2f4aa5] px-5 py-2 text-sm font-semibold text-[#2f4aa5] hover:bg-[#eef7ff]"
          >
            View all tutors
          </Link>
        </div>

        {tutors.length === 0 ? (
          <p className="mt-8 text-center text-slate-500">No tutors available yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <HomeTutorCard key={toId(tutor._id)} tutor={tutor} />
            ))}
          </div>
        )}
      </section>

      <WhyMediqueue />
      <HowItWorks />
    </main>
  );
}
