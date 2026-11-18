import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Restaurant Website Tiers: $20 to $10,000";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "$20 to $10,000 Restaurant Websites",
    subtitle: "9 Live Demos · Transparent Pricing · Real Examples",
    path: "/case-studies/restaurant-websites-tiers"
  });
}
