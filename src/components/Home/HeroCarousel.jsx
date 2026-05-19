"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

// Three slides for the home page banner
const slides = [
  {
    title: "Learn With Expert Tutors",
    text: "Book sessions in math, science, coding, and more.",
    buttonText: "Find a tutor",
  },
  {
    title: "Flexible Online & Offline",
    text: "Mediqueue connects students with tutors across Bangladesh.",
    buttonText: "Browse tutors",
  },
  {
    title: "Start Your Journey Today",
    text: "Pick a tutor and confirm your first session in minutes.",
    buttonText: "Get started",
  },
];

export default function HeroCarousel() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((old) => {
        if (old === slides.length - 1) return 0;
        return old + 1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[slideIndex];

  function showPrevSlide() {
    if (slideIndex === 0) {
      setSlideIndex(slides.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  }

  function showNextSlide() {
    if (slideIndex === slides.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2f4aa5] via-[#3d5fc4] to-[#5b7fd6] px-6 py-12 text-white shadow-lg sm:px-12 sm:py-16">
      <button
        type="button"
        onClick={showPrevSlide}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
      >
        <HiOutlineChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
      >
        <HiOutlineChevronRight className="size-6" />
      </button>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          {currentSlide.title}
        </h1>
        <p className="mt-4 text-base text-blue-100 sm:text-lg">
          {currentSlide.text}
        </p>
        <Link
          href="/Tutors"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#2f4aa5] shadow-md hover:bg-blue-50"
        >
          {currentSlide.buttonText}
        </Link>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === slideIndex;
          return (
            <button
              key={slide.title}
              type="button"
              onClick={() => setSlideIndex(index)}
              className={
                isActive
                  ? "h-2.5 w-8 rounded-full bg-white"
                  : "h-2.5 w-2.5 rounded-full bg-white/40"
              }
            />
          );
        })}
      </div>
    </section>
  );
}
