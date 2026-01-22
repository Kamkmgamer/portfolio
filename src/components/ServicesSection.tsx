"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  cubicBezier,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Code, Layout, Settings, Database, Globe, Cloud } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
};

const services: Service[] = [
  {
    id: 1,
    title: "Web Engineering",
    description:
      "Architecting high-performance, scalable web solutions with cutting-edge technologies.",
    icon: <Code className="w-7 h-7" />,
    features: ["Next.js / React", "TypeScript", "Performance Optimization"],
  },
  {
    id: 2,
    title: "Interface Design",
    description:
      "Crafting sophisticated interfaces that blend form and function into seamless experiences.",
    icon: <Layout className="w-7 h-7" />,
    features: ["UI/UX Design", "Design Systems", "Prototyping"],
  },
  {
    id: 3,
    title: "Technical Strategy",
    description:
      "Architectural consulting for complex digital ecosystems built for scale.",
    icon: <Settings className="w-7 h-7" />,
    features: ["System Architecture", "Code Reviews", "Tech Stack Selection"],
  },
  {
    id: 4,
    title: "Enterprise Solutions",
    description:
      "Custom enterprise applications engineered for operational excellence.",
    icon: <Database className="w-7 h-7" />,
    features: ["ERP Systems", "API Development", "Database Design"],
  },
  {
    id: 5,
    title: "eCommerce Mastery",
    description:
      "Building distinctive online stores designed to convert and built to last.",
    icon: <Globe className="w-7 h-7" />,
    features: ["Shopify / Custom", "Payment Integration", "Conversion Focus"],
  },
  {
    id: 6,
    title: "Digital Ecosystems",
    description:
      "Integrated multi-platform experiences that resonate with modern audiences.",
    icon: <Cloud className="w-7 h-7" />,
    features: ["Cloud Architecture", "DevOps", "Scalability"],
  },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

// Animated section header
function SectionHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div ref={ref} className="relative mb-24">
      {/* Background number */}
      <motion.span
        className="absolute -top-20 left-0 text-[15rem] font-display font-bold text-[hsl(var(--accent-ember)/0.03)] leading-none select-none pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease }}
      >
        02
      </motion.span>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <motion.span
            className="w-16 h-px bg-linear-to-r from-ember to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-ember">
            What I Do
          </span>
        </div>

        {/* Title */}
        <h2
          id="services-title"
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display tracking-tight"
        >
          <motion.span
            className="inline-block text-[hsl(var(--text))] font-light italic"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            Specialized
          </motion.span>{" "}
          <motion.span
            className="inline-block gradient-text"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            Services
          </motion.span>
        </h2>

        <motion.p
          className="mt-6 text-lg text-[hsl(var(--text)/0.6)] max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          Comprehensive digital solutions crafted with precision and passion
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Service card component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-px rounded-sm bg-linear-to-br from-[hsl(var(--accent-ember)/0.3)] via-transparent to-[hsl(var(--accent-rust)/0.2)] opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Card */}
      <motion.div
        className="relative h-full bg-[hsl(var(--surface))] border border-[hsl(var(--accent-ember)/0.1)] p-8 lg:p-10 overflow-hidden"
        whileHover={reduceMotion ? {} : { y: -8, scale: 1.01 }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24">
          <motion.div
            className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-[hsl(var(--accent-ember)/0.1)] to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 right-4 w-px h-8 bg-[hsl(var(--accent-ember)/0.3)]"
            animate={{ scaleY: isHovered ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 right-4 w-8 h-px bg-[hsl(var(--accent-ember)/0.3)]"
            animate={{ scaleX: isHovered ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Number */}
        <motion.span
          className="absolute top-6 left-8 text-6xl font-display text-[hsl(var(--accent-ember)/0.08)] font-bold"
          animate={{ opacity: isHovered ? 0.15 : 0.08 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Content */}
        <div className="relative z-10 pt-12">
          {/* Icon */}
          <motion.div
            className="mb-8 w-14 h-14 flex items-center justify-center bg-[hsl(var(--background))] border border-[hsl(var(--accent-ember)/0.2)] text-ember"
            animate={{
              borderColor: isHovered
                ? "hsl(var(--accent-ember))"
                : "hsl(var(--accent-ember) / 0.2)",
              boxShadow: isHovered
                ? "0 0 30px hsl(var(--accent-ember) / 0.2)"
                : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-display mb-4 tracking-tight text-[hsl(var(--text))]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[hsl(var(--text)/0.6)] mb-8 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3 text-sm text-[hsl(var(--text)/0.5)]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.1 + 0.3 }}
              >
                <span className="w-1 h-1 rounded-full bg-ember" />
                {feature}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-ember group/link"
            whileHover={{ x: 4 }}
          >
            <span>Learn More</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.a>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
            animate={{ translateX: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8, ease }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        {/* Large blurred orb */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[hsl(var(--accent-ember)/0.05)] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[hsl(var(--accent-rust)/0.05)] rounded-full blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--accent-ember)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent-ember)) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-lg text-[hsl(var(--text)/0.5)] mb-8">
            Have a project in mind? Let&apos;s create something extraordinary.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 btn-premium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start a Project</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
