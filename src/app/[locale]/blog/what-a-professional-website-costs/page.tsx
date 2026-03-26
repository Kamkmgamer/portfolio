"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, XCircle, ExternalLink, ArrowRight,
  ShoppingCart, Smartphone, Search, Zap, TrendingUp, Target, Server, DollarSign, Crown,
} from "lucide-react";
import { Locale } from "@/i18n.config";

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
  eyebrow: string; h1a: string; h1b: string; intro: string;
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
  eyebrow: "Smart Investment", h1a: "What a Professional Website", h1b: "Actually Costs",
  intro: "Cheap websites are everywhere. By now you've probably seen enough of them to know the pattern: low price, weak result, then you pay again later. This post is for the point where you stop asking how to get a website cheaply and start asking what a proper one actually costs.",
  badge1: "Live Demos", badge2: "Honest Comparison", badge3: "Clear Guidance",
  demosSection: { title: "See the Difference Yourself", desc: "I built live demos for these tiers so this doesn't stay theoretical. Open them on your phone, click through them, and pay attention to how they feel, not just how they look.", tier200: "$200 Tier", tier500: "$500 Tier" },
  btn200rest: "$200 Restaurant", btn500rest: "$500 Restaurant", btn500ecom: "$500 Ecommerce",
  changedSection: { title: "What", titleItalic: "Changed", desc: "Going from $100 to $200 or $500 is not a design upgrade. It's a capability upgrade. The website starts doing real work." },
  whatChanged: [
    { title: "Real Checkout", description: "Customers add to cart, enter their details, and complete the order. No WhatsApp. No manual follow-up. The website handles it." },
    { title: "Real Mobile Experience", description: "Not just \"it works on phones.\" Actually designed for phones first. Fast, smooth, thumb-friendly. Because that's where your customers are." },
    { title: "Real SEO", description: "Proper page titles, meta descriptions, fast loading, structured data. Google can actually find you. Your competitors without this? Invisible." },
    { title: "The Backend Difference", description: "A $100 site is a poster. A $200+ site has logic behind it - order processing, inventory awareness, customer data. The website starts doing work you used to do manually." },
  ],
  whyCostMore: "Why does it cost more?",
  whyCostMoreBody: "A $100 site is mostly a dressed-up template. A $200+ site starts having real logic behind it - handling forms, processing orders, organizing data, reducing manual work. You are not paying for prettier pixels. You are paying for usefulness.",
  comparisonSection: { title: "$200 vs $500 -", titleItalic: "The Honest Difference", desc: "Both of these are real websites. The difference is not good versus bad. The difference is where your business is and what you need the site to carry." },
  tier200title: "$200 - Functional", tier200sub: "Gets the job done right",
  tier200footer: "Think of $200 as the point where the website stops being decorative and starts being useful.",
  tier500title: "$500 - Competitive", tier500sub: "Matches established businesses",
  tier500footer: "$500 is where the website stops being acceptable and starts becoming an edge.",
  twoHundredGets: ["Functional checkout that actually processes orders", "Mobile-first design that looks good on every screen", "Basic SEO so Google knows you exist", "Clean, professional design - not a template", "Fast loading - under 2 seconds", "Contact forms that actually send emails"],
  fiveHundredGets: ["Everything in $200, plus:", "Advanced product filtering and search", "Customer accounts and order history", "Inventory management with stock tracking", "Multiple payment methods", "Analytics dashboard to track sales", "Optimized for high traffic", "Competitive with established businesses"],
  tableFeature: "Feature", tableTwo: "$200", tableFive: "$500",
  comparison: [
    { feature: "Load Time", two: "Under 2s", five: "Under 1s" }, { feature: "Checkout", two: "Basic but functional", five: "Full e-commerce flow" },
    { feature: "Mobile", two: "Responsive", five: "Mobile-first, app-like" }, { feature: "SEO", two: "Basic optimization", five: "Advanced, structured data" },
    { feature: "Products", two: "Up to ~30", five: "Unlimited, with variants" }, { feature: "Orders", two: "Email notifications", five: "Dashboard + tracking" },
    { feature: "Design", two: "Clean and professional", five: "Premium and branded" }, { feature: "Competition", two: "Better than most locals", five: "Matches national brands" },
  ],
  verdictSection: { title: "The", titleItalic: "Verdict", desc: "Both tiers are legitimate. You just need to be honest about whether you need a working site or a competitive one." },
  stopAt200title: "Stop at $200 If", stopAt200list: ["You sell fewer than 20 products or menu items", "Your business is local and reputation-driven", "You need a professional presence but not an e-commerce powerhouse", "You're moving from WhatsApp orders to online orders for the first time", "Your competitors also have basic websites"],
  stopAt200footer: "$200 is a very sane budget if your main problem is having no real website at all. There is no shame in starting there.",
  stretchTo500title: "Stretch to $500 If", stretchTo500list: ["You have a growing catalog with variants (sizes, colors, options)", "You're competing with businesses that already look established online", "You need to track inventory, orders, and customer data", "You want customers to come back and reorder without messaging you", "You're ready for your website to be a sales channel, not just a brochure"],
  stretchTo500footer: "$500 makes sense when the business is past survival mode and needs the website to pull harder.",
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
  bottomLine: { title: "The Bottom Line", desc: "The real shift happens between $200 and $500. That is the range where websites stop being filler and start becoming business tools.", two: "$200 gets you functional.", five: "$500 gets you competitive.", footer: "Pick the one that matches what your business actually needs right now." },
  ctaSection: { title: "Ready to", titleItalic: "Invest?", desc: "If you already know which tier makes sense, the next step is simple: build it properly the first time.", startBtn: "Start Here", backBtn: "Back to Blog" },
};

