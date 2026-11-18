import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Live Demos - Khalil AbdalMageed Portfolio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Interactive demos",
    subtitle: "Working prototypes you can click through: AI app interfaces, product demos and SaaS features.",
    path: "/demos"
  });
}
