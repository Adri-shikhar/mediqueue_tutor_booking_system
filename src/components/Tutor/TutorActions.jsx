"use client";

import { authClient } from "@/app/lib/auth-client";
import { updateTutor } from "@/app/lib/data";
import SessionDatePicker from "@/components/AddTutor/SessionDatePicker";
import DeleteTutorButton from "@/components/Tutor/DeleteTutorButton";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
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

export default function TutorActions({ tutor, tutorId }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Each field has its own state — easy to read
  const [tutorName, setTutorName] = useState(tutor.tutorName || "");
  const [photo, setPhoto] = useState(tutor.photo || "");
  const [subject, setSubject] = useState(tutor.subject || "");
  const [availability, setAvailability] = useState(tutor.availability || "");
  const [hourlyFee, setHourlyFee] = useState(String(tutor.hourlyFee ?? ""));
  const [totalSlot, setTotalSlot] = useState(String(tutor.totalSlot ?? ""));
  const [institution, setInstitution] = useState(
    tutor.institutionAndExperience || ""
  );
  const [location, setLocation] = useState(tutor.location || "");
  const [teachingMode, setTeachingMode] = useState(tutor.teachingMode || "");
  const [sessionStartDate, setSessionStartDate] = useState(
    tutor.sessionStartDate || ""
  );
  const [sessionEndDate, setSessionEndDate] = useState(
    tutor.sessionEndDate || ""
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveTutor(e) {
    e.preventDefault();
    setMessage("");

    if (!user) {
      toast.error("Please log in.");
      return;
    }

    if (!sessionStartDate || !sessionEndDate) {
      setMessage("Pick start and end dates.");
      return;
    }

    const tutorData = {
      tutorName: tutorName,
      photo: photo,
      subject: subject,
      availability: availability,
      hourlyFee: Number(hourlyFee),
      totalSlot: Number(totalSlot),
      sessionStartDate: sessionStartDate,
      sessionEndDate: sessionEndDate,
      institutionAndExperience: institution,
      location: location,
      teachingMode: teachingMode,
      createdBy: tutor.createdBy || user.email || "",
      createdBy_id: tutor.createdBy_id || user.id,
      createdByName: tutor.createdByName || user.name || "",
      createdByEmail: tutor.createdByEmail || user.email || "",
      createdAt: tutor.createdAt || new Date().toISOString(),
    };

    setLoading(true);

    try {
      await updateTutor(tutorId, tutorData);
      toast.success("Tutor updated!");
      router.push("/Tutors/" + tutorId);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
      setMessage("Update failed.");
    }

    setLoading(false);
  }

  return (
    <div className="absolute right-6 top-6 z-10 flex gap-2 sm:right-10 sm:top-10">
      <Modal>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
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
              </Modal.Header>

              <Modal.Body className="max-h-[60vh] overflow-y-auto p-6">
                <form
                  id="edit-tutor-form"
                  className="flex flex-col gap-4"
                  onSubmit={saveTutor}
                >
                  <TextField>
                    <Label>Tutor name</Label>
                    <Input
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Photo link</Label>
                    <Input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      required
                    />
                  </TextField>

                  <label className="text-sm font-medium">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    required
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <TextField>
                    <Label>Availability</Label>
                    <Input
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Hourly fee ($)</Label>
                    <Input
                      type="number"
                      value={hourlyFee}
                      onChange={(e) => setHourlyFee(e.target.value)}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Total slots</Label>
                    <Input
                      type="number"
                      value={totalSlot}
                      onChange={(e) => setTotalSlot(e.target.value)}
                      required
                    />
                  </TextField>

                  <Label>Session start</Label>
                  <SessionDatePicker
                    initialDate={sessionStartDate}
                    onDateChange={setSessionStartDate}
                    placeholderText="Start date"
                  />

                  <Label>Session end</Label>
                  <SessionDatePicker
                    initialDate={sessionEndDate}
                    onDateChange={setSessionEndDate}
                    placeholderText="End date"
                  />

                  <TextField>
                    <Label>Institution & experience</Label>
                    <Input
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Location</Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </TextField>

                  <label className="text-sm font-medium">Teaching mode</label>
                  <select
                    value={teachingMode}
                    onChange={(e) => setTeachingMode(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    required
                  >
                    {TEACHING_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>

                  {message && <p className="text-sm text-red-600">{message}</p>}
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button type="submit" form="edit-tutor-form" isDisabled={loading}>
                  {loading ? "Saving..." : "Save"}
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
