import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { getBookingsByUserId } from "@/app/lib/data";

export const dynamic = "force-dynamic";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  return id.$oid ?? String(id);
}

export default async function MyBookedSessionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">
          My Booked Sessions
        </h1>
        <p className="mt-6 text-center text-slate-600">
          <Link
            href="/login"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Log in
          </Link>{" "}
          to see your bookings.
        </p>
      </main>
    );
  }

  const bookings = await getBookingsByUserId(user.id);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">
        My Booked Sessions
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Signed in as {user.name || user.email}
      </p>

      {bookings.length === 0 ? (
        <p className="mt-8 text-center text-slate-600">
          No bookings yet.{" "}
          <Link
            href="/Tutors"
            className="font-semibold text-[#2f4aa5] hover:underline"
          >
            Browse tutors
          </Link>
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {bookings.map((booking) => (
            <li
              key={toId(booking._id)}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {booking.tutorName}
              </h2>
              <p className="mt-1 text-sm text-[#2f4aa5]">{booking.subject}</p>
              <p className="mt-4 text-sm text-slate-600">
                Session: {formatDate(booking.bookingDate)}
              </p>
              <p className="text-sm text-slate-600">
                ${booking.hourlyFee}/hr · {booking.teachingMode}
              </p>
              {booking.tutorId ? (
                <Link
                  href={`/Tutors/${toId(booking.tutorId)}`}
                  className="mt-4 inline-block text-sm font-semibold text-[#2f4aa5] hover:underline"
                >
                  View tutor →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
