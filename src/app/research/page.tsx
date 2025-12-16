import Image from "next/image";
import Link from "next/link";
import { researchPapers } from "@/data/research";

export const metadata = {
  title: "Research",
  description: "Research papers and publications",
};

export default function ResearchPage() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b-section-light dark:bg-gradient-to-b-section-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-16 tracking-tight">
          <span className="text-text dark:text-text">My </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Research
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPapers.map((paper) => (
            <Link
              key={paper.id}
              href={`/research/${paper.slug}`}
              className="block group relative overflow-hidden rounded-xl shadow-lg bg-surface transition-all duration-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-dark"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={paper.image || "/file.svg"}
                  alt={paper.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                {paper.venue && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 text-white text-xs font-semibold rounded-full z-10">
                    {paper.venue}
                    {paper.year ? ` · ${paper.year}` : ""}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-text dark:text-text mb-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                  {paper.title}
                </h2>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                  {paper.abstract}
                </p>
                {paper.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {paper.tags.map((tag, i) => (
                      <span
                        key={`${paper.id}-tag-${i}`}
                        className="px-3 py-1 text-xs bg-primary-light/20 text-primary-light dark:bg-primary-dark/20 dark:text-primary-dark rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
