'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

type NavLink = {
  label: string;
  href: string;
};

const links: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
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
              (b.target as HTMLElement).offsetTop
          );
        if (visible[0]) {
          setActive('#' + visible[0].target.id);
        }
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return active;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuId = 'mobile-nav-menu';
  const backdropId = 'mobile-nav-backdrop';
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);

  // If your links are hash links, use IntersectionObserver to track active section
  const activeHash = useActiveHash(links.map((l) => l.href).filter((h) => h.startsWith('#')));

  // If you have route-based pages, you can still read the pathname
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  // Focus trap minimal implementation for the mobile menu
  React.useEffect(() => {
    if (!isOpen) return;

    const focusable = Array.from(
      document
        .getElementById(menuId)
        ?.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        ) ?? []
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        toggleBtnRef.current?.focus();
      }
      if (e.key === 'Tab') {
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

    document.addEventListener('keydown', onKeyDown);
    first?.focus({ preventScroll: true });
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Lock body scroll and close on resize to md+
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };

    window.addEventListener('resize', onResize);

    const prevOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  const getAriaCurrent = (href: string) => {
    // If it's a hash link, compare with activeHash
    if (href.startsWith('#')) {
      return activeHash === href ? 'page' : undefined;
    }
    // If it's a route link, compare pathname
    return pathname === href ? 'page' : undefined;
  };

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 bg-surface-light/60 dark:bg-surface-dark/60 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl border-b border-black/5 dark:border-white/5"
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        >
          Khalil
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] p-1">
            {links.map((item) => {
              const isActive = getAriaCurrent(item.href) === 'page';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative group px-3 py-1.5 rounded-full text-sm font-medium text-text-light/80 dark:text-text-dark/80 hover:text-text-light dark:hover:text-text-dark outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <span className="relative z-10">{item.label}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-primary-light/15 dark:bg-primary-dark/15"
                        transition={{ duration: 0.3, ease }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300" />
                </Link>
              );
            })}
          </div>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={toggleMenu}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-light dark:text-text-dark hover:bg-black/[0.06] dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Backdrop + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              id={backdropId}
              aria-hidden
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
              className="md:hidden fixed inset-0 z-40 bg-black/40"
            />
            <motion.div
              id={menuId}
              role="menu"
              aria-label="Mobile navigation"
              initial={{ y: -24, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.25, ease },
              }}
              exit={{
                y: -24,
                opacity: 0,
                transition: { duration: 0.2, ease },
              }}
              className="md:hidden fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50"
            >
              <div className="mx-3 rounded-2xl border border-black/10 dark:border-white/10 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl shadow-lg">
                <div className="flex flex-col gap-1 p-2">
                  {links.map((item) => {
                    const isActive = getAriaCurrent(item.href) === 'page';
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={closeMenu}
                        className="relative flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-text-light dark:text-text-dark hover:bg-black/[0.06] dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {item.label}
                        {isActive && (
                          <span className="ml-auto inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        )}
                      </Link>
                    );
                  })}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2">
                    <span className="text-sm text-text-light/70 dark:text-text-dark/70">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
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