import React from "react";

import CaseStudiesGrid from "./CaseStudiesGrid";

export const metadata = {
  title: "Case Studies | Khalil Abdel Majeed",
  description:
    "Selected case studies showcasing end-to-end delivery, architecture, and execution. Includes DevServe — an enterprise-grade SaaS built in 35 days.",
  openGraph: {
    title: "Case Studies | Khalil Abdel Majeed",
    description:
      "Deep-dives into projects that demonstrate speed, quality, and measurable impact.",
    url: "https://khalil.excellence.sd/case-studies",
    siteName: "Khalil Abdel Majeed Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Khalil Abdel Majeed",
    description:
      "Explore impactful case studies with speed, scale, and execution.",
  },
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <main className="relative">
        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full blur-3xl opacity-30 dark:opacity-20 bg-[radial-gradient(closest-side,_rgba(59,130,246,0.35),_transparent_65%)]" />
          <div className="absolute top-64 right-[-10%] h-56 w-[40rem] rounded-full blur-3xl opacity-25 dark:opacity-15 bg-[radial-gradient(closest-side,_rgba(168,85,247,0.35),_transparent_60%)]" />
        </div>

        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <header className="text-center mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep-dives into projects that demonstrate speed, quality, and
              measurable impact.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 dark:border-white/15 bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 px-3 py-1 text-xs font-semibold shadow-sm">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-green-500"
                >
                  <circle cx="5" cy="5" r="5" />
                </svg>
                Production-grade delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 dark:border-white/15 bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 px-3 py-1 text-xs font-semibold shadow-sm">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-amber-500"
                >
                  <circle cx="5" cy="5" r="5" />
                </svg>
                Fast iterations
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 dark:border-white/15 bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 px-3 py-1 text-xs font-semibold shadow-sm">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-blue-500"
                >
                  <circle cx="5" cy="5" r="5" />
                </svg>
                Measurable outcomes
              </span>
            </div>
          </header>

          <CaseStudiesGrid />
        </div>
      </main>
    </>
  );
}
