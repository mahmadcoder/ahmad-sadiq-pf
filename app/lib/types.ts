// ─── Navigation ───
export interface NavLink {
  name: string;
  href: string;
}

// ─── Technology ───
export interface Technology {
  name: string;
  category: string;
}

// ─── Project ───
export interface Project {
  title: string;
  label: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  caseStudyUrl: string;
  linkText: string;
  linkIcon: string;
  wide: boolean;
}

// ─── Service ───
export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tags?: string[];
  hasProgressBar?: boolean;
  hasCodeSnippet?: boolean;
  hasStats?: boolean;
  wide: boolean;
}

// ─── Service Stat ───
export interface ServiceStat {
  value: string;
  label: string;
  colSpan?: number;
}

// ─── Hero Stat ───
export interface HeroStat {
  value: string;
  label: string;
}

// ─── Footer Link ───
export interface FooterLink {
  name: string;
  href: string;
}

// ─── Social Link (used in Contact) ───
export interface SocialLink {
  name: string;
  href: string;
}

// ─── Contact Info ───
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  type: "text" | "links";
  links?: SocialLink[];
}
