import { prisma } from "@/lib/db";
import { researchPapers as staticPapers } from "@/data/research";

export type Paper = {
  id: string | number;
  slug: string;
  title: string;
  abstract: string;
  authors: string[];
  venue: string | null;
  year: number | null;
  image: string | null;
  tags: string[];
  pdf: string | null;
  content: string | null;
};

const fromStatic = (): Paper[] =>
  staticPapers.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    abstract: p.abstract,
    authors: p.authors ?? [],
    venue: p.venue ?? null,
    year: p.year ?? null,
    image: p.image ?? null,
    tags: p.tags ?? [],
    pdf: p.pdf ?? null,
    content: p.content ?? null,
  }));

/** All papers, newest first. Falls back to bundled data if the database is unreachable. */
export async function getPapers(): Promise<Paper[]> {
  try {
    return await prisma.research.findMany({ orderBy: { year: "desc" } });
  } catch (error) {
    console.error("Failed to fetch research papers, using static fallback:", error);
    return fromStatic();
  }
}

export async function getPaper(slug: string): Promise<Paper | null> {
  try {
    return await prisma.research.findUnique({ where: { slug } });
  } catch {
    return fromStatic().find((p) => p.slug === slug) ?? null;
  }
}
