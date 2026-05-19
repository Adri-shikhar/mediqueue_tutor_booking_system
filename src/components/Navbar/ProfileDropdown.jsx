"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function ProfileDropdown({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const profileImage = user?.image || user?.photoURL;
  const displayName = user?.name || user?.email || "User";
  const initials = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:border-[#2f4aa5]/40 dark:border-slate-600 dark:bg-slate-800"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open profile menu"
      >
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
        <span className="max-w-[100px] truncate text-sm font-medium text-slate-700 sm:max-w-[140px]">
          {displayName}
        </span>
        <span className="text-xs text-slate-500" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
        >
          <Link
            href="/profile"
            role="menuitem"
            className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#eef7ff] hover:text-[#2f4aa5] dark:text-slate-200 dark:hover:bg-[#1a2440] dark:hover:text-[#8fb0ff]"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
