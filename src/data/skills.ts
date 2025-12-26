// data/skillsData.ts
export interface Skill {
  name: string;
  icon: string;
  level: number; // Proficiency level (0-100)
  years: number; // Years of experience
  color: string; // Tailwind CSS gradient classes
}

export const skills: Skill[] = [
  {
    name: 'Next.js',
    icon: 'https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/nextjs-svgrepo-com.svg',
    level: 90,
    years: 5,
    color: 'from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]',
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    level: 85,
    years: 5,
    color: 'from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-gold))]',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://www.svgrepo.com/show/374118/tailwind.svg',
    level: 95,
    years: 5,
    color: 'from-[hsl(var(--accent-bronze))] to-black',
  },
  {
    name: 'Odoo',
    icon: 'https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg',
    level: 80,
    years: 4,
    color: 'from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]',
  },
  {
    name: 'Webflow',
    icon: 'https://www.svgrepo.com/show/331642/webflow.svg',
    level: 70,
    years: 1,
    color: 'from-[hsl(var(--accent-bronze))] via-[hsl(var(--accent-gold))] to-[hsl(var(--accent-champagne))]',
  },
  {
    name: 'WordPress',
    icon: 'https://www.svgrepo.com/show/475696/wordpress-color.svg',
    level: 75,
    years: 6,
    color: 'from-black via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))]',
  },
];