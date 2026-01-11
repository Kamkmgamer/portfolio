"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Works" },
  { href: "/about", label: "Philosophy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav
          className={`flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? "glass px-8 py-4 rounded-full border border-white/5"
              : "px-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group relative">
            <span className="text-2xl font-display tracking-tighter text-text group-hover:text-ember transition-colors duration-500">
              Khalil
              <span className="italic text-text/30 group-hover:text-ember/30 transition-colors duration-500">
                .
              </span>
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-500" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 group ${
                      isActive ? "text-ember" : "text-text/40 hover:text-text"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ember transition-all duration-500 ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text p-2 hover:text-ember transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] md:hidden flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-4 text-text/50 hover:text-ember"
            >
              <X size={32} />
            </button>
            <ul className="text-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-display hover:text-ember transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
