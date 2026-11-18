import type { ReactNode } from "react";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { formatPostDate, getBlogPostBySlug } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { ArticleHeader, READING, RelatedPosts } from "@/components/site/article";
import { Callout, CheckList, InfoCard } from "@/components/site/layout";
import { ButtonLink } from "@/components/site/Button";
import { ArrowForward, ArrowOut } from "@/components/site/icons";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a Professional Website Costs in 2026",
  description: "See what's included in $500, $1,000, and $2,000+ professional websites.",
  author: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  publisher: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  datePublished: "2026-02-21",
  dateModified: "2026-02-21",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a $500 professional website include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A $500 professional website includes custom design, mobile optimization, fast loading speeds (under 1 second), working contact forms, and basic SEO setup.",
      },
    },
    {
      "@type": "Question",
      name: "What do you get with a $1,000 website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A $1,000 website adds advanced features like booking systems, custom animations, enhanced SEO, and more sophisticated design tailored to your brand.",
      },
    },
    {
      "@type": "Question",
      name: "When do I need a $2,000+ website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need $2,000+ when you have multiple locations, need ecommerce with inventory management, require customer accounts, or need custom integrations.",
      },
    },
  ],
};

type Comparison = { feature: string; two: string; five: string };
type ChangedItem = { title: string; description: string };

type PageContent = {
  h1a: string; h1b: string; intro: string;
  badge1: string; badge2: string; badge3: string;
  demosSection: { title: string; desc: string; tier200: string; tier500: string };
  btn200rest: string; btn500rest: string; btn500ecom: string;
  changedSection: { title: string; titleItalic: string; desc: string };
  whatChanged: ChangedItem[];
  whyCostMore: string; whyCostMoreBody: string;
  comparisonSection: { title: string; titleItalic: string; desc: string };
  tier200title: string; tier200sub: string; tier200footer: string;
  tier500title: string; tier500sub: string; tier500footer: string;
  twoHundredGets: string[]; fiveHundredGets: string[];
  tableFeature: string; tableTwo: string; tableFive: string;
  comparison: Comparison[];
  verdictSection: { title: string; titleItalic: string; desc: string };
  stopAt200title: string; stopAt200list: string[]; stopAt200footer: string;
  stretchTo500title: string; stretchTo500list: string[]; stretchTo500footer: string;
  nextSection: { title: string; titleItalic: string };
  tier1000title: string; tier1000desc: string;
  caseStudiesTitle: string; caseStudiesDesc: string;
  r1000link: string; e1000link: string; rCaseLink: string; eCaseLink: string;
  cheaperSection: { title: string; titleItalic: string; desc: string };
  cheapBlog1title: string; cheapBlog1desc: string;
  cheapBlog2title: string; cheapBlog2desc: string;
  readPost: string;
  bottomLine: { title: string; desc: string; two: string; five: string; footer: string };
  ctaSection: { title: string; titleItalic: string; desc: string; startBtn: string; backBtn: string };
};

