import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getNextCaseStudy } from "@/lib/content";
import { Callout, CheckList, DetailSection, InfoCard, NextUp, PageHeader, StatGrid, Timeline } from "@/components/site/layout";

type C = {
  title: string;
  intro: string;
  badges: string[];
  statsLabels: string[];
  statsDescs: string[];
  statValues: string[];
  situationTitle: string;
  situationDesc: string;
  problemTitle: string;
  problemPoints: string[];
  realIssueTitle: string;
  realIssueP1: string;
  realIssueP2: string;
  approachTitle: string;
  approachDesc: string;
  approach: { step: string; title: string; description: string }[];
  techTitle: string;
  techDesc: string;
  techCategories: string[];
  techItems: string[][];
  resultsTitle: string;
  resultsDesc: string;
  results: string[];
  resultsQuote: string;
  whyTitle: string;
  whyP1: string;
  whyP2: string;
  whyCard1: string;
  whyCard2: string;
};

const en: C = {
  title: "Reducing Friction",
  intro: "A business had a good product but a weak website. Here's how we fixed that.",
  badges: ["Discovery", "Design", "Development"],
  statsLabels: ["Project Type", "Approach", "Focus", "Result"],
  statsDescs: ["Premium digital presence", "Ideas to execution", "Emotion-driven design", "Proud to share"],
  statValues: ["Web Design", "Discovery", "Experience", "Confidence"],
  situationTitle: "The Situation",
  situationDesc:
    "A founder had a good product but a website that didn't match. They knew their offering was solid, but every time they shared their site, they'd wince a little.",
  problemTitle: "What Wasn't Working",
  problemPoints: [
    "Site looked generic, like dozens of competitors",
    "Didn't communicate quality or credibility",
    "Visitors weren't sticking around",
    "Past dev experiences meant constant back-and-forth",
    "Technical decisions felt overwhelming",
    "No clear vision of what better looked like",
  ],
  realIssueTitle: "The Real Issue",
  realIssueP1:
    "No detailed brief. No moodboard. Just a gut feeling that their brand deserved better, without knowing what better actually looked like.",
  realIssueP2: "The problem wasn't code or pixels. It was the disconnect between what they pictured and what existed.",
  approachTitle: "My Approach",
  approachDesc: "How we got from scattered thoughts to something solid",
  approach: [
    {
      step: "01",
      title: "Started with Clarity",
      description:
        "No mockups yet. Just conversations about what feeling they wanted visitors to have. What matters most to their business? What should someone think in those first few seconds?",
    },
    {
      step: "02",
      title: "Designed for Humans",
      description:
        "Static pages are boring. I built an experience with animations that feel natural, spacing that breathes, and interactions that guide without getting in the way.",
    },
    {
      step: "03",
      title: "Built to Last",
      description:
        "Picked tools that prioritize clean code and performance. No need to rebuild in two years. Just room to grow and iterate.",
    },
    {
      step: "04",
      title: "Handled the Hard Stuff",
      description:
        "They ran their business. I handled the tech decisions, explained things in plain English, and didn't overwhelm them with choices they didn't need to make.",
    },
  ],
  techTitle: "Technology Stack",
  techDesc: "Tools and approach for lasting results",
  techCategories: ["Frontend", "Design", "Performance", "Process"],
  techItems: [
    ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    ["Intentional spacing", "Typography system", "Motion design", "Micro-interactions"],
    ["Optimized assets", "Fast load times", "Smooth animations", "Responsive design"],
    ["Discovery sessions", "Clear communication", "Minimal jargon", "Quiet execution"],
  ],
  resultsTitle: "What Changed",
  resultsDesc: "Beyond just a new website",
  results: [
    "Site actually reflects what they do",
    "Looks professional without being stuffy",
    "First impressions are now positive",
    "People take the brand more seriously",
    "Easy to add features later",
    "They're proud to share the link",
  ],
  resultsQuote: "The biggest shift was their confidence. They're actually proud to share their website now.",
  whyTitle: "Why This Matters",
  whyP1:
    "This is the work I enjoy most. It's not about fancy features or trendy animations. It's about closing the gap between what someone pictures in their head and what actually shows up on screen.",
  whyP2:
    "Good design sense plus solid engineering plus actually listening to people. That's how you turn a headache into something you're genuinely proud of.",
  whyCard1: "From rough ideas to real products",
  whyCard2: "From uncertainty to confidence",
};

