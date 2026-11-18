import type { ReactNode } from "react";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { formatPostDate, getBlogPostBySlug } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { ArticleHeader, READING, RelatedPosts } from "@/components/site/article";
import { CheckList, InfoCard } from "@/components/site/layout";
import { ArrowForward } from "@/components/site/icons";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is Headless Shopify? Meaning, Benefits & SEO Comparison",
  description: "What is headless Shopify meaning explained simply. Compare headless vs regular Shopify for SEO, performance, and design control.",
  author: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  publisher: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  datePublished: "2026-02-25",
  dateModified: "2026-03-07",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does headless Shopify mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Headless Shopify means separating the frontend (what customers see) from the backend (Shopify's commerce engine). You use Shopify's APIs to build custom frontends with React, Next.js, or other frameworks while still using Shopify's product management, inventory, and checkout features.",
      },
    },
    {
      "@type": "Question",
      name: "What is headless Shopify in simple terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In simple terms, headless Shopify is when you use Shopify for the 'back office' (managing products, orders, payments) but build your own custom storefront with modern web technologies instead of using Shopify's themes.",
      },
    },
    {
      "@type": "Question",
      name: "Is headless Shopify better for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, headless Shopify can be better for SEO because it allows for faster page loads (using Next.js server-side rendering), better Core Web Vitals scores, and complete control over meta tags, structured data, and page structure. However, regular Shopify also has good SEO capabilities with proper theme optimization.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between traditional Shopify and headless Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional Shopify uses Shopify's pre-built themes (Liquid templates) for the frontend. Headless Shopify separates the frontend completely, allowing you to build a custom storefront while using Shopify's backend. Headless offers more design freedom and performance control but requires more development work.",
      },
    },
    {
      "@type": "Question",
      name: "When should I choose headless Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose headless Shopify when you need complete design control, want to optimize for performance, need complex custom functionality, or plan to sell across multiple channels (web, app, kiosk) from one backend. It's ideal for brands where unique UX is a competitive advantage.",
      },
    },
  ],
};

type BenefitItem = { title: string; description: string };
type LimitItem = { title: string; description: string };
type ComparisonRow = { feature: string; regular: string; headless: string; headlessWins: boolean };

type PageContent = {
    h1a: string;
    h1b: string;
    intro: string;
    badge1: string;
    badge2: string;
    badge3: string;
    whatIsSection: { title: string; titleItalic: string; regularTitle: string; regularDesc: string; headlessTitle: string; headlessDesc: string };
    regularLimits: LimitItem[];
    regularLimitsTitle: string;
    regularLimitsTitleItalic: string;
    regularLimitsDesc: string;
    headlessBenefits: BenefitItem[];
    headlessBenefitsTitle: string;
    headlessBenefitsTitleItalic: string;
    headlessBenefitsDesc: string;
    comparisonTitle: string;
    comparisonTitleItalic: string;
    comparisonDesc: string;
    tableFeature: string;
    tableRegular: string;
    tableHeadless: string;
    comparison: ComparisonRow[];
    verdictTitle: string;
    verdictTitleItalic: string;
    verdictDesc: string;
    stayRegularTitle: string;
    stayRegularList: string[];
    stayRegularFooter: string;
    goHeadlessTitle: string;
    goHeadlessList: string[];
    goHeadlessFooter: string;
    bottomLineTitle: string;
    bottomLineDesc: string;
    bottomLineRegular: string;
    bottomLineHeadless: string;
    bottomLineFooter: string;
    ctaTitle: string;
    ctaTitleItalic: string;
    ctaDesc: string;
    ctaStartBtn: string;
    ctaBackBtn: string;
    readMore: string;
    relatedTitle: string;
    relatedTitleItalic: string;
    relatedDesc: string;
    relatedPost1title: string;
    relatedPost1desc: string;
    relatedPost2title: string;
    relatedPost2desc: string;
};

