import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, Clock, Smartphone, XCircle } from "lucide-react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { formatPostDate, getBlogPostBySlug } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { ArticleHeader, READING, RelatedPosts } from "@/components/site/article";
import { Callout, CheckList, InfoCard } from "@/components/site/layout";
import { ButtonLink } from "@/components/site/Button";
import { ArrowOut } from "@/components/site/icons";

const SLUG = "why-not-to-buy-cheap-websites";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why a $20 Website Will Cost You Thousands",
  description: "A $20 website doesn't save you money - it costs you customers.",
  author: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  publisher: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  datePublished: "2026-02-21",
  dateModified: "2026-02-21",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are cheap websites bad for business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cheap websites hurt your business by destroying trust before customers read a single word. Broken links, placeholder text, slow loading speeds, and mobile incompatibility signal to customers that you're not professional.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a bad website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A bad website costs more than a good one. You pay for the cheap site, then pay again when customers don't convert, and pay a third time when you finally need to replace it.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest way to get a business website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For local businesses, a free Google Business Profile is the best starting point. For a real website, budget $200-$500 for a professional result.",
      },
    },
  ],
};

const DEMO_RESTAURANT = "https://20-dollar-restaurant.vercel.app";
const DEMO_ECOMMERCE = "https://20-dollar-ecommerce-app.vercel.app";

type PageContent = {
  title: string;
  intro: string;
  badges: string[];
  seeItSection: { title: string; desc: string; btn1: string; btn2: string };
  experiencedSection: { title: string; desc: string };
  problems: { title: string; description: string }[];
  realCostSection: { title: string; desc: string };
  trustCard: { title: string; body: string };
  mobileCard: { title: string; body: string };
  speedCard: { title: string; body: string };
  payingSection: { title: string };
  tableHeaders: { feature: string; cheap: string; good: string };
  comparison: { feature: string; cheap: string; good: string }[];
  tableCallout: string;
  tableLink1: string;
  tableLink2: string;
  hiddenSection: { title: string };
  hiddenCosts: string[];
  hiddenSummary: string;
  whenSection: { good: string; bad: string };
  whenItMakesSense: string[];
  altSection: { title: string; desc: string };
  altList: string[];
  bottomLine: { title: string; main: string; desc: string; highlight1: string; real: string; sub: string };
};

