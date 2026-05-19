import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { getBookingsByUserId } from "@/app/lib/data";
import { toId } from "@/app/lib/helpers";
import BookedSessionCard from "@/components/BookedSessions/BookedSessionCard";

export const dynamic = "force-dynamic";

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
          {bookings.map((booking) => {
            const bookingId = toId(booking._id);
            const tutorId = booking.tutorId ? toId(booking.tutorId) : null;

            return (
              <BookedSessionCard
                key={bookingId}
                booking={booking}
                tutorHref={tutorId ? `/Tutors/${tutorId}` : null}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
}
