import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

/** Routes that require a logged-in user */
const PRIVATE_PREFIXES = [
  "/Add_Tutor",
  "/My_Tutors",
  "/My_Booked_Sessions",
  "/profile",
];

function isPrivateRoute(pathname) {
  const path = decodeURIComponent(pathname);

  if (PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return true;
  }

  // Tutor detail: /Tutors/[id] — not the public /Tutors list
  if (/^\/Tutors\/[^/]+$/.test(path)) {
    return true;
  }

  return false;
}

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  if (!isPrivateRoute(pathname)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
    query: { disableCookieCache: true },
  });

  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Add_Tutor",
    "/Add_Tutor/:path*",
    "/My_Tutors",
    "/My_Tutors/:path*",
    "/My_Booked_Sessions",
    "/My_Booked_Sessions/:path*",
    "/profile",
    "/profile/:path*",
    "/Tutors/:path*",
  ],
};
