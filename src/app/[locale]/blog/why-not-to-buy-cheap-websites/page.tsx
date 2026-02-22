"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Smartphone,
  XCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { Locale, getDictionarySync } from "@/lib/i18n";

type PageContent = {
  eyebrow: string;
  h1a: string;
  h1b: string;
  intro: string;
  badge1: string;
  badge2: string;
  badge3: string;
  seeItSection: { title: string; desc: string; btn1: string; btn2: string };
  experiencedSection: { title: string; titleItalic: string; desc: string };
  problems: { title: string; description: string }[];
  realCostSection: { title: string; titleItalic: string; desc: string };
  trustCard: { title: string; body: string };
  mobileCard: { title: string; body: string };
  speedCard: { title: string; body: string };
  payingSection: { title: string; titleItalic: string };
  tableHeaders: { feature: string; cheap: string; good: string };
  comparison: { feature: string; cheap: string; good: string }[];
  tableCallout: string;
  tableLink1: string;
  tableLink2: string;
  hiddenSection: { title: string };
  hiddenCosts: string[];
  hiddenSummary: string;
  whenSection: { good: string; bad: string };
  whenItMakesSense: string[];
  altSection: { title: string; desc: string };
  altList: string[];
  bottomLine: { title: string; main: string; desc: string; highlight1: string; real: string; sub: string };
  ctaSection: { title: string; titleItalic: string; desc: string; cta: string; back: string };
};

