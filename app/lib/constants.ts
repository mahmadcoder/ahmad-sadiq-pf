export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonial", href: "#testimonial" },
];

export const TECH_STACK_ITEMS = [
  { name: "Next.js", category: "Framework", icon: "/images/techs/nextjs.svg" },
  { name: "React.js", category: "Library", icon: "/images/techs/react.svg" },
  { name: "TypeScript", category: "Logic", icon: "/images/techs/ts.svg" },
  { name: "Tailwind", category: "Styling", icon: "/images/techs/tailwind.svg" },
  { name: "Node.js", category: "Runtime", icon: "/images/techs/node.svg" },
  { name: "Vite", category: "Build Tool", icon: "/images/techs/vite.svg" },
  { name: "GSAP", category: "Animation", icon: "/images/techs/gsap.svg?v=fresh" },
  { name: "Prisma", category: "ORM", icon: "/images/techs/prisma.svg" },
  { name: "Vercel", category: "Hosting", icon: "/images/techs/vercel.svg" },
];

export const ABOUT_DATA = {
  header: {
    badge: "About the Architect",
    title: "Engineering",
    gradientText: "Elegance",
    subtitle: "A full-stack developer focused on building high-performance, accessible, and visually stunning digital products."
  },
  philosophy: {
    title: "My Approach",
    description: "I believe great software starts with great communication. I work closely with every client — understanding their goals, being fully transparent, and delivering solutions that are simple to use and built to last."
  },
  globalNodes: {
    title: "Global Nodes",
    description: "Based in Pakistan, working with clients worldwide. Available for remote projects across all time zones.",
    badge: "Available Worldwide",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbU7cdfu1LGTmLSm1GFPQ9hZ-Ca2bLlyjAJlJ14fv58dvHdFJaBlqBmQi2cMRXeATqQUykYMtJTmIJ2jgdACXp2NnfKJjiVJQxxABkMvMRAHbnjsIEODgfGGjjs-GZf8AwBTk5fZnuJdmqHTC2xZz-zRaPOC-en5Vo5R1C4znOcdj-GkV8HBuLwQ5YzKYqTiXXRwDxLC5eFJXNzX9rIx4OI3X0h7bYC3bKWEzrLKyWJNoyJrLJ4nU3avsZtbUBtNPvnaO1g9c_L2Q"
  },
  techStack: {
    title: "Engineering Principles",
    items: [
       { name: "Performance First", icon: "speed" },
       { name: "Accessibility by Default", icon: "accessibility_new" },
       { name: "Scalable Architecture", icon: "account_tree" },
       { name: "Clean Code", icon: "code_blocks" }
    ]
  },
  focus: {
    title: "Current Focus",
    description: "Currently focused on building smooth, cinematic animations without sacrificing speed or performance scores."
  },
  cta: {
    title: "Ready to build the future?",
    subtitle: "Currently accepting new projects. Let's talk!",
    email: "ahmadsadiq2284@gmail.com",
    buttonText: "Start Project"
  }
};

export const PROJECTS = [
  {
    id: 1,
    title: "PhysicianMeds",
    description: "A full-stack healthcare platform for medical billing and revenue cycle management — built with Next.js, Supabase, and GSAP animations.",
    image: "/projects/physician-meds.png",
    tags: ["Next.js", "TypeScript","TailwindCSS", "Supabase", "GSAP", "CMS","Healthcare"],
    liveUrl: "https://physicianmeds.com/",
    githubUrl: "https://github.com/mahmadcoder/physician-meds",
  },
  {
    id: 2,
    title: "Velvet Pour",
    description: "An immersive cocktail discovery app with cinematic GSAP animations and a smooth, fluid user experience.",
    image: "/projects/cocktail-web.png",
    tags: ["React","Vite","JavaScript", "GSAP", "TailwindCSS"],
    liveUrl: "https://cocktailio-app.vercel.app/",
    githubUrl: "https://github.com/mahmadcoder/cocktails_gsap_app",
  },
  {
    id: 3,
    title: "Converso AI",
    description: "An AI-powered SaaS learning platform where users build personalized voice companions for interactive, subject-based lessons.",
    image: "/projects/lms-system.png",
    tags: ["Next.js", "AI", "SAAS","LMS"],
    liveUrl: "https://converso-ai-app.vercel.app/",
    githubUrl: "https://github.com/mahmadcoder/lms-saas-app",
  },

];

