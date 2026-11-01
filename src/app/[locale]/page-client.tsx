"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import EventDisplay from "@/components/EventDisplay";
import JsonLd from "@/components/seo/JsonLd";
import { Locale, Dictionary } from "@/lib/i18n";
import { buildLocalizedAbsoluteUrl } from "@/lib/seo";

const hasArabicScript = (value: string) => /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(value);

/* Authored-content counts; keep in sync with content directories and src/data. */
const COUNTS = { projects: 6, caseStudies: 6, articles: 7, demos: 12 } as const;
const FIRST_YEAR = 2018;

const STACK_LAYERS = ["Next.js", "TypeScript", "AI APIs", "SaaS"];

function ArcGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path d="M10 2a8 8 0 0 1 6.9 4" stroke="var(--evt-track)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.6 12.5A8 8 0 0 1 2 10" stroke="var(--evt-line-strong)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.6" fill="var(--evt-track)" />
    </svg>
  );
}

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
      <path d="M2 9h12M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = React.useState<Locale>("en");
  const [dict, setDict] = React.useState<Dictionary | null>(null);

  React.useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      import("@/lib/i18n").then(({ getDictionarySync }) => {
        setDict(getDictionarySync(p.locale));
      });
    });
  }, [params]);

  if (!dict) return null;

  const instr = dict.home.instrument;
  const nav = dict.nav;
  const localizedHomepageUrl = buildLocalizedAbsoluteUrl(locale);
  const name = locale === "ar" ? "خليل" : "Khalil";

  const testimonial = dict.home.testimonial.review;
  const rating = Number(testimonial.rating);
  const showHandle = testimonial.handle && testimonial.handle !== testimonial.name;
  const quoteDirection = hasArabicScript(testimonial.quote) ? "rtl" : "ltr";
  const identityDirection = hasArabicScript(`${testimonial.name} ${testimonial.company}`) ? "rtl" : "ltr";
  const labels = locale === "ar"
    ? { outOf: "نجوم", websiteLabel: "الموقع", sourceLabel: "المنصة" }
    : { outOf: "Stars", websiteLabel: "Website", sourceLabel: "Platform" };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.metadata.title.default,
    description: dict.metadata.description,
    url: localizedHomepageUrl,
    inLanguage: locale,
  };

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const subsystems = [
    {
      title: dict.home.whoIHelpRestaurantsTitle,
      desc: dict.home.whoIHelpRestaurantsDesc,
      cta: dict.home.whoIHelpRestaurantsCta,
      href: `/${locale}/demos`,
    },
    {
      title: dict.home.whoIHelpEcommerceTitle,
      desc: dict.home.whoIHelpEcommerceDesc,
      cta: dict.home.viewCaseStudiesCta,
      href: `/${locale}/case-studies`,
    },
    {
      title: dict.home.whoIHelpLocalTitle,
      desc: dict.home.whoIHelpLocalDesc,
      cta: dict.home.whoIHelpLocalCta,
      href: `/${locale}/projects`,
    },
  ];

  const statItems = [
    { value: String(COUNTS.projects), label: nav.projects },
    { value: String(COUNTS.caseStudies), label: nav.caseStudies },
    { value: String(COUNTS.articles), label: instr.articles },
    { value: String(COUNTS.demos), label: nav.demos },
  ];

  const legendItems = [
    { label: instr.legend.tracks, value: COUNTS.projects, color: "var(--evt-track)" },
    { label: instr.legend.muons, value: 2, color: "var(--evt-muon)" },
    { label: instr.legend.energy, value: 3, color: "var(--evt-energy)" },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="instrument min-h-screen font-instr-sans bg-evt-bg text-evt-ink pt-20 md:pt-24">
        {/* ── THE EVENT ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-0 md:pt-10 grid lg:grid-cols-[1.02fr_1fr] gap-12 lg:gap-8 items-center">
            <div>
              <h1 className="font-instr-display font-extrabold uppercase leading-[0.94] tracking-[-0.02em] text-[clamp(3.2rem,7.5vw,5.75rem)]">
                <span className="block text-evt-ink">{name}</span>
                <span className="mt-3 flex items-center gap-3">
                  <span className="inline-block h-px w-10 bg-evt-track" aria-hidden="true" />
                  <span className="font-instr-mono text-evt-track text-[clamp(0.95rem,1.8vw,1.3rem)] font-medium tracking-[0.08em] normal-case">
                    {dict.home.subtitle}
                  </span>
                </span>
              </h1>

              <div className="mt-5 inline-flex items-center gap-2.5 border-b border-evt-line-strong pb-2">
                <span className="evt-status-dot inline-block w-2 h-2 bg-evt-nominal" aria-hidden="true" />
                <span className="instr-label text-evt-steel">{instr.status}</span>
              </div>

              <p className="mt-8 max-w-[54ch] text-[1.0625rem] md:text-lg leading-relaxed text-evt-steel">
                {dict.home.description} {dict.home.descriptionExtended}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/projects`}
                  className="group inline-flex items-center justify-center gap-3 bg-evt-track px-8 py-4 instr-label font-semibold text-evt-on-track hover:-translate-y-0.5 transition-transform duration-200"
                >
                  {dict.home.viewWork}
                  <ArrowGlyph className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center border border-evt-line-strong px-8 py-4 instr-label font-semibold text-evt-ink hover:border-evt-track hover:text-evt-track transition-colors duration-200"
                >
                  {dict.home.getInTouch}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_11.5rem]">
                <EventDisplay openLabel={instr.openProject} groupLabel={dict.home.exploreWork} />
                <aside className="instr-panel p-5" aria-label={instr.legend.title}>
                  <div className="instr-label text-evt-steel">{instr.legend.title}</div>
                  <div className="mt-5 space-y-4">
                    {legendItems.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3">
                        <span className="inline-flex min-w-0 items-center gap-2 instr-label text-evt-steel">
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                          <span className="truncate">{item.label}</span>
                        </span>
                        <span className="font-instr-mono text-sm font-semibold text-evt-ink" dir="ltr">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-evt-line pt-4">
                    <div className="instr-label text-evt-steel">{instr.legend.stack}</div>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {STACK_LAYERS.map((layer) => (
                        <span key={layer} className="font-instr-mono text-[0.6875rem] text-evt-steel">{layer}</span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
              <p className="mt-3 text-center instr-label text-evt-steel">{instr.hint}</p>
            </div>
          </div>

          {/* run stat strip */}
          <div className="mt-10 md:mt-12 border-y border-evt-line">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="font-instr-mono text-[0.8125rem] font-semibold tracking-[0.06em] text-evt-track" dir="ltr">
                RUN {FIRST_YEAR} — {new Date().getFullYear()}
              </span>
              {statItems.map((item) => (
                <span key={item.label} className="inline-flex items-baseline gap-2">
                  <span className="font-instr-mono text-[0.8125rem] font-semibold text-evt-ink" dir="ltr">
                    {item.value.padStart(2, "0")}
                  </span>
                  <span className="instr-label text-evt-steel">{item.label}</span>
                </span>
              ))}
              <span className="ms-auto instr-label text-evt-steel">{instr.basedIn}</span>
            </div>
          </div>
        </section>

        {/* ── DETECTOR SUBSYSTEMS (who I help) ──────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <motion.h2 {...reveal()} className="font-instr-display font-bold text-3xl md:text-[2.75rem] leading-tight">
            {instr.subsystems}
          </motion.h2>

          <motion.div {...reveal(0.08)} className="instr-panel mt-12">
            {subsystems.map((row) => (
              <Link
                key={row.title}
                href={row.href}
                className="group grid md:grid-cols-[minmax(180px,0.85fr)_1.6fr_auto] items-center gap-3 md:gap-8 px-6 md:px-8 py-7 hover:bg-evt-panel2 transition-colors duration-200 border-b border-evt-line last:border-b-0"
              >
                <span className="flex items-center gap-3.5">
                  <ArcGlyph className="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-instr-display font-bold text-lg leading-snug group-hover:text-evt-track transition-colors duration-200">
                    {row.title}
                  </span>
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-evt-steel">{row.desc}</span>
                <span className="inline-flex items-center gap-2 instr-label font-semibold text-evt-track">
                  {row.cta}
                  <ArrowGlyph className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* ── RUN LOG (journey) ─────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <motion.h2 {...reveal()} className="font-instr-display font-bold text-3xl md:text-[2.75rem] leading-tight">
            {instr.runLog}
          </motion.h2>

          <motion.div {...reveal(0.08)} className="relative mt-12 border-s border-evt-line-strong ms-2">
            {[
              dict.home.experience.freelance,
              dict.home.experience.fullstack,
            ].map((entry, i, arr) => (
              <div
                key={entry.year}
                className={`relative ps-8 md:ps-10 ${i < arr.length - 1 ? "pb-14" : ""}`}
              >
                <span
                  className="absolute top-1.5 -start-[5px] w-2.5 h-2.5 rounded-full border border-evt-track bg-evt-bg"
                  aria-hidden="true"
                />
                <div className="font-instr-mono text-sm font-semibold text-evt-track" dir="ltr">
                  {entry.year}
                </div>
                <h3 className="mt-2 font-instr-display font-bold text-xl md:text-2xl">{entry.role}</h3>
                <div className="mt-1 instr-label text-evt-steel">{entry.company}</div>
                <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-evt-steel">{entry.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── TRANSMISSION (testimonial) ────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <motion.h2 {...reveal()} className="font-instr-display font-bold text-3xl md:text-[2.75rem] leading-tight">
            {instr.transmission}
          </motion.h2>

          <motion.article {...reveal(0.08)} className="instr-panel mt-12">
            <div className="flex flex-wrap items-center justify-end gap-4 px-6 md:px-10 py-4 border-b border-evt-line">
              <span className="flex items-center gap-3" aria-label={`${testimonial.rating} ${labels.outOf}`}>
                <span className="flex gap-1" aria-hidden="true" dir="ltr">
                  {Array.from({ length: rating }, (_, i) => (
                    <span key={i} className="block w-[5px] h-4 bg-evt-energy" />
                  ))}
                </span>
                <span className="font-instr-mono text-[0.8125rem] font-semibold text-evt-ink" dir="ltr">
                  {testimonial.rating}/{rating}
                </span>
              </span>
            </div>

            <div className="px-6 md:px-10 py-10">
              <p className="max-w-[64ch] text-lg md:text-[1.375rem] leading-relaxed text-evt-ink">
                <span dir={quoteDirection}>&ldquo;{testimonial.quote}&rdquo;</span>
              </p>

              <div className="mt-10 pt-6 border-t border-evt-line flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="grid gap-2" dir="ltr">
                  <a
                    href={`https://${testimonial.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="instr-label text-evt-steel">{labels.websiteLabel}</span>
                    <span className="font-instr-mono text-[0.8125rem] text-evt-ink group-hover:text-evt-track transition-colors">
                      {testimonial.website} <ArrowGlyph className="inline-block h-3.5 w-3.5 align-[-0.15em]" />
                    </span>
                  </a>
                  <a
                    href={testimonial.platformUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="instr-label text-evt-steel">{labels.sourceLabel}</span>
                    <span className="font-instr-mono text-[0.8125rem] text-evt-ink group-hover:text-evt-track transition-colors">
                      {testimonial.platform} <ArrowGlyph className="inline-block h-3.5 w-3.5 align-[-0.15em]" />
                    </span>
                  </a>
                </div>

                <div dir={identityDirection} className="md:text-end">
                  <div className="font-instr-mono text-sm font-semibold text-evt-ink">{testimonial.name}</div>
                  <div className="mt-1 instr-label text-evt-steel">
                    {showHandle ? `@${testimonial.handle} / ` : ""}
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </section>

        {/* ── DATA SETS (case studies + writing) ────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <motion.div {...reveal()}>
            <h2 className="font-instr-display font-bold text-3xl md:text-[2.75rem] leading-tight">
              {instr.datasets}
            </h2>
            <p className="mt-3 text-evt-steel">{dict.home.exploreWorkSubtitle}</p>
          </motion.div>

          <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <motion.div {...reveal(0.08)}>
              <Link
                href={`/${locale}/case-studies`}
                className="group flex flex-col h-full instr-panel p-8 md:p-12 hover:border-evt-track transition-colors duration-200"
              >
                <h3 className="font-instr-display font-bold text-2xl md:text-4xl leading-tight group-hover:text-evt-track transition-colors duration-200">
                  {dict.home.viewCaseStudies}
                </h3>
                <p className="mt-4 max-w-[48ch] text-evt-steel leading-relaxed">{dict.home.viewCaseStudiesDesc}</p>
                <div className="mt-auto pt-10 flex items-end justify-between">
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-instr-mono text-4xl font-semibold text-evt-ink" dir="ltr">06</span>
                    <span className="instr-label text-evt-steel">{instr.records}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 instr-label font-semibold text-evt-track">
                    {dict.home.viewCaseStudiesCta}
                    <ArrowGlyph className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div {...reveal(0.16)}>
              <Link
                href={`/${locale}/blog`}
                className="group flex flex-col h-full instr-panel p-8 md:p-10 hover:border-evt-track transition-colors duration-200"
              >
                <h3 className="font-instr-display font-bold text-2xl md:text-3xl leading-tight group-hover:text-evt-track transition-colors duration-200">
                  {dict.home.viewBlog}
                </h3>
                <p className="mt-4 text-evt-steel leading-relaxed">{dict.home.viewBlogDesc}</p>
                <div className="mt-auto pt-10 flex items-end justify-between">
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-instr-mono text-4xl font-semibold text-evt-ink" dir="ltr">07</span>
                    <span className="instr-label text-evt-steel">{instr.articles}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 instr-label font-semibold text-evt-track">
                    {dict.home.viewBlogCta}
                    <ArrowGlyph className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── CLOSE ─────────────────────────────────────────────────────── */}
        <footer className="border-t border-evt-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
            <span className="instr-label text-evt-steel">{instr.endLog}</span>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 instr-label font-semibold text-evt-track"
            >
              {dict.home.getInTouch}
              <ArrowGlyph className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>
            <span className="instr-label text-evt-steel">{instr.basedIn}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
