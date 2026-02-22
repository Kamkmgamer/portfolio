"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Users, Heart, Zap, Palette } from "lucide-react";
import { Locale } from "@/i18n.config";

type C = {
  eyebrow: string; h1: string; h1i: string; intro: string;
  b1: string; b2: string; b3: string;
  statsLabels: string[]; statsDescs: string[];
  statValues: string[];
  situationTitle: string; situationItalic: string; situationDesc: string;
  problemTitle: string; problemPoints: string[];
  realIssueTitle: string; realIssueP1: string; realIssueP2: string;
  approachTitle: string; approachItalic: string; approachDesc: string;
  approach: { step: string; title: string; description: string }[];
  techTitle: string; techItalic: string; techDesc: string;
  techCategories: string[];
  techItems: string[][];
  resultsTitle: string; resultsDesc: string; results: string[]; resultsQuote: string;
  whyTitle: string; whyItalic: string;
  whyP1: string; whyP2: string;
  whyCard1: string; whyCard2: string;
  ctaTitle: string; ctaDesc: string; ctaBtn: string; ctaSec: string;
};

const en: C = {
  eyebrow: "Product Design", h1: "Reducing", h1i: "Friction",
  intro: "A business had a good product but a weak website. Here's how we fixed that.",
  b1: "Discovery", b2: "Design", b3: "Development",
  statsLabels: ["Project Type", "Approach", "Focus", "Result"],
  statsDescs: ["Premium digital presence", "Ideas to execution", "Emotion-driven design", "Proud to share"],
  statValues: ["Web Design", "Discovery", "Experience", "Confidence"],
  situationTitle: "The", situationItalic: "Situation",
  situationDesc: "A founder had a good product but a website that didn't match. They knew their offering was solid, but every time they shared their site, they'd wince a little.",
  problemTitle: "What Wasn't Working",
  problemPoints: ["Site looked generic, like dozens of competitors", "Didn't communicate quality or credibility", "Visitors weren't sticking around", "Past dev experiences meant constant back-and-forth", "Technical decisions felt overwhelming", "No clear vision of what better looked like"],
  realIssueTitle: "The Real Issue",
  realIssueP1: "No detailed brief. No moodboard. Just a gut feeling that their brand deserved better, without knowing what better actually looked like.",
  realIssueP2: "The problem wasn't code or pixels. It was the disconnect between what they pictured and what existed.",
  approachTitle: "My", approachItalic: "Approach", approachDesc: "How we got from scattered thoughts to something solid",
  approach: [
    { step: "01", title: "Started with Clarity", description: "No mockups yet. Just conversations about what feeling they wanted visitors to have. What matters most to their business? What should someone think in those first few seconds?" },
    { step: "02", title: "Designed for Humans", description: "Static pages are boring. I built an experience with animations that feel natural, spacing that breathes, and interactions that guide without getting in the way." },
    { step: "03", title: "Built to Last", description: "Picked tools that prioritize clean code and performance. No need to rebuild in two years. Just room to grow and iterate." },
    { step: "04", title: "Handled the Hard Stuff", description: "They ran their business. I handled the tech decisions, explained things in plain English, and didn't overwhelm them with choices they didn't need to make." },
  ],
  techTitle: "Technology", techItalic: "Stack", techDesc: "Tools and approach for lasting results",
  techCategories: ["Frontend", "Design", "Performance", "Process"],
  techItems: [
    ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    ["Intentional spacing", "Typography system", "Motion design", "Micro-interactions"],
    ["Optimized assets", "Fast load times", "Smooth animations", "Responsive design"],
    ["Discovery sessions", "Clear communication", "Minimal jargon", "Quiet execution"],
  ],
  resultsTitle: "What Changed", resultsDesc: "Beyond just a new website",
  results: ["Site actually reflects what they do", "Looks professional without being stuffy", "First impressions are now positive", "People take the brand more seriously", "Easy to add features later", "They're proud to share the link"],
  resultsQuote: "The biggest shift was their confidence. They're actually proud to share their website now.",
  whyTitle: "Why This", whyItalic: "Matters",
  whyP1: "This is the work I enjoy most. It's not about fancy features or trendy animations. It's about closing the gap between what someone pictures in their head and what actually shows up on screen.",
  whyP2: "Good design sense plus solid engineering plus actually listening to people. That's how you turn a headache into something you're genuinely proud of.",
  whyCard1: "From rough ideas to real products", whyCard2: "From uncertainty to confidence",
  ctaTitle: "Have a Rough Idea?",
  ctaDesc: "I help businesses figure out what they actually need and then build it. No jargon, no unnecessary complexity. Just a website that works and feels right.",
  ctaBtn: "Let's Work Together", ctaSec: "View More Case Studies",
};