const en: PageContent = {
    h1a: "What Is Headless Shopify?",
    h1b: "Meaning & Comparison",
    intro: "People throw around the word \"headless\" like it automatically means better. It does not. Sometimes it is exactly the right move. Sometimes it is just a more expensive way to solve a problem you do not have.",
    badge1: "Clear Explanation",
    badge2: "Honest Take",
    badge3: "No Fluff",
    whatIsSection: {
        title: "What Does Headless",
        titleItalic: "Shopify Mean?",
        regularTitle: "Regular Shopify",
        regularDesc: "This is the normal setup. Shopify handles the products, checkout, and storefront. You choose a theme, make a few edits, and go live. It is fast, practical, and good enough for a lot of stores. The tradeoff is that your frontend is boxed in by Shopify's theme system.",
        headlessTitle: "Headless Shopify",
        headlessDesc: "Headless Shopify means Shopify keeps doing the commerce work in the backend while you build the storefront separately with something like React or Next.js. In plain English: you keep Shopify's engine, but stop using Shopify's built-in face.",
    },
    regularLimitsTitle: "Where Regular Shopify",
    regularLimitsTitleItalic: "Hits a Wall",
    regularLimitsDesc: "Regular Shopify is fine until it starts getting in your way. These are the usual walls.",
    regularLimits: [
        { title: "Slow Page Speeds", description: "Shopify themes carry platform overhead. You can optimize a lot, but you are still fighting scripts and theme weight, especially on mobile." },
        { title: "Design Constraints", description: "You can customize themes up to a point. If the brand needs a truly custom experience, Liquid starts feeling like a cage." },
        { title: "One Platform, One Experience", description: "Standard Shopify is built around one storefront. If you need web, app, kiosk, and other surfaces from the same catalog, the normal setup gets awkward fast." },
        { title: "App Bloat", description: "Every app adds more code and more risk. At some point the store is not slow because Shopify is bad. It is slow because the theme is carrying a pile of apps." },
    ],
    headlessBenefitsTitle: "What Headless",
    headlessBenefitsTitleItalic: "Actually Gives You",
    headlessBenefitsDesc: "These are not abstract engineering benefits. These are the business problems headless can solve when they actually exist.",
    headlessBenefits: [
        { title: "Faster Storefronts", description: "A well-built Next.js storefront can be much faster than a theme-heavy Shopify store. Better speed helps SEO and conversion, especially on phones." },
        { title: "Complete Design Freedom", description: "The frontend is just code. Any layout, animation, or interaction pattern can be built without fighting a theme system." },
        { title: "Sell Everywhere from One Backend", description: "Products, inventory, and pricing stay in Shopify. The website, app, kiosk, or other channel can all pull from the same source of truth." },
        { title: "Better Developer Experience", description: "React and Next.js give developers modern tooling, easier debugging, and a larger ecosystem. That matters when the storefront is becoming real software." },
    ],
    comparisonTitle: "The Honest",
    comparisonTitleItalic: "Comparison",
    comparisonDesc: "Both paths can work. The real question is whether you need more freedom or you just need to launch and sell.",
    tableFeature: "Feature",
    tableRegular: "Regular Shopify",
    tableHeadless: "Headless Shopify",
    comparison: [
        { feature: "Setup Time", regular: "Days to weeks", headless: "Weeks to months", headlessWins: false },
        { feature: "Setup Cost", regular: "Low (theme + apps)", headless: "Higher (custom dev)", headlessWins: false },
        { feature: "Page Speed", regular: "Moderate", headless: "Fast (can hit 100 Lighthouse)", headlessWins: true },
        { feature: "Design Flexibility", regular: "Limited by theme", headless: "Unlimited", headlessWins: true },
        { feature: "Maintenance", regular: "Shopify handles most of it", headless: "You own the frontend", headlessWins: false },
        { feature: "Multi-channel", regular: "One storefront", headless: "Web, app, kiosk from one backend", headlessWins: true },
        { feature: "SEO Performance", regular: "Good", headless: "Excellent (with proper setup)", headlessWins: true },
        { feature: "Developer Talent", regular: "Shopify/Liquid devs", headless: "React/Next.js devs (larger pool)", headlessWins: true },
    ],
    verdictTitle: "The",
    verdictTitleItalic: "Verdict",
    verdictDesc: "Headless is not automatically better. It is more work, more money, and more responsibility. It only becomes better when regular Shopify is already costing you something real.",
    stayRegularTitle: "Stick with Regular Shopify If",
    stayRegularList: [
        "You're launching a new store and need to move fast",
        "Your product catalog is simple with no complex variants",
        "Your team doesn't have React/Next.js development resources",
        "Your current Shopify theme is working fine and your conversion rate is healthy",
        "You don't need to sell across multiple platforms at once",
    ],
    stayRegularFooter: "Regular Shopify is not the less serious option. For many stores, it is simply correct. Do not go headless for status. Go headless because you hit a wall and know exactly which wall it is.",
    goHeadlessTitle: "Go Headless If",
    goHeadlessList: [
        "Your page speed is noticeably hurting conversions and you've exhausted theme optimization",
        "You need to sell across web, mobile app, and other surfaces from one backend",
        "Your brand needs a truly custom experience that no theme can deliver",
        "You're scaling to high traffic and need granular performance control",
        "You have, or can hire, developers comfortable with modern JavaScript frameworks",
    ],
    goHeadlessFooter: "Headless makes sense when regular Shopify is already slowing the business down. Not when you are just bored of themes.",
    bottomLineTitle: "The Bottom Line",
    bottomLineDesc: "Regular Shopify is enough for most businesses. Headless is for the cases where enough has stopped being enough.",
    bottomLineRegular: "Regular Shopify: launch fast, iterate fast.",
    bottomLineHeadless: "Headless Shopify: build for scale, build for brand.",
    bottomLineFooter: "Choose based on the business you have now, not the fantasy version of it.",
    ctaTitle: "Ready to",
    ctaTitleItalic: "Build?",
    ctaDesc: "Whether you need a headless build or a well-executed standard Shopify store, the goal is the same: pick the setup that makes sense instead of the one that sounds impressive.",
    ctaStartBtn: "Start Here",
    ctaBackBtn: "Back to Blog",
    readMore: "Read Post",
    relatedTitle: "Related",
    relatedTitleItalic: "Reading",
    relatedDesc: "More blunt breakdowns on what websites cost and what the cheaper options really get you.",
    relatedPost1title: "What a Professional Website Actually Costs ($200-$500)",
    relatedPost1desc: "The $200-$500 range is where websites stop being expenses and start paying for themselves. Here's the honest breakdown.",
    relatedPost2title: "How Much Does a Website Cost?",
    relatedPost2desc: "A complete pricing guide with 15 live demos. Compare $20 to $10,000 websites and see exactly what each budget buys.",
};

