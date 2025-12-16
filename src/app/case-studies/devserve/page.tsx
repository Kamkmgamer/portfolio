"use client";

import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Users,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
  ExternalLink,
  Github,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Development Time",
    value: "35 Days",
    icon: <Calendar className="h-5 w-5" />,
    color: "green",
  },
  {
    label: "Industry Cost Estimate",
    value: "$90k-$130k",
    icon: <DollarSign className="h-5 w-5" />,
    color: "amber",
  },
  {
    label: "Team Size",
    value: "Solo Developer",
    icon: <Users className="h-5 w-5" />,
    color: "blue",
  },
  {
    label: "Test Coverage",
    value: "80%+",
    icon: <Shield className="h-5 w-5" />,
    color: "violet",
  },
];

const timeline = [
  {
    week: "Week 1",
    tasks: ["Architecture design", "Database schema", "Auth system"],
    progress: 100,
  },
  {
    week: "Week 2",
    tasks: ["Core API endpoints", "Frontend components", "Payment integration"],
    progress: 100,
  },
  {
    week: "Week 3",
    tasks: ["UI/UX polish", "Testing suite", "Security hardening"],
    progress: 100,
  },
  {
    week: "Week 4",
    tasks: ["CI/CD pipeline", "Monitoring setup", "Documentation"],
    progress: 100,
  },
  {
    week: "Week 5",
    tasks: ["Final testing", "Performance optimization", "Deployment"],
    progress: 100,
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

export default function DevServeCaseStudyPage() {
  return (
    <>
      <main className="relative">
        {/* Hero Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[80rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 dark:opacity-10 bg-[radial-gradient(closest-side,_rgba(59,130,246,0.4),_transparent_70%)]" />
          <div className="absolute top-96 right-[-20%] h-72 w-[60rem] rounded-full blur-3xl opacity-15 dark:opacity-8 bg-[radial-gradient(closest-side,_rgba(168,85,247,0.4),_transparent_65%)]" />
        </div>

        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-text-light/80 dark:text-text-dark/80 backdrop-blur">
                <Zap className="h-4 w-4 text-amber-500" />
                Case Study
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent mb-6">
              DevServe
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-muted-foreground mb-2">
              Enterprise-Grade SaaS Platform
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              A full-stack SaaS platform with secure payments, monitoring, and
              enterprise features — built solo in 35 days with an
              industry-estimated value of $90k-$130k.
            </p>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
            >
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="text-center border-0 shadow-lg bg-white/60 dark:bg-white/5 backdrop-blur"
                >
                  <CardContent className="pt-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                        stat.color === "green"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : stat.color === "amber"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : stat.color === "blue"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                      }`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-black/20 dark:border-white/20 bg-white/80 dark:bg-white/10 text-foreground px-6 py-3 font-medium backdrop-blur hover:bg-white dark:hover:bg-white/20 transition-all duration-300">
                <Github className="h-4 w-4" />
                View Code
              </button>
            </motion.div>
          </motion.header>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                DevServe showcases enterprise-grade development practices,
                delivering a complete SaaS platform with the speed and quality
                typically reserved for large development teams.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    My Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Full-stack architect and sole developer",
                      "Implemented enterprise security practices",
                      "Set up production monitoring and CI/CD",
                      "Delivered comprehensive testing suite",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {achievements.slice(0, 4).map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Development Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                35-Day Development Timeline
              </h2>
              <p className="text-lg text-muted-foreground">
                From concept to production-ready platform in just 5 weeks
              </p>
            </div>

            <div className="space-y-6">
              {timeline.map((week, index) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-24 text-right">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {week.week}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <Card className="flex-1 shadow-sm border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex flex-wrap gap-2">
                          {week.tasks.map((task, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 text-sm font-medium"
                            >
                              <CheckCircle className="h-3 w-3" />
                              {task}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="absolute left-[7.5rem] top-8 w-0.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
              <p className="text-lg text-muted-foreground">
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
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {stack.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {stack.techs.map((tech, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                DevServe demonstrates my ability to deliver enterprise-grade
                solutions with exceptional speed and quality. Let&apos;s discuss
                your next project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Let&apos;s Work Together
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 border border-gray-600 text-white px-8 py-4 text-lg font-medium shadow-lg shadow-gray-500/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  View More Case Studies
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
