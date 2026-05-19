"use client";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import ToastProvider from "@/components/Toast/ToastProvider";
import { ThemeProvider as FlowbiteProvider } from "flowbite-react";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <FlowbiteProvider>
        {children}
        <ToastProvider />
      </FlowbiteProvider>
    </ThemeProvider>
  );
}