const en: PageContent = {
  h1a: "What a Professional Website", h1b: "Actually Costs",
  intro: "Cheap websites are everywhere. After you see enough of them, the pattern becomes obvious: low price, weak result, then you pay again later. This is for the point where you stop asking how cheap a website can be and start asking what a proper one actually costs.",
  badge1: "Live Demos", badge2: "Honest Comparison", badge3: "Clear Guidance",
  demosSection: { title: "See the Difference Yourself", desc: "I built demos at the useful starting tiers. Open them on your phone, click around, and pay attention to how much less friction there is compared to the cheap versions.", tier200: "$200 Tier", tier500: "$500 Tier" },
  btn200rest: "$200 Restaurant", btn500rest: "$500 Restaurant", btn500ecom: "$500 Ecommerce",
  changedSection: { title: "What", titleItalic: "Changes", desc: "This is not just where the colors get better. This is where the website starts doing actual work." },
  whatChanged: [
    { title: "Real Checkout", description: "Customers can add to cart, enter their details, and complete the order without turning every sale into a WhatsApp conversation." },
    { title: "Real Mobile Experience", description: "Not just \"it works on phones.\" The site is actually built for the place customers are most likely to see it first." },
    { title: "Real SEO", description: "Proper page titles, descriptions, speed, and structure so Google can understand the business instead of guessing." },
    { title: "The Backend Difference", description: "A $100 site mostly shows information. A $200+ site can start handling forms, orders, checkout flows, and cleaner customer paths." },
  ],
  whyCostMore: "Why does it cost more?",
  whyCostMoreBody: "A $100 site is mostly a dressed-up template. A $200+ site starts having logic behind it. You are not paying for prettier pixels. You are paying for usefulness.",
  comparisonSection: { title: "$200 vs $500 -", titleItalic: "The Honest Difference", desc: "The difference is not good versus bad. The difference is how much responsibility the website has to carry." },
  tier200title: "$200 - Functional", tier200sub: "Gets the job done right",
  tier200footer: "$200 is the first tier I would call sane for a real small business. It is not huge software. It just does not embarrass you.",
  tier500title: "$500 - Competitive", tier500sub: "Matches established businesses",
  tier500footer: "$500 makes sense when the website is supposed to help you sell, compete, and reduce manual work.",
  twoHundredGets: ["Functional checkout that actually processes orders", "Mobile-first design that looks good on every screen", "Basic SEO so Google knows you exist", "Clean, professional design - not a template", "Fast loading - under 2 seconds", "Contact forms that actually send emails"],
  fiveHundredGets: ["Everything in $200, plus:", "Advanced product filtering and search", "Customer accounts and order history", "Inventory management with stock tracking", "Multiple payment methods", "Analytics dashboard to track sales", "Optimized for high traffic", "Competitive with established businesses"],
  tableFeature: "Feature", tableTwo: "$200", tableFive: "$500",
  comparison: [
    { feature: "Load Time", two: "Under 2s", five: "Under 1s" }, { feature: "Checkout", two: "Basic but functional", five: "Full e-commerce flow" },
    { feature: "Mobile", two: "Responsive", five: "Mobile-first, app-like" }, { feature: "SEO", two: "Basic optimization", five: "Advanced, structured data" },
    { feature: "Products", two: "Up to ~30", five: "Unlimited, with variants" }, { feature: "Orders", two: "Email notifications", five: "Dashboard + tracking" },
    { feature: "Design", two: "Clean and professional", five: "Premium and branded" }, { feature: "Competition", two: "Better than most locals", five: "Matches national brands" },
  ],
  verdictSection: { title: "The", titleItalic: "Verdict", desc: "Both tiers can be good. The mistake is expecting the cheaper one to do the job of the expensive one." },
  stopAt200title: "Stop at $200 If", stopAt200list: ["You sell fewer than 20 products or menu items", "Your business is local and reputation-driven", "You need a professional presence but not an e-commerce powerhouse", "You're moving from WhatsApp orders to online orders for the first time", "Your competitors also have basic websites"],
  stopAt200footer: "If your main problem is having no real website at all, do not overcomplicate it. A clean $200 site can be the right move.",
  stretchTo500title: "Stretch to $500 If", stretchTo500list: ["You have a growing catalog with variants (sizes, colors, options)", "You're competing with businesses that already look established online", "You need to track inventory, orders, and customer data", "You want customers to come back and reorder without messaging you", "You're ready for your website to be a sales channel, not just a brochure"],
  stretchTo500footer: "At this point, the extra money is not decoration. It is capacity.",
  nextSection: { title: "What Comes", titleItalic: "Next" },
  tier1000title: "$1,000+ Tier",
  tier1000desc: "This is the level for businesses that need the website to behave more like software than marketing material.",
  caseStudiesTitle: "Full Case Studies", caseStudiesDesc: "See every tier from $20 to $10,000 side by side. Speed tests, feature breakdowns, and honest recommendations for every budget.",
  r1000link: "$1,000 Restaurant Demo →", e1000link: "$1,000 Ecommerce Demo →",
  rCaseLink: "Restaurant Case Study →", eCaseLink: "Ecommerce Case Study →",
  cheaperSection: { title: "Wondering About", titleItalic: "Cheaper Options?", desc: "If you're still thinking about going cheaper, read those first. They make the tradeoffs very obvious." },
  cheapBlog1title: "Why a $20 Website Will Cost You Thousands", cheapBlog1desc: "A $20 website doesn't just look cheap - it actively repels customers. See exactly what that money buys with live demos.",
  cheapBlog2title: "What a $100 Website Actually Gets You", cheapBlog2desc: "A $100 website works. It's not broken. It just doesn't do much. The honest breakdown of what that budget delivers.",
  readPost: "Read Post",
  bottomLine: { title: "The Bottom Line", desc: "The real shift happens between $200 and $500. That is where the website stops being a placeholder and starts becoming useful.", two: "$200 gets you functional.", five: "$500 gets you competitive.", footer: "Pick the one that matches the stage of the business." },
  ctaSection: { title: "Ready to", titleItalic: "Build It Properly?", desc: "If you already know which tier makes sense, the next step is simple: do it right the first time.", startBtn: "Start Here", backBtn: "Back to Blog" },
};

