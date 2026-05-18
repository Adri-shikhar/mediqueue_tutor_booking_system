"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarIcon = ({ onDateChange, placeholderText, minDate, maxDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const parseBound = (dateStr) =>
    dateStr ? new Date(`${dateStr}T00:00:00`) : undefined;

  const handleChange = (date) => {
    setSelectedDate(date);

    if (!date) {
      onDateChange("");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    onDateChange(`${year}-${month}-${day}`);
  };

  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={handleChange}
      minDate={parseBound(minDate)}
      maxDate={parseBound(maxDate)}
      placeholderText={placeholderText}
      dateFormat="MMM d, yyyy"
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2f4aa5] focus:ring-1 focus:ring-[#2f4aa5]"
      toggleCalendarOnIconClick
    />
  );
};

export default function SessionDatePicker({
  onDateChange,
  placeholderText,
  minDate,
  maxDate,
}) {
  return (
    <CalendarIcon
      onDateChange={onDateChange}
      placeholderText={placeholderText}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
