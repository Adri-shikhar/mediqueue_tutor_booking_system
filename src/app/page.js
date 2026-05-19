export const dynamic = "force-dynamic";

import { getTutorsWithLimit } from "@/app/lib/data";
import { toId } from "@/app/lib/helpers";
import MqButton from "@/components/flowbite/MqButton";
import HeroCarousel from "@/components/Home/HeroCarousel";
import HomeTutorCard from "@/components/Home/HomeTutorCard";
import HowItWorks from "@/components/Home/HowItWorks";
import NewsMarquee from "@/components/Home/NewsMarquee";
import WhyMediqueue from "@/components/Home/WhyMediqueue";
import AnimatedCard from "@/components/motion/AnimatedCard";
import FadeIn from "@/components/motion/FadeIn";

export default async function Home() {
  const tutors = await getTutorsWithLimit(6);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <HeroCarousel />
      <NewsMarquee />

      <section className="mt-16">
        <FadeIn className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
              Available Tutors
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Top tutors from our database — book a session today.
            </p>
          </div>
          <MqButton href="/Tutors" variant="outline">
            View all tutors
          </MqButton>
        </FadeIn>

        {tutors.length === 0 ? (
          <p className="mt-8 text-center text-slate-500 dark:text-slate-400">
            No tutors available yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor, index) => (
              <AnimatedCard key={toId(tutor._id)} index={index}>
                <HomeTutorCard tutor={tutor} />
              </AnimatedCard>
            ))}
          </div>
        )}
      </section>

      <WhyMediqueue />
      <HowItWorks />
    </main>
  );
}
