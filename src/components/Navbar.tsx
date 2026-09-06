"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, Dictionary } from "@/lib/i18n";

type NavLink = {
  labelKey: keyof Dictionary["nav"];
  href: string;
};

const links: NavLink[] = [
  { labelKey: "projects", href: "/projects" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "demos", href: "/demos" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "research", href: "/research" },
  { labelKey: "contact", href: "/contact" },
];

/** The brand mark: a 4x4 dot matrix, the only ornament in the system. */
export function DotMatrix({ className }: { className?: string }) {
  const dots = Array.from({ length: 16 }, (_, i) => ({
    x: (i % 4) * 4 + 1,
    y: Math.floor(i / 4) * 4 + 1,
  }));
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {dots.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width="2" height="2" />
      ))}
    </svg>
  );
}

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Metro pivot header. The navigation is a horizontal row of lowercase links
 * that scrolls (and crops) on narrow screens; there is no hamburger.
 */
const Navbar: React.FC<NavbarProps> = ({ locale, dict }) => {
  const pathname = usePathname();
  const pivotRef = React.useRef<HTMLElement>(null);

  const isCurrent = (href: string) =>
    pathname === `/${locale}${href}` || pathname?.startsWith(`/${locale}${href}/`);

  React.useEffect(() => {
    const active = pivotRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    active?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-ground">
      <div
        className="flex h-16 items-center gap-5 sm:gap-8"
        style={{ paddingInline: "var(--page-inline)" }}
      >
        <Link
          href={`/${locale}`}
          className="m-lower inline-flex shrink-0 items-center gap-2 text-[1.25rem] font-light leading-none text-ink hover:text-lime-ink focus-visible:text-lime-ink focus-visible:outline-none"
        >
          <span>{locale === "ar" ? "خليل" : "khalil"}</span>
          <DotMatrix className="text-lime-ink" />
          <span className="sr-only">{dict.nav.home}</span>
        </Link>

        <nav ref={pivotRef} aria-label="Main" className="m-pivot m-lower min-w-0 flex-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {dict.nav[item.labelKey]}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
