import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "DevServe — Enterprise-Grade SaaS Platform | Case Study",
  description:
    "Case study of DevServe: built solo in 35 days, industry-estimated cost $90k–$130k. React, Node/Express, Prisma/Postgres, Docker, Stripe/PayPal, CI/CD, and monitoring.",
};

export default function DevServeCaseStudyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Hero */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            DevServe — Enterprise-Grade SaaS Platform
          </h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            Built solo in <strong>35 days</strong>. Industry-estimated cost:{" "}
            <strong>$90k–$130k</strong>.
          </p>

          {/* Highlight badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/20 text-sm font-medium">
              ✅ Delivered in 35 days
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-sm font-medium">
              💰 Estimated industry cost $100k+
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-sm font-medium">
              🔒 Enterprise-grade security
            </span>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-text-light/90 dark:text-text-dark/90 leading-relaxed">
            DevServe is a full-stack SaaS platform built with modern
            technologies — React 19, TypeScript, Node/Express, Prisma/Postgres,
            and Docker. It features secure authentication (JWT rotation, CSRF
            protection), Stripe and PayPal payment flows, a monitoring stack
            with Prometheus/Grafana, and automated CI/CD pipelines.{" "}
            <br />
            <br />
            What makes DevServe stand out: I built it entirely solo in just{" "}
            <strong>35 days</strong>, at a level typically delivered by a
            mid-size professional team.
          </p>
        </section>

        {/* My Role */}
        <section className="mb-16 grid sm:grid-cols-2 gap-8">
          <div className="rounded-2xl shadow-sm border border-black/10 dark:border-white/10 bg-surface-light/60 dark:bg-surface-dark/60">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">My Role</h3>
              <ul className="list-disc pl-5 space-y-2 text-text-light/90 dark:text-text-dark/90">
                <li>Sole developer & architect (backend, frontend, DevOps, testing).</li>
                <li>Implemented enterprise-grade practices (security, CI/CD, monitoring, tests).</li>
                <li>Delivered MVP in 35 days, completely self-funded.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm border border-black/10 dark:border-white/10 bg-surface-light/60 dark:bg-surface-dark/60">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <ul className="list-disc pl-5 space-y-2 text-text-light/90 dark:text-text-dark/90">
                <li>Audit estimated equivalent build cost at $90k–$130k for a pro team.</li>
                <li>Delivered the same scope solo and free, showcasing speed & capability.</li>
                <li>Proved ability to architect and execute enterprise-level systems end-to-end.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-text-light/90 dark:text-text-dark/90">
            {[
              "React 19 + TypeScript",
              "Node.js + Express 5",
              "Prisma ORM + PostgreSQL",
              "JWT auth + CSRF protection",
              "Stripe + PayPal integrations",
              "Docker + Docker Compose",
              "Prometheus + Grafana",
              "GitHub Actions CI/CD",
              "Vercel client deployment",
              "Jest tests (80% coverage)",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 px-4 py-2 border border-black/5 dark:border-white/5 shadow-sm text-sm"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Visual Enhancements placeholder */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Visuals</h2>
          <p className="text-text-light/80 dark:text-text-dark/80">
            Screenshots of the UI, monitoring dashboards, and payment flows
            coming soon. A GitHub link will also be added if made public.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center mt-20">
          <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
            “Delivered what would typically cost $100k+ in just 35 days.”
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 text-base font-medium shadow-md hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            View My Other Projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.19L9.22 5.53a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l3.72-3.72H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </section>
      </main>
    </>
  );
}
