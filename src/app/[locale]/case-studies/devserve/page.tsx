import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getNextCaseStudy } from "@/lib/content";
import {
  CheckList,
  DetailSection,
  InfoCard,
  NextUp,
  PageHeader,
  StatGrid,
  Timeline,
} from "@/components/site/layout";

type C = {
  title: string;
  intro: string;
  value: string;
  badges: string[];
  statsLabels: string[];
  statsDescs: string[];
  overviewTitle: string;
  overviewDesc: string;
  roleTitle: string;
  roleItems: string[];
  achievementsTitle: string;
  achievements: string[];
  timelineTitle: string;
  timelineDesc: string;
  weeks: string[];
  techTitle: string;
  techDesc: string;
  techCategories: string[];
  fullAchievementsTitle: string;
  fullAchievementsDesc: string;
};

const en: C = {
  title: "DevServe Platform",
  intro:
    "Enterprise-grade SaaS platform with secure payments, monitoring, and enterprise features: built solo in 35 days.",
  value: "Industry-estimated value: $90k-$130k",
  badges: ["Enterprise SaaS", "35 Days", "Full-Stack"],
  statsLabels: ["Development Time", "Industry Estimate", "Team Size", "Test Coverage"],
  statsDescs: ["Solo development", "Development value", "Full-stack architect", "Comprehensive suite"],
  overviewTitle: "Project Overview",
  overviewDesc:
    "DevServe showcases enterprise-grade development practices, delivering a complete SaaS platform with the speed and quality typically reserved for large development teams.",
  roleTitle: "My Role",
  roleItems: [
    "Full-stack architect and sole developer",
    "Implemented enterprise security practices",
    "Set up production monitoring and CI/CD",
    "Delivered comprehensive testing suite",
  ],
  achievementsTitle: "Key Achievements",
  achievements: [
    "Built enterprise-grade SaaS platform solo in 35 days",
    "Implemented secure payment processing with Stripe & PayPal",
    "Achieved 80%+ test coverage with comprehensive test suite",
    "Set up production-ready monitoring and alerting",
    "Delivered $90k-$130k worth of development value",
    "Zero security vulnerabilities in final audit",
  ],
  timelineTitle: "35-Day Timeline",
  timelineDesc: "From concept to production-ready platform in 5 weeks",
  weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  techTitle: "Technology Stack",
  techDesc: "Modern, scalable technologies chosen for enterprise-grade performance",
  techCategories: ["Frontend", "Backend", "Security", "Payments", "DevOps", "Testing"],
  fullAchievementsTitle: "Complete Achievements",
  fullAchievementsDesc: "Delivering enterprise-grade quality",
};

const ar: C = {
  title: "منصة DevServe",
  intro: "بنيت منصة SaaS كاملة — دفع، مراقبة، أمان، كل شيء — لوحدي في 35 يوماً.",
  value: "قيمة سوقية مقدّرة: من 90K$ إلى 130K$",
  badges: ["SaaS احترافي", "35 يوم", "كل شيء لوحدي"],
  statsLabels: ["وقت التطوير", "القيمة السوقية", "حجم الفريق", "تغطية الاختبارات"],
  statsDescs: ["وحدي من أول سطر لآخر سطر", "ما تدفعه فرق كاملة مقابله", "مطور واحد، مشروع كامل", "اختبارات من البداية للنهاية"],
  overviewTitle: "نظرة على المشروع",
  overviewDesc:
    "DevServe يثبت أن منصة SaaS احترافية لا تحتاج فريقاً كبيراً. بنيته وحدي بنفس المعايير التي تستخدمها الشركات الكبيرة.",
  roleTitle: "ما الذي عملته",
  roleItems: ["بنيت كل شيء من الصفر لوحدي", "أمان على مستوى احترافي", "مراقبة حية وCI/CD من اليوم الأول", "اختبارات شاملة قبل التسليم"],
  achievementsTitle: "ما تحقق",
  achievements: [
    "منصة SaaS كاملة في 35 يوماً بمفردي",
    "دفع آمن عبر Stripe وPayPal",
    "تغطية اختبارات 80%+",
    "مراقبة وتنبيهات جاهزة للإنتاج",
    "قيمة تطوير من 90K$ إلى 130K$",
    "صفر ثغرات في التدقيق الأمني",
  ],
  timelineTitle: "35 يوماً خطوة بخطوة",
  timelineDesc: "من الفكرة إلى منصة جاهزة في 5 أسابيع",
  weeks: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4", "الأسبوع 5"],
  techTitle: "التقنيات المستخدمة",
  techDesc: "اخترت كل تقنية بعناية - لا ترف، فقط ما يشتغل",
  techCategories: ["الواجهة", "الخلفية", "الأمان", "الدفع", "DevOps", "الاختبارات"],
  fullAchievementsTitle: "كل الإنجازات",
  fullAchievementsDesc: "جودة احترافية من البداية للنهاية",
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
  { en: "35 Days", ar: "35 يوماً" },
  { en: "$90k–$130k", ar: "90K$–130K$" },
  { en: "Solo", ar: "فردي" },
  { en: "80%+", ar: "80%+" },
];

export default async function DevServeCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = isAr ? ar : en;
  const dict = await getDictionary(locale);
  const next = getNextCaseStudy("devserve", locale);

  return (
    <article>
      <PageHeader
        breadcrumb={{ href: `/${locale}/case-studies`, label: dict.caseStudies.all }}
        title={c.title}
        lead={c.intro}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <ul className="flex flex-wrap gap-1.5">
            {c.badges.map((b) => (
              <li key={b} className="tag">
                {b}
              </li>
            ))}
          </ul>
          <p className="text-sm font-medium text-accent">{c.value}</p>
        </div>
      </PageHeader>

      <div className="container-site pb-6">
        <StatGrid
          className="reveal"
          items={stats.map((s, i) => ({
            value: isAr ? s.ar : s.en,
            label: c.statsLabels[i],
            note: c.statsDescs[i],
          }))}
        />
      </div>

      <DetailSection title={c.overviewTitle} description={c.overviewDesc}>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title={c.roleTitle}>
            <CheckList items={c.roleItems} className="mt-4" />
          </InfoCard>
          <InfoCard title={c.achievementsTitle}>
            <CheckList items={c.achievements.slice(0, 4)} className="mt-4" />
          </InfoCard>
        </div>
      </DetailSection>

      <DetailSection title={c.timelineTitle} description={c.timelineDesc}>
        <Timeline
          items={timeline.map((week, i) => ({
            label: c.weeks[i],
            body: (
              <ul className="flex flex-wrap gap-1.5">
                {(isAr ? week.ar : week.en).map((task) => (
                  <li key={task} className="tag">
                    {task}
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      </DetailSection>

      <DetailSection title={c.techTitle} description={c.techDesc}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {techStack.map((group, i) => (
            <InfoCard key={c.techCategories[i]} title={c.techCategories[i]}>
              <ul className="grid gap-1.5 text-[0.9375rem]">
                {(isAr ? group.ar : group.en).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </InfoCard>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={c.fullAchievementsTitle} description={c.fullAchievementsDesc}>
        <CheckList items={c.achievements} className="sm:grid-cols-2 sm:gap-x-8" />
      </DetailSection>

      <NextUp label={dict.caseStudies.next} title={next.title} description={next.summary} href={`/${locale}/case-studies/${next.slug}`} />
    </article>
  );
}
