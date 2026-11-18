import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "How Much Does a Website Cost? $20 to $10,000 Compared";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "How Much Does a Website Cost?",
    subtitle: "$20 to $10,000 Compared · 15 Live Demos",
    path: "/blog/how-much-does-a-website-cost"
  });
}
