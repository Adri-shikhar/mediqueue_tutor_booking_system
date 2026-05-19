"use client";

import { Button } from "flowbite-react";
import Link from "next/link";

/**
 * MediQueue-styled Flowbite button (assignment: extra Tailwind UI library).
 */
export default function MqButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  pill = true,
}) {
  const color = variant === "outline" ? "light" : "blue";
  const outline = variant === "outline";

  const shared =
    "font-semibold focus:ring-[#2f4aa5]/40 " +
    (pill ? "!rounded-full" : "") +
    " " +
    className;

  if (href) {
    return (
      <Button
        as={Link}
        href={href}
        color={color}
        outline={outline}
        pill={pill}
        className={shared}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      type={type}
      color={color}
      outline={outline}
      onClick={onClick}
      disabled={disabled}
      pill={pill}
      className={shared}
    >
      {children}
    </Button>
  );
}
