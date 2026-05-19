"use client";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import ToastProvider from "@/components/Toast/ToastProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
}
