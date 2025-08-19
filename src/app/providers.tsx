"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system" // Follow user's OS preference by default
      enableSystem={true} // Respect system light/dark mode
    >
      {children}
    </ThemeProvider>
  );
}
