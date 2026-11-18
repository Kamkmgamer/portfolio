import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [projects, demos] = await Promise.all([
    prisma.project.findMany({ orderBy: { id: "desc" } }),
    prisma.demo.findMany({ orderBy: { id: "desc" } }),
  ]);

  return (
    <div className="container-site pb-[var(--section-y)] pt-[clamp(2.5rem,6vw,4.5rem)]" lang="en" dir="ltr">
      <h1 className="text-h2">Admin</h1>
      <div className="mt-10">
        <AdminDashboard initialProjects={projects} initialDemos={demos} />
      </div>
    </div>
  );
}
