import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Khalil AbdalMageed. Email, phone, or send a message directly through the contact form. Available for web development and design projects.",
  openGraph: {
    title: "Contact Khalil AbdalMageed",
    description:
      "Get in touch for web development and design projects. Available for freelance work.",
    url: "https://www.khalil.mageed.net/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Khalil AbdalMageed",
    description:
      "Get in touch for web development and design projects.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
