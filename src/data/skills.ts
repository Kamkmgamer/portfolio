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
    color: 'from-gray-100 to-gray-900',
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    level: 85,
    years: 5,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://www.svgrepo.com/show/374118/tailwind.svg',
    level: 95,
    years: 5,
    color: 'from-cyan-100 to-cyan-900',
  },
  {
    name: 'Odoo',
    icon: 'https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg',
    level: 80,
    years: 4,
    color: 'from-cyan-100 to-cyan-300',
  },
  {
    name: 'Webflow',
    icon: 'https://www.svgrepo.com/show/331642/webflow.svg',
    level: 70,
    years: 1,
    color: 'from-indigo-100 to-indigo-300',
  },
  {
    name: 'WordPress',
    icon: 'https://www.svgrepo.com/show/475696/wordpress-color.svg',
    level: 75,
    years: 6,
    color: 'from-blue-100 to-indigo-300',
  },
];