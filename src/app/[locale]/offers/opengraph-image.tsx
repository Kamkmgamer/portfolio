import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Services & Pricing - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Past offers",
    subtitle: "Packages I've proposed to clients, each with a live demo of the build.",
    path: "/offers"
  });
}
