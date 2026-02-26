"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createProject(data: Prisma.ProjectCreateInput) {
    const project = await prisma.project.create({ data });
    revalidatePath("/[locale]/projects", "page");
    revalidatePath("/[locale]/admin", "page");
    return project;
}

export async function updateProject(id: number, data: Prisma.ProjectUpdateInput) {
    const project = await prisma.project.update({ where: { id }, data });
    revalidatePath("/[locale]/projects", "page");
    revalidatePath("/[locale]/admin", "page");
    return project;
}

export async function deleteProject(id: number) {
    const project = await prisma.project.delete({ where: { id } });
    revalidatePath("/[locale]/projects", "page");
    revalidatePath("/[locale]/admin", "page");
    return project;
}

export async function createDemo(data: Prisma.DemoCreateInput) {
    const demo = await prisma.demo.create({ data });
    revalidatePath("/[locale]/demos", "page");
    revalidatePath("/[locale]/admin", "page");
    return demo;
}

export async function updateDemo(id: number, data: Prisma.DemoUpdateInput) {
    const demo = await prisma.demo.update({ where: { id }, data });
    revalidatePath("/[locale]/demos", "page");
    revalidatePath("/[locale]/admin", "page");
    return demo;
}

export async function deleteDemo(id: number) {
    const demo = await prisma.demo.delete({ where: { id } });
    revalidatePath("/[locale]/demos", "page");
    revalidatePath("/[locale]/admin", "page");
    return demo;
}
