'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, cubicBezier } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };
  const ease = cubicBezier(0.22, 1, 0.36, 1);

  const handleToggle = () => setTheme(isDark ? 'light' : 'dark');

  // Before mount, render a stable, theme-agnostic button to avoid SSR/client mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        title="Toggle theme"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors"
      >
        <div className="absolute inset-0 grid place-items-center">
          <Sun className="w-6 h-6 text-orange-500" />
        </div>
        <span className="sr-only">Theme toggle</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
      onClick={handleToggle}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors"
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={reduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { rotate: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0 }}
            transition={reduceMotion ? { duration: 0.2, ease } : spring}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="w-6 h-6 text-yellow-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={reduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { rotate: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0 }}
            transition={reduceMotion ? { duration: 0.2, ease } : spring}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="w-6 h-6 text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">
        {isDark ? 'Dark mode enabled' : 'Light mode enabled'}
      </span>
    </button>
  );
}