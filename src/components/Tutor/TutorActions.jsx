"use client";

import { authClient } from "@/app/lib/auth-client";
import { updateTutor } from "@/app/lib/data";
import SessionDatePicker from "@/components/AddTutor/SessionDatePicker";
import DeleteTutorButton from "@/components/Tutor/DeleteTutorButton";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "react-toastify";

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

const selectClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]";

/** Build form state from tutor data so fields show current values */
function getFormFromTutor(tutor) {
  return {
    tutorName: tutor.tutorName ?? "",
    photo: tutor.photo ?? "",
    subject: tutor.subject ?? "",
    availability: tutor.availability ?? "",
    hourlyFee: tutor.hourlyFee != null ? String(tutor.hourlyFee) : "",
    totalSlot: tutor.totalSlot != null ? String(tutor.totalSlot) : "",
    institutionAndExperience: tutor.institutionAndExperience ?? "",
    location: tutor.location ?? "",
    teachingMode: tutor.teachingMode ?? "",
  };
}

/** Edit and Delete buttons — top right of tutor profile card */
export default function TutorActions({ tutor, tutorId }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(() => getFormFromTutor(tutor));
  const [sessionStartDate, setSessionStartDate] = useState(
    tutor.sessionStartDate ?? ""
  );
  const [sessionEndDate, setSessionEndDate] = useState(
    tutor.sessionEndDate ?? ""
  );
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function saveTutor(e) {
    e.preventDefault();
    setMessage("");

    if (!user?.id) {
      toast.error("Please log in to edit this tutor.");
      return;
    }

    if (!sessionStartDate || !sessionEndDate) {
      setMessage("Please select session start and end dates.");
      return;
    }

    const data = {
      tutorName: form.tutorName,
      photo: form.photo,
      subject: form.subject,
      availability: form.availability,
      hourlyFee: Number(form.hourlyFee),
      totalSlot: Number(form.totalSlot),
      sessionStartDate,
      sessionEndDate,
      institutionAndExperience: form.institutionAndExperience,
      location: form.location,
      teachingMode: form.teachingMode,
      createdBy: tutor.createdBy ?? user.email ?? "",
      createdBy_id: tutor.createdBy_id ?? user.id,
      createdByName: tutor.createdByName ?? user.name ?? "",
      createdByEmail: tutor.createdByEmail ?? user.email ?? "",
      createdAt: tutor.createdAt ?? new Date().toISOString(),
    };

    setIsSaving(true);
    try {
      await updateTutor(tutorId, data);
      toast.success("Tutor updated successfully!");
      router.push(`/Tutors/${tutorId}`);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tutor. Please try again.");
      setMessage("Failed to update tutor. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const formId = `edit-tutor-${tutorId}`;

  return (
    <div className="absolute right-6 top-6 z-10 flex gap-2 sm:right-10 sm:top-10">
      <Modal>
        <Button
          type="button"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-emerald-100 text-emerald-700">
                  <HiOutlinePencilSquare className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit tutor</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update the fields below. Data is already filled in for you.
                </p>
              </Modal.Header>
              <Modal.Body className="max-h-[60vh] overflow-y-auto p-6">
                <Surface variant="default">
                  <form
                    id={formId}
                    key={tutorId}
                    className="flex flex-col gap-4"
                    onSubmit={saveTutor}
                  >
                    <TextField className="w-full" name="tutorName">
                      <Label>Tutor name</Label>
                      <Input
                        value={form.tutorName}
                        onChange={(e) => updateField("tutorName", e.target.value)}
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="photo">
                      <Label>Photo link</Label>
                      <Input
                        value={form.photo}
                        onChange={(e) => updateField("photo", e.target.value)}
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="subject">
                      <Label>Subject</Label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={(e) => updateField("subject", e.target.value)}
                        required
                        className={selectClass}
                      >
                        <option value="">Select subject</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </TextField>

                    <TextField className="w-full" name="availability">
                      <Label>Availability</Label>
                      <Input
                        value={form.availability}
                        onChange={(e) =>
                          updateField("availability", e.target.value)
                        }
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="hourlyFee">
                      <Label>Hourly fee ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={form.hourlyFee}
                        onChange={(e) => updateField("hourlyFee", e.target.value)}
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="totalSlot">
                      <Label>Total slots</Label>
                      <Input
                        type="number"
                        min="1"
                        value={form.totalSlot}
                        onChange={(e) => updateField("totalSlot", e.target.value)}
                        required
                      />
                    </TextField>

                    <div className="w-full">
                      <Label className="mb-1 block text-sm font-medium">
                        Session start date
                      </Label>
                      <SessionDatePicker
                        key={`start-${sessionStartDate}`}
                        initialDate={sessionStartDate}
                        placeholderText="Start date"
                        onDateChange={setSessionStartDate}
                      />
                    </div>

                    <div className="w-full">
                      <Label className="mb-1 block text-sm font-medium">
                        Session end date
                      </Label>
                      <SessionDatePicker
                        key={`end-${sessionEndDate}`}
                        initialDate={sessionEndDate}
                        placeholderText="End date"
                        onDateChange={setSessionEndDate}
                      />
                    </div>

                    <TextField className="w-full" name="institutionAndExperience">
                      <Label>Institution & experience</Label>
                      <Input
                        value={form.institutionAndExperience}
                        onChange={(e) =>
                          updateField("institutionAndExperience", e.target.value)
                        }
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="location">
                      <Label>Location</Label>
                      <Input
                        value={form.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        required
                      />
                    </TextField>

                    <TextField className="w-full" name="teachingMode">
                      <Label>Teaching mode</Label>
                      <select
                        name="teachingMode"
                        value={form.teachingMode}
                        onChange={(e) =>
                          updateField("teachingMode", e.target.value)
                        }
                        required
                        className={selectClass}
                      >
                        <option value="">Select mode</option>
                        {TEACHING_MODES.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                    </TextField>

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
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary" type="button">
                  Cancel
                </Button>
                <Button type="submit" form={formId} isDisabled={isSaving}>
                  {isSaving ? "Saving…" : "Save changes"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <DeleteTutorButton tutorId={tutorId} tutorName={tutor.tutorName} />
    </div>
  );
}
