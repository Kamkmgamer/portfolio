"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Zap, Shield, DollarSign, CheckCircle } from "lucide-react";
import { Locale } from "@/i18n.config";

type C = {
  eyebrow: string; h1: string; h1i: string; intro: string; value: string;
  b1: string; b2: string; b3: string;
  statsLabels: string[]; statsDescs: string[];
  overviewTitle: string; overviewItalic: string; overviewDesc: string;
  roleTitle: string; roleItems: string[];
  achievementsTitle: string; achievements: string[];
  timelineTitle: string; timelineItalic: string; timelineDesc: string;
  weeks: string[];
  techTitle: string; techItalic: string; techDesc: string;
  techCategories: string[];
  fullAchievementsTitle: string; fullAchievementsDesc: string;
  ctaTitle: string; ctaItalic: string; ctaDesc: string; ctaBtn: string; ctaSec: string;
};

const en: C = {
  eyebrow: "SaaS Development", h1: "DevServe", h1i: "Platform",
  intro: "Enterprise-grade SaaS platform with secure payments, monitoring, and enterprise features: built solo in 35 days.",
  value: "Industry-estimated value: $90k-$130k",
  b1: "Enterprise SaaS", b2: "35 Days", b3: "Full-Stack",
  statsLabels: ["Development Time", "Industry Estimate", "Team Size", "Test Coverage"],
  statsDescs: ["Solo development", "Development value", "Full-stack architect", "Comprehensive suite"],
  overviewTitle: "Project", overviewItalic: "Overview",
  overviewDesc: "DevServe showcases enterprise-grade development practices, delivering a complete SaaS platform with the speed and quality typically reserved for large development teams.",
  roleTitle: "My Role", roleItems: ["Full-stack architect and sole developer", "Implemented enterprise security practices", "Set up production monitoring and CI/CD", "Delivered comprehensive testing suite"],
  achievementsTitle: "Key Achievements",
  achievements: ["Built enterprise-grade SaaS platform solo in 35 days", "Implemented secure payment processing with Stripe & PayPal", "Achieved 80%+ test coverage with comprehensive test suite", "Set up production-ready monitoring and alerting", "Delivered $90k-$130k worth of development value", "Zero security vulnerabilities in final audit"],
  timelineTitle: "35-Day", timelineItalic: "Timeline", timelineDesc: "From concept to production-ready platform in 5 weeks",
  weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  techTitle: "Technology", techItalic: "Stack", techDesc: "Modern, scalable technologies chosen for enterprise-grade performance",
  techCategories: ["Frontend", "Backend", "Security", "Payments", "DevOps", "Testing"],
  fullAchievementsTitle: "Complete Achievements", fullAchievementsDesc: "Delivering enterprise-grade quality",
  ctaTitle: "Ready to Build Your", ctaItalic: "SaaS?",
  ctaDesc: "DevServe demonstrates my ability to deliver enterprise-grade solutions with exceptional speed and quality. Let's discuss your next project.",
  ctaBtn: "Let's Work Together", ctaSec: "View More Case Studies",
};

const ar: C = {
  eyebrow: "تطوير SaaS", h1: "DevServe", h1i: "المنصة",
  intro: "بنيت منصة SaaS كاملة — دفع، مراقبة، أمان، كل شيء — لوحدي في 35 يوماً.",
  value: "قيمة سوقية مقدّرة: من 90K$ إلى 130K$",
  b1: "SaaS احترافي", b2: "35 يوم", b3: "كل شيء لوحدي",
  statsLabels: ["وقت التطوير", "القيمة السوقية", "حجم الفريق", "تغطية الاختبارات"],
  statsDescs: ["وحدي من أول سطر لآخر سطر", "ما تدفعه فرق كاملة مقابله", "مطور واحد، مشروع كامل", "اختبارات من البداية للنهاية"],
  overviewTitle: "نظرة على", overviewItalic: "المشروع",
  overviewDesc: "DevServe يثبت أن منصة SaaS احترافية لا تحتاج فريقاً كبيراً. بنيته وحدي بنفس المعايير التي تستخدمها الشركات الكبيرة.",
  roleTitle: "ما الذي عملته",
  roleItems: ["بنيت كل شيء من الصفر لوحدي", "أمان على مستوى احترافي", "مراقبة حية وCI/CD من اليوم الأول", "اختبارات شاملة قبل التسليم"],
  achievementsTitle: "ما تحقق",
  achievements: ["منصة SaaS كاملة في 35 يوماً بمفردي", "دفع آمن عبر Stripe وPayPal", "تغطية اختبارات 80%+", "مراقبة وتنبيهات جاهزة للإنتاج", "قيمة تطوير من 90K$ إلى 130K$", "صفر ثغرات في التدقيق الأمني"],
  timelineTitle: "35 يوماً", timelineItalic: "خطوة بخطوة", timelineDesc: "من الفكرة إلى منصة جاهزة في 5 أسابيع",
  weeks: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4", "الأسبوع 5"],
  techTitle: "التقنيات", techItalic: "المستخدمة", techDesc: "اخترت كل تقنية بعناية - لا ترف، فقط ما يشتغل",
  techCategories: ["الواجهة", "الخلفية", "الأمان", "الدفع", "DevOps", "الاختبارات"],
  fullAchievementsTitle: "كل الإنجازات", fullAchievementsDesc: "جودة احترافية من البداية للنهاية",
  ctaTitle: "عندك مشروع", ctaItalic: "SaaS؟",
  ctaDesc: "DevServe يثبت أن السرعة والجودة لا يتعارضان. إذا عندك فكرة، نبني عليها.",
  ctaBtn: "تحدث معي", ctaSec: "دراسات حالة أخرى",
};

