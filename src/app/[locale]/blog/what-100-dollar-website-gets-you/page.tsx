"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, XCircle, ExternalLink, ArrowRight,
  Clock, MessageCircle, TrendingUp, AlertCircle, Zap,
} from "lucide-react";
import { Locale } from "@/i18n.config";

type PageContent = {
  eyebrow: string; h1a: string; h1b: string; intro: string;
  badge1: string; badge2: string; badge3: string;
  trySection: { title: string; desc: string; btn1: string; btn2: string };
  whatYouGetSection: { title: string; titleItalic: string; desc: string };
  whatWorks: string[];
  whatWorksFooter: string;
  whatsappTitle: string; whatsappBody1: string; whatsappBody2: string;
  breaksSection: { title: string; titleItalic: string; desc: string };
  whereItBreaks: { title: string; description: string }[];
  verdictSection: { title: string; titleItalic: string };
  placeholderNote: string;
  itWorksLabel: string; itDoesntLabel: string;
  itWorksIf: string[]; itDoesntWorkIf: string[];
  warningNote: string;
  upgradeSection: { title: string; titleItalic: string; desc: string };
  upgradeMain: string; upgradeMainHighlight: string; upgradeMainSuffix: string;
  upgradeNote: string; upgradeSignalsLabel: string; upgradeSignals: string[];
  nextSection: { title: string; titleItalic: string };
  tier500Title: string; tier500Desc: string;
  caseStudiesTitle: string; caseStudiesDesc: string;
  restaurantLink: string; ecommerceLink: string;
  restaurantCaseLink: string; ecommerceCaseLink: string;
  bottomLine: { title: string; main: string; cost: string; investment: string; footer: string };
  ctaSection: { title: string; titleItalic: string; desc: string; startBtn: string; backBtn: string };
};

const en: PageContent = {
  eyebrow: "Managing Expectations",
  h1a: "What a $100 Website",
  h1b: "Actually Gets You",
  intro: "You know a $20 site won't work. But $100? That feels reasonable. Here's what that money actually delivers - nothing more, nothing less.",
  badge1: "Fair Assessment", badge2: "Honest Limits", badge3: "Clear Signals",
  trySection: { title: "Try It Yourself", desc: "I built both so you can see exactly what you're getting. Open them on your phone. Browse the menu or products. Try the checkout.", btn1: "$100 Restaurant", btn2: "$100 Ecommerce" },
  whatYouGetSection: { title: "What You", titleItalic: "Actually Get", desc: "Here's the fair assessment: a $100 website works. It's not broken. It just doesn't do much." },
  whatWorks: ["Products or menu items display correctly", "Basic navigation functions", "Phone number and address are visible", "Looks professional enough at first glance", "Works on desktop, mostly works on mobile"],
  whatWorksFooter: "For a side hustle or business just starting out, this isn't terrible. You have something to show people.",
  whatsappTitle: "The WhatsApp Model Is Real",
  whatsappBody1: "Many small businesses operate this way. Browse the catalog, message on WhatsApp, negotiate price and payment. It's legitimate for low-volume sales.",
  whatsappBody2: "But here's the thing - that model works because it's intentional. A $100 website forces you into it whether you want it or not.",
  breaksSection: { title: "Where It", titleItalic: "Breaks Down", desc: "A $100 site isn't broken. It's just limited. And those limits become problems fast." },
  whereItBreaks: [
    { title: "No Automation", description: "Orders through WhatsApp. Manual inventory in spreadsheets. Every customer requires your direct involvement." },
    { title: "No Scaling", description: "One viral post and you're drowning in messages. Twenty orders means twenty separate conversations." },
    { title: "The Template Problem", description: "Same colors, same layout as dozens of other sites. Customers won't remember your site an hour later." },
    { title: "Performance Issues", description: "5-8-second page loads. 4-second images. On mobile data, it's worse. Most visitors won't wait." },
  ],
  verdictSection: { title: "The Honest", titleItalic: "Verdict" },
  placeholderNote: "A $100 website is a placeholder. It's \"something online\" - not an investment in your business.",
  itWorksLabel: "It Works If", itDoesntLabel: "It Doesn't Work If",
  itWorksIf: ["You're testing a business idea before committing", "You sell low volume and don't mind manual work", "You need something today and have zero budget", "You genuinely prefer the WhatsApp ordering model"],
  itDoesntWorkIf: ["You're trying to look established", "You want customers to find you through Google", "You're competing with businesses that have real websites", "You expect the website to actually do anything"],
  warningNote: "Don't expect ROI from a $100 website. It won't bring you customers. It won't save you time. At best, it's a digital business card.",
  upgradeSection: { title: "The Upgrade", titleItalic: "Moment", desc: "How do you know when you've outgrown a $100 site?" },
  upgradeMain: "When you're spending", upgradeMainHighlight: "more than 2 hours a week", upgradeMainSuffix: "managing orders through WhatsApp.",
  upgradeNote: "That's the signal. If customer messages are eating into your actual business - making products, serving customers, growing - then the money you \"saved\" is costing you time.",
  upgradeSignalsLabel: "Other signals:",
  upgradeSignals: ["(primary)", "Customers complain about slow loading", "You're losing track of orders", "You're spending hours manually following up", "You're embarrassed to share your website link"],
  nextSection: { title: "What Comes", titleItalic: "Next" },
  tier500Title: "$500 Tier",
  tier500Desc: "This is where websites start working for you. Fast loading, proper mobile experience, actual checkout. The website becomes an employee, not just a poster.",
  caseStudiesTitle: "Full Case Studies",
  caseStudiesDesc: "I built every tier from $20 to $10,000 so you can see exactly what each budget delivers.",
  restaurantLink: "$500 Restaurant Demo →", ecommerceLink: "$500 Ecommerce Demo →",
  restaurantCaseLink: "Restaurant Case Study →", ecommerceCaseLink: "Ecommerce Case Study →",
  bottomLine: { title: "The Bottom Line", main: "A $100 website gives you exactly what you pay for: something online. It's not terrible. It's not great. It just exists.", cost: "A $100 website is a cost.", investment: "A $500+ website is an investment.", footer: "Know the difference before you spend." },
  ctaSection: { title: "Ready for Something That", titleItalic: "Actually Works?", desc: "If you've realized a $100 site won't cut it, let's talk about what will.", startBtn: "Start Here", backBtn: "Back to Blog" },
};

