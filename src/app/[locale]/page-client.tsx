"use client";

/*
DIRECTION CONTRACT
THESIS: Type is the interface. A Metro typographic-tile homepage where flat
colour tiles and giant lowercase statements carry everything; refuses the
centred avatar-hero with three same-size cards.
OWN-WORLD: black ground, white ink, lime as the only live colour, magenta /
cobalt / amber tile fields, Hanken Grotesk 200-400 (Readex Pro in Arabic),
zero radius, zero shadow, ▸ glyphs, dot-matrix brand mark.
STORY: a founder reads "i build ai interfaces that ship", sees real shipped
products peeking off the edge, finds their route (AI/SaaS or local business),
trusts the review, taps "let's talk".
FIRST VIEWPORT: pivot header; poster statement start-aligned, support line,
lime primary + outlined secondary; a column of project tiles cropped by the
trailing edge.
FORM: Metro typographic tiles (dealt challenger, seed 6dff7285); staging: hub
sections with pivot-style headers whose next titles peek in cropped.
*/

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { DotMatrix } from "@/components/Navbar";
import { Locale, Dictionary } from "@/lib/i18n";
import { buildLocalizedAbsoluteUrl } from "@/lib/seo";

export type HomeProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo: string | null;
};

const hasArabicScript = (value: string) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(value);

const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
};

/** Pointer-down tilts the tile toward the pointer, at most 6 degrees. */
const useTilt = () => {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onPointerDown, onPointerUp: reset, onPointerLeave: reset, onPointerCancel: reset };
};

type TileProps = {
  href: string;
  external?: boolean;
  tone?: "magenta" | "cobalt" | "amber" | "lime" | "outline" | "image";
  cols?: 1 | 2;
  rows?: 1 | 2;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  ariaLabel?: string;
};

