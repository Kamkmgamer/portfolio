"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, cubicBezier } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const spring = { type: "spring" as const, stiffness: 260, damping: 20 };
  const ease = cubicBezier(0.22, 1, 0.36, 1);

  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  const buttonClass =
    "inline-flex items-center justify-center w-9 h-9 border border-evt-line-strong text-evt-steel hover:text-evt-track hover:border-evt-track transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-2";

  // Before mount, render a stable, theme-agnostic button to avoid SSR/client mismatch
  if (!mounted) {
    return (
      <button type="button" aria-label="Toggle theme" title="Toggle theme" className={buttonClass}>
        <Sun className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Theme toggle</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={handleToggle}
      className={buttonClass}
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={reduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { rotate: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0 }}
            transition={reduceMotion ? { duration: 0.15, ease } : spring}
            className="inline-flex"
          >
            <Moon className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={reduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { rotate: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0 }}
            transition={reduceMotion ? { duration: 0.15, ease } : spring}
            className="inline-flex"
          >
            <Sun className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">{isDark ? "Dark mode enabled" : "Light mode enabled"}</span>
    </button>
  );
}
