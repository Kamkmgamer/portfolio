"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    label: "Development Time",
    value: "35 Days",
    icon: Calendar,
    desc: "Solo development",
  },
  {
    label: "Industry Estimate",
    value: "$90k-$130k",
    icon: DollarSign,
    desc: "Development value",
  },
  {
    label: "Team Size",
    value: "Solo",
    icon: Users,
    desc: "Full-stack architect",
  },
  {
    label: "Test Coverage",
    value: "80%+",
    icon: Shield,
    desc: "Comprehensive suite",
  },
];

const timeline = [
  {
    week: "Week 1",
    tasks: ["Architecture design", "Database schema", "Auth system"],
  },
  {
    week: "Week 2",
    tasks: ["Core API endpoints", "Frontend components", "Payment integration"],
  },
  {
    week: "Week 3",
    tasks: ["UI/UX polish", "Testing suite", "Security hardening"],
  },
  {
    week: "Week 4",
    tasks: ["CI/CD pipeline", "Monitoring setup", "Documentation"],
  },
  {
    week: "Week 5",
    tasks: ["Final testing", "Performance optimization", "Deployment"],
  },
];

const techStack = [
  {
    category: "Frontend",
    techs: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    techs: ["Node.js", "Express 5", "Prisma ORM", "PostgreSQL"],
  },
  {
    category: "Security",
    techs: ["JWT Auth", "CSRF Protection", "Rate Limiting", "Input Validation"],
  },
  {
    category: "Payments",
    techs: [
      "Stripe API",
      "PayPal SDK",
      "Webhook Handling",
      "Subscription Logic",
    ],
  },
  {
    category: "DevOps",
    techs: ["Docker", "GitHub Actions", "Prometheus", "Grafana"],
  },
  {
    category: "Testing",
    techs: ["Jest", "Supertest", "Cypress", "Unit & Integration"],
  },
];

const achievements = [
  "Built enterprise-grade SaaS platform solo in 35 days",
  "Implemented secure payment processing with Stripe & PayPal",
  "Achieved 80%+ test coverage with comprehensive test suite",
  "Set up production-ready monitoring and alerting",
  "Delivered $90k-$130k worth of development value",
  "Zero security vulnerabilities in final audit",
];

const roleItems = [
  "Full-stack architect and sole developer",
  "Implemented enterprise security practices",
  "Set up production monitoring and CI/CD",
  "Delivered comprehensive testing suite",
];

export default function DevServeCaseStudyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops)) from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              SaaS Development
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            DevServe <br />
            <span className="italic text-text/50">Platform</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-6">
            Enterprise-grade SaaS platform with secure payments, monitoring, and
            enterprise features — built solo in 35 days.
          </p>

          <p className="text-xl text-[hsl(var(--accent-gold))] font-semibold mb-12">
            Industry-estimated value: $90k-$130k
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="Enterprise SaaS" />
            <Badge label="35 Days" />
            <Badge label="Full-Stack" />
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

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Project <span className="italic text-text/50">Overview</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              DevServe showcases enterprise-grade development practices,
              delivering a complete SaaS platform with the speed and quality
              typically reserved for large development teams.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* My Role */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <Users className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                My Role
              </h3>
              <ul className="space-y-4">
                {roleItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Achievements */}
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                Key Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Development Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              35-Day <span className="italic text-text/50">Timeline</span>
            </h2>
            <p className="text-lg text-text/60">
              From concept to production-ready platform in 5 weeks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((week, index) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-24 text-right pt-4">
                    <span className="text-sm font-semibold text-[hsl(var(--accent-gold))]">
                      {week.week}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--accent-gold))]" />
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full min-h-80px bg-[hsl(var(--accent-gold))]/20 mt-2" />
                    )}
                  </div>
                  <div className="glass-card flex-1 p-6 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {week.tasks.map((task, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[hsl(var(--accent-gold))]/10 text-text/80 rounded-none border border-[hsl(var(--accent-gold))]/20"
                        >
                          <CheckCircle className="h-3 w-3 text-[hsl(var(--accent-gold))]" />
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Modern, scalable technologies chosen for enterprise-grade
              performance
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

        {/* Full Achievements List */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="text-center mb-8">
              <CheckCircle className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
              <h2 className="text-3xl font-display mb-2">
                Complete Achievements
              </h2>
              <p className="text-text/60">
                Delivering enterprise-grade quality
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-text/70">{achievement}</span>
                </div>
              ))}
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
              Ready to Build Your{" "}
              <span className="italic text-text/50">SaaS?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              DevServe demonstrates my ability to deliver enterprise-grade
              solutions with exceptional speed and quality. Let&apos;s discuss
              your next project.
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