const ar: PageContent = {
  eyebrow: "استثمار ذكي", h1a: "ما التكلفة الحقيقية", h1b: "لموقع احترافي؟",
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

export default function WhatAProfessionalWebsiteCostsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<PageContent>(en);
  useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
      <div className="max-w-7xl mx-auto">

        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.eyebrow}</span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-8">
            {c.h1a} <br /><span className="italic text-text/50">{c.h1b}</span>
          </h1>
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge label={c.badge1} /><Badge label={c.badge2} /><Badge label={c.badge3} />
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display mb-6 text-center">{c.demosSection.title}</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">{c.demosSection.desc}</p>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-text/50 uppercase tracking-widest mb-3 text-center">{c.demosSection.tier200}</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://200-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300">
                      <span className="text-sm font-semibold uppercase tracking-wider">{c.btn200rest}</span><ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4"><span className="flex-1 h-px bg-white/10" /><span className="text-xs text-text/30 uppercase tracking-widest">vs</span><span className="flex-1 h-px bg-white/10" /></div>
                <div>
                  <p className="text-sm text-text/50 uppercase tracking-widest mb-3 text-center">{c.demosSection.tier500}</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://500-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300">
                      <span className="text-sm font-semibold uppercase tracking-wider">{c.btn500rest}</span><ExternalLink className="h-4 w-4" />
                    </a>
                    <a href="https://500-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300">
                      <span className="text-sm font-semibold uppercase tracking-wider text-text/70">{c.btn500ecom}</span><ExternalLink className="h-4 w-4 text-text/70" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.changedSection.title} <span className="italic text-text/50">{c.changedSection.titleItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.changedSection.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.whatChanged.map((item, index) => {
              const icons = [ShoppingCart, Smartphone, Search, Server];
              const Icon = icons[index];
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-6 border-l-2 border-l-[hsl(var(--accent-gold))]/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"><Icon className="h-5 w-5" /></div>
                    <h3 className="text-lg font-display">{item.title}</h3>
                  </div>
                  <p className="text-sm text-text/60">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="mt-8 p-6 bg-[hsl(var(--accent-gold))]/5 border border-[hsl(var(--accent-gold))]/20 rounded-lg">
            <p className="text-text/70 text-center"><strong className="text-[hsl(var(--accent-gold))]">{c.whyCostMore}</strong>{" "}{c.whyCostMoreBody}</p>
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.comparisonSection.title}{" "}<span className="italic text-text/50">{c.comparisonSection.titleItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.comparisonSection.desc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-800/10 text-green-500"><DollarSign className="h-5 w-5" /></div>
                <div><h3 className="text-xl font-display">{c.tier200title}</h3><p className="text-xs text-text/50">{c.tier200sub}</p></div>
              </div>
              <ul className="space-y-3">{c.twoHundredGets.map((item, idx) => (<li key={idx} className="flex items-start gap-3 text-sm text-text/60"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />{item}</li>))}</ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">{c.tier200footer}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"><Crown className="h-5 w-5" /></div>
                <div><h3 className="text-xl font-display">{c.tier500title}</h3><p className="text-xs text-text/50">{c.tier500sub}</p></div>
              </div>
              <ul className="space-y-3">{c.fiveHundredGets.map((item, idx) => (<li key={idx} className={`flex items-start gap-3 text-sm text-text/60 ${idx === 0 ? "font-semibold text-[hsl(var(--accent-gold))]/80" : ""}`}>{idx === 0 ? <Zap className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" /> : <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />}{item}</li>))}</ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">{c.tier500footer}</p>
            </motion.div>
          </div>
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
              <div className="font-display text-text/80">{c.tableFeature}</div>
              <div className="font-display text-green-500 text-center">{c.tableTwo}</div>
              <div className="font-display text-[hsl(var(--accent-gold))] text-center">{c.tableFive}</div>
            </div>
            {c.comparison.map((row, idx) => (
              <div key={row.feature} className={`grid grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <div className="text-text/70">{row.feature}</div>
                <div className="text-green-500/80 text-center text-sm">{row.two}</div>
                <div className="text-[hsl(var(--accent-gold))]/80 text-center text-sm">{row.five}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.verdictSection.title} <span className="italic text-text/50">{c.verdictSection.titleItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.verdictSection.desc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6"><Target className="h-5 w-5 text-green-500" /><h3 className="text-xl font-display">{c.stopAt200title}</h3></div>
              <ul className="space-y-4">{c.stopAt200list.map((item, idx) => (<li key={idx} className="flex items-start gap-3 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />{item}</li>))}</ul>
              <div className="mt-6 pt-6 border-t border-white/10"><p className="text-sm text-text/50">{c.stopAt200footer}</p></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
              <div className="flex items-center gap-3 mb-6"><TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.stretchTo500title}</h3></div>
              <ul className="space-y-4">{c.stretchTo500list.map((item, idx) => (<li key={idx} className="flex items-start gap-3 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />{item}</li>))}</ul>
              <div className="mt-6 pt-6 border-t border-white/10"><p className="text-sm text-text/50">{c.stretchTo500footer}</p></div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.nextSection.title} <span className="italic text-text/50">{c.nextSection.titleItalic}</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4"><Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.tier1000title}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">{c.tier1000desc}</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://1000-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.r1000link}</a>
                <a href="https://1000-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.e1000link}</a>
              </div>
            </div>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4"><TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.caseStudiesTitle}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">{c.caseStudiesDesc}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.rCaseLink}</Link>
                <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.eCaseLink}</Link>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-3xl font-display mb-6">{c.bottomLine.title}</h2>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">{c.bottomLine.desc}</p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-xl text-text/80"><span className="text-green-500">{c.bottomLine.two}</span><br /><span className="text-[hsl(var(--accent-gold))]">{c.bottomLine.five}</span></p>
            </div>
            <p className="text-text/60 mt-6">{c.bottomLine.footer}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.cheaperSection.title}{" "}<span className="italic text-text/50">{c.cheaperSection.titleItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.cheaperSection.desc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Link href={`/${locale}/blog/why-not-to-buy-cheap-websites`} className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4"><XCircle className="h-5 w-5 text-red-400" /><h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">{c.cheapBlog1title}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed">{c.cheapBlog1desc}</p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">{c.readPost} <ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link href={`/${locale}/blog/what-100-dollar-website-gets-you`} className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4"><Target className="h-5 w-5 text-orange-400" /><h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">{c.cheapBlog2title}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed">{c.cheapBlog2desc}</p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">{c.readPost} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.ctaSection.title}{" "}<span className="italic text-text/50">{c.ctaSection.titleItalic}</span></h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">{c.ctaSection.desc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/contact`} className="btn-premium"><span>{c.ctaSection.startBtn}</span></Link>
              <Link href={`/${locale}/blog`} className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500">
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">{c.ctaSection.backBtn}</span>
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
