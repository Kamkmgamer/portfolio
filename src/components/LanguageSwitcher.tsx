"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full glass-card hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-text/70" />
      </motion.button>

      <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="glass-card rounded-xl overflow-hidden shadow-xl border border-white/10 min-w-[140px]">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={switchLocale(locale)}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 dark:hover:bg-black/10 transition-colors ${
                locale === currentLocale
                  ? "text-[hsl(var(--accent-gold))] bg-[hsl(var(--accent-gold))]/5"
                  : "text-text/70"
              }`}
            >
              <span className="text-sm font-medium">{localeNames[locale]}</span>
              {locale === currentLocale && (
                <motion.div
                  layoutId="active-language"
                  className="ml-auto w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
