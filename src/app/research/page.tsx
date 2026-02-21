import React from "react";
import type { Metadata } from "next";
import ResearchList from "@/components/ResearchList";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research papers and technical writing by Khalil AbdalMageed. Deep-dives into web architecture, performance optimization, and software engineering topics.",
  openGraph: {
    title: "Research | Khalil AbdalMageed",
    description:
      "Research papers and technical writing on web architecture, performance optimization, and software engineering.",
    url: "https://www.khalil.mageed.net/research",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Khalil AbdalMageed",
    description:
      "Research papers and technical writing on web architecture and software engineering.",
  },
  alternates: {
    canonical: "/research",
  },
};

export default async function ResearchPage() {
  let researchPapers: Awaited<ReturnType<typeof prisma.research.findMany>> = [];
  try {
    researchPapers = await prisma.research.findMany({
      orderBy: {
        year: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch research papers:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-800px h-800px bg-[hsl(var(--accent-gold))]/5 rounded-full blur-100px translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-600px h-600px bg-[hsl(var(--accent-bronze))]/5 rounded-full blur-80px -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto">
        <ResearchList researchPapers={researchPapers} />
      </div>
    </main>
  );
}
