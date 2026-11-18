import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getNextCaseStudy } from "@/lib/content";
import { Callout, CheckList, DetailSection, InfoCard, NextUp, PageHeader } from "@/components/site/layout";

const en = {
  title: "HTML: The Most Reliable Source of Truth",
  intro:
    "Why HTML-based document authoring is the most reliable, scalable, and future-proof method for generating PDFs, and how KamkmPDF connects natural language to structured documents.",
  badges: ["Structured", "Reproducible", "Future-Proof"],
  execTitle: "Executive Summary",
  execBody:
    "When organizations need professional PDFs, they usually start in tools never designed for reproducibility or automation.",
  execCards: [
    ["Layout breaks", "Manual exports from design tools"],
    ["Font issues", "Inconsistent rendering across systems"],
    ["No source of truth", "PDF is final, not a working format"],
  ],
  coreTitle: "The Core Problem",
  coreDesc:
    "Traditional workflows treat PDFs as the primary working file. PDF is a final format, not a flexible authoring format.",
  traditionalTitle: "Traditional Workflow",
  traditionalItems: [
    "Designers export from layout tools",
    'Teams edit Word files and "Save as PDF"',
    "Developers manually generate PDFs with brittle templates",
    "Inconsistent formatting across exports",
    "No clear source of truth",
    "Limited automation and versioning problems",
  ],
  htmlTitle: "HTML-First Workflow",
  htmlItems: [
    "Structured markup as source of truth",
    "CSS controls presentation separately",
    "Programmatic generation with templates",
    "Deterministic, reproducible output",
    "Version controlled and auditable",
    "Scalable to thousands of documents",
  ],
  whyTitle: "Why HTML Is the Most Reliable Source",
  whyDesc: "Five fundamental advantages of HTML-based document architecture",
  reasons: [
    {
      title: "Structured by Design",
      description:
        "HTML is semantic and structured with headings, sections, lists, tables, and metadata — machine-readable, accessible, predictable, and easy to transform.",
    },
    {
      title: "Separation of Content and Design",
      description:
        "Content lives in structured markup while design lives in stylesheets. Global style updates, brand consistency, and easy redesign without rewriting content.",
    },
    {
      title: "Version Control & Reproducibility",
      description:
        "HTML files can be stored in Git, tracked per revision, and rebuilt deterministically. Same HTML + same engine = same PDF.",
    },
    {
      title: "Automation & Scalability",
      description:
        "HTML documents can be templated, data-driven, and generated programmatically. 1 PDF or 10,000 using the same template system.",
    },
    {
      title: "Long-Term Stability",
      description:
        "HTML is open, standardized, widely supported. Unlike proprietary formats, HTML will remain readable and convertible across tools and platforms.",
    },
  ],
  kamkmTitle: "Introducing KamkmPDF",
  kamkmDesc:
    "KamkmPDF builds on the reliability of HTML-based document systems and removes the friction of manual markup creation.",
  kamkmWhatTitle: "What KamkmPDF Does",
  kamkmWhatDesc:
    "Converts natural language instructions into structured HTML documents, applies intelligent formatting, and generates professional, print-ready PDFs.",
  features: [
    {
      title: "Natural Language to HTML",
      description: "Users describe what they need in plain English, and it converts into structured, semantic HTML.",
    },
    {
      title: "Dual Output System",
      description: "Users receive both the final PDF and the source HTML for transparency, customization, and future editing.",
    },
    {
      title: "Deterministic Layout",
      description: "Structured HTML before rendering ensures predictable pagination, consistent fonts, and controlled spacing.",
    },
  ],
  out1Title: "Immediate Result",
  out1Desc: "A professional, print-ready PDF generated from your natural language description.",
  out1File: "document.pdf",
  out2Title: "Long-Term Control",
  out2Desc: "The underlying HTML source code for transparency, customization, and future editing.",
  out2File: "document.html",
  exIn: "Natural Language Input",
  exInQuote:
    '"Create a professional invoice for John Doe with 3 services, 20% tax, total at the bottom, clean minimal design."',
  exOut: "What KamkmPDF Delivers",
  exOutItems: [
    "Properly structured HTML content",
    "Layout best practices applied",
    "Professional PDF generated",
    "Editable source HTML returned",
    "No manual formatting required",
    "No layout debugging needed",
  ],
  impactTitle: "Real-World Impact",
  impactDesc: "Organizations using HTML-first document architecture experience:",
  benefits: [
    "Faster document creation",
    "Fewer layout errors",
    "Consistent branding",
    "Reduced manual formatting",
    "Scalable document generation",
    "Clear separation between content and presentation",
  ],
  insightTitle: "Key Insight",
  insightL1: "PDF should be the output.",
  insightL2: "HTML should be the source of truth.",
  insightDesc:
    "KamkmPDF connects natural language intent to structured, reproducible document architecture, delivering both immediate results and long-term reliability.",
  concTitle: "Conclusion",
  concWay: "The Most Reliable Way",
  concWayItems: ["Author in structured HTML", "Style with controlled CSS", "Render to PDF with a consistent engine"],
  concHow: "How KamkmPDF Enhances This",
  concHowItems: [
    "Generates structured HTML from natural language",
    "Produces production-ready PDFs",
    "Returns the HTML source for transparency and control",
  ],
  concFooter: "This is not just PDF generation. It is a scalable document infrastructure built on open standards.",
};

