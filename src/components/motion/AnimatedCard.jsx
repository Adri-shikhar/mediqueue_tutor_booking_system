"use client";

import { motion } from "framer-motion";
import { easeSmooth } from "./motionVariants";

export default function AnimatedCard({ children, className = "", index = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: easeSmooth,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.22, ease: easeSmooth },
      }}
    >
      {children}
    </motion.div>
  );
}
