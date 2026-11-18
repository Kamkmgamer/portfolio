import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Khalil AbdalMageed - Web Developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Let's build something worth using.",
    subtitle: "Tell me about your idea, timeline and budget. I'll get back to you with clear next steps.",
    path: "/contact"
  });
}
