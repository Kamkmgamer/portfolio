"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from "framer-motion";
import { Code, Layout, Settings, Database, Globe, Cloud } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Web Engineering",
    description:
      "Developing high-performance, bespoke web architectures with Next.js and React.",
    icon: <Code className="w-8 h-8" />,
    gradient: "from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]",
    glowColor: "rgba(212, 175, 55, 0.2)",
  },
  {
    id: 2,
    title: "Luxury UI Design",
    description:
      "Crafting sophisticated interfaces that define digital elegance and superior UX.",
    icon: <Layout className="w-8 h-8" />,
    gradient:
      "from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))]",
    glowColor: "rgba(212, 175, 55, 0.2)",
  },
  {
    id: 3,
    title: "Technical Strategy",
    description:
      "Architectural consulting for complex digital products and growth scalability.",
    icon: <Settings className="w-8 h-8" />,
    gradient: "from-[hsl(var(--accent-bronze))] to-black",
    glowColor: "rgba(166, 124, 0, 0.2)",
  },
  {
    id: 4,
    title: "Enterprise Solutions",
    description:
      "Custom ERP and business process automation built for operational excellence.",
    icon: <Database className="w-8 h-8" />,
    gradient: "from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]",
    glowColor: "rgba(212, 175, 55, 0.2)",
  },
  {
    id: 5,
    title: "eCommerce Mastery",
    description:
      "Distinctive online stores designed to convert and built to last.",
    icon: <Globe className="w-8 h-8" />,
    gradient:
      "from-[hsl(var(--accent-bronze))] via-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]",
    glowColor: "rgba(166, 124, 0, 0.2)",
  },
  {
    id: 6,
    title: "Digital Ecosystems",
    description:
      "Integrated multi-platform experiences that resonate with modern audiences.",
    icon: <Cloud className="w-8 h-8" />,
    gradient:
      "from-black via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))]",
    glowColor: "rgba(212, 175, 55, 0.1)",
  },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease },
    }),
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative py-28 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[hsl(var(--accent-gold))]/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[hsl(var(--accent-bronze))]/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--accent-gold))] mb-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[hsl(var(--accent-gold))] to-transparent" />
            What I Do
            <span className="w-12 h-[1px] bg-gradient-to-l from-[hsl(var(--accent-gold))] to-transparent" />
          </span>

          <h2
            id="services-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight"
          >
            <span className="text-text italic font-normal">Our </span>
            <span className="bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))] bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="mt-4 text-lg text-text/60 max-w-2xl mx-auto">
            Comprehensive solutions tailored to bring your digital vision to
            life
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.li
                key={service.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative h-full group"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-3xl blur-xl"
                    style={{ background: service.glowColor }}
                    animate={{ opacity: isHovered ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Card */}
                  <div className="relative h-full glass-card rounded-3xl p-8 flex flex-col items-center text-center">
                    {/* Icon container with gradient */}
                    <div className="relative mb-8">
                      <div
                        className={`w-20 h-20 bg-black flex items-center justify-center text-[hsl(var(--accent-gold))] border border-[hsl(var(--accent-gold))]/30 shadow-2xl relative z-10`}
                      >
                        {service.icon}
                      </div>

                      {/* Animated glow ring */}
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-br ${service.gradient} blur-xl`}
                        animate={{ opacity: isHovered ? 0.3 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <h3 className="text-2xl font-display mb-4 text-text uppercase tracking-widest text-[1rem]">
                      {service.title}
                    </h3>

                    <p className="text-text/60 mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* CTA link */}
                    <motion.a
                      href="/contact"
                      className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Get Started
                      <svg
                        className="w-4 h-4"
                        style={{ color: service.glowColor }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.a>

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
