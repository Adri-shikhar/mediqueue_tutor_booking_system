"use client";

import { Label, Switch } from "@heroui/react";
import { useTheme } from "@/contexts/ThemeProvider";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <Switch isSelected={isDark} onChange={setIsDark} size="sm">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Content>
        <Label className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
          {isDark ? "Dark" : "Light"}
        </Label>
      </Switch.Content>
    </Switch>
  );
}