const ar: C = {
  eyebrow: "تصميم المنتج", h1: "تقليل", h1i: "الاحتكاك",
  intro: "منتج جيد، موقع ضعيف. هكذا أصلحنا ذلك.",
  b1: "اكتشاف", b2: "تصميم", b3: "تطوير",
  statsLabels: ["نوع المشروع", "الأسلوب", "التركيز", "النتيجة"],
  statsDescs: ["حضور رقمي يعكس القيمة", "من الفوضى إلى الوضوح", "تجربة تُشعر بالصواب", "فخور يشاركه"],
  statValues: ["تصميم ويب", "اكتشاف", "تجربة", "ثقة"],
  situationTitle: "الحكاية", situationItalic: "من البداية",
  situationDesc: "صاحب مشروع عنده منتج متين. بس كل مرة يبعث الرابط لأحد، يتمنى أنه ما بعثه.",
  problemTitle: "ما كان يعمل",
  problemPoints: ["يشبه مئة موقع تاني", "ما يعكس الجودة ولا المصداقية", "الناس تدخل وتطلع بسرعة", "تجارب التطوير القديمة كانت متعبة", "القرارات التقنية تبدو معقدة", "ما في صورة واضحة لما يبدو عليه الأفضل"],
  realIssueTitle: "المشكلة الحقيقية",
  realIssueP1: "ما في ملخص. ما في مودبورد. فقط إحساس أن العلامة التجارية تستحق أكثر.",
  realIssueP2: "المشكلة مش في الكود. في المسافة بين اللي يتخيله وما هو موجود.",
  approachTitle: "أسلوبي", approachItalic: "في العمل", approachDesc: "كيف انتقلنا من أفكار متشتتة إلى شيء متماسك",
  approach: [
    { step: "01", title: "البدء بالوضوح", description: "لا نماذج بعد. فقط محادثات حول الشعور الذي يريدون أن يشعر به الزوار. ما الأهم لعملهم؟ ماذا يجب أن يفكر شخص في تلك الثواني الأولى؟" },
    { step: "02", title: "التصميم للإنسان", description: "الصفحات الثابتة مملة. بنيت تجربة بحركات تبدو طبيعية، ومساحات تتنفس، وتفاعلات ترشد دون أن تعيق." },
    { step: "03", title: "للمستقبل", description: "اخترت أدوات تعطي الأولوية للكود النظيف والأداء. لا حاجة لإعادة البناء بعد سنتين. فقط مجال للنمو والتطوير." },
    { step: "04", title: "التعامل مع الصعوبات", description: "أداروا أعمالهم. وتوليت القرارات التقنية، شرحت الأشياء بلغة بسيطة، ولم أثقل عليهم بخيارات لم يكونوا بحاجة لاتخاذها." },
  ],
  techTitle: "التقنيات", techItalic: "المستخدمة", techDesc: "أدوات وأسلوب لنتائج دائمة",
  techCategories: ["الواجهة الأمامية", "التصميم", "الأداء", "العملية"],
  techItems: [
    ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    ["مسافات مقصودة", "نظام طباعة", "تصميم حركي", "تفاعلات مصغرة"],
    ["أصول محسّنة", "تحميل سريع", "حركات سلسة", "تصميم متجاوب"],
    ["جلسات استكشاف", "تواصل واضح", "مصطلحات بسيطة", "تنفيذ هادئ"],
  ],
  resultsTitle: "ما الذي تغير", resultsDesc: "ما هو أبعد من مجرد موقع جديد",
  results: ["الموقع الآن يعكس ما يفعلونه فعلاً", "يبدو احترافياً دون أن يكون متصلباً", "الانطباعات الأولى أصبحت إيجابية", "الناس يأخذون العلامة التجارية بجدية أكبر", "سهل إضافة ميزات لاحقاً", "أصبحوا فخورين بمشاركة الرابط"],
  resultsQuote: "أكبر تحول كان في ثقتهم. أصبحوا فعلاً فخورين بمشاركة موقعهم الآن.",
  whyTitle: "لماذا", whyItalic: "هذا مهم",
  whyP1: "هذا هو العمل الذي أستمتع به أكثر. لا يتعلق الأمر بالميزات المزخرفة أو الحركات الرائجة. يتعلق بسد الهوة بين ما يتخيله شخص في ذهنه وما يظهر فعلاً على الشاشة.",
  whyP2: "حس تصميمي جيد زائد هندسة متينة زائد الإنصات الحقيقي للناس. هكذا تحول الصداع إلى شيء تفخر به حقاً.",
  whyCard1: "من أفكار خامة إلى منتجات حقيقية", whyCard2: "من القلق إلى الثقة",
  ctaTitle: "لديك فكرة خامة؟",
  ctaDesc: "أساعد الأعمال على معرفة ما تحتاجه فعلاً ثم بنائه. لا مصطلحات تقنية، لا تعقيد غير ضروري. فقط موقع يعمل ويشعرك بالصواب.",
  ctaBtn: "دعنا نعمل معاً", ctaSec: "عرض المزيد من دراسات الحالة",
};

