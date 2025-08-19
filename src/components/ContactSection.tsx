'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, cubicBezier, type Variants } from 'framer-motion';
import { contactMethods } from '../data/contactMethods';
import { useTheme } from 'next-themes';

type ContactMethod = (typeof contactMethods)[number];

const cardEase = cubicBezier(0.22, 1, 0.36, 1);

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cardEase },
  },
};

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cardEase },
  },
};

const ContactSection: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const reduceMotion = useReducedMotion();

  // Avoid hydration mismatch by using a deterministic icon on the server
  // and swapping to the theme-specific icon after mount.
  const getIcon = (m: ContactMethod) =>
    (mounted ? (resolvedTheme === 'dark' ? m.iconDark : m.iconLight) : m.iconLight);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full bg-gradient-to-b from-surface-light to-background-light dark:from-surface-dark dark:to-background-dark py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          id="contact-title"
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-50 drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] tracking-tight"
        >
          Get In{' '}
          <span className="bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 dark:from-pink-400 dark:via-red-300 dark:to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            Touch
          </span>
        </motion.h2>

        <motion.ul
          role="list"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {contactMethods.map((method) => {
            const icon = getIcon(method);
            return (
              <motion.li key={method.id} variants={itemVariants}>
                <motion.a
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  aria-label={`Contact via ${method.title}`}
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.04, y: -2 }
                  }
                  whileFocus={
                    reduceMotion ? undefined : { scale: 1.02, y: -1 }
                  }
                  transition={{ duration: 0.25, ease: cardEase }}
                  className="group block relative overflow-hidden rounded-3xl shadow-xl bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-dark"
                >
                  {/* Icon + Glow */}
                  <div className="relative w-16 h-16 mb-4">
                    <motion.img
                      suppressHydrationWarning
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      initial={reduceMotion ? undefined : { opacity: 0 }}
                      animate={reduceMotion ? undefined : { opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {!reduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        initial={{ filter: 'brightness(1)' }}
                        whileHover={{
                          filter: `brightness(1.2) drop-shadow(0 0 25px ${method.glowColor}) drop-shadow(0 0 45px ${method.glowColor})`,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-text-strong dark:text-text-dark">
                    {method.title}
                  </h3>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {method.description}
                  </p>

                  {/* Subtle gradient hover sheen */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(40rem_20rem_at_120%_-20%,rgba(236,72,153,0.12),transparent_60%),radial-gradient(30rem_16rem_at_-20%_120%,rgba(250,204,21,0.10),transparent_60%)]"
                  />
                </motion.a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default ContactSection;