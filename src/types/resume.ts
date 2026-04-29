export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  profileImage: string;
}

export interface Education {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bulletPoints: string[];
}

export interface Project {
  id: string;
  name: string;
  link: string;
  techStack: string;
  bulletPoints: string[];
}

export interface Extras {
  certifications: string;
  languages: string;
  achievements: string;
}

export interface ResumeSettings {
  accentColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  sectionSpacing: number;
  visibleSections: Record<string, boolean>;
}

export const DEFAULT_SETTINGS: ResumeSettings = {
  accentColor: '#2563eb',
  fontFamily: 'Inter',
  fontSize: 10,
  lineHeight: 1.5,
  sectionSpacing: 20,
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    extras: true,
  },
};

export const ACCENT_COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Slate', value: '#475569' },
  { name: 'Red', value: '#dc2626' },
];

export const FONT_FAMILIES = [
  { name: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { name: 'Georgia', value: 'Georgia, "Times New Roman", serif' },
  { name: 'Roboto', value: 'Roboto, "Helvetica Neue", sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
  { name: 'Source Sans', value: '"Source Sans 3", "Source Sans Pro", sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, Georgia, serif' },
];

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  extras: Extras;
  settings?: ResumeSettings;
}

export type TemplateName =
  | 'classic'
  | 'compact'
  | 'left-sidebar'
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'clean'
  | 'executive'
  | 'creative'
  | 'elegant'
  | 'bold'
  | 'tech'
  | 'gradient'
  | 'infographic'
  | 'timeline'
  | 'magazine'
  | 'monochrome'
  | 'artistic'
  | 'corporate'
  | 'starter'
  | 'academic'
  | 'designer'
  | 'swiss'
  | 'metro'
  | 'luxe'
  | 'nordic'
  | 'architect'
  | 'editorial'
  | 'brutalist'
  | 'glass'
  | 'neon'
  | 'pixel';
