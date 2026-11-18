import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { prisma } from "@/lib/db";
import ShareButton from "@/components/ShareButton";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getPaper, getPapers } from "@/lib/research";
import { researchPapers as staticPapers } from "@/data/research";
import { ArticleBody, ArticleHeader, READING } from "@/components/site/article";
import { IndexRow } from "@/components/site/cards";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  try {
    const papers = await prisma.research.findMany({ select: { slug: true } });
    return papers.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return staticPapers.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const paper = await getPaper(slug);
  if (!paper) return { title: "Research" };

  const title = `${paper.title} — Research`;
  return buildLocalizedMetadata(locale, `/research/${slug}`, {
    title,
    description: paper.abstract,
    openGraph: { title, description: paper.abstract, images: paper.image ? [paper.image] : undefined },
    twitter: { card: "summary_large_image", title, description: paper.abstract },
  });
}

export default async function ResearchPaperPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const r = dict.research;

  const paper = await getPaper(slug);
  if (!paper) notFound();

  const related = (await getPapers()).filter((p) => p.slug !== slug).slice(0, 2);
  const published = [paper.venue, paper.year].filter(Boolean).join(" · ");
  const paragraphs = (paper.content ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article>
      <ArticleHeader
        backHref={`/${locale}/research`}
        backLabel={r.back}
        category={published || undefined}
        title={paper.title}
        meta={paper.authors.length ? [`${r.authors}: ${paper.authors.join(", ")}`] : undefined}
      >
        <div className="flex flex-wrap gap-3">
          {paper.pdf && (
            <a href={encodeURI(paper.pdf)} download target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Download aria-hidden="true" strokeWidth={1.75} />
              {r.download}
            </a>
          )}
          <ShareButton title={paper.title} label={r.share} copiedLabel={r.linkCopied} />
        </div>
      </ArticleHeader>

      <ArticleBody>
        <section aria-labelledby="abstract" className="card p-6 md:p-8">
          <h2 id="abstract" className="!mt-0 !text-base font-semibold text-ink">
            {r.abstract}
          </h2>
          <p className="!mt-4 text-ink">{paper.abstract}</p>
        </section>

        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {paper.tags.length > 0 && (
          <ul className="!mt-10 flex list-none flex-wrap gap-1.5 !ps-0">
            {paper.tags.map((tag) => (
              <li key={tag} className="tag !mt-0">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </ArticleBody>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-site pt-[var(--section-y)]">
          <div className={cn(READING, "max-w-none")}>
            <h2 id="related" className="text-h3">
              {r.related}
            </h2>
            <ul className="mt-8">
              {related.map((p) => (
                <IndexRow
                  key={p.id}
                  href={`/${locale}/research/${p.slug}`}
                  label={[p.year, p.venue].filter(Boolean).join(" · ")}
                  title={p.title}
                  summary={<span className="line-clamp-2">{p.abstract}</span>}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
