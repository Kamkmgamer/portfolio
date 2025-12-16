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
    title: "Web Development",
    description:
      "Building responsive and performant web applications using Next.js and React.",
    icon: <Code className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Crafting intuitive and engaging user interfaces with modern design principles.",
    icon: <Layout className="w-8 h-8" />,
    gradient: "from-cyan-500 to-emerald-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: 3,
    title: "Technical Consulting",
    description:
      "Providing expert advice on tech stacks, architecture, and best practices.",
    icon: <Settings className="w-8 h-8" />,
    gradient: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.5)",
  },
  {
    id: 4,
    title: "Odoo Customization",
    description:
      "Tailor-made ERP solutions with Odoo to streamline your business processes.",
    icon: <Database className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: 5,
    title: "WordPress Development",
    description: "Custom themes and plugins for scalable WordPress websites.",
    icon: <Globe className="w-8 h-8" />,
    gradient: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
  {
    id: 6,
    title: "Webflow Design",
    description:
      "Pixel-perfect, no-code websites crafted in Webflow for rapid deployment.",
    icon: <Cloud className="w-8 h-8" />,
    gradient: "from-violet-500 to-cyan-500",
    glowColor: "rgba(139, 92, 246, 0.5)",
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
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            What I Do
            <span className="w-8 h-0.5 bg-gradient-to-l from-blue-500 to-cyan-500 rounded-full" />
          </span>

          <h2
            id="services-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-text">My </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
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
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 flex items-center justify-center text-white shadow-lg`}
                      >
                        {service.icon}
                      </div>

                      {/* Animated glow ring */}
                      <motion.div
                        className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${service.gradient} blur-xl`}
                        animate={{ opacity: isHovered ? 0.4 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-text">
                      {service.title}
                    </h3>

                    <p className="text-text/60 mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* CTA link */}
                    <motion.a
                      href="#contact"
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
