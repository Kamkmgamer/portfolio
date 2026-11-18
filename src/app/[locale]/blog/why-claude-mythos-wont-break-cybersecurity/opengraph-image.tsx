import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Why Claude Mythos Won't Break Cybersecurity";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Why Claude Mythos Won't Break Cybersecurity",
    subtitle: "The economics of AI vulnerabilities favor defenders",
    path: "/blog/why-claude-mythos-wont-break-cybersecurity"
  });
}
