import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "DevServe - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "DevServe",
    subtitle: "A complete SaaS platform built solo in 35 days. Estimated value $100k+.",
    path: "/case-studies/devserve"
  });
}