const contentMap: Record<Locale, PageContent> = {
  en: {
    title: "Why Not to Buy Cheap Websites",
    intro:
      "Someone offers you a business website for $20. It sounds like a steal until you remember that the website is not there to exist. It is there to make strangers trust you.",
    badges: ["No Jargon", "Real Demos", "Honest Advice"],
    seeItSection: {
      title: "Try the Demo First",
      desc: "I built the bad version on purpose so this is not just theory. Open it on your phone. Wait for it to load. Try to find the menu. Try to contact the business. Try to buy something.",
      btn1: "Open $20 Restaurant",
      btn2: "Open $20 Ecommerce",
    },
    experiencedSection: {
      title: "What You Just Experienced",
      desc: "If you opened the demo, that uncomfortable feeling is the whole point.",
    },
    problems: [
      { title: "5+ Second Load Time", description: "Visitors stare at a blank screen before anything appears" },
      { title: "Placeholder Text", description: '"Hello World" and "Sample Page" still visible on the site' },
      { title: "Broken on Mobile", description: "Buttons cut off, text unreadable on phones" },
      { title: "Links Go Nowhere", description: "Contact pages, menus, and buttons don't work" },
    ],
    realCostSection: {
      title: "The Trust Problem",
      desc: "At this budget you are not buying a real website. You are buying a page that technically exists.",
    },
    trustCard: {
      title: "Trust is Everything",
      body: "When someone lands on your website, they are asking one question: is this a real business? A $20 website usually answers no before they even read your copy.",
    },
    mobileCard: {
      title: "The Mobile Problem",
      body: "Most people see your site on their phone first. If the mobile version feels broken, they do not separate that from the business. The business feels broken too.",
    },
    speedCard: {
      title: "The Speed Problem",
      body: "If the site takes forever to load, they leave. They do not write you a report explaining why. They just go back and click the next option.",
    },
    payingSection: { title: "What You're Paying For" },
    tableHeaders: { feature: "Feature", cheap: "$20 Website", good: "$500+ Website" },
    comparison: [
      { feature: "Load Time", cheap: "5+ seconds", good: "Under 1 second" },
      { feature: "Mobile Experience", cheap: "Broken", good: "Perfect on all devices" },
      { feature: "Customization", cheap: "None, generic template", good: "Branded to your business" },
      { feature: "Contact Info", cheap: "Maybe correct", good: "Clickable phone, map, forms" },
      { feature: "SEO", cheap: "None", good: "Optimized for Google" },
      { feature: "Trust Factor", cheap: "Hurts your reputation", good: "Builds credibility" },
    ],
    tableCallout: "Want to see every tier from $20 to $10,000? I built them all.",
    tableLink1: "Restaurant Case Study →",
    tableLink2: "Ecommerce Case Study →",
    hiddenSection: { title: "You Will Probably Pay Twice" },
    hiddenCosts: [
      "You buy the cheap site",
      "It does not work",
      "Customers complain, or nobody contacts you at all",
      "You realize you need a real website",
      "Now you pay for the thing you should have built first",
    ],
    hiddenSummary: "The cheap website did not save money. It added a useless step before the real expense.",
    whenSection: { good: "When a $20 Website Makes Sense", bad: "A Better Alternative: Google Business Profile" },
    whenItMakesSense: [
      "You're testing a business idea before committing",
      "You literally have zero budget and need something today",
      "You're a hobbyist, not a business",
    ],
    altSection: {
      title: "A Better Alternative: Google Business Profile",
      desc: "If you have no budget, do not force a bad website into existence. A clean Google profile with real reviews beats a bad website almost every time.",
    },
    altList: ["It's free", "Shows up in local searches", "Displays hours, photos, and reviews", "Customers can call with one tap"],
    bottomLine: {
      title: "The Bottom Line",
      main: "A cheap website is not bad because it is cheap. It is bad because it makes the customer do extra work to trust you. It is either",
      highlight1: "working for you",
      desc: "or against you.",
      real: "Most customers will not do that work. If the website makes you look less real than a Google Business Profile, do not buy it.",
      sub: "The real cost is not $20.\nIt is every customer who clicked away.",
    },
  },
  ar: {
    title: "لماذا سيكلفك الموقع بـ 20$ آلاف الدولارات من العملاء",
    intro:
      "وجدت عرضاً رخيصاً وبدت الفكرة مغرية. شخص قال لك إنه يستطيع بناء موقع عملك بـ 20$. المشكلة أنه غالباً لا يقول لك ماذا سيكلفك هذا القرار بعد أن يطلع الموقع للناس.",
    badges: ["بلا مصطلحات تقنية", "عروض حقيقية", "نصيحة صادقة"],
    seeItSection: {
      title: "اكتشف بنفسك",
      desc: "بنيت موقعاً بـ 20$ عن قصد حتى لا يبقى الكلام نظرياً. افتحه على هاتفك. انتظر التحميل. حاول إيجاد القائمة. وحاول أن تثق به.",
      btn1: "افتح مطعم 20$",
      btn2: "افتح متجر 20$",
    },
    experiencedSection: {
      title: "ما الذي شاهدته للتو",
      desc: "إذا فتحت العرض، فغالباً فهمت المشكلة في أقل من دقيقة.",
    },
    problems: [
      { title: "وقت تحميل يتجاوز 5 ثوانٍ", description: "الزوار يحدقون في شاشة فارغة قبل أن يظهر أي شيء" },
      { title: "نصوص تجريبية", description: '"مرحباً بالعالم" و"صفحة نموذجية" لا تزال ظاهرة في الموقع' },
      { title: "معطل على الجوال", description: "الأزرار مقطوعة، النصوص غير قابلة للقراءة على الهواتف" },
      { title: "الروابط لا تعمل", description: "صفحات التواصل والقوائم والأزرار لا تعمل" },
    ],
    realCostSection: { title: "التكلفة الحقيقية", desc: "الموقع السيئ لا يبدو رخيصاً فحسب، بل يطرد العملاء بشكل فعلي." },
    trustCard: {
      title: "الثقة هي كل شيء",
      body: "عندما يدخل أحدهم موقعك، هو يحكم بسرعة: هل هذا عمل حقيقي أم لا؟ الموقع بـ 20$ يجيب بشكل سيئ قبل أن يقرأ الزائر أي شيء. الروابط المعطوبة والنصوص التجريبية ليست مشاكل شكل فقط. هي مشاكل ثقة.",
    },
    mobileCard: {
      title: "مشكلة الهاتف",
      body: "معظم الناس سيرون موقعك أولاً من الجوال. المواقع الرخيصة غالباً تُبنى بإهمال، وتُفحص مرة على الكمبيوتر، ثم تُترك. إذا كانت نسخة الجوال سيئة، فعملك يبدو سيئاً أيضاً.",
    },
    speedCard: {
      title: "مشكلة السرعة",
      body: "لا أحد سيجلس منتظراً موقعاً رخيصاً حتى يثبت نفسه. إذا كان التحميل بطيئاً، فالزائر يغادر. والمنافس يأخذ الضغطة وأنت لا تأخذ شيئاً.",
    },
    payingSection: { title: "ما الذي تدفع مقابله" },
    tableHeaders: { feature: "الميزة", cheap: "موقع 20$", good: "موقع 500$+" },
    comparison: [
      { feature: "وقت التحميل", cheap: "5+ ثوانٍ", good: "أقل من ثانية" },
      { feature: "تجربة الجوال", cheap: "معطوب", good: "مثالي على كل الأجهزة" },
      { feature: "التخصيص", cheap: "لا شيء، قالب عام", good: "يعكس هوية عملك" },
      { feature: "معلومات التواصل", cheap: "ربما صحيحة", good: "هاتف قابل للنقر، خريطة، نماذج" },
      { feature: "تحسين البحث (SEO)", cheap: "لا شيء", good: "محسّن لجوجل" },
      { feature: "مستوى الثقة", cheap: "يضر بسمعتك", good: "يبني المصداقية" },
    ],
    tableCallout: "تريد رؤية كل مستوى من 20$ إلى 10,000$؟ بنيتها جميعاً.",
    tableLink1: "دراسة حالة المطاعم ←",
    tableLink2: "دراسة حالة التجارة الإلكترونية ←",
    hiddenSection: { title: "المشكلة الخفية: ستدفع مرتين" },
    hiddenCosts: [
      "تشتري الموقع بـ 20$",
      "لا يعمل",
      "العملاء يشكون",
      "تدرك أنك تحتاج شيئاً أفضل",
      "الآن تدفع مجدداً، للموقع الذي كان يجب أن تشتريه من البداية",
    ],
    hiddenSummary: "قرار الـ 20$ هذا كلفك 520$ بدلاً من 500$.",
    whenSection: { good: "متى يكون الموقع بـ 20$ منطقياً", bad: "بديل أفضل: ملف نشاطي التجاري على جوجل" },
    whenItMakesSense: ["أنت تختبر فكرة تجارية قبل الالتزام", "لديك صفر ميزانية وتحتاج شيئاً اليوم", "أنت هاوٍ، لا صاحب عمل"],
    altSection: {
      title: "بديل أفضل: ملف نشاطي التجاري على جوجل",
      desc: "إذا كانت الميزانية ضيقة لهذه الدرجة، فلا تجبر موقعاً سيئاً على الوجود. ابدأ بملف نشاطي التجاري على جوجل بدل أن تجعل صورتك أسوأ على الإنترنت.",
    },
    altList: ["مجاني تماماً", "يظهر في نتائج البحث المحلية", "يعرض أوقات العمل والصور والمراجعات", "العملاء يتصلون بنقرة واحدة"],
    bottomLine: {
      title: "الخلاصة",
      main: "موقعك غالباً هو أول ما يراه العملاء. إما أنه",
      highlight1: "يعمل لصالحك",
      desc: "أو ضدك.",
      real: "الموقع بـ 20$ يعمل ضدك. يخبر العملاء أنك لا تهتم، لست محترفاً، وربما لست عملاً حقيقياً.",
      sub: "التكلفة الحقيقية ليست 20$.\nإنها كل عميل نقر للخروج.",
    },
  },
};

