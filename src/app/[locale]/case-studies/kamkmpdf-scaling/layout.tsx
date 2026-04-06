import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/case-studies/kamkmpdf-scaling";

const baseMetadata: Metadata = {
  title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
  description:
    "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour. Architecture evolution, caching strategies, and infrastructure decisions for high-throughput document processing.",
  openGraph: {
    title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
    description:
      "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour. Architecture evolution and caching strategies.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
    description:
      "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour.",
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

export default function KamkmPDFScalingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
