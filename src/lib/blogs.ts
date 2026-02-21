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
      "A $20 website doesn't just look cheap - it actively repels customers. Here's what cheap websites really cost your business and why they hurt more than help.",
    category: "Business",
    tags: ["websites", "business", "cheap-websites", "roi", "trust"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 8,
  },
  {
    slug: "what-100-dollar-website-gets-you",
    title: "What a $100 Website Actually Gets You",
    summary:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown of what that budget delivers - nothing more, nothing less.",
    category: "Business",
    tags: ["websites", "business", "budget", "expectations", "scaling"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 7,
  },
  {
    slug: "what-a-professional-website-costs",
    title: "What a Professional Website Actually Costs ($200-$500)",
    summary:
      "The $200-$500 range is where websites stop being costs and start being investments. Here's what each budget delivers, with live demos to prove it.",
    category: "Business",
    tags: ["websites", "business", "investment", "professional", "comparison"],
    author: "Web Developer",
    publishedDate: new Date("2026-02-21"),
    readTime: 9,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
