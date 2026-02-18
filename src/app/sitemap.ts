import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAllCaseStudies } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.khalil.mageed.net";

  const routes = [
    "",
    "/case-studies",
    "/contact",
    "/offers",
    "/demos",
    "/projects",
    "/research",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudies = getAllCaseStudies();
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.publishedDate || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let researchRoutes: {
    url: string;
    lastModified: Date;
    changeFrequency: "monthly";
    priority: number;
  }[] = [];
  try {
    const papers = await prisma.research.findMany({
      select: { slug: true, updatedAt: true },
    });
    researchRoutes = papers.map((paper) => ({
      url: `${baseUrl}/research/${paper.slug}`,
      lastModified: paper.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Return empty array if database is not available during build
  }

  return [...routes, ...caseStudyRoutes, ...researchRoutes];
}
