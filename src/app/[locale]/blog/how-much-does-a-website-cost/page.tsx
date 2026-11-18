import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Locale } from "@/i18n.config";
import { buildLocalizedAbsoluteUrl, buildLocalizedMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/server";
import { formatPostDate, getBlogPostBySlug } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { ArticleHeader, READING, RelatedPosts } from "@/components/site/article";
import { Callout, ViewAllLink } from "@/components/site/layout";
import { ArrowOut } from "@/components/site/icons";

const articlePath = "/blog/how-much-does-a-website-cost";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata(locale, articlePath, {
    title: "How Much Does a Website Cost? $20 to $10,000 Compared",
    description:
      "See exactly what different website budgets buy. Live demos of $20, $100, $500, $1,000, $5,000, and $10,000 websites for restaurants and ecommerce. Honest comparison with real examples.",
    keywords: [
      "how much does a website cost",
      "website cost",
      "website pricing",
      "how much is a website",
      "website cost 2024",
      "website cost 2025",
      "restaurant website cost",
      "ecommerce website cost",
      "small business website cost",
      "website development cost",
    ],
    openGraph: {
      title: "How Much Does a Website Cost? $20 to $10,000 Compared",
      description:
        "See exactly what different website budgets buy. Live demos comparing $20 to $10,000 websites.",
      type: "article",
      authors: ["Khalil AbdalMageed"],
      section: "Web Development",
      tags: [
        "website cost",
        "website pricing",
        "web development",
        "small business",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "How Much Does a Website Cost? $20 to $10,000 Compared",
      description:
        "See exactly what different website budgets buy. Live demos comparing $20 to $10,000 websites.",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  });
}

const getJsonLd = (locale: Locale) => {
  const articleUrl = buildLocalizedAbsoluteUrl(locale, articlePath);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does a Website Cost? $20 to $10,000 Compared",
    description:
      "See exactly what different website budgets buy. Live demos of $20, $100, $500, $1,000, $5,000, and $10,000 websites for restaurants and ecommerce.",
    author: {
      "@type": "Person",
      name: "Khalil AbdalMageed",
      url: "https://www.khalil.mageed.net",
    },
    publisher: {
      "@type": "Person",
      name: "Khalil AbdalMageed",
      url: "https://www.khalil.mageed.net",
    },
    datePublished: "2026-02-22",
    dateModified: "2026-02-22",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: "https://www.khalil.mageed.net/blog/how-much-does-a-website-cost/og.png",
  };
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website costs range from $20 to $10,000+ depending on features. A basic professional website costs $200-$500. Ecommerce sites start at $500. Custom business websites with advanced features cost $1,000-$5,000. Enterprise solutions start at $10,000.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a restaurant website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Restaurant websites cost $200-$2,000 for most independent restaurants. A basic site with menu and contact info costs $200-$500. Sites with reservations and online ordering cost $1,000-$2,000. Multi-location restaurants need $5,000+.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an ecommerce website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ecommerce websites cost $500-$10,000+. A basic store with checkout costs $500-$1,000. Stores with inventory management and payment processing cost $1,000-$5,000. Custom platforms with advanced features cost $5,000-$10,000+.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest way to get a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheapest options are free Google Business Profile for local businesses, or $20 WordPress hosting for basic sites. However, these have significant limitations. For a real business, budget at least $200-$500 for a professional result.",
      },
    },
    {
      "@type": "Question",
      name: "Why do some websites cost $10,000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "$10,000 websites include custom design, advanced features like real-time ordering, customer accounts, loyalty programs, multi-language support, and payment integrations. You own the technology instead of renting from platforms like Shopify. For high-volume businesses, this investment pays for itself.",
      },
    },
  ],
};

const getBreadcrumbJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: buildLocalizedAbsoluteUrl(locale),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: buildLocalizedAbsoluteUrl(locale, "/blog"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How Much Does a Website Cost?",
      item: buildLocalizedAbsoluteUrl(locale, articlePath),
    },
  ],
});

/* ───────────────────────────────────────────────────────────────────────────
   Copy
   ─────────────────────────────────────────────────────────────────────────── */

type DemoRow = { price: string; url: string; speed: string; mobile: string; verdict: string };
type PriceRange = {
  range: string;
  label: string;
  verdict: string;
  color: "red" | "green" | "gold" | "purple";
  description: string;
};
type Recommendation = { type: string; budget: string; description: string };
type Faq = { question: string; answer: string };

