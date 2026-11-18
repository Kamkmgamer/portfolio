import { Locale } from "@/i18n.config";
import { TierCaseStudy, type CellTones, type TierContent } from "../_components/TierCaseStudy";

const en: TierContent = {
  h1a: "$20 to $10,000", h1b: "Ecommerce",
  intro: "I built every tier to show you exactly what your money buys for online stores. Here's the honest truth.",
  b1: "6 Live Demos", b2: "Transparent Pricing", b3: "See the Backend",
  pTitle: "The Problem", pDesc: "You're shopping for an online store. One quote says $20, another says $10,000. Are the expensive ones ripping you off? Are the cheap ones cutting corners?",
  pC1: "Unclear Value", pC1d: "What does each dollar actually buy?",
  pC2: "80% Is Invisible", pC2d: "Backend systems you never see",
  pC3: "No Examples", pC3d: "How can you compare without seeing?",
  tTitle: "All", tItalic: "Six Tiers", tDesc: "Each tier is a real, working store. Open them on your phone. Try to add something to cart. Go through checkout. The difference is obvious within seconds.",
  demoLabel: "Live demo",
  tiers: [
    { price: "$20", label: "The Problem", verdict: "skip", summary: "Hurts your reputation", speed: "5+ seconds", mobile: "Broken", features: [{ text: "Painfully slow loading", good: false }, { text: "Placeholder text everywhere", good: false }, { text: "Broken mobile experience", good: false }, { text: "WhatsApp only, no checkout", good: false }, { text: "Looks like a scam", good: false }], url: "https://20-dollar-ecommerce-app.vercel.app" },
    { price: "$100", label: "The Template", verdict: "placeholder", summary: "Forgettable placeholder", speed: "3-4 seconds", mobile: "Partial", features: [{ text: "Works on some phones", good: false }, { text: "Annoying auto-play carousel", good: false }, { text: "Generic product photos", good: false }, { text: "WhatsApp ordering only", good: false }, { text: "No product details or zoom", good: false }], url: "https://100-dollar-ecommerce-app.vercel.app" },
    { price: "$500", label: "Competitive", verdict: "good", summary: "Win customers from Amazon", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "Loads fast, keeps attention", good: true }, { text: "Works on all devices", good: true }, { text: "Smooth scroll animations", good: true }, { text: "Product gallery with lightbox", good: true }, { text: "Real customer reviews", good: true }], url: "https://500-dollar-ecommerce-app.vercel.app" },
    { price: "$1,000", label: "Revenue Generator", verdict: "great", summary: "Works for you 24/7", speed: "Under 1 sec", mobile: "Perfect", features: [{ text: "User accounts & authentication", good: true }, { text: "Real-time inventory", good: true }, { text: "Abandoned cart recovery", good: true }, { text: "Multiple payment options", good: true }, { text: "Order tracking & history", good: true }], url: "https://1000-dollar-ecommerce-app.vercel.app" },
    { price: "$5,000", label: "Multi-Product", verdict: "enterprise", summary: "For scaling businesses", speed: "Under 500ms", mobile: "Perfect", features: [{ text: "User accounts with profiles", good: true }, { text: "Advanced search with autocomplete", good: true }, { text: "Subscribe and save", good: true }, { text: "Wholesale with special pricing", good: true }, { text: "Buy now, pay later", good: true }], url: "https://5000-dollar-ecommerce-app.vercel.app" },
    { price: "$10,000", label: "Revenue Platform", verdict: "enterprise", summary: "You own the technology", speed: "Under 300ms", mobile: "App-like", features: [{ text: "Secure user accounts & auth", good: true }, { text: "AI-powered recommendations", good: true }, { text: "Personalized homepage", good: true }, { text: "Install as phone app", good: true }, { text: "Works offline", good: true }], url: "https://10000-dollar-ecommerce-app.vercel.app" },
  ],
  cTitle: "Quick", cItalic: "Comparison",
  tHeaders: ["Budget", "Speed", "Mobile", "User Accounts", "Shopping Cart", "Checkout", "Advanced Features"],
  tRows: [["$20", "5+ seconds", "Broken", "No", "WhatsApp only", "No", "No"], ["$100", "3-4 seconds", "Partial", "No", "WhatsApp only", "No", "No"], ["$500", "Under 1 sec", "Perfect", "No", "Smooth", "Smooth", "Filters"], ["$1,000", "Under 1 sec", "Perfect", "Yes", "Optimized", "Multi-payment", "Abandoned cart"], ["$5,000", "Under 500ms", "Perfect", "Advanced", "Advanced", "Advanced", "Subscriptions"], ["$10,000", "Under 300ms", "App-like", "Enterprise", "Enterprise", "Enterprise", "AI/ML"]],
  rTitle: "Honest", rItalic: "Recommendations", rDesc: "Choose based on what the website means to your business",
  recs: [
    { title: "Skip These", budget: "$20 - $100", negative: true, items: ["$20: Hurts your reputation. Use Instagram Shopping or Etsy instead.", '$100: Forgettable placeholder. Only if you need "something\" online, but don\'t expect huge ROI.'] },
    { title: "Start Here", budget: "$500", items: ["Professional, trustworthy, works on all devices.", "This is what your customers expect from online stores."] },
    { title: "Drive Revenue", budget: "$1,000+", items: ["Abandoned cart recovery, automation, multiple payments.", "The backend is now a business tool that pays for itself."] },
    { title: "Own Your Tech", budget: "$10,000", items: ["AI recommendations, custom infrastructure, no monthly fees.", "You own it forever instead of renting from Shopify."] },
  ],
  bTitle: "The Bottom Line", bDesc: "Your ecommerce site is often the first thing potential customers see. It's either building trust or destroying it.",
  bCards: [{ q: "Just need to exist online?", a: "$500" }, { q: "Competing for customers?", a: "$500 - $1,000" }, { q: "Website should drive revenue?", a: "$1,000 - $5,000" }, { q: "Want to own your technology?", a: "$10,000+" }],
};

