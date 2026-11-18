"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Two-locale site: a direct, accessible link to the same page in the other language. */
export default function LanguageSwitcher({
  currentLocale,
  className,
  showIcon = true,
}: {
  currentLocale: Locale;
  className?: string;
  showIcon?: boolean;
}) {
  const pathname = usePathname();
  const other = locales.find((l) => l !== currentLocale) ?? locales[0];

  const href = (() => {
    if (!pathname) return `/${other}`;
    const segments = pathname.split("/");
    segments[1] = other;
    return segments.join("/") || `/${other}`;
  })();

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      className={cn("btn btn-ghost btn-sm gap-1.5 px-3 text-ink-2", className)}
    >
      {showIcon && <Languages aria-hidden="true" strokeWidth={1.75} className="size-4" />}
      <span className={other === "ar" ? "font-[family-name:var(--font-plex-ar)]" : undefined}>
        {localeNames[other]}
      </span>
    </Link>
  );
}
