/**
 * ResumeContext — central state provider for all resume data.
 * Manages in-memory state with optional localStorage persistence.
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ResumeData, TemplateName, Experience, Education, Project } from '@/types/resume';
import { emptyResume, exampleResume } from '@/data/exampleResume';

interface ResumeContextType {
  resume: ResumeData;
  selectedTemplate: TemplateName;
  persistEnabled: boolean;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonal: (field: string, value: string) => void;
  updateSummary: (value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: any) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: string, value: any) => void;
  removeProject: (id: string) => void;
  setSkills: (skills: string[]) => void;
  updateExtras: (field: string, value: string) => void;
  setSelectedTemplate: (t: TemplateName) => void;
  resetToExample: () => void;
  resetToEmpty: () => void;
  togglePersist: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

const LS_KEY = 'ladestack-resume';

function loadFromStorage(): ResumeData | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

let idCounter = Date.now();
const newId = () => String(++idCounter);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [persistEnabled, setPersistEnabled] = useState(() => !!localStorage.getItem(LS_KEY));
  const [resume, setResume] = useState<ResumeData>(() => loadFromStorage() || exampleResume);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('classic');

  // Persist to localStorage when enabled
  useEffect(() => {
    if (persistEnabled) {
      localStorage.setItem(LS_KEY, JSON.stringify(resume));
    }
  }, [resume, persistEnabled]);

  const updatePersonal = useCallback((field: string, value: string) => {
    setResume(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  }, []);

  const updateSummary = useCallback((value: string) => {
    setResume(prev => ({ ...prev, summary: value }));
  }, []);

  // --- Experience helpers ---
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

  // --- Education helpers ---
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

  // --- Project helpers ---
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
      if (prev) localStorage.removeItem(LS_KEY);
      return !prev;
    });
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resume, selectedTemplate, persistEnabled, setResume,
        updatePersonal, updateSummary,
        addExperience, updateExperience, removeExperience,
        addEducation, updateEducation, removeEducation,
        addProject, updateProject, removeProject,
        setSkills, updateExtras,
        setSelectedTemplate, resetToExample, resetToEmpty, togglePersist,
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
