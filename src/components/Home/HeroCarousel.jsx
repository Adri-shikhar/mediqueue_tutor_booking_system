"use client";

import MqButton from "@/components/flowbite/MqButton";
import { easeSmooth } from "@/components/motion/motionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((old) => (old === slides.length - 1 ? 0 : old + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[slideIndex];

  function showPrevSlide() {
    setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function showNextSlide() {
    setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeSmooth }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2f4aa5] via-[#3d5fc4] to-[#5b7fd6] px-6 py-12 text-white shadow-lg sm:px-12 sm:py-16"
    >
      <button
        type="button"
        onClick={showPrevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:scale-110 hover:bg-white/30"
      >
        <HiOutlineChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:scale-110 hover:bg-white/30"
      >
        <HiOutlineChevronRight className="size-6" />
      </button>

      <div className="mx-auto max-w-3xl overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
          >
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              {currentSlide.title}
            </h1>
            <p className="mt-4 text-base text-blue-100 sm:text-lg">
              {currentSlide.text}
            </p>
            <div className="mt-8 flex justify-center">
              <MqButton href="/Tutors" className="!bg-white !text-[#2f4aa5] hover:!bg-blue-50">
                {currentSlide.buttonText}
              </MqButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === slideIndex;
          return (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setSlideIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-8 bg-white"
                  : "h-2.5 w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
