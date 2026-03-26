"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink, ArrowRight, CheckCircle, XCircle,
} from "lucide-react";
import { Locale } from "@/i18n.config";

type DemoRow = { price: string; url: string; speed: string; mobile: string; verdict: string };
type PriceRange = { range: string; label: string; verdict: string; color: string; description: string };
type Recommendation = { type: string; budget: string; description: string };
type Faq = { question: string; answer: string };

type PageContent = {
  eyebrow: string; h1: string; intro: string; meta1: string; meta2: string; meta3: string; meta4: string;
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
  ctaTitle: string; ctaDesc: string; ctaBtn: string; ctaCaseBtn: string; ctaBack: string;
};

const en: PageContent = {
  eyebrow: "Website Pricing Guide", h1: "How Much Does a Website Cost?",
  intro: "A lot of people talk about website pricing like it's some mysterious thing. It isn't. I built 15 live demos so you can see what each budget actually buys, from $20 all the way to $10,000.",
  meta1: "Updated February 2026", meta2: "15 Live Demos", meta3: "12 min read", meta4: "By Khalil AbdalMageed",
  quickAnswerLabel: "Quick Answer",
  quickAnswerQ: "How much does a website cost?",
  quickAnswerA: "Anything from $20 to $10,000+. But if you want the honest version: under $200 is usually a compromise, $200-$500 is where a real business website starts, $500+ is where it starts helping you compete, and $1,000+ is where it begins doing actual work for the business.",
  priceRangesTitle: "Website Cost by Budget",
  priceRanges: [
    { range: "$20 - $100", label: "Cheap Placeholder", verdict: "Fine for hobbies, bad for real business", color: "red", description: "This is the range where websites mostly just exist. They are slow, limited, and usually embarrassing on mobile." },
    { range: "$200 - $500", label: "Real Business Website", verdict: "Best starting point for most people", color: "green", description: "This is where the site stops being a liability. It loads properly, works on phones, and makes you look like a real business." },
    { range: "$500 - $1,000", label: "Competitive Website", verdict: "For businesses that need to look serious", color: "gold", description: "Better design, stronger UX, more polish, more useful features. This is where you stop looking small online." },
    { range: "$1,000 - $2,000", label: "Business System", verdict: "The site starts doing work for you", color: "gold", description: "Now you're paying for workflows, automation, customer handling, and real business logic instead of just pages." },
    { range: "$2,000 - $5,000", label: "Growth Stage", verdict: "For teams, multiple locations, and expansion", color: "purple", description: "This range is about complexity: more locations, more integrations, more moving parts, more things the site has to handle well." },
    { range: "$5,000 - $10,000+", label: "Custom Platform", verdict: "When the website is part of operations", color: "purple", description: "This is not brochure-site money. This is platform money. Custom flows, advanced integrations, and technology the business relies on." },
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
  bottomLineTitle: "The Bottom Line", bottomLineDesc: "Most people don't need a $10,000 website. But a lot more people need more than a $20 or $100 website. That is the honest middle ground.",
  bottomLineCost: "A Cost", bottomLineCostDesc: "Cheap websites usually save money only on paper",
  bottomLineInv: "An Investment", bottomLineInvDesc: "$200+ is where your website starts helping instead of hurting",
  ctaTitle: "Ready to See the Difference for Yourself?", ctaDesc: "Open the demos, compare the tiers, and if you already know what level you need, we can talk about building it properly.",
  ctaBtn: "Get a Quote", ctaCaseBtn: "View Case Studies", ctaBack: "← Back to Blog",
};

const ar: PageContent = {
  eyebrow: "دليل أسعار المواقع", h1: "كم تكلفة إنشاء موقع إلكتروني؟",
  intro: "كثير من الناس يتكلمون عن أسعار المواقع كأنها شيء غامض. هي ليست غامضة. بنيت 15 عرضاً حياً حتى تشوف بنفسك كل ميزانية بتجيب شنو، من 20$ لحد 10,000$.",
  meta1: "محدّث في فبراير 2026", meta2: "15 عرض حي", meta3: "قراءة 12 دقيقة", meta4: "بقلم خليل مجيد",
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
  ctaTitle: "مستعد تشوف الفرق بنفسك؟", ctaDesc: "افتح العروض، قارن بين المستويات، وإذا إنت عرفت أي حاجة مناسبك، ممكن نتكلم عن تنفيذها صح.",
  ctaBtn: "احصل على عرض سعر", ctaCaseBtn: "عرض دراسات الحالة", ctaBack: "← العودة إلى المدونة",
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

function DemoTable({ demos, headers, openLabel }: { demos: DemoRow[]; headers: PageContent["tableHeaders"]; openLabel: string }) {
  return (
    <div className="glass-card overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left p-4 font-display">{headers.budget}</th>
              <th className="text-left p-4 font-display">{headers.speed}</th>
              <th className="text-left p-4 font-display">{headers.mobile}</th>
              <th className="text-left p-4 font-display">{headers.demo}</th>
            </tr>
          </thead>
          <tbody>
            {demos.map((demo) => (
              <tr key={demo.price} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 font-display font-semibold">{demo.price}</td>
                <td className={`p-4 ${demo.speed.includes("5+") || demo.speed.includes("3-4") ? "text-red-400" : "text-green-400"}`}>{demo.speed}</td>
                <td className={`p-4 ${demo.mobile === "Broken" ? "text-red-400" : demo.mobile === "Partial" ? "text-orange-400" : "text-green-400"}`}>{demo.mobile}</td>
                <td className="p-4">
                  <a href={demo.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:underline inline-flex items-center gap-1">
                    {openLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HowMuchDoesAWebsiteCostPage({ locale = "en" }: { locale?: Locale }) {
  const c = locale === "ar" ? ar : en;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
      <article className="max-w-4xl mx-auto">
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-tight">{c.h1}</h1>
          <p className="text-xl text-text/60 leading-relaxed mb-8">{c.intro}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text/50">
            <span>{c.meta4}</span><span>•</span><span>{c.meta1}</span><span>•</span><span>{c.meta2}</span><span>•</span><span>{c.meta3}</span>
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16">
          <div className="glass-card p-6 md:p-8 border-[hsl(var(--accent-gold))]/30 bg-[hsl(var(--accent-gold))]/5">
            <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--accent-gold))]">{c.quickAnswerLabel}</h2>
            <p className="text-lg text-text/80 leading-relaxed"><strong>{c.quickAnswerQ}</strong> {c.quickAnswerA}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16" id="price-ranges">
          <h2 className="text-2xl md:text-3xl font-display mb-8">{c.priceRangesTitle}</h2>
          <div className="space-y-4">
            {c.priceRanges.map((tier, index) => (
              <motion.div key={tier.range} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }}
                className={`glass-card p-6 border-l-4 ${tier.color === "red" ? "border-l-red-500" : tier.color === "green" ? "border-l-green-500" : tier.color === "gold" ? "border-l-[hsl(var(--accent-gold))]" : "border-l-purple-500"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div><span className="text-2xl font-display font-bold">{tier.range}</span><span className="ml-3 text-text/60">{tier.label}</span></div>
                  <span className={`text-sm ${tier.color === "red" ? "text-red-400" : tier.color === "green" ? "text-green-400" : tier.color === "gold" ? "text-[hsl(var(--accent-gold))]" : "text-purple-400"}`}>{tier.verdict}</span>
                </div>
                <p className="text-text/60">{tier.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16" id="restaurant-demos">
          <h2 className="text-2xl md:text-3xl font-display mb-4">{c.restaurantTitle}</h2>
          <p className="text-text/60 mb-8">{c.restaurantDesc}</p>
          <DemoTable demos={restaurantDemos} headers={c.tableHeaders} openLabel={c.openLabel} />
          <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="inline-flex items-center gap-2 text-[hsl(var(--accent-gold))] hover:underline">
            {c.restaurantCaseLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16" id="ecommerce-demos">
          <h2 className="text-2xl md:text-3xl font-display mb-4">{c.ecommerceTitle}</h2>
          <p className="text-text/60 mb-8">{c.ecommerceDesc}</p>
          <DemoTable demos={ecommerceDemos} headers={c.tableHeaders} openLabel={c.openLabel} />
          <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="inline-flex items-center gap-2 text-[hsl(var(--accent-gold))] hover:underline">
            {c.ecommerceCaseLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16" id="recommendations">
          <h2 className="text-2xl md:text-3xl font-display mb-8">{c.recommendationsTitle}</h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 font-display">{c.recHeaders.type}</th>
                    <th className="text-left p-4 font-display">{c.recHeaders.budget}</th>
                    <th className="text-left p-4 font-display">{c.recHeaders.what}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.recommendations.map((rec, index) => (
                    <tr key={rec.type} className={`border-b border-white/5 ${index % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className="p-4 font-semibold">{rec.type}</td>
                      <td className="p-4 text-[hsl(var(--accent-gold))] font-display">{rec.budget}</td>
                      <td className="p-4 text-text/60">{rec.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16" id="faq">
          <h2 className="text-2xl md:text-3xl font-display mb-8">{c.faqTitle}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, index) => (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-text/60 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-6">{c.bottomLineTitle}</h2>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">{c.bottomLineDesc}</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2"><XCircle className="h-4 w-4" />{c.bottomLineCost}</div>
                <p className="text-sm text-text/60">{c.bottomLineCostDesc}</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 font-semibold mb-2"><CheckCircle className="h-4 w-4" />{c.bottomLineInv}</div>
                <p className="text-sm text-text/60">{c.bottomLineInvDesc}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center py-12">
          <h2 className="text-2xl md:text-3xl font-display mb-4">{c.ctaTitle}</h2>
          <p className="text-text/60 mb-8 max-w-lg mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn-premium"><span>{c.ctaBtn}</span></Link>
            <Link href={`/${locale}/case-studies`} className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all">
              <span className="text-sm font-semibold uppercase tracking-wider">{c.ctaCaseBtn}</span>
            </Link>
          </div>
          <div className="mt-8">
            <Link href={`/${locale}/blog`} className="text-sm text-text/50 hover:text-[hsl(var(--accent-gold))] transition-colors">{c.ctaBack}</Link>
          </div>
        </motion.section>
      </article>
    </main>
  );
}
