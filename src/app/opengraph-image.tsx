import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Khalil AbdalMageed - Web Developer & Designer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Interfaces for AI products, designed and built to ship.",
    subtitle: "AI app interfaces, product demos and SaaS features built with Next.js and TypeScript.",
    path: ""
  });
}
