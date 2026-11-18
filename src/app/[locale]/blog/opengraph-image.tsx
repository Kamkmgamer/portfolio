import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Honest notes on AI and the web",
    subtitle: "Plain-spoken takes on tools, costs and trade-offs.",
    path: "/blog"
  });
}
