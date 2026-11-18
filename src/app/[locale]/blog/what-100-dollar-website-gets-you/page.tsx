import Link from "next/link";
import type { ReactNode } from "react";
import { AlertCircle, Clock, MessageCircle, TrendingUp } from "lucide-react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { formatPostDate, getBlogPostBySlug } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { ArticleHeader, READING, RelatedPosts } from "@/components/site/article";
import { Callout, CheckList, InfoCard } from "@/components/site/layout";
import { ButtonLink } from "@/components/site/Button";
import { ArrowOut } from "@/components/site/icons";

const SLUG = "what-100-dollar-website-gets-you";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a $100 Website Actually Gets You",
  description: "A $100 website works but has limits. Here's what that money delivers.",
  author: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  publisher: { "@type": "Person", name: "Khalil AbdalMageed", url: "https://www.khalil.mageed.net" },
  datePublished: "2026-02-21",
  dateModified: "2026-02-21",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a $100 website include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A $100 website typically includes basic product or menu display, simple navigation, visible contact info, and a professional enough appearance for desktop. It mostly works on mobile but has limitations.",
      },
    },
    {
      "@type": "Question",
      name: "What are the limitations of a $100 website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A $100 website lacks automation, has no scaling capability, uses generic templates, and loads slowly (5-8 seconds). These limits become problems as your business grows.",
      },
    },
    {
      "@type": "Question",
      name: "Is a $100 website worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A $100 website works as a placeholder for side hobbies or businesses just starting out. For a real business, budget $500+ for a website that supports your growth.",
      },
    },
  ],
};

const DEMO_100_RESTAURANT = "https://100-dollar-restaurant.vercel.app";
const DEMO_100_ECOMMERCE = "https://100-dollar-ecommerce-app.vercel.app";
const DEMO_500_RESTAURANT = "https://500-dollar-restaurant.vercel.app";
const DEMO_500_ECOMMERCE = "https://500-dollar-ecommerce-app.vercel.app";

type PageContent = {
  title: string;
  intro: string;
  badges: string[];
  trySection: { title: string; desc: string; btn1: string; btn2: string };
  whatYouGetSection: { title: string; desc: string };
  whatWorks: string[];
  whatWorksFooter: string;
  whatsappTitle: string;
  whatsappBody1: string;
  whatsappBody2: string;
  breaksSection: { title: string; desc: string };
  whereItBreaks: { title: string; description: string }[];
  verdictSection: { title: string };
  placeholderNote: string;
  itWorksLabel: string;
  itDoesntLabel: string;
  itWorksIf: string[];
  itDoesntWorkIf: string[];
  warningNote: string;
  upgradeSection: { title: string; desc: string };
  upgradeMain: string;
  upgradeMainHighlight: string;
  upgradeMainSuffix: string;
  upgradeNote: string;
  upgradeSignalsLabel: string;
  /** First entry ("(primary)") labels the main signal above and is not listed. */
  upgradeSignals: string[];
  nextSection: { title: string };
  tier500Title: string;
  tier500Desc: string;
  caseStudiesTitle: string;
  caseStudiesDesc: string;
  restaurantLink: string;
  ecommerceLink: string;
  restaurantCaseLink: string;
  ecommerceCaseLink: string;
  bottomLine: { title: string; main: string; cost: string; investment: string; footer: string };
};

