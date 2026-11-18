import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { formatPostDate, getFeaturedPosts } from "@/lib/blogs";
import { IndexRow } from "@/components/site/cards";
import { MetaRow, PageHeader } from "@/components/site/layout";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildLocalizedMetadata(locale, "/blog", {
    title: dict.blog.title,
    description: dict.blog.description,
    openGraph: { title: dict.blog.title, description: dict.blog.description, type: "website" },
    twitter: { card: "summary_large_image", title: dict.blog.title, description: dict.blog.description },
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = getFeaturedPosts(locale);

  return (
    <>
      <PageHeader title={dict.blog.heading} lead={dict.blog.lead} />
      <section aria-label={dict.blog.title} className="container-site pb-[calc(var(--section-y)*0.75)]">
        <ul className="reveal">
          {posts.map((post) => (
            <IndexRow
              key={post.slug}
              headingLevel="h2"
              href={`/${locale}/blog/${post.slug}`}
              label={post.category}
              title={post.title}
              summary={post.summary}
              meta={
                <MetaRow
                  items={[
                    post.author,
                    <time key="d" dateTime={post.publishedDate.toISOString().slice(0, 10)}>
                      {formatPostDate(post.publishedDate, locale)}
                    </time>,
                    `${post.readTime} ${dict.blog.minRead}`,
                  ]}
                />
              }
            />
          ))}
        </ul>
      </section>
    </>
  );
}