function Tile({ href, external, tone = "magenta", cols = 1, rows = 1, className = "", style, children, ariaLabel }: TileProps) {
  const tilt = useTilt();
  const cls = `m-tile m-tile--${tone} ${cols === 1 && rows === 1 ? "m-tile--small" : ""} ${className}`;
  const gridStyle: React.CSSProperties = {
    gridColumn: `span ${cols}`,
    gridRow: `span ${rows}`,
    ...style,
  };
  const handlers = {
    onPointerDown: tilt.onPointerDown,
    onPointerUp: tilt.onPointerUp,
    onPointerLeave: tilt.onPointerLeave,
    onPointerCancel: tilt.onPointerCancel,
  };

  if (external) {
    return (
      <a
        ref={tilt.ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={gridStyle}
        aria-label={ariaLabel}
        {...handlers}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      ref={tilt.ref}
      href={href}
      className={cls}
      style={gridStyle}
      aria-label={ariaLabel}
      {...handlers}
    >
      {children}
    </Link>
  );
}

function Glyph({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`m-glyph ${className}`} />;
}

/** Section header in the Metro pivot idiom: the next titles peek in, dimmed and cropped. */
function HubHeader({ id, title, next = [], line }: { id: string; title: string; next?: string[]; line?: string }) {
  return (
    <div className="m-crop mb-10 lg:mb-12" style={{ marginInline: "calc(-1 * var(--page-inline))", paddingInline: "var(--page-inline)" }}>
      <h2 id={id} className="m-headline m-lower flex gap-[0.7em] whitespace-nowrap">
        <span>{title}</span>
        {next.map((n) => (
          <span key={n} aria-hidden="true" className="text-ink-faint">
            {n}
          </span>
        ))}
      </h2>
      {line && <p className="m-subtitle mt-3 max-w-[48ch] font-light text-ink-muted">{line}</p>}
    </div>
  );
}

function ProjectTile({ project, cols, rows, sizes }: { project: HomeProject; cols: 1 | 2; rows: 1 | 2; sizes: string }) {
  return (
    <Tile
      href={project.demo ?? "#"}
      external={Boolean(project.demo)}
      tone="image"
      cols={cols}
      rows={rows}
      ariaLabel={`${project.title}: ${project.description}`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        className="m-tile__img"
        priority={rows === 2}
      />
      <span className="m-tile__label">
        <span className="m-tile__title block">{project.title}</span>
        {cols > 1 && <span className="m-tile__peek block">{project.tags.slice(0, 3).join(" · ")}</span>}
      </span>
      <Glyph className="m-tile__glyph text-lime" />
    </Tile>
  );
}

/** A tile with two faces; the hub flips one at a time on an interval. */
function LiveTile({
  href,
  tone,
  front,
  back,
  flipped,
  cols = 2,
  rows = 1,
}: {
  href: string;
  tone: "cobalt" | "amber" | "magenta";
  front: React.ReactNode;
  back: React.ReactNode;
  flipped: boolean;
  cols?: 1 | 2;
  rows?: 1 | 2;
}) {
  return (
    <Tile href={href} tone={tone} cols={cols} rows={rows} className="m-live">
      <div className="m-live__inner" data-flipped={flipped}>
        <div className="m-live__face" aria-hidden={flipped}>
          {front}
        </div>
        <div className="m-live__face m-live__face--back" aria-hidden={!flipped}>
          {back}
        </div>
      </div>
      <Glyph className="m-tile__glyph" />
    </Tile>
  );
}

const glide = (i: number): React.CSSProperties => ({ ["--i" as string]: i });

/**
 * Panorama sizing after the 2x2 lead: chunks of [2x1, 1x1, 1x1] fill two
 * columns exactly; the final tile absorbs any remainder so the row has no holes.
 */
const panoramaSize = (i: number, total: number): { cols: 1 | 2; rows: 1 | 2 } => {
  const isLast = i === total - 1;
  const remainder = total % 3;
  if (isLast && remainder === 1) return { cols: 1, rows: 2 };
  if (isLast && remainder === 2) return { cols: 2, rows: 1 };
  return i % 3 === 0 ? { cols: 2, rows: 1 } : { cols: 1, rows: 1 };
};

export default function Home({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: HomeProject[];
}) {
  const reduceMotion = usePrefersReducedMotion();
  const home = dict.home;
  const base = `/${locale}`;
  const localizedHomepageUrl = buildLocalizedAbsoluteUrl(locale);

  // Live tiles: one of the two "read" tiles flips at a time, every 9-14s, and flips back after 5s.
  const [flipped, setFlipped] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const cycle = (idx: number) => {
      timer = setTimeout(() => {
        if (cancelled) return;
        setFlipped(idx);
        timer = setTimeout(() => {
          if (cancelled) return;
          setFlipped(null);
          cycle(idx === 0 ? 1 : 0);
        }, 5000);
      }, 9000 + Math.random() * 5000);
    };
    cycle(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduceMotion]);

  const [lead, ...rest] = projects;
  const heroTiles = projects.slice(0, 3);
  const testimonial = home.testimonial.review;
  const rating = Number(testimonial.rating);
  const quoteDir = hasArabicScript(testimonial.quote) ? "rtl" : "ltr";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.metadata.title.default,
    description: dict.metadata.description,
    url: localizedHomepageUrl,
    inLanguage: locale,
  };

  const pageInline: React.CSSProperties = { paddingInline: "var(--page-inline)" };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="pb-24">
        {/* ── Cover ─────────────────────────────────────────────────────── */}
        <section className="m-crop" aria-labelledby="statement">
          <div
            className="grid gap-12 pb-14 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-start lg:gap-16 lg:pb-28 lg:pt-20"
            style={pageInline}
          >
            <div className="min-w-0">
              <h1 id="statement" className="m-poster m-lower m-glide max-w-[11ch]" style={glide(0)}>
                {home.statement}
              </h1>
              <p className="m-subtitle m-glide mt-8 max-w-[52ch] font-light text-ink-muted lg:mt-10" style={glide(2)}>
                {home.support}
              </p>
              <div className="m-glide mt-10 flex flex-wrap items-center gap-4" style={glide(4)}>
                <Link href={`${base}/contact`} className="m-btn m-btn-primary m-lower">
                  <span>{home.startProject}</span>
                  <Glyph />
                </Link>
                <Link href={`${base}/projects`} className="m-btn m-btn-secondary m-lower">
                  <span>{home.seeWork}</span>
                  <Glyph />
                </Link>
              </div>
            </div>

            {heroTiles.length > 0 && (
              <aside className="hidden lg:block" aria-label={home.latest}>
                <p className="m-subtitle m-lower m-glide mb-3 font-light text-lime-ink" style={glide(1)}>
                  {home.latest}
                </p>
                <div
                  className="grid gap-[var(--tile-gap)]"
                  style={{ gridTemplateColumns: "calc(var(--tile-unit) * 3.25)", gridAutoRows: "var(--tile-unit)" }}
                >
                  {heroTiles.map((p, i) => (
                    <div key={p.id} className="m-glide grid" style={glide(3 + i * 2)}>
                      <ProjectTile project={p} cols={1} rows={1} sizes="520px" />
                    </div>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* ── Work ──────────────────────────────────────────────────────── */}
        <section className="pt-8 lg:pt-12" aria-labelledby="work">
          <div style={pageInline}>
            <HubHeader id="work" title={home.workTitle} next={[home.whoIHelpTitle, home.storyTitle, home.testimonial.title, home.moreTitle, home.contactTitle]} line={home.workLine} />
          </div>

          {projects.length > 0 ? (
            <div className="m-panorama">
              {lead && <ProjectTile project={lead} cols={2} rows={2} sizes="320px" />}
              {rest.map((p, i) => {
                const { cols, rows } = panoramaSize(i, rest.length);
                return <ProjectTile key={p.id} project={p} cols={cols} rows={rows} sizes="320px" />;
              })}
              <Tile href={`${base}/projects`} tone="lime" cols={1} rows={2}>
                <span className="m-tile__title m-lower">{home.allProjects}</span>
                <Glyph className="m-tile__glyph" />
              </Tile>
            </div>
          ) : (
            <div className="m-grid" style={pageInline}>
              <Tile href={`${base}/projects`} tone="lime" cols={2} rows={1}>
                <span className="m-tile__title m-lower">{home.allProjects}</span>
                <span className="m-tile__peek">{home.workLine}</span>
                <Glyph className="m-tile__glyph" />
              </Tile>
            </div>
          )}

          <div className="mt-16 lg:mt-20" style={pageInline}>
            <p className="m-subtitle m-lower mb-5 font-light text-ink-muted">{home.localTitle}</p>
            <div className="m-grid">
              <Tile href={`${base}/case-studies/restaurant-websites-tiers`} tone="outline" cols={1} rows={1}>
                <span className="m-tile__title m-lower">{home.localRestaurants}</span>
                <span className="m-tile__peek">{home.localRestaurantsPeek}</span>
                <Glyph className="m-tile__glyph" />
              </Tile>
              <Tile href={`${base}/case-studies/ecommerce-websites-tiers`} tone="outline" cols={1} rows={1}>
                <span className="m-tile__title m-lower">{home.localEcommerce}</span>
                <span className="m-tile__peek">{home.localEcommercePeek}</span>
                <Glyph className="m-tile__glyph" />
              </Tile>
              <Tile href={`${base}/demos`} tone="outline" cols={1} rows={1}>
                <span className="m-tile__title m-lower">{home.localDemos}</span>
                <span className="m-tile__peek">{home.localDemosPeek}</span>
                <Glyph className="m-tile__glyph" />
              </Tile>
            </div>
          </div>
        </section>

        {/* ── Who I help ────────────────────────────────────────────────── */}
        <section className="pt-28 lg:pt-36" aria-labelledby="who" style={pageInline}>
          <HubHeader id="who" title={home.whoIHelpTitle} next={[home.storyTitle, home.testimonial.title, home.moreTitle, home.contactTitle]} />
          <div className="m-grid">
            <Tile href={`${base}/projects`} tone="magenta" cols={2} rows={2}>
              <span className="m-tile__title m-lower text-[2rem]">{home.whoIHelpRestaurantsTitle}</span>
              <span className="m-tile__peek max-w-[26ch] text-base">{home.whoIHelpRestaurantsDesc}</span>
              <span className="m-tile__peek m-lower mt-4 inline-flex items-center gap-2 text-base opacity-100">
                {home.whoIHelpRestaurantsCta} <Glyph />
              </span>
            </Tile>
            <Tile href={`${base}/demos`} tone="cobalt" cols={2} rows={2}>
              <span className="m-tile__title m-lower text-[2rem]">{home.whoIHelpEcommerceTitle}</span>
              <span className="m-tile__peek max-w-[26ch] text-base">{home.whoIHelpEcommerceDesc}</span>
              <span className="m-tile__peek m-lower mt-4 inline-flex items-center gap-2 text-base opacity-100">
                {home.whoIHelpEcommerceCta} <Glyph />
              </span>
            </Tile>
            <Tile href={`${base}/case-studies`} tone="amber" cols={2} rows={2}>
              <span className="m-tile__title m-lower text-[2rem]">{home.whoIHelpLocalTitle}</span>
              <span className="m-tile__peek max-w-[26ch] text-base">{home.whoIHelpLocalDesc}</span>
              <span className="m-tile__peek m-lower mt-4 inline-flex items-center gap-2 text-base opacity-100">
                {home.whoIHelpLocalCta} <Glyph />
              </span>
            </Tile>
          </div>
        </section>

        {/* ── Story ─────────────────────────────────────────────────────── */}
        <section className="pt-28 lg:pt-36" aria-labelledby="story" style={pageInline}>
          <HubHeader id="story" title={home.storyTitle} next={[home.testimonial.title, home.moreTitle, home.contactTitle]} />
          <ol className="max-w-[1100px]">
            {[home.experience.freelance, home.experience.fullstack].map((row) => (
              <li
                key={row.year}
                className="m-hair grid gap-2 py-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[260px_minmax(0,1fr)]"
              >
                <span className="m-title font-extralight text-lime-ink" dir="ltr">
                  {row.year}
                </span>
                <div>
                  <h3 className="m-title">{row.role}</h3>
                  <p className="m-caption mt-1 text-ink-muted">{row.company}</p>
                  <p className="mt-4 max-w-[60ch] text-ink-muted">{row.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Testimonial ───────────────────────────────────────────────── */}
        <section className="pt-28 lg:pt-36" aria-labelledby="review" style={pageInline}>
          <HubHeader id="review" title={home.testimonial.title} next={[home.moreTitle, home.contactTitle]} />
          <figure className="grid bg-magenta text-white md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_320px]">
            <blockquote className="p-7 md:p-10 lg:p-12" dir={quoteDir} lang={quoteDir === "rtl" ? "ar" : "en"}>
              <div className="mb-6 flex items-center gap-1" aria-label={`${testimonial.rating} ${home.testimonial.outOf}`}>
                {Array.from({ length: rating }, (_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" strokeWidth={1.5} aria-hidden="true" />
                ))}
              </div>
              <p className="max-w-[46ch] text-[1.375rem] font-light leading-[1.4] md:text-[1.625rem]">
                {testimonial.quote}
              </p>
            </blockquote>
            <figcaption className="flex flex-col justify-end gap-6 border-t border-white/40 p-7 md:border-s md:border-t-0 md:p-10 lg:p-12">
              <div dir="ltr" className="text-start">
                <p className="m-title">{testimonial.name}</p>
                <p className="m-caption mt-1">{testimonial.company}</p>
              </div>
              <ul dir="ltr" className="m-caption flex flex-col gap-2 text-start">
                <li>
                  <a href={`https://${testimonial.website}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-white/50 hover:decoration-white">
                    {testimonial.website}
                  </a>
                </li>
                <li>
                  <a href={testimonial.platformUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-white/50 hover:decoration-white">
                    {home.testimonial.sourceLabel}: {testimonial.platform}
                  </a>
                </li>
              </ul>
            </figcaption>
          </figure>
        </section>

        {/* ── Read ──────────────────────────────────────────────────────── */}
        <section className="pt-28 lg:pt-36" aria-labelledby="read" style={pageInline}>
          <HubHeader id="read" title={home.moreTitle} next={[home.contactTitle]} />
          <div className="m-grid">
            <LiveTile
              href={`${base}/case-studies`}
              tone="cobalt"
              flipped={flipped === 0}
              front={
                <>
                  <span className="m-tile__title m-lower">{home.viewCaseStudies}</span>
                  <span className="m-tile__peek m-lower">{home.viewCaseStudiesCta}</span>
                </>
              }
              back={<span className="m-tile__peek text-base opacity-100">{home.viewCaseStudiesDesc}</span>}
            />
            <LiveTile
              href={`${base}/blog`}
              tone="amber"
              flipped={flipped === 1}
              front={
                <>
                  <span className="m-tile__title m-lower">{home.viewBlog}</span>
                  <span className="m-tile__peek m-lower">{home.viewBlogCta}</span>
                </>
              }
              back={<span className="m-tile__peek text-base opacity-100">{home.viewBlogDesc}</span>}
            />
            <Tile href={`${base}/research`} tone="outline" cols={1} rows={1}>
              <span className="m-tile__title m-lower">{dict.nav.research}</span>
              <span className="m-tile__peek m-lower">{dict.research.readPaper}</span>
              <Glyph className="m-tile__glyph" />
            </Tile>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="pt-28 lg:pt-36" aria-label={home.contactTitle} style={pageInline}>
          <div className="m-grid">
            <Tile href={`${base}/contact`} tone="lime" cols={2} rows={2}>
              <span className="m-poster m-lower text-[clamp(2.5rem,6vw,4rem)]">{home.contactTitle}</span>
              <span className="m-tile__peek m-lower mt-3 text-base opacity-100">{home.contactLine}</span>
              <span className="m-tile__peek m-lower mt-6 inline-flex items-center gap-2 text-base opacity-100">
                {home.contactCta} <Glyph />
              </span>
            </Tile>
            <Tile href="https://www.linkedin.com/in/kamkm-gamer" external tone="outline" cols={1} rows={1}>
              <span className="m-tile__title">LinkedIn</span>
              <span className="m-tile__peek">kamkm-gamer</span>
              <Glyph className="m-tile__glyph" />
            </Tile>
            <Tile href="https://github.com/Kamkmgamer" external tone="outline" cols={1} rows={1}>
              <span className="m-tile__title">GitHub</span>
              <span className="m-tile__peek">Kamkmgamer</span>
              <Glyph className="m-tile__glyph" />
            </Tile>
          </div>
        </section>

        <footer className="m-hair mt-28 pt-6 lg:mt-36" style={pageInline}>
          <p className="m-caption flex items-center gap-2 text-ink-muted">
            <DotMatrix className="text-lime-ink" />
            <span>{home.footerLine}</span>
          </p>
        </footer>
      </main>
    </>
  );
}
