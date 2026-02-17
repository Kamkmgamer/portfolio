export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string;
  category?: string;
  publishedDate?: Date;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kamkmpdf-reliability",
    title: "HTML: The Reliable Source",
    summary:
      "Why HTML-based documents are the most reliable way to generate PDFs with KamkmPDF.",
    stack: "HTML, CSS, AI Generation, Structured Documents, Open Standards.",
    category: "Architecture",
  },
  {
    slug: "kamkmpdf-scaling",
    title: "Scaling to 6,000 PDFs/Hour",
    summary:
      "Single worker processing 6K documents/hour with optimized architecture.",
    stack: "Next.js, Go, PostgreSQL, Cerebras AI, Puppeteer, UploadThing.",
    category: "Performance",
  },
  {
    slug: "devserve",
    title: "DevServe — SaaS Platform",
    summary: "Built in 35 days. Estimated value $100k+.",
    stack: "React, Node/Express, Prisma, PostgreSQL, Docker, Stripe.",
    category: "SaaS",
  },
  {
    slug: "reducing-friction",
    title: "Reducing Friction",
    summary:
      "Turned vague ideas into a website the client is actually proud of.",
    stack: "Discovery, UX Design, React, Tailwind, Framer Motion.",
    category: "Product Design",
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