export const HERO_STATS = [
  { value: "99%", label: "Lighthouse Performance" },
  { value: "50+", label: "Deployments" },
  { value: "0.4s", label: "Avg. LCP Time" },
];

export const FOOTER_NAV = [
  { name: "Home", href: "#" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export const FOOTER_SOCIAL = [
  { name: "GitHub", href: "https://github.com/mahmadcoder" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/devahmad-sadiq/" },
  { name: "Twitter", href: "#" },
];

export const CONTACT_INFO = [
  {
    icon: "mail",
    label: "Email Address",
    value: "ahmadsadiq2284@gmail.com",
    type: "text",
  },
  {
    icon: "share",
    label: "Social Connect",
    value: "",
    type: "links",
    links: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/devahmad-sadiq/" },
      { name: "GitHub", href: "https://github.com/mahmadcoder" },
    ],
  },
];

export const BUDGET_OPTIONS = [
  "$500 - $1k",
  "$1k - $5k",
  "$5k - $10k",
  "To be discussed",
];

export const TIMELINE_OPTIONS = [
  "1 - 2 Months",
  "3 - 6 Months",
  "Ongoing Partnership",
  "ASAP",
];

export const TESTIMONIALS = [
  {
    initial: "S",
    quote: "Ahmad delivered beyond expectations. Our platform needed to handle complex medical billing workflows while looking <span class=\"text-primary\">world-class</span> — he nailed both. The animations are smooth, the backend is solid, and the whole project was delivered on time. Highly recommend working with him.",
    name: "Saad Ali",
    title: "Founder, PhysicianMeds — Pakistan"
  },
  {
    initial: "J",
    quote: "I gave Ahmad a creative brief and he turned it into something I didn't even imagine. The GSAP animations on Velvet Pour feel <span class=\"text-primary\">cinematic and premium</span>. He has a rare ability to combine great design with clean code. Will definitely collaborate again.",
    name: "James Carter",
    title: "UI/UX Designer — United Kingdom"
  },
  {
    initial: "S",
    quote: "Building an AI SaaS product is complex but Ahmad made it look easy. The voice companion feature works flawlessly, the UI is clean, and the Supabase integration is <span class=\"text-primary\">rock solid</span>. He communicates well throughout the whole process and delivers quality work.",
    name: "Sarah Mitchell",
    title: "Product Manager — United States"
  }
];

export const DEVELOPMENT_PHASES = [
  {
    step: "01",
    icon: "search",
    title: "Discovery",
    description: "Auditing performance bottlenecks, mapping complex user flows, and defining the architectural vision for the project."
  },
  {
    step: "02",
    icon: "schema",
    title: "Architecture",
    description: "Structuring your app with a clean database design, reusable components, and optimized server logic built for long-term performance."
  },
  {
    step: "03",
    icon: "speed",
    title: "Scale",
    description: "Deploying globally, optimizing load speeds, and monitoring performance so your app stays fast and reliable at any scale."
  }
];

export const SERVICES = [
  {
    id: "01",
    category: "Performance",
    iconBg: "bg-primary-container/20",
    iconColor: "text-primary",
    icon: "speed",
    title: "High-Performance Engineering",
    description: "Building blisteringly fast web applications with server-side rendering, static site generation, and optimized Core Web Vitals.",
    tags: ["Next.js", "React", "Server Components", "Edge Computing"]
  },
  {
    id: "02",
    category: "UI/UX",
    iconBg: "bg-secondary-container/20",
    iconColor: "text-secondary",
    icon: "design_services",
    title: "Fluid Interface Design",
    description: "Crafting premium user experiences with deep attention to typography, spacing, and micro-interactions."
  },
  {
    id: "03",
    category: "Architecture",
    iconBg: "bg-tertiary-container/20",
    iconColor: "text-tertiary",
    icon: "architecture",
    title: "Scalable Systems",
    description: "Designing robust frontend architectures with modular components, design systems, and clean state management."
  },
  {
    id: "04",
    category: "SEO Optimization",
    iconBg: "bg-primary-container/20",
    iconColor: "text-primary",
    icon: "search_insights",
    title: "Technical SEO & Structure",
    description: "Implementing semantic HTML, structured data, and dynamic meta tags for maximum search engine visibility and accessibility."
  }
];

export const SEO_STATS = [
  { value: "100", label: "Accessibility Score", colSpan: 1 },
  { value: "100", label: "Best Practices", colSpan: 1 },
  { value: "100", label: "SEO Performance Score", colSpan: 2 }
];