type PageContent = {
  h1: string; intro: string; liveDemos: string;
  quickAnswerLabel: string; quickAnswerQ: string; quickAnswerA: string;
  priceRangesTitle: string;
  priceRanges: PriceRange[];
  restaurantTitle: string; restaurantDesc: string; restaurantCaseLink: string;
  ecommerceTitle: string; ecommerceDesc: string; ecommerceCaseLink: string;
  tableHeaders: { budget: string; speed: string; mobile: string; demo: string };
  openLabel: string;
  recommendationsTitle: string;
  recHeaders: { type: string; budget: string; what: string };
  recommendations: Recommendation[];
  faqTitle: string; faqs: Faq[];
  bottomLineTitle: string; bottomLineDesc: string;
  bottomLineCost: string; bottomLineCostDesc: string;
  bottomLineInv: string; bottomLineInvDesc: string;
};

const en: PageContent = {
  h1: "How Much Does a Website Cost?",
  intro: "Website pricing sounds mysterious because people make it mysterious. It is not. The price changes because the job changes. I built 15 live demos so you can see the difference instead of trusting a pricing table.",
  liveDemos: "15 Live Demos",
  quickAnswerLabel: "Quick Answer",
  quickAnswerQ: "How much does a website cost?",
  quickAnswerA: "Anything from $20 to $10,000+. The honest version: under $200 is usually a compromise, $200-$500 is where a real business website starts, $500+ is where it starts helping you compete, and $1,000+ is where it begins doing actual work for the business.",
  priceRangesTitle: "Website Cost by Budget",
  priceRanges: [
    { range: "$20 - $100", label: "Cheap Placeholder", verdict: "Fine for hobbies, bad for real business", color: "red", description: "This is the range where websites mostly just exist. Slow, limited, and usually embarrassing on mobile." },
    { range: "$200 - $500", label: "Real Business Website", verdict: "Best starting point for most businesses", color: "green", description: "This is where the site stops hurting trust. It loads properly, works on phones, and makes you look real." },
    { range: "$500 - $1,000", label: "Competitive Website", verdict: "For businesses that need to look serious", color: "gold", description: "Better design, stronger UX, more useful features. This is where you stop looking small online." },
    { range: "$1,000 - $2,000", label: "Business System", verdict: "The site starts doing work for you", color: "gold", description: "Now you are paying for workflows, automation, customer handling, and business logic instead of just pages." },
    { range: "$2,000 - $5,000", label: "Growth Stage", verdict: "For teams, multiple locations, and expansion", color: "purple", description: "More locations, more integrations, more moving parts, and more things the site has to handle without breaking." },
    { range: "$5,000 - $10,000+", label: "Custom Platform", verdict: "When the website is part of operations", color: "purple", description: "This is not brochure-site money. This is platform money: custom flows, integrations, and technology the business relies on." },
  ],
  restaurantTitle: "Restaurant Website Cost Comparison", restaurantDesc: "I built 9 live restaurant demos from $20 to $10,000. Open them on your phone, not your desktop. That's where the difference becomes obvious.",
  restaurantCaseLink: "See the full restaurant breakdown",
  ecommerceTitle: "Ecommerce Website Cost Comparison", ecommerceDesc: "I also built 6 ecommerce demos. Try the product pages, try the cart, and pay attention to how fast or frustrating each one feels.",
  ecommerceCaseLink: "See the full ecommerce breakdown",
  tableHeaders: { budget: "Budget", speed: "Speed", mobile: "Mobile", demo: "Demo" },
  openLabel: "Open",
  recommendationsTitle: "So What Should You Actually Budget?",
  recHeaders: { type: "Business Type", budget: "Recommended Budget", what: "What You Get" },
  recommendations: [
    { type: "Small Business", budget: "$200 - $500", description: "A clean, trustworthy website that works properly and stops costing you leads" },
    { type: "Restaurant", budget: "$500 - $1,000", description: "A menu experience that feels good on mobile and can handle reservations or orders properly" },
    { type: "Ecommerce Store", budget: "$500 - $2,000", description: "A store that can actually sell, not just display products and hope people message you" },
    { type: "Multi-Location Business", budget: "$2,000 - $5,000", description: "A setup that can manage complexity without turning into chaos" },
    { type: "High-Volume Online Business", budget: "$5,000 - $10,000+", description: "A custom system built to support operations, scale, and revenue instead of fighting them" },
  ],
  faqTitle: "Frequently Asked Questions",
  faqs: [
    { question: "How much does a restaurant website cost?", answer: "For most independent restaurants, the honest range is $200 to $2,000. Around $200-$500 gets you a real presence. Around $1,000+ gets you stronger ordering, reservations, and smoother customer flows." },
    { question: "How much does an ecommerce website cost?", answer: "Usually $500 and up. Below that, you're often buying something that looks like a store more than something that can operate like one. The more products, payments, and operations you need, the higher the price goes." },
    { question: "What is the cheapest way to get a website?", answer: "If you truly have no budget, start with a Google Business Profile. If you need a real website, don't fool yourself with the absolute cheapest option. Most businesses should start around $200-$500." },
    { question: "Why do some websites cost $10,000?", answer: "Because at that point you're not paying for a few pages. You're paying for custom software, business logic, integrations, performance work, and something the business can actually rely on." },
  ],
  bottomLineTitle: "The Bottom Line", bottomLineDesc: "Most people do not need a $10,000 website. But a lot of businesses need more than a $20 or $100 website. That middle range is where the real decision is.",
  bottomLineCost: "A Cost", bottomLineCostDesc: "Cheap websites usually save money only on paper",
  bottomLineInv: "An Investment", bottomLineInvDesc: "$200+ is where your website starts helping instead of hurting",
};

