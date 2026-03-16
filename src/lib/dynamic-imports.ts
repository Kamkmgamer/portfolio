"use client";

/**
 * Centralized dynamic imports for code splitting
 * Lazy loads non-critical components to reduce initial bundle size
 */

import dynamic from "next/dynamic";

// Lazy load ThemeToggle - not needed immediately on page load
export const DynamicThemeToggle = dynamic(
  () =>
    import("@/components/ThemeToggle").then((mod) => ({
      default: mod.ThemeToggle,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);
