"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileCode, Layout, GitBranch, Zap, Shield, CheckCircle, Layers, ArrowRight } from "lucide-react";
import { Locale } from "@/i18n.config";

const en = {
  eyebrow: "Document Architecture",
  h1: "HTML: The Most Reliable", h1i: "Source of Truth",
  intro: "Why HTML-based document authoring is the most reliable, scalable, and future-proof method for generating PDFs, and how KamkmPDF connects natural language to structured documents.",
  b1: "Structured", b2: "Reproducible", b3: "Future-Proof",
  execTitle: "Executive Summary",
  execBody: "When organizations need professional PDFs, they usually start in tools never designed for reproducibility or automation.",
  execCards: [["Layout breaks", "Manual exports from design tools"], ["Font issues", "Inconsistent rendering across systems"], ["No source of truth", "PDF is final, not a working format"]],
  coreTitle: "The Core", coreItalic: "Problem",
  coreDesc: "Traditional workflows treat PDFs as the primary working file. PDF is a final format, not a flexible authoring format.",
  traditionalTitle: "Traditional Workflow",
  traditionalItems: ["Designers export from layout tools", 'Teams edit Word files and "Save as PDF"', "Developers manually generate PDFs with brittle templates", "Inconsistent formatting across exports", "No clear source of truth", "Limited automation and versioning problems"],
  htmlTitle: "HTML-First Workflow",
  htmlItems: ["Structured markup as source of truth", "CSS controls presentation separately", "Programmatic generation with templates", "Deterministic, reproducible output", "Version controlled and auditable", "Scalable to thousands of documents"],
  whyTitle: "Why HTML Is the Most Reliable", whyItalic: "Source",
  whyDesc: "Five fundamental advantages of HTML-based document architecture",
  reasons: [
    { title: "Structured by Design", description: "HTML is semantic and structured with headings, sections, lists, tables, and metadata — machine-readable, accessible, predictable, and easy to transform." },
    { title: "Separation of Content and Design", description: "Content lives in structured markup while design lives in stylesheets. Global style updates, brand consistency, and easy redesign without rewriting content." },
    { title: "Version Control & Reproducibility", description: "HTML files can be stored in Git, tracked per revision, and rebuilt deterministically. Same HTML + same engine = same PDF." },
    { title: "Automation & Scalability", description: "HTML documents can be templated, data-driven, and generated programmatically. 1 PDF or 10,000 using the same template system." },
    { title: "Long-Term Stability", description: "HTML is open, standardized, widely supported. Unlike proprietary formats, HTML will remain readable and convertible across tools and platforms." },
  ],
  kamkmEyebrow: "The Missing Layer", kamkmTitle: "Introducing", kamkmItalic: "KamkmPDF",
  kamkmDesc: "KamkmPDF builds on the reliability of HTML-based document systems and removes the friction of manual markup creation.",
  kamkmWhatTitle: "What KamkmPDF Does",
  kamkmWhatDesc: "Converts natural language instructions into structured HTML documents, applies intelligent formatting, and generates professional, print-ready PDFs.",
  features: [
    { title: "Natural Language to HTML", description: "Users describe what they need in plain English, and it converts into structured, semantic HTML." },
    { title: "Dual Output System", description: "Users receive both the final PDF and the source HTML for transparency, customization, and future editing." },
    { title: "Deterministic Layout", description: "Structured HTML before rendering ensures predictable pagination, consistent fonts, and controlled spacing." },
  ],
  out1Title: "Immediate Result", out1Desc: "A professional, print-ready PDF generated from your natural language description.", out1File: "document.pdf",
  out2Title: "Long-Term Control", out2Desc: "The underlying HTML source code for transparency, customization, and future editing.", out2File: "document.html",
  exIn: "Natural Language Input",
  exInQuote: '"Create a professional invoice for John Doe with 3 services, 20% tax, total at the bottom, clean minimal design."',
  exOut: "What KamkmPDF Delivers",
  exOutItems: ["Properly structured HTML content", "Layout best practices applied", "Professional PDF generated", "Editable source HTML returned", "No manual formatting required", "No layout debugging needed"],
  impactTitle: "Real-World", impactItalic: "Impact",
  impactDesc: "Organizations using HTML-first document architecture experience:",
  benefits: ["Faster document creation", "Fewer layout errors", "Consistent branding", "Reduced manual formatting", "Scalable document generation", "Clear separation between content and presentation"],
  insightTitle: "Key Insight", insightL1: "PDF should be the output.", insightL2: "HTML should be the source of truth.",
  insightDesc: "KamkmPDF connects natural language intent to structured, reproducible document architecture, delivering both immediate results and long-term reliability.",
  concTitle: "Conclusion",
  concWay: "The Most Reliable Way", concWayItems: ["Author in structured HTML", "Style with controlled CSS", "Render to PDF with a consistent engine"],
  concHow: "How KamkmPDF Enhances This", concHowItems: ["Generates structured HTML from natural language", "Produces production-ready PDFs", "Returns the HTML source for transparency and control"],
  concFooter: "This is not just PDF generation. It is a scalable document infrastructure built on open standards.",
  ctaTitle: "Ready to Build Your", ctaItalic: "Document System?",
  ctaDesc: "Let's discuss how structured document workflows can transform your organization.",
  ctaBtn: "Let's Work Together", ctaSec: "View More Case Studies",
};