const ar: PageContent = {
  h1: "كم تكلفة إنشاء موقع إلكتروني؟",
  intro: "كثير من الناس يتكلمون عن أسعار المواقع كأنها شيء غامض. هي ليست غامضة. بنيت 15 عرضاً حياً حتى تشوف بنفسك كل ميزانية بتجيب شنو، من 20$ لحد 10,000$.",
  liveDemos: "15 عرض حي",
  quickAnswerLabel: "إجابة سريعة",
  quickAnswerQ: "كم تكلفة إنشاء موقع إلكتروني؟",
  quickAnswerA: "ممكن من 20$ لحد 10,000$+. لكن إذا عايز الإجابة الصريحة: أي شيء أقل من 200$ غالباً بيكون تنازل، و200$-500$ هي بداية الموقع الحقيقي للأعمال، و500$+ هنا الموقع بيبدأ يساعدك تنافس، و1,000$+ هنا بيبدأ يعمل شغل حقيقي.",
  priceRangesTitle: "تكلفة الموقع حسب الميزانية",
  priceRanges: [
    { range: "20$ - 100$", label: "حضور رخيص", verdict: "مناسب للهوايات، سيئ للأعمال", color: "red", description: "هنا الموقع غالباً بيكون مجرد شيء موجود. بطيء، محدود، وغالباً شكله محرج على الجوال." },
    { range: "200$ - 500$", label: "موقع عمل حقيقي", verdict: "أفضل نقطة بداية لمعظم الناس", color: "green", description: "هنا الموقع بيوقف يكون عبء. يتحمل كويس، يشتغل على الهواتف، ويخلي الناس تحس إنك عمل حقيقي." },
    { range: "500$ - 1,000$", label: "موقع تنافسي", verdict: "للأعمال العايزة تبدو جادة", color: "gold", description: "تصميم أحسن، تجربة أقوى، تفاصيل أكثر، وميزات أفضل. هنا بتبطل تبدو صغير أونلاين." },
    { range: "1,000$ - 2,000$", label: "نظام عمل", verdict: "الموقع بيبدأ يشيل شغل عنك", color: "gold", description: "هنا إنت بتدفع في workflow وأتمتة ومنطق عمل، ما بس في صفحات وشكل." },
    { range: "2,000$ - 5,000$", label: "مرحلة النمو", verdict: "للفرق والمواقع المتعددة والتوسع", color: "purple", description: "الموضوع هنا بيبقى تعقيد: مواقع أكثر، تكاملات أكثر، حركة أكثر، والموقع لازم يستحمل ده كله." },
    { range: "5,000$ - 10,000$+", label: "منصة مخصصة", verdict: "لما الموقع يبقى جزء من التشغيل", color: "purple", description: "ده ما بقى فلوس موقع تعريفي. ده فلوس منصة مخصصة وتكنولوجيا الشغل بيعتمد عليها." },
  ],
  restaurantTitle: "مقارنة تكلفة مواقع المطاعم", restaurantDesc: "بنيت 9 عروض حية لمواقع مطاعم من 20$ لحد 10,000$. افتحها على الجوال، ما على الكمبيوتر. هناك الفرق بيبقى واضح جداً.",
  restaurantCaseLink: "شوف التفصيل الكامل للمطاعم",
  ecommerceTitle: "مقارنة تكلفة مواقع التجارة الإلكترونية", ecommerceDesc: "بنيت كمان 6 عروض ecommerce. جرب المنتجات، السلة، وخلي بالك من إحساس الموقع: سريع ومريح، أم بطيء ومتعب؟",
  ecommerceCaseLink: "شوف التفصيل الكامل للتجارة الإلكترونية",
  tableHeaders: { budget: "الميزانية", speed: "السرعة", mobile: "الجوال", demo: "العرض" },
  openLabel: "افتح",
  recommendationsTitle: "طيب، إنت محتاج ترصد كم؟",
  recHeaders: { type: "نوع العمل", budget: "الميزانية الموصى بها", what: "ما الذي تحصل عليه" },
  recommendations: [
    { type: "عمل صغير", budget: "200$ - 500$", description: "موقع نظيف ومقنع يوقف يضيع عنك العملاء" },
    { type: "مطعم", budget: "500$ - 1,000$", description: "تجربة قائمة وطلب تشتغل كويس على الجوال" },
    { type: "متجر إلكتروني", budget: "500$ - 2,000$", description: "متجر يبيع فعلاً، ما بس يعرض منتجات وينتظر الناس تراسلك" },
    { type: "عمل بمواقع متعددة", budget: "2,000$ - 5,000$", description: "نظام يتحمل التعقيد من غير ما شغلك يتحول لفوضى" },
    { type: "عمل أونلاين عالي الحجم", budget: "5,000$ - 10,000$+", description: "نظام مخصص يخدم العمليات والنمو والإيراد بدل ما يعطلها" },
  ],
  faqTitle: "الأسئلة الشائعة",
  faqs: [
    { question: "كم تكلفة موقع مطعم؟", answer: "لمعظم المطاعم المستقلة، الرقم المنطقي يكون ما بين 200$ و2,000$. حوالي 200$-500$ بيديك حضور حقيقي، وحوالي 1,000$+ بيديك ordering وحجوزات أقوى وتجربة أرتب." },
    { question: "كم تكلفة موقع تجارة إلكترونية؟", answer: "غالباً من 500$ وطالع. أقل من كده في حالات كثيرة بتكون اشتريت حاجة شكلها متجر ما بتشتغل كمتجر بالمعنى الحقيقي. كل ما المنتجات والعمليات والدفع يزيدوا، السعر يزيد." },
    { question: "ما أرخص طريقة للحصول على موقع؟", answer: "إذا إنت فعلاً ما عندك ميزانية، ابدأ بملف Google Business Profile. لكن إذا محتاج موقع حقيقي، ما تضحك على نفسك بأرخص حاجة ممكنة. معظم الأعمال محتاجة تبدأ من 200$-500$." },
    { question: "لماذا تكلف بعض المواقع 10,000$؟", answer: "لأنك في المرحلة دي ما بتدفع في كام صفحة. إنت بتدفع في software مخصص، وlogic عمل، وintegrations، وperformance، وحاجة البزنس يعتمد عليها بجد." },
  ],
  bottomLineTitle: "الخلاصة", bottomLineDesc: "معظم الناس ما محتاجة موقع بـ 10,000$. لكن كمان كثير من الناس محتاجة حاجة أفضل من موقع 20$ أو 100$. ده هو الكلام الحقيقي.",
  bottomLineCost: "تكلفة", bottomLineCostDesc: "المواقع الرخيصة غالباً بتوفر فلوس بس على الورق",
  bottomLineInv: "استثمار", bottomLineInvDesc: "من 200$ وطالع الموقع بيبدأ يساعدك بدل ما يضرك",
};