const contentMap: Record<string, PageContent> = {
  en: {
    eyebrow: "Business Advice",
    h1a: "Why a $20 Website",
    h1b: "Will Cost You Thousands",
    intro: "You found a deal. Someone offered to build your business website for $20. Here's what that $20 actually costs you.",
    badge1: "No Jargon",
    badge2: "Real Demos",
    badge3: "Honest Advice",
    seeItSection: {
      title: "See It For Yourself",
      desc: "I built a $20 website intentionally to show you what that money buys. Open it on your phone. Wait for it to load. Try to find the menu.",
      btn1: "Open $20 Restaurant",
      btn2: "Open $20 Ecommerce",
    },
    experiencedSection: {
      title: "What You",
      titleItalic: "Just Experienced",
      desc: "If you opened the demo, here's what you saw.",
    },
    problems: [
      { title: "5+ Second Load Time", description: "Visitors stare at a blank screen before anything appears" },
      { title: "Placeholder Text", description: '"Hello World" and "Sample Page" still visible on the site' },
      { title: "Broken on Mobile", description: "Buttons cut off, text unreadable on phones" },
      { title: "Links Go Nowhere", description: "Contact pages, menus, and buttons don't work" },
    ],
    realCostSection: { title: "The Real", titleItalic: "Cost", desc: "A bad website doesn't just look cheap, it actively repels customers." },
    trustCard: {
      title: "Trust is Everything",
      body: 'When someone visits your website, they\'re asking one question: Is this a real business? A $20 website answers "no" before they read a single word. Broken links, placeholder text, slow loading: these aren\'t just aesthetic problems. They\'re trust problems.',
    },
    mobileCard: {
      title: "The Mobile Problem",
      body: "Most web traffic now comes from phones. A $20 website is built for desktop, tested once, and never checked again. Your customers are browsing on phones during lunch breaks and commutes. Broken on mobile means invisible to them.",
    },
    speedCard: {
      title: "The Speed Problem",
      body: "Nobody waits anymore. If your site takes 5 seconds to load, most visitors have already left. They hit the back button and clicked your competitor's link instead.",
    },
    payingSection: { title: "What You're", titleItalic: "Paying For" },
    tableHeaders: { feature: "Feature", cheap: "$20 Website", good: "$500+ Website" },
    comparison: [
      { feature: "Load Time", cheap: "5+ seconds", good: "Under 1 second" },
      { feature: "Mobile Experience", cheap: "Broken", good: "Perfect on all devices" },
      { feature: "Customization", cheap: "None, generic template", good: "Branded to your business" },
      { feature: "Contact Info", cheap: "Maybe correct", good: "Clickable phone, map, forms" },
      { feature: "SEO", cheap: "None", good: "Optimized for Google" },
      { feature: "Trust Factor", cheap: "Hurts your reputation", good: "Builds credibility" },
    ],
    tableCallout: "Want to see every tier from $20 to $10,000? I built them all.",
    tableLink1: "Restaurant Case Study →",
    tableLink2: "Ecommerce Case Study →",
    hiddenSection: { title: "The Hidden Problem: You'll Pay Twice" },
    hiddenCosts: ["You buy the $20 site", "It doesn't work", "Customers complain", "You realize you need something better", "Now you're paying again, for the website you should have bought in the first place"],
    hiddenSummary: "That $20 decision just cost you $520 instead of $500.",
    whenSection: { good: "When a $20 Website Makes Sense", bad: "A Better Alternative: Google Business Profile" },
    whenItMakesSense: ["You're testing a business idea before committing", "You literally have zero budget and need something today", "You're a hobbyist, not a business"],
    altSection: {
      title: "A Better Alternative: Google Business Profile",
      desc: "If budget is tight, don't buy a $20 website. Set up a Google Business Profile instead.",
    },
    altList: ["It's free", "Shows up in local searches", "Displays hours, photos, and reviews", "Customers can call with one tap"],
    bottomLine: {
      title: "The Bottom Line",
      main: "Your website is often the first thing customers see. It's either",
      highlight1: "working for you",
      desc: "or against you.",
      real: "A $20 website works against you. It tells customers you don't care, you're not professional, and you might not even be a real business.",
      sub: "The real cost isn't $20.\nIt's every customer who clicked away.",
    },
    ctaSection: {
      title: "See For",
      titleItalic: "Yourself",
      desc: "Don't take my word for it. Open the demos on your phone. Time how long they take to load. Try to find contact information. Then ask yourself: Would I trust this business?",
      cta: "$20 Restaurant Demo",
      back: "← Back to Blog",
    },
  },
  ar: {
    eyebrow: "نصائح للأعمال",
    h1a: "لماذا سيكلفك الموقع بـ 20$",
    h1b: "آلاف الدولارات من العملاء",
    intro: "وجدت صفقة. عرض عليك أحدهم بناء موقع أعمالك بـ 20$. هنا ما يكلفك هذا الـ 20$ فعلاً.",
    badge1: "بلا مصطلحات تقنية",
    badge2: "عروض حقيقية",
    badge3: "نصيحة صادقة",
    seeItSection: {
      title: "اكتشف بنفسك",
      desc: "بنيت موقعاً بـ 20$ عن قصد لأريك ما يشتريه هذا المال. افتحه على هاتفك. انتظر تحميله. حاول إيجاد القائمة.",
      btn1: "افتح مطعم 20$",
      btn2: "افتح متجر 20$",
    },
    experiencedSection: {
      title: "ما الذي",
      titleItalic: "شاهدته للتو",
      desc: "إن فتحت العرض التوضيحي، إليك ما رأيته.",
    },
    problems: [
      { title: "وقت تحميل يتجاوز 5 ثوانٍ", description: "الزوار يحدقون في شاشة فارغة قبل أن يظهر أي شيء" },
      { title: "نصوص تجريبية", description: '"مرحباً بالعالم" و"صفحة نموذجية" لا تزال ظاهرة في الموقع' },
      { title: "معطل على الجوال", description: "الأزرار مقطوعة، النصوص غير قابلة للقراءة على الهواتف" },
      { title: "الروابط لا تعمل", description: "صفحات التواصل والقوائم والأزرار لا تعمل" },
    ],
    realCostSection: { title: "التكلفة", titleItalic: "الحقيقية", desc: "الموقع السيئ لا يبدو رخيصاً فحسب، بل يطرد العملاء بشكل فعلي." },
    trustCard: {
      title: "الثقة هي كل شيء",
      body: 'عندما يزور أحدهم موقعك، يسأل سؤالاً واحداً: هل هذا عمل حقيقي؟ الموقع بـ 20$ يجيب بـ "لا" قبل أن يقرأ كلمة واحدة. الروابط المعطوبة، النصوص التجريبية، بطء التحميل: هذه ليست مجرد مشاكل جمالية. إنها مشاكل ثقة.',
    },
    mobileCard: {
      title: "مشكلة الهاتف",
      body: "معظم زيارات الويب الآن تأتي من الهواتف. الموقع بـ 20$ مبني للكمبيوتر، يُختبر مرة، ولا يُراجع مجدداً. عملاؤك يتصفحون على هواتفهم خلال استراحة الغداء والتنقل. معطل على الجوال يعني غير مرئي لهم.",
    },
    speedCard: {
      title: "مشكلة السرعة",
      body: "لا أحد ينتظر بعد الآن. إن استغرق موقعك 5 ثوانٍ للتحميل، فمعظم الزوار غادروا بالفعل. ضغطوا زر الرجوع ونقروا على رابط منافسك.",
    },
    payingSection: { title: "ما الذي", titleItalic: "تدفع مقابله" },
    tableHeaders: { feature: "الميزة", cheap: "موقع 20$", good: "موقع 500$+" },
    comparison: [
      { feature: "وقت التحميل", cheap: "5+ ثوانٍ", good: "أقل من ثانية" },
      { feature: "تجربة الجوال", cheap: "معطوب", good: "مثالي على كل الأجهزة" },
      { feature: "التخصيص", cheap: "لا شيء، قالب عام", good: "يعكس هوية عملك" },
      { feature: "معلومات التواصل", cheap: "ربما صحيحة", good: "هاتف قابل للنقر، خريطة، نماذج" },
      { feature: "تحسين البحث (SEO)", cheap: "لا شيء", good: "محسّن لجوجل" },
      { feature: "مستوى الثقة", cheap: "يضر بسمعتك", good: "يبني المصداقية" },
    ],
    tableCallout: "تريد رؤية كل مستوى من 20$ إلى 10,000$؟ بنيتها جميعاً.",
    tableLink1: "دراسة حالة المطاعم ←",
    tableLink2: "دراسة حالة التجارة الإلكترونية ←",
    hiddenSection: { title: "المشكلة الخفية: ستدفع مرتين" },
    hiddenCosts: ["تشتري الموقع بـ 20$", "لا يعمل", "العملاء يشكون", "تدرك أنك تحتاج شيئاً أفضل", "الآن تدفع مجدداً، للموقع الذي كان يجب أن تشتريه من البداية"],
    hiddenSummary: "قرار الـ 20$ هذا كلفك 520$ بدلاً من 500$.",
    whenSection: { good: "متى يكون الموقع بـ 20$ منطقياً", bad: "بديل أفضل: ملف نشاطي التجاري على جوجل" },
    whenItMakesSense: ["أنت تختبر فكرة تجارية قبل الالتزام", "لديك صفر ميزانية وتحتاج شيئاً اليوم", "أنت هاوٍ، لا صاحب عمل"],
    altSection: {
      title: "بديل أفضل: ملف نشاطي التجاري على جوجل",
      desc: "إن كانت الميزانية ضيقة، لا تشتر موقعاً بـ 20$. أنشئ ملف نشاطي التجاري على جوجل بدلاً من ذلك.",
    },
    altList: ["مجاني تماماً", "يظهر في نتائج البحث المحلية", "يعرض أوقات العمل والصور والمراجعات", "العملاء يتصلون بنقرة واحدة"],
    bottomLine: {
      title: "الخلاصة",
      main: "موقعك غالباً هو أول ما يراه العملاء. إما أنه",
      highlight1: "يعمل لصالحك",
      desc: "أو ضدك.",
      real: "الموقع بـ 20$ يعمل ضدك. يخبر العملاء أنك لا تهتم، لست محترفاً، وربما لست عملاً حقيقياً.",
      sub: "التكلفة الحقيقية ليست 20$.\nإنها كل عميل نقر للخروج.",
    },
    ctaSection: {
      title: "اكتشف",
      titleItalic: "بنفسك",
      desc: "لا تصدقني على كلامي. افتح العروض على هاتفك. قِس كم تستغرق للتحميل. حاول إيجاد معلومات التواصل. ثم اسأل نفسك: هل سأثق بهذا العمل؟",
      cta: "عرض مطعم 20$",
      back: "← العودة إلى المدونة",
    },
  },
};

export default function WhyNotCheapWebsitesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<PageContent>(contentMap.en);

  useEffect(() => {
    params.then(({ locale: l }) => {
      setLocale(l);
      setC(contentMap[l] ?? contentMap.en);
    });
  }, [params]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              {c.eyebrow}
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            {c.h1a} <br />
            <span className="italic text-text/50">{c.h1b}</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label={c.badge1} />
            <Badge label={c.badge2} />
            <Badge label={c.badge3} />
          </div>
        </motion.header>

        {/* See it yourself */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display mb-6 text-center">{c.seeItSection.title}</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">{c.seeItSection.desc}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://20-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300">
                  <span className="text-sm font-semibold uppercase tracking-wider">{c.seeItSection.btn1}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="https://20-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <span className="text-sm font-semibold uppercase tracking-wider text-text/70">{c.seeItSection.btn2}</span>
                  <ExternalLink className="h-4 w-4 text-text/70" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Problems */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.experiencedSection.title}{" "}
              <span className="italic text-text/50">{c.experiencedSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.experiencedSection.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.problems.map((problem, index) => {
              const icons = [Clock, AlertTriangle, Smartphone, XCircle];
              const Icon = icons[index];
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 border-red-500/20 hover:border-red-500/40 transition-all duration-500"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-display mb-2">{problem.title}</h3>
                  <p className="text-sm text-text/60">{problem.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Real Cost */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.realCostSection.title} <span className="italic text-text/50">{c.realCostSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.realCostSection.desc}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[c.trustCard, c.mobileCard, c.speedCard].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-4">{card.title}</div>
                <p className="text-sm text-text/60 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.payingSection.title}{" "}
              <span className="italic text-text/50">{c.payingSection.titleItalic}</span>
            </h2>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
              <div className="font-display text-text/80">{c.tableHeaders.feature}</div>
              <div className="font-display text-red-400 text-center">{c.tableHeaders.cheap}</div>
              <div className="font-display text-green-400 text-center">{c.tableHeaders.good}</div>
            </div>
            {c.comparison.map((row, idx) => (
              <div key={row.feature} className={`grid grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <div className="text-text/70">{row.feature}</div>
                <div className="text-red-400/80 text-center text-sm">{row.cheap}</div>
                <div className="text-green-400/80 text-center text-sm">{row.good}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-[hsl(var(--accent-gold))]/5 border border-[hsl(var(--accent-gold))]/20 rounded-lg text-center">
            <p className="text-text/70 mb-4">{c.tableCallout}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/case-studies/restaurant-websites-tiers`}
                className="text-[hsl(var(--accent-gold))] hover:underline font-medium">{c.tableLink1}</Link>
              <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`}
                className="text-[hsl(var(--accent-gold))] hover:underline font-medium">{c.tableLink2}</Link>
            </div>
          </div>
        </motion.section>

        {/* Pay Twice */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border-l-4 border-l-[hsl(var(--accent-gold))]">
            <div className="flex items-center gap-4 mb-6">
              <RefreshCw className="h-6 w-6 text-[hsl(var(--accent-gold))]" />
              <h2 className="text-2xl font-display">{c.hiddenSection.title}</h2>
            </div>
            <div className="space-y-4 mb-8">
              {c.hiddenCosts.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-text/70">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-lg text-text/80">{c.hiddenSummary}</p>
            </div>
          </div>
        </motion.section>

        {/* When it makes sense + Alt */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="text-xl font-display">{c.whenSection.good}</h3>
              </div>
              <ul className="space-y-4">
                {c.whenItMakesSense.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text/60">
                    <ArrowRight className="h-4 w-4 text-green-400 mt-0.5 shrink-0 rtl:rotate-180" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">{c.altSection.title}</h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-4">{c.altSection.desc}</p>
              <ul className="space-y-3">
                {c.altList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text/60">
                    <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Bottom Line */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-3xl font-display mb-6">{c.bottomLine.title}</h2>
            <div className="text-xl md:text-2xl font-display leading-relaxed mb-8 max-w-2xl mx-auto">
              {c.bottomLine.main}{" "}
              <span className="text-[hsl(var(--accent-gold))]">{c.bottomLine.highlight1}</span>
              {" "}{c.bottomLine.desc}
            </div>
            <p className="text-lg text-text/60 mb-8">{c.bottomLine.real}</p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-lg text-text/80 whitespace-pre-line">
                <strong>{c.bottomLine.sub.split("\n")[0]}</strong>
                <br />{c.bottomLine.sub.split("\n")[1]}
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.ctaSection.title} <span className="italic text-text/50">{c.ctaSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">{c.ctaSection.desc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://20-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-premium">
                <span>{c.ctaSection.cta}</span>
              </a>
              <a href="https://20-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500">
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">$20 Ecommerce Demo</span>
              </a>
            </div>
            <div className="mt-12">
              <Link href={`/${locale}/blog`} className="text-sm text-text/50 hover:text-[hsl(var(--accent-gold))] transition-colors">
                {c.ctaSection.back}
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />
      {label}
    </span>
  );
}
