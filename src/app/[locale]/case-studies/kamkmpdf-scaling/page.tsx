"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, Clock, Database, Cpu, CheckCircle, TrendingUp, DollarSign, Layers } from "lucide-react";
import { Locale } from "@/i18n.config";

const en = {
  eyebrow: "Performance Engineering",
  h1: "Scaling to 6,000", h1i: "PDFs Per Hour",
  intro: "How I optimized a document generation system to process 6,000 PDFs per hour on a single Railway worker, a throughput number that typically requires 5-10 workers.",
  b1: "High Scale", b2: "Single Worker", b3: "99.7% Uptime",
  statsLabels: ["Throughput", "P95 Latency", "Infrastructure", "Success Rate"],
  statsValues: ["6,000/hr", "<2s", "1 Worker", "99.7%"],
  statsDescs: ["PDFs generated per hour", "Response time at 95th percentile", "Single Railway instance", "Job completion rate"],
  challengeTitle: "The", challengeItalic: "Challenge",
  challengeDesc: "KamkmPDF started as a simple Next.js app with a cron job. It worked for 50 users, but when hundreds started uploading simultaneously, the queue backed up. Most teams would deploy 5-10 workers. I wanted to see how far a single optimized worker could go.",
  beforeTitle: "Starting Point",
  beforeRows: [["Throughput", "200-300/hr"], ["Generation time", "5-10s"], ["Concurrent jobs", "3 before crash"], ["AI keys", "1 (rate limits)"]],
  afterTitle: "Final Results",
  afterRows: [["Throughput", "6,000/hr"], ["Generation time", "<2s"], ["Concurrent jobs", "10 stable"], ["AI keys", "11 with failover"]],
  optTitle: "Key", optItalic: "Optimizations", optDesc: "Four major changes that transformed performance",
  optimizations: [
    { title: "Go Worker Rewrite", description: "Migrated from TypeScript to Go for better concurrency and memory efficiency using goroutines.", impact: "2x throughput increase" },
    { title: "Cerebras AI Integration", description: "Implemented priority-based AI model selection with Cerebras GPT-oss-120b as primary for high-speed inference.", impact: "5-10x faster than GPT-4" },
    { title: "Database Optimization", description: "Atomic job claiming with FOR UPDATE SKIP LOCKED, connection pooling, and strategic indexing.", impact: "Query time: 100ms → 5ms" },
    { title: "Browser Pooling", description: "Reusable Puppeteer instances instead of spawning new browsers per job.", impact: "10 concurrent PDFs, same memory" },
  ],
  archTitle: "Architecture", archItalic: "Highlights", archDesc: "Built for horizontal scaling from day one",
  archQueueTitle: "Queue System", archWorkerTitle: "Worker Design",
  archFeatures: ["PostgreSQL-backed queue with atomic job claiming", "Round-robin API key distribution for AI redundancy", "Multi-tier PDF fallback (Puppeteer → PDFKit → Static)", "Browser pool with automatic cleanup and monitoring", "Horizontal scaling ready — just add more workers"],
  techTitle: "Technology", techItalic: "Stack", techDesc: "Carefully chosen for maximum throughput",
  techCategories: ["Frontend", "Worker", "Database", "AI", "PDF Generation", "Storage"],
  techItems: [["Next.js 15", "React 19", "Tailwind CSS", "tRPC"], ["Go", "Goroutines", "Railway", "Docker"], ["PostgreSQL 14", "Drizzle ORM", "Connection Pooling"], ["Cerebras GPT-oss-120b", "OpenRouter", "11 API Keys", "Auto-failover"], ["Puppeteer", "PDFKit", "Browser Pool", "Memory Management"], ["UploadThing v7", "Signed URLs", "File Metadata"]],
  costTitle: "Cost Efficiency", costDesc: "Enterprise throughput, startup budget",
  infraLabel: "Infrastructure", aiLabel: "AI Costs",
  infraRows: [["Single Railway worker", "~$20/mo"], ["PostgreSQL database", "~$15/mo"], ["No Redis or queues", "$0"]],
  aiRows: [["Cerebras GPT-oss-120b", "~$0.002/PDF"], ["At 6,000 PDFs/hour", "~$12/hr"], ["vs GPT-4 equivalent", "5x savings"]],
  costFooter: "Total: ~$35/month infrastructure + usage-based AI costs. Competitors typically spend $200-500/month for similar throughput.",
  ctaTitle: "Ready to Build Something", ctaItalic: "Amazing?",
  ctaDesc: "This case study demonstrates my ability to optimize systems for maximum performance without unnecessary infrastructure complexity. Let's discuss your scaling challenges.",
  ctaBtn: "Let's Work Together", ctaSec: "View More Case Studies",
};

