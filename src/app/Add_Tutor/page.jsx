"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { createTutor } from "@/app/lib/data";
import SessionDatePicker from "@/components/AddTutor/SessionDatePicker";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Geography",
  "Economics",
  "Other",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]";

export default function AddTutorPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, "user");

  const [sessionStartDate, setSessionStartDate] = useState("");
  const [sessionEndDate, setSessionEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.target);

    if (!sessionStartDate || !sessionEndDate) {
      setMessage("Please select session start and end dates.");
      return;
    }
    try {
      await createTutor({
        tutorName: formData.get("tutorName"),
        photo: formData.get("photo"),
        subject: formData.get("subject"),
        availability: formData.get("availability"),
        hourlyFee: Number(formData.get("hourlyFee")),
        totalSlot: Number(formData.get("totalSlot")),
        sessionStartDate,
        sessionEndDate,
        institutionAndExperience: formData.get("institutionAndExperience"),
        location: formData.get("location"),
        teachingMode: formData.get("teachingMode"),
        createdBy: user?.email ?? "",
        createdBy_id: user?.id ?? "",
        createdByName: user?.name ?? "",
        createdByEmail: user?.email ?? "",
        createdAt: new Date().toISOString()
      });

      router.push("/Tutors");
    } catch (error) {
      console.error(error);
      setMessage("Failed to add tutor. Please try again.");
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-bold text-[#2f4aa5]">
        Add Tutor
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="tutorName"
            className="block text-sm font-medium text-slate-700"
          >
            Tutor name
          </label>
          <input
            id="tutorName"
            name="tutorName"
            type="text"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-slate-700"
          >
            Photo link (imgbb / postimage)
          </label>
          <input
            id="photo"
            name="photo"
            type="text"
            required
            placeholder="https://i.ibb.co/your-image.jpg"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-slate-700"
          >
            Subject / category
          </label>
          <select id="subject" name="subject" required className={inputClass}>
            <option value="">Select subject</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-slate-700"
          >
            Available days and time slot
          </label>
          <input
            id="availability"
            name="availability"
            type="text"
            required
            placeholder="Sun - Thu 5:00 PM - 8:00 PM"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="hourlyFee"
            className="block text-sm font-medium text-slate-700"
          >
            Hourly fee ($)
          </label>
          <input
            id="hourlyFee"
            name="hourlyFee"
            type="number"
            min="0"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="totalSlot"
            className="block text-sm font-medium text-slate-700"
          >
            Total slots
          </label>
          <input
            id="totalSlot"
            name="totalSlot"
            type="number"
            min="1"
            required
            className={inputClass}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">
            Session start date
          </p>
          <div className="mt-1">
            <SessionDatePicker
              placeholderText="Select start date"
              onDateChange={setSessionStartDate}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">Session end date</p>
          <div className="mt-1">
            <SessionDatePicker
              placeholderText="Select end date"
              onDateChange={setSessionEndDate}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="institutionAndExperience"
            className="block text-sm font-medium text-slate-700"
          >
            Institution &amp; experience
          </label>
          <textarea
            id="institutionAndExperience"
            name="institutionAndExperience"
            required
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-slate-700"
          >
            Location (area / city)
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="teachingMode"
            className="block text-sm font-medium text-slate-700"
          >
            Teaching mode
          </label>
          <select
            id="teachingMode"
            name="teachingMode"
            required
            className={inputClass}
          >
            <option value="">Select mode</option>
            {TEACHING_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        {message && <p className="text-sm text-red-600">{message}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-[#2f4aa5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f8b]"
        >
          Add tutor
        </button>
      </form>
    </main>
  );
}