const restaurantDemos: DemoRow[] = [
  { price: "$20", url: "https://20-dollar-restaurant.vercel.app", speed: "5+ sec", mobile: "Broken", verdict: "skip" },
  { price: "$100", url: "https://100-dollar-restaurant.vercel.app", speed: "3-4 sec", mobile: "Partial", verdict: "skip" },
  { price: "$200", url: "https://200-dollar-restaurant.vercel.app", speed: "1-2 sec", mobile: "Perfect", verdict: "good" },
  { price: "$500", url: "https://500-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$700", url: "https://700-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$1,000", url: "https://1000-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$2,000", url: "https://2000-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$5,000", url: "https://5000-dollar-restaurant.vercel.app", speed: "<500ms", mobile: "Perfect", verdict: "enterprise" },
  { price: "$10,000", url: "https://10000-dollar-restaurant.vercel.app", speed: "<300ms", mobile: "App-like", verdict: "enterprise" },
];

const ecommerceDemos: DemoRow[] = [
  { price: "$20", url: "https://20-dollar-ecommerce-app.vercel.app", speed: "5+ sec", mobile: "Broken", verdict: "skip" },
  { price: "$100", url: "https://100-dollar-ecommerce-app.vercel.app", speed: "3-4 sec", mobile: "Partial", verdict: "skip" },
  { price: "$500", url: "https://500-dollar-ecommerce-app.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$1,000", url: "https://1000-dollar-ecommerce-app.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$5,000", url: "https://5000-dollar-ecommerce-app.vercel.app", speed: "<500ms", mobile: "Perfect", verdict: "enterprise" },
  { price: "$10,000", url: "https://10000-dollar-ecommerce-app.vercel.app", speed: "<300ms", mobile: "App-like", verdict: "enterprise" },
];

