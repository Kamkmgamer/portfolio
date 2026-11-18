import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Headless Shopify vs Regular Shopify: The Honest Difference";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Headless Shopify vs Regular Shopify",
    subtitle: "Clear Explanation · Honest Comparison · Practical Guidance",
    path: "/blog/headless-shopify-vs-regular"
  });
}
