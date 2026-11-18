export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  category: "Web Development" | "OSS Contribution";
}

/* Screenshots live in /public/projects so they are served and optimized locally. */
export const projects: Project[] = [
  {
    id: 1,
    title: "Kamkm Chess",
    description: "A browser chess experience where players can challenge AI agents.",
    image: "/projects/kamkm-chess.png",
    tags: ["TypeScript", "Next.js", "AI"],
    github: "https://github.com/Kamkmgamer/kamkmchess",
    demo: "https://chess.khalil.mageed.net",
    category: "Web Development",
  },
  {
    id: 2,
    title: "SoftAI",
    description: "An AI product interface built for fast, focused workflows.",
    image: "/projects/softai.png",
    tags: ["TypeScript", "AI", "Product"],
    github: "https://github.com/Kamkmgamer/softai",
    demo: "https://softai-three.vercel.app",
    category: "Web Development",
  },
  {
    id: 3,
    title: "KamkmTeach",
    description: "An AI tutor that turns learning goals into the next small, useful lesson.",
    image: "/projects/kamkm-teach.png",
    tags: ["AI", "Education", "Product"],
    demo: "https://teach.khalil.mageed.net",
    category: "Web Development",
  },
  {
    id: 4,
    title: "Kamkm Video",
    description: "A focused video experience built with a modern JavaScript stack.",
    image: "/projects/kamkm-video.png",
    tags: ["JavaScript", "Video", "Web"],
    github: "https://github.com/Kamkmgamer/KamkmVideo",
    category: "Web Development",
  },
  {
    id: 5,
    title: "T3 Code",
    description: "Open-source coding infrastructure and tooling I contribute to.",
    image: "/projects/t3-code.png",
    tags: ["Open Source", "TypeScript", "Developer Tools"],
    github: "https://github.com/Kamkmgamer/t3code",
    demo: "https://t3.codes",
    category: "OSS Contribution",
  },
  {
    id: 6,
    title: "pnpm",
    description: "The fast, disk-space-efficient package manager I contribute to.",
    image: "/projects/pnpm.png",
    tags: ["Open Source", "Rust", "Tooling"],
    github: "https://github.com/Kamkmgamer/pnpm",
    demo: "https://pnpm.io",
    category: "OSS Contribution",
  },
];

export const ownProjects = projects.filter((p) => p.category !== "OSS Contribution");
export const ossProjects = projects.filter((p) => p.category === "OSS Contribution");