const statIcons = [Palette, Lightbulb, Heart, Rocket];

export default function ReducingFrictionCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<C>(en);
  useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
      <div className="max-w-7xl mx-auto">
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.eyebrow}</span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-8">{c.h1} <br /><span className="italic text-text/50">{c.h1i}</span></h1>
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-4"><Badge label={c.b1} /><Badge label={c.b2} /><Badge label={c.b3} /></div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statIcons.map((Icon, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8 text-center group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4"><Icon className="h-5 w-5" /></div>
                <div className="text-3xl font-display font-semibold mb-2">{c.statValues[i]}</div>
                <div className="text-sm font-semibold text-text/80 mb-1">{c.statsLabels[i]}</div>
                <div className="text-xs text-text/50">{c.statsDescs[i]}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.situationTitle} <span className="italic text-text/50">{c.situationItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.situationDesc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-l-2 border-l-text/20">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><Users className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />{c.problemTitle}</h3>
              <ul className="space-y-4">{c.problemPoints.map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-bronze))] mt-2 shrink-0" />{item}</li>))}</ul>
            </div>
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><Lightbulb className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.realIssueTitle}</h3>
              <p className="text-sm text-text/60 leading-relaxed mb-4">{c.realIssueP1}</p>
              <p className="text-sm text-text/60 leading-relaxed">{c.realIssueP2}</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.approachTitle} <span className="italic text-text/50">{c.approachItalic}</span></h2>
            <p className="text-lg text-text/60">{c.approachDesc}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {c.approach.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-sm font-bold">{step.step}</span>
                  <div><h3 className="text-xl font-display mb-3">{step.title}</h3><p className="text-sm text-text/60 leading-relaxed">{step.description}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.techTitle} <span className="italic text-text/50">{c.techItalic}</span></h2>
            <p className="text-lg text-text/60">{c.techDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.techCategories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-6 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/40 mb-4">{cat}</h3>
                <div className="space-y-2">{c.techItems[i].map((tech, idx) => (<div key={idx} className="flex items-center gap-3 text-sm text-text/70"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))]" />{tech}</div>))}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="text-center mb-8">
              <Rocket className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
              <h2 className="text-3xl font-display mb-2">{c.resultsTitle}</h2>
              <p className="text-text/60">{c.resultsDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {c.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-sm text-text/70">{r}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-[hsl(var(--accent-gold))]/10">
              <p className="text-center text-lg text-text/80 italic">{c.resultsQuote}</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.whyTitle} <span className="italic text-text/50">{c.whyItalic}</span></h2></div>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <p className="text-lg text-text/70 leading-relaxed mb-6">{c.whyP1}</p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="text-center p-6 bg-white/5"><Zap className="h-6 w-6 text-[hsl(var(--accent-gold))] mx-auto mb-3" /><p className="text-sm text-text/60">{c.whyCard1}</p></div>
                <div className="text-center p-6 bg-white/5"><Heart className="h-6 w-6 text-[hsl(var(--accent-gold))] mx-auto mb-3" /><p className="text-sm text-text/60">{c.whyCard2}</p></div>
              </div>
              <p className="text-lg text-text/70 leading-relaxed">{c.whyP2}</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.ctaTitle}</h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">{c.ctaDesc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/contact`} className="btn-premium"><span>{c.ctaBtn}</span></Link>
              <Link href={`/${locale}/case-studies`} className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500">
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">{c.ctaSec}</span>
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
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />{label}
    </span>
  );
}
