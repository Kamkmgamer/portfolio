
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

export const projects: Project[] = [
  {
    id: 1,
    title: "kamkmPDF",
    description: "A modern PDF generator using AI.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Kamkm-PDF.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkm-pdf.netlify.app/",
    category: "Web Design",
  },
    {id: 2,
    title: "SoftMedics.sd",
    description: "A modern e-learning platform for professionals in Sudan.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/image.png",
    tags: ["Odoo", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://softmedics.sd",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Blue Nile Paint",
    description: "Landing page for a paint company with CMS support.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-08-04%20024500.png",
    tags: ["Webflow", "CMS", "Animations"],
    gradient: "from-blue-500 via-green-400 to-teal-400",
    demo: "https://blue-nile-painting-6aeab3.webflow.io/",
    category: "Web Design",
  },
  {
    id: 4,
    title: "Fitness Khalil",
    description: "A fitness site designed for trainers.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-08-04%20024232.png",
    tags: ["Webflow", "SEO", "Responsive"],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    demo: "http://khalils-example-site.webflow.io/",
    category: "Web Design",
  },
  {
    id: 5,
    title: "Kamkm-inc",
    description: "A modern company website for Kamkm-inc.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-09-19%20214015.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkm-inc.khalil.mageed.net/",
    category: "Web Design",
  },
  {
    id: 6,
    title: "Kamkmserve",
    description: "A modern e-commerce platform for web services.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-09-19%20214214.png",
    tags: ["Nextjs", "E-commerce", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkmserve.khalil.mageed.net/",
    category: "Web Design",
  },
  {
    id: 7,
    title: "Tanoshi-game",
    description: "A modern web game for entertainment.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-09-19%20214241.png",
    tags: ["Nextjs", "Web Design", "Game"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://tanoshigame.vercel.app/",
    category: "Web Design",
  },
];
