"use client";

import { motion } from "framer-motion";
import { easeSmooth } from "./motionVariants";

export default function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay, ease: easeSmooth }}
    >
      {children}
    </motion.div>
  );
}
