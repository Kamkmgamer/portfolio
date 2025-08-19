export type ResearchPaper = {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  authors?: string[];
  venue?: string;
  year?: number;
  image?: string; // path in public/
  tags?: string[];
  pdf?: string; // external or public path
  content?: string; // full text content to render on detail page
};

export const researchPapers: ResearchPaper[] = [
  {
    id: 'rp-1',
    slug: 'neural-rendering-for-ux',
    title: 'Neural Rendering Techniques for Real‑Time UX',
    abstract:
      'We explore efficient neural rendering pipelines enabling interactive user experiences on the web with constrained compute and latency.',
    authors: ['Your Name', 'Co Author'],
    venue: 'WebAI Workshop',
    year: 2024,
    image: '/file.svg',
    tags: ['Neural Rendering', 'Web', 'Latency'],
    pdf: 'https://example.com/paper.pdf',
  },
  {
    id: 'rp-2',
    slug: 'secure-agents-on-device',
    title: 'Secure On‑Device Agents for Personal Data',
    abstract:
      'This paper presents a sandboxed capability model and memory isolation strategy for LLM agents running locally on user devices.',
    authors: ['Your Name'],
    venue: 'Privacy & AI (PAI)',
    year: 2025,
    image: '/file.svg',
    tags: ['Security', 'Agents', 'On‑device'],
  },
  {
    id: 'rp-3',
    slug: 'analysis-of-undefined-behavior-in-c-increment-operators',
    title:
      'Analysis of Undefined Behavior in C: The Pedagogical Issues of Using Multiple Pre- and Post-Increment Operators Across Compilers',
    abstract:
      'This paper provides an in-depth analysis of why expressions in C that combine multiple pre- and post-increment operators on a single variable exhibit unpredictable and compiler-dependent behavior. The analysis shows that this phenomenon is a direct consequence of unsequenced modifications, a specific form of undefined behavior sanctioned by the C language standard. The historical rationale behind this design choice, intended to enable aggressive compiler optimizations, is explored. Through case studies of divergent compiler outcomes, the practical risks of relying on such expressions are illustrated. The paper concludes that these expressions are pedagogically unsound and should be discouraged in foundational C curricula in favor of clarity, defensive coding, and an understanding of the language\'s formal rules.',
    authors: ['Khalil Abd AlMageed Khalil Mohammed'],
    year: 2025,
    image: 'https://cdn.worldvectorlogo.com/logos/c-1.svg',
    tags: ['C', 'Undefined Behavior', 'Education', 'Compilers'],
    pdf: '/paper/C Increment Undefined Behavior Analysis_.pdf',
  },
];
