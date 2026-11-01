"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { DynamicThemeToggle as ThemeToggle } from "@/lib/dynamic-imports";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, Dictionary } from "@/lib/i18n";

type NavLink = {
  labelKey: keyof Dictionary["nav"];
  href: string;
};

const links: NavLink[] = [
  { labelKey: "projects", href: "/projects" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "contact", href: "/contact" },
  { labelKey: "research", href: "/research" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "demos", href: "/demos" },
];

const useActiveHash = (ids: string[]) => {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = ids
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]) {
          setActive("#" + visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="var(--evt-line-strong)" strokeWidth="1.25" strokeDasharray="42 8" />
      <circle cx="12" cy="12" r="6" stroke="var(--evt-line)" strokeWidth="1.25" strokeDasharray="22 6" />
      <circle cx="12" cy="12" r="2" fill="var(--evt-track)" />
      <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="var(--evt-line-strong)" strokeWidth="1" />
    </svg>
  );
}

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

const Navbar: React.FC<NavbarProps> = ({ locale, dict }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuId = "mobile-nav-menu";
  const backdropId = "mobile-nav-backdrop";
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeHash = useActiveHash(
    links.map((l) => l.href).filter((h) => h.startsWith("#")),
  );
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  React.useEffect(() => {
    if (!isOpen) return;

    const focusable = Array.from(
      document
        .getElementById(menuId)
        ?.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        toggleBtnRef.current?.focus();
      }
      if (e.key === "Tab") {
        if (focusable.length === 0) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    first?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };

    window.addEventListener("resize", onResize);

    const prevOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const menuEl = document.getElementById(menuId);
      const target = e.target as Node | null;
      const clickedToggle = !!(
        toggleBtnRef.current &&
        target &&
        toggleBtnRef.current.contains(target)
      );
      const clickedInsideMenu = !!(menuEl && target && menuEl.contains(target));
      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onDocClick, true);
    return () => document.removeEventListener("mousedown", onDocClick, true);
  }, [isOpen]);

  const getAriaCurrent = (href: string) => {
    if (href.startsWith("#")) {
      return activeHash === href ? "page" : undefined;
    }
    return pathname === `/${locale}${href}` || pathname === `/${locale}${href}/` ? "page" : undefined;
  };

  return (
    <nav
      aria-label="Main"
      className="instrument fixed top-0 left-0 right-0 z-50 font-instr-sans transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--evt-bg) 92%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--evt-line)" : "transparent"}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-[4.5rem] flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="group inline-flex items-center gap-3 rounded-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-3"
        >
          <BrandMark />
          <span className="font-instr-display font-extrabold text-lg tracking-[-0.01em] text-evt-ink">
            {locale === "ar" ? "خليل" : "Khalil"}
            <span className="hidden sm:inline font-instr-mono font-medium text-[0.625rem] tracking-[0.22em] uppercase text-evt-steel ms-2.5 align-middle">
              ABDALMAGEED
            </span>
          </span>
          <span className="sr-only">{dict.nav.home}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {links.map((item) => {
              const isActive = getAriaCurrent(item.href) === "page";
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`instr-label group relative py-1 transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-3 ${
                    isActive ? "text-evt-track" : "text-evt-steel hover:text-evt-ink"
                  }`}
                >
                  {dict.nav[item.labelKey]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-evt-track origin-center transition-transform duration-200 rtl:origin-right ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <span className="w-px h-5 bg-evt-line" aria-hidden="true" />

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-evt-line-strong text-evt-ink hover:border-evt-track hover:text-evt-track transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)] focus-visible:outline-offset-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id={backdropId}
              aria-hidden
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="md:hidden fixed inset-0 z-[-1] bg-black/30"
            />

            <motion.div
              id={menuId}
              aria-label="Mobile navigation"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
              exit={{ y: -12, opacity: 0, transition: { duration: 0.15 } }}
              className="md:hidden fixed top-[calc(env(safe-area-inset-top)+4rem)] left-0 right-0 px-4"
              style={{ background: "transparent" }}
            >
              <div className="instr-panel shadow-[0_24px_60px_-30px_rgba(4,10,18,0.6)]">
                <div className="flex flex-col py-2">
                  {links.map((item) => {
                    const isActive = getAriaCurrent(item.href) === "page";
                    return (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={closeMenu}
                        className={`flex items-center justify-between px-5 py-3.5 border-b border-evt-line last:border-b-0 text-base font-semibold transition-colors duration-150 ${
                          isActive ? "text-evt-track" : "text-evt-ink hover:bg-evt-panel2"
                        }`}
                      >
                        {dict.nav[item.labelKey]}
                        {isActive && (
                          <span className="inline-block w-2 h-2 rounded-full bg-evt-track" aria-hidden="true" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between px-5 py-3.5 border-t border-evt-line">
                  <span className="instr-label text-evt-steel">{dict.common.language}</span>
                  <LanguageSwitcher currentLocale={locale} directToggle />
                </div>

                <div className="flex items-center justify-between px-5 py-3.5 border-t border-evt-line">
                  <span className="instr-label text-evt-steel">{dict.common.theme}</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
