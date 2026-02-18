"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  DollarSign,
  Server,
  Lightbulb,
  Heart,
  Palette,
  FileCode,
  Shield,
} from "lucide-react";
import { caseStudies } from "@/lib/content";

type BadgeColor = "green" | "amber" | "blue" | "violet";

const badgeConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: BadgeColor }[]
> = {
  "kamkmpdf-reliability": [
    {
      icon: <FileCode className="h-3.5 w-3.5" />,
      label: "HTML-First",
      color: "green",
    },
    {
      icon: <Shield className="h-3.5 w-3.5" />,
      label: "Future-Proof",
      color: "blue",
    },
    {
      icon: <FileCode className="h-3.5 w-3.5" />,
      label: "Source Available",
      color: "violet",
    },
  ],
  "kamkmpdf-scaling": [
    {
      icon: <Server className="h-3.5 w-3.5" />,
      label: "6,000/hr",
      color: "violet",
    },
    {
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "<2s latency",
      color: "green",
    },
    {
      icon: <DollarSign className="h-3.5 w-3.5" />,
      label: "Single worker",
      color: "amber",
    },
  ],
  devserve: [
    {
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "35 days",
      color: "green",
    },
    {
      icon: <DollarSign className="h-3.5 w-3.5" />,
      label: "$100k+ value",
      color: "amber",
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      label: "Secure",
      color: "blue",
    },
  ],
  "reducing-friction": [
    {
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      label: "Discovery",
      color: "violet",
    },
    {
      icon: <Palette className="h-3.5 w-3.5" />,
      label: "Design",
      color: "green",
    },
    {
      icon: <Heart className="h-3.5 w-3.5" />,
      label: "Experience",
      color: "amber",
    },
  ],
  "restaurant-websites-tiers": [
    {
      icon: <DollarSign className="h-3.5 w-3.5" />,
      label: "9 Tiers",
      color: "amber",
    },
    {
      icon: <Server className="h-3.5 w-3.5" />,
      label: "Live Demos",
      color: "green",
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      label: "Transparent",
      color: "blue",
    },
  ],
  "ecommerce-websites-tiers": [
    {
      icon: <DollarSign className="h-3.5 w-3.5" />,
      label: "6 Tiers",
      color: "amber",
    },
    {
      icon: <Server className="h-3.5 w-3.5" />,
      label: "Live Demos",
      color: "green",
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      label: "Own Your Tech",
      color: "violet",
    },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CaseStudiesGrid() {
  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {caseStudies.map((study) => {
          const badges = badgeConfig[study.slug] || [];
          return (
            <motion.article key={study.slug} variants={item}>
              <div className="group relative h-full flex flex-col justify-between p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-[hsl(var(--accent-gold))]/30 hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {study.category && (
                      <span className="text-[hsl(var(--accent-gold))] text-xs font-bold uppercase tracking-widest border border-[hsl(var(--accent-gold))]/20 px-3 py-1 bg-[hsl(var(--accent-gold))]/5">
                        {study.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display mb-4 group-hover:text-[hsl(var(--accent-gold))] transition-colors duration-300">
                    {study.title}
                  </h3>

                  <p className="text-text/70 text-sm mb-4 leading-relaxed">
                    {study.summary}
                  </p>
                  <p className="text-text/50 text-xs mb-8 font-mono">
                    {study.stack}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {badges.map((b, idx) => (
                      <span
                        key={`${study.slug}-badge-${idx}`}
                        className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-wider text-text/60 border border-text/10"
                      >
                        {b.icon}
                        {b.label}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[hsl(var(--accent-gold))] group/link"
                  >
                    Read case study
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
