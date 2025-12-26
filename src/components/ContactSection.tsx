"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from "framer-motion";
import { contactMethods } from "../data/contactMethods";
import { useTheme } from "next-themes";

type ContactMethod = (typeof contactMethods)[number];

const ease = cubicBezier(0.22, 1, 0.36, 1);

const ContactSection: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const reduceMotion = useReducedMotion();

  const getIcon = (m: ContactMethod) =>
    mounted
      ? resolvedTheme === "dark"
        ? m.iconDark
        : m.iconLight
      : m.iconLight;

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1, ease },
    }),
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full py-28 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[hsl(var(--accent-gold))]/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[hsl(var(--accent-bronze))]/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--accent-gold))] mb-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[hsl(var(--accent-gold))] to-transparent" />
            Get In Touch
            <span className="w-12 h-[1px] bg-gradient-to-l from-[hsl(var(--accent-gold))] to-transparent" />
          </span>

          <h2
            id="contact-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight"
          >
            <span className="text-text italic font-normal">Let&apos;s </span>
            <span className="bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <p className="mt-4 text-lg text-text/60 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => {
            const icon = getIcon(method);
            const isHovered = hoveredId === method.id;

            return (
              <motion.a
                key={method.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                aria-label={`Contact via ${method.title}`}
                onHoverStart={() => setHoveredId(method.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group block relative"
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative h-full"
                >
                  {/* Gold glow */}
                  <motion.div
                    className="absolute -inset-1 rounded-3xl blur-xl bg-[hsl(var(--accent-gold))]"
                    animate={{ opacity: isHovered ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Card */}
                  <div className="relative h-full glass-card rounded-3xl p-8 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-gold))] focus-visible:ring-offset-2">
                    {/* Icon with animated glow */}
                    <div className="relative w-20 h-20 mb-6">
                      <motion.img
                        suppressHydrationWarning
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* Glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[hsl(var(--accent-gold))]/20"
                        animate={{
                          opacity: isHovered ? 1 : 0.2,
                          scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <h3 className="text-2xl font-display mb-2 text-text group-hover:text-[hsl(var(--accent-gold))] transition-colors">
                      {method.title}
                    </h3>

                    <p className="text-text/60 mb-4 flex-grow">
                      {method.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-text/40 group-hover:text-[hsl(var(--accent-gold))] transition-colors">
                      <span>{method.external ? "Explore" : "Discover"}</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </div>

                    {/* Hover overlay gradient */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[hsl(var(--accent-gold))]/5 via-transparent to-[hsl(var(--accent-bronze))]/5" />
                  </div>
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="text-center mt-16 pt-16 border-t border-gray-200/50 dark:border-gray-800/50"
        >
          <p className="text-lg text-text/60 mb-6">
            Prefer email? Reach out directly
          </p>

          <motion.a
            href="mailto:contact@khalilmajeed.com"
            whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium"
          >
            <span>Send Me an Email</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
