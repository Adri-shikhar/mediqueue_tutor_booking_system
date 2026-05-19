"use client";

import { deleteTutor } from "@/app/lib/data";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function DeleteTutorButton({ tutorId, tutorName, iconOnly }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteTutor(tutorId);
      toast.success("Tutor deleted!");
      router.push("/My_Tutors");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }

    setLoading(false);
  }

  const triggerButton = iconOnly ? (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
      title="Delete"
    >
      <FiTrash2 className="size-4" />
    </button>
  ) : (
    <Button type="button" variant="danger" size="sm">
      Delete
    </Button>
  );

  return (
    <AlertDialog>
      {triggerButton}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete tutor?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Delete <strong>{tutorName}</strong>? This cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button variant="danger" isDisabled={loading} onPress={handleDelete}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
