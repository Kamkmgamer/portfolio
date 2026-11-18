import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Why a $20 Website Will Cost You Thousands";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Why a $20 Website Will Cost You Thousands",
    subtitle: "No Jargon · Real Demos · Honest Advice",
    path: "/blog/why-not-to-buy-cheap-websites"
  });
}
