export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getTutors } from "../lib/data";
import TutorsPageHeader from "@/components/Tutors/TutorsPageHeader";
import TutorsSearchFilter from "@/components/Tutors/TutorsSearchFilter";
import TutorsGrid from "@/components/Tutors/TutorsGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default async function TutorsPage({ searchParams }) {
  const params = await searchParams;
  const name = params?.name || "";
  const registrationStart = params?.registrationStart || "";
  const registrationEnd = params?.registrationEnd || "";

  const tutors = await getTutors({
    name,
    registrationStart,
    registrationEnd,
  });

  const hasFilters = Boolean(name || registrationStart || registrationEnd);
  const emptyMessage = hasFilters
    ? "No tutors match your search or filter. Try different options."
    : "No tutors available yet.";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <TutorsPageHeader />

      <Suspense
        fallback={
          <div className="mt-8 flex justify-center">
            <LoadingSpinner label="Loading filters..." />
          </div>
        }
      >
        <TutorsSearchFilter />
      </Suspense>

      <TutorsGrid tutors={tutors} emptyMessage={emptyMessage} />
    </main>
  );
}
