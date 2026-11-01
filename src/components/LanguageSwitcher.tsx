"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  /** When true, renders as a direct toggle button (for mobile menus). */
  directToggle?: boolean;
}

export default function LanguageSwitcher({
  currentLocale,
  directToggle = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const otherLocale = locales.find((l) => l !== currentLocale) ?? locales[0];

  // ── Direct-toggle mode (mobile menu) ────────────────────────────────────
  if (directToggle) {
    return (
      <button
        type="button"
        onClick={() => router.push(switchLocale(otherLocale))}
        className="instr-label font-semibold text-evt-track hover:text-evt-ink transition-colors cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-2"
        aria-label={`Switch to ${localeNames[otherLocale]}`}
      >
        {localeNames[otherLocale]}
      </button>
    );
  }

  // ── Default dropdown mode (desktop navbar) ───────────────────────────────
  return (
    <div className="relative group">
      <button
        type="button"
        className="inline-flex items-center justify-center w-9 h-9 border border-evt-line-strong text-evt-steel hover:text-evt-track hover:border-evt-track transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-2"
        aria-label="Change language"
        aria-haspopup="menu"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      </button>

      <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-opacity duration-200 z-50">
        <div className="instr-panel min-w-[150px] shadow-[0_18px_50px_-24px_rgba(4,10,18,0.6)]">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={switchLocale(locale)}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                locale === currentLocale
                  ? "text-evt-track bg-evt-panel2"
                  : "text-evt-steel hover:text-evt-ink hover:bg-evt-panel2"
              }`}
            >
              <span className="font-medium">{localeNames[locale]}</span>
              {locale === currentLocale && (
                <span className="ms-auto w-1.5 h-1.5 rounded-full bg-evt-track" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
