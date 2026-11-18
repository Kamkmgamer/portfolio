import { Locale } from "@/i18n.config";
import { TierCaseStudy, type CellTones, type TierContent } from "../_components/TierCaseStudy";

const en: TierContent = {
  h1a: "$20 to $10,000", h1b: "Restaurant Websites",
  intro: "I built every tier to show you exactly what your money buys. Here's the honest truth about restaurant website pricing.",
  b1: "9 Live Demos", b2: "Transparent Pricing", b3: "Real Examples",
  pTitle: "The Problem", pDesc: "You're shopping for a website. One quote says $20, another says $10,000. Are the expensive ones ripping you off? Are the cheap ones cutting corners?",
  pC1: "Unclear Value", pC1d: "What does each dollar actually buy?",
  pC2: "Technical Jargon", pC2d: "Developers speak a different language",
  pC3: "No Examples", pC3d: "How can you compare without seeing?",
  tTitle: "All", tItalic: "Nine Tiers", tDesc: "Each tier is a real, working website. Open them on your phone. Try to find the menu. Submit a form. The difference is obvious within seconds.",
  demoLabel: "Live demo",
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
    { title: "Skip These", budget: "$20 - $100", negative: true, items: ['$20: Hurts your reputation. Use Google Business Profile instead.', '$100: Forgettable placeholder. Only if you need "something" online.'] },
    { title: "Start Here", budget: "$200 - $500", items: ["Professional, trustworthy, works on all devices.", "This is what your customers expect."] },
    { title: "Compete on Experience", budget: "$700 - $1,000", items: ["Upscale dining, special occasions, competitive markets.", "Customers remember your site."] },
    { title: "When You Need Features", budget: "$2,000+", items: ["Manage reservations, content marketing, loyalty program.", "Multiple locations or revenue-driving features."] },
  ],
  bTitle: "The Bottom Line", bDesc: "Your website is often the first thing potential customers see. It's either building trust or destroying it.",
  bCards: [{ q: "Just need to exist online?", a: "$200 - $500" }, { q: "Competing for customers?", a: "$500 - $1,000" }, { q: "Website should bring in business?", a: "$1,000 - $2,000" }, { q: "Multiple locations or serious features?", a: "$2,000 - $5,000+" }],
};

const ar: TierContent = {
  h1a: "من 20$ إلى 10,000$", h1b: "مواقع المطاعم",
  intro: "بنيت كل مستوى لأريك بالضبط ما يشتريه مالك. هذه هي الحقيقة الصادقة عن أسعار مواقع المطاعم.",
  b1: "9 عروض حية", b2: "أسعار شفافة", b3: "أمثلة حقيقية",
  pTitle: "المشكلة", pDesc: "أنت تبحث عن موقع. أحد العروض يقول 20$، وآخر يقول 10,000$. هل المواقع الغالية تنهب أموالك؟ هل المواقع الرخيصة تقطع من الجودة؟",
  pC1: "قيمة غامضة", pC1d: "ما الذي يشتريه كل دولار فعلاً؟",
  pC2: "مصطلحات تقنية", pC2d: "المطورون يتحدثون لغة مختلفة",
  pC3: "لا أمثلة", pC3d: "كيف تقارن دون أن ترى؟",
  tTitle: "كل", tItalic: "المستويات التسعة", tDesc: "كل مستوى موقع حقيقي يعمل. افتحه على هاتفك. جرب إيجاد القائمة. أرسل نموذجاً. الفرق واضح في ثوانٍ.",
  demoLabel: "عرض حي",
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
    { title: "تجنب هذه", budget: "20$ - 100$", negative: true, items: ["20$: يضر بسمعتك. استخدم ملف نشاطي التجاري على جوجل بدلاً من ذلك.", '100$: حضور مؤقت لا يُذكر. فقط إن كنت تحتاج "شيئاً" على الإنترنت.'] },
    { title: "ابدأ من هنا", budget: "200$ - 500$", items: ["احترافي، موثوق، يعمل على جميع الأجهزة.", "هذا ما يتوقعه عملاؤك."] },
    { title: "تنافس بالتجربة", budget: "700$ - 1,000$", items: ["المطاعم الراقية، المناسبات الخاصة، الأسواق التنافسية.", "العملاء يتذكرون موقعك."] },
    { title: "عندما تحتاج ميزات", budget: "2,000$+", items: ["إدارة الحجوزات، التسويق بالمحتوى، برنامج الولاء.", "مواقع متعددة أو ميزات تدر إيرادات."] },
  ],
  bTitle: "الخلاصة", bDesc: "موقعك غالباً هو أول ما يراه العملاء المحتملون. إما أنه يبني الثقة أو يهدمها.",
  bCards: [{ q: "تحتاج فقط وجوداً على الإنترنت؟", a: "200$ - 500$" }, { q: "تتنافس على العملاء؟", a: "500$ - 1,000$" }, { q: "الموقع يجب أن يجلب أعمالاً؟", a: "1,000$ - 2,000$" }, { q: "مواقع متعددة أو ميزات جادة؟", a: "2,000$ - 5,000$+" }],
};

const cellTones: CellTones = {
  danger: ["Broken", "معطوب"],
  muted: ["No", "لا"],
  success: ["Full", "Yes", "نعم", "كامل"],
};

export default async function RestaurantWebsitesTiersCaseStudy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <TierCaseStudy slug="restaurant-websites-tiers" locale={locale} c={locale === "ar" ? ar : en} cellTones={cellTones} />;
}
