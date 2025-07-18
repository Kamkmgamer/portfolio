'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Settings, Database, Globe, Cloud } from 'lucide-react';

// Define your services data
const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive and performant web applications using Next.js and React.',
    icon: <Code className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and engaging user interfaces with modern design principles.',
    icon: <Layout className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
  {
    id: 3,
    title: 'Technical Consulting',
    description: 'Providing expert advice on tech stacks, architecture, and best practices.',
    icon: <Settings className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
  {
    id: 4,
    title: 'Odoo Customization',
    description: 'Tailor-made ERP solutions with Odoo to streamline your business processes.',
    icon: <Database className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
  {
    id: 5,
    title: 'WordPress Development',
    description: 'Custom themes and plugins for scalable WordPress websites.',
    icon: <Globe className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
  {
    id: 6,
    title: 'Webflow Design',
    description: 'Pixel-perfect, no-code websites crafted in Webflow for rapid deployment.',
    icon: <Cloud className="w-12 h-12 text-primary-light dark:text-primary-dark" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">Services</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
                {service.title}
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
