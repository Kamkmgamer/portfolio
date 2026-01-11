"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Code, Layout, Settings, Database, Globe, Cloud } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: 1,
    title: "Web Engineering",
    description:
      "Developing high-performance, bespoke web architectures with robust engineering standards.",
    icon: <Code className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Luxury UI Design",
    description:
      "Crafting sophisticated interfaces that define digital elegance and superior user experiences.",
    icon: <Layout className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "Technical Strategy",
    description:
      "Architectural consulting for complex digital products and future-proof scalability.",
    icon: <Settings className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Enterprise Systems",
    description:
      "Custom industrial-grade solutions built for operational excellence and high security.",
    icon: <Database className="w-8 h-8" />,
  },
  {
    id: 5,
    title: "Digital Commerce",
    description:
      "Distinctive online experiences designed to resonate with high-end global audiences.",
    icon: <Globe className="w-8 h-8" />,
  },
  {
    id: 6,
    title: "Scale Ecosystems",
    description:
      "Integrated multi-platform architectures that provide seamless and unified digital journeys.",
    icon: <Cloud className="w-8 h-8" />,
  },
];

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-32 bg-background z-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-ember font-sans font-bold uppercase tracking-[0.4em] text-[10px] block mb-6"
            >
              Services / Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-display leading-[0.9]"
            >
              The <span className="italic text-text/50">Core</span> <br />
              <span className="text-gradient">Specializations</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text-muted text-lg max-w-sm mb-4 leading-relaxed"
          >
            Delivering high-fidelity digital solutions that bridge the gap
            between conceptual vision and production reality.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-square p-12 bg-background hover:bg-surface transition-colors duration-700 group overflow-hidden"
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 flex items-start justify-end p-4">
                <div className="w-[1px] h-4 bg-ember/20 group-hover:h-full transition-all duration-700" />
                <div className="h-[1px] w-4 bg-ember/20 group-hover:w-full transition-all duration-700" />
              </div>

              <div className="relative z-10 h-full flex flex-col items-start justify-end">
                <div className="mb-auto text-ember">
                  <div className="p-4 border border-ember/10 group-hover:border-ember/30 transition-colors duration-500">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-3xl font-display mb-4 group-hover:text-ember transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed group-hover:text-text transition-colors duration-500">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-ember">Inquiry / Start</span>
                  <div className="w-8 h-[1px] bg-ember" />
                </div>
              </div>

              {/* Subtle background glow on hover */}
              <motion.div
                animate={{
                  opacity: hoveredId === service.id ? 0.05 : 0,
                  scale: hoveredId === service.id ? 1 : 0.8,
                }}
                className="absolute inset-0 bg-ember blur-[100px] pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
