export interface Demo {
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

export const demos: Demo[] = [
  {
    id: 1,
    title: "Clothing website Demo",
    description: "Landing page for a clothing website with CMS support.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Clothing%20website%20Demo.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-blue-500 via-green-400 to-teal-400",
    demo: "https://niccolo-pasqualetti-demo.vercel.app/",
    category: "Web Design",
  },
  {
    id: 2,
    title: "Gym website Demo",
    description: "A modern gym demo.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Gym%20website%20Demo.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://gym-fitness-center-master.vercel.app/",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Salon website Demo",
    description: "A modern salon demo.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Salon%20website%20Demo.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://beauty-salon-demo-ten.vercel.app/",
    category: "Web Design",
  },

  {
    id: 4,
    title: "Villa website Demo",
    description: "A villa website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Villa%20website%20Demo.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    demo: "https://villa-vittoria-demo.vercel.app/",
    category: "Web Design",
  },
  {
    id: 5,
    title: "coffee website Demo",
    description: "A coffee website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/coffee%20website%20Demo.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://coffee-shop-specialty-coffee.vercel.app/",
    category: "Web Design",
  },
  {
    id: 6,
    title: "Real Estate website Demo",
    description: "A modern e-commerce platform for web services.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Real%20Estate%20website%20Demo.png",
    tags: ["Nextjs", "E-commerce", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://real-estate-agency-snowy.vercel.app/",
    category: "Web Design",
  },
  {
    id: 7,
    title: "cafe website Demo",
    description: "A cafe website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/cafe%20website%20Demo.png",
    tags: ["Nextjs", "TypeScript", "AI", "Chatbot", "T3 Stack"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://cafe-restaurant-demo-alpha.vercel.app/",
    category: "Web Design",
  },
];
