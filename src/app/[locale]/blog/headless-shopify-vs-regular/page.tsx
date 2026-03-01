"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    CheckCircle,
    ArrowRight,
    Zap,
    Globe,
    Smartphone,
    TrendingUp,
    Server,
    Target,
    ShoppingCart,
    Code,
} from "lucide-react";
import { Locale } from "@/i18n.config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Headless Shopify vs Regular Shopify: What's the Difference?",
  description: "Learn the difference between headless Shopify and regular Shopify to choose the right approach for your ecommerce store.",
  author: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  publisher: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  datePublished: "2026-02-25",
  dateModified: "2026-02-25",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is headless Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Headless Shopify separates the frontend (what customers see) from the backend (Shopify). You use Shopify's APIs to build custom frontends with React, Next.js, or other frameworks while still using Shopify's commerce features.",
      },
    },
    {
      "@type": "Question",
      name: "When should I choose headless Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose headless Shopify when you need complete design control, want to optimize for performance, need complex custom functionality, or plan to scale significantly. It's ideal for brands where unique UX is a competitive advantage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from regular Shopify to headless later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can migrate from regular Shopify to headless later, but it requires development work. If you're just starting and don't have specific needs for custom architecture, regular Shopify with a good theme is often sufficient.",
      },
    },
  ],
};

type BenefitItem = { title: string; description: string };
type LimitItem = { title: string; description: string };
type ComparisonRow = { feature: string; regular: string; headless: string; headlessWins: boolean };

