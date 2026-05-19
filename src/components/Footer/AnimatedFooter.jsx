"use client";

import FadeIn from "@/components/motion/FadeIn";
import Footer from "./footer";

export default function AnimatedFooter() {
  return (
    <FadeIn delay={0.1}>
      <Footer />
    </FadeIn>
  );
}