const ar: TierContent = {
  h1a: "من 20$ إلى 10,000$", h1b: "التجارة الإلكترونية",
  intro: "بنيت كل مستوى لأريك بالضبط ما يشتريه مالك للمتاجر الأونلاين. هذه هي الحقيقة الصادقة.",
  b1: "6 عروض حية", b2: "أسعار شفافة", b3: "رأى الواجهة الخلفية",
  pTitle: "المشكلة", pDesc: "أنت تبحث عن متجر أونلاين. أحد العروض يقول 20$، وآخر يقول 10,000$. هل المواقع الغالية تنهب أموالك؟ هل المواقع الرخيصة تقطع من الجودة؟",
  pC1: "قيمة غامضة", pC1d: "ما الذي يشتريه كل دولار فعلاً؟",
  pC2: "80% غير مرئي", pC2d: "أنظمة خلفية لا تراها أبداً",
  pC3: "لا أمثلة", pC3d: "كيف تقارن دون أن ترى؟",
  tTitle: "كل", tItalic: "المستويات الستة", tDesc: "كل مستوى متجر حقيقي يعمل. افتحه على هاتفك. جرب إضافة شيء للسلة. أكمل عملية الدفع. الفرق واضح في ثوانٍ.",
  demoLabel: "عرض حي",
  tiers: [
    { price: "20$", label: "المشكلة", verdict: "skip", summary: "يضر بسمعتك", speed: "5+ ثوانٍ", mobile: "معطوب", features: [{ text: "تحميل بطيء بشكل مؤلم", good: false }, { text: "نص تجريبي في كل مكان", good: false }, { text: "تجربة جوال معطوبة", good: false }, { text: "واتساب فقط، لا دفع", good: false }, { text: "يبدو كموقع احتيالي", good: false }], url: "https://20-dollar-ecommerce-app.vercel.app" },
    { price: "100$", label: "القالب", verdict: "placeholder", summary: "حضور مؤقت لا يُذكر", speed: "3-4 ثوانٍ", mobile: "جزئي", features: [{ text: "يعمل على بعض الهواتف", good: false }, { text: "شريط تمرير تلقائي مزعج", good: false }, { text: "صور منتجات عامة", good: false }, { text: "الطلب عبر واتساب فقط", good: false }, { text: "لا تفاصيل منتجات أو تكبير", good: false }], url: "https://100-dollar-ecommerce-app.vercel.app" },
    { price: "500$", label: "تنافسي", verdict: "good", summary: "اكسب عملاء من أمازون", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "يُحمل بسرعة ويجذب الانتباه", good: true }, { text: "يعمل على جميع الأجهزة", good: true }, { text: "رسوم متحركة سلسة عند التمرير", good: true }, { text: "معرض منتجات مع عرض مكبر", good: true }, { text: "آراء حقيقية للعملاء", good: true }], url: "https://500-dollar-ecommerce-app.vercel.app" },
    { price: "1,000$", label: "مولّد إيرادات", verdict: "great", summary: "يعمل لصالحك 24/7", speed: "أقل من ثانية", mobile: "مثالي", features: [{ text: "حسابات مستخدمين وتسجيل دخول", good: true }, { text: "مخزون لحظي", good: true }, { text: "استرداد السلة المهجورة", good: true }, { text: "خيارات دفع متعددة", good: true }, { text: "تتبع الطلبات وسجلها", good: true }], url: "https://1000-dollar-ecommerce-app.vercel.app" },
    { price: "5,000$", label: "متعدد المنتجات", verdict: "enterprise", summary: "للأعمال المتنامية", speed: "أقل من 500ms", mobile: "مثالي", features: [{ text: "حسابات مستخدمين مع ملفات شخصية", good: true }, { text: "بحث متقدم مع إكمال تلقائي", good: true }, { text: "اشترك ووفّر", good: true }, { text: "بيع بالجملة بأسعار خاصة", good: true }, { text: "اشتر الآن وادفع لاحقاً", good: true }], url: "https://5000-dollar-ecommerce-app.vercel.app" },
    { price: "10,000$", label: "منصة إيرادات", verdict: "enterprise", summary: "أنت تملك التقنية", speed: "أقل من 300ms", mobile: "شبيه بالتطبيق", features: [{ text: "حسابات مستخدمين آمنة وتسجيل دخول", good: true }, { text: "توصيات مدعومة بالذكاء الاصطناعي", good: true }, { text: "صفحة رئيسية مخصصة", good: true }, { text: "تثبيت كتطبيق هاتف", good: true }, { text: "يعمل بدون إنترنت", good: true }], url: "https://10000-dollar-ecommerce-app.vercel.app" },
  ],
  cTitle: "مقارنة", cItalic: "سريعة",
  tHeaders: ["الميزانية", "السرعة", "الجوال", "حسابات المستخدمين", "سلة التسوق", "الدفع", "ميزات متقدمة"],
  tRows: [["20$", "5+ ثوانٍ", "معطوب", "لا", "واتساب فقط", "لا", "لا"], ["100$", "3-4 ثوانٍ", "جزئي", "لا", "واتساب فقط", "لا", "لا"], ["500$", "أقل من ثانية", "مثالي", "لا", "سلس", "سلس", "فلاتر"], ["1,000$", "أقل من ثانية", "مثالي", "نعم", "محسّن", "دفع متعدد", "استرداد سلة"], ["5,000$", "أقل من 500ms", "مثالي", "متقدم", "متقدم", "متقدم", "اشتراكات"], ["10,000$", "أقل من 300ms", "شبيه بالتطبيق", "مؤسسي", "مؤسسي", "مؤسسي", "ذكاء اصطناعي"]],
  rTitle: "توصيات", rItalic: "صادقة", rDesc: "اختر بناءً على ما يعنيه الموقع لعملك",
  recs: [
    { title: "تجنب هذه", budget: "20$ - 100$", negative: true, items: ["20$: يضر بسمعتك. استخدم انستغرام شوبينج أو إيتسي بدلاً من ذلك.", '100$: حضور مؤقت لا يُذكر. فقط إن كنت تريد "شيئاً" على الإنترنت، لكن لا تتوقع عائداً كبيراً.'] },
    { title: "ابدأ من هنا", budget: "500$", items: ["احترافي، موثوق، يعمل على جميع الأجهزة.", "هذا ما يتوقعه عملاؤك من المتاجر الأونلاين."] },
    { title: "حرّك الإيرادات", budget: "1,000$+", items: ["استرداد السلة المهجورة، أتمتة، دفع متعدد.", "الواجهة الخلفية أصبحت أداة عمل تسدد تكلفتها."] },
    { title: "امتلك تقنيتك", budget: "10,000$", items: ["توصيات بذكاء اصطناعي، بنية تحتية مخصصة، لا رسوم شهرية.", "تملكه إلى الأبد بدلاً من استئجاره من Shopify."] },
  ],
  bTitle: "الخلاصة", bDesc: "متجرك الإلكتروني غالباً هو أول ما يراه العملاء المحتملون. إما أنه يبني الثقة أو يهدمها.",
  bCards: [{ q: "تحتاج فقط وجوداً على الإنترنت؟", a: "500$" }, { q: "تتنافس على العملاء؟", a: "500$ - 1,000$" }, { q: "الموقع يجب أن يدر إيرادات؟", a: "1,000$ - 5,000$" }, { q: "تريد امتلاك تقنيتك؟", a: "10,000$+" }],
};

const cellTones: CellTones = {
  danger: ["Broken", "معطوب"],
  muted: ["No", "لا"],
  success: [
    "Enterprise", "Optimized", "Advanced", "AI/ML", "Subscriptions", "Abandoned cart",
    "مؤسسي", "متقدم", "اشتراكات", "استرداد سلة", "ذكاء اصطناعي",
  ],
};

export default async function EcommerceWebsitesTiersCaseStudy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <TierCaseStudy slug="ecommerce-websites-tiers" locale={locale} c={locale === "ar" ? ar : en} cellTones={cellTones} />;
}
