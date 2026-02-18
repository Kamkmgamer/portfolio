"use client";

/**
 * Centralized dynamic imports for code splitting
 * Lazy loads non-critical components to reduce initial bundle size
 */

import dynamic from "next/dynamic";

// Lazy load Spotlight - decorative component, not critical for initial render
export const DynamicSpotlight = dynamic(
  () => import("@/components/Spotlight"),
  {
    ssr: false,
    loading: () => null,
  },
);

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
