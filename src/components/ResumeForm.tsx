import { useState, useRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { ACCENT_COLORS, FONT_FAMILIES } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, RotateCcw, FileText, Upload, X, Download, UploadCloud, Eye, EyeOff, Palette, Shield } from 'lucide-react';
import AtsTips from '@/components/AtsTips';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

function AtsScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800'
    : score >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800'
    : 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800';
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work';
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${color}`}>
      <Shield className="h-3.5 w-3.5" />
      <span>ATS Score: {score}/100</span>
      <span className="opacity-70">({label})</span>
    </div>
  );
}

export default function ResumeForm() {
  const ctx = useResume();
  const { resume, persistEnabled, togglePersist, resetToExample, resetToEmpty, settings, updateSettings, toggleSectionVisibility, exportToJson, importFromJson, getAtsScore } = ctx;
  const [skillInput, setSkillInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      ctx.updatePersonal('profileImage', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    ctx.updatePersonal('profileImage', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.trim().replace(/,$/, '');
      if (val && !resume.skills.includes(val)) {
        ctx.setSkills([...resume.skills, val]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    ctx.setSkills(resume.skills.filter(s => s !== skill));
  };

  const handleJsonImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importFromJson(file);
    } catch {
      alert('Invalid JSON file');
    }
    if (jsonInputRef.current) jsonInputRef.current.value = '';
  };

  const atsScore = getAtsScore();

  const SectionToggle = ({ section }: { section: string }) => (
    <button
      onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(section); }}
      className="ml-auto mr-2 p-1 rounded-md hover:bg-muted transition-colors"
      title={settings.visibleSections[section] !== false ? 'Hide section from preview' : 'Show section in preview'}
    >
      {settings.visibleSections[section] !== false
        ? <Eye className="h-3.5 w-3.5 text-muted-foreground" />
        : <EyeOff className="h-3.5 w-3.5 text-muted-foreground/50" />}
    </button>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ATS Score */}
      <div className="animate-fade-in">
        <AtsScoreBadge score={atsScore} />
      </div>

      {/* Top controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
        <div className="flex items-center gap-2">
          <Switch checked={persistEnabled} onCheckedChange={togglePersist} id="persist" />
          <Label htmlFor="persist" className="text-xs text-muted-foreground cursor-pointer">
            Remember on this device
          </Label>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={resetToExample} className="shrink-0 rounded-xl">
            <FileText className="h-3.5 w-3.5 sm:mr-1" /> <span className="hidden sm:inline">Example</span>
          </Button>
          <Button variant="outline" size="sm" onClick={exportToJson} className="shrink-0 rounded-xl">
            <Download className="h-3.5 w-3.5 sm:mr-1" /> <span className="hidden sm:inline">Export JSON</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => jsonInputRef.current?.click()} className="shrink-0 rounded-xl">
            <UploadCloud className="h-3.5 w-3.5 sm:mr-1" /> <span className="hidden sm:inline">Import JSON</span>
          </Button>
          <input ref={jsonInputRef} type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0 rounded-xl">
                <RotateCcw className="h-3.5 w-3.5 sm:mr-1" /> <span className="hidden sm:inline">Clear</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all resume content. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToEmpty}>Clear</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Accordion
        type="multiple"
        defaultValue={['customize', 'personal', 'summary', 'experience', 'education', 'projects', 'skills']}
        className="space-y-3 sm:space-y-4"
      >
        {/* ── Customize ── */}
        <AccordionItem value="customize" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            <span className="flex items-center gap-2"><Palette className="h-4 w-4 text-primary" />Customize</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-4">
            <div>
              <Label className="text-xs font-medium mb-2 block">Accent Color</Label>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => updateSettings({ accentColor: c.value })}
                    className="relative w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                    style={{
                      background: c.value,
                      borderColor: settings.accentColor === c.value ? c.value : 'transparent',
                      boxShadow: settings.accentColor === c.value ? `0 0 0 2px ${c.value}40` : 'none',
                    }}
                    title={c.name}
                  >
                    {settings.accentColor === c.value && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">{'✓'}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-2 block">Font Family</Label>
              <Select value={settings.fontFamily} onValueChange={(v) => updateSettings({ fontFamily: v })}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILIES.map(f => (
                    <SelectItem key={f.name} value={f.name}>
                      <span style={{ fontFamily: f.value }}>{f.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Personal Info ── */}
        <AccordionItem value="personal" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">Personal Info</AccordionTrigger>
          <AccordionContent className="grid gap-3 pb-3 sm:pb-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs font-medium">Profile Picture</Label>
              <div className="flex items-center gap-3 mt-1.5">
                {resume.personal.profileImage ? (
                  <div className="relative">
                    <img src={resume.personal.profileImage} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-border" />
                    <button onClick={removeImage} className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs" aria-label="Remove profile picture">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <Button variant="outline" size="sm" type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl">
                    <Upload className="h-3.5 w-3.5 mr-1" /> {resume.personal.profileImage ? 'Change' : 'Upload'}
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB recommended.</p>
                </div>
              </div>
            </div>
            <Field label="Full Name *">
              <Input value={resume.personal.fullName} onChange={e => ctx.updatePersonal('fullName', e.target.value)} placeholder="John Doe" className="rounded-xl" />
            </Field>
            <Field label="Desired Job Title">
              <Input value={resume.personal.jobTitle} onChange={e => ctx.updatePersonal('jobTitle', e.target.value)} placeholder="Frontend Developer" className="rounded-xl" />
            </Field>
            <Field label="Email *">
              <Input type="email" value={resume.personal.email} onChange={e => ctx.updatePersonal('email', e.target.value)} placeholder="john@email.com" className="rounded-xl" />
            </Field>
            <Field label="Phone">
              <Input value={resume.personal.phone} onChange={e => ctx.updatePersonal('phone', e.target.value)} placeholder="+91 98765 43210" className="rounded-xl" />
            </Field>
            <Field label="Location">
              <Input value={resume.personal.location} onChange={e => ctx.updatePersonal('location', e.target.value)} placeholder="Bangalore, India" className="rounded-xl" />
            </Field>
            <Field label="Portfolio / Website">
              <Input value={resume.personal.portfolioUrl} onChange={e => ctx.updatePersonal('portfolioUrl', e.target.value)} placeholder="https://yoursite.com" className="rounded-xl" />
            </Field>
            <Field label="LinkedIn">
              <Input value={resume.personal.linkedinUrl} onChange={e => ctx.updatePersonal('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." className="rounded-xl" />
            </Field>
            <Field label="GitHub">
              <Input value={resume.personal.githubUrl} onChange={e => ctx.updatePersonal('githubUrl', e.target.value)} placeholder="https://github.com/..." className="rounded-xl" />
            </Field>
          </AccordionContent>
        </AccordionItem>

        {/* ── Summary ── */}
        <AccordionItem value="summary" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Summary
            <SectionToggle section="summary" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-2">
            <Textarea value={resume.summary} onChange={e => ctx.updateSummary(e.target.value)} placeholder="Write a brief 2-3 sentence professional summary..." rows={3} className="rounded-xl" />
            <p className={`text-xs ${resume.summary.length > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {resume.summary.length} characters (recommended: 150-300)
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ── Experience ── */}
        <AccordionItem value="experience" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Experience
            <SectionToggle section="experience" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-4">
            <AtsTips tips={[
              'Start bullets with action verbs (built, led, improved).',
              'Include keywords from the job description.',
              'Quantify impact where possible (e.g. "reduced load time by 30%").',
            ]} />
            {resume.experience.map((exp) => (
              <div key={exp.id} className="space-y-3 rounded-xl border p-3 relative">
                <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7 text-destructive" onClick={() => ctx.removeExperience(exp.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="Role">
                    <Input value={exp.role} onChange={e => ctx.updateExperience(exp.id, 'role', e.target.value)} placeholder="Software Engineer" className="rounded-xl" />
                  </Field>
                  <Field label="Company">
                    <Input value={exp.company} onChange={e => ctx.updateExperience(exp.id, 'company', e.target.value)} placeholder="Acme Inc." className="rounded-xl" />
                  </Field>
                  <Field label="Location">
                    <Input value={exp.location} onChange={e => ctx.updateExperience(exp.id, 'location', e.target.value)} placeholder="City, Country" className="rounded-xl" />
                  </Field>
                  <Field label="Start Date">
                    <Input value={exp.startDate} onChange={e => ctx.updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jun 2024" className="rounded-xl" />
                  </Field>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">End Date</Label>
                    <Input value={exp.isCurrent ? 'Present' : exp.endDate} disabled={exp.isCurrent} onChange={e => ctx.updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Dec 2024" className="rounded-xl" />
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox checked={exp.isCurrent} onCheckedChange={v => ctx.updateExperience(exp.id, 'isCurrent', !!v)} id={`current-${exp.id}`} />
                      <Label htmlFor={`current-${exp.id}`} className="text-xs cursor-pointer">Currently working here</Label>
                    </div>
                  </div>
                </div>
                <Field label="Bullet Points (one per line)">
                  <Textarea value={exp.bulletPoints.join('\n')} onChange={e => ctx.updateExperience(exp.id, 'bulletPoints', e.target.value.split('\n'))} placeholder={"Built responsive UI components...\nImproved performance by 30%..."} rows={3} className="rounded-xl" />
                </Field>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addExperience} className="w-full rounded-xl">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Education ── */}
        <AccordionItem value="education" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Education
            <SectionToggle section="education" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="space-y-3 rounded-xl border p-3 relative">
                <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7 text-destructive" onClick={() => ctx.removeEducation(edu.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="School / University">
                    <Input value={edu.schoolName} onChange={e => ctx.updateEducation(edu.id, 'schoolName', e.target.value)} placeholder="MIT" className="rounded-xl" />
                  </Field>
                  <Field label="Degree">
                    <Input value={edu.degree} onChange={e => ctx.updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.Tech" className="rounded-xl" />
                  </Field>
                  <Field label="Field of Study">
                    <Input value={edu.fieldOfStudy} onChange={e => ctx.updateEducation(edu.id, 'fieldOfStudy', e.target.value)} placeholder="Computer Science" className="rounded-xl" />
                  </Field>
                  <Field label="Grade (optional)">
                    <Input value={edu.grade} onChange={e => ctx.updateEducation(edu.id, 'grade', e.target.value)} placeholder="8.5 CGPA" className="rounded-xl" />
                  </Field>
                  <Field label="Start Year">
                    <Input value={edu.startYear} onChange={e => ctx.updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2020" className="rounded-xl" />
                  </Field>
                  <Field label="End Year">
                    <Input value={edu.endYear} onChange={e => ctx.updateEducation(edu.id, 'endYear', e.target.value)} placeholder="2024" className="rounded-xl" />
                  </Field>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addEducation} className="w-full rounded-xl">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Projects ── */}
        <AccordionItem value="projects" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Projects
            <SectionToggle section="projects" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="space-y-3 rounded-xl border p-3 relative">
                <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7 text-destructive" onClick={() => ctx.removeProject(proj.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="Project Name">
                    <Input value={proj.name} onChange={e => ctx.updateProject(proj.id, 'name', e.target.value)} placeholder="TaskFlow App" className="rounded-xl" />
                  </Field>
                  <Field label="Link (optional)">
                    <Input value={proj.link} onChange={e => ctx.updateProject(proj.id, 'link', e.target.value)} placeholder="https://github.com/..." className="rounded-xl" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Tech Stack">
                      <Input value={proj.techStack} onChange={e => ctx.updateProject(proj.id, 'techStack', e.target.value)} placeholder="React, TypeScript, Firebase" className="rounded-xl" />
                    </Field>
                  </div>
                </div>
                <Field label="Bullet Points (one per line)">
                  <Textarea value={proj.bulletPoints.join('\n')} onChange={e => ctx.updateProject(proj.id, 'bulletPoints', e.target.value.split('\n'))} placeholder={"Built a full-stack web app...\nImplemented CI/CD pipeline..."} rows={3} className="rounded-xl" />
                </Field>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addProject} className="w-full rounded-xl">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Skills ── */}
        <AccordionItem value="skills" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Skills
            <SectionToggle section="skills" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-3">
            <AtsTips tips={[
              'Group similar skills and avoid keyword stuffing.',
              'Use tools, frameworks, and domains that match your target role.',
              'Keep it concise - 8-15 skills is ideal.',
            ]} />
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-destructive" aria-label={`Remove ${skill}`}>&times;</button>
                </span>
              ))}
            </div>
            <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} placeholder="Type a skill and press Enter (e.g. React, TypeScript, Node.js)" className="rounded-xl" />
          </AccordionContent>
        </AccordionItem>

        {/* ── Extras ── */}
        <AccordionItem value="extras" className="rounded-xl border bg-card px-3 sm:px-4">
          <AccordionTrigger className="text-sm font-semibold py-3 sm:py-4">
            Extras (optional)
            <SectionToggle section="extras" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 sm:pb-4 space-y-3">
            <Field label="Certifications">
              <Textarea value={resume.extras.certifications} onChange={e => ctx.updateExtras('certifications', e.target.value)} placeholder={"AWS Cloud Practitioner (2024)\nGoogle UX Design Certificate"} rows={2} className="rounded-xl" />
            </Field>
            <Field label="Languages">
              <Textarea value={resume.extras.languages} onChange={e => ctx.updateExtras('languages', e.target.value)} placeholder="English (Fluent), Hindi (Native)" rows={2} className="rounded-xl" />
            </Field>
            <Field label="Achievements">
              <Textarea value={resume.extras.achievements} onChange={e => ctx.updateExtras('achievements', e.target.value)} placeholder="Winner, Smart India Hackathon 2023" rows={2} className="rounded-xl" />
            </Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