const ar = {
  eyebrow: "بنية المستندات",
  h1: "HTML:", h1i: "المصدر الموثوق",
  intro: "PDF كخرج عادي. HTML كمصدر. KamkmPDF يربط الاثنين.",
  b1: "مهيكل", b2: "قابل للتكرار", b3: "يدوم مع الوقت",
  execTitle: "المشكلة باختصار",
  execBody: "معظم الناس تبدأ بتصميم PDF في أدوات ما طُوّرت للتكرار أو الأتمتة.",
  execCards: [["التنسيق ينهار", "تصدير يدوي فيه احتمال خطأ"], ["الخطوط تختلف", "كل جهاز يعرضها بشكل مختلف"], ["ما فيه مصدر حقيقي", "PDF نهائي، مش للتعديل"]],
  coreTitle: "المشكلة", coreItalic: "الجوهرية",
  coreDesc: "تتعامل سير العمل التقليدية مع PDF كملف عمل رئيسي. PDF صيغة نهائية وليست صيغة تأليف مرنة.",
  traditionalTitle: "سير العمل التقليدي",
  traditionalItems: ["المصممون يصدّرون من أدوات التخطيط", "الفرق تحرر ملفات Word وتحفظها بصيغة PDF", "المطورون يولدون PDF يدوياً بقوالب هشة", "تنسيق غير متسق عبر التصديرات", "لا مصدر واضح للحقيقة", "أتمتة محدودة ومشاكل في الإصدارات"],
  htmlTitle: "سير العمل HTML-First",
  htmlItems: ["الترميز المهيكل كمصدر للحقيقة", "CSS يتحكم في العرض بشكل منفصل", "توليد برمجي بالقوالب", "مخرجات محددة وقابلة للتكرار", "تحكم في الإصدارات وقابلية للتدقيق", "قابل للتوسع لآلاف المستندات"],
  whyTitle: "لماذا HTML هو المصدر", whyItalic: "الأكثر موثوقية",
  whyDesc: "خمس مزايا جوهرية لبنية المستندات المبنية على HTML",
  reasons: [
    { title: "مهيكل بطبيعته", description: "HTML دلالي - عناوين، أقسام، قوائم، جداول. هذا يجعل المستند قابلاً للقراءة آلياً وسهل التحويل." },
    { title: "المحتوى منفصل عن التصميم", description: "المحتوى في الترميز، التصميم في CSS. غيّر المظهر بالكامل دون لمس سطر واحد من المحتوى." },
    { title: "قابل للتتبع والتكرار", description: "ملفات HTML في Git. بنفس الملف ومحرك العرض، تحصل على نفس PDF في كل مرة." },
    { title: "أتمتة حقيقية", description: "HTML قوالب + بيانات = PDF بالآلاف. نفس النظام، آلاف المستندات." },
    { title: "يدوم مع الوقت", description: "HTML معياري ومفتوح. بخلاف الصيغ الاحتكارية، يبقى قابلاً للقراءة والتحويل لسنوات." },
  ],
  kamkmEyebrow: "الحلقة المفقودة", kamkmTitle: "تعرف على", kamkmItalic: "KamkmPDF",
  kamkmDesc: "KamkmPDF يبني على HTML ويحذف عناء كتابة الترميز يدوياً. قلها بكلام عادي، نفذها PDF.",
  kamkmWhatTitle: "كيف يشتغل KamkmPDF",
  kamkmWhatDesc: "تصف ما تريد بكلامك، يتحول إلى HTML مهيكل، تخرج PDF جاهز.",
  features: [
    { title: "كلامك يخرج HTML", description: "تصف ما تريد بكلام عادي. يتحول إلى HTML دلالي مهيكل." },
    { title: "تحصل على الاثنين", description: "PDF للإرسال، وHTML المصدر للتعديل متى شئت." },
    { title: "تنسيق حتمي", description: "HTML مهيكل يضمن ترقيم صفحات صحيح وخطوط ثابتة ومسافات متحكم بها." },
  ],
  out1Title: "ما تحتاجه الآن", out1Desc: "PDF جاهز للإرسال فوراً.", out1File: "document.pdf",
  out2Title: "تحكم لاحقاً", out2Desc: "HTML المصدر معك تقدر تعدل أي شيء متى شئت.", out2File: "document.html",
  exIn: "مثال عملي",
  exInQuote: '"أنشئ فاتورة لـ John Doe - 3 خدمات - ضريبة 20% - المجموع في الأسفل."',
  exOut: "ما يطلع منه",
  exOutItems: ["محتوى HTML مهيكل بشكل صحيح", "تنسيق صحيح من أول مرة", "PDF احترافي جاهز", "HTML المصدر معك أيضاً", "بدون تنسيق يدوي", "بدون تعديل وتكرار"],
  impactTitle: "الفرق في", impactItalic: "التطبيق",
  impactDesc: "شركات تستخدم HTML-First تلاحظ:",
  benefits: ["مستندات أسرع", "أخطاء تخطيط أقل", "علامة تجارية تبدو متسقة", "تنسيق يدوي أقل بكثير", "توليد آلاف المستندات بنفس القالب", "محتوى وتصميم منفصلان"],
  insightTitle: "الفكرة الأساسية", insightL1: "PDF هو النتيجة.", insightL2: "HTML هو المصدر.",
  insightDesc: "KamkmPDF يربط كلامك بمستند مهيكل قابل للتكرار.",
  concTitle: "باختصار",
  concWay: "الطريقة الصحيحة", concWayItems: ["ألف بHTML مهيكل", "نسق بCSS منفصل", "خرج PDF بمحرك واحد"],
  concHow: "KamkmPDF يعمل ذلك لك", concHowItems: ["يحول كلامك إلى HTML", "ينتج PDF جاهز", "يرجع HTML المصدر معك للتعديل"],
  concFooter: "مش مجرد توليد PDF. بنية تحتية للمستندات مبنية على معايير مفتوحة.",
  ctaTitle: "عندك مستندات", ctaItalic: "تحتاج ترتيبها؟",
  ctaDesc: "نتحدث عن كيف يصبح إنتاج مستنداتك أوتوماتيكياً.",
  ctaBtn: "تحدث معي", ctaSec: "دراسات حالة أخرى",
};

