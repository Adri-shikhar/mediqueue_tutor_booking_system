"use client";

import { Card } from "flowbite-react";

/** Flowbite card styled for MediQueue (light + dark). */
export default function MqCard({ children, className = "" }) {
  return (
    <Card
      className={
        "border border-slate-200 bg-white shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f] " +
        className
      }
    >
      {children}
    </Card>
  );
}
