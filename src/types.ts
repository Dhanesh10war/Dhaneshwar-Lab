export type Category = 'all' | 'technology' | 'products' | 'research' | 'ventures' | 'ideas';

export interface FocusArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  icon: string;
  accentColor: string;
}

export interface EducationInfo {
  degree: string;
  specialization: string;
  institution: string;
  university: string;
  cgpa: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  platformName: string;
  tagline: string;
  secondaryTagline: string;
  headline: string;
  intro: string;
  bio: string[];
  philosophy: string;
  email: string;
  socials: SocialLink[];
  education: EducationInfo;
  areasOfFocus: FocusArea[];
  currentFocus: {
    heading: string;
    description: string;
  };
}

export interface ProjectItem {
  id: string;
  category: 'products' | 'works' | 'designs' | 'research';
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  year: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  link?: string;
  featured?: boolean;
  accentColor?: string;
}

export interface WritingItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}