const timeline = [
  { en: ["Architecture design", "Database schema", "Auth system"], ar: ["تصميم البنية", "مخطط قاعدة البيانات", "نظام المصادقة"] },
  { en: ["Core API endpoints", "Frontend components", "Payment integration"], ar: ["نقاط API الأساسية", "مكونات الواجهة", "تكامل الدفع"] },
  { en: ["UI/UX polish", "Testing suite", "Security hardening"], ar: ["تحسين UI/UX", "مجموعة الاختبارات", "تعزيز الأمان"] },
  { en: ["CI/CD pipeline", "Monitoring setup", "Documentation"], ar: ["خط CI/CD", "إعداد المراقبة", "التوثيق"] },
  { en: ["Final testing", "Performance optimization", "Deployment"], ar: ["الاختبار النهائي", "تحسين الأداء", "النشر"] },
];

const techStack = [
  { en: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"], ar: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { en: ["Node.js", "Express 5", "Prisma ORM", "PostgreSQL"], ar: ["Node.js", "Express 5", "Prisma ORM", "PostgreSQL"] },
  { en: ["JWT Auth", "CSRF Protection", "Rate Limiting", "Input Validation"], ar: ["JWT Auth", "حماية CSRF", "تقييد المعدل", "التحقق من المدخلات"] },
  { en: ["Stripe API", "PayPal SDK", "Webhook Handling", "Subscription Logic"], ar: ["Stripe API", "PayPal SDK", "معالجة Webhooks", "منطق الاشتراكات"] },
  { en: ["Docker", "GitHub Actions", "Prometheus", "Grafana"], ar: ["Docker", "GitHub Actions", "Prometheus", "Grafana"] },
  { en: ["Jest", "Supertest", "Cypress", "Unit & Integration"], ar: ["Jest", "Supertest", "Cypress", "وحدة وتكامل"] },
];

const stats = [
  { value: "35 Days", valueAr: "35 يوماً", icon: Calendar },
  { value: "$90k-$130k", valueAr: "90K$-130K$", icon: DollarSign },
  { value: "Solo", valueAr: "فردي", icon: Users },
  { value: "80%+", valueAr: "80%+", icon: Shield },
];

export default function DevServeCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<C>(en);
  useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);
  const isAr = locale === "ar";

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
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-6">{c.intro}</p>
          <p className="text-xl text-[hsl(var(--accent-gold))] font-semibold mb-12">{c.value}</p>
          <div className="flex flex-wrap justify-center gap-4"><Badge label={c.b1} /><Badge label={c.b2} /><Badge label={c.b3} /></div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8 text-center group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4 group-hover:bg-[hsl(var(--accent-gold))]/20 transition-colors">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-display font-semibold mb-2">{isAr ? stat.valueAr : stat.value}</div>
                <div className="text-sm font-semibold text-text/80 mb-1">{c.statsLabels[i]}</div>
                <div className="text-xs text-text/50">{c.statsDescs[i]}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.overviewTitle} <span className="italic text-text/50">{c.overviewItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.overviewDesc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><Users className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.roleTitle}</h3>
              <ul className="space-y-4">{c.roleItems.map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />{item}</li>))}</ul>
            </div>
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.achievementsTitle}</h3>
              <ul className="space-y-4">{c.achievements.slice(0, 4).map((a, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />{a}</li>))}</ul>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.timelineTitle} <span className="italic text-text/50">{c.timelineItalic}</span></h2>
            <p className="text-lg text-text/60">{c.timelineDesc}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((week, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-32 text-right pt-4"><span className="text-sm font-semibold text-[hsl(var(--accent-gold))]">{c.weeks[i]}</span></div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--accent-gold))]" />
                    {i < timeline.length - 1 && <div className="w-px h-full min-h-[80px] bg-[hsl(var(--accent-gold))]/20 mt-2" />}
                  </div>
                  <div className="glass-card flex-1 p-6 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? week.ar : week.en).map((task, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[hsl(var(--accent-gold))]/10 text-text/80 rounded-none border border-[hsl(var(--accent-gold))]/20">
                          <CheckCircle className="h-3 w-3 text-[hsl(var(--accent-gold))]" />{task}
                        </span>
                      ))}
                    </div>
                  </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-6 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/40 mb-4">{c.techCategories[i]}</h3>
                <div className="space-y-2">
                  {(isAr ? stack.ar : stack.en).map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-text/70"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))]" />{tech}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="text-center mb-8">
              <CheckCircle className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
              <h2 className="text-3xl font-display mb-2">{c.fullAchievementsTitle}</h2>
              <p className="text-text/60">{c.fullAchievementsDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {c.achievements.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-sm text-text/70">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.ctaTitle} <span className="italic text-text/50">{c.ctaItalic}</span></h2>
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
