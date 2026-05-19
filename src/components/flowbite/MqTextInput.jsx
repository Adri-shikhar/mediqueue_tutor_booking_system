"use client";

import { Label, TextInput } from "flowbite-react";

export default function MqTextInput({
  id,
  label,
  type = "text",
  name,
  required = false,
  placeholder,
  value,
  onChange,
  min,
  max,
  helper,
}) {
  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={id} className="text-slate-700 dark:text-slate-300">
          {label}
        </Label>
      ) : null}
      <TextInput
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        color="gray"
        className="mt-1 [&_input]:rounded-lg [&_input]:border-slate-300 [&_input]:bg-white [&_input]:text-slate-900 dark:[&_input]:border-[#2a3655] dark:[&_input]:bg-[#1a2440] dark:[&_input]:text-slate-100"
      />
      {helper ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p>
      ) : null}
    </div>
  );
}
