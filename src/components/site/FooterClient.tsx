"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/data/site";
import { ArrowForward } from "./icons";

/** Global conversion band. Hidden on the contact page, where it would be redundant. */
export function FooterCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  if (pathname?.startsWith(`/${locale}/contact`)) return null;

  return (
    <section aria-labelledby="footer-cta-title" className="container-site pb-[var(--section-y)] pt-[calc(var(--section-y)*0.5)]">
      <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-14 text-paper sm:px-10 md:px-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-24 size-[22rem] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "var(--accent)" }}
        />
        <h2
          id="footer-cta-title"
          className="text-h1 relative max-w-[16ch] text-paper"
        >
          {dict.footer.ctaTitle}
        </h2>
        <p className="relative mt-5 max-w-[48ch] text-lg leading-relaxed text-[color-mix(in_oklab,var(--paper)_72%,transparent)]">
          {dict.footer.ctaDescription}
        </p>
        <div className="relative mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/contact`}
            className="btn btn-lg bg-paper text-ink hover:bg-[color-mix(in_oklab,var(--paper)_88%,var(--ink))]"
          >
            {dict.footer.ctaButton}
            <ArrowForward />
          </Link>
          <p className="text-[0.9375rem] text-[color-mix(in_oklab,var(--paper)_65%,transparent)]">
            {dict.footer.orEmail}{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-paper underline decoration-[color-mix(in_oklab,var(--paper)_35%,transparent)] underline-offset-4 transition-colors hover:decoration-paper"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Live local time in Cairo. Rendered after mount to avoid hydration mismatch. */
export function LocalTime({ locale, label }: { locale: Locale; label: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: site.timeZone,
      }).format(now)
    : "––:––";

  return (
    <span className="inline-flex items-center gap-2 text-[0.8125rem] text-muted">
      {label}
      <span className="font-mono text-ink-2 tabular" suppressHydrationWarning>
        {time}
      </span>
    </span>
  );
}
