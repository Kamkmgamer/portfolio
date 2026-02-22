"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Smartphone, CheckCircle, XCircle, ExternalLink, ArrowRight, TrendingUp, Star } from "lucide-react";
import { Locale } from "@/i18n.config";

type Feature = { text: string; good: boolean };
type Tier = { price: string; label: string; verdict: string; summary: string; speed: string; mobile: string; features: Feature[]; url: string };
type Rec = { title: string; budget: string; icon: React.ElementType; color: string; items: string[] };
type C = {
  eyebrow: string; h1a: string; h1b: string; intro: string; b1: string; b2: string; b3: string;
  pTitle: string; pDesc: string; pC1: string; pC1d: string; pC2: string; pC2d: string; pC3: string; pC3d: string;
  tTitle: string; tItalic: string; tDesc: string; tiers: Tier[];
  cTitle: string; cItalic: string; tHeaders: string[]; tRows: string[][];
  rTitle: string; rItalic: string; rDesc: string; recs: Rec[];
  bTitle: string; bDesc: string; bCards: { q: string; a: string }[];
  ctaTitle: string; ctaItalic: string; ctaDesc: string; ctaBtn: string; ctaSec: string;
};

const en: C = {
  eyebrow: "Transparency Project", h1a: "$20 to $10,000", h1b: "Restaurant Websites",
  intro: "I built every tier to show you exactly what your money buys. Here's the honest truth about restaurant website pricing.",
  b1: "9 Live Demos", b2: "Transparent Pricing", b3: "Real Examples",
  pTitle: "The Problem", pDesc: "You're shopping for a website. One quote says $20, another says $10,000. Are the expensive ones ripping you off? Are the cheap ones cutting corners?",
  pC1: "Unclear Value", pC1d: "What does each dollar actually buy?",
  pC2: "Technical Jargon", pC2d: "Developers speak a different language",
  pC3: "No Examples", pC3d: "How can you compare without seeing?",
  tTitle: "All", tItalic: "Nine Tiers", tDesc: "Each tier is a real, working website. Open them on your phone. Try to find the menu. Submit a form. The difference is obvious within seconds.",
  tiers: [
    { price: "$20", label: "The Problem", verdict: "skip", summary: "Hurts your reputation", speed: "5+ seconds", mobile: "Broken", features: [{ text: "Painfully slow loading", good: false }, { text: "Obviously unfinished look", good: false }, { text: "Broken mobile experience", good: false }, { text: "No way to contact you", good: false }, { text: "Generic placeholder text", good: false }], url: "https://20-dollar-restaurant.vercel.app" },
    { price: "$100", label: "The Template", verdict: "placeholder", summary: "Forgettable placeholder", speed: "3-4 seconds", mobile: "Partial", features: [{ text: "Works on some phones", good: false }, { text: "Auto-playing slider (annoying)", good: false }, { text: "Generic stock photos", good: false }, { text: "Forms don't submit", good: false }, { text: "Social links go nowhere", good: false }], url: "https://100-dollar-restaurant.vercel.app" },
    { price: "$200", label: "Professional", verdict: "good", summary: "The sweet spot for most", speed: "1-2 seconds", mobile: "Perfect", features: [{ text: "Loads quickly, looks sharp", good: true }, { text: "Works on all devices", good: true }, { text: "Working contact form", good: true }, { text: "Menu, hours, location easy to find", good: true }, { text: "Professional appearance", good: true }], url: "https://200-dollar-restaurant.vercel.app" },
    { price: "$500", label: "Competitive", verdict: "good", summary: "Win customers from competitors", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "Smooth scroll animations", good: true }, { text: "Gallery with lightbox", good: true }, { text: "Menu organized by category", good: true }, { text: "Reservation request form", good: true }, { text: "Real testimonials", good: true }], url: "https://500-dollar-restaurant.vercel.app" },
    { price: "$700", label: "Memorable", verdict: "good", summary: "Impress and be remembered", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "Beautiful parallax animations", good: true }, { text: "Events calendar", good: true }, { text: "Newsletter signup", good: true }, { text: "Searchable menu with filters", good: true }, { text: "Smooth date picker", good: true }], url: "https://700-dollar-restaurant.vercel.app" },
    { price: "$1,000", label: "Revenue Generator", verdict: "great", summary: "Works for you 24/7", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "Real-time reservation system", good: true }, { text: "Shows actual availability", good: true }, { text: "Allergen information built-in", good: true }, { text: "Private dining inquiries", good: true }, { text: "Gift card page", good: true }], url: "https://1000-dollar-restaurant.vercel.app" },
    { price: "$2,000", label: "Complete Presence", verdict: "great", summary: "Your entire digital operation", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "Blog for content marketing", good: true }, { text: "Reservation management", good: true }, { text: "Waitlist with SMS notifications", good: true }, { text: "Instagram feed integration", good: true }, { text: "Owner dashboard", good: true }], url: "https://2000-dollar-restaurant.vercel.app" },
    { price: "$5,000", label: "Multi-Location", verdict: "enterprise", summary: "For restaurant groups", speed: "Under 500ms", mobile: "Perfect", features: [{ text: "Multiple location support", good: true }, { text: "Customer accounts", good: true }, { text: "Loyalty program", good: true }, { text: "Online gift cards", good: true }, { text: "Centralized dashboard", good: true }], url: "https://5000-dollar-restaurant.vercel.app" },
    { price: "$10,000", label: "Revenue Platform", verdict: "enterprise", summary: "The website IS your business", speed: "Under 300ms", mobile: "App-like", features: [{ text: "Full online ordering", good: true }, { text: "Real-time order tracking", good: true }, { text: "Install as phone app", good: true }, { text: "Multi-language support", good: true }, { text: "Referral program", good: true }], url: "https://10000-dollar-restaurant.vercel.app" },
  ],
  cTitle: "Quick", cItalic: "Comparison",
  tHeaders: ["Budget", "Speed", "Mobile", "Reservations", "Online Orders", "Multi-Location"],
  tRows: [["$20", "5+ seconds", "Broken", "No", "No", "No"], ["$100", "3-4 seconds", "Partial", "No", "No", "No"], ["$200", "1-2 seconds", "Perfect", "Contact form", "No", "No"], ["$500", "Under 1 sec", "Perfect", "Request form", "No", "No"], ["$700", "Under 1 sec", "Perfect", "Request form", "No", "No"], ["$1,000", "Under 1 sec", "Perfect", "Real-time", "No", "No"], ["$2,000", "Under 1 sec", "Perfect", "Full system", "No", "No"], ["$5,000", "Under 500ms", "Perfect", "Multi-location", "No", "Yes"], ["$10,000", "Under 300ms", "App-like", "Full system", "Full", "Yes"]],
  rTitle: "Honest", rItalic: "Recommendations", rDesc: "Choose based on what the website means to your business",
  recs: [
    { title: "Skip These", budget: "$20 - $100", icon: XCircle, color: "red", items: ['$20: Hurts your reputation. Use Google Business Profile instead.', '$100: Forgettable placeholder. Only if you need "something" online.'] },
    { title: "Start Here", budget: "$200 - $500", icon: CheckCircle, color: "green", items: ["Professional, trustworthy, works on all devices.", "This is what your customers expect."] },
    { title: "Compete on Experience", budget: "$700 - $1,000", icon: Star, color: "gold", items: ["Upscale dining, special occasions, competitive markets.", "Customers remember your site."] },
    { title: "When You Need Features", budget: "$2,000+", icon: TrendingUp, color: "purple", items: ["Manage reservations, content marketing, loyalty program.", "Multiple locations or revenue-driving features."] },
  ],
  bTitle: "The Bottom Line", bDesc: "Your website is often the first thing potential customers see. It's either building trust or destroying it.",
  bCards: [{ q: "Just need to exist online?", a: "$200 - $500" }, { q: "Competing for customers?", a: "$500 - $1,000" }, { q: "Website should bring in business?", a: "$1,000 - $2,000" }, { q: "Multiple locations or serious features?", a: "$2,000 - $5,000+" }],
  ctaTitle: "Ready to Build", ctaItalic: "Yours?",
  ctaDesc: "This project demonstrates what different budgets deliver. Let's discuss what your business actually needs - no upselling, just honest recommendations.",
  ctaBtn: "Let's Talk", ctaSec: "View More Case Studies",
};

