"use client";


import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";


function getClientBaseURL() {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getClientBaseURL(),
  plugins: [
    jwtClient()
  ]
});
