import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Reducing Friction - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Reducing Friction",
    subtitle: "Turned vague ideas into a website the client is actually proud of.",
    path: "/case-studies/reducing-friction"
  });
}
