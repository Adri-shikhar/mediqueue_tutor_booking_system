"use client";

import { authClient } from "./auth-client";

/** JWT for Express API (client components). */
export async function getBearerToken() {
  const { data, error } = await authClient.token();
  if (error || !data?.token) return null;
  return data.token;
}
