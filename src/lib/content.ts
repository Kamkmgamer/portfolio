export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string;
  category?: string;
  publishedDate?: Date;
};

const caseStudiesEn: CaseStudy[] = [
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
  {
    slug: "restaurant-websites-tiers",
    title: "$20 to $10,000 Websites",
    summary:
      "Built every tier from $20 to $10,000 to show exactly what your money buys — no technical jargon.",
    stack: "React, Next.js, Tailwind, Framer Motion, Real-time Systems.",
    category: "Education",
  },
  {
    slug: "ecommerce-websites-tiers",
    title: "$20 to $10,000 Ecommerce",
    summary:
      "Every ecommerce tier from $20 to $10,000 — see what your money buys for online stores.",
    stack: "React, Next.js, Tailwind, Stripe, AI/ML, Real-time Systems.",
    category: "Education",
  },
];

const caseStudiesAr: CaseStudy[] = [
  {
    slug: "kamkmpdf-reliability",
    title: "HTML: المصدر الموثوق",
    summary: "PDF كخرج. HTML كمصدر. هذا هو الفرق.",
    stack: "HTML، CSS، ذكاء اصطناعي، مستندات مهيكلة، معايير مفتوحة.",
    category: "بنية المستندات",
  },
  {
    slug: "kamkmpdf-scaling",
    title: "6,000 PDF في الساعة",
    summary: "عامل واحد. خادم واحد. هكذا وصلنا لهذا الرقم.",
    stack: "Next.js، Go، PostgreSQL، Cerebras AI، Puppeteer، UploadThing.",
    category: "الأداء",
  },
  {
    slug: "devserve",
    title: "DevServe — منصة SaaS",
    summary: "مبنية في 35 يوماً. قيمة مُقدَّرة تتجاوز $100k.",
    stack: "React، Node/Express، Prisma، PostgreSQL، Docker، Stripe.",
    category: "SaaS",
  },
  {
    slug: "reducing-friction",
    title: "تقليل الاحتكاك",
    summary: "منتج جيد، موقع ضعيف. هكذا أصلحنا ذلك.",
    stack: "Discovery، تصميم UX، React، Tailwind، Framer Motion.",
    category: "تصميم المنتج",
  },
  {
    slug: "restaurant-websites-tiers",
    title: "مواقع من $20 إلى $10,000",
    summary:
      "بنيت كل مستوى من $20 إلى $10,000 لأريك بالضبط ما يشتريه مالك — بلا مصطلحات تقنية.",
    stack: "React، Next.js، Tailwind، Framer Motion، أنظمة فورية.",
    category: "تعليمي",
  },
  {
    slug: "ecommerce-websites-tiers",
    title: "متاجر إلكترونية من $20 إلى $10,000",
    summary:
      "كل مستوى من $20 إلى $10,000 للمتاجر الإلكترونية — شاهد ما يشتريه مالك.",
    stack: "React، Next.js، Tailwind، Stripe، AI/ML، أنظمة فورية.",
    category: "تعليمي",
  },
];

export const caseStudies = caseStudiesEn;

export function getCaseStudiesByLocale(locale: string): CaseStudy[] {
  return locale === "ar" ? caseStudiesAr : caseStudiesEn;
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesEn;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesEn.find((study) => study.slug === slug);
}
