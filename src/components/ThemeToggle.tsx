"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeLabels = {
  label: string;
  system: string;
  light: string;
  dark: string;
  toLight: string;
  toDark: string;
};

/**
 * Icon toggle between light and dark. Icons are swapped purely with CSS
 * (`dark:` variant), so there is no hydration flash before mount.
 */
export function ThemeToggle({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn("btn btn-ghost btn-icon text-ink-2", className)}
    >
      <Moon aria-hidden="true" strokeWidth={1.75} className="size-[1.05rem] dark:hidden" />
      <Sun aria-hidden="true" strokeWidth={1.75} className="hidden size-[1.05rem] dark:block" />
      <span className="sr-only dark:hidden">{labels.toDark}</span>
      <span className="sr-only hidden dark:inline">{labels.toLight}</span>
    </button>
  );
}

/** Segmented System / Light / Dark control (footer + mobile menu). */
export function ThemeSwitcher({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const options = [
    { value: "system", label: labels.system, Icon: Monitor },
    { value: "light", label: labels.light, Icon: Sun },
    { value: "dark", label: labels.dark, Icon: Moon },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label={labels.label}
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-line bg-card p-0.5", className)}
    >
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[0.8125rem] font-medium transition-colors",
              active ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )}
          >
            <Icon aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
            <span className="sr-only sm:not-sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
