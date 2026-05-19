"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getPageTitle } from "@/app/lib/pageTitles";

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
}
