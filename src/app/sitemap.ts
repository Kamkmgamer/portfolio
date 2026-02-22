import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAllCaseStudies } from "@/lib/content";
import { getAllBlogPosts } from "@/lib/blogs";
import { locales } from "@/i18n.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.khalil.mageed.net";

  const staticRoutes = [
    "",
    "/blog",
    "/case-studies",
    "/contact",
    "/offers",
    "/demos",
    "/projects",
    "/research",
  ];

  const routes = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const caseStudies = getAllCaseStudies();
  const caseStudyRoutes = caseStudies.flatMap((study) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
      lastModified: study.publishedDate || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogPosts = getAllBlogPosts();
  const blogRoutes = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

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
    researchRoutes = papers.flatMap((paper) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/research/${paper.slug}`,
        lastModified: paper.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  } catch {
    // Return empty array if database is not available during build
  }

  return [...routes, ...caseStudyRoutes, ...blogRoutes, ...researchRoutes];
}