const en: PageContent = {
  title: "What a $100 Website Actually Gets You",
  intro:
    "A $100 website is not the same disaster as a $20 website. That is why it is more dangerous. It looks close enough to real that people start expecting it to behave like a real business tool.",
  badges: ["Fair Assessment", "Honest Limits", "Clear Signals"],
  trySection: {
    title: "Try It Yourself",
    desc: "I built both so you can see the difference without guessing. Open them on your phone. Browse the menu or products. Try the checkout.",
    btn1: "$100 Restaurant",
    btn2: "$100 Ecommerce",
  },
  whatYouGetSection: {
    title: "What Works",
    desc: "To be fair, a $100 website can work. It is not garbage. It is just limited.",
  },
  whatWorks: [
    "Products or menu items display correctly",
    "Basic navigation functions",
    "Phone number and address are visible",
    "Looks professional enough at first glance",
    "Works on desktop, mostly works on mobile",
  ],
  whatWorksFooter:
    "For a side hustle or a brand new business, it gives you something you can send to people without apologizing too much.",
  whatsappTitle: "The WhatsApp Model Is Real",
  whatsappBody1:
    "A lot of small businesses work like this: customers browse, message on WhatsApp, ask questions, send payment, and you handle the rest manually.",
  whatsappBody2:
    "That model can work if you chose it on purpose. The problem is that a $100 website usually forces you into that model whether you chose it or not.",
  breaksSection: {
    title: "Where It Breaks Down",
    desc: "A $100 site isn't broken. It's just limited. And those limits become problems fast.",
  },
  whereItBreaks: [
    {
      title: "No Automation",
      description:
        "The website does not take work away from you. It sends the work back to you through messages and manual follow-up.",
    },
    {
      title: "No Scaling",
      description:
        "Three orders a week is fine. Twenty orders a day becomes twenty separate conversations and a pile of mistakes.",
    },
    {
      title: "The Template Problem",
      description: "It may not look terrible, but it looks forgettable. Customers probably will not remember it either.",
    },
    {
      title: "Performance Issues",
      description:
        "Slow pages, heavy images, and awkward mobile behavior are still common at this level. Better than $20 does not mean good.",
    },
  ],
  verdictSection: { title: "The Honest Verdict" },
  placeholderNote: "A $100 website gives you online existence. It does not give you leverage.",
  itWorksLabel: "It Works If",
  itDoesntLabel: "It Doesn't Work If",
  itWorksIf: [
    "You're testing a business idea before committing",
    "You sell low volume and don't mind manual work",
    "You need something today and have zero budget",
    "You genuinely prefer the WhatsApp ordering model",
  ],
  itDoesntWorkIf: [
    "You're trying to look established",
    "You want customers to find you through Google",
    "You're competing with businesses that have real websites",
    "You expect the website to actually do anything",
  ],
  warningNote:
    "Do not expect ROI from a $100 website. At best, it is a digital business card for people who already know about you.",
  upgradeSection: { title: "The Upgrade Moment", desc: "How do you know when you've outgrown a $100 site?" },
  upgradeMain: "When you're spending",
  upgradeMainHighlight: "more than 2 hours a week",
  upgradeMainSuffix: "managing orders through WhatsApp.",
  upgradeNote:
    "That time is not free. It is time you could spend making the product, serving customers, improving operations, or getting new business.",
  upgradeSignalsLabel: "Other signals:",
  upgradeSignals: [
    "(primary)",
    "You are embarrassed to send the link",
    "Customers complain that the site is slow",
    "You lose track of orders",
    "You keep answering the same questions manually",
  ],
  nextSection: { title: "What Comes Next" },
  tier500Title: "$500 Tier",
  tier500Desc:
    "This is where the website starts behaving like a tool instead of a poster. Faster loading, better mobile experience, real checkout, and less manual babysitting.",
  caseStudiesTitle: "Full Case Studies",
  caseStudiesDesc: "I built every tier from $20 to $10,000 so you can see exactly what each budget delivers.",
  restaurantLink: "$500 Restaurant Demo →",
  ecommerceLink: "$500 Ecommerce Demo →",
  restaurantCaseLink: "Restaurant Case Study →",
  ecommerceCaseLink: "Ecommerce Case Study →",
  bottomLine: {
    title: "The Bottom Line",
    main: "A $100 website gives you something online. That is useful in the beginning. But do not confuse existence with growth.",
    cost: "A $100 website is a cost.",
    investment: "A $500+ website is an investment.",
    footer: "Know the difference before you spend.",
  },
};

