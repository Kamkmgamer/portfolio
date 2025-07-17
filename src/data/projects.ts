export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gradient: string; // Tailwind gradient class
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SoftMedics.sd",
    description: "A modern e-learning platform for professionals in Sudan.",
    image: "/portfolio/images/projects/softmedics.png",
    tags: ["Odoo", "Web Design", "Responsive"],
    gradient: "from-purple-500 via-pink-500 to-red-500",
    github: "https://github.com/kamkm/softmedics",
    demo: "https://softmedics.sd",
  },
  {
    id: 2,
    title: "Blue Nile Paint",
    description: "Landing page for a paint company with CMS support.",
    image: "/portfolio/images/projects/bluenilepaint.png",
    tags: ["Webflow", "CMS", "Animations"],
    gradient: "from-blue-500 via-green-400 to-teal-400",
    demo: "https://blue-nile-paint.webflow.io",
  },
  {
    id: 3,
    title: "Fitness Khalil",
    description: "A fitness site designed for trainers.",
    image: "/portfolio/images/projects/fitnesskhalil.png",
    tags: ["Webflow", "SEO", "Responsive"],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    demo: "https://fitness-khalil.webflow.io",
  },
  {
    id: 4,
    title: "Excellence SD",
    description: "My personal portfolio built in Webflow.",
    image: "/portfolio/images/projects/excellencesd.png",
    tags: ["Webflow", "Portfolio", "Responsive"],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    demo: "https://khalil.excellence.sd",
  },
];
