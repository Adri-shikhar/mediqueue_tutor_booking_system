import { headers } from "next/headers";
import { auth } from "./auth";

/** JWT for Express API (server components / RSC). */
export async function getServerBearerToken() {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    return token ?? null;
  } catch {
    return null;
  }
}
