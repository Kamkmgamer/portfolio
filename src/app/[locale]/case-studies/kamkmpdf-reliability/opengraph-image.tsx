import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "KamkmPDF Reliability - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "KamkmPDF Reliability",
    subtitle: "Why HTML-based documents are the most reliable way to generate PDFs with KamkmPDF.",
    path: "/case-studies/kamkmpdf-reliability"
  });
}