const ar: PageContent = {
    h1a: "ما هو Headless Shopify؟",
    h1b: "المعنى والمقارنة",
    intro: "ربما رأيت ناساً يرمون كلمة \"Headless\" كأنها الخيار الأذكى تلقائياً. وهي ليست كذلك. أحياناً تكون هي القرار الصحيح فعلاً، وأحياناً تكون مجرد طريقة أغلى لحل مشكلة لا تملكها أصلاً.",
    badge1: "شرح واضح",
    badge2: "رأي صادق",
    badge3: "بدون حشو",
    whatIsSection: {
        title: "ماذا يعني",
        titleItalic: "Headless Shopify؟",
        regularTitle: "Shopify العادي",
        regularDesc: "هذا هو الإعداد العادي. Shopify يتولى المنتجات والدفع والواجهة التي يراها العملاء. تختار قالباً، تعمل بعض التعديلات، وتنطلق. هو سريع وعملي ومناسب لعدد كبير من المتاجر. لكن المقابل أن الواجهة عندك تظل محصورة داخل نظام قوالب Shopify.",
        headlessTitle: "Headless Shopify",
        headlessDesc: "Headless Shopify يعني أن Shopify تظل تدير التجارة في الخلفية، بينما تبني الواجهة بشكل منفصل بتقنيات مثل React أو Next.js. ببساطة: تحتفظ بمحرك Shopify، لكنك تتوقف عن استخدام وجهه الجاهز.",
    },
    regularLimitsTitle: "أين يصطدم",
    regularLimitsTitleItalic: "Shopify العادي بالحواجز",
    regularLimitsDesc: "Shopify العادي جيد إلى أن يبدأ يضايقك. وهذه هي النقاط التي يحدث عندها ذلك غالباً.",
    regularLimits: [
        { title: "بطء تحميل الصفحات", description: "قوالب Shopify تحمّل الكثير من سكريبتاتها الخاصة. حتى مع التحسين، أنت تحارب العبء الزائد للمنصة. الصفحات البطيئة تعني فقدان التحويلات، خاصة على الجوال." },
        { title: "قيود التصميم", description: "يمكنك تخصيص القوالب لكن إذا كانت علامتك التجارية تحتاج شيئاً فريداً حقاً، مثل رسوم متحركة معقدة أو تخطيطات غير تقليدية، فإن قوالب Liquid تعيق ذلك بسرعة." },
        { title: "منصة واحدة، تجربة واحدة", description: "Shopify القياسي يشغّل واجهة متجر واحدة. إذا أردت البيع عبر تطبيق جوال وتطبيق ويب وكشك فعلي من نفس كتالوج المنتجات، فأنت تنظر في ثلاثة إعدادات منفصلة." },
        { title: "تضخم التطبيقات", description: "كل ميزة تضيفها من خلال متجر تطبيقات Shopify تضيف المزيد من الكود إلى واجهة متجرك. خمسون تطبيقاً؟ هذا يعني خمسين جزءاً من سكريبتات طرف ثالث تعمل في كل تحميل صفحة." },
    ],
    headlessBenefitsTitle: "ما الذي يمنحك إياه",
    headlessBenefitsTitleItalic: "Headless فعلاً",
    headlessBenefitsDesc: "هذا هو الجزء الذي يهم الناس فعلاً. ليست فوائد هندسية نظرية، بل مشاكل تجارية حقيقية يمكن أن يحلها Headless عندما تكون موجودة فعلاً.",
    headlessBenefits: [
        { title: "واجهات متجر أسرع", description: "واجهة Next.js مع التصيير من جهة الخادم والتوليد الثابت تحمّل بشكل أسرع بكثير من أي قالب Shopify. مقاييس Core Web Vitals أفضل، تصنيفات جوجل أفضل، ومعدلات تحويل أفضل على الجوال." },
        { title: "حرية تصميم كاملة", description: "واجهتك الأمامية هي مجرد كود. أي تخطيط، أي رسم متحرك، أي نمط تفاعل يمكنك تخيله: ابنه. لا قيود على القوالب، لا حلول بديلة لـ Liquid." },
        { title: "بع في كل مكان من خلفية واحدة", description: "تحديثات المنتجات وتغييرات المخزون والتسعير تحدث مرة واحدة في Shopify. موقعك وتطبيق الجوال وأي قناة أخرى تسحب من نفس مصدر الحقيقة عبر API." },
        { title: "تجربة مطور أفضل", description: "المطورون العاملون في React وNext.js يحصلون على العمل بأدوات حديثة. دورات تطوير أسرع، تصحيح أخطاء أسهل، والوصول إلى نظام بيئي أوسع بكثير من المكتبات والتكاملات." },
    ],
    comparisonTitle: "المقارنة",
    comparisonTitleItalic: "الصادقة",
    comparisonDesc: "الطريقتان قد تنجحان. السؤال الحقيقي: هل تحتاج حرية أكبر، أم تحتاج فقط أن تطلق المتجر وتبيع؟",
    tableFeature: "الميزة",
    tableRegular: "Shopify العادي",
    tableHeadless: "Headless Shopify",
    comparison: [
        { feature: "وقت الإعداد", regular: "أيام إلى أسابيع", headless: "أسابيع إلى أشهر", headlessWins: false },
        { feature: "تكلفة الإعداد", regular: "منخفضة (قالب + تطبيقات)", headless: "أعلى (تطوير مخصص)", headlessWins: false },
        { feature: "سرعة الصفحة", regular: "متوسطة", headless: "سريعة (يمكن بلوغ 100 في Lighthouse)", headlessWins: true },
        { feature: "مرونة التصميم", regular: "محدودة بالقالب", headless: "غير محدودة", headlessWins: true },
        { feature: "الصيانة", regular: "Shopify تتولى معظمها", headless: "أنت تملك الواجهة الأمامية", headlessWins: false },
        { feature: "متعدد القنوات", regular: "واجهة متجر واحدة", headless: "ويب، تطبيق، كشك من خلفية واحدة", headlessWins: true },
        { feature: "أداء SEO", regular: "جيد", headless: "ممتاز (بإعداد صحيح)", headlessWins: true },
        { feature: "مواهب المطورين", regular: "مطورو Shopify/Liquid", headless: "مطورو React/Next.js (مجموعة أكبر)", headlessWins: true },
    ],
    verdictTitle: "",
    verdictTitleItalic: "الحكم",
    verdictDesc: "Headless ليس أفضل تلقائياً. هو عمل أكثر، ومال أكثر، ومسؤولية أكثر. ويصبح أفضل فقط عندما تبدأ قيود Shopify العادي تكلفك شيئاً حقيقياً.",
    stayRegularTitle: "ابق مع Shopify العادي إذا",
    stayRegularList: [
        "أنت تطلق متجراً جديداً وتحتاج للتحرك بسرعة",
        "كتالوج منتجاتك بسيط بدون متغيرات معقدة",
        "فريقك لا يملك موارد تطوير React/Next.js",
        "قالب Shopify الحالي يعمل بشكل جيد ومعدل تحويلك معقول",
        "لا تحتاج للبيع عبر منصات متعددة في آن واحد",
    ],
    stayRegularFooter: "Shopify العادي ليس خياراً أقل جدية. لكثير من المتاجر هو الخيار الصحيح ببساطة. لا تذهب إلى Headless من أجل المظهر. اذهب لأنك اصطدمت بحاجز واضح وتعرفه بالضبط.",
    goHeadlessTitle: "اذهب إلى Headless إذا",
    goHeadlessList: [
        "سرعة صفحتك تؤثر بشكل ملحوظ على التحويلات وقد استنفذت تحسين القوالب",
        "تحتاج البيع عبر ويب وتطبيق جوال وأسطح أخرى من خلفية واحدة",
        "علامتك التجارية تحتاج تجربة مخصصة تماماً لا يستطيع أي قالب تقديمها",
        "تتوسع إلى حركة مرور عالية وتحتاج تحكماً دقيقاً في الأداء",
        "لديك أو يمكنك توظيف مطورين مرتاحين مع أطر عمل JavaScript الحديثة",
    ],
    goHeadlessFooter: "Headless يصبح منطقياً عندما يبدأ Shopify العادي فعلاً في إبطاء العمل، لا عندما تمل من القوالب فقط.",
    bottomLineTitle: "الخلاصة",
    bottomLineDesc: "Shopify العادي يكفي معظم الأعمال. Headless للحالات التي توقف فيها \"يكفي\" عن كونه كافياً.",
    bottomLineRegular: "Shopify العادي: أطلق بسرعة، طوّر بسرعة.",
    bottomLineHeadless: "Headless Shopify: ابن للتوسع، ابن للعلامة التجارية.",
    bottomLineFooter: "اختر بناءً على العمل الذي عندك الآن، لا النسخة الخيالية التي تتمنى أن تصل إليها.",
    ctaTitle: "مستعد",
    ctaTitleItalic: "للبناء؟",
    ctaDesc: "سواء كنت تحتاج بناء Headless حقيقياً أو متجر Shopify عادي منفذاً بشكل جيد، فالهدف واحد: تختار ما يناسب عملك، لا ما يبدو مثيراً للإعجاب.",
    ctaStartBtn: "ابدأ من هنا",
    ctaBackBtn: "العودة إلى المدونة",
    readMore: "اقرأ المقال",
    relatedTitle: "قراءة",
    relatedTitleItalic: "ذات صلة",
    relatedDesc: "مقالات أخرى بصراحة مباشرة عن تكاليف المواقع وما الذي تعطيك إياه الخيارات الأرخص فعلاً.",
    relatedPost1title: "ما التكلفة الحقيقية لموقع احترافي؟ (200$ - 500$)",
    relatedPost1desc: "نطاق 200$-500$ هو حيث تتوقف المواقع عن كونها نفقات وتبدأ في تحمل تكلفتها. إليك التقييم الصادق.",
    relatedPost2title: "كم تكلفة إنشاء موقع إلكتروني؟",
    relatedPost2desc: "دليل أسعار كامل مع 15 عرضاً توضيحياً حياً. قارن بين مواقع بـ 20$ و10,000$ واكتشف ما يشتريه كل ميزانية.",
};