const ar: C = {
  title: "تقليل الاحتكاك",
  intro: "منتج جيد، موقع ضعيف. هكذا أصلحنا ذلك.",
  badges: ["اكتشاف", "تصميم", "تطوير"],
  statsLabels: ["نوع المشروع", "الأسلوب", "التركيز", "النتيجة"],
  statsDescs: ["حضور رقمي يعكس القيمة", "من الفوضى إلى الوضوح", "تجربة تُشعر بالصواب", "فخور يشاركه"],
  statValues: ["تصميم ويب", "اكتشاف", "تجربة", "ثقة"],
  situationTitle: "الحكاية من البداية",
  situationDesc: "صاحب مشروع عنده منتج متين. بس كل مرة يبعث الرابط لأحد، يتمنى أنه ما بعثه.",
  problemTitle: "ما لم يكن يعمل",
  problemPoints: [
    "يشبه مئة موقع تاني",
    "ما يعكس الجودة ولا المصداقية",
    "الناس تدخل وتطلع بسرعة",
    "تجارب التطوير القديمة كانت متعبة",
    "القرارات التقنية تبدو معقدة",
    "ما في صورة واضحة لما يبدو عليه الأفضل",
  ],
  realIssueTitle: "المشكلة الحقيقية",
  realIssueP1: "ما في ملخص. ما في مودبورد. فقط إحساس أن العلامة التجارية تستحق أكثر.",
  realIssueP2: "المشكلة مش في الكود. في المسافة بين اللي يتخيله وما هو موجود.",
  approachTitle: "أسلوبي في العمل",
  approachDesc: "كيف انتقلنا من أفكار متشتتة إلى شيء متماسك",
  approach: [
    {
      step: "01",
      title: "البدء بالوضوح",
      description:
        "لا نماذج بعد. فقط محادثات حول الشعور الذي يريدون أن يشعر به الزوار. ما الأهم لعملهم؟ ماذا يجب أن يفكر شخص في تلك الثواني الأولى؟",
    },
    {
      step: "02",
      title: "التصميم للإنسان",
      description: "الصفحات الثابتة مملة. بنيت تجربة بحركات تبدو طبيعية، ومساحات تتنفس، وتفاعلات ترشد دون أن تعيق.",
    },
    {
      step: "03",
      title: "للمستقبل",
      description: "اخترت أدوات تعطي الأولوية للكود النظيف والأداء. لا حاجة لإعادة البناء بعد سنتين. فقط مجال للنمو والتطوير.",
    },
    {
      step: "04",
      title: "التعامل مع الصعوبات",
      description:
        "أداروا أعمالهم. وتوليت القرارات التقنية، شرحت الأشياء بلغة بسيطة، ولم أثقل عليهم بخيارات لم يكونوا بحاجة لاتخاذها.",
    },
  ],
  techTitle: "التقنيات المستخدمة",
  techDesc: "أدوات وأسلوب لنتائج دائمة",
  techCategories: ["الواجهة الأمامية", "التصميم", "الأداء", "العملية"],
  techItems: [
    ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    ["مسافات مقصودة", "نظام طباعة", "تصميم حركي", "تفاعلات مصغرة"],
    ["أصول محسّنة", "تحميل سريع", "حركات سلسة", "تصميم متجاوب"],
    ["جلسات استكشاف", "تواصل واضح", "مصطلحات بسيطة", "تنفيذ هادئ"],
  ],
  resultsTitle: "ما الذي تغير",
  resultsDesc: "ما هو أبعد من مجرد موقع جديد",
  results: [
    "الموقع الآن يعكس ما يفعلونه فعلاً",
    "يبدو احترافياً دون أن يكون متصلباً",
    "الانطباعات الأولى أصبحت إيجابية",
    "الناس يأخذون العلامة التجارية بجدية أكبر",
    "سهل إضافة ميزات لاحقاً",
    "أصبحوا فخورين بمشاركة الرابط",
  ],
  resultsQuote: "أكبر تحول كان في ثقتهم. أصبحوا فعلاً فخورين بمشاركة موقعهم الآن.",
  whyTitle: "لماذا هذا مهم",
  whyP1:
    "هذا هو العمل الذي أستمتع به أكثر. لا يتعلق الأمر بالميزات المزخرفة أو الحركات الرائجة. يتعلق بسد الهوة بين ما يتخيله شخص في ذهنه وما يظهر فعلاً على الشاشة.",
  whyP2: "حس تصميمي جيد زائد هندسة متينة زائد الإنصات الحقيقي للناس. هكذا تحول الصداع إلى شيء تفخر به حقاً.",
  whyCard1: "من أفكار خامة إلى منتجات حقيقية",
  whyCard2: "من القلق إلى الثقة",
};

export default async function ReducingFrictionCaseStudyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = locale === "ar" ? ar : en;
  const dict = await getDictionary(locale);
  const next = getNextCaseStudy("reducing-friction", locale);

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
          items={c.statValues.map((value, i) => ({
            // Word values (not numbers) need a smaller size to fit two-up on phones.
            value: <span className="text-[clamp(1.375rem,1.1rem+1vw,2rem)]">{value}</span>,
            label: c.statsLabels[i],
            note: c.statsDescs[i],
          }))}
        />
      </div>

      <DetailSection title={c.situationTitle} description={c.situationDesc}>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title={c.problemTitle}>
            <CheckList items={c.problemPoints} tone="negative" className="mt-4" />
          </InfoCard>
          <Callout title={c.realIssueTitle}>
            <p>{c.realIssueP1}</p>
            <p className="mt-4 font-medium text-ink">{c.realIssueP2}</p>
          </Callout>
        </div>
      </DetailSection>

      <DetailSection title={c.approachTitle} description={c.approachDesc}>
        <Timeline
          items={c.approach.map((step) => ({
            label: <span className="font-mono tabular">{step.step}</span>,
            title: step.title,
            body: step.description,
          }))}
        />
      </DetailSection>

      <DetailSection title={c.techTitle} description={c.techDesc}>
        <div className="grid gap-4 sm:grid-cols-2">
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

      <DetailSection title={c.resultsTitle} description={c.resultsDesc}>
        <CheckList items={c.results} className="sm:grid-cols-2 sm:gap-x-8" />
        <blockquote className="mt-10 border-s-2 border-accent ps-6 text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.015em] text-ink rtl:leading-relaxed rtl:tracking-normal">
          {c.resultsQuote}
        </blockquote>
      </DetailSection>

      <DetailSection title={c.whyTitle}>
        <div className="max-w-[62ch]">
          <p className="text-[1.0625rem] leading-relaxed text-ink-2">{c.whyP1}</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2">
            {[c.whyCard1, c.whyCard2].map((line) => (
              <p key={line} className="card p-5 font-semibold text-ink md:p-6">
                {line}
              </p>
            ))}
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-ink-2">{c.whyP2}</p>
        </div>
      </DetailSection>

      <NextUp label={dict.caseStudies.next} title={next.title} description={next.summary} href={`/${locale}/case-studies/${next.slug}`} />
    </article>
  );
}
