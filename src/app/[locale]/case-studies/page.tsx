import type { Metadata } from "next";
import PageClient from "./page-client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildLocalizedMetadata(locale, "/case-studies", {
    title: dict.caseStudies.title,
    description: dict.caseStudies.description,
    openGraph: {
      title: dict.caseStudies.title,
      description: dict.caseStudies.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.caseStudies.title,
      description: dict.caseStudies.description,
    },
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return <PageClient params={params} />;
}
