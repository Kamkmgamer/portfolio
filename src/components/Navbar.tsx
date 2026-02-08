"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, cubicBezier, useScroll } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

type NavLink = {
  label: string;
  href: string;
};

const links: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Research", href: "/research" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Demos", href: "/demos" },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuId = "mobile-nav-menu";
  const backdropId = "mobile-nav-backdrop";
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);

  // Scroll-based effects
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (y) => {
      setHasScrolled(y > 50);
    });
  }, [scrollY]);

  // Active section tracking
  const activeHash = useActiveHash(
    links.map((l) => l.href).filter((h) => h.startsWith("#")),
  );
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  // Focus trap for mobile menu
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

  // Lock body scroll and close on resize
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
    return pathname === href ? "page" : undefined;
  };

  return (
    <motion.nav
      aria-label="Main"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Glassmorphism background - fades in on scroll */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hasScrolled ? 1 : 0,
          backdropFilter: hasScrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: hasScrolled ? "var(--glass-bg)" : "transparent",
          borderBottom: hasScrolled
            ? "1px solid var(--glass-border)"
            : "1px solid transparent",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2 text-2xl sm:text-3xl font-display tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-gold))] focus-visible:ring-offset-2 rounded"
        >
          <motion.span
            className="relative bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Khalil
            {/* Glow effect on hover */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              aria-hidden="true"
            >
              Khalil
            </span>
          </motion.span>
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full glass-card px-2 py-1.5">
            {links.map((item) => {
              const isActive = getAriaCurrent(item.href) === "page";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative group px-4 py-2 rounded-full text-sm font-medium text-text/70 hover:text-text outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-gold))] focus-visible:ring-offset-2 transition-colors duration-200"
                >
                  <span className="relative z-10 uppercase tracking-widest text-[0.7rem] font-semibold">
                    {item.label}
                  </span>

                  {/* Active background pill */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--accent-gold))]/10 via-[hsl(var(--accent-gold))]/5 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover underline effect */}
                  <span className="pointer-events-none absolute left-4 right-4 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[hsl(var(--accent-gold))] to-transparent transition-transform duration-300 rounded-full" />
                </Link>
              );
            })}
          </div>

          {/* Theme toggle with glow effect */}
          <motion.div
            className="ml-2 p-1 rounded-full glass-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          ref={toggleBtnRef}
          type="button"
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl glass-card text-text/80 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
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
                transition={{ duration: 0.2 }}
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id={backdropId}
              aria-hidden
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
              className="md:hidden fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              id={menuId}
              role="menu"
              aria-label="Mobile navigation"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, ease },
              }}
              exit={{
                y: -20,
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2, ease },
              }}
              className="md:hidden fixed top-[env(safe-area-inset-top)] left-0 right-0 z-[80] pt-20 px-4"
            >
              <div className="rounded-3xl glass-card shadow-2xl overflow-hidden">
                <div className="flex flex-col gap-1 p-4">
                  {links.map((item, index) => {
                    const isActive = getAriaCurrent(item.href) === "page";
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          role="menuitem"
                          aria-current={isActive ? "page" : undefined}
                          onClick={closeMenu}
                          className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 text-lg font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 text-gray-900 dark:text-white"
                              : "text-text/80 hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                          {isActive && (
                            <motion.span
                              layoutId="mobile-active-indicator"
                              className="ml-auto inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Theme toggle row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.05, duration: 0.3 }}
                    className="mt-2 pt-4 flex items-center justify-between rounded-2xl px-4 py-4 border-t border-gray-200/50 dark:border-white/10"
                  >
                    <span className="text-base font-semibold text-text/80">
                      Theme
                    </span>
                    <ThemeToggle />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
