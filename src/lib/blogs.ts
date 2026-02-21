export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage?: string;
  publishedDate: Date;
  readTime: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-not-to-buy-cheap-websites",
    title: "Why a $20 Website Will Cost You Thousands in Lost Business",
    summary:
      "A $20 website doesn't just look cheap — it actively repels customers. Here's what cheap websites really cost your business and why they hurt more than help.",
    category: "Business",
    tags: ["websites", "business", "cheap-websites", "roi", "trust"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 8,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
