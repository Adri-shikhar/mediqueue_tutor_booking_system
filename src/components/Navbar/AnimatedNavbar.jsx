"use client";

import { motion } from "framer-motion";
import { easeSmooth } from "@/components/motion/motionVariants";
import Navbar from "./navbar";

export default function AnimatedNavbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeSmooth }}
    >
      <Navbar />
    </motion.div>
  );
}
