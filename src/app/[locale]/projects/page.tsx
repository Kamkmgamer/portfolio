import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { ownProjects, ossProjects } from "@/data/projects";
import { WorkCard } from "@/components/site/cards";
import { PageHeader, SectionHeader, ViewAllLink } from "@/components/site/layout";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.projects.title,
    description: dict.projects.description,
    openGraph: {
      title: `${dict.projects.title} | Khalil AbdalMageed`,
      description: dict.projects.description,
      url: `https://www.khalil.mageed.net/${locale}/projects`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.projects.title} | Khalil AbdalMageed`,
      description: dict.projects.description,
    },
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { en: "/en/projects", ar: "/ar/projects" },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const p = dict.projects;
  const labels = { live: p.live, source: p.source };

  return (
    <>
      <PageHeader title={p.heading} lead={p.lead} />

      <section aria-label={p.heading} className="container-site pb-[var(--section-y)]">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {ownProjects.map((project, i) => (
            <li key={project.id} className="reveal flex">
              <WorkCard
                item={project}
                labels={labels}
                priority={i < 2}
                headingLevel="h2"
                sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="oss-heading" className="border-t border-line">
        <div className="container-site section-y">
          <SectionHeader id="oss-heading" title={p.ossHeading} description={p.ossDescription} />
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2">
            {ossProjects.map((project) => (
              <li key={project.id} className="reveal flex">
                <WorkCard
                  item={project}
                  labels={labels}
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                  className="w-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-site">
        <div className="reveal flex flex-col items-start justify-between gap-4 border-t border-line py-10 sm:flex-row sm:items-center">
          <p className="text-lg text-ink-2">{p.offersPrompt}</p>
          <ViewAllLink href={`/${locale}/offers`}>{p.viewPastOffers}</ViewAllLink>
        </div>
      </div>
    </>
  );
}