const ar = {
  eyebrow: "هندسة الأداء",
  h1: "التوسع إلى 6,000", h1i: "PDF في الساعة",
  intro: "كيف حسّنت نظام توليد مستندات لمعالجة 6,000 PDF في الساعة على عامل Railway واحد، وهو رقم أداء يتطلب عادةً 5-10 عمال.",
  b1: "توسع عالٍ", b2: "عامل واحد", b3: "99.7% وقت تشغيل",
  statsLabels: ["معدل الإنتاج", "زمن الاستجابة P95", "البنية التحتية", "معدل النجاح"],
  statsValues: ["6,000/ساعة", "أقل من 2 ثانية", "عامل واحد", "99.7%"],
  statsDescs: ["PDF مولَّد في الساعة", "وقت الاستجابة عند الصدارة 95", "مثيل Railway واحد", "معدل إكمال المهام"],
  challengeTitle: "التحدي", challengeItalic: "الأصلي",
  challengeDesc: "بدأ KamkmPDF كتطبيق Next.js بسيط مع وظيفة cron. عمل مع 50 مستخدماً، لكن عندما بدأ المئات بالرفع في وقت واحد، تراكمت قائمة الانتظار. معظم الفرق ستستخدم 5-10 عمال. أردت أن أرى إلى أي مدى يمكن لعامل واحد محسَّن أن يصل.",
  beforeTitle: "نقطة البداية",
  beforeRows: [["معدل الإنتاج", "200-300/ساعة"], ["وقت التوليد", "5-10 ثوانٍ"], ["المهام المتزامنة", "3 قبل الانهيار"], ["مفاتيح AI", "1 (حدود المعدل)"]],
  afterTitle: "النتائج النهائية",
  afterRows: [["معدل الإنتاج", "6,000/ساعة"], ["وقت التوليد", "أقل من 2 ثانية"], ["المهام المتزامنة", "10 مستقرة"], ["مفاتيح AI", "11 مع التبديل التلقائي"]],
  optTitle: "التحسينات", optItalic: "الرئيسية", optDesc: "أربعة تغييرات رئيسية حوّلت الأداء",
  optimizations: [
    { title: "إعادة كتابة العامل بـ Go", description: "نقلت من TypeScript إلى Go. تزامن أفضل وكفاءة ذاكرة أسرع.", impact: "ضعف الإنتاج" },
    { title: "Cerebras AI بدل GPT-4", description: "Cerebras GPT-oss-120b كنموذج رئيسي. أسرع بكثير وتكلفته أقل.", impact: "5-10× أسرع من GPT-4" },
    { title: "تحسين قاعدة البيانات", description: "استطلاع ذري + SKIP LOCKED + تجميع اتصالات + فهرسة صحيحة.", impact: "وقت الاستعلام: 100ms → 5ms" },
    { title: "تجميع المتصفح", description: "Puppeteer بدون إغلاق بين كل طلب. نفس الذاكرة، 10 PDFs متزامنة.", impact: "10 PDFs بنفس الذاكرة" },
  ],
  archTitle: "أبرز", archItalic: "البنية", archDesc: "مبنية للتوسع الأفقي منذ البداية",
  archQueueTitle: "نظام قائمة الانتظار", archWorkerTitle: "تصميم العامل",
  archFeatures: ["قائمة انتظار PostgreSQL مع استطلاع ذري", "توزيع دوري لمفاتيح API لتكرارية AI", "تراجع PDF متعدد الطبقات (Puppeteer → PDFKit → ثابت)", "تجميع متصفح مع تنظيف ومراقبة تلقائية", "جاهز للتوسع الأفقي، فقط أضف عمالاً آخرين"],
  techTitle: "التقنيات", techItalic: "المستخدمة", techDesc: "اختيرت بعناية لأقصى إنتاجية",
  techCategories: ["الواجهة الأمامية", "العامل", "قاعدة البيانات", "الذكاء الاصطناعي", "توليد PDF", "التخزين"],
  techItems: [["Next.js 15", "React 19", "Tailwind CSS", "tRPC"], ["Go", "Goroutines", "Railway", "Docker"], ["PostgreSQL 14", "Drizzle ORM", "تجميع الاتصالات"], ["Cerebras GPT-oss-120b", "OpenRouter", "11 مفتاح API", "تبديل تلقائي"], ["Puppeteer", "PDFKit", "تجميع المتصفح", "إدارة الذاكرة"], ["UploadThing v7", "URLs موقعة", "بيانات الملفات الوصفية"]],
  costTitle: "كفاءة التكلفة", costDesc: "إنتاجية مؤسسية بميزانية ناشئة",
  infraLabel: "البنية التحتية", aiLabel: "تكاليف AI",
  infraRows: [["عامل Railway واحد", "~$20/شهر"], ["قاعدة بيانات PostgreSQL", "~$15/شهر"], ["لا Redis ولا قوائب انتظار", "$0"]],
  aiRows: [["Cerebras GPT-oss-120b", "~$0.002/PDF"], ["عند 6,000 PDF/ساعة", "~$12/ساعة"], ["مقارنةً بـ GPT-4", "توفير 5 أضعاف"]],
  costFooter: "الإجمالي: ~$35/شهر بنية تحتية + تكاليف AI بحسب الاستخدام. المنافسون يدفعون عادةً $200-500/شهر لإنتاجية مماثلة.",
  ctaTitle: "مستعد لبناء شيء", ctaItalic: "مذهل؟",
  ctaDesc: "تُثبت هذه الدراسة قدرتي على تحسين الأنظمة لأقصى أداء دون تعقيد بنية تحتية غير ضروري. دعنا نناقش تحديات التوسع لديك.",
  ctaBtn: "دعنا نعمل معاً", ctaSec: "عرض المزيد من دراسات الحالة",
};

