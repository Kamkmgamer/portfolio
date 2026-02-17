import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.khalil.mageed.net";

  // Static routes
  const routes = [
    "",
    "/projects",
    "/case-studies",
    "/contact",
    "/research",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes for case studies and research papers
  const caseStudySlugs = ["example-case-study"];
  const researchSlugs = ["example-research-paper"];

  const caseStudyRoutes = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const researchRoutes = researchSlugs.map((slug) => ({
    url: `${baseUrl}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes, ...researchRoutes];
}
