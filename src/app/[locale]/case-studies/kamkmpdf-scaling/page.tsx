import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getNextCaseStudy } from "@/lib/content";
import { Callout, CheckList, DetailSection, InfoCard, NextUp, PageHeader, StatGrid } from "@/components/site/layout";

const en = {
  title: "Scaling to 6,000 PDFs Per Hour",
  intro:
    "How I optimized a document generation system to process 6,000 PDFs per hour on a single Railway worker, a throughput number that typically requires 5-10 workers.",
  badges: ["High Scale", "Single Worker", "99.7% Uptime"],
  statsLabels: ["Throughput", "P95 Latency", "Infrastructure", "Success Rate"],
  statsValues: ["6,000/hr", "<2s", "1 Worker", "99.7%"],
  statsDescs: ["PDFs generated per hour", "Response time at 95th percentile", "Single Railway instance", "Job completion rate"],
  challengeTitle: "The Challenge",
  challengeDesc:
    "KamkmPDF started as a simple Next.js app with a cron job. It worked for 50 users, but when hundreds started uploading simultaneously, the queue backed up. Most teams would deploy 5-10 workers. I wanted to see how far a single optimized worker could go.",
  beforeTitle: "Starting Point",
  beforeRows: [
    ["Throughput", "200-300/hr"],
    ["Generation time", "5-10s"],
    ["Concurrent jobs", "3 before crash"],
    ["AI keys", "1 (rate limits)"],
  ],
  afterTitle: "Final Results",
  afterRows: [
    ["Throughput", "6,000/hr"],
    ["Generation time", "<2s"],
    ["Concurrent jobs", "10 stable"],
    ["AI keys", "11 with failover"],
  ],
  optTitle: "Key Optimizations",
  optDesc: "Four major changes that transformed performance",
  optimizations: [
    {
      title: "Go Worker Rewrite",
      description: "Migrated from TypeScript to Go for better concurrency and memory efficiency using goroutines.",
      impact: "2x throughput increase",
    },
    {
      title: "Cerebras AI Integration",
      description:
        "Implemented priority-based AI model selection with Cerebras GPT-oss-120b as primary for high-speed inference.",
      impact: "5-10x faster than GPT-4",
    },
    {
      title: "Database Optimization",
      description: "Atomic job claiming with FOR UPDATE SKIP LOCKED, connection pooling, and strategic indexing.",
      impact: "Query time: 100ms → 5ms",
    },
    {
      title: "Browser Pooling",
      description: "Reusable Puppeteer instances instead of spawning new browsers per job.",
      impact: "10 concurrent PDFs, same memory",
    },
  ],
  archTitle: "Architecture Highlights",
  archDesc: "Built for horizontal scaling from day one",
  archQueueTitle: "Queue System",
  archWorkerTitle: "Worker Design",
  archFeatures: [
    "PostgreSQL-backed queue with atomic job claiming",
    "Round-robin API key distribution for AI redundancy",
    "Multi-tier PDF fallback (Puppeteer → PDFKit → Static)",
    "Browser pool with automatic cleanup and monitoring",
    "Horizontal scaling ready — just add more workers",
  ],
  techTitle: "Technology Stack",
  techDesc: "Carefully chosen for maximum throughput",
  techCategories: ["Frontend", "Worker", "Database", "AI", "PDF Generation", "Storage"],
  techItems: [
    ["Next.js 15", "React 19", "Tailwind CSS", "tRPC"],
    ["Go", "Goroutines", "Railway", "Docker"],
    ["PostgreSQL 14", "Drizzle ORM", "Connection Pooling"],
    ["Cerebras GPT-oss-120b", "OpenRouter", "11 API Keys", "Auto-failover"],
    ["Puppeteer", "PDFKit", "Browser Pool", "Memory Management"],
    ["UploadThing v7", "Signed URLs", "File Metadata"],
  ],
  costTitle: "Cost Efficiency",
  costDesc: "Enterprise throughput, startup budget",
  infraLabel: "Infrastructure",
  aiLabel: "AI Costs",
  infraRows: [
    ["Single Railway worker", "~$20/mo"],
    ["PostgreSQL database", "~$15/mo"],
    ["No Redis or queues", "$0"],
  ],
  aiRows: [
    ["Cerebras GPT-oss-120b", "~$0.002/PDF"],
    ["At 6,000 PDFs/hour", "~$12/hr"],
    ["vs GPT-4 equivalent", "5x savings"],
  ],
  costFooter:
    "Total: ~$35/month infrastructure + usage-based AI costs. Competitors typically spend $200-500/month for similar throughput.",
};

type C = typeof en;

