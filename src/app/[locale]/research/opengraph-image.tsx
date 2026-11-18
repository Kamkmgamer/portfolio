import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Research & Publications - Khalil AbdalMageed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Research & publications",
    subtitle: "Exploring the frontiers of web engineering & digital architecture.",
    path: "/research"
  });
}
