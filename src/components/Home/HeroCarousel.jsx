"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

const slides = [
  {
    title: "Learn With Expert Tutors",
    text: "Book one-on-one sessions in math, science, coding, and more — matched to your schedule.",
    cta: "Find a tutor",
  },
  {
    title: "Flexible Online & Offline",
    text: "Choose how you learn. Mediqueue connects students with tutors across Bangladesh.",
    cta: "Browse tutors",
  },
  {
    title: "Start Your Journey Today",
    text: "Create an account, pick a tutor, and confirm your first session in minutes.",
    cta: "Get started",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goPrev() {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setActive((prev) => (prev + 1) % slides.length);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2f4aa5] via-[#3d5fc4] to-[#5b7fd6] px-6 py-12 text-white shadow-lg sm:px-12 sm:py-16">
      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
        aria-label="Next slide"
      >
        <HiOutlineChevronRight className="size-6" />
      </button>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          {slides[active].title}
        </h1>
        <p className="mt-4 text-base text-blue-100 sm:text-lg">
          {slides[active].text}
        </p>
        <Link
          href="/Tutors"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#2f4aa5] shadow-md transition hover:bg-blue-50"
        >
          {slides[active].cta}
        </Link>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-2.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
