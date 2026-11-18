import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Projects - Khalil AbdalMageed Portfolio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Selected work",
    subtitle: "AI app interfaces, product demos and SaaS features, plus the open-source tools I contribute to.",
    path: "/projects"
  });
}
