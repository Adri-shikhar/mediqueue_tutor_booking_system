"use client";
import { authClient } from "@/app/lib/auth-client";
import { createBooking } from "@/app/lib/data";
import { formatDate, toId } from "@/app/lib/helpers";
import SessionDatePicker from "@/components/AddTutor/SessionDatePicker";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";

const readOnlyInputClass =
  "cursor-default bg-slate-50 text-slate-700";


const BookingButton = ({ tutor }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tutorId = toId(tutor._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user?.id) {
      setMessage("Please log in to book a session.");
      return;
    }

    if (!bookingDate) {
      setMessage("Please select a session date.");
      return;
    }


    setIsSubmitting(true);
    try {
      await createBooking({
        tutorId,
        tutorName: tutor.tutorName,
        subject: tutor.subject,
        hourlyFee: tutor.hourlyFee,
        teachingMode: tutor.teachingMode,
        location: tutor.location,
        availability: tutor.availability,
        sessionStartDate: tutor.sessionStartDate,
        sessionEndDate: tutor.sessionEndDate,
        bookingDate,
        user_id: user.id,
        userEmail: user.email ?? "",
        userName: user.name ?? "",
        createdAt: new Date().toISOString(),
      });
      setMessage("Session booked successfully.");
      setBookingDate("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to book session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        type="button"
        className="mt-8 rounded-full bg-[#2f4aa5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#263f8b]"
      >
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
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Tutor details are pre-filled. Pick your session date below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                {!user?.id ? (
                  <p className="text-sm text-slate-600">
                    You need to{" "}
                    <Link
                      href="/login"
                      className="font-medium text-[#2f4aa5] hover:underline"
                    >
                      log in
                    </Link>{" "}
                    before booking.
                  </p>
                ) : (
                  <form
                    id="booking-form"
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                  >
                    <TextField className="w-full" name="tutorName">
                      <Label>Tutor</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={tutor.tutorName ?? ""}
                      />
                    </TextField>
                    <TextField className="w-full" name="subject">
                      <Label>Subject</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={tutor.subject ?? ""}
                      />
                    </TextField>
                    <TextField className="w-full" name="hourlyFee">
                      <Label>Hourly fee</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={
                          tutor.hourlyFee != null ? `$${tutor.hourlyFee}` : ""
                        }
                      />
                    </TextField>
                    <TextField className="w-full" name="teachingMode">
                      <Label>Teaching mode</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={tutor.teachingMode ?? ""}
                      />
                    </TextField>
                    <TextField className="w-full" name="location">
                      <Label>Location</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={tutor.location ?? ""}
                      />
                    </TextField>
                    <TextField className="w-full" name="availability">
                      <Label>Availability</Label>
                      <Input
                        readOnly
                        className={readOnlyInputClass}
                        value={tutor.availability ?? ""}
                      />
                    </TextField>
                    <div className="text-sm">
                      <p className="font-medium text-slate-700">
                        Tutor session window
                      </p>
                      <p className="mt-1 text-slate-600">
                        {formatDate(tutor.sessionStartDate)} –{" "}
                        {formatDate(tutor.sessionEndDate)}
                      </p>
                    </div>
                    <div className="w-full">
                      <Label className="mb-1 block text-sm font-medium text-slate-700">
                        Your session date
                      </Label>
                      <SessionDatePicker
                        placeholderText="Select session date"
                        onDateChange={setBookingDate}
                        minDate={tutor.sessionStartDate}
                        maxDate={tutor.sessionEndDate}
                      />
                    </div>
                    {message ? (
                      <p
                        className={`text-sm ${
                          message.includes("success")
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {message}
                      </p>
                    ) : null}
                  </form>
                )}
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" type="button">
                Cancel
              </Button>
              {user?.id ? (
                <Button
                  type="submit"
                  form="booking-form"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Booking…" : "Confirm booking"}
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
                >
                  Log in
                </Link>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingButton;
