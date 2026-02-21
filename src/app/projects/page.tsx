import React from "react";
import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Khalil AbdalMageed's portfolio of web development projects. Restaurant websites, ecommerce platforms, and custom web applications built with React and Next.js.",
  openGraph: {
    title: "Projects | Khalil AbdalMageed",
    description:
      "Portfolio of web development projects - restaurant websites, ecommerce platforms, and custom applications.",
    url: "https://www.khalil.mageed.net/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Khalil AbdalMageed",
    description:
      "Portfolio of web development projects - restaurant websites, ecommerce platforms, and custom applications.",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <ProjectList projects={projects} />

        <div className="mt-20 flex justify-center">
          <a
            href="/offers"
            className="px-8 py-4 border border-white/10 hover:border-[hsl(var(--accent-gold))] text-text/60 hover:text-[hsl(var(--accent-gold))] transition-all duration-300 uppercase tracking-widest text-sm"
          >
            View Past Offers
          </a>
        </div>
      </div>
    </main>
  );
}
