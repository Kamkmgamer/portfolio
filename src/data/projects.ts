export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gradient: string;
  github?: string;
  demo?: string;
  category: string;
}

const projectPreview = (url: string) => url;

export const projects: Project[] = [
  { id: 1, title: "Kamkm Chess", description: "A browser chess experience where players can challenge AI agents.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3Ns7MEbk1U0DjsykuRI9K3M1wVCESQ8Ho4OvTJd"), tags: ["TypeScript", "Next.js", "AI"], gradient: "from-cyan-500 via-emerald-500 to-blue-500", github: "https://github.com/Kamkmgamer/kamkmchess", demo: "https://chess.khalil.mageed.net", category: "Web Development" },
  { id: 2, title: "SoftAI", description: "An AI product interface built for fast, focused workflows.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3NsJw9mmsrgXyRTCjZ70mQYUsu1pthMD6Vfqodx"), tags: ["TypeScript", "AI", "Product"], gradient: "from-amber-500 via-orange-500 to-red-500", github: "https://github.com/Kamkmgamer/softai", demo: "https://softai-three.vercel.app", category: "Web Development" },
  { id: 3, title: "KamkmTeach", description: "An AI tutor that turns learning goals into the next small, useful lesson.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3NsQqdiFS6KFHcZ4loiBwsha2dJVyGYqrQ0tRCN"), tags: ["AI", "Education", "Product"], gradient: "from-emerald-500 via-teal-500 to-cyan-500", demo: "https://teach.khalil.mageed.net", category: "Web Development" },
  { id: 4, title: "Kamkm Video", description: "A focused video experience built with a modern JavaScript stack.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3NseqJYEkQK5AQpgqRXMckLIH0xhvF79d6WNmfz"), tags: ["JavaScript", "Video", "Web"], gradient: "from-cyan-500 via-blue-500 to-indigo-500", github: "https://github.com/Kamkmgamer/KamkmVideo", category: "Web Development" },
  { id: 5, title: "T3 Code", description: "Open-source coding infrastructure and tooling I contribute to.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3NsrZRWFbtKO5mcFkUvxZLiIg6CYeosflbzRQJE"), tags: ["Open Source", "TypeScript", "Developer Tools"], gradient: "from-cyan-500 via-blue-500 to-indigo-500", github: "https://github.com/Kamkmgamer/t3code", demo: "https://t3.codes", category: "OSS Contribution" },
  { id: 6, title: "pnpm", description: "The fast, disk-space-efficient package manager I contribute to.", image: projectPreview("https://hoy17gy8fx.ufs.sh/f/aEK1BQYVK3Ns5IWaEJV1H8hroIpFSitUjfzsQ3n0a6bZO2wL"), tags: ["Open Source", "Rust", "Tooling"], gradient: "from-amber-500 via-orange-500 to-red-500", github: "https://github.com/Kamkmgamer/pnpm", demo: "https://pnpm.io", category: "OSS Contribution" },
];
