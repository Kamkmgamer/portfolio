'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contactMethods } from '../data/contactMethods';
import { useTheme } from 'next-themes';

const ContactSection: React.FC = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-surface-light to-background-light dark:from-surface-dark dark:to-background-dark py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-12 dark:text-gray-50 drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
        >
          Get In{' '}
          <span className="bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 dark:from-pink-400 dark:via-red-300 dark:to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            Touch
          </span>
        </motion.h2>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.id}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noopener noreferrer' : undefined}
              aria-label={`Contact via ${method.title}`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group block relative overflow-hidden rounded-3xl shadow-xl bg-surface-light dark:bg-surface-dark transition-transform duration-500 p-6 cursor-pointer"
            >
              {/* Icon with Glow */}
              <motion.div
                initial={{ filter: 'brightness(1)' }}
                whileHover={{
                  filter: `brightness(1.2) drop-shadow(0 0 25px ${method.glowColor}) drop-shadow(0 0 50px ${method.glowColor})`,
                }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mb-4 transition-all duration-500 will-change-transform will-change-filter"
              >
                <img
                  src={
                    mounted
                      ? resolvedTheme === 'dark'
                        ? method.iconDark
                        : method.iconLight
                      : method.iconLight
                  }
                  alt={method.title}
                  className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">
                {method.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-900">
                {method.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
