/** Resolve app URL for Better Auth (local + Vercel production). */
export function getAuthBaseURL() {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Origins allowed for sign-in / sign-up (fixes 403 on Vercel). */
export function getTrustedOrigins() {
  const origins = new Set();

  const add = (value) => {
    if (!value || typeof value !== "string") return;
    const trimmed = value.trim().replace(/\/$/, "");
    if (!trimmed) return;
    try {
      origins.add(new URL(trimmed).origin);
    } catch {
      origins.add(
        trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
      );
    }
  };

  add(process.env.BETTER_AUTH_URL);
  add(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
  add(process.env.BETTER_AUTH_CLIENT_URL);
  add(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  add("http://localhost:3000");
  add("https://mediqueue-tutor-booking-system.vercel.app");

  return [...origins];
}