const problemIcons = [Clock, AlertTriangle, Smartphone, XCircle];

/* Article section: heading in the reading column, content in the reading
   column or a wider breakout column that shares the same center axis. */
function Block({
  title,
  description,
  children,
  width = "reading",
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  width?: "reading" | "wide";
  className?: string;
}) {
  const hasHead = Boolean(title || description);
  return (
    <section className={cn("container-site mt-16 md:mt-24", className)}>
      {hasHead && (
        <div className={cn(READING, "reveal border-t border-line pt-10")}>
          {title && <h2 className="text-h3 md:text-[1.875rem]">{title}</h2>}
          {description && <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{description}</p>}
        </div>
      )}
      {children && (
        <div
          className={cn(
            "reveal mx-auto w-full",
            width === "wide" ? "max-w-[60rem]" : "max-w-[44rem]",
            hasHead && "mt-8",
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}

/** Small inline ✓ / ✕ mark for comparison cells. */
function Mark({ tone }: { tone: "good" | "bad" }) {
  return tone === "good" ? (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[0.3em] size-3.5 shrink-0 text-success">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[0.3em] size-3.5 shrink-0 text-danger">
      <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default async function WhyNotCheapWebsitesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = contentMap[locale] ?? contentMap.en;
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug(SLUG, locale);
  const [subLead, subRest] = c.bottomLine.sub.split("\n");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article>
        <ArticleHeader
          backHref={`/${locale}/blog`}
          backLabel={dict.blog.allArticles}
          title={c.title}
          lead={c.intro}
          meta={[
            post?.author,
            post && (
              <time key="d" dateTime={post.publishedDate.toISOString().slice(0, 10)}>
                {formatPostDate(post.publishedDate, locale)}
              </time>
            ),
            post && `${post.readTime} ${dict.blog.minRead}`,
          ]}
        >
          <ul className="flex flex-wrap gap-1.5">
            {c.badges.map((badge) => (
              <li key={badge} className="tag">
                {badge}
              </li>
            ))}
          </ul>
        </ArticleHeader>

        {/* Try the demo */}
        <section className="container-site">
          <div className={cn(READING, "reveal")}>
            <Callout title={<span className="text-lg">{c.seeItSection.title}</span>}>
              <p>{c.seeItSection.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink href={DEMO_RESTAURANT} external size="sm">
                  {c.seeItSection.btn1}
                  <ArrowOut />
                </ButtonLink>
                <ButtonLink href={DEMO_ECOMMERCE} external variant="secondary" size="sm">
                  {c.seeItSection.btn2}
                  <ArrowOut />
                </ButtonLink>
              </div>
            </Callout>
          </div>
        </section>

        {/* What you just experienced */}
        <Block title={c.experiencedSection.title} description={c.experiencedSection.desc} width="wide">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.problems.map((problem, i) => {
              const Icon = problemIcons[i];
              return (
                <li key={problem.title} className="card p-5">
                  <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 text-danger" />
                  <h3 className="mt-4 font-semibold tracking-[-0.01em] text-ink rtl:tracking-normal">{problem.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{problem.description}</p>
                </li>
              );
            })}
          </ul>
        </Block>

        {/* The trust problem */}
        <Block title={c.realCostSection.title} description={c.realCostSection.desc} width="wide">
          <div className="grid gap-4 md:grid-cols-3">
            {[c.trustCard, c.mobileCard, c.speedCard].map((card) => (
              <InfoCard key={card.title} title={card.title}>
                <p className="text-[0.9375rem]">{card.body}</p>
              </InfoCard>
            ))}
          </div>
        </Block>

        {/* Comparison */}
        <Block title={c.payingSection.title}>
          {/* Small screens: one stacked row per feature so both columns stay visible. */}
          <div className="card overflow-hidden sm:hidden">
            <p className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line-strong bg-paper-2 px-5 py-3 text-sm font-semibold text-ink">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-danger" />
                {c.tableHeaders.cheap}
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                {c.tableHeaders.good}
              </span>
            </p>
            <ul className="divide-y divide-line">
              {c.comparison.map((row) => (
                <li key={row.feature} className="px-5 py-4">
                  <p className="font-medium text-ink">{row.feature}</p>
                  <p className="mt-2 flex items-start gap-2 text-[0.9375rem] text-ink-2">
                    <Mark tone="bad" />
                    <span>
                      <span className="sr-only">{c.tableHeaders.cheap}: </span>
                      {row.cheap}
                    </span>
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-[0.9375rem] text-ink">
                    <Mark tone="good" />
                    <span>
                      <span className="sr-only">{c.tableHeaders.good}: </span>
                      {row.good}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden overflow-x-auto rounded-[1.125rem] border border-line bg-card sm:block">
            <table className="data-table min-w-[34rem]">
              <thead>
                <tr>
                  <th scope="col">{c.tableHeaders.feature}</th>
                  <th scope="col">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="size-2 rounded-full bg-danger" />
                      {c.tableHeaders.cheap}
                    </span>
                  </th>
                  <th scope="col">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                      {c.tableHeaders.good}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.map((row) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      className="border-b border-line bg-transparent font-medium text-ink [tr:last-child>&]:border-b-0"
                    >
                      {row.feature}
                    </th>
                    <td>
                      <span className="inline-flex items-start gap-2">
                        <Mark tone="bad" />
                        {row.cheap}
                      </span>
                    </td>
                    <td className="text-ink">
                      <span className="inline-flex items-start gap-2">
                        <Mark tone="good" />
                        {row.good}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout tone="neutral" className="mt-4">
            <p>{c.tableCallout}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="link font-medium">
                {c.tableLink1}
              </Link>
              <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="link font-medium">
                {c.tableLink2}
              </Link>
            </div>
          </Callout>
        </Block>

        {/* Pay twice */}
        <Block title={c.hiddenSection.title}>
          <ol className="card divide-y divide-line">
            {c.hiddenCosts.map((item, i) => (
              <li key={item} className="flex items-baseline gap-4 px-5 py-4">
                <span className="font-mono text-sm text-accent tabular" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-2">{item}</span>
              </li>
            ))}
          </ol>
          <Callout className="mt-4">
            <p className="text-lg text-ink">{c.hiddenSummary}</p>
          </Callout>
        </Block>

        {/* When it makes sense + the better alternative */}
        <Block width="wide">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title={c.whenSection.good}>
              <CheckList items={c.whenItMakesSense} className="mt-4" />
            </InfoCard>
            <InfoCard title={c.altSection.title}>
              <p>{c.altSection.desc}</p>
              <CheckList items={c.altList} className="mt-4" />
            </InfoCard>
          </div>
        </Block>

        {/* Bottom line */}
        <Block title={c.bottomLine.title}>
          <p className="text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.015em] text-ink rtl:leading-relaxed rtl:tracking-normal">
            {c.bottomLine.main} <span className="text-accent">{c.bottomLine.highlight1}</span> {c.bottomLine.desc}
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{c.bottomLine.real}</p>
          <blockquote className="mt-8 border-s-2 border-accent ps-5 text-lg leading-relaxed text-ink">
            <strong className="font-semibold">{subLead}</strong>
            {subRest && (
              <>
                <br />
                <span className="text-ink-2">{subRest}</span>
              </>
            )}
          </blockquote>
        </Block>

        <RelatedPosts slug={SLUG} locale={locale} dict={dict} />
      </article>
    </>
  );
}
