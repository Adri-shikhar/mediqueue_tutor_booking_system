"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/Tutors", label: "Tutors" },
    { href: "/Add_Tutor", label: "Add Tutor" },
    { href: "/My_Tutors", label: "My Tutors" },
    { href: "/My_Booked_Sessions", label: "My Booked Sessions" },
  ];

  const isActive = (href) =>
    decodeURIComponent(pathname) === decodeURIComponent(href);

  const profileImage = user?.image || user?.photoURL;
  const displayName = user?.name || user?.email || "User";
  const initials = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

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
          {isPending ? null : user ? (
            <>
              <div className="flex items-center gap-2">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="h-9 w-9 rounded-full border-2 border-[#2f4aa5] object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#2f4aa5] bg-[#2f4aa5] text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {initials}
                  </span>
                )}
                <span className="max-w-[120px] truncate text-sm font-medium text-slate-700 sm:max-w-[160px]">
                  {displayName}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-red-600 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-700 hover:border-red-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
