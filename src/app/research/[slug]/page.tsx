import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { researchPapers } from '@/data/research';
import ShareButton from '@/components/ShareButton';

export function generateStaticParams() {
  return researchPapers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const paper = researchPapers.find((p) => p.slug === slug);
  if (!paper) return { title: 'Research' };

  const title = `${paper.title} — Research`;
  const description = paper.abstract;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: paper.image ? [paper.image] : ['/og/research-default.png'],
    },
    alternates: { canonical: `/research/${slug}` },
  };
}

export default async function ResearchPaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = researchPapers.find((p) => p.slug === slug);
  if (!paper) return notFound();

  return (
    <section className="relative w-full py-20 sm:py-28 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/research" className="hover:underline">Research</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{paper.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          {paper.title}
        </h1>

        {/* Metadata */}
        {(paper.authors?.length || paper.venue || paper.year) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-sm text-muted-foreground">
            {paper.authors?.length && (
              <div>
                <span className="font-semibold text-foreground">Authors: </span>
                {paper.authors.join(', ')}
              </div>
            )}
            {(paper.venue || paper.year) && (
              <div>
                <span className="font-semibold text-foreground">Published: </span>
                {[paper.venue, paper.year].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
        )}

        {/* Image */}
        {paper.image && (
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-10 shadow-md">
            <Image src={paper.image} alt={paper.title} fill className="object-cover hover:scale-105 transition-transform duration-700" priority />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
          {paper.content ? (
            <div className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              {paper.content}
            </div>
          ) : (
            <p>{paper.abstract}</p>
          )}
        </article>

        {/* Tags */}
        {paper.tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-10">
            {paper.tags.map((tag, i) => (
              <button
                key={`${paper.id}-tag-${i}`}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-4">
          {paper.pdf && (
            <a
              href={paper.pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-blue-600 dark:bg-blue-500 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <span className="font-semibold">Download PDF</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}

          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-foreground hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Back to Research
          </Link>

          <ShareButton title={paper.title} />
        </div>

        {/* Related Papers */}
        <div className="mt-20 rounded-2xl border border-gray-300 dark:border-gray-800 bg-surface p-6">
          <h2 className="text-2xl font-bold mb-6">Related Papers</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {researchPapers
              .filter((p) => p.slug !== paper.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/research/${related.slug}`}
                  className="group block p-5 rounded-xl border border-gray-300 dark:border-gray-800 bg-surface hover:bg-gray-50/60 dark:hover:bg-white/5 transition"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">{related.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{related.abstract}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
