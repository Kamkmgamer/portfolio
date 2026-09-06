import type { Metadata } from "next";
import PageClient, { type HomeProject } from "./page-client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import screens from "../../../public/screens/manifest.json";

export const revalidate = 3600;

/** Fresh captures of the live sites (scripts/capture-project-screens.mjs) win over stored images. */
const screenFor = (id: number, fallback: string) =>
  (screens as Record<string, string>)[String(id)] ?? fallback;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
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

const AI_PATTERN = /\bai\b|chatbot|llm|agent/i;

/** AI/SaaS work leads; everything else follows in newest-first order. */
const rankProject = (p: HomeProject) => {
  if (p.tags.some((t) => AI_PATTERN.test(t))) return 0;
  if (AI_PATTERN.test(p.description) || AI_PATTERN.test(p.title)) return 1;
  return 2;
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  let projects: HomeProject[] = [];
  try {
    const rows = await prisma.project.findMany({
      orderBy: { id: "desc" },
      select: { id: true, title: true, description: true, image: true, tags: true, demo: true },
    });
    projects = rows
      .map((r) => ({ ...r, image: screenFor(r.id, r.image), tags: r.tags ?? [], demo: r.demo ?? null }))
      .sort((a, b) => rankProject(a) - rankProject(b) || b.id - a.id);
  } catch (error) {
    console.error("Failed to fetch projects for the homepage:", error);
  }

  return <PageClient locale={locale} dict={dict} projects={projects} />;
}