const ar: PageContent = {
  h1a: "ما التكلفة الحقيقية", h1b: "لموقع احترافي؟",
  intro: "المواقع الرخيصة موجودة في كل مكان. وأغلب الوقت القصة نفسها: سعر قليل، نتيجة ضعيفة، ثم تدفع مرة ثانية لاحقاً. هذا المقال للمرحلة التي تتوقف فيها عن سؤال كيف تحصل على موقع رخيص، وتبدأ تسأل: الموقع المحترم فعلاً يكلف كم؟",
  badge1: "عروض حية", badge2: "مقارنة صادقة", badge3: "توجيه واضح",
  demosSection: { title: "اكتشف الفرق بنفسك", desc: "بنيت عروضاً حية لهذه المستويات حتى لا يبقى الكلام نظرياً. افتحها على هاتفك، تصفحها، ولاحظ كيف تشعر بها، لا كيف تبدو فقط.", tier200: "مستوى 200$", tier500: "مستوى 500$" },
  btn200rest: "مطعم 200$", btn500rest: "مطعم 500$", btn500ecom: "متجر 500$",
  changedSection: { title: "ما الذي", titleItalic: "تغيّر", desc: "الانتقال من 100$ إلى 200$ أو 500$ ليس ترقية شكل. هو ترقية قدرة. الموقع يبدأ ينجز شغلاً حقيقياً." },
  whatChanged: [
    { title: "دفع حقيقي", description: "العملاء يضيفون للسلة، يدخلون بياناتهم، ويكملون الطلب. لا واتساب. لا متابعة يدوية. الموقع يتولى كل شيء." },
    { title: "تجربة جوال حقيقية", description: "ليس فقط «يعمل على الهواتف». مصمم أصلاً للجوال أولاً. سريع، سلس، مريح للإبهام. لأن هذا هو مكان عملائك." },
    { title: "تحسين بحث حقيقي", description: "عناوين صفحات صحيحة، أوصاف ميتا، تحميل سريع، بيانات منظمة. جوجل يستطيع إيجادك فعلاً. منافسوك الذين يفتقرون لهذا؟ غير مرئيين." },
    { title: "فرق الواجهة الخلفية", description: "الموقع بـ 100$ هو ملصق. الموقع بـ 200$+ له منطق خلفه: معالجة طلبات، ووعي بالمخزون، وبيانات عملاء. الموقع يبدأ في إنجاز العمل الذي كنت تقوم به يدوياً." },
  ],
  whyCostMore: "لماذا يكلف أكثر؟",
  whyCostMoreBody: "الموقع بـ 100$ غالباً مجرد قالب متزين. الموقع بـ 200$+ يبدأ يكون عنده منطق حقيقي وراءه: نماذج، طلبات، بيانات، وشغل يدوي أقل. إنت ما بتدفع في شكل أجمل فقط. إنت بتدفع في فائدة.",
  comparisonSection: { title: "200$ مقابل 500$", titleItalic: "الفرق الصادق", desc: "الاثنان موقعان حقيقيان. الفرق ليس جيداً مقابل سيئ. الفرق هو أين وصل عملك، وكم تحتاج من الموقع أن يتحمل." },
  tier200title: "200$: وظيفي", tier200sub: "ينجز المهمة بشكل صحيح",
  tier200footer: "فكر في 200$ كنقطة يتوقف فيها الموقع عن الزينة ويبدأ يكون مفيداً.",
  tier500title: "500$: تنافسي", tier500sub: "يضاهي الأعمال القائمة",
  tier500footer: "500$ هو المكان الذي يتوقف فيه الموقع عن كونه مقبولاً فقط، ويبدأ يعطيك أفضلية.",
  twoHundredGets: ["دفع وظيفي يعالج الطلبات فعلاً", "تصميم جوال أولاً يبدو جيداً على كل شاشة", "تحسين أساسي للبحث حتى تعرفك جوجل", "تصميم نظيف واحترافي وليس قالباً", "تحميل سريع أقل من ثانيتين", "نماذج تواصل ترسل رسائل فعلاً"],
  fiveHundredGets: ["كل شيء في 200$، بالإضافة إلى:", "تصفية متقدمة للمنتجات وبحث", "حسابات عملاء وسجل طلبات", "إدارة مخزون مع تتبع المخزون", "طرق دفع متعددة", "لوحة تحليلات لتتبع المبيعات", "محسّن لحركة مرور عالية", "ينافس الأعمال القائمة"],
  tableFeature: "الميزة", tableTwo: "200$", tableFive: "500$",
  comparison: [
    { feature: "وقت تحميل", two: "أقل من ثانيتين", five: "أقل من ثانية" }, { feature: "إتمام الطلب", two: "أساسي لكن وظيفي", five: "تدفق تجارة إلكترونية كامل" },
    { feature: "الجوال", two: "متجاوب", five: "جوال أولاً، شبيه بالتطبيق" }, { feature: "تحسين البحث", two: "تحسين أساسي", five: "متقدم مع بيانات منظمة" },
    { feature: "المنتجات", two: "حتى ~30", five: "غير محدود مع متغيرات" }, { feature: "الطلبات", two: "إشعارات بريد إلكتروني", five: "لوحة تحكم + تتبع" },
    { feature: "التصميم", two: "نظيف واحترافي", five: "مميز ويعكس هويتك" }, { feature: "التنافسية", two: "أفضل من معظم المحليين", five: "يضاهي العلامات الوطنية" },
  ],
  verdictSection: { title: "", titleItalic: "الحكم", desc: "المستويان محترمان. لكن عليك أن تكون صادقاً: هل تحتاج موقعاً يعمل فقط، أم موقعاً ينافس؟" },
  stopAt200title: "توقف عند 200$ إذا", stopAt200list: ["تبيع أقل من 20 منتجاً أو عنصراً في القائمة", "عملك محلي وقائم على السمعة", "تحتاج حضوراً احترافياً لكنك لست بحاجة لقوة تجارة إلكترونية", "تنتقل من طلبات واتساب إلى الطلبات عبر الإنترنت لأول مرة", "منافسوك أيضاً لديهم مواقع أساسية"],
  stopAt200footer: "200$ ميزانية منطقية جداً إذا كانت مشكلتك الأساسية أنك لا تملك موقعاً حقيقياً أصلاً. لا يوجد أي عيب في أن تبدأ من هنا.",
  stretchTo500title: "مدّ ميزانيتك إلى 500$ إذا", stretchTo500list: ["لديك كتالوج متنامٍ مع متغيرات (مقاسات، ألوان، خيارات)", "تنافس أعمالاً تبدو بالفعل متمكنة عبر الإنترنت", "تحتاج تتبع المخزون والطلبات وبيانات العملاء", "تريد عملاء يعودون ويعيدون الطلب دون مراسلتك", "أنت مستعد لكي يكون موقعك قناة مبيعات، لا مجرد كتيب"],
  stretchTo500footer: "500$ منطقية عندما يتجاوز العمل مرحلة البقاء، ويحتاج الموقع أن يشيل حملاً أكبر.",
  nextSection: { title: "ما الذي", titleItalic: "يأتي بعد ذلك" },
  tier1000title: "مستوى 1,000$+",
  tier1000desc: "هذا المستوى للأعمال التي تحتاج الموقع أن يتصرف كبرنامج، لا كمادة تسويقية فقط.",
  caseStudiesTitle: "دراسات الحالة الكاملة", caseStudiesDesc: "رأى كل مستوى من 20$ إلى 10,000$ جنباً إلى جنب. اختبارات سرعة، تفاصيل ميزات، وتوصيات صادقة لكل ميزانية.",
  r1000link: "عرض مطعم 1,000$ ←", e1000link: "عرض متجر 1,000$ ←",
  rCaseLink: "دراسة حالة المطاعم ←", eCaseLink: "دراسة حالة التجارة الإلكترونية ←",
  cheaperSection: { title: "هل تتساءل عن", titleItalic: "الخيارات الأرخص؟", desc: "إذا كنت ما زلت تفكر في النزول أكثر، اقرأ تلك المقالات أولاً. ستوضح لك التنازلات بسرعة." },
  cheapBlog1title: "لماذا سيكلفك الموقع بـ 20$ آلاف الدولارات", cheapBlog1desc: "الموقع بـ 20$ لا يبدو رخيصاً فحسب، بل يطرد العملاء بشكل فعلي. اكتشف ما يشتريه هذا المال مع عروض حية.",
  cheapBlog2title: "ماذا تحصل فعلاً مقابل موقع بـ 100$؟", cheapBlog2desc: "الموقع بـ 100$ يعمل. ليس معطلاً. لكنه لا يفعل الكثير. التقييم الصادق لما يقدمه ذلك الميزانية.",
  readPost: "اقرأ المقال",
  bottomLine: { title: "الخلاصة", desc: "التحول الحقيقي يحصل بين 200$ و500$. هنا المواقع تتوقف عن كونها حشواً، وتبدأ تكون أدوات عمل.", two: "200$ يوفر لك الوظيفية.", five: "500$ يوفر لك التنافسية.", footer: "اختر ما يناسب ما يحتاجه عملك فعلاً الآن." },
  ctaSection: { title: "مستعد", titleItalic: "للاستثمار؟", desc: "إذا كنت تعرف بالفعل أي مستوى يناسبك، فالخطوة التالية واضحة: ابنه صح من أول مرة.", startBtn: "ابدأ من هنا", backBtn: "العودة إلى المدونة" },
};

