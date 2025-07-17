"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // 🔥 Default to light theme
      enableSystem={false} // 🔒 Lock system preference (manual toggle only)
    >
      {children}
    </ThemeProvider>
  );
}
