export type ProjectTheme = 'purple' | 'green' | 'lavender' | 'mint' | 'dark';

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string; // public path e.g. /images/projects/xyz.png
  theme: ProjectTheme;
  align: 'left' | 'right'; // image side on xl
  link?: string;
  technologies?: string[];
  github?: string;
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Watch And Earn',
    category: 'Web App',
    description:
      'Watch & Earn is a content engagement platform where users watch curated videos and complete tasks to earn rewards. It features secure auth, creator campaign pages, wallet/points tracking, and a clean, responsive UI focused on conversion and retention.',
    image: '/images/projects/wte1.PNG',
    theme: 'lavender',
    align: 'left',
    link: 'https://watchandearn.it.com/',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'REST API',
      'JWT Auth',
      'Vercel'
    ],
  },
  {
    id: 2,
    title: 'AutoRec System',
    category: 'Web App',
    description:
      'Auto‑Rec System is a data‑driven web app that delivers personalized recommendations with a streamlined UX. It includes multilingual routing, advanced filtering, and a dashboard for insights—built with reusable components and performance best practices.',
    image: '/images/projects/autorec1.PNG',
    theme: 'green',
    align: 'right',
    link: 'https://auto-rec-system.vercel.app/en',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'REST API',
      'Vercel'
    ],
    github: 'https://github.com/mahmadcoder/auto-rec-system'
  },
  
];
