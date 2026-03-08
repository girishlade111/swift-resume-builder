/**
 * Resume data model — all TypeScript types used across form, preview, and PDF.
 */

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
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

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  extras: Extras;
}

export type TemplateName = 'classic' | 'compact' | 'left-sidebar' | 'modern' | 'minimal';
