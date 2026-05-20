/** Express API base URL — must be public HTTPS in production (not localhost). */
export function getApiUrl() {
  const raw = process.env.NEXT_PUBLIC_BASE_URL;
  if (!raw || typeof raw !== "string") {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  const url = raw.trim().replace(/\/$/, "");

  if (typeof window !== "undefined") {
    const onProduction = !window.location.hostname.includes("localhost");
    if (onProduction && url.includes("localhost")) {
      throw new Error(
        "API URL points to localhost but the site is deployed. Set NEXT_PUBLIC_BASE_URL on Vercel to your live API URL."
      );
    }
  }

  return url;
}
