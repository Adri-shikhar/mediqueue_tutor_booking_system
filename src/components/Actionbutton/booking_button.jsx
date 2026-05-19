"use client";

import { authClient } from "@/app/lib/auth-client";
import { createBooking } from "@/app/lib/data";
import { formatDate, toId } from "@/app/lib/helpers";
import { canBook, getSlots, isFullyBooked } from "@/app/lib/slots";
import SessionDatePicker from "@/components/AddTutor/SessionDatePicker";
import SlotBadge from "@/components/Tutor/SlotBadge";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export default function BookingButton({ tutor }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const tutorId = toId(tutor._id);
  const slotsLeft = getSlots(tutor);
  const tutorIsFull = isFullyBooked(tutor);
  const userCanBook = canBook(tutor);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    // --- SLOT CHECK (frontend) ---
    if (!userCanBook) {
      toast.error("No slots left.");
      return;
    }

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    if (!bookingDate) {
      setMessage("Please pick a session date.");
      return;
    }

    setLoading(true);

    try {
      // Server will also check slots and do totalSlot - 1
      await createBooking({
        tutorId: tutorId,
        tutorName: tutor.tutorName,
        subject: tutor.subject,
        hourlyFee: tutor.hourlyFee,
        teachingMode: tutor.teachingMode,
        location: tutor.location,
        availability: tutor.availability,
        sessionStartDate: tutor.sessionStartDate,
        sessionEndDate: tutor.sessionEndDate,
        bookingDate: bookingDate,
        user_id: user.id,
        userEmail: user.email || "",
        userName: user.name || "",
        phone: user.phone || "",
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      });

      toast.success("Session booked! 1 slot used.");
      router.refresh();
      router.push("/My_Booked_Sessions");
    } catch (error) {
      console.error(error);

      if (error.message === "No slots available") {
        toast.error("No slots left. Tutor is fully booked.");
        setMessage("No slots left.");
      } else {
        toast.error("Booking failed.");
        setMessage("Booking failed.");
      }

      router.refresh();
    }

    setLoading(false);
  }

  // --- UI when slots = 0 (red badge, no booking) ---
  if (tutorIsFull) {
    return (
      <div className="mt-8">
        <p className="mb-2 text-sm text-slate-700">
          Slots left: <SlotBadge count={slotsLeft} />
        </p>
        <button
          type="button"
          disabled
          className="rounded-full bg-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600"
        >
          Fully Booked
        </button>
      </div>
    );
  }

  // --- UI when slots > 0 (green badge, can book) ---
  return (
    <div className="mt-8">
      <p className="mb-3 text-sm text-slate-700">
        Slots left: <SlotBadge count={slotsLeft} />
      </p>

      <Modal>
        <Button className="rounded-full bg-[#2f4aa5] px-6 py-2.5 text-sm font-semibold text-white">
          Book Session
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <HiOutlineCalendarDays className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Book session</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                {!user ? (
                  <p className="text-sm">
                    <Link href="/login" className="text-[#2f4aa5] underline">
                      Log in
                    </Link>{" "}
                    to book.
                  </p>
                ) : (
                  <form id="booking-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <p className="text-sm">
                      Slots left: <SlotBadge count={slotsLeft} />
                    </p>

                    <TextField>
                      <Label>Tutor</Label>
                      <Input readOnly value={tutor.tutorName || ""} />
                    </TextField>

                    <TextField>
                      <Label>Subject</Label>
                      <Input readOnly value={tutor.subject || ""} />
                    </TextField>

                    <div>
                      <Label>Session date</Label>
                      <SessionDatePicker
                        onDateChange={setBookingDate}
                        minDate={tutor.sessionStartDate}
                        maxDate={tutor.sessionEndDate}
                        placeholderText="Pick a date"
                      />
                    </div>

                    <p className="text-sm text-slate-600">
                      {formatDate(tutor.sessionStartDate)} – {formatDate(tutor.sessionEndDate)}
                    </p>

                    {message && <p className="text-sm text-red-600">{message}</p>}
                  </form>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                {user && (
                  <Button type="submit" form="booking-form" isDisabled={loading}>
                    {loading ? "Booking..." : "Confirm booking"}
                  </Button>
                )}
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
