"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SessionDatePicker({
  onDateChange,
  placeholderText,
  minDate,
  maxDate,
  initialDate,
}) {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (!initialDate) return null;
    return new Date(initialDate + "T00:00:00");
  });

  function handleChange(date) {
    setSelectedDate(date);

    if (!date) {
      onDateChange("");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = year + "-" + month + "-" + day;

    onDateChange(dateString);
  }

  let min = undefined;
  let max = undefined;
  if (minDate) min = new Date(minDate + "T00:00:00");
  if (maxDate) max = new Date(maxDate + "T00:00:00");

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      minDate={min}
      maxDate={max}
      placeholderText={placeholderText || "Select date"}
      dateFormat="MMM d, yyyy"
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
    />
  );
}
