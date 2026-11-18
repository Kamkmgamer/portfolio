import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getCaseStudiesByLocale } from "@/lib/content";
import { IndexRow } from "@/components/site/cards";
import { PageHeader } from "@/components/site/layout";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildLocalizedMetadata(locale, "/case-studies", {
    title: dict.caseStudies.title,
    description: dict.caseStudies.description,
    openGraph: { title: dict.caseStudies.title, description: dict.caseStudies.description, type: "website" },
    twitter: { card: "summary_large_image", title: dict.caseStudies.title, description: dict.caseStudies.description },
  });
}

export default async function CaseStudiesIndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const studies = getCaseStudiesByLocale(locale);

  return (
    <>
      <PageHeader title={dict.caseStudies.heading} lead={dict.caseStudies.lead} />
      <section aria-label={dict.caseStudies.title} className="container-site pb-[calc(var(--section-y)*0.75)]">
        <ul className="reveal">
          {studies.map((study) => (
            <IndexRow
              key={study.slug}
              headingLevel="h2"
              href={`/${locale}/case-studies/${study.slug}`}
              label={study.category}
              title={study.title}
              summary={study.summary}
              meta={
                <div className="flex flex-col gap-3">
                  {study.highlights && (
                    <ul className="flex flex-wrap gap-1.5">
                      {study.highlights.map((h) => (
                        <li key={h} className="tag">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="text-sm text-muted">
                    <span className="font-medium text-ink-2">{dict.caseStudies.stack}:</span> {study.stack.replace(/\.$/, "")}
                  </p>
                </div>
              }
            />
          ))}
        </ul>
      </section>
    </>
  );
}
