import React from "react";
import DemoList from "@/components/DemoList";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export default async function DemosPage() {
  const demos = await prisma.demo.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-[1800px] mx-auto">
        <DemoList demos={demos} />
      </div>
    </main>
  );
}
