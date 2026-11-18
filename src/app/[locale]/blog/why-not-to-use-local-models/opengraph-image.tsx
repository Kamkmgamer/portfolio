import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Why Not to Use Local Models: The Honest Truth";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Why Not to Use Local Models?",
    subtitle: "The honest truth about saving $200/month",
    path: "/blog/why-not-to-use-local-models"
  });
}