/* ───────────────────────────────────────────────────────────────────────────
   Building blocks
   ─────────────────────────────────────────────────────────────────────────── */

const rangeTone: Record<PriceRange["color"], { text: string; dot: string }> = {
  red: { text: "text-danger", dot: "bg-danger" },
  green: { text: "text-success", dot: "bg-success" },
  gold: { text: "text-accent", dot: "bg-accent" },
  purple: { text: "text-ink", dot: "bg-ink" },
};

/** Article section: heading, optional intro, then structured content. */
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="reveal mt-16 scroll-mt-[calc(var(--nav-h)+2rem)] md:mt-20">
      <h2
        id={id}
        className="text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink rtl:leading-[1.5] rtl:tracking-normal"
      >
        {title}
      </h2>
      {description && <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{description}</p>}
      {children}
    </section>
  );
}

function DemoTable({
  caption,
  demos,
  headers,
  openLabel,
}: {
  caption: string;
  demos: DemoRow[];
  headers: PageContent["tableHeaders"];
  openLabel: string;
}) {
  const slow = (speed: string) => speed.includes("5+") || speed.includes("3-4");
  const mobileTone = (mobile: string) =>
    mobile === "Broken" ? "font-medium text-danger" : mobile === "Partial" ? "text-muted" : "font-medium text-success";

  return (
    // `relative` keeps the absolutely positioned sr-only labels inside the scroll box.
    <div className="relative mt-8 overflow-x-auto rounded-[1.125rem] border border-line bg-card">
      <table className="data-table min-w-[30rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{headers.budget}</th>
            <th scope="col">{headers.speed}</th>
            <th scope="col">{headers.mobile}</th>
            <th scope="col">{headers.demo}</th>
          </tr>
        </thead>
        <tbody>
          {demos.map((demo) => (
            <tr key={demo.url}>
              <th
                scope="row"
                className="border-b border-line bg-card font-semibold text-ink tabular [tr:last-child>&]:border-b-0"
              >
                {demo.price}
              </th>
              <td className={cn("whitespace-nowrap tabular font-medium", slow(demo.speed) ? "text-danger" : "text-success")}>
                {/* Demo data is English-only; <bdi> keeps "5+ sec" from flipping in RTL. */}
                <bdi>{demo.speed}</bdi>
              </td>
              <td className={mobileTone(demo.mobile)}>
                <bdi>{demo.mobile}</bdi>
              </td>
              <td>
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group link-quiet text-[0.9375rem]"
                >
                  {openLabel}
                  <span className="sr-only"> {demo.price}</span>
                  <ArrowOut className="size-3.5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Page
   ─────────────────────────────────────────────────────────────────────────── */

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = locale === "ar" ? ar : en;
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug("how-much-does-a-website-cost", locale);
  const jsonLd = getJsonLd(locale);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article>
        <ArticleHeader
          backHref={`/${locale}/blog`}
          backLabel={dict.blog.allArticles}
          title={c.h1}
          lead={c.intro}
          meta={[
            post?.author,
            post && (
              <time key="d" dateTime="2026-02-22">
                {formatPostDate(post.publishedDate, locale)}
              </time>
            ),
            post && `${post.readTime} ${dict.blog.minRead}`,
            c.liveDemos,
          ]}
        />

        <div className="container-site">
          <div className={READING}>
            <Callout title={c.quickAnswerLabel}>
              <p>
                <strong className="font-semibold text-ink">{c.quickAnswerQ}</strong> {c.quickAnswerA}
              </p>
            </Callout>

            <Section id="price-ranges" title={c.priceRangesTitle}>
              <ol className="mt-8 border-t border-line">
                {c.priceRanges.map((tier) => {
                  const tone = rangeTone[tier.color];
                  return (
                    <li
                      key={tier.range}
                      className="grid gap-x-8 gap-y-3 border-b border-line py-6 sm:grid-cols-[12rem_minmax(0,1fr)]"
                    >
                      <div>
                        <p className="whitespace-nowrap text-xl font-semibold tracking-[-0.02em] text-ink tabular rtl:tracking-normal">
                          {tier.range}
                        </p>
                        <p className="mt-1 text-sm text-muted">{tier.label}</p>
                      </div>
                      <div>
                        <p className={cn("flex items-center gap-2 text-sm font-medium", tone.text)}>
                          <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", tone.dot)} />
                          {tier.verdict}
                        </p>
                        <p className="mt-2 leading-relaxed text-ink-2">{tier.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Section>

            <Section id="restaurant-demos" title={c.restaurantTitle} description={c.restaurantDesc}>
              <DemoTable
                caption={c.restaurantTitle}
                demos={restaurantDemos}
                headers={c.tableHeaders}
                openLabel={c.openLabel}
              />
              <p className="mt-6">
                <ViewAllLink href={`/${locale}/case-studies/restaurant-websites-tiers`}>{c.restaurantCaseLink}</ViewAllLink>
              </p>
            </Section>

            <Section id="ecommerce-demos" title={c.ecommerceTitle} description={c.ecommerceDesc}>
              <DemoTable
                caption={c.ecommerceTitle}
                demos={ecommerceDemos}
                headers={c.tableHeaders}
                openLabel={c.openLabel}
              />
              <p className="mt-6">
                <ViewAllLink href={`/${locale}/case-studies/ecommerce-websites-tiers`}>{c.ecommerceCaseLink}</ViewAllLink>
              </p>
            </Section>

            <Section id="recommendations" title={c.recommendationsTitle}>
              <div className="mt-8">
                <div
                  aria-hidden="true"
                  className="hidden gap-x-6 border-b border-line-strong pb-3 text-sm font-medium text-muted sm:grid sm:grid-cols-[minmax(0,1fr)_10.5rem_minmax(0,1.5fr)]"
                >
                  <span>{c.recHeaders.type}</span>
                  <span>{c.recHeaders.budget}</span>
                  <span>{c.recHeaders.what}</span>
                </div>
                <dl className="border-t border-line sm:border-t-0">
                  {c.recommendations.map((rec) => (
                    <div
                      key={rec.type}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 border-b border-line py-5 sm:grid-cols-[minmax(0,1fr)_10.5rem_minmax(0,1.5fr)]"
                    >
                      <dt className="font-semibold text-ink">{rec.type}</dt>
                      <dd className="whitespace-nowrap text-end font-medium text-accent tabular sm:text-start">
                        {rec.budget}
                      </dd>
                      <dd className="col-span-2 text-[0.9375rem] leading-relaxed text-ink-2 sm:col-span-1">
                        {rec.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Section>

            <Section id="faq" title={c.faqTitle}>
              <div className="mt-8 border-t border-line">
                {c.faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-line py-6">
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink rtl:tracking-normal">
                      {faq.question}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="bottom-line" title={c.bottomLineTitle} description={c.bottomLineDesc}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.125rem] border border-[color-mix(in_oklab,var(--danger)_24%,transparent)] bg-danger-soft p-5 md:p-6">
                  <p className="flex items-center gap-2 font-semibold text-danger">
                    <X aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
                    {c.bottomLineCost}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.bottomLineCostDesc}</p>
                </div>
                <div className="rounded-[1.125rem] border border-[color-mix(in_oklab,var(--success)_24%,transparent)] bg-success-soft p-5 md:p-6">
                  <p className="flex items-center gap-2 font-semibold text-success">
                    <Check aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
                    {c.bottomLineInv}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.bottomLineInvDesc}</p>
                </div>
              </div>
            </Section>
          </div>
        </div>

        <RelatedPosts slug="how-much-does-a-website-cost" locale={locale} dict={dict} />
      </article>
    </>
  );
}
