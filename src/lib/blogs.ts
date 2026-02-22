import { Locale } from "@/i18n.config";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage?: string;
  publishedDate: Date;
  readTime: number;
};

const blogPostsEn: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost",
    title: "How Much Does a Website Cost?",
    summary:
      "Complete guide to website pricing with 15 live demos. Compare $20 to $10,000 websites for restaurants and ecommerce. See exactly what each budget buys.",
    category: "Pricing Guide",
    tags: ["website cost", "website pricing", "how much is a website", "restaurant website", "ecommerce website"],
    author: "Khalil AbdalMageed",
    publishedDate: new Date("2026-02-22"),
    readTime: 12,
  },
  {
    slug: "why-not-to-buy-cheap-websites",
    title: "Why a $20 Website Will Cost You Thousands in Lost Business",
    summary:
      "A $20 website doesn't just look cheap - it actively repels customers. Here's what cheap websites really cost your business and why they hurt more than help.",
    category: "Business",
    tags: ["websites", "business", "cheap-websites", "roi", "trust"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 8,
  },
  {
    slug: "what-100-dollar-website-gets-you",
    title: "What a $100 Website Actually Gets You",
    summary:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown of what that budget delivers - nothing more, nothing less.",
    category: "Business",
    tags: ["websites", "business", "budget", "expectations", "scaling"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 7,
  },
  {
    slug: "what-a-professional-website-costs",
    title: "What a Professional Website Actually Costs ($200-$500)",
    summary:
      "The $200-$500 range is where websites stop being costs and start being investments. Here's what each budget delivers, with live demos to prove it.",
    category: "Business",
    tags: ["websites", "business", "investment", "professional", "comparison"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 9,
  },
];

const blogPostsAr: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost",
    title: "كم تكلفة إنشاء موقع إلكتروني؟",
    summary:
      "دليل شامل لأسعار المواقع مع 15 عرضاً توضيحياً حياً. قارن بين مواقع بـ 20$ و10,000$ للمطاعم والتجارة الإلكترونية. اكتشف بالضبط ما يشتريه كل ميزانية.",
    category: "دليل الأسعار",
    tags: ["تكلفة الموقع", "أسعار المواقع", "كم تكلفة الموقع", "موقع مطعم", "موقع تجارة إلكترونية"],
    author: "خليل عبد المجيد",
    publishedDate: new Date("2026-02-22"),
    readTime: 12,
  },
  {
    slug: "why-not-to-buy-cheap-websites",
    title: "لماذا سيكلفك الموقع بـ 20$ آلاف الدولارات من العملاء الضائعين",
    summary:
      "الموقع بـ 20$ لا يبدو رخيصاً فحسب — بل يطرد العملاء بشكل فعلي. إليك ما تكلفه المواقع الرخيصة حقاً على عملك ولماذا تضر أكثر مما تنفع.",
    category: "أعمال",
    tags: ["مواقع", "أعمال", "مواقع رخيصة", "عائد الاستثمار", "ثقة"],
    author: "مطور ويب",
    publishedDate: new Date("2026-02-21"),
    readTime: 8,
  },
  {
    slug: "what-100-dollar-website-gets-you",
    title: "ماذا تحصل فعلاً مقابل موقع بـ 100$؟",
    summary:
      "الموقع بـ 100$ يعمل. ليس معطلاً. لكنه لا يفعل الكثير. هنا التقييم الصادق لما يقدمه هذا الميزانية — لا أكثر ولا أقل.",
    category: "أعمال",
    tags: ["مواقع", "أعمال", "ميزانية", "توقعات", "توسع"],
    author: "مطور ويب",
    publishedDate: new Date("2026-02-21"),
    readTime: 7,
  },
  {
    slug: "what-a-professional-website-costs",
    title: "ما التكلفة الحقيقية لموقع احترافي؟ (200$ - 500$)",
    summary:
      "نطاق 200$-500$ هو حيث تتوقف المواقع عن كونها تكاليف وتصبح استثمارات. إليك ما يقدمه كل ميزانية مع عروض حية تثبت ذلك.",
    category: "أعمال",
    tags: ["مواقع", "أعمال", "استثمار", "احترافي", "مقارنة"],
    author: "مطور ويب",
    publishedDate: new Date("2026-02-21"),
    readTime: 9,
  },
];

export function getBlogPostsByLocale(locale: Locale): BlogPost[] {
  return locale === "ar" ? blogPostsAr : blogPostsEn;
}

export function getBlogPostBySlug(slug: string, locale: Locale = "en"): BlogPost | undefined {
  return getBlogPostsByLocale(locale).find((post) => post.slug === slug);
}

// Keep backward-compatible default export
export const blogPosts = blogPostsEn;

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsEn;
}
