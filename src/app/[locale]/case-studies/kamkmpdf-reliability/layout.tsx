import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/case-studies/kamkmpdf-reliability";

const baseMetadata: Metadata = {
  title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
  description:
    "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries. Structured content, separation of concerns, and the architecture behind dependable document generation.",
  openGraph: {
    title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
    description:
      "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
    description:
      "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedMetadata(locale, articlePath, baseMetadata);
}

export default function KamkmPDFReliabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
