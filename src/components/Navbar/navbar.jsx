"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/Tutors", label: "Tutors" },
    { href: "/Add_Tutor", label: "Add Tutor" },
    { href: "/My_Tutors", label: "My Tutors" },
    { href: "/My_Booked_Sessions", label: "My Booked Sessions" },
  ];

  const isActive = (href) =>
    decodeURIComponent(pathname) === decodeURIComponent(href);

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-slate-200 bg-[#eef7ff]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-3 md:flex-row md:items-center md:gap-6">
        <Link
          href="/"
          className="flex items-center justify-center md:shrink-0 md:justify-start"
        >
          <Image
            src="/Assets/logo.png"
            alt="Mediqueue logo"
            width={140}
            height={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>
        <ul className="flex w-full flex-wrap items-center justify-center gap-5 text-sm font-semibold text-slate-600 md:flex-1 md:justify-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className={`relative px-1 transition hover:text-[#2f4aa5] ${
                  isActive(item.href)
                    ? "text-[#2f4aa5] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#2f4aa5]"
                    : ""
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-3 md:shrink-0 md:justify-end">
          <Link
            className="rounded-full border border-[#2f4aa5] px-4 py-2 text-sm font-semibold text-[#2f4aa5] transition hover:-translate-y-0.5 hover:bg-[#2f4aa5]/10"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#263f8b]"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
