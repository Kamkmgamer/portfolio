import React from "react";
import ProjectList from "@/components/ProjectList";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

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
