import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Ecommerce Websites Tiers - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Ecommerce Websites",
    subtitle: "Every ecommerce tier from $20 to $10,000 — see what your money buys for online stores.",
    path: "/case-studies/ecommerce-websites-tiers"
  });
}
