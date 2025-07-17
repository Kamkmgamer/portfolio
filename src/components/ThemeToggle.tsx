"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg relative overflow-hidden"
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="w-6 h-6 text-yellow-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="w-6 h-6 text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
