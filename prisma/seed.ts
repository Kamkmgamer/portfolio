import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Data from src/data/projects.ts
const projectsData = [
  {
    title: "kamkmPDF",
    description: "A modern PDF generator using AI.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Kamkm-PDF.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkmpdf.netlify.app/",
    category: "Web Design",
  },
  {
    title: "SoftMedics.sd",
    description: "A modern e-learning platform for professionals in Sudan.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/image.png",
    tags: ["Odoo", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://softmedics.sd",
    category: "Web Design",
  },
  {
    title: "Blue Nile Paint",
    description: "Landing page for a paint company with CMS support.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-08-04%20024500.png",
    tags: ["Webflow", "CMS", "Animations"],
    gradient: "from-blue-500 via-green-400 to-teal-400",
    demo: "https://blue-nile-painting-6aeab3.webflow.io/",
    category: "Web Design",
  },
  {
    title: "Fitness Khalil",
    description: "A fitness site designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-08-04%20024232.png",
    tags: ["Webflow", "SEO", "Responsive"],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    demo: "http://khalils-example-site.webflow.io/",
    category: "Web Design",
  },
  {
    title: "Kamkm-inc",
    description: "A modern company website for Kamkm-inc.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-09-19%20214015.png",
    tags: ["Nextjs", "Web Design", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkm-inc.khalil.mageed.net/",
    category: "Web Design",
  },
  {
    title: "Kamkmserve",
    description: "A modern e-commerce platform for web services.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/Screenshot%202025-09-19%20214214.png",
    tags: ["Nextjs", "E-commerce", "Responsive"],
    gradient: "from-cyan-500 via-emerald-500 to-red-500",
    demo: "https://kamkmserve.khalil.mageed.net/",
    category: "Web Design",
  },
  {
    title: "The Oracle's Chamber",
    description:
      "A fantasy-themed anti-sycophancy chatbot with a two-agent AI system that ensures honest, substantive responses.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/projects/sycophancybot.png",
    tags: ["Nextjs", "TypeScript", "AI", "Chatbot", "T3 Stack"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://sycophancybot.netlify.app",
    category: "Web Design",
  },
];

// Data from src/data/skills.ts
const skillsData = [
  {
    name: "Next.js",
    icon: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/nextjs-svgrepo-com.svg",
    level: 90,
    years: 5,
    color: "from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: 85,
    years: 5,
    color:
      "from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-gold))]",
  },
  {
    name: "Tailwind CSS",
    icon: "https://www.svgrepo.com/show/374118/tailwind.svg",
    level: 95,
    years: 5,
    color: "from-[hsl(var(--accent-bronze))] to-black",
  },
  {
    name: "Odoo",
    icon: "https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg",
    level: 80,
    years: 4,
    color: "from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]",
  },
  {
    name: "Webflow",
    icon: "https://www.svgrepo.com/show/331642/webflow.svg",
    level: 70,
    years: 1,
    color:
      "from-[hsl(var(--accent-bronze))] via-[hsl(var(--accent-gold))] to-[hsl(var(--accent-champagne))]",
  },
  {
    name: "WordPress",
    icon: "https://www.svgrepo.com/show/475696/wordpress-color.svg",
    level: 75,
    years: 6,
    color:
      "from-black via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))]",
  },
];

// Data from src/data/demos.ts
const demosData = [
  {
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
    title: "cafe website Demo",
    description: "A cafe website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/cafe%20website%20Demo.png",
    tags: ["Nextjs", "TypeScript", "AI", "Chatbot", "T3 Stack"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://cafe-restaurant-demo-alpha.vercel.app/",
    category: "Web Design",
  },
  {
    title: "Bakery website Demo",
    description: "A bakery website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Bakery%20website%20Demo.png",
    tags: ["Nextjs", "TypeScript"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://the-rustic-oven-zeta.vercel.app/",
    category: "Web Design",
  },
  {
    title: "Enterprise website Demo",
    description: "A enterprise website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Enterprise%20website%20Demo.png",
    tags: ["Nextjs", "TypeScript"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://nexus-pro-rho.vercel.app/",
    category: "Web Design",
  },
  {
    title: "Luxury website Demo",
    description: "A luxury website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Luxury%20website%20Demo..png",
    tags: ["Nextjs", "TypeScript"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://nexus-pro-nurs.vercel.app/",
    category: "Web Design",
  },
  {
    title: "Wedding website Demo",
    description: "A wedding website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Wedding%20websiteDemo.png",
    tags: ["Nextjs", "TypeScript"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://emma-james.vercel.app/",
    category: "Web Design",
  },
  {
    title: "Atelier website Demo",
    description: "A atelier website designed for trainers.",
    image:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/Demos/Atelier%20website%20Demo.png",
    tags: ["Nextjs", "TypeScript"],
    gradient: "from-amber-500 via-purple-500 to-indigo-500",
    demo: "https://atelier-demo-website.vercel.app/",
    category: "Web Design",
  },
];

// Data from src/data/research.ts
const researchData = [
  {
    slug: "analysis-of-undefined-behavior-in-c-increment-operators",
    title:
      "Analysis of Undefined Behavior in C: The Pedagogical Issues of Using Multiple Pre- and Post-Increment Operators Across Compilers",
    abstract:
      "This paper provides an in-depth analysis of why expressions in C that combine multiple pre- and post-increment operators on a single variable exhibit unpredictable and compiler-dependent behavior. The analysis shows that this phenomenon is a direct consequence of unsequenced modifications, a specific form of undefined behavior sanctioned by the C language standard. The historical rationale behind this design choice, intended to enable aggressive compiler optimizations, is explored. Through case studies of divergent compiler outcomes, the practical risks of relying on such expressions are illustrated. The paper concludes that these expressions are pedagogically unsound and should be discouraged in foundational C curricula in favor of clarity, defensive coding, and an understanding of the language's formal rules.",
    authors: ["Khalil Abd AlMageed Khalil Mohammed"],
    year: 2025,
    image: "https://cdn.worldvectorlogo.com/logos/c-1.svg",
    tags: ["C", "Undefined Behavior", "Education", "Compilers"],
    pdf: "/paper/C Increment Undefined Behavior Analysis_.pdf",
  },
];

// Data from src/data/contactMethods.ts
const contactMethodsData = [
  {
    title: "Email",
    description: " ",
    href: "mailto:contact@khalil.mageed.net",
    iconLight: "https://www.svgrepo.com/show/488179/email.svg",
    iconDark:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/email-svgrepo-com%20(2).svg",
    glowColor: "rgba(255, 0, 0)",
    external: false,
  },
  {
    title: "LinkedIn",
    description: " ",
    href: "https://www.linkedin.com/in/kamkm-gamer",
    iconLight: "https://www.svgrepo.com/show/512419/linkedin-161.svg",
    iconDark:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/linkedin-161-svgrepo-com.svg",
    glowColor: "rgba(10, 102, 194)",
    external: true,
  },
  {
    title: "GitHub",
    description: " ",
    href: "https://github.com/Kamkmgamer",
    iconLight:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/github-142-svgrepo-com.svg",
    iconDark:
      "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/github-142-svgrepo-com%20(2).svg",
    glowColor: "rgba(100, 0, 100)",
    external: true,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.demo.deleteMany();
  await prisma.research.deleteMany();
  await prisma.contactMethod.deleteMany();

  // Seed Projects
  console.log("📁 Seeding projects...");
  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log(`   ✅ Created ${projectsData.length} projects`);

  // Seed Skills
  console.log("🛠️  Seeding skills...");
  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`   ✅ Created ${skillsData.length} skills`);

  // Seed Demos
  console.log("🎨 Seeding demos...");
  for (const demo of demosData) {
    await prisma.demo.create({ data: demo });
  }
  console.log(`   ✅ Created ${demosData.length} demos`);

  // Seed Research
  console.log("📚 Seeding research papers...");
  for (const research of researchData) {
    await prisma.research.create({ data: research });
  }
  console.log(`   ✅ Created ${researchData.length} research papers`);

  // Seed Contact Methods
  console.log("📞 Seeding contact methods...");
  for (const contact of contactMethodsData) {
    await prisma.contactMethod.create({ data: contact });
  }
  console.log(`   ✅ Created ${contactMethodsData.length} contact methods`);

  console.log("");
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
