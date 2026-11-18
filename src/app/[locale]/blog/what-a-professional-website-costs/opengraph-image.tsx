import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "What a Professional Website Actually Costs ($200-$500)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "What a Professional Website Actually Costs",
    subtitle: "Live Demos · Honest Comparison · Clear Guidance",
    path: "/blog/what-a-professional-website-costs"
  });
}