type C = typeof en;
const reasonIcons = [FileCode, Layout, GitBranch, Zap, Shield];

export default function KamkmPDFReliabilityCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
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
          <h1 className="text-5xl md:text-7xl font-display mb-8">{c.h1}{" "}<span className="italic text-text/50">{c.h1i}</span></h1>
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-4"><Badge label={c.b1} /><Badge label={c.b2} /><Badge label={c.b3} /></div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6">{c.execTitle}</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8">{c.execBody}</p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {c.execCards.map(([title, desc], i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
                    <div className="text-[hsl(var(--accent-gold))] font-display text-2xl mb-2">{title}</div>
                    <p className="text-sm text-text/60">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.coreTitle} <span className="italic text-text/50">{c.coreItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.coreDesc}</p>
          </div>
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3"><Layers className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />{c.traditionalTitle}</h3>
                <ul className="space-y-4">{c.traditionalItems.map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-bronze))] mt-2 shrink-0" />{item}</li>))}</ul>
              </div>
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3"><CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.htmlTitle}</h3>
                <ul className="space-y-4">{c.htmlItems.map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-text/60"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />{item}</li>))}</ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.whyTitle}{" "}<span className="italic text-text/50">{c.whyItalic}</span></h2>
            <p className="text-lg text-text/60">{c.whyDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.reasons.map((reason, i) => {
              const Icon = reasonIcons[i]; return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-6"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-lg font-display mb-4">{reason.title}</h3>
                  <p className="text-sm text-text/60 leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8"><span className="h-px w-12 bg-[hsl(var(--accent-gold))]" /><span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">{c.kamkmEyebrow}</span><span className="h-px w-12 bg-[hsl(var(--accent-gold))]" /></div>
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.kamkmTitle} <span className="italic text-text/50">{c.kamkmItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.kamkmDesc}</p>
          </div>
          <div className="glass-card p-8 md:p-12 mb-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-6"><span className="text-2xl font-display">1</span></div>
              <h3 className="text-2xl font-display mb-4">{c.kamkmWhatTitle}</h3>
              <p className="text-text/60 max-w-2xl mx-auto">{c.kamkmWhatDesc}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {c.features.map((f, i) => (<div key={i} className="text-center"><div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center mx-auto mb-4 font-display text-lg">{i + 1}</div><h4 className="text-lg font-display mb-3">{f.title}</h4><p className="text-sm text-text/60">{f.description}</p></div>))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]"><h3 className="text-xl font-display mb-4 flex items-center gap-3"><CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.out1Title}</h3><p className="text-text/60 mb-4">{c.out1Desc}</p><div className="font-mono text-xs text-text/40 bg-white/5 p-3 rounded">{c.out1File}</div></div>
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]"><h3 className="text-xl font-display mb-4 flex items-center gap-3"><FileCode className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.out2Title}</h3><p className="text-text/60 mb-4">{c.out2Desc}</p><div className="font-mono text-xs text-text/40 bg-white/5 p-3 rounded">{c.out2File}</div></div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div><h3 className="text-2xl font-display mb-6">{c.exIn}</h3><div className="bg-white/5 p-6 rounded-lg border border-white/10"><p className="text-text/80 italic leading-relaxed">{c.exInQuote}</p></div></div>
              <div><h3 className="text-2xl font-display mb-6">{c.exOut}</h3><ul className="space-y-4">{c.exOutItems.map((item, i) => (<li key={i} className="flex items-center gap-3 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))]" />{item}</li>))}</ul></div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.impactTitle} <span className="italic text-text/50">{c.impactItalic}</span></h2><p className="text-lg text-text/60">{c.impactDesc}</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.benefits.map((b, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4 p-6 glass-card"><div className="w-8 h-8 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center shrink-0"><CheckCircle className="h-4 w-4" /></div><span className="text-text/80">{b}</span></motion.div>))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">{c.insightTitle}</h2>
              <div className="text-2xl md:text-3xl font-display leading-relaxed mb-8"><span className="text-text/50">{c.insightL1}</span><br /><span className="text-[hsl(var(--accent-gold))]">{c.insightL2}</span></div>
              <p className="text-text/60 leading-relaxed">{c.insightDesc}</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-display mb-8 text-center">{c.concTitle}</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div><h3 className="text-lg font-display mb-4 text-[hsl(var(--accent-gold))]">{c.concWay}</h3><ol className="space-y-3 text-sm text-text/60">{c.concWayItems.map((s, i) => (<li key={i} className="flex items-start gap-3"><span className="font-mono text-[hsl(var(--accent-gold))]">{i + 1}.</span>{s}</li>))}</ol></div>
              <div><h3 className="text-lg font-display mb-4 text-[hsl(var(--accent-gold))]">{c.concHow}</h3><ul className="space-y-3 text-sm text-text/60">{c.concHowItems.map((item, i) => (<li key={i} className="flex items-start gap-3"><ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />{item}</li>))}</ul></div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center"><p className="text-lg text-text/80 font-display">{c.concFooter}</p></div>
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