type C = typeof en;
const statIcons = [Server, Clock, Cpu, CheckCircle];

export default function KamkmPDFScalingCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<C>(en);
  useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
      <div className="max-w-7xl mx-auto">
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8"><span className="h-px w-12 bg-[hsl(var(--accent-gold))]" /><span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.eyebrow}</span><span className="h-px w-12 bg-[hsl(var(--accent-gold))]" /></div>
          <h1 className="text-5xl md:text-7xl font-display mb-8">{c.h1} <br /><span className="italic text-text/50">{c.h1i}</span></h1>
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-4"><Badge label={c.b1} /><Badge label={c.b2} /><Badge label={c.b3} /></div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statIcons.map((Icon, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8 text-center group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4 group-hover:bg-[hsl(var(--accent-gold))]/20 transition-colors"><Icon className="h-5 w-5" /></div>
                <div className="text-3xl font-display font-semibold mb-2">{c.statsValues[i]}</div>
                <div className="text-sm font-semibold text-text/80 mb-1">{c.statsLabels[i]}</div>
                <div className="text-xs text-text/50">{c.statsDescs[i]}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.challengeTitle} <span className="italic text-text/50">{c.challengeItalic}</span></h2><p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.challengeDesc}</p></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-l-2 border-l-text/20">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><TrendingUp className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />{c.beforeTitle}</h3>
              <ul className="space-y-4">{c.beforeRows.map(([label, val], i) => (<li key={i} className="flex items-center justify-between text-sm"><span className="text-text/60">{label}</span><span className="font-mono text-text/40">{val}</span></li>))}</ul>
            </div>
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.afterTitle}</h3>
              <ul className="space-y-4">{c.afterRows.map(([label, val], i) => (<li key={i} className="flex items-center justify-between text-sm"><span className="text-text/60">{label}</span><span className="font-mono text-[hsl(var(--accent-gold))] font-semibold">{val}</span></li>))}</ul>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.optTitle} <span className="italic text-text/50">{c.optItalic}</span></h2><p className="text-lg text-text/60">{c.optDesc}</p></div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.optimizations.map((opt, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] shrink-0"><Layers className="h-5 w-5" /></div>
                  <div><h3 className="text-lg font-display mb-2">{opt.title}</h3><p className="text-sm text-text/60 mb-4 leading-relaxed">{opt.description}</p><span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent-gold))]"><TrendingUp className="h-3 w-3" />{opt.impact}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.archTitle} <span className="italic text-text/50">{c.archItalic}</span></h2><p className="text-lg text-text/60">{c.archDesc}</p></div>
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div><h3 className="text-lg font-display mb-6 flex items-center gap-3"><Database className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.archQueueTitle}</h3><ul className="space-y-4">{c.archFeatures.slice(0, 3).map((f, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />{f}</li>))}</ul></div>
              <div><h3 className="text-lg font-display mb-6 flex items-center gap-3"><Server className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.archWorkerTitle}</h3><ul className="space-y-4">{c.archFeatures.slice(3).map((f, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />{f}</li>))}</ul></div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.techTitle} <span className="italic text-text/50">{c.techItalic}</span></h2><p className="text-lg text-text/60">{c.techDesc}</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.techCategories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-6 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/40 mb-4">{cat}</h3>
                <div className="space-y-2">{c.techItems[i].map((tech, idx) => (<div key={idx} className="flex items-center gap-3 text-sm text-text/70"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))]" />{tech}</div>))}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
              <div className="text-center mb-8"><DollarSign className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" /><h2 className="text-3xl font-display mb-2">{c.costTitle}</h2><p className="text-text/60">{c.costDesc}</p></div>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div><h4 className="text-xs font-semibold uppercase tracking-widest text-text/40 mb-4">{c.infraLabel}</h4><ul className="space-y-3 text-sm">{c.infraRows.map(([label, val], i) => (<li key={i} className="flex justify-between"><span className="text-text/60">{label}</span><span className="font-mono">{val}</span></li>))}</ul></div>
                <div><h4 className="text-xs font-semibold uppercase tracking-widest text-text/40 mb-4">{c.aiLabel}</h4><ul className="space-y-3 text-sm">{c.aiRows.map(([label, val], i) => (<li key={i} className="flex justify-between"><span className="text-text/60">{label}</span><span className={`font-mono${i === 2 ? " text-[hsl(var(--accent-gold))]" : ""}`}>{val}</span></li>))}</ul></div>
              </div>
              <div className="pt-6 border-t border-[hsl(var(--accent-gold))]/10 text-center"><p className="text-sm text-text/60">{c.costFooter}</p></div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.ctaTitle} <span className="italic text-text/50">{c.ctaItalic}</span></h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">{c.ctaDesc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/contact`} className="btn-premium"><span>{c.ctaBtn}</span></Link>
              <Link href={`/${locale}/case-studies`} className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"><span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">{c.ctaSec}</span></Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Badge({ label }: { label: string }) {
  return (<span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80"><span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />{label}</span>);
}
