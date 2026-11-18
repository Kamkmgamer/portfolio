import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "KamkmPDF Scaling - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "KamkmPDF Scaling",
    subtitle: "A single worker processing 6,000 documents an hour with optimized architecture.",
    path: "/case-studies/kamkmpdf-scaling"
  });
}