const ar: C = {
  eyebrow: "مشروع الشفافية", h1a: "من 20$ إلى 10,000$", h1b: "مواقع المطاعم",
  intro: "بنيت كل مستوى لأريك بالضبط ما يشتريه مالك. هذه هي الحقيقة الصادقة عن أسعار مواقع المطاعم.",
  b1: "9 عروض حية", b2: "أسعار شفافة", b3: "أمثلة حقيقية",
  pTitle: "المشكلة", pDesc: "أنت تبحث عن موقع. أحد العروض يقول 20$، وآخر يقول 10,000$. هل المواقع الغالية تنهب أموالك؟ هل المواقع الرخيصة تقطع من الجودة؟",
  pC1: "قيمة غامضة", pC1d: "ما الذي يشتريه كل دولار فعلاً؟",
  pC2: "مصطلحات تقنية", pC2d: "المطورون يتحدثون لغة مختلفة",
  pC3: "لا أمثلة", pC3d: "كيف تقارن دون أن ترى؟",
  tTitle: "كل", tItalic: "المستويات التسعة", tDesc: "كل مستوى موقع حقيقي يعمل. افتحه على هاتفك. جرب إيجاد القائمة. أرسل نموذجاً. الفرق واضح في ثوانٍ.",
  tiers: [
    { price: "20$", label: "المشكلة", verdict: "skip", summary: "يضر بسمعتك", speed: "5+ ثوانٍ", mobile: "معطوب", features: [{ text: "تحميل بطيء بشكل مؤلم", good: false }, { text: "مظهر واضح أنه غير مكتمل", good: false }, { text: "تجربة جوال معطوبة", good: false }, { text: "لا طريقة للتواصل معك", good: false }, { text: "نص تجريبي عام", good: false }], url: "https://20-dollar-restaurant.vercel.app" },
    { price: "100$", label: "القالب", verdict: "placeholder", summary: "حضور مؤقت لا يُذكر", speed: "3-4 ثوانٍ", mobile: "جزئي", features: [{ text: "يعمل على بعض الهواتف", good: false }, { text: "شريط تمرير تلقائي مزعج", good: false }, { text: "صور مخزون عامة", good: false }, { text: "النماذج لا ترسل", good: false }, { text: "روابط التواصل لا تؤدي لأي مكان", good: false }], url: "https://100-dollar-restaurant.vercel.app" },
    { price: "200$", label: "احترافي", verdict: "good", summary: "النقطة المثلى لمعظم", speed: "1-2 ثانية", mobile: "مثالي", features: [{ text: "يُحمل بسرعة، يبدو حاداً", good: true }, { text: "يعمل على جميع الأجهزة", good: true }, { text: "نموذج تواصل يعمل", good: true }, { text: "القائمة والساعات والموقع سهلة الإيجاد", good: true }, { text: "مظهر احترافي", good: true }], url: "https://200-dollar-restaurant.vercel.app" },
    { price: "500$", label: "تنافسي", verdict: "good", summary: "اكسب عملاء من المنافسين", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "رسوم متحركة سلسة عند التمرير", good: true }, { text: "معرض صور مع عرض مكبر", good: true }, { text: "القائمة مرتبة حسب الفئة", good: true }, { text: "نموذج طلب حجز", good: true }, { text: "آراء حقيقية للعملاء", good: true }], url: "https://500-dollar-restaurant.vercel.app" },
    { price: "700$", label: "لا يُنسى", verdict: "good", summary: "اترك انطباعاً يُذكر", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "رسوم باراللاكس جميلة", good: true }, { text: "تقويم فعاليات", good: true }, { text: "الاشتراك في النشرة البريدية", good: true }, { text: "قائمة قابلة للبحث مع فلاتر", good: true }, { text: "منتقي تاريخ سلس", good: true }], url: "https://700-dollar-restaurant.vercel.app" },
    { price: "1,000$", label: "مولّد إيرادات", verdict: "great", summary: "يعمل لصالحك 24/7", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "نظام حجز لحظي", good: true }, { text: "يعرض التوافر الفعلي", good: true }, { text: "معلومات مسببات الحساسية مدمجة", good: true }, { text: "استفسارات الغرف الخاصة", good: true }, { text: "صفحة بطاقات الهدايا", good: true }], url: "https://1000-dollar-restaurant.vercel.app" },
    { price: "2,000$", label: "حضور كامل", verdict: "great", summary: "عمليتك الرقمية كاملة", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "مدونة للتسويق بالمحتوى", good: true }, { text: "إدارة الحجوزات", good: true }, { text: "قائمة انتظار مع إشعارات SMS", good: true }, { text: "تكامل خلاصة انستغرام", good: true }, { text: "لوحة تحكم للمالك", good: true }], url: "https://2000-dollar-restaurant.vercel.app" },
    { price: "5,000$", label: "متعدد المواقع", verdict: "enterprise", summary: "لمجموعات المطاعم", speed: "أقل من 500ms", mobile: "مثالي", features: [{ text: "دعم مواقع متعددة", good: true }, { text: "حسابات عملاء", good: true }, { text: "برنامج ولاء", good: true }, { text: "بطاقات هدايا أونلاين", good: true }, { text: "لوحة تحكم مركزية", good: true }], url: "https://5000-dollar-restaurant.vercel.app" },
    { price: "10,000$", label: "منصة إيرادات", verdict: "enterprise", summary: "الموقع هو عملك بحد ذاته", speed: "أقل من 300ms", mobile: "شبيه بالتطبيق", features: [{ text: "طلب أونلاين كامل", good: true }, { text: "تتبع الطلبات الفوري", good: true }, { text: "تثبيت كتطبيق هاتف", good: true }, { text: "دعم متعدد اللغات", good: true }, { text: "برنامج إحالة", good: true }], url: "https://10000-dollar-restaurant.vercel.app" },
  ],
  cTitle: "مقارنة", cItalic: "سريعة",
  tHeaders: ["الميزانية", "السرعة", "الجوال", "الحجوزات", "الطلبات الأونلاين", "متعدد المواقع"],
  tRows: [["20$", "5+ ثوانٍ", "معطوب", "لا", "لا", "لا"], ["100$", "3-4 ثوانٍ", "جزئي", "لا", "لا", "لا"], ["200$", "1-2 ثانية", "مثالي", "نموذج تواصل", "لا", "لا"], ["500$", "أقل من ثانية", "مثالي", "نموذج طلب", "لا", "لا"], ["700$", "أقل من ثانية", "مثالي", "نموذج طلب", "لا", "لا"], ["1,000$", "أقل من ثانية", "مثالي", "لحظي", "لا", "لا"], ["2,000$", "أقل من ثانية", "مثالي", "نظام كامل", "لا", "لا"], ["5,000$", "أقل من 500ms", "مثالي", "متعدد المواقع", "لا", "نعم"], ["10,000$", "أقل من 300ms", "شبيه بالتطبيق", "نظام كامل", "كامل", "نعم"]],
  rTitle: "توصيات", rItalic: "صادقة", rDesc: "اختر بناءً على ما يعنيه الموقع لعملك",
  recs: [
    { title: "تجنب هذه", budget: "20$ - 100$", icon: XCircle, color: "red", items: ["20$: يضر بسمعتك. استخدم ملف نشاطي التجاري على جوجل بدلاً من ذلك.", '100$: حضور مؤقت لا يُذكر. فقط إن كنت تحتاج "شيئاً" على الإنترنت.'] },
    { title: "ابدأ من هنا", budget: "200$ - 500$", icon: CheckCircle, color: "green", items: ["احترافي، موثوق، يعمل على جميع الأجهزة.", "هذا ما يتوقعه عملاؤك."] },
    { title: "تنافس بالتجربة", budget: "700$ - 1,000$", icon: Star, color: "gold", items: ["المطاعم الراقية، المناسبات الخاصة، الأسواق التنافسية.", "العملاء يتذكرون موقعك."] },
    { title: "عندما تحتاج ميزات", budget: "2,000$+", icon: TrendingUp, color: "purple", items: ["إدارة الحجوزات، التسويق بالمحتوى، برنامج الولاء.", "مواقع متعددة أو ميزات تدر إيرادات."] },
  ],
  bTitle: "الخلاصة", bDesc: "موقعك غالباً هو أول ما يراه العملاء المحتملون. إما أنه يبني الثقة أو يهدمها.",
  bCards: [{ q: "تحتاج فقط وجوداً على الإنترنت؟", a: "200$ - 500$" }, { q: "تتنافس على العملاء؟", a: "500$ - 1,000$" }, { q: "الموقع يجب أن يجلب أعمالاً؟", a: "1,000$ - 2,000$" }, { q: "مواقع متعددة أو ميزات جادة؟", a: "2,000$ - 5,000$+" }],
  ctaTitle: "مستعد لبناء", ctaItalic: "موقعك؟",
  ctaDesc: "هذا المشروع يوضح ما تقدمه كل ميزانية. دعنا نناقش ما يحتاجه عملك فعلاً - لا مبيعات مبالغ فيها، فقط توصيات صادقة.",
  ctaBtn: "تحدث معنا", ctaSec: "عرض المزيد من دراسات الحالة",
};