type C = typeof en;

const ar: C = {
  title: "HTML: المصدر الموثوق",
  intro: "PDF كخرج عادي. HTML كمصدر. KamkmPDF يربط الاثنين.",
  badges: ["مهيكل", "قابل للتكرار", "يدوم مع الوقت"],
  execTitle: "المشكلة باختصار",
  execBody: "معظم الناس تبدأ بتصميم PDF في أدوات ما طُوّرت للتكرار أو الأتمتة.",
  execCards: [
    ["التنسيق ينهار", "تصدير يدوي فيه احتمال خطأ"],
    ["الخطوط تختلف", "كل جهاز يعرضها بشكل مختلف"],
    ["ما فيه مصدر حقيقي", "PDF نهائي، مش للتعديل"],
  ],
  coreTitle: "المشكلة الجوهرية",
  coreDesc: "تتعامل سير العمل التقليدية مع PDF كملف عمل رئيسي. PDF صيغة نهائية وليست صيغة تأليف مرنة.",
  traditionalTitle: "سير العمل التقليدي",
  traditionalItems: [
    "المصممون يصدّرون من أدوات التخطيط",
    "الفرق تحرر ملفات Word وتحفظها بصيغة PDF",
    "المطورون يولدون PDF يدوياً بقوالب هشة",
    "تنسيق غير متسق عبر التصديرات",
    "لا مصدر واضح للحقيقة",
    "أتمتة محدودة ومشاكل في الإصدارات",
  ],
  htmlTitle: "سير العمل HTML-First",
  htmlItems: [
    "الترميز المهيكل كمصدر للحقيقة",
    "CSS يتحكم في العرض بشكل منفصل",
    "توليد برمجي بالقوالب",
    "مخرجات محددة وقابلة للتكرار",
    "تحكم في الإصدارات وقابلية للتدقيق",
    "قابل للتوسع لآلاف المستندات",
  ],
  whyTitle: "لماذا HTML هو المصدر الأكثر موثوقية",
  whyDesc: "خمس مزايا جوهرية لبنية المستندات المبنية على HTML",
  reasons: [
    { title: "مهيكل بطبيعته", description: "HTML دلالي - عناوين، أقسام، قوائم، جداول. هذا يجعل المستند قابلاً للقراءة آلياً وسهل التحويل." },
    { title: "المحتوى منفصل عن التصميم", description: "المحتوى في الترميز، التصميم في CSS. غيّر المظهر بالكامل دون لمس سطر واحد من المحتوى." },
    { title: "قابل للتتبع والتكرار", description: "ملفات HTML في Git. بنفس الملف ومحرك العرض، تحصل على نفس PDF في كل مرة." },
    { title: "أتمتة حقيقية", description: "HTML قوالب + بيانات = PDF بالآلاف. نفس النظام، آلاف المستندات." },
    { title: "يدوم مع الوقت", description: "HTML معياري ومفتوح. بخلاف الصيغ الاحتكارية، يبقى قابلاً للقراءة والتحويل لسنوات." },
  ],
  kamkmTitle: "تعرف على KamkmPDF",
  kamkmDesc: "KamkmPDF يبني على HTML ويحذف عناء كتابة الترميز يدوياً. قلها بكلام عادي، نفذها PDF.",
  kamkmWhatTitle: "كيف يشتغل KamkmPDF",
  kamkmWhatDesc: "تصف ما تريد بكلامك، يتحول إلى HTML مهيكل، تخرج PDF جاهز.",
  features: [
    { title: "كلامك يخرج HTML", description: "تصف ما تريد بكلام عادي. يتحول إلى HTML دلالي مهيكل." },
    { title: "تحصل على الاثنين", description: "PDF للإرسال، وHTML المصدر للتعديل متى شئت." },
    { title: "تنسيق حتمي", description: "HTML مهيكل يضمن ترقيم صفحات صحيح وخطوط ثابتة ومسافات متحكم بها." },
  ],
  out1Title: "ما تحتاجه الآن",
  out1Desc: "PDF جاهز للإرسال فوراً.",
  out1File: "document.pdf",
  out2Title: "تحكم لاحقاً",
  out2Desc: "HTML المصدر معك تقدر تعدل أي شيء متى شئت.",
  out2File: "document.html",
  exIn: "مثال عملي",
  exInQuote: '"أنشئ فاتورة لـ John Doe - 3 خدمات - ضريبة 20% - المجموع في الأسفل."',
  exOut: "ما يطلع منه",
  exOutItems: [
    "محتوى HTML مهيكل بشكل صحيح",
    "تنسيق صحيح من أول مرة",
    "PDF احترافي جاهز",
    "HTML المصدر معك أيضاً",
    "بدون تنسيق يدوي",
    "بدون تعديل وتكرار",
  ],
  impactTitle: "الفرق في التطبيق",
  impactDesc: "شركات تستخدم HTML-First تلاحظ:",
  benefits: [
    "مستندات أسرع",
    "أخطاء تخطيط أقل",
    "علامة تجارية تبدو متسقة",
    "تنسيق يدوي أقل بكثير",
    "توليد آلاف المستندات بنفس القالب",
    "محتوى وتصميم منفصلان",
  ],
  insightTitle: "الفكرة الأساسية",
  insightL1: "PDF هو النتيجة.",
  insightL2: "HTML هو المصدر.",
  insightDesc: "KamkmPDF يربط كلامك بمستند مهيكل قابل للتكرار.",
  concTitle: "باختصار",
  concWay: "الطريقة الصحيحة",
  concWayItems: ["ألف بHTML مهيكل", "نسق بCSS منفصل", "خرج PDF بمحرك واحد"],
  concHow: "KamkmPDF يعمل ذلك لك",
  concHowItems: ["يحول كلامك إلى HTML", "ينتج PDF جاهز", "يرجع HTML المصدر معك للتعديل"],
  concFooter: "مش مجرد توليد PDF. بنية تحتية للمستندات مبنية على معايير مفتوحة.",
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function KamkmPDFReliabilityCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = locale === "ar" ? ar : en;
  const dict = await getDictionary(locale);
  const next = getNextCaseStudy("kamkmpdf-reliability", locale);

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

      <DetailSection title={c.execTitle} description={c.execBody}>
        <div className="grid gap-4 md:grid-cols-3">
          {c.execCards.map(([title, desc]) => (
            <InfoCard key={title} title={title}>
              <p className="text-[0.9375rem]">{desc}</p>
            </InfoCard>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={c.coreTitle} description={c.coreDesc}>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title={c.traditionalTitle} className="bg-paper-2">
            <CheckList items={c.traditionalItems} tone="negative" className="mt-4" />
          </InfoCard>
          <InfoCard title={c.htmlTitle}>
            <CheckList items={c.htmlItems} className="mt-4" />
          </InfoCard>
        </div>
      </DetailSection>

      <DetailSection title={c.whyTitle} description={c.whyDesc}>
        <ol className="grid gap-4 sm:grid-cols-2">
          {c.reasons.map((reason, i) => (
            <li key={reason.title} className={i === c.reasons.length - 1 ? "sm:col-span-2" : undefined}>
              <InfoCard
               
                title={reason.title}
                className="h-full"
              >
                <p className="text-[0.9375rem]">{reason.description}</p>
              </InfoCard>
            </li>
          ))}
        </ol>
      </DetailSection>

      <DetailSection title={c.kamkmTitle} description={c.kamkmDesc}>
        <div className="grid gap-10">
          <div>
            <h3 className="text-h3">{c.kamkmWhatTitle}</h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{c.kamkmWhatDesc}</p>
            <ol className="mt-8 grid gap-6 border-t border-line pt-8 md:grid-cols-3">
              {c.features.map((f) => (
                <li key={f.title}>
                  <h4 className="font-semibold text-ink">{f.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{f.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: c.out1Title, desc: c.out1Desc, file: c.out1File },
              { title: c.out2Title, desc: c.out2Desc, file: c.out2File },
            ].map((o) => (
              <InfoCard key={o.file} title={o.title}>
                <p>{o.desc}</p>
                <p
                  dir="ltr"
                  className="mt-5 inline-flex rounded-lg border border-line bg-paper-2 px-3 py-1.5 font-mono text-[0.8125rem] text-ink"
                >
                  {o.file}
                </p>
              </InfoCard>
            ))}
          </div>

          <div className="card grid gap-8 p-6 md:p-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink">{c.exIn}</p>
              <blockquote className="mt-4 border-s-2 border-accent ps-5 text-lg leading-relaxed text-ink">
                {c.exInQuote}
              </blockquote>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{c.exOut}</p>
              <CheckList items={c.exOutItems} className="mt-4" />
            </div>
          </div>
        </div>
      </DetailSection>

      <DetailSection title={c.impactTitle} description={c.impactDesc}>
        <CheckList items={c.benefits} className="sm:grid-cols-2 sm:gap-x-8" />
      </DetailSection>

      <DetailSection title={c.insightTitle}>
        <p className="text-h2 max-w-[24ch] text-balance">
          <span className="block text-muted">{c.insightL1}</span>
          <span className="block">{c.insightL2}</span>
        </p>
        <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-2">{c.insightDesc}</p>
      </DetailSection>

      <DetailSection title={c.concTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title={c.concWay}>
            <ol className="mt-4 grid gap-3">
              {c.concWayItems.map((s, i) => (
                <li key={s} className="flex items-start gap-3 leading-relaxed">
                  <span className="font-mono text-sm text-accent tabular">{num(i)}</span>
                  {s}
                </li>
              ))}
            </ol>
          </InfoCard>
          <InfoCard title={c.concHow}>
            <CheckList items={c.concHowItems} className="mt-4" />
          </InfoCard>
        </div>
        <Callout className="mt-4">
          <p className="text-[1.0625rem] font-medium text-ink">{c.concFooter}</p>
        </Callout>
      </DetailSection>

      <NextUp label={dict.caseStudies.next} title={next.title} description={next.summary} href={`/${locale}/case-studies/${next.slug}`} />
    </article>
  );
}
