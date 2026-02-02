import React from "react";
import ProjectList from "@/components/ProjectList";
import { prisma } from "@/lib/db";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      id: "desc", // Or createdAt
    },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-[1800px] mx-auto">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
