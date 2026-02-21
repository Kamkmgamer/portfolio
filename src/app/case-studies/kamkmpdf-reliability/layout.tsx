import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
  description:
    "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries. Structured content, separation of concerns, and the architecture behind dependable document generation.",
  openGraph: {
    title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
    description:
      "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries.",
    url: "https://www.khalil.mageed.net/case-studies/kamkmpdf-reliability",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KamkmPDF Reliability: Why HTML-to-PDF Beats Native Libraries",
    description:
      "Technical deep-dive into why HTML-to-PDF generation is more reliable than native PDF libraries.",
  },
  alternates: {
    canonical: "/case-studies/kamkmpdf-reliability",
  },
};

export default function KamkmPDFReliabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