const ar: PageContent = {
  title: "ماذا تحصل فعلاً مقابل موقع بـ 100$؟",
  intro:
    "إنت عارف إن موقع 20$ فكرة سيئة. لكن 100$ تبدو كأنها ميزانية معقولة. المشكلة إنك برضو غالباً بتشتري موقع محدود جداً، فقط بشكل أقل فضيحة.",
  badges: ["تقييم عادل", "حدود صادقة", "إشارات واضحة"],
  trySection: {
    title: "جربه بنفسك",
    desc: "بنيت الاثنين حتى ترى بالضبط ما ستحصل عليه. افتحهما على هاتفك. تصفح القائمة أو المنتجات. جرب الدفع.",
    btn1: "مطعم 100$",
    btn2: "متجر 100$",
  },
  whatYouGetSection: {
    title: "ما الذي تحصل عليه فعلاً",
    desc: "هنا التقييم العادل: الموقع بـ 100$ يعمل. ليس معطلاً. لكنه لا يفعل الكثير.",
  },
  whatWorks: [
    "المنتجات أو عناصر القائمة تُعرض بشكل صحيح",
    "التنقل الأساسي يعمل",
    "رقم الهاتف والعنوان ظاهران",
    "يبدو احترافياً بما يكفي للوهلة الأولى",
    "يعمل على الكمبيوتر، ويعمل جزئياً على الجوال",
  ],
  whatWorksFooter:
    "عشان نكون عادلين: هذا ليس خردة. لمشروع جانبي أو عمل بدأ لتوه، عندك شيء ممكن ترسله للناس بدون اعتذار كبير.",
  whatsappTitle: "نموذج واتساب حقيقي",
  whatsappBody1:
    "كثير من الأعمال الصغيرة فعلاً تشتغل بهذه الطريقة: الناس تتصفح، ترسل على واتساب، تسأل، وبعدها إنت تتعامل مع كل شيء يدوياً. هذا النموذج موجود وحقيقي.",
  whatsappBody2:
    "لكن هو ينجح فقط لما تكون إنت مختاره عن قصد. الموقع بـ 100$ يدخلك فيه حتى لو شغلك أكبر من ذلك بكتير.",
  breaksSection: {
    title: "أين تظهر القيود",
    desc: "الموقع بـ 100$ ليس معطلاً. إنه محدود فحسب. وتلك الحدود تصبح مشاكل سريعاً.",
  },
  whereItBreaks: [
    { title: "لا أتمتة", description: "الطلبات عبر واتساب. المخزون يدوياً في جداول البيانات. كل عميل يتطلب تدخلك المباشر." },
    { title: "لا توسع", description: "منشور واحد ينتشر ويغرقك في الرسائل. عشرون طلباً يعني عشرون محادثة منفصلة." },
    { title: "مشكلة القالب", description: "نفس الألوان، نفس التخطيط كعشرات المواقع الأخرى. العملاء لن يتذكروا موقعك بعد ساعة." },
    { title: "مشاكل الأداء", description: "تحميل 5-8 ثوانٍ. صور تستغرق 4 ثوانٍ. على بيانات الجوال أسوأ. معظم الزوار لن ينتظروا." },
  ],
  verdictSection: { title: "الحكم الصادق" },
  placeholderNote: "الموقع بـ 100$ هو في الأساس حضور مؤقت. يعطيك وجوداً أونلاين، وليس قوة حقيقية في الشغل.",
  itWorksLabel: "يصلح إذا",
  itDoesntLabel: "لا يصلح إذا",
  itWorksIf: [
    "أنت تختبر فكرة تجارية قبل الالتزام",
    "تبيع بكميات منخفضة ولا تمانع العمل اليدوي",
    "تحتاج شيئاً اليوم وليس لديك ميزانية",
    "تفضل فعلاً نموذج الطلب عبر واتساب",
  ],
  itDoesntWorkIf: [
    "تحاول أن تبدو متمكناً",
    "تريد أن يجدك العملاء عبر جوجل",
    "تنافس أعمالاً لديها مواقع حقيقية",
    "تتوقع أن يفعل الموقع شيئاً فعلاً",
  ],
  warningNote:
    "لا تتوقع الكثير من موقع 100$. غالباً لن يوفر وقتك، وغالباً لن يكبر الإيراد، وبالتأكيد لن يبدو كنظام حقيقي.",
  upgradeSection: { title: "لحظة الترقية", desc: "كيف تعرف أنك تجاوزت حاجتك لموقع بـ 100$؟" },
  upgradeMain: "عندما تقضي",
  upgradeMainHighlight: "أكثر من ساعتين أسبوعياً",
  upgradeMainSuffix: "في إدارة الطلبات عبر واتساب.",
  upgradeNote:
    "هذه هي الإشارة. لما الرسائل والمتابعة والشغل اليدوي يبدأ يأكل الوقت المفروض تمشيه في أصل الشغل، وقتها الموقع الرخيص يتوقف عن كونه رخيصاً.",
  upgradeSignalsLabel: "إشارات أخرى:",
  upgradeSignals: [
    "(أساسي)",
    "العملاء يشكون من بطء التحميل",
    "تفقد متابعة الطلبات",
    "تقضي ساعات في المتابعة اليدوية",
    "تخجل من مشاركة رابط موقعك",
  ],
  nextSection: { title: "ما الذي يأتي بعد ذلك" },
  tier500Title: "مستوى 500$",
  tier500Desc:
    "هنا الموقع يبدأ يشيل نفسه. تحميل سريع، تجربة جوال حقيقية، دفع فعلي، وشغل يدوي أقل. يبقى أداة، لا مجرد ملصق.",
  caseStudiesTitle: "دراسات الحالة الكاملة",
  caseStudiesDesc: "بنيت كل مستوى من 20$ إلى 10,000$ حتى ترى بالضبط ما يقدمه كل ميزانية.",
  restaurantLink: "عرض مطعم 500$ ←",
  ecommerceLink: "عرض متجر 500$ ←",
  restaurantCaseLink: "دراسة حالة المطاعم ←",
  ecommerceCaseLink: "دراسة حالة التجارة الإلكترونية ←",
  bottomLine: {
    title: "الخلاصة",
    main: "الموقع بـ 100$ يعطيك غالباً نفس ما تشتريه بهذا المبلغ: موقع موجود، يشتغل شوية، ثم سريعاً تظهر حدوده.",
    cost: "الموقع بـ 100$ هو تكلفة.",
    investment: "الموقع بـ 500$+ هو استثمار.",
    footer: "والفرق بين الاثنين أكبر مما يظنه معظم الناس.",
  },
};