type PageContent = {
    eyebrow: string;
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
    eyebrow: "Shopify Deep Dive",
    h1a: "Headless Shopify",
    h1b: "vs Regular Shopify",
    intro: "You've probably heard the term \"headless\" thrown around in conversations about Shopify. It sounds complicated, maybe even unnecessary. But if you're running a growing business and hitting walls with your current store, understanding the difference could save you a lot of frustration. And potentially a lot of missed sales.",
    badge1: "Clear Explanation",
    badge2: "Honest Comparison",
    badge3: "Practical Guidance",
    whatIsSection: {
        title: "What's the",
        titleItalic: "Difference?",
        regularTitle: "Regular Shopify",
        regularDesc: "This is the standard setup. Shopify handles everything: the product data, the checkout logic, and the frontend your customers see. You pick a theme, customize it, and you're live. Fast to set up, predictable, and fully managed. But the frontend (what customers actually see) is locked to Shopify's templating system.",
        headlessTitle: "Headless Shopify",
        headlessDesc: "Headless separates the frontend from the backend. Shopify still handles your products, inventory, orders, and checkout. But your storefront is built with a separate technology (usually React or Next.js) that fetches data from Shopify via its API. You get Shopify's reliable commerce engine with a completely custom frontend.",
    },
    regularLimitsTitle: "Where Regular Shopify",
    regularLimitsTitleItalic: "Hits a Wall",
    regularLimitsDesc: "Standard Shopify works well until it doesn't. Here's where most growing stores run into real friction.",
    regularLimits: [
        { title: "Slow Page Speeds", description: "Shopify themes load a lot of Shopify's own scripts. Even with optimization, you're fighting the platform's overhead. Slow pages mean lost conversions, especially on mobile." },
        { title: "Design Constraints", description: "You can customize themes to a point. But if your brand requires something truly unique (complex animations, unconventional layouts, deeply interactive components), Liquid templates get in the way fast." },
        { title: "One Platform, One Experience", description: "Standard Shopify powers one storefront. If you want to sell across a mobile app, a web app, and a physical kiosk from the same product catalog, you're doing three separate setups." },
        { title: "App Bloat", description: "Every feature you add through Shopify's app store injects more code into your storefront. Fifty apps? Fifty chunks of third-party scripts running on every page load." },
    ],
    headlessBenefitsTitle: "What Headless",
    headlessBenefitsTitleItalic: "Actually Gives You",
    headlessBenefitsDesc: "These aren't theoretical benefits. They're the specific problems that headless solves.",
    headlessBenefits: [
        { title: "Faster Storefronts", description: "A Next.js frontend with server-side rendering and static generation loads significantly faster than any Shopify theme. Better Core Web Vitals, better Google rankings, and better conversion rates on mobile." },
        { title: "Complete Design Freedom", description: "Your frontend is just code. Any layout, any animation, any interaction pattern you can imagine: build it. No theme restrictions, no Liquid workarounds." },
        { title: "Sell Everywhere from One Backend", description: "Product updates, inventory changes, and pricing all happen once in Shopify. Your website, mobile app, and any other channel all pull from the same source of truth via the API." },
        { title: "Better Developer Experience", description: "Developers working in React and Next.js are working with modern tools. Faster development cycles, easier debugging, and access to a much larger ecosystem of libraries and integrations." },
    ],
    comparisonTitle: "The Honest",
    comparisonTitleItalic: "Comparison",
    comparisonDesc: "Both approaches work. The question is which one fits your business right now.",
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
    verdictDesc: "Headless isn't automatically better. It's a bigger investment with a bigger payoff, but only if your business actually needs it.",
    stayRegularTitle: "Stick with Regular Shopify If",
    stayRegularList: [
        "You're launching a new store and need to move fast",
        "Your product catalog is straightforward with no complex variants",
        "Your team doesn't have React/Next.js development resources",
        "Your current Shopify theme is working fine and your conversion rate is healthy",
        "You don't need to sell across multiple platforms simultaneously",
    ],
    stayRegularFooter: "Regular Shopify is not a compromise. For most small to mid-size stores, it's the right tool. Don't go headless because it sounds impressive. Go headless because you've hit a specific wall that headless solves.",
    goHeadlessTitle: "Go Headless If",
    goHeadlessList: [
        "Your page speed is noticeably hurting conversions and you've exhausted theme optimization",
        "You need to sell across web, mobile app, and other surfaces from one backend",
        "Your brand requires a truly custom experience that no theme can deliver",
        "You're scaling to high traffic and need granular performance control",
        "You have (or can hire) developers comfortable with modern JavaScript frameworks",
    ],
    goHeadlessFooter: "Headless makes sense when the limitations of standard Shopify become real business problems. Not before.",
    bottomLineTitle: "The Bottom Line",
    bottomLineDesc: "Regular Shopify is fast, reliable, and right for most businesses. Headless unlocks performance and flexibility, but it's an investment, not a shortcut.",
    bottomLineRegular: "Regular Shopify: launch fast, iterate fast.",
    bottomLineHeadless: "Headless Shopify: build for scale, build for brand.",
    bottomLineFooter: "Pick the one that matches where your business is today. Not where you hope it will be in five years.",
    ctaTitle: "Ready to",
    ctaTitleItalic: "Build?",
    ctaDesc: "Whether you need a high-performance headless storefront or a fast, well-built standard Shopify store, let's figure out what actually fits your business.",
    ctaStartBtn: "Start Here",
    ctaBackBtn: "Back to Blog",
    readMore: "Read Post",
    relatedTitle: "Related",
    relatedTitleItalic: "Reading",
    relatedDesc: "More posts on website costs and what different budgets actually deliver.",
    relatedPost1title: "What a Professional Website Actually Costs ($200-$500)",
    relatedPost1desc: "The $200-$500 range is where websites stop being expenses and start paying for themselves. Here's the honest breakdown.",
    relatedPost2title: "How Much Does a Website Cost?",
    relatedPost2desc: "A complete pricing guide with 15 live demos. Compare $20 to $10,000 websites and see exactly what each budget buys.",
};