const ar: C = {
  title: "التوسع إلى 6,000 PDF في الساعة",
  intro:
    "كيف حسّنت نظام توليد مستندات لمعالجة 6,000 PDF في الساعة على عامل Railway واحد، وهو رقم أداء يتطلب عادةً 5-10 عمال.",
  badges: ["توسع عالٍ", "عامل واحد", "99.7% وقت تشغيل"],
  statsLabels: ["معدل الإنتاج", "زمن الاستجابة P95", "البنية التحتية", "معدل النجاح"],
  statsValues: ["6,000/ساعة", "أقل من 2 ثانية", "عامل واحد", "99.7%"],
  statsDescs: ["PDF مولَّد في الساعة", "وقت الاستجابة عند الصدارة 95", "مثيل Railway واحد", "معدل إكمال المهام"],
  challengeTitle: "التحدي الأصلي",
  challengeDesc:
    "بدأ KamkmPDF كتطبيق Next.js بسيط مع وظيفة cron. عمل مع 50 مستخدماً، لكن عندما بدأ المئات بالرفع في وقت واحد، تراكمت قائمة الانتظار. معظم الفرق ستستخدم 5-10 عمال. أردت أن أرى إلى أي مدى يمكن لعامل واحد محسَّن أن يصل.",
  beforeTitle: "نقطة البداية",
  beforeRows: [
    ["معدل الإنتاج", "200-300/ساعة"],
    ["وقت التوليد", "5-10 ثوانٍ"],
    ["المهام المتزامنة", "3 قبل الانهيار"],
    ["مفاتيح AI", "1 (حدود المعدل)"],
  ],
  afterTitle: "النتائج النهائية",
  afterRows: [
    ["معدل الإنتاج", "6,000/ساعة"],
    ["وقت التوليد", "أقل من 2 ثانية"],
    ["المهام المتزامنة", "10 مستقرة"],
    ["مفاتيح AI", "11 مع التبديل التلقائي"],
  ],
  optTitle: "التحسينات الرئيسية",
  optDesc: "أربعة تغييرات رئيسية حوّلت الأداء",
  optimizations: [
    {
      title: "إعادة كتابة العامل بـ Go",
      description: "نقلت من TypeScript إلى Go. تزامن أفضل وكفاءة ذاكرة أسرع.",
      impact: "ضعف الإنتاج",
    },
    {
      title: "Cerebras AI بدل GPT-4",
      description: "Cerebras GPT-oss-120b كنموذج رئيسي. أسرع بكثير وتكلفته أقل.",
      impact: "5-10× أسرع من GPT-4",
    },
    {
      title: "تحسين قاعدة البيانات",
      description: "استطلاع ذري + SKIP LOCKED + تجميع اتصالات + فهرسة صحيحة.",
      impact: "وقت الاستعلام: 100ms → 5ms",
    },
    {
      title: "تجميع المتصفح",
      description: "Puppeteer بدون إغلاق بين كل طلب. نفس الذاكرة، 10 PDFs متزامنة.",
      impact: "10 PDFs بنفس الذاكرة",
    },
  ],
  archTitle: "أبرز البنية",
  archDesc: "مبنية للتوسع الأفقي منذ البداية",
  archQueueTitle: "نظام قائمة الانتظار",
  archWorkerTitle: "تصميم العامل",
  archFeatures: [
    "قائمة انتظار PostgreSQL مع استطلاع ذري",
    "توزيع دوري لمفاتيح API لتكرارية AI",
    "تراجع PDF متعدد الطبقات (Puppeteer → PDFKit → ثابت)",
    "تجميع متصفح مع تنظيف ومراقبة تلقائية",
    "جاهز للتوسع الأفقي، فقط أضف عمالاً آخرين",
  ],
  techTitle: "التقنيات المستخدمة",
  techDesc: "اختيرت بعناية لأقصى إنتاجية",
  techCategories: ["الواجهة الأمامية", "العامل", "قاعدة البيانات", "الذكاء الاصطناعي", "توليد PDF", "التخزين"],
  techItems: [
    ["Next.js 15", "React 19", "Tailwind CSS", "tRPC"],
    ["Go", "Goroutines", "Railway", "Docker"],
    ["PostgreSQL 14", "Drizzle ORM", "تجميع الاتصالات"],
    ["Cerebras GPT-oss-120b", "OpenRouter", "11 مفتاح API", "تبديل تلقائي"],
    ["Puppeteer", "PDFKit", "تجميع المتصفح", "إدارة الذاكرة"],
    ["UploadThing v7", "URLs موقعة", "بيانات الملفات الوصفية"],
  ],
  costTitle: "كفاءة التكلفة",
  costDesc: "إنتاجية مؤسسية بميزانية ناشئة",
  infraLabel: "البنية التحتية",
  aiLabel: "تكاليف AI",
  infraRows: [
    ["عامل Railway واحد", "~$20/شهر"],
    ["قاعدة بيانات PostgreSQL", "~$15/شهر"],
    ["لا Redis ولا قوائم انتظار", "$0"],
  ],
  aiRows: [
    ["Cerebras GPT-oss-120b", "~$0.002/PDF"],
    ["عند 6,000 PDF/ساعة", "~$12/ساعة"],
    ["مقارنةً بـ GPT-4", "توفير 5 أضعاف"],
  ],
  costFooter:
    "الإجمالي: ~$35/شهر بنية تحتية + تكاليف AI بحسب الاستخدام. المنافسون يدفعون عادةً $200-500/شهر لإنتاجية مماثلة.",
};

