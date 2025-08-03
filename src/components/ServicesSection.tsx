'use client';

import React from 'react';
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import { Code, Layout, Settings, Database, Globe, Cloud } from 'lucide-react';

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Building responsive and performant web applications using Next.js and React.',
    icon: (
      <Code className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description:
      'Crafting intuitive and engaging user interfaces with modern design principles.',
    icon: (
      <Layout className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
  {
    id: 3,
    title: 'Technical Consulting',
    description:
      'Providing expert advice on tech stacks, architecture, and best practices.',
    icon: (
      <Settings className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
  {
    id: 4,
    title: 'Odoo Customization',
    description:
      'Tailor-made ERP solutions with Odoo to streamline your business processes.',
    icon: (
      <Database className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
  {
    id: 5,
    title: 'WordPress Development',
    description:
      'Custom themes and plugins for scalable WordPress websites.',
    icon: (
      <Globe className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
  {
    id: 6,
    title: 'Webflow Design',
    description:
      'Pixel-perfect, no-code websites crafted in Webflow for rapid deployment.',
    icon: (
      <Cloud className="w-12 h-12 text-primary-light dark:text-primary-dark" />
    ),
  },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2
          id="services-title"
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Services
          </span>
        </h2>

        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.li key={service.id} variants={itemVariants}>
              <motion.div
                whileHover={
                  reduceMotion ? undefined : { y: -3, scale: 1.03 }
                }
                transition={{ duration: 0.25, ease }}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 ring-1 ring-black/5 dark:ring-white/10 focus-within:ring-2 focus-within:ring-blue-500"
              >
                <div
                  className="mb-4 grid place-items-center rounded-xl p-3 bg-white/60 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
                  {service.title}
                </h3>

                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-dark"
                >
                  Learn more
                </a>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}