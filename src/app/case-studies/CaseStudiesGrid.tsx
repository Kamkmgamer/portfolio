"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  DollarSign,
  Rocket,
  Server,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BadgeColor = "green" | "amber" | "blue" | "violet";

type Study = {
  title: string;
  summary: string;
  stack: string;
  category?: string;
  badges: { icon: React.ReactNode; label: string; color: BadgeColor }[];
  href: string;
};

const caseStudies: Study[] = [
  {
    title: "DevServe — Enterprise-Grade SaaS Platform",
    summary: "Built in 35 days. Industry-estimated cost: $90k–$130k.",
    stack:
      "React, Node/Express, Prisma, PostgreSQL, Docker, Stripe/PayPal, CI/CD, monitoring.",
    category: "SaaS",
    badges: [
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
        label: "Security",
        color: "blue",
      },
    ],
    href: "/case-studies/devserve",
  },
  {
    title: "Realtime Analytics Pipeline",
    summary: "Stream processing for 20M+ events/day with <200ms dashboards.",
    stack:
      "Kafka, ClickHouse, Node, Timeseries modeling, edge caching, Grafana.",
    category: "Data Platform",
    badges: [
      {
        icon: <Server className="h-3.5 w-3.5" />,
        label: "20M+/day",
        color: "violet",
      },
      {
        icon: <Clock className="h-3.5 w-3.5" />,
        label: "<200ms",
        color: "green",
      },
      {
        icon: <ShieldCheck className="h-3.5 w-3.5" />,
        label: "HA/DR",
        color: "blue",
      },
    ],
    href: "/case-studies/realtime-analytics",
  },
  {
    title: "Go-to-Market Launch Site",
    summary: "High-converting marketing experience shipped in one week.",
    stack:
      "Next.js App Router, ISR, SEO, A/B testing hooks, PostHog analytics.",
    category: "Growth",
    badges: [
      {
        icon: <Rocket className="h-3.5 w-3.5" />,
        label: "+38% CTR",
        color: "amber",
      },
      {
        icon: <Clock className="h-3.5 w-3.5" />,
        label: "7 days",
        color: "green",
      },
      {
        icon: <ShieldCheck className="h-3.5 w-3.5" />,
        label: "Core Web Vitals",
        color: "blue",
      },
    ],
    href: "/case-studies/gtm-launch",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const badgeColor = (c: BadgeColor) =>
  c === "green"
    ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 text-white shadow-lg shadow-green-500/25 dark:from-green-500 dark:to-emerald-600 dark:shadow-green-400/20"
    : c === "amber"
    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500 text-white shadow-lg shadow-amber-500/25 dark:from-amber-500 dark:to-orange-600 dark:shadow-amber-400/20"
    : c === "blue"
    ? "bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 dark:from-blue-600 dark:to-cyan-700 dark:shadow-blue-400/20"
    : "bg-gradient-to-r from-violet-500 to-cyan-600 border-violet-600 text-white shadow-lg shadow-violet-500/25 dark:from-violet-600 dark:to-cyan-700 dark:shadow-violet-400/20";

export default function CaseStudiesGrid() {
  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {caseStudies.map((study) => (
          <motion.article key={study.title} variants={item}>
            <Card className="group h-full overflow-hidden shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <CardHeader className="relative">
                {study.category && (
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-black/20 dark:border-white/15 bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide shadow-sm">
                    {study.category}
                  </span>
                )}
                <CardTitle className="text-xl font-semibold leading-tight">
                  {study.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{study.summary}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {study.stack}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {study.badges.map((b, idx) => (
                    <span
                      key={`${study.title}-badge-${idx}`}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${badgeColor(
                        b.color
                      )}`}
                    >
                      {b.icon}
                      {b.label}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    aria-label={`Read case study: ${study.title}`}
                  >
                    Read case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
