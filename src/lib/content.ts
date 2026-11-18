export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string;
  category?: string;
  publishedDate?: Date;
  /** Two or three short, scannable proof points shown on cards. */
  highlights?: string[];
};

const caseStudiesEn: CaseStudy[] = [
  {
    slug: "kamkmpdf-reliability",
    title: "HTML: The Reliable Source",
    summary:
      "Why HTML-based documents are the most reliable way to generate PDFs with KamkmPDF.",
    stack: "HTML, CSS, AI Generation, Structured Documents, Open Standards.",
    category: "Architecture",
    highlights: ["HTML-first","Future-proof","Source available"],
  },
  {
    slug: "kamkmpdf-scaling",
    title: "Scaling to 6,000 PDFs/Hour",
    summary:
      "Single worker processing 6K documents/hour with optimized architecture.",
    stack: "Next.js, Go, PostgreSQL, Cerebras AI, Puppeteer, UploadThing.",
    category: "Performance",
    highlights: ["6,000 PDFs/hr","<2s latency","Single worker"],
  },
  {
    slug: "devserve",
    title: "DevServe — SaaS Platform",
    summary: "Built in 35 days. Estimated value $100k+.",
    stack: "React, Node/Express, Prisma, PostgreSQL, Docker, Stripe.",
    category: "SaaS",
    highlights: ["35 days","$100k+ value","Solo build"],
  },
  {
    slug: "reducing-friction",
    title: "Reducing Friction",
    summary:
      "Turned vague ideas into a website the client is actually proud of.",
    stack: "Discovery, UX Design, React, Tailwind, Framer Motion.",
    category: "Product Design",
    highlights: ["Discovery","UX design","Client-approved"],
  },
  {
    slug: "restaurant-websites-tiers",
    title: "$20 to $10,000 Websites",
    summary:
      "Built every tier from $20 to $10,000 to show exactly what your money buys — no technical jargon.",
    stack: "React, Next.js, Tailwind, Framer Motion, Real-time Systems.",
    category: "Education",
    highlights: ["9 tiers","Live demos","Transparent pricing"],
  },
  {
    slug: "ecommerce-websites-tiers",
    title: "$20 to $10,000 Ecommerce",
    summary:
      "Every ecommerce tier from $20 to $10,000 — see what your money buys for online stores.",
    stack: "React, Next.js, Tailwind, Stripe, AI/ML, Real-time Systems.",
    category: "Education",
    highlights: ["6 tiers","Live demos","Own your tech"],
  },
];

const caseStudiesAr: CaseStudy[] = [
  {
    slug: "kamkmpdf-reliability",
    title: "HTML: المصدر الموثوق",
    summary: "PDF كخرج. HTML كمصدر. هذا هو الفرق.",
    stack: "HTML، CSS، ذكاء اصطناعي، مستندات مهيكلة، معايير مفتوحة.",
    category: "بنية المستندات",
    highlights: ["HTML أولاً","مقاوم للتقادم","الكود متاح"],
  },
  {
    slug: "kamkmpdf-scaling",
    title: "6,000 PDF في الساعة",
    summary: "عامل واحد. خادم واحد. هكذا وصلنا لهذا الرقم.",
    stack: "Next.js، Go، PostgreSQL، Cerebras AI، Puppeteer، UploadThing.",
    category: "الأداء",
    highlights: ["6,000 ملف/ساعة","استجابة أقل من ثانيتين","عامل واحد"],
  },
  {
    slug: "devserve",
    title: "DevServe — منصة SaaS",
    summary: "مبنية في 35 يوماً. قيمة مُقدَّرة تتجاوز $100k.",
    stack: "React، Node/Express، Prisma، PostgreSQL، Docker، Stripe.",
    category: "SaaS",
    highlights: ["35 يوماً","قيمة تتجاوز $100k","بناء فردي"],
  },
  {
    slug: "reducing-friction",
    title: "تقليل الاحتكاك",
    summary: "منتج جيد، موقع ضعيف. هكذا أصلحنا ذلك.",
    stack: "Discovery، تصميم UX، React، Tailwind، Framer Motion.",
    category: "تصميم المنتج",
    highlights: ["الاستكشاف","تصميم UX","رضا العميل"],
  },
  {
    slug: "restaurant-websites-tiers",
    title: "مواقع من $20 إلى $10,000",
    summary:
      "بنيت كل مستوى من $20 إلى $10,000 لأريك بالضبط ما يشتريه مالك — بلا مصطلحات تقنية.",
    stack: "React، Next.js، Tailwind، Framer Motion، أنظمة فورية.",
    category: "تعليمي",
    highlights: ["9 مستويات","عروض حية","أسعار شفافة"],
  },
  {
    slug: "ecommerce-websites-tiers",
    title: "متاجر إلكترونية من $20 إلى $10,000",
    summary:
      "كل مستوى من $20 إلى $10,000 للمتاجر الإلكترونية — شاهد ما يشتريه مالك.",
    stack: "React، Next.js، Tailwind، Stripe، AI/ML، أنظمة فورية.",
    category: "تعليمي",
    highlights: ["6 مستويات","عروض حية","تقنيتك ملكك"],
  },
];

export const caseStudies = caseStudiesEn;

export function getCaseStudiesByLocale(locale: string): CaseStudy[] {
  return locale === "ar" ? caseStudiesAr : caseStudiesEn;
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesEn;
}

export function getCaseStudyBySlug(slug: string, locale: string = "en"): CaseStudy | undefined {
  return getCaseStudiesByLocale(locale).find((study) => study.slug === slug);
}

/** The case study that follows `slug` in the index (wraps around). */
export function getNextCaseStudy(slug: string, locale: string = "en"): CaseStudy {
  const list = getCaseStudiesByLocale(locale);
  const i = list.findIndex((study) => study.slug === slug);
  return list[(i + 1) % list.length];
}
