import React from "react";
import type { Metadata } from "next";
import DemoList from "@/components/DemoList";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Live Demos",
  description:
    "Interactive live demos of websites at different price points. Compare $20 websites to $10,000 platforms and see exactly what each budget delivers.",
  openGraph: {
    title: "Live Website Demos | Khalil AbdalMageed",
    description:
      "Interactive demos comparing websites at different price points. See what each budget delivers.",
    url: "https://www.khalil.mageed.net/demos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Website Demos | Khalil AbdalMageed",
    description:
      "Interactive demos comparing websites at different price points.",
  },
  alternates: {
    canonical: "/demos",
  },
};

export default async function DemosPage() {
  let demos: Awaited<ReturnType<typeof prisma.demo.findMany>> = [];
  try {
    demos = await prisma.demo.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch demos:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <DemoList demos={demos} />
      </div>
    </main>
  );
}
