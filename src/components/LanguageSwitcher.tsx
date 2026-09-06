"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  /** Kept for call-site compatibility; the switcher is always a direct toggle now. */
  directToggle?: boolean;
}

/**
 * A single square app-bar control that switches to the other locale.
 * The label is the other language's short code, set in that language's script.
 */
export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const otherLocale = locales.find((l) => l !== currentLocale) ?? locales[0];

  const targetPath = (() => {
    if (!pathname) return `/${otherLocale}`;
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    return segments.join("/");
  })();

  return (
    <Link
      href={targetPath}
      hrefLang={otherLocale}
      lang={otherLocale}
      dir={otherLocale === "ar" ? "rtl" : "ltr"}
      aria-label={`Switch to ${localeNames[otherLocale]}`}
      className="m-appbar-btn m-caption font-medium leading-none"
    >
      {otherLocale === "ar" ? "ع" : "en"}
    </Link>
  );
}
