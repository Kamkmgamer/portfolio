import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { demos as staticDemos } from "@/data/demos";
import FilterableWork from "@/components/site/FilterableWork";
import { EmptyState } from "@/components/site/cards";
import { ButtonLink } from "@/components/site/Button";
import { PageHeader } from "@/components/site/layout";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.demos.title,
    description: dict.demos.description,
    openGraph: {
      title: `${dict.demos.title} | Khalil AbdalMageed`,
      description: dict.demos.description,
      url: `https://www.khalil.mageed.net/${locale}/demos`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.demos.title} | Khalil AbdalMageed`,
      description: dict.demos.description,
    },
    alternates: {
      canonical: `/${locale}/demos`,
      languages: { en: "/en/demos", ar: "/ar/demos" },
    },
  };
}

type DemoItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string | null;
  github?: string | null;
};

/** "coffee website Demo" → "Coffee website" */
const cleanTitle = (title: string) => {
  const t = title.replace(/\s*demo\s*$/i, "").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

async function loadDemos(): Promise<DemoItem[]> {
  try {
    const rows = await prisma.demo.findMany({ orderBy: { id: "desc" } });
    return rows;
  } catch (error) {
    // Database unreachable: fall back to the bundled catalogue rather than an empty page.
    console.error("Failed to fetch demos, using static fallback:", error);
    return staticDemos;
  }
}

export default async function DemosPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const d = dict.demos;

  const items = (await loadDemos()).map((demo) => ({
    id: demo.id,
    title: cleanTitle(demo.title),
    description: demo.description,
    image: demo.image,
    tags: demo.tags ?? [],
    demo: demo.demo ?? null,
    github: demo.github ?? null,
  }));

  return (
    <>
      <PageHeader title={d.heading} lead={d.lead} />
      <section aria-label={d.heading} className="container-site pb-[calc(var(--section-y)*0.75)]">
        {items.length === 0 ? (
          <EmptyState
            title={d.unavailableTitle}
            description={d.unavailableBody}
            action={
              <ButtonLink href={`/${locale}/projects`} variant="secondary" size="sm">
                {dict.nav.projects}
              </ButtonLink>
            }
          />
        ) : (
          <FilterableWork
            items={items}
            labels={{
              all: d.all,
              filter: d.filterLabel,
              empty: d.empty,
              clear: d.clearFilter,
              live: d.viewLiveDemo,
              source: dict.projects.source,
            }}
          />
        )}
      </section>
    </>
  );
}
