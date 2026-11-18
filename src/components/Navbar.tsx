"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher, ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, Dictionary } from "@/lib/i18n";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/site/Logo";

type NavKey = "projects" | "caseStudies" | "demos" | "blog" | "research";

const links: { key: NavKey; href: string }[] = [
  { key: "projects", href: "/projects" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "demos", href: "/demos" },
  { key: "blog", href: "/blog" },
  { key: "research", href: "/research" },
];

export default function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuId = "site-menu";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on desktop resize.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Scroll lock, focus trap and Escape while the menu is open.
  React.useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    getFocusable()[0]?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...getFocusable()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return pathname === full || pathname?.startsWith(`${full}/`);
  };

  const contactActive = isActive("/contact");

  return (
    <header
      className={cn(
        "site-nav sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        // Any backdrop-filter makes the header the containing block for the fixed
        // mobile menu (collapsing it to the header's height), so the open state
        // must not carry one at all.
        open
          ? "border-b border-line bg-paper"
          : scrolled
            ? "border-b border-line bg-[color-mix(in_oklab,var(--paper)_86%,transparent)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-paper",
      )}
    >
      <div className="container-site flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          className="group -ms-1 inline-flex items-center gap-2.5 rounded-xl p-1"
          aria-label={`${site.name[locale]} — ${dict.nav.home}`}
        >
          <LogoMark className="h-7 text-ink transition-colors duration-300 group-hover:text-accent" />
          <span className="text-[0.975rem] font-semibold tracking-[-0.02em] text-ink rtl:tracking-normal">
            <span className="sm:hidden">{site.shortName[locale]}</span>
            <span className="hidden sm:inline">{site.name[locale]}</span>
          </span>
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.9rem] font-medium transition-colors",
                      active ? "bg-paper-2 text-ink" : "text-ink-2 hover:bg-paper-2 hover:text-ink",
                    )}
                  >
                    {dict.nav[link.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 lg:flex">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle labels={dict.theme} />
          </div>
          <Link
            href={`/${locale}/contact`}
            aria-current={contactActive ? "page" : undefined}
            className="btn btn-primary btn-sm ms-2 hidden sm:inline-flex"
          >
            {dict.nav.letsTalk}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost btn-icon ms-1 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? dict.nav.closeMenu : dict.nav.openMenu}</span>
            <span aria-hidden="true" className="relative block h-3 w-[1.15rem]">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-300",
                  open && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-300",
                  open && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-paper lg:hidden"
        >
          <nav aria-label={dict.nav.primary} className="container-site flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <ul className="grid">
              {[{ key: "home" as const, href: "" }, ...links, { key: "contact" as const, href: "/contact" }].map((link, i) => {
                const active = link.href === "" ? pathname === `/${locale}` : isActive(link.href);
                return (
                  <li
                    key={link.key}
                    className="border-b border-line"
                    style={{ animation: `menuIn 420ms var(--ease-out) both`, animationDelay: `${i * 35}ms` }}
                  >
                    <Link
                      href={`/${locale}${link.href}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 text-[1.75rem] font-semibold tracking-[-0.03em] transition-colors rtl:tracking-normal",
                        active ? "text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {dict.nav[link.key]}
                      {active && <span aria-hidden="true" className="size-2 rounded-full bg-accent" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto grid gap-5 pt-10">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted">{dict.common.language}</span>
                <LanguageSwitcher currentLocale={locale} className="btn-secondary" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted">{dict.theme.label}</span>
                <ThemeSwitcher labels={dict.theme} />
              </div>
              <a href={`mailto:${site.email}`} className="link mt-2 text-ink-2">
                {site.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