export default function RestaurantWebsitesTiersCaseStudy({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [c, setC] = useState<C>(en);
  useEffect(() => { params.then(({ locale: l }) => { setLocale(l); setC(l === "ar" ? ar : en); }); }, [params]);

  const colorClass = (v: string) => v === "skip" ? "border-red-500/30" : v === "placeholder" ? "border-orange-500/30" : v === "great" || v === "enterprise" ? "border-[hsl(var(--accent-gold))]/30" : "";
  const summaryColor = (v: string) => v === "skip" ? "text-red-400" : v === "placeholder" ? "text-orange-400" : "text-[hsl(var(--accent-gold))]";
  const recColor = (col: string) => col === "red" ? "text-red-400" : col === "green" ? "text-green-400" : col === "gold" ? "text-[hsl(var(--accent-gold))]" : "text-purple-400";
  const cellColor = (cell: string) => ["No", "لا"].includes(cell) ? "text-red-400/60" : ["Broken", "معطوب"].includes(cell) ? "text-red-400" : ["Full", "Yes", "نعم", "كامل"].includes(cell) ? "text-green-400" : "";

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
          <h1 className="text-5xl md:text-7xl font-display mb-8">{c.h1a} <br /><span className="italic text-text/50">{c.h1b}</span></h1>
          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-4"><Badge label={c.b1} /><Badge label={c.b2} /><Badge label={c.b3} /></div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6">{c.pTitle}</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8">{c.pDesc}</p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {[{ t: c.pC1, d: c.pC1d }, { t: c.pC2, d: c.pC2d }, { t: c.pC3, d: c.pC3d }].map(card => (
                  <div key={card.t} className="p-4 bg-white/5 rounded-lg">
                    <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-2">{card.t}</div>
                    <p className="text-sm text-text/60">{card.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.tTitle} <span className="italic text-text/50">{c.tItalic}</span></h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">{c.tDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.tiers.map((tier, index) => (
              <motion.div key={tier.price} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }} viewport={{ once: true }} className={`glass-card p-6 flex flex-col ${colorClass(tier.verdict)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div><div className="text-3xl font-display font-bold">{tier.price}</div><div className="text-sm text-text/60">{tier.label}</div></div>
                  <a href={tier.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--accent-gold))] hover:text-[hsl(var(--accent-gold))]/80 transition-colors"><ExternalLink className="h-5 w-5" /></a>
                </div>
                <div className={`text-sm mb-4 ${summaryColor(tier.verdict)}`}>{tier.summary}</div>
                <div className="flex gap-4 text-xs text-text/50 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tier.speed}</span>
                  <span className="flex items-center gap-1"><Smartphone className="h-3 w-3" />{tier.mobile}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text/60">
                      {f.good ? <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />}{f.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display mb-6">{c.cTitle} <span className="italic text-text/50">{c.cItalic}</span></h2></div>
          <div className="glass-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">{c.tHeaders.map(h => <th key={h} className="text-left p-4 font-display text-text/80">{h}</th>)}</tr></thead>
            <tbody>{c.tRows.map((row, i) => (<tr key={i} className="border-b border-white/5">{row.map((cell, ci) => (<td key={ci} className={`p-4 ${ci === 0 ? "font-display font-semibold" : "text-text/60"} ${cellColor(cell)}`}>{cell}</td>))}</tr>))}</tbody>
          </table></div></div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">{c.rTitle} <span className="italic text-text/50">{c.rItalic}</span></h2>
            <p className="text-lg text-text/60">{c.rDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.recs.map((rec, i) => (
              <motion.div key={rec.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="glass-card p-8">
                <div className="flex items-center gap-3 mb-4"><rec.icon className={`h-5 w-5 ${recColor(rec.color)}`} /><h3 className="text-lg font-display">{rec.title}</h3></div>
                <div className="text-sm text-[hsl(var(--accent-gold))] mb-4">{rec.budget}</div>
                <ul className="space-y-3">{rec.items.map((item, idx) => (<li key={idx} className="flex items-start gap-2 text-sm text-text/60"><ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0 rtl:rotate-180" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-32">
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">{c.bTitle}</h2>
              <div className="text-xl md:text-2xl font-display leading-relaxed mb-8">{c.bDesc}</div>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {c.bCards.map(card => (<div key={card.q} className="p-4 bg-white/5 rounded-lg"><div className="text-[hsl(var(--accent-gold))] font-display text-lg mb-2">{card.q}</div><p className="text-sm text-text/60">{card.a}</p></div>))}
              </div>
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
