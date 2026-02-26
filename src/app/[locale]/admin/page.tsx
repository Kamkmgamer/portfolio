import React from "react";
import { prisma } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const projects = await prisma.project.findMany({ orderBy: { id: "desc" } });
    const demos = await prisma.demo.findMany({ orderBy: { id: "desc" } });

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-display mb-10">Admin Dashboard</h1>
                <AdminDashboard initialProjects={projects} initialDemos={demos} />
            </div>
        </main>
    );
}