const SLUG = "what-a-professional-website-costs";

const DEMOS = {
  r200: "https://200-dollar-restaurant.vercel.app",
  r500: "https://500-dollar-restaurant.vercel.app",
  e500: "https://500-dollar-ecommerce-app.vercel.app",
  r1000: "https://1000-dollar-restaurant.vercel.app",
  e1000: "https://1000-dollar-ecommerce-app.vercel.app",
};

/** Joins a heading that the legacy copy split into two styled halves. */
const join = (...parts: string[]) => parts.filter(Boolean).join(" ");
/** Drops the hand-typed arrow from legacy link labels; an icon replaces it. */
const bare = (label: string) => label.replace(/\s*[→←]\s*$/, "");
/** "$200 - Functional" → "Functional", "200$: وظيفي" → "وظيفي". */
const tierName = (title: string) => title.replace(/^\S+\s*[-:]\s*/, "");

export default async function WhatAProfessionalWebsiteCostsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = isAr ? ar : en;
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug(SLUG, locale);

  const [plusLine, ...fiveHundredRest] = c.fiveHundredGets;
  const comparisonTitle = `${c.comparisonSection.title.replace(/\s*-\s*$/, "")}: ${c.comparisonSection.titleItalic}`;
  const cheaper = [
    { slug: "why-not-to-buy-cheap-websites", title: c.cheapBlog1title, desc: c.cheapBlog1desc },
    { slug: "what-100-dollar-website-gets-you", title: c.cheapBlog2title, desc: c.cheapBlog2desc },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article>
        <ArticleHeader
          backHref={`/${locale}/blog`}
          backLabel={dict.blog.allArticles}
          title={join(c.h1a, c.h1b)}
          lead={c.intro}
          meta={[
            post?.author,
            post && (
              <time key="d" dateTime="2026-02-21">
                {formatPostDate(post.publishedDate, locale)}
              </time>
            ),
            post && `${post.readTime} ${dict.blog.minRead}`,
          ]}
        >
          <ul className="flex flex-wrap gap-1.5">
            {[c.badge1, c.badge2, c.badge3].map((badge) => (
              <li key={badge} className="tag">
                {badge}
              </li>
            ))}
          </ul>
        </ArticleHeader>

        <div className="container-site">
          <div className={READING}>
            {/* Live demos */}
            <Section title={c.demosSection.title} lead={c.demosSection.desc}>
              <div className="card overflow-hidden">
                <DemoRow label={c.demosSection.tier200}>
                  <DemoLink href={DEMOS.r200}>{c.btn200rest}</DemoLink>
                </DemoRow>
                <div aria-hidden="true" className="flex items-center gap-4 px-6">
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-sm text-muted">{isAr ? "مقابل" : "vs"}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <DemoRow label={c.demosSection.tier500} featured>
                  <DemoLink href={DEMOS.r500}>{c.btn500rest}</DemoLink>
                  <DemoLink href={DEMOS.e500}>{c.btn500ecom}</DemoLink>
                </DemoRow>
              </div>
            </Section>

            {/* What changes */}
            <Section title={join(c.changedSection.title, c.changedSection.titleItalic)} lead={c.changedSection.desc}>
              <ol className="grid gap-4 sm:grid-cols-2">
                {c.whatChanged.map((item) => (
                  <li key={item.title}>
                    <InfoCard title={item.title} className="h-full">
                      <p className="text-[0.9375rem]">{item.description}</p>
                    </InfoCard>
                  </li>
                ))}
              </ol>
              <Callout title={c.whyCostMore} className="mt-4">
                {c.whyCostMoreBody}
              </Callout>
            </Section>

            {/* $200 vs $500 */}
            <Section title={comparisonTitle} lead={c.comparisonSection.desc}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel footer={c.tier200footer}>
                  <TierHead price={c.tableTwo} name={tierName(c.tier200title)} sub={c.tier200sub} />
                  <CheckList items={c.twoHundredGets} className="mt-6 border-t border-line pt-6 text-[0.9375rem]" />
                </Panel>
                <Panel featured footer={c.tier500footer}>
                  <TierHead featured price={c.tableFive} name={tierName(c.tier500title)} sub={c.tier500sub} />
                  <div className="mt-6 border-t border-line pt-6">
                    <p className="text-[0.9375rem] font-medium text-ink">{plusLine}</p>
                    <CheckList items={fiveHundredRest} className="mt-3 text-[0.9375rem]" />
                  </div>
                </Panel>
              </div>

              {/* Phones: one stacked row per feature instead of a cramped three-column table. */}
              <dl className="mt-6 divide-y divide-line overflow-hidden rounded-[1.125rem] border border-line bg-card sm:hidden">
                {c.comparison.map((row) => (
                  <div key={row.feature} className="px-5 py-4">
                    <dt className="font-medium text-ink">{row.feature}</dt>
                    <dd className="mt-2.5 grid grid-cols-2 gap-4 text-[0.9375rem] leading-snug">
                      <span>
                        <span className="block text-sm font-medium text-muted tabular">{c.tableTwo}</span>
                        <span className="mt-1 block text-ink-2">{row.two}</span>
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-accent tabular">{c.tableFive}</span>
                        <span className="mt-1 block text-ink">{row.five}</span>
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 hidden overflow-x-auto rounded-[1.125rem] border border-line bg-card sm:block">
                <table className="data-table">
                  <caption className="sr-only">{comparisonTitle}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{c.tableFeature}</th>
                      <th scope="col" className="tabular">
                        {c.tableTwo}
                      </th>
                      <th scope="col" className="tabular text-accent">
                        {c.tableFive}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.comparison.map((row) => (
                      <tr key={row.feature}>
                        <th scope="row" className={ROW_HEADER}>
                          {row.feature}
                        </th>
                        <td>{row.two}</td>
                        <td className="text-ink">{row.five}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Verdict */}
            <Section title={join(c.verdictSection.title, c.verdictSection.titleItalic)} lead={c.verdictSection.desc}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel footer={c.stopAt200footer}>
                  <h3 className={CARD_TITLE}>{c.stopAt200title}</h3>
                  <CheckList items={c.stopAt200list} className="mt-5 text-[0.9375rem]" />
                </Panel>
                <Panel featured footer={c.stretchTo500footer}>
                  <h3 className={CARD_TITLE}>{c.stretchTo500title}</h3>
                  <CheckList items={c.stretchTo500list} className="mt-5 text-[0.9375rem]" />
                </Panel>
              </div>
            </Section>

            {/* What comes next */}
            <Section title={join(c.nextSection.title, c.nextSection.titleItalic)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel>
                  <h3 className={CARD_TITLE}>{c.tier1000title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.tier1000desc}</p>
                  <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
                    <li>
                      <a href={DEMOS.r1000} target="_blank" rel="noopener noreferrer" className="group link-quiet">
                        {bare(c.r1000link)}
                        <ArrowOut className="size-3.5" />
                      </a>
                    </li>
                    <li>
                      <a href={DEMOS.e1000} target="_blank" rel="noopener noreferrer" className="group link-quiet">
                        {bare(c.e1000link)}
                        <ArrowOut className="size-3.5" />
                      </a>
                    </li>
                  </ul>
                </Panel>
                <Panel>
                  <h3 className={CARD_TITLE}>{c.caseStudiesTitle}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.caseStudiesDesc}</p>
                  <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
                    <li>
                      <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="group link-quiet">
                        {bare(c.rCaseLink)}
                        <ArrowForward className="size-3.5" />
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="group link-quiet">
                        {bare(c.eCaseLink)}
                        <ArrowForward className="size-3.5" />
                      </Link>
                    </li>
                  </ul>
                </Panel>
              </div>
            </Section>

            {/* Bottom line */}
            <BottomLine title={c.bottomLine.title} desc={c.bottomLine.desc} lines={[c.bottomLine.two, c.bottomLine.five]} footer={c.bottomLine.footer} />

            {/* Cheaper options */}
            <Section title={join(c.cheaperSection.title, c.cheaperSection.titleItalic)} lead={c.cheaperSection.desc}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {cheaper.map((item) => (
                  <PostCard
                    key={item.slug}
                    href={`/${locale}/blog/${item.slug}`}
                    title={item.title}
                    description={item.desc}
                    cta={c.readPost}
                  />
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <RelatedPosts slug={SLUG} locale={locale} dict={dict} />
      </article>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Local building blocks — reading-column sections for this structured post.
   ─────────────────────────────────────────────────────────────────────────── */

const CARD_TITLE = "text-lg font-semibold leading-snug tracking-[-0.015em] text-ink rtl:tracking-normal";
const ROW_HEADER = "bg-transparent align-top font-medium text-ink border-line [tr:last-child>&]:border-b-0";

function Section({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-12 first:border-t-0 first:pt-2 md:py-16 md:first:pt-4">
      <h2 className="text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink rtl:leading-[1.5] rtl:tracking-normal">
        {title}
      </h2>
      {lead && <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-2 rtl:text-[1.125rem] rtl:leading-[1.9]">{lead}</p>}
      <div className="reveal mt-8">{children}</div>
    </section>
  );
}

function Panel({ featured, footer, children }: { featured?: boolean; footer?: ReactNode; children: ReactNode }) {
  return (
    <div
      className={cn(
        "card flex h-full flex-col p-6 md:p-7",
        featured && "border-[color-mix(in_oklab,var(--accent)_45%,transparent)] shadow-[var(--shadow-card)]",
      )}
    >
      <div className="flex-1">{children}</div>
      {footer && <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">{footer}</p>}
    </div>
  );
}

function TierHead({ price, name, sub, featured }: { price: string; name: string; sub: string; featured?: boolean }) {
  return (
    <div>
      <p
        className={cn(
          "tabular text-[2.5rem] font-semibold leading-none tracking-[-0.035em] rtl:tracking-normal",
          featured ? "text-accent" : "text-ink",
        )}
      >
        {price}
      </p>
      <h3 className={cn(CARD_TITLE, "mt-4")}>{name}</h3>
      <p className="mt-1 text-sm text-muted">{sub}</p>
    </div>
  );
}

function DemoRow({ label, featured, children }: { label: string; featured?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className={cn("font-semibold text-ink tabular", featured && "text-accent")}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function DemoLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ButtonLink href={href} external variant="secondary" size="sm">
      {children}
      <ArrowOut />
    </ButtonLink>
  );
}

function BottomLine({ title, desc, lines, footer }: { title: string; desc: string; lines: string[]; footer: string }) {
  return (
    <section className="pb-12 md:pb-16">
      <div className="reveal rounded-[1.25rem] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-accent-soft p-7 md:p-10">
        <h2 className="text-h3">{title}</h2>
        <p className="mt-4 text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-semibold leading-[1.3] tracking-[-0.018em] text-ink rtl:leading-[1.6] rtl:tracking-normal">
          {desc}
        </p>
        <ul className="mt-7 grid gap-2 border-t border-[color-mix(in_oklab,var(--accent)_25%,transparent)] pt-6 text-lg">
          {lines.map((line, i) => (
            <li key={line} className={i === lines.length - 1 ? "font-semibold text-ink" : "font-medium text-ink-2"}>
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-relaxed text-ink-2">{footer}</p>
      </div>
    </section>
  );
}

function PostCard({
  href,
  title,
  description,
  cta,
}: {
  href: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <li className="card card-interactive group relative flex flex-col p-6 md:p-7">
      <h3 className={CARD_TITLE}>
        <Link href={href} className="stretched-link transition-colors group-hover:text-accent">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{description}</p>
      <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
        {cta}
        <ArrowForward className="size-3.5" />
      </span>
    </li>
  );
}