const ar: PageContent = {
    eyebrow: "تعمق في شوبيفاي",
    h1a: "Headless Shopify",
    h1b: "مقابل Shopify العادي",
    intro: "ربما سمعت مصطلح \"Headless\" في نقاشات حول شوبيفاي. يبدو معقداً، وربما غير ضروري. لكن إذا كنت تدير متجراً متنامياً وتصطدم بحواجز في متجرك الحالي، فإن فهم الفرق قد يوفر عليك الكثير من الإحباط. وربما الكثير من المبيعات الضائعة.",
    badge1: "شرح واضح",
    badge2: "مقارنة صادقة",
    badge3: "توجيه عملي",
    whatIsSection: {
        title: "ما هو",
        titleItalic: "الفرق؟",
        regularTitle: "Shopify العادي",
        regularDesc: "هذا هو الإعداد القياسي. Shopify يتولى كل شيء: بيانات المنتجات، منطق الدفع، والواجهة الأمامية التي يراها عملاؤك. تختار قالباً، تخصصه، وتنطلق. سريع في الإعداد، يمكن التنبؤ به، ومُدار بالكامل. لكن الواجهة الأمامية (ما يراه العملاء فعلاً) مقيدة بنظام قوالب Shopify.",
        headlessTitle: "Headless Shopify",
        headlessDesc: "النمط Headless يفصل الواجهة الأمامية عن الخلفية. Shopify لا يزال يتعامل مع منتجاتك والمخزون والطلبات والدفع. لكن واجهة المتجر مبنية بتقنية منفصلة (عادةً React أو Next.js) تجلب البيانات من Shopify عبر واجهة برمجية. تحصل على محرك التجارة الموثوق لShopify مع واجهة أمامية مخصصة بالكامل.",
    },
    regularLimitsTitle: "أين يصطدم",
    regularLimitsTitleItalic: "Shopify العادي بالحواجز",
    regularLimitsDesc: "Shopify العادي يعمل جيداً حتى يتوقف عن ذلك. إليك أين يواجه معظم المتاجر المتنامية احتكاكاً حقيقياً.",
    regularLimits: [
        { title: "بطء تحميل الصفحات", description: "قوالب Shopify تحمّل الكثير من سكريبتات Shopify الخاصة. حتى مع التحسين، أنت تحارب العبء الزائد للمنصة. الصفحات البطيئة تعني فقدان التحويلات، خاصة على الجوال." },
        { title: "قيود التصميم", description: "يمكنك تخصيص القوالب إلى حد ما. لكن إذا كانت علامتك التجارية تتطلب شيئاً فريداً حقاً (رسوم متحركة معقدة، تخطيطات غير تقليدية، مكونات تفاعلية عميقة)، فإن قوالب Liquid تعيق ذلك بسرعة." },
        { title: "منصة واحدة، تجربة واحدة", description: "Shopify القياسي يشغّل واجهة متجر واحدة. إذا أردت البيع عبر تطبيق جوال وتطبيق ويب وكشك فعلي من نفس كتالوج المنتجات، فأنت تقوم بثلاثة إعدادات منفصلة." },
        { title: "تضخم التطبيقات", description: "كل ميزة تضيفها من خلال متجر تطبيقات Shopify تضخ المزيد من الكود في واجهة متجرك. خمسون تطبيقاً؟ خمسون كتلة من سكريبتات الطرف الثالث تعمل في كل تحميل صفحة." },
    ],
    headlessBenefitsTitle: "ما الذي يمنحك إياه",
    headlessBenefitsTitleItalic: "Headless فعلاً",
    headlessBenefitsDesc: "هذه ليست فوائد نظرية. إنها المشكلات المحددة التي يحلها Headless.",
    headlessBenefits: [
        { title: "واجهات متجر أسرع", description: "واجهة Next.js مع التصيير من جهة الخادم والتوليد الثابت يتحمل بشكل أسرع بكثير من أي قالب شوبيفاي. مقاييس Core Web Vitals أفضل، تصنيفات جوجل أفضل، ومعدلات تحويل أفضل على الجوال." },
        { title: "حرية تصميم كاملة", description: "واجهتك الأمامية هي مجرد كود. أي تخطيط، أي رسم متحرك، أي نمط تفاعل يمكنك تخيله: قم ببنائه. لا قيود على القوالب، لا حلول بديلة لـ Liquid." },
        { title: "بع في كل مكان من خلفية واحدة", description: "تحديثات المنتجات وتغييرات المخزون والتسعير تحدث مرة واحدة في شوبيفاي. موقعك وتطبيق الجوال وأي قناة أخرى يسحب من نفس مصدر الحقيقة عبر الواجهة البرمجية." },
        { title: "تجربة مطور أفضل", description: "المطورون العاملون في React وNext.js يعملون بأدوات حديثة. دورات تطوير أسرع، تصحيح أخطاء أسهل، والوصول إلى نظام بيئي أوسع بكثير من المكتبات والتكاملات." },
    ],
    comparisonTitle: "المقارنة",
    comparisonTitleItalic: "الصادقة",
    comparisonDesc: "كلا النهجين يعملان. السؤال هو أيهما يناسب عملك الآن.",
    tableFeature: "الميزة",
    tableRegular: "Shopify العادي",
    tableHeadless: "Headless Shopify",
    comparison: [
        { feature: "وقت الإعداد", regular: "أيام إلى أسابيع", headless: "أسابيع إلى أشهر", headlessWins: false },
        { feature: "تكلفة الإعداد", regular: "منخفضة (قالب + تطبيقات)", headless: "أعلى (تطوير مخصص)", headlessWins: false },
        { feature: "سرعة الصفحة", regular: "متوسطة", headless: "سريعة (يمكن بلوغ 100 في Lighthouse)", headlessWins: true },
        { feature: "مرونة التصميم", regular: "محدودة بالقالب", headless: "غير محدودة", headlessWins: true },
        { feature: "الصيانة", regular: "Shopify يتولى معظمها", headless: "أنت تملك الواجهة الأمامية", headlessWins: false },
        { feature: "متعدد القنوات", regular: "واجهة متجر واحدة", headless: "ويب، تطبيق، كشك من خلفية واحدة", headlessWins: true },
        { feature: "أداء SEO", regular: "جيد", headless: "ممتاز (بإعداد صحيح)", headlessWins: true },
        { feature: "مواهب المطورين", regular: "مطورو Shopify/Liquid", headless: "مطورو React/Next.js (مجموعة أكبر)", headlessWins: true },
    ],
    verdictTitle: "",
    verdictTitleItalic: "الحكم",
    verdictDesc: "Headless ليس أفضل تلقائياً. إنه استثمار أكبر بعائد أكبر، لكن فقط إذا كان عملك يحتاج ذلك فعلاً.",
    stayRegularTitle: "ابق مع Shopify العادي إذا",
    stayRegularList: [
        "أنت تطلق متجراً جديداً وتحتاج للتحرك بسرعة",
        "كتالوج منتجاتك بسيط بدون متغيرات معقدة",
        "فريقك لا يملك موارد تطوير React/Next.js",
        "قالب Shopifyالحالي يعمل بشكل جيد ومعدل تحويلك معقول",
        "لا تحتاج للبيع عبر منصات متعددة في آن واحد",
    ],
    stayRegularFooter: "Shopify العادي ليس تنازلاً. لمعظم المتاجر الصغيرة والمتوسطة، إنه الأداة الصحيحة. لا تذهب إلى Headless لأنه يبدو مثيراً للإعجاب. اذهب لأنك اصطدمت بحاجز محدد يحله Headless.",
    goHeadlessTitle: "اذهب إلى Headless إذا",
    goHeadlessList: [
        "سرعة صفحتك تؤثر بشكل ملحوظ على التحويلات وقد استنفذت تحسين القوالب",
        "تحتاج البيع عبر ويب وتطبيق جوال وأسطح أخرى من خلفية واحدة",
        "علامتك التجارية تتطلب تجربة مخصصة تماماً لا يستطيع أي قالب تقديمها",
        "أنت تتوسع إلى حركة مرور عالية وتحتاج تحكماً دقيقاً في الأداء",
        "لديك (أو يمكنك توظيف) مطورون مرتاحون مع أطر عمل JavaScript الحديثة",
    ],
    goHeadlessFooter: "Headless منطقي عندما تصبح قيود Shopify القياسي مشكلات تجارية حقيقية. ليس قبل ذلك.",
    bottomLineTitle: "الخلاصة",
    bottomLineDesc: "Shopify العادي سريع وموثوق ومناسب لمعظم الأعمال. Headless يفتح الأداء والمرونة، لكنه استثمار وليس اختصاراً.",
    bottomLineRegular: "Shopify العادي: أطلق بسرعة، طوّر بسرعة.",
    bottomLineHeadless: "Headless Shopify: ابن للتوسع، ابن للعلامة التجارية.",
    bottomLineFooter: "اختر ما يناسب مرحلة عملك اليوم. وليس حيث تأمل أن يكون بعد خمس سنوات.",
    ctaTitle: "مستعد",
    ctaTitleItalic: "للبناء؟",
    ctaDesc: "سواء كنت تحتاج واجهة متجر Headless عالية الأداء أو متجر Shopify قياسي مبني بشكل جيد، دعنا نكتشف ما يناسب عملك فعلاً.",
    ctaStartBtn: "ابدأ من هنا",
    ctaBackBtn: "العودة إلى المدونة",
    readMore: "اقرأ المقال",
    relatedTitle: "قراءة",
    relatedTitleItalic: "ذات صلة",
    relatedDesc: "مقالات أخرى حول تكاليف المواقع وما تقدمه ميزانيات مختلفة فعلاً.",
    relatedPost1title: "ما التكلفة الحقيقية لموقع احترافي؟ (200$ - 500$)",
    relatedPost1desc: "نطاق 200$-500$ هو حيث تتوقف المواقع عن كونها نفقات وتبدأ في تحمل تكلفتها. إليك التقييم الصادق.",
    relatedPost2title: "كم تكلفة إنشاء موقع إلكتروني؟",
    relatedPost2desc: "دليل أسعار كامل مع 15 عرضاً توضيحياً حياً. قارن بين مواقع بـ 20$ و10,000$ واكتشف ما يشتريه كل ميزانية.",
};

export default function HeadlessShopifyVsRegularPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const [locale, setLocale] = useState<Locale>("en");
    const [c, setC] = useState<PageContent>(en);
    useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);

    const limitIcons = [Zap, Code, Globe, ShoppingCart];
    const benefitIcons = [Zap, Code, Globe, Server];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
                        <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.eyebrow}</span>
                        <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display mb-8">
                        {c.h1a} <br /><span className="italic text-text/50">{c.h1b}</span>
                    </h1>
                    <p className="text-lg text-text/75 font-medium leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge label={c.badge1} /><Badge label={c.badge2} /><Badge label={c.badge3} />
                    </div>
                </motion.header>

                {/* What's the Difference */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.whatIsSection.title} <span className="italic text-text/50">{c.whatIsSection.titleItalic}</span></h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-800/10 text-green-500"><ShoppingCart className="h-5 w-5" /></div>
                                <h3 className="text-xl font-display">{c.whatIsSection.regularTitle}</h3>
                            </div>
                            <p className="text-text/60 leading-relaxed font-medium">{c.whatIsSection.regularDesc}</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"><Server className="h-5 w-5" /></div>
                                <h3 className="text-xl font-display">{c.whatIsSection.headlessTitle}</h3>
                            </div>
                            <p className="text-text/60 leading-relaxed font-medium">{c.whatIsSection.headlessDesc}</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Regular Shopify Limits */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.regularLimitsTitle} <span className="italic text-text/50">{c.regularLimitsTitleItalic}</span></h2>
                        <p className="text-lg text-text/75 font-medium leading-relaxed max-w-2xl mx-auto">{c.regularLimitsDesc}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {c.regularLimits.map((item, index) => {
                            const Icon = limitIcons[index];
                            return (
                                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-6 border-l-2 border-l-red-500/40">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400"><Icon className="h-5 w-5" /></div>
                                        <h3 className="text-lg font-display">{item.title}</h3>
                                    </div>
                                    <p className="text-[0.9rem] text-text/75 font-medium leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Headless Benefits */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.headlessBenefitsTitle} <span className="italic text-text/50">{c.headlessBenefitsTitleItalic}</span></h2>
                        <p className="text-lg text-text/75 font-medium leading-relaxed max-w-2xl mx-auto">{c.headlessBenefitsDesc}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {c.headlessBenefits.map((item, index) => {
                            const Icon = benefitIcons[index];
                            return (
                                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-6 border-l-2 border-l-[hsl(var(--accent-gold))]/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"><Icon className="h-5 w-5" /></div>
                                        <h3 className="text-lg font-display">{item.title}</h3>
                                    </div>
                                    <p className="text-[0.9rem] text-text/75 font-medium leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Comparison Table */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.comparisonTitle} <span className="italic text-text/50">{c.comparisonTitleItalic}</span></h2>
                        <p className="text-lg text-text/75 font-medium leading-relaxed max-w-2xl mx-auto">{c.comparisonDesc}</p>
                    </div>
                    <div className="glass-card overflow-hidden">
                        <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
                            <div className="font-display text-text/80">{c.tableFeature}</div>
                            <div className="font-display text-green-500 text-center">{c.tableRegular}</div>
                            <div className="font-display text-[hsl(var(--accent-gold))] text-center">{c.tableHeadless}</div>
                        </div>
                        {c.comparison.map((row, idx) => (
                            <div key={row.feature} className={`grid grid-cols-3 gap-4 p-4 items-center ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                                <div className="text-text/80 font-medium">{row.feature}</div>
                                <div className={`text-center text-[0.9rem] font-medium ${row.headlessWins ? "text-text/60" : "text-green-500/90"}`}>{row.regular}</div>
                                <div className={`text-center text-[0.9rem] font-medium flex items-center justify-center gap-1 ${row.headlessWins ? "text-[hsl(var(--accent-gold))]/90" : "text-text/60"}`}>
                                    {row.headless}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Verdict */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.verdictTitle} <span className="italic text-text/50">{c.verdictTitleItalic}</span></h2>
                        <p className="text-lg text-text/75 font-medium leading-relaxed max-w-2xl mx-auto">{c.verdictDesc}</p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-6"><Target className="h-5 w-5 text-green-500" /><h3 className="text-xl font-display">{c.stayRegularTitle}</h3></div>
                            <ul className="space-y-4">
                                {c.stayRegularList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[0.9rem] font-medium text-text/75">
                                        <ArrowRight className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />{item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/10"><p className="text-[0.9rem] text-text/65 font-medium leading-relaxed">{c.stayRegularFooter}</p></div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
                            <div className="flex items-center gap-3 mb-6"><TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.goHeadlessTitle}</h3></div>
                            <ul className="space-y-4">
                                {c.goHeadlessList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[0.9rem] font-medium text-text/75">
                                        <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />{item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/10"><p className="text-[0.9rem] text-text/65 font-medium leading-relaxed">{c.goHeadlessFooter}</p></div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Bottom Line */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
                        <h2 className="text-3xl font-display mb-6">{c.bottomLineTitle}</h2>
                        <p className="text-lg text-text/75 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">{c.bottomLineDesc}</p>
                        <div className="p-6 bg-white/5 rounded-lg inline-block">
                            <p className="text-xl text-text/80"><span className="text-green-500">{c.bottomLineRegular}</span><br /><span className="text-[hsl(var(--accent-gold))]">{c.bottomLineHeadless}</span></p>
                        </div>
                        <p className="text-text/70 font-medium mt-6 leading-relaxed">{c.bottomLineFooter}</p>
                    </div>
                </motion.section>

                {/* Related Posts */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.relatedTitle} <span className="italic text-text/50">{c.relatedTitleItalic}</span></h2>
                        <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.relatedDesc}</p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <Link href={`/${locale}/blog/what-a-professional-website-costs`} className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4"><CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">{c.relatedPost1title}</h3></div>
                            <p className="text-sm text-text/60 leading-relaxed">{c.relatedPost1desc}</p>
                            <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">{c.readMore} <ArrowRight className="h-4 w-4" /></span>
                        </Link>
                        <Link href={`/${locale}/blog/how-much-does-a-website-cost`} className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4"><Smartphone className="h-5 w-5 text-orange-400" /><h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">{c.relatedPost2title}</h3></div>
                            <p className="text-sm text-text/60 leading-relaxed">{c.relatedPost2desc}</p>
                            <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">{c.readMore} <ArrowRight className="h-4 w-4" /></span>
                        </Link>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center py-20">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display mb-6">{c.ctaTitle} <span className="italic text-text/50">{c.ctaTitleItalic}</span></h2>
                        <p className="text-lg text-text/60 mb-10 leading-relaxed">{c.ctaDesc}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={`/${locale}/contact`} className="btn-premium"><span>{c.ctaStartBtn}</span></Link>
                            <Link href={`/${locale}/blog`} className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500">
                                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">{c.ctaBackBtn}</span>
                            </Link>
                        </div>
                    </div>
                </motion.section>

            </div>
        </main>
        </>
    );
}

function Badge({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />{label}
        </span>
    );
}
