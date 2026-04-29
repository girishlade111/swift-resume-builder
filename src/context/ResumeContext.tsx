import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ResumeData, TemplateName, Experience, Education, Project, ResumeSettings, DEFAULT_SETTINGS } from '@/types/resume';
import { emptyResume, exampleResume } from '@/data/exampleResume';

interface ResumeContextType {
  resume: ResumeData;
  selectedTemplate: TemplateName;
  persistEnabled: boolean;
  settings: ResumeSettings;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonal: (field: string, value: string) => void;
  updateSummary: (value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: any) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  addProject: () => void;
  updateProject: (id: string, field: string, value: any) => void;
  removeProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  setSkills: (skills: string[]) => void;
  updateExtras: (field: string, value: string) => void;
  setSelectedTemplate: (t: TemplateName) => void;
  resetToExample: () => void;
  resetToEmpty: () => void;
  togglePersist: () => void;
  updateSettings: (patch: Partial<ResumeSettings>) => void;
  toggleSectionVisibility: (section: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  exportToJson: () => void;
  importFromJson: (file: File) => Promise<void>;
  getAtsScore: () => number;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

const LS_KEY = 'ladestack-resume';
const LS_SETTINGS_KEY = 'ladestack-settings';
const LS_TEMPLATE_KEY = 'ladestack-template';

function loadFromStorage(): ResumeData | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadSettings(): ResumeSettings {
  try {
    const raw = localStorage.getItem(LS_SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function loadTemplate(): TemplateName {
  try {
    const raw = localStorage.getItem(LS_TEMPLATE_KEY);
    return (raw as TemplateName) || 'classic';
  } catch {
    return 'classic';
  }
}

let idCounter = Date.now();
const newId = () => String(++idCounter);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [persistEnabled, setPersistEnabled] = useState(() => !!localStorage.getItem(LS_KEY));
  const [resume, setResume] = useState<ResumeData>(() => loadFromStorage() || exampleResume);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(loadTemplate);
  const [settings, setSettings] = useState<ResumeSettings>(loadSettings);

  useEffect(() => {
    if (persistEnabled) {
      localStorage.setItem(LS_KEY, JSON.stringify(resume));
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
      localStorage.setItem(LS_TEMPLATE_KEY, selectedTemplate);
    }
  }, [resume, persistEnabled, settings, selectedTemplate]);

  const updatePersonal = useCallback((field: string, value: string) => {
    setResume(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  }, []);

  const updateSummary = useCallback((value: string) => {
    setResume(prev => ({ ...prev, summary: value }));
  }, []);

  const addExperience = useCallback(() => {
    const item: Experience = { id: newId(), company: '', role: '', location: '', startDate: '', endDate: '', isCurrent: false, bulletPoints: [''] };
    setResume(prev => ({ ...prev, experience: [...prev.experience, item] }));
  }, []);

  const updateExperience = useCallback((id: string, field: string, value: any) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  }, []);

  const reorderExperience = useCallback((startIndex: number, endIndex: number) => {
    setResume(prev => {
      const items = [...prev.experience];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return { ...prev, experience: items };
    });
  }, []);

  const addEducation = useCallback(() => {
    const item: Education = { id: newId(), schoolName: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', grade: '' };
    setResume(prev => ({ ...prev, education: [...prev.education, item] }));
  }, []);

  const updateEducation = useCallback((id: string, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  }, []);

  const reorderEducation = useCallback((startIndex: number, endIndex: number) => {
    setResume(prev => {
      const items = [...prev.education];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return { ...prev, education: items };
    });
  }, []);

  const addProject = useCallback(() => {
    const item: Project = { id: newId(), name: '', link: '', techStack: '', bulletPoints: [''] };
    setResume(prev => ({ ...prev, projects: [...prev.projects, item] }));
  }, []);

  const updateProject = useCallback((id: string, field: string, value: any) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResume(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  }, []);

  const reorderProjects = useCallback((startIndex: number, endIndex: number) => {
    setResume(prev => {
      const items = [...prev.projects];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return { ...prev, projects: items };
    });
  }, []);

  const setSkills = useCallback((skills: string[]) => {
    setResume(prev => ({ ...prev, skills }));
  }, []);

  const updateExtras = useCallback((field: string, value: string) => {
    setResume(prev => ({ ...prev, extras: { ...prev.extras, [field]: value } }));
  }, []);

  const resetToExample = useCallback(() => setResume(exampleResume), []);
  const resetToEmpty = useCallback(() => setResume(emptyResume), []);

  const togglePersist = useCallback(() => {
    setPersistEnabled(prev => {
      if (prev) {
        localStorage.removeItem(LS_KEY);
        localStorage.removeItem(LS_SETTINGS_KEY);
        localStorage.removeItem(LS_TEMPLATE_KEY);
      }
      return !prev;
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<ResumeSettings>) => {
    setSettings(prev => ({ ...prev, ...patch }));
  }, []);

  const toggleSectionVisibility = useCallback((section: string) => {
    setSettings(prev => ({
      ...prev,
      visibleSections: {
        ...prev.visibleSections,
        [section]: !prev.visibleSections[section],
      },
    }));
  }, []);

  const reorderSections = useCallback((startIndex: number, endIndex: number) => {
    setSettings(prev => {
      const order = [...prev.sectionOrder];
      const [removed] = order.splice(startIndex, 1);
      order.splice(endIndex, 0, removed);
      return { ...prev, sectionOrder: order };
    });
  }, []);

  const exportToJson = useCallback(() => {
    const data = JSON.stringify({ resume, settings, selectedTemplate }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = resume.personal.fullName?.replace(/[^a-zA-Z0-9]/g, '-') || 'resume';
    a.href = url;
    a.download = `${name}-resume-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [resume, settings, selectedTemplate]);

  const importFromJson = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (parsed.resume?.personal && parsed.resume?.experience) {
      setResume(parsed.resume);
      if (parsed.settings) setSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
      if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
    } else if (parsed.personal && parsed.experience) {
      setResume(parsed as ResumeData);
    }
  }, []);

  const getAtsScore = useCallback(() => {
    let score = 0;
    const p = resume.personal;
    if (p.fullName) score += 10;
    if (p.email) score += 10;
    if (p.phone) score += 5;
    if (resume.summary) score += 10;
    if (resume.summary.length >= 150 && resume.summary.length <= 300) score += 5;
    if (resume.experience.length > 0) score += 10;
    if (resume.experience.some(e => e.bulletPoints.filter(b => b.trim()).length > 0)) score += 5;
    if (resume.education.length > 0) score += 5;
    if (resume.skills.length > 0) score += 10;
    if (resume.skills.length >= 5 && resume.skills.length <= 15) score += 5;
    const allBullets = [
      ...resume.experience.flatMap(e => e.bulletPoints),
      ...resume.projects.flatMap(p => p.bulletPoints),
    ].join(' ');
    if (/\d+%|\d+x|\$\d+|\d+ (users|customers|teams|projects|clients)/i.test(allBullets)) score += 10;
    if (p.linkedinUrl || p.githubUrl || p.portfolioUrl) score += 5;
    if (resume.projects.length > 0) score += 5;
    if (resume.extras.certifications || resume.extras.achievements) score += 5;
    return Math.min(score, 100);
  }, [resume]);

  return (
    <ResumeContext.Provider
      value={{
        resume, selectedTemplate, persistEnabled, settings, setResume,
        updatePersonal, updateSummary,
        addExperience, updateExperience, removeExperience, reorderExperience,
        addEducation, updateEducation, removeEducation, reorderEducation,
        addProject, updateProject, removeProject, reorderProjects,
        setSkills, updateExtras,
        setSelectedTemplate, resetToExample, resetToEmpty, togglePersist,
        updateSettings, toggleSectionVisibility, reorderSections,
        exportToJson, importFromJson, getAtsScore,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
