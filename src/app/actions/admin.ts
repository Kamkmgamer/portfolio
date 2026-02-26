"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProject(data: any) {
    const project = await prisma.project.create({ data });
    revalidatePath("/[locale]/projects", "page");
    revalidatePath("/[locale]/admin", "page");
    return project;
}

export async function updateProject(id: number, data: any) {
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

export async function createDemo(data: any) {
    const demo = await prisma.demo.create({ data });
    revalidatePath("/[locale]/demos", "page");
    revalidatePath("/[locale]/admin", "page");
    return demo;
}

export async function updateDemo(id: number, data: any) {
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
