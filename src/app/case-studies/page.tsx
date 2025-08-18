import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Case Studies | Khalil Abdel Majeed",
  description:
    "Selected case studies showcasing end-to-end delivery, architecture, and execution. Includes DevServe — an enterprise-grade SaaS built in 35 days.",
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Case Studies</h1>
          <p className="mt-3 text-text-light/80 dark:text-text-dark/80 max-w-2xl">
            Deep-dives into projects that demonstrate speed, quality, and measurable impact.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2">
          <li className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-surface-light/60 dark:bg-surface-dark/60">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold">DevServe — Enterprise-Grade SaaS Platform</h2>
              <p className="mt-2 text-sm text-text-light/70 dark:text-text-dark/70">
                Built in 35 days. Industry-estimated cost: $90k–$130k.
              </p>
              <p className="mt-1 text-sm text-text-light/70 dark:text-text-dark/70">
                React, Node/Express, Prisma, PostgreSQL, Docker, Stripe/PayPal, CI/CD, monitoring.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-500/15 text-green-700 dark:text-green-300 px-2.5 py-0.5 text-xs font-medium border border-green-500/20">
                  ✅ 35 days
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 text-xs font-medium border border-amber-500/20">
                  💰 $100k+ value
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-xs font-medium border border-blue-500/20">
                  🔒 Security
                </span>
              </div>
              <div className="mt-5">
                <Link
                  href="/case-studies/devserve"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Read case study
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.19L9.22 5.53a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l3.72-3.72H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
}
