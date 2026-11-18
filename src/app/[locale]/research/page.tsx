import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getPapers } from "@/lib/research";
import { EmptyState, IndexRow } from "@/components/site/cards";
import { MetaRow, PageHeader } from "@/components/site/layout";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.research.title,
    description: dict.research.description,
    openGraph: {
      title: `${dict.research.title} | Khalil AbdalMageed`,
      description: dict.research.description,
      url: `https://www.khalil.mageed.net/${locale}/research`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.research.title} | Khalil AbdalMageed`,
      description: dict.research.description,
    },
    alternates: {
      canonical: `/${locale}/research`,
      languages: { en: "/en/research", ar: "/ar/research" },
    },
  };
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const r = dict.research;
  const papers = await getPapers();

  return (
    <>
      <PageHeader title={r.heading} lead={r.intro} />
      <section aria-label={r.heading} className="container-site pb-[calc(var(--section-y)*0.75)]">
        {papers.length === 0 ? (
          <EmptyState title={r.emptyTitle} description={r.emptyBody} />
        ) : (
          <ul className="reveal">
            {papers.map((paper) => (
              <IndexRow
                key={paper.id}
                headingLevel="h2"
                href={`/${locale}/research/${paper.slug}`}
                label={[paper.year, paper.venue].filter(Boolean).join(" · ") || r.readPaper}
                title={paper.title}
                summary={<span className="line-clamp-3">{paper.abstract}</span>}
                meta={
                  <div className="flex flex-col gap-3">
                    {paper.authors.length > 0 && <MetaRow items={paper.authors} />}
                    {paper.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {paper.tags.map((tag) => (
                          <li key={tag} className="tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                }
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
