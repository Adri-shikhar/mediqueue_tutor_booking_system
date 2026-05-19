"use client";

import { deleteTutor } from "@/app/lib/data";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

/** Red delete button with confirm dialog */
export default function DeleteTutorButton({
  tutorId,
  tutorName,
  redirectTo = "/My_Tutors",
  iconOnly = false,
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteTutor(tutorId);
      toast.success("Tutor deleted successfully!");
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tutor. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  const trigger = iconOnly ? (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
      title="Delete tutor"
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
      {trigger}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete tutor permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{tutorName}</strong> and all
                of their data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                variant="danger"
                isDisabled={isDeleting}
                onPress={handleDelete}
              >
                {isDeleting ? "Deleting…" : "Delete tutor"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
