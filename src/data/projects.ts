export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gradient: string; // Tailwind gradient class
  github?: string;
  demo?: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SoftMedics.sd",
    description: "A modern e-learning platform for professionals in Sudan.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/softmedics.png",
    tags: ["Odoo", "Web Design", "Responsive"],
    gradient: "from-purple-500 via-pink-500 to-red-500",
    github: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/softmedics.png",
    demo: "https://softmedics.sd",
    category: "Web Design",
  },
  {
    id: 2,
    title: "Blue Nile Paint",
    description: "Landing page for a paint company with CMS support.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/bluenilepaint.png",
    tags: ["Webflow", "CMS", "Animations"],
    gradient: "from-blue-500 via-green-400 to-teal-400",
    demo: "https://blue-nile-painting-6aeab3.webflow.io/",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Fitness Khalil",
    description: "A fitness site designed for trainers.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/fitnesskhalil.png",
    tags: ["Webflow", "SEO", "Responsive"],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    demo: "http://khalils-example-site.webflow.io/",
    category: "Web Design",
  },
  {
    id: 4,
    title: "Excellence SD",
    description: "My personal portfolio built in Webflow.",
    image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/excellencesd.png",
    tags: ["Webflow", "Portfolio", "Responsive"],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    demo: "http://khalils-website.webflow.io/",
    category: "Web Design",
  },
];
