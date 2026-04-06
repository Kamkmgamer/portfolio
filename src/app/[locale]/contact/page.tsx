import type { Metadata } from "next";
import PageClient from "./page-client";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تواصل" : "Contact";
  const description =
    locale === "ar"
      ? "تواصل مع خليل عبدالمجيد لمشاريع تطوير المواقع والتجارة الإلكترونية ومواقع الأعمال."
      : "Get in touch with Khalil AbdalMageed for web development, ecommerce, and business website projects.";

  return buildLocalizedMetadata(locale, "/contact", {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
