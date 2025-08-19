import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { researchPapers } from '@/data/research';

export function generateStaticParams() {
  return researchPapers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const paper = researchPapers.find((p) => p.slug === slug);
  if (!paper) return { title: 'Research' };
  const title = paper.title + ' — Research';
  const description = paper.abstract;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: paper.image ? [paper.image] : undefined,
    },
  };
}

export default async function ResearchPaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = researchPapers.find((p) => p.slug === slug);
  if (!paper) return notFound();

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b-section-light dark:bg-gradient-to-b-section-dark transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <nav className="mb-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <Link href="/research" className="hover:underline">Research</Link>
          <span className="mx-2">/</span>
          <span className="text-text dark:text-text">{paper.title}</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          {paper.title}
        </h1>

        {(paper.authors?.length || paper.venue || paper.year) && (
          <div className="mb-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {paper.authors?.length ? (
              <div>
                <span className="font-semibold text-text dark:text-text">Authors: </span>
                {paper.authors.join(', ')}
              </div>
            ) : null}
            {(paper.venue || paper.year) && (
              <div>
                <span className="font-semibold text-text dark:text-text">Published: </span>
                {[paper.venue, paper.year].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
        )}

        {paper.image && (
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
            <Image src={paper.image} alt={paper.title} fill className="object-cover" />
          </div>
        )}

        {paper.content ? (
          <div className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed whitespace-pre-wrap">
            {paper.content}
          </div>
        ) : (
          <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            {paper.abstract}
          </p>
        )}

        {paper.tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-8">
            {paper.tags.map((tag, i) => (
              <span key={`${paper.id}-tag-${i}`} className="px-3 py-1 text-xs bg-primary-light/20 text-primary-light dark:bg-primary-dark/20 dark:text-primary-dark rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex gap-3">
          {paper.pdf && (
            <a
              href={paper.pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-primary-light to-primary-light dark:from-primary-dark dark:to-primary-dark shadow-md hover:shadow-lg ring-1 ring-black/10 dark:ring-white/10 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:from-primary-light/90 hover:to-primary-light/90 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/90"
            >
              <span className="font-semibold">Download PDF</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-text dark:text-text hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Back to Research
          </Link>
        </div>
      </div>
    </section>
  );
}
