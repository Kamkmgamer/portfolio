import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "What a $100 Website Actually Gets You";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "What a $100 Website Actually Gets You",
    subtitle: "Fair Assessment · Honest Limits · Clear Signals",
    path: "/blog/what-100-dollar-website-gets-you"
  });
}