const breakIcons = [MessageCircle, TrendingUp, AlertCircle, Clock];

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

export default async function What100DollarWebsiteGetsYouPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = locale === "ar" ? ar : en;
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug(SLUG, locale);

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

        {/* Try the demos */}
        <section className="container-site">
          <div className={cn(READING, "reveal")}>
            <Callout title={<span className="text-lg">{c.trySection.title}</span>}>
              <p>{c.trySection.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink href={DEMO_100_RESTAURANT} external size="sm">
                  {c.trySection.btn1}
                  <ArrowOut />
                </ButtonLink>
                <ButtonLink href={DEMO_100_ECOMMERCE} external variant="secondary" size="sm">
                  {c.trySection.btn2}
                  <ArrowOut />
                </ButtonLink>
              </div>
            </Callout>
          </div>
        </section>

        {/* What works + the WhatsApp model */}
        <Block title={c.whatYouGetSection.title} description={c.whatYouGetSection.desc}>
          <CheckList items={c.whatWorks} />
          <p className="mt-6 border-t border-line pt-6 leading-relaxed text-muted">{c.whatWorksFooter}</p>
          <Callout tone="neutral" title={c.whatsappTitle} className="mt-8">
            <p>{c.whatsappBody1}</p>
            <p className="mt-3">{c.whatsappBody2}</p>
          </Callout>
        </Block>

        {/* Where it breaks down */}
        <Block title={c.breaksSection.title} description={c.breaksSection.desc} width="wide">
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.whereItBreaks.map((item, i) => {
              const Icon = breakIcons[i];
              return (
                <li key={item.title} className="card p-6">
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-accent" />
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink rtl:tracking-normal">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </Block>

        {/* The honest verdict */}
        <Block title={c.verdictSection.title} width="wide">
          <p className="mx-auto max-w-[44rem] text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.015em] text-ink rtl:leading-relaxed rtl:tracking-normal">
            {c.placeholderNote}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoCard title={c.itWorksLabel}>
              <CheckList items={c.itWorksIf} className="mt-4" />
            </InfoCard>
            <InfoCard title={c.itDoesntLabel}>
              <CheckList items={c.itDoesntWorkIf} tone="negative" className="mt-4" />
            </InfoCard>
          </div>
          <Callout className="mx-auto mt-4 max-w-[44rem]">
            <p className="text-ink">{c.warningNote}</p>
          </Callout>
        </Block>

        {/* The upgrade moment */}
        <Block title={c.upgradeSection.title} description={c.upgradeSection.desc}>
          <p className="text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.015em] text-ink rtl:leading-relaxed rtl:tracking-normal">
            {c.upgradeMain} <strong className="font-semibold text-accent">{c.upgradeMainHighlight}</strong>{" "}
            {c.upgradeMainSuffix}
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{c.upgradeNote}</p>

          <p className="mt-10 font-semibold text-ink">{c.upgradeSignalsLabel}</p>
          <ol className="card mt-4 divide-y divide-line">
            {c.upgradeSignals.slice(1).map((item, i) => (
              <li key={item} className="flex items-baseline gap-4 px-5 py-4">
                <span className="font-mono text-sm text-accent tabular" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-2">{item}</span>
              </li>
            ))}
          </ol>
        </Block>

        {/* What comes next */}
        <Block title={c.nextSection.title} width="wide">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title={c.tier500Title}>
              <p>{c.tier500Desc}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a href={DEMO_500_RESTAURANT} target="_blank" rel="noopener noreferrer" className="link font-medium">
                  {c.restaurantLink}
                </a>
                <a href={DEMO_500_ECOMMERCE} target="_blank" rel="noopener noreferrer" className="link font-medium">
                  {c.ecommerceLink}
                </a>
              </div>
            </InfoCard>
            <InfoCard title={c.caseStudiesTitle}>
              <p>{c.caseStudiesDesc}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <Link href={`/${locale}/case-studies/restaurant-websites-tiers`} className="link font-medium">
                  {c.restaurantCaseLink}
                </Link>
                <Link href={`/${locale}/case-studies/ecommerce-websites-tiers`} className="link font-medium">
                  {c.ecommerceCaseLink}
                </Link>
              </div>
            </InfoCard>
          </div>
        </Block>

        {/* Bottom line */}
        <Block title={c.bottomLine.title}>
          <p className="text-[1.0625rem] leading-relaxed text-ink-2">{c.bottomLine.main}</p>
          <ul className="card mt-8 divide-y divide-line">
            <li className="flex items-center gap-4 px-5 py-4 text-lg text-ink-2">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-danger" />
              {c.bottomLine.cost}
            </li>
            <li className="flex items-center gap-4 px-5 py-4 text-lg font-semibold text-ink">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
              {c.bottomLine.investment}
            </li>
          </ul>
          <p className="mt-6 leading-relaxed text-muted">{c.bottomLine.footer}</p>
        </Block>

        <RelatedPosts slug={SLUG} locale={locale} dict={dict} />
      </article>
    </>
  );
}
