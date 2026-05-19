"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeSmooth } from "./motionVariants";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeSmooth }}
    >
      {children}
    </motion.div>
  );
}
