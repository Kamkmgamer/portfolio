import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
  description:
    "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour. Architecture evolution, caching strategies, and infrastructure decisions for high-throughput document processing.",
  openGraph: {
    title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
    description:
      "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour. Architecture evolution and caching strategies.",
    url: "https://www.khalil.mageed.net/case-studies/kamkmpdf-scaling",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KamkmPDF Scaling: From 100 to 6,000 PDFs/Hour",
    description:
      "How I scaled a PDF generation service from 100 to 6,000 PDFs per hour.",
  },
  alternates: {
    canonical: "/case-studies/kamkmpdf-scaling",
  },
};

export default function KamkmPDFScalingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