const ar: PageContent = {
  eyebrow: "إدارة التوقعات",
  h1a: "ماذا تحصل فعلاً",
  h1b: "مقابل موقع بـ 100$؟",
  intro: "أنت تعلم أن موقع الـ 20$ لن ينجح. لكن 100$؟ هذا يبدو معقولاً. هنا ما يقدمه هذا المال فعلاً: لا أكثر ولا أقل.",
  badge1: "تقييم عادل", badge2: "حدود صادقة", badge3: "إشارات واضحة",
  trySection: { title: "جربه بنفسك", desc: "بنيت الاثنين حتى ترى بالضبط ما ستحصل عليه. افتحهما على هاتفك. تصفح القائمة أو المنتجات. جرب الدفع.", btn1: "مطعم 100$", btn2: "متجر 100$" },
  whatYouGetSection: { title: "ما الذي", titleItalic: "تحصل عليه فعلاً", desc: "هنا التقييم العادل: الموقع بـ 100$ يعمل. ليس معطلاً. لكنه لا يفعل الكثير." },
  whatWorks: ["المنتجات أو عناصر القائمة تُعرض بشكل صحيح", "التنقل الأساسي يعمل", "رقم الهاتف والعنوان ظاهران", "يبدو احترافياً بما يكفي للوهلة الأولى", "يعمل على الكمبيوتر، ويعمل جزئياً على الجوال"],
  whatWorksFooter: "لمشروع جانبي أو عمل بدأ للتو، هذا ليس سيئاً. لديك شيء تُظهره للناس.",
  whatsappTitle: "نموذج واتساب حقيقي",
  whatsappBody1: "كثير من الأعمال الصغيرة تعمل بهذه الطريقة. تصفح الكتالوج، الرسالة على واتساب، التفاوض على السعر والدفع. هذا مشروع للمبيعات المنخفضة.",
  whatsappBody2: "لكن هنا المشكلة: هذا النموذج يعمل لأنه مقصود. الموقع بـ 100$ يجبرك عليه سواء أردت أم لا.",
  breaksSection: { title: "أين", titleItalic: "تظهر القيود", desc: "الموقع بـ 100$ ليس معطلاً. إنه محدود فحسب. وتلك الحدود تصبح مشاكل سريعاً." },
  whereItBreaks: [
    { title: "لا أتمتة", description: "الطلبات عبر واتساب. المخزون يدوياً في جداول البيانات. كل عميل يتطلب تدخلك المباشر." },
    { title: "لا توسع", description: "منشور واحد ينتشر ويغرقك في الرسائل. عشرون طلباً يعني عشرون محادثة منفصلة." },
    { title: "مشكلة القالب", description: "نفس الألوان، نفس التخطيط كعشرات المواقع الأخرى. العملاء لن يتذكروا موقعك بعد ساعة." },
    { title: "مشاكل الأداء", description: "تحميل 5-8 ثوانٍ. صور تستغرق 4 ثوانٍ. على بيانات الجوال أسوأ. معظم الزوار لن ينتظروا." },
  ],
  verdictSection: { title: "الحكم", titleItalic: "الصادق" },
  placeholderNote: "الموقع بـ 100$ هو مجرد حضور مؤقت. إنه «شيء على الإنترنت»، وليس استثماراً في عملك.",
  itWorksLabel: "يصلح إذا", itDoesntLabel: "لا يصلح إذا",
  itWorksIf: ["أنت تختبر فكرة تجارية قبل الالتزام", "تبيع بكميات منخفضة ولا تمانع العمل اليدوي", "تحتاج شيئاً اليوم وليس لديك ميزانية", "تفضل فعلاً نموذج الطلب عبر واتساب"],
  itDoesntWorkIf: ["تحاول أن تبدو متمكناً", "تريد أن يجدك العملاء عبر جوجل", "تنافس أعمالاً لديها مواقع حقيقية", "تتوقع أن يفعل الموقع شيئاً فعلاً"],
  warningNote: "لا تتوقع عائداً من موقع الـ 100$. لن يجلب لك عملاء. لن يوفر وقتك. في أفضل الأحوال، هو بطاقة أعمال رقمية.",
  upgradeSection: { title: "لحظة", titleItalic: "الترقية", desc: "كيف تعرف أنك تجاوزت حاجتك لموقع بـ 100$؟" },
  upgradeMain: "عندما تقضي", upgradeMainHighlight: "أكثر من ساعتين أسبوعياً", upgradeMainSuffix: "في إدارة الطلبات عبر واتساب.",
  upgradeNote: "هذه هي الإشارة. إن كانت رسائل العملاء تأكل من وقت عملك الفعلي، وقت صنع المنتجات وخدمة العملاء والنمو، فالمال الذي «وفرته» يكلفك وقتاً.",
  upgradeSignalsLabel: "إشارات أخرى:",
  upgradeSignals: ["(أساسي)", "العملاء يشكون من بطء التحميل", "تفقد متابعة الطلبات", "تقضي ساعات في المتابعة اليدوية", "تخجل من مشاركة رابط موقعك"],
  nextSection: { title: "ما الذي", titleItalic: "يأتي بعد ذلك" },
  tier500Title: "مستوى 500$",
  tier500Desc: "هنا تبدأ المواقع تعمل لصالحك. تحميل سريع، تجربة جوال حقيقية، دفع فعلي. الموقع يصبح موظفاً، لا مجرد ملصق.",
  caseStudiesTitle: "دراسات الحالة الكاملة",
  caseStudiesDesc: "بنيت كل مستوى من 20$ إلى 10,000$ حتى ترى بالضبط ما يقدمه كل ميزانية.",
  restaurantLink: "عرض مطعم 500$ ←", ecommerceLink: "عرض متجر 500$ ←",
  restaurantCaseLink: "دراسة حالة المطاعم ←", ecommerceCaseLink: "دراسة حالة التجارة الإلكترونية ←",
  bottomLine: { title: "الخلاصة", main: "الموقع بـ 100$ يعطيك بالضبط ما تدفعه: شيء على الإنترنت. ليس سيئاً. ليس رائعاً. يكتفي بالوجود.", cost: "الموقع بـ 100$ هو تكلفة.", investment: "الموقع بـ 500$+ هو استثمار.", footer: "اعرف الفرق قبل أن تنفق." },
  ctaSection: { title: "مستعد لشيء", titleItalic: "يعمل فعلاً؟", desc: "إن أدركت أن موقع الـ 100$ لن يكفي، دعنا نتحدث عما سيكفي.", startBtn: "ابدأ من هنا", backBtn: "العودة إلى المدونة" },
};

export default function What100DollarWebsiteGetsYouPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<PageContent>(en);
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
              <h2 className="text-3xl font-display mb-6 text-center">{c.trySection.title}</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">{c.trySection.desc}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://100-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300">
                  <span className="text-sm font-semibold uppercase tracking-wider">{c.trySection.btn1}</span><ExternalLink className="h-4 w-4" />
                </a>
                <a href="https://100-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <span className="text-sm font-semibold uppercase tracking-wider text-text/70">{c.trySection.btn2}</span><ExternalLink className="h-4 w-4 text-text/70" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.whatYouGetSection.title} <span className="italic text-text/50">{c.whatYouGetSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.whatYouGetSection.desc}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400" />What Works</h3>
              <ul className="space-y-4">
                {c.whatWorks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text/60">
                    <ArrowRight className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">{c.whatWorksFooter}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3"><MessageCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />{c.whatsappTitle}</h3>
              <p className="text-sm text-text/60 leading-relaxed mb-4">{c.whatsappBody1}</p>
              <p className="text-sm text-text/60 leading-relaxed">{c.whatsappBody2}</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.breaksSection.title} <span className="italic text-text/50">{c.breaksSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.breaksSection.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.whereItBreaks.map((item, index) => {
              const icons = [MessageCircle, TrendingUp, AlertCircle, Clock];
              const Icon = icons[index];
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-6 border-l-2 border-l-orange-500/50">
                  <div className="flex items-center gap-3 mb-4"><Icon className="h-5 w-5 text-orange-400" /><h3 className="text-lg font-display">{item.title}</h3></div>
                  <p className="text-sm text-text/60">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.verdictSection.title} <span className="italic text-text/50">{c.verdictSection.titleItalic}</span>
            </h2>
          </div>
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 mb-8">
            <p className="text-xl text-center text-text/80 mb-8">{c.placeholderNote}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4"><CheckCircle className="h-4 w-4 text-green-400" /><span className="font-semibold text-green-400">{c.itWorksLabel}</span></div>
                <ul className="space-y-3">{c.itWorksIf.map((item, idx) => (<li key={idx} className="flex items-start gap-2 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-green-400/50 mt-0.5 shrink-0" />{item}</li>))}</ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4"><XCircle className="h-4 w-4 text-red-400" /><span className="font-semibold text-red-400">{c.itDoesntLabel}</span></div>
                <ul className="space-y-3">{c.itDoesntWorkIf.map((item, idx) => (<li key={idx} className="flex items-start gap-2 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-red-400/50 mt-0.5 shrink-0" />{item}</li>))}</ul>
              </div>
            </div>
          </div>
          <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center max-w-2xl mx-auto">
            <p className="text-lg text-text/80">{c.warningNote}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              {c.upgradeSection.title} <span className="italic text-text/50">{c.upgradeSection.titleItalic}</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.upgradeSection.desc}</p>
          </div>
          <div className="glass-card p-8 md:p-12 border-l-4 border-l-[hsl(var(--accent-gold))]">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4"><Clock className="h-6 w-6" /></div>
                <p className="text-xl text-text/80">{c.upgradeMain}{" "}<strong className="text-[hsl(var(--accent-gold))]">{c.upgradeMainHighlight}</strong>{" "}{c.upgradeMainSuffix}</p>
              </div>
              <p className="text-center text-text/60 mb-8">{c.upgradeNote}</p>
              <div className="border-t border-white/10 pt-8">
                <p className="text-sm text-text/50 mb-4 text-center">{c.upgradeSignalsLabel}</p>
                <ul className="space-y-3">
                  {c.upgradeSignals.slice(1).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text/60">
                      <span className="w-5 h-5 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs shrink-0 mt-0.5">{idx + 1}</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.nextSection.title} <span className="italic text-text/50">{c.nextSection.titleItalic}</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4"><Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.tier500Title}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">{c.tier500Desc}</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://500-dollar-restaurant.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.restaurantLink}</a>
                <a href="https://500-dollar-ecommerce-app.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.ecommerceLink}</a>
              </div>
            </div>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4"><TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" /><h3 className="text-xl font-display">{c.caseStudiesTitle}</h3></div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">{c.caseStudiesDesc}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.restaurantCaseLink}</Link>
                <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="text-[hsl(var(--accent-gold))] hover:underline text-sm">{c.ecommerceCaseLink}</Link>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-3xl font-display mb-6">{c.bottomLine.title}</h2>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">{c.bottomLine.main}</p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-xl text-text/80">
                <span className="text-orange-400">{c.bottomLine.cost}</span><br />
                <span className="text-[hsl(var(--accent-gold))]">{c.bottomLine.investment}</span>
              </p>
            </div>
            <p className="text-text/60 mt-6">{c.bottomLine.footer}</p>
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
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />{label}
    </span>
  );
}