const SLUG = "headless-shopify-vs-regular";

/** Joins a heading that the legacy copy split into two styled halves. */
const join = (...parts: string[]) => parts.filter(Boolean).join(" ");
const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function HeadlessShopifyVsRegularPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = isAr ? ar : en;
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug(SLUG, locale);

  const comparisonTitle = join(c.comparisonTitle, c.comparisonTitleItalic);
  const advantage = isAr ? "الأفضل هنا" : "stronger option";
  const related = [
    { slug: "what-a-professional-website-costs", title: c.relatedPost1title, desc: c.relatedPost1desc },
    { slug: "how-much-does-a-website-cost", title: c.relatedPost2title, desc: c.relatedPost2desc },
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
              <time key="d" dateTime="2026-02-25">
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
            {/* What headless means */}
            <Section title={join(c.whatIsSection.title, c.whatIsSection.titleItalic)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel>
                  <StackDiagram />
                  <h3 className={cn(CARD_TITLE, "mt-6")}>{c.whatIsSection.regularTitle}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.whatIsSection.regularDesc}</p>
                </Panel>
                <Panel featured>
                  <StackDiagram headless />
                  <h3 className={cn(CARD_TITLE, "mt-6")}>{c.whatIsSection.headlessTitle}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.whatIsSection.headlessDesc}</p>
                </Panel>
              </div>
            </Section>

            {/* Where regular Shopify hits a wall */}
            <Section title={join(c.regularLimitsTitle, c.regularLimitsTitleItalic)} lead={c.regularLimitsDesc}>
              <ol className="border-b border-line">
                {c.regularLimits.map((item, i) => (
                  <li key={item.title} className="grid gap-x-6 gap-y-1.5 border-t border-line py-6 sm:grid-cols-[2.75rem_1fr]">
                    <span className="pt-0.5 text-sm font-semibold tabular text-danger">{pad(i)}</span>
                    <div>
                      <h3 className={CARD_TITLE}>{item.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            {/* What headless gives you */}
            <Section title={join(c.headlessBenefitsTitle, c.headlessBenefitsTitleItalic)} lead={c.headlessBenefitsDesc}>
              <ol className="grid gap-4 sm:grid-cols-2">
                {c.headlessBenefits.map((item) => (
                  <li key={item.title}>
                    <InfoCard title={item.title} className="h-full">
                      <p className="text-[0.9375rem]">{item.description}</p>
                    </InfoCard>
                  </li>
                ))}
              </ol>
            </Section>

            {/* Comparison */}
            <Section title={comparisonTitle} lead={c.comparisonDesc}>
              {/* Phones: one stacked row per feature instead of a cramped three-column table. */}
              <dl className="divide-y divide-line overflow-hidden rounded-[1.125rem] border border-line bg-card sm:hidden">
                {c.comparison.map((row) => (
                  <div key={row.feature} className="px-5 py-4">
                    <dt className="font-medium text-ink">{row.feature}</dt>
                    <dd className="mt-2.5 grid grid-cols-2 gap-4 text-[0.9375rem] leading-snug">
                      <span>
                        <span className="block ps-[1.375rem] text-sm font-medium text-muted">{c.tableRegular}</span>
                        <span className="mt-1.5 block">
                          <Verdict win={!row.headlessWins} label={advantage}>
                            {row.regular}
                          </Verdict>
                        </span>
                      </span>
                      <span>
                        <span className="block ps-[1.375rem] text-sm font-medium text-accent">{c.tableHeadless}</span>
                        <span className="mt-1.5 block">
                          <Verdict win={row.headlessWins} label={advantage}>
                            {row.headless}
                          </Verdict>
                        </span>
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="hidden overflow-x-auto rounded-[1.125rem] border border-line bg-card sm:block">
                <table className="data-table">
                  <caption className="sr-only">{comparisonTitle}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{c.tableFeature}</th>
                      {/* Indent matches the check-mark column in the cells below. */}
                      <th scope="col">
                        <span className="ps-[1.375rem]">{c.tableRegular}</span>
                      </th>
                      <th scope="col" className="text-accent">
                        <span className="ps-[1.375rem]">{c.tableHeadless}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.comparison.map((row) => (
                      <tr key={row.feature}>
                        <th scope="row" className={ROW_HEADER}>
                          {row.feature}
                        </th>
                        <td>
                          <Verdict win={!row.headlessWins} label={advantage}>
                            {row.regular}
                          </Verdict>
                        </td>
                        <td>
                          <Verdict win={row.headlessWins} label={advantage}>
                            {row.headless}
                          </Verdict>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Verdict */}
            <Section title={join(c.verdictTitle, c.verdictTitleItalic)} lead={c.verdictDesc}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel footer={c.stayRegularFooter}>
                  <h3 className={CARD_TITLE}>{c.stayRegularTitle}</h3>
                  <CheckList items={c.stayRegularList} className="mt-5 text-[0.9375rem]" />
                </Panel>
                <Panel featured footer={c.goHeadlessFooter}>
                  <h3 className={CARD_TITLE}>{c.goHeadlessTitle}</h3>
                  <CheckList items={c.goHeadlessList} className="mt-5 text-[0.9375rem]" />
                </Panel>
              </div>
            </Section>

            {/* Bottom line */}
            <BottomLine
              title={c.bottomLineTitle}
              desc={c.bottomLineDesc}
              lines={[c.bottomLineRegular, c.bottomLineHeadless]}
              footer={c.bottomLineFooter}
            />

            {/* Related reading */}
            <Section title={join(c.relatedTitle, c.relatedTitleItalic)} lead={c.relatedDesc}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <PostCard
                    key={item.slug}
                    href={`/${locale}/blog/${item.slug}`}
                    title={item.title}
                    description={item.desc}
                    cta={c.readMore}
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

/**
 * Schematic of the two setups: a theme fused to Shopify versus a separate
 * storefront talking to Shopify over its API. Decorative; the copy explains it.
 */
function StackDiagram({ headless }: { headless?: boolean }) {
  const box = "rounded-lg border px-3 py-2 font-mono text-xs leading-none";
  return (
    <div aria-hidden="true" dir="ltr" className="grid h-[7.5rem] content-center rounded-xl bg-paper-2 p-3">
      {headless ? (
        <div className="grid">
          <span className={cn(box, "border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-accent-soft text-ink")}>
            React / Next.js
          </span>
          <span className="flex h-7 items-center gap-2 ps-4 font-mono text-[0.6875rem] text-muted">
            <span className="h-full w-px bg-line-strong" />
            API
          </span>
          <span className={cn(box, "border-line bg-card text-ink-2")}>Shopify</span>
        </div>
      ) : (
        <div className="grid gap-1 rounded-[0.625rem] border border-line-strong p-1">
          <span className={cn(box, "border-line bg-card text-ink")}>Liquid theme</span>
          <span className={cn(box, "border-line bg-card text-ink-2")}>Shopify</span>
        </div>
      )}
    </div>
  );
}

function Verdict({ win, label, children }: { win: boolean; label: string; children: ReactNode }) {
  return (
    <span className={cn("flex items-start gap-2", win ? "font-medium text-ink" : "text-muted")}>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={cn("mt-[0.3em] size-3.5 shrink-0 text-accent", !win && "invisible")}
      >
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span>
        {children}
        {win && <span className="sr-only"> ({label})</span>}
      </span>
    </span>
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
