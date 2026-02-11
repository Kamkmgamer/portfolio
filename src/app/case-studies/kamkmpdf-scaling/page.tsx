"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Clock,
  Database,
  Cpu,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Layers,
} from "lucide-react";

const stats = [
  {
    label: "Throughput",
    value: "6,000/hr",
    icon: Server,
    desc: "PDFs generated per hour",
  },
  {
    label: "P95 Latency",
    value: "<2s",
    icon: Clock,
    desc: "Response time at 95th percentile",
  },
  {
    label: "Infrastructure",
    value: "1 Worker",
    icon: Cpu,
    desc: "Single Railway instance",
  },
  {
    label: "Success Rate",
    value: "99.7%",
    icon: CheckCircle,
    desc: "Job completion rate",
  },
];

const optimizations = [
  {
    title: "Go Worker Rewrite",
    description:
      "Migrated from TypeScript to Go for better concurrency and memory efficiency using goroutines.",
    impact: "2x throughput increase",
  },
  {
    title: "Cerebras AI Integration",
    description:
      "Implemented priority-based AI model selection with Cerebras GPT-oss-120b as primary for high-speed inference.",
    impact: "5-10x faster than GPT-4",
  },
  {
    title: "Database Optimization",
    description:
      "Atomic job claiming with FOR UPDATE SKIP LOCKED, connection pooling, and strategic indexing.",
    impact: "Query time: 100ms → 5ms",
  },
  {
    title: "Browser Pooling",
    description:
      "Reusable Puppeteer instances instead of spawning new browsers per job.",
    impact: "10 concurrent PDFs, same memory",
  },
];

const techStack = [
  {
    category: "Frontend",
    techs: ["Next.js 15", "React 19", "Tailwind CSS", "tRPC"],
  },
  {
    category: "Worker",
    techs: ["Go", "Goroutines", "Railway", "Docker"],
  },
  {
    category: "Database",
    techs: ["PostgreSQL 14", "Drizzle ORM", "Connection Pooling"],
  },
  {
    category: "AI",
    techs: [
      "Cerebras GPT-oss-120b",
      "OpenRouter",
      "11 API Keys",
      "Auto-failover",
    ],
  },
  {
    category: "PDF Generation",
    techs: ["Puppeteer", "PDFKit", "Browser Pool", "Memory Management"],
  },
  {
    category: "Storage",
    techs: ["UploadThing v7", "Signed URLs", "File Metadata"],
  },
];

const architectureFeatures = [
  "PostgreSQL-backed queue with atomic job claiming",
  "Round-robin API key distribution for AI redundancy",
  "Multi-tier PDF fallback (Puppeteer → PDFKit → Static)",
  "Browser pool with automatic cleanup and monitoring",
  "Horizontal scaling ready - just add more workers",
];

export default function KamkmPDFScalingCaseStudyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Performance Engineering
            </span>
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            Scaling to 6,000 <br />
            <span className="italic text-text/50">PDFs Per Hour</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            How I optimized a document generation system to process 6,000 PDFs
            per hour on a single Railway worker, a throughput number that
            typically requires 5-10 workers.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="High Scale" />
            <Badge label="Single Worker" />
            <Badge label="99.7% Uptime" />
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4 group-hover:bg-[hsl(var(--accent-gold))]/20 transition-colors">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-display font-semibold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-text/80 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-text/50">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              The <span className="italic text-text/50">Challenge</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              KamkmPDF started as a simple Next.js app with a cron job. It
              worked for 50 users, but when hundreds started uploading
              simultaneously, the queue backed up. Most teams would deploy 5-10
              workers. I wanted to see how far a single optimized worker could
              go.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="glass-card p-8 border-l-2 border-l-text/20">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />
                Starting Point
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Throughput</span>
                  <span className="font-mono text-text/40">200-300/hr</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Generation time</span>
                  <span className="font-mono text-text/40">5-10s</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Concurrent jobs</span>
                  <span className="font-mono text-text/40">3 before crash</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">AI keys</span>
                  <span className="font-mono text-text/40">
                    1 (rate limits)
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                Final Results
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Throughput</span>
                  <span className="font-mono text-[hsl(var(--accent-gold))] font-semibold">
                    6,000/hr
                  </span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Generation time</span>
                  <span className="font-mono text-[hsl(var(--accent-gold))] font-semibold">
                    &lt;2s
                  </span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Concurrent jobs</span>
                  <span className="font-mono text-[hsl(var(--accent-gold))] font-semibold">
                    10 stable
                  </span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-text/60">AI keys</span>
                  <span className="font-mono text-[hsl(var(--accent-gold))] font-semibold">
                    11 with failover
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Key Optimizations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Key <span className="italic text-text/50">Optimizations</span>
            </h2>
            <p className="text-lg text-text/60">
              Four major changes that transformed performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {optimizations.map((opt, index) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] shrink-0">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display mb-2">{opt.title}</h3>
                    <p className="text-sm text-text/60 mb-4 leading-relaxed">
                      {opt.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent-gold))]">
                      <TrendingUp className="h-3 w-3" />
                      {opt.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Architecture{" "}
              <span className="italic text-text/50">Highlights</span>
            </h2>
            <p className="text-lg text-text/60">
              Built for horizontal scaling from day one
            </p>
          </div>

          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3">
                  <Database className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                  Queue System
                </h3>
                <ul className="space-y-4">
                  {architectureFeatures.slice(0, 3).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-text/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3">
                  <Server className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                  Worker Design
                </h3>
                <ul className="space-y-4">
                  {architectureFeatures.slice(3).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-text/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Technology <span className="italic text-text/50">Stack</span>
            </h2>
            <p className="text-lg text-text/60">
              Carefully chosen for maximum throughput
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/40 mb-4">
                  {stack.category}
                </h3>
                <div className="space-y-2">
                  {stack.techs.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-text/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))]" />
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Cost Efficiency */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
              <div className="text-center mb-8">
                <DollarSign className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
                <h2 className="text-3xl font-display mb-2">Cost Efficiency</h2>
                <p className="text-text/60">
                  Enterprise throughput, startup budget
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-text/40 mb-4">
                    Infrastructure
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-text/60">
                        Single Railway worker
                      </span>
                      <span className="font-mono">~$20/mo</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text/60">PostgreSQL database</span>
                      <span className="font-mono">~$15/mo</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text/60">No Redis or queues</span>
                      <span className="font-mono text-[hsl(var(--accent-gold))]">
                        $0
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-text/40 mb-4">
                    AI Costs
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-text/60">
                        Cerebras GPT-oss-120b
                      </span>
                      <span className="font-mono">~$0.002/PDF</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text/60">At 6,000 PDFs/hour</span>
                      <span className="font-mono">~$12/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text/60">vs GPT-4 equivalent</span>
                      <span className="font-mono text-[hsl(var(--accent-gold))]">
                        5x savings
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[hsl(var(--accent-gold))]/10 text-center">
                <p className="text-sm text-text/60">
                  <strong className="text-text">Total:</strong> ~$35/month
                  infrastructure + usage-based AI costs. Competitors typically
                  spend $200-500/month for similar throughput.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Ready to Build Something{" "}
              <span className="italic text-text/50">Amazing?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              This case study demonstrates my ability to optimize systems for
              maximum performance without unnecessary infrastructure complexity.
              Let&apos;s discuss your scaling challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-premium">
                <span>Let&apos;s Work Together</span>
              </Link>
              <Link
                href="/case-studies"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">
                  View More Case Studies
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />
      {label}
    </span>
  );
}
