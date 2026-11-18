import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedAbsoluteUrl, buildLocalizedMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { ownProjects, ossProjects, projects } from "@/data/projects";
import { demos } from "@/data/demos";
import { site } from "@/data/site";
import { getCaseStudiesByLocale } from "@/lib/content";
import { formatPostDate, getFeaturedPosts } from "@/lib/blogs";
import { ButtonLink } from "@/components/site/Button";
import { ArrowForward, ArrowOut } from "@/components/site/icons";
import { IndexRow, WorkCard } from "@/components/site/cards";
import { MetaRow, SectionHeader, ViewAllLink, stagger } from "@/components/site/layout";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildLocalizedMetadata(locale, "", {
    title: dict.metadata.title.default,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title.default,
      description: dict.metadata.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title.default,
      description: dict.metadata.description,
    },
  });
}

const AVATAR = "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/image.png?tr=w-160,h-160,fo-face,z-0.75";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const h = dict.home;
  const workLabels = { live: dict.projects.live, source: dict.projects.source };
  const caseStudies = getCaseStudiesByLocale(locale).slice(0, 4);
  const posts = getFeaturedPosts(locale);
  const testimonial = h.testimonial.review;
  const rating = Number(testimonial.rating);

  const stats = [
    { value: String(site.since), label: h.stats.since },
    { value: String(projects.length), label: h.stats.shipped },
    { value: String(getCaseStudiesByLocale(locale).length), label: h.stats.caseStudies },
    { value: `${demos.length}+`, label: h.stats.demos },
  ];

  const serviceLinks = [`/${locale}/demos`, `/${locale}/case-studies`, `/${locale}/projects`];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.metadata.title.default,
    description: dict.metadata.description,
    url: buildLocalizedAbsoluteUrl(locale),
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="container-site pt-[clamp(3rem,7vw,6rem)]">
        <div className="enter flex flex-wrap items-center gap-x-4 gap-y-3" style={stagger(0)}>
          <span className="inline-flex items-center gap-2.5 text-sm text-muted">
            <Image
              src={AVATAR}
              alt=""
              width={28}
              height={28}
              unoptimized
              priority
              className="size-7 rounded-full object-cover ring-1 ring-line"
            />
            {h.hero.byline}
          </span>
        </div>

        <h1 className="text-display enter mt-8 max-w-[24ch] md:mt-10" style={stagger(1)}>
          <span className="block">{h.hero.titleA}</span>
          <span className="block text-muted">{h.hero.titleB}</span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p className="text-lead enter max-w-[54ch] md:col-span-7" style={stagger(2)}>
            {h.hero.lead}
          </p>
          <div className="enter flex flex-wrap gap-3 md:col-span-5 md:justify-end" style={stagger(3)}>
            <ButtonLink href="#work" size="lg">
              {h.hero.primaryCta}
              <ArrowForward className="rotate-90 rtl:-rotate-90" />
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" size="lg">
              {h.hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <dl className="enter mt-16 grid grid-cols-2 border-t border-line md:mt-24 lg:grid-cols-4" style={stagger(4)}>
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 border-line py-6 even:border-s even:ps-5 md:py-8 md:even:ps-8 [&:nth-child(n+3)]:border-t lg:[&:nth-child(3)]:border-s lg:[&:nth-child(3)]:ps-8 lg:[&:nth-child(n+3)]:border-t-0"
            >
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-none tracking-[-0.035em] tabular" dir="ltr">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Selected work ───────────────────────────────────────────────── */}
      <section id="work" aria-labelledby="work-title" className="container-site section-y scroll-mt-20">
        <SectionHeader
          id="work-title"
          title={h.work.title}
          description={h.work.description}
          action={<ViewAllLink href={`/${locale}/projects`}>{h.work.cta}</ViewAllLink>}
        />

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20">
          {ownProjects.map((project, i) => (
            <WorkCard
              key={project.id}
              item={project}
              labels={workLabels}
              priority={i < 2}
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
              className={`reveal ${i % 2 === 1 ? "md:mt-24" : ""}`}
            />
          ))}
        </div>

        <div className="reveal mt-20 grid gap-8 border-t border-line pt-10 md:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold tracking-[-0.015em] rtl:tracking-normal">{h.work.ossTitle}</h3>
            <p className="mt-2 max-w-[36ch] text-ink-2">{h.work.ossDescription}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {ossProjects.map((p) => (
              <li key={p.id} className="group card card-interactive relative flex items-center gap-4 p-3 pe-5">
                <div className="media-frame aspect-[3/2] w-28 shrink-0 rounded-[0.6rem]">
                  <Image src={p.image} alt="" fill sizes="112px" className="object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={p.demo || p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stretched-link font-semibold text-ink"
                  >
                    {p.title}
                  </a>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink-2">{p.description}</p>
                </div>
                <ArrowOut className="shrink-0 text-muted transition-colors group-hover:text-ink" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How I help ──────────────────────────────────────────────────── */}
      <section aria-labelledby="services-title" className="border-y border-line bg-paper-2">
        <div className="container-site section-y">
          <SectionHeader id="services-title" title={h.services.title} description={h.services.description} />
          <ol className="mt-12 grid gap-y-10 md:mt-16 md:grid-cols-3">
            {h.services.items.map((item, i) => (
              <li
                key={item.title}
                className="reveal flex flex-col border-t border-line-strong pt-7 md:border-t-0 md:border-s md:pt-0 md:ps-8 md:first:border-s-0 md:first:ps-0 md:pe-8"
              >
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-ink-2">{item.desc}</p>
                <Link href={serviceLinks[i]} className="group link-quiet mt-6 self-start text-[0.9375rem] md:mt-auto md:pt-8">
                  {item.cta}
                  <ArrowForward />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Case studies ────────────────────────────────────────────────── */}
      <section aria-labelledby="cases-title" className="container-site section-y">
        <SectionHeader
          id="cases-title"
          title={h.caseStudies.title}
          description={h.caseStudies.description}
          action={<ViewAllLink href={`/${locale}/case-studies`}>{h.caseStudies.cta}</ViewAllLink>}
        />
        <ul className="reveal mt-12 md:mt-16">
          {caseStudies.map((study) => (
            <IndexRow
              key={study.slug}
              href={`/${locale}/case-studies/${study.slug}`}
              label={study.category}
              title={study.title}
              summary={study.summary}
              meta={
                study.highlights && (
                  <ul className="flex flex-wrap gap-1.5">
                    {study.highlights.map((hl) => (
                      <li key={hl} className="tag">
                        {hl}
                      </li>
                    ))}
                  </ul>
                )
              }
            />
          ))}
        </ul>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────────────── */}
      <section aria-labelledby="testimonial-title" className="container-site pb-[var(--section-y)]">
        <figure className="reveal card grid gap-10 p-7 sm:p-10 md:p-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <h2 id="testimonial-title" className="sr-only">
              {h.testimonial.title}
            </h2>
            <p className="flex items-center gap-1 text-accent" aria-label={`${rating} ${h.testimonial.outOf}`}>
              {Array.from({ length: rating }, (_, i) => (
                <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-current">
                  <path d="M10 1.8l2.47 5.25 5.73.7-4.22 3.96 1.08 5.69L10 14.6l-5.06 2.8 1.08-5.7L1.8 7.75l5.73-.7L10 1.8z" />
                </svg>
              ))}
            </p>
          </div>
          <blockquote lang="en" dir="ltr" className="lg:col-span-9">
            <p className="text-[clamp(1.2rem,1rem+0.75vw,1.625rem)] font-medium leading-[1.45] tracking-[-0.018em] text-ink">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-9 lg:col-start-4">
            <div dir="ltr" className="flex items-center gap-3">
              <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-paper-2 font-semibold uppercase text-ink-2">
                {testimonial.company.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-ink">{testimonial.company}</p>
                <a
                  href={`https://${testimonial.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  @{testimonial.handle} · {testimonial.website}
                </a>
              </div>
            </div>
            <a
              href={testimonial.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {h.testimonial.sourceLabel} {testimonial.platform}
              <ArrowOut className="size-3.5" />
            </a>
          </figcaption>
        </figure>
      </section>

      {/* ── Experience ──────────────────────────────────────────────────── */}
      <section aria-labelledby="experience-title" className="border-t border-line">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <h2 id="experience-title" className="text-h2 max-w-[16ch]">
              {h.experience.title}
            </h2>
            <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-2">{h.experience.description}</p>
          </div>
          <ol className="reveal lg:col-span-7">
            {h.experience.items.map((item) => (
              <li key={item.role} className="grid gap-x-8 gap-y-2 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] lg:first:pt-2">
                <p className="font-mono text-sm text-muted tabular">{item.period}</p>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.015em] rtl:tracking-normal">{item.role}</h3>
                  <p className="text-sm text-muted">{item.company}</p>
                  <p className="mt-3 max-w-[56ch] leading-relaxed text-ink-2">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Writing ─────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section aria-labelledby="writing-title" className="container-site pb-[calc(var(--section-y)*0.5)]">
          <SectionHeader
            id="writing-title"
            title={h.writing.title}
            description={h.writing.description}
            action={<ViewAllLink href={`/${locale}/blog`}>{h.writing.cta}</ViewAllLink>}
          />
          <ul className="reveal mt-12 md:mt-16">
            {posts.map((post) => (
              <IndexRow
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                label={post.category}
                title={post.title}
                summary={post.summary}
                meta={
                  <MetaRow
                    items={[
                      <time key="d" dateTime={post.publishedDate.toISOString().slice(0, 10)}>
                        {formatPostDate(post.publishedDate, locale)}
                      </time>,
                      `${post.readTime} ${dict.blog.minRead}`,
                    ]}
                  />
                }
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
