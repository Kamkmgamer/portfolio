"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ label }: { label?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";
  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      aria-label={label ?? (isDark ? "Switch to light theme" : "Switch to dark theme")}
      aria-pressed={mounted ? isDark : undefined}
      onClick={handleToggle}
      className="m-appbar-btn"
    >
      {isDark ? (
        <Sun className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