function CostList({ label, rows, highlight }: { label: string; rows: string[][]; highlight?: number }) {
  return (
    <div className="card p-6 md:p-7">
      <p className="font-semibold text-ink">{label}</p>
      <dl className="mt-4 grid">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0 last:pb-0"
          >
            <dt className="text-[0.9375rem] text-ink-2">{k}</dt>
            <dd className={i === highlight ? "text-sm font-semibold text-accent tabular ltr:font-mono" : "text-sm text-ink tabular ltr:font-mono"}>
              <bdi>{v}</bdi>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function KamkmPDFScalingCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = locale === "ar" ? ar : en;
  const dict = await getDictionary(locale);
  const next = getNextCaseStudy("kamkmpdf-scaling", locale);

  return (
    <article>
      <PageHeader
        breadcrumb={{ href: `/${locale}/case-studies`, label: dict.caseStudies.all }}
        title={c.title}
        lead={c.intro}
      >
        <ul className="flex flex-wrap gap-1.5">
          {c.badges.map((b) => (
            <li key={b} className="tag">
              {b}
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="container-site pb-6">
        <StatGrid
          className="reveal"
          items={c.statsValues.map((value, i) => ({
            value,
            label: c.statsLabels[i],
            note: c.statsDescs[i],
          }))}
        />
      </div>

      <DetailSection title={c.challengeTitle} description={c.challengeDesc}>
        <div className="card overflow-x-auto">
          <table className="data-table [&_td]:px-3 [&_th]:px-3 sm:[&_td]:px-4 sm:[&_th]:px-4">
            <thead>
              <tr>
                <td className="w-[34%] border-b border-line-strong bg-paper-2" aria-hidden="true" />
                <th scope="col">{c.beforeTitle}</th>
                <th scope="col" className="text-accent">
                  {c.afterTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.beforeRows.map(([label, before], i) => (
                <tr key={label}>
                  <th scope="row" className="border-b border-line bg-transparent text-start align-top font-medium text-ink [tr:last-child_&]:border-b-0">
                    {label}
                  </th>
                  <td className="text-sm text-muted tabular ltr:font-mono">{before}</td>
                  <td className="text-sm font-semibold text-ink tabular ltr:font-mono">{c.afterRows[i][1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DetailSection>

      <DetailSection title={c.optTitle} description={c.optDesc}>
        <ol className="grid gap-4 md:grid-cols-2">
          {c.optimizations.map((opt) => (
            <li key={opt.title} className="card flex flex-col p-6 md:p-7">
              <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink rtl:tracking-normal">{opt.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{opt.description}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-accent">{opt.impact}</p>
            </li>
          ))}
        </ol>
      </DetailSection>

      <DetailSection title={c.archTitle} description={c.archDesc}>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title={c.archQueueTitle}>
            <CheckList items={c.archFeatures.slice(0, 3)} className="mt-4" />
          </InfoCard>
          <InfoCard title={c.archWorkerTitle}>
            <CheckList items={c.archFeatures.slice(3)} className="mt-4" />
          </InfoCard>
        </div>
      </DetailSection>

      <DetailSection title={c.techTitle} description={c.techDesc}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {c.techCategories.map((cat, i) => (
            <InfoCard key={cat} title={cat}>
              <ul className="grid gap-1.5 text-[0.9375rem]">
                {c.techItems[i].map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </InfoCard>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={c.costTitle} description={c.costDesc}>
        <div className="grid gap-4 md:grid-cols-2">
          <CostList label={c.infraLabel} rows={c.infraRows} />
          <CostList label={c.aiLabel} rows={c.aiRows} highlight={2} />
        </div>
        <Callout className="mt-4">
          <p className="font-medium text-ink">{c.costFooter}</p>
        </Callout>
      </DetailSection>

      <NextUp label={dict.caseStudies.next} title={next.title} description={next.summary} href={`/${locale}/case-studies/${next.slug}`} />
    </article>
  );
}
