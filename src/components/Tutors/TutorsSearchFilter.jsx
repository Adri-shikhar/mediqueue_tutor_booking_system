"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TutorsSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [registrationStart, setRegistrationStart] = useState(
    searchParams.get("registrationStart") || ""
  );
  const [registrationEnd, setRegistrationEnd] = useState(
    searchParams.get("registrationEnd") || ""
  );

  function applyFilters(e) {
    e.preventDefault();
    const params = new URLSearchParams();

    if (name.trim()) params.set("name", name.trim());
    if (registrationStart) params.set("registrationStart", registrationStart);
    if (registrationEnd) params.set("registrationEnd", registrationEnd);

    const query = params.toString();
    router.push(query ? `/Tutors?${query}` : "/Tutors");
  }

  function clearFilters() {
    setName("");
    setRegistrationStart("");
    setRegistrationEnd("");
    router.push("/Tutors");
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5] dark:border-[#2a3655] dark:bg-[#1a2440] dark:text-slate-100";

  return (
    <form
      onSubmit={applyFilters}
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]"
    >
      <h2 className="text-lg font-bold text-[#2f4aa5] dark:text-blue-300">
        Search &amp; filter
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Find tutors by name or registration date range.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <label
            htmlFor="tutor-name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Tutor name
          </label>
          <input
            id="tutor-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name..."
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="reg-start"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Registration from
          </label>
          <input
            id="reg-start"
            type="date"
            value={registrationStart}
            onChange={(e) => setRegistrationStart(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="reg-end"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Registration to
          </label>
          <input
            id="reg-end"
            type="date"
            value={registrationEnd}
            onChange={(e) => setRegistrationEnd(e.target.value)}
            min={registrationStart || undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-[#2f4aa5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#263f8b] dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-[#2a3655] dark:text-slate-200 dark:hover:bg-[#1a2440]"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
