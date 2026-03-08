/**
 * ResumeForm — full accordion-based form editor for all resume sections.
 */
import { useState, useRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Trash2, RotateCcw, FileText, Upload, X } from 'lucide-react';
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

export default function ResumeForm() {
  const ctx = useResume();
  const { resume, persistEnabled, togglePersist, resetToExample, resetToEmpty } = ctx;
  const [skillInput, setSkillInput] = useState('');

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

  return (
    <div className="space-y-4">
      {/* Top controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Switch checked={persistEnabled} onCheckedChange={togglePersist} id="persist" />
          <Label htmlFor="persist" className="text-xs text-muted-foreground cursor-pointer">
            Remember on this device
          </Label>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetToExample}>
            <FileText className="h-3.5 w-3.5 mr-1" /> Example
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
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
        defaultValue={['personal', 'summary', 'experience', 'education', 'projects', 'skills']}
        className="space-y-2"
      >
        {/* ── Personal Info ── */}
        <AccordionItem value="personal" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Personal Info</AccordionTrigger>
          <AccordionContent className="grid gap-3 pb-4 sm:grid-cols-2">
            <Field label="Full Name *">
              <Input value={resume.personal.fullName} onChange={e => ctx.updatePersonal('fullName', e.target.value)} placeholder="John Doe" />
            </Field>
            <Field label="Desired Job Title">
              <Input value={resume.personal.jobTitle} onChange={e => ctx.updatePersonal('jobTitle', e.target.value)} placeholder="Frontend Developer" />
            </Field>
            <Field label="Email *">
              <Input type="email" value={resume.personal.email} onChange={e => ctx.updatePersonal('email', e.target.value)} placeholder="john@email.com" />
            </Field>
            <Field label="Phone">
              <Input value={resume.personal.phone} onChange={e => ctx.updatePersonal('phone', e.target.value)} placeholder="+91 98765 43210" />
            </Field>
            <Field label="Location">
              <Input value={resume.personal.location} onChange={e => ctx.updatePersonal('location', e.target.value)} placeholder="Bangalore, India" />
            </Field>
            <Field label="Portfolio / Website">
              <Input value={resume.personal.portfolioUrl} onChange={e => ctx.updatePersonal('portfolioUrl', e.target.value)} placeholder="https://yoursite.com" />
            </Field>
            <Field label="LinkedIn">
              <Input value={resume.personal.linkedinUrl} onChange={e => ctx.updatePersonal('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
            </Field>
            <Field label="GitHub">
              <Input value={resume.personal.githubUrl} onChange={e => ctx.updatePersonal('githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </Field>
          </AccordionContent>
        </AccordionItem>

        {/* ── Summary ── */}
        <AccordionItem value="summary" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Summary</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-2">
            <Textarea
              value={resume.summary}
              onChange={e => ctx.updateSummary(e.target.value)}
              placeholder="Write a brief 2-3 sentence professional summary..."
              rows={3}
            />
            <p className={`text-xs ${resume.summary.length > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {resume.summary.length} characters (recommended: 150–300)
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ── Experience ── */}
        <AccordionItem value="experience" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Experience</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-4">
            <AtsTips
              tips={[
                'Start bullets with action verbs (built, led, improved).',
                'Include keywords from the job description.',
                'Quantify impact where possible (e.g. "reduced load time by 30%").',
              ]}
            />
            {resume.experience.map((exp) => (
              <div key={exp.id} className="space-y-3 rounded-lg border p-3 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-destructive"
                  onClick={() => ctx.removeExperience(exp.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="Role">
                    <Input value={exp.role} onChange={e => ctx.updateExperience(exp.id, 'role', e.target.value)} placeholder="Software Engineer" />
                  </Field>
                  <Field label="Company">
                    <Input value={exp.company} onChange={e => ctx.updateExperience(exp.id, 'company', e.target.value)} placeholder="Acme Inc." />
                  </Field>
                  <Field label="Location">
                    <Input value={exp.location} onChange={e => ctx.updateExperience(exp.id, 'location', e.target.value)} placeholder="City, Country" />
                  </Field>
                  <Field label="Start Date">
                    <Input value={exp.startDate} onChange={e => ctx.updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jun 2024" />
                  </Field>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">End Date</Label>
                    <Input
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      disabled={exp.isCurrent}
                      onChange={e => ctx.updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Dec 2024"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox
                        checked={exp.isCurrent}
                        onCheckedChange={v => ctx.updateExperience(exp.id, 'isCurrent', !!v)}
                        id={`current-${exp.id}`}
                      />
                      <Label htmlFor={`current-${exp.id}`} className="text-xs cursor-pointer">
                        Currently working here
                      </Label>
                    </div>
                  </div>
                </div>
                <Field label="Bullet Points (one per line)">
                  <Textarea
                    value={exp.bulletPoints.join('\n')}
                    onChange={e => ctx.updateExperience(exp.id, 'bulletPoints', e.target.value.split('\n'))}
                    placeholder={"Built responsive UI components...\nImproved performance by 30%..."}
                    rows={3}
                  />
                </Field>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addExperience} className="w-full">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Education ── */}
        <AccordionItem value="education" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Education</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="space-y-3 rounded-lg border p-3 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-destructive"
                  onClick={() => ctx.removeEducation(edu.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="School / University">
                    <Input value={edu.schoolName} onChange={e => ctx.updateEducation(edu.id, 'schoolName', e.target.value)} placeholder="MIT" />
                  </Field>
                  <Field label="Degree">
                    <Input value={edu.degree} onChange={e => ctx.updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.Tech" />
                  </Field>
                  <Field label="Field of Study">
                    <Input value={edu.fieldOfStudy} onChange={e => ctx.updateEducation(edu.id, 'fieldOfStudy', e.target.value)} placeholder="Computer Science" />
                  </Field>
                  <Field label="Grade (optional)">
                    <Input value={edu.grade} onChange={e => ctx.updateEducation(edu.id, 'grade', e.target.value)} placeholder="8.5 CGPA" />
                  </Field>
                  <Field label="Start Year">
                    <Input value={edu.startYear} onChange={e => ctx.updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2020" />
                  </Field>
                  <Field label="End Year">
                    <Input value={edu.endYear} onChange={e => ctx.updateEducation(edu.id, 'endYear', e.target.value)} placeholder="2024" />
                  </Field>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addEducation} className="w-full">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Projects ── */}
        <AccordionItem value="projects" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Projects</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="space-y-3 rounded-lg border p-3 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-destructive"
                  onClick={() => ctx.removeProject(proj.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <Field label="Project Name">
                    <Input value={proj.name} onChange={e => ctx.updateProject(proj.id, 'name', e.target.value)} placeholder="TaskFlow App" />
                  </Field>
                  <Field label="Link (optional)">
                    <Input value={proj.link} onChange={e => ctx.updateProject(proj.id, 'link', e.target.value)} placeholder="https://github.com/..." />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Tech Stack">
                      <Input value={proj.techStack} onChange={e => ctx.updateProject(proj.id, 'techStack', e.target.value)} placeholder="React, TypeScript, Firebase" />
                    </Field>
                  </div>
                </div>
                <Field label="Bullet Points (one per line)">
                  <Textarea
                    value={proj.bulletPoints.join('\n')}
                    onChange={e => ctx.updateProject(proj.id, 'bulletPoints', e.target.value.split('\n'))}
                    placeholder={"Built a full-stack web app...\nImplemented CI/CD pipeline..."}
                    rows={3}
                  />
                </Field>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={ctx.addProject} className="w-full">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Skills ── */}
        <AccordionItem value="skills" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Skills</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <AtsTips
              tips={[
                'Group similar skills and avoid keyword stuffing.',
                'Use tools, frameworks, and domains that match your target role.',
                'Keep it concise — 8-15 skills is ideal.',
              ]}
            />
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-destructive" aria-label={`Remove ${skill}`}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <Input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter (e.g. React, TypeScript, Node.js)"
            />
          </AccordionContent>
        </AccordionItem>

        {/* ── Extras ── */}
        <AccordionItem value="extras" className="rounded-lg border bg-card px-4">
          <AccordionTrigger className="text-sm font-semibold">Extras (optional)</AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <Field label="Certifications">
              <Textarea
                value={resume.extras.certifications}
                onChange={e => ctx.updateExtras('certifications', e.target.value)}
                placeholder={"AWS Cloud Practitioner (2024)\nGoogle UX Design Certificate"}
                rows={2}
              />
            </Field>
            <Field label="Languages">
              <Textarea
                value={resume.extras.languages}
                onChange={e => ctx.updateExtras('languages', e.target.value)}
                placeholder="English (Fluent), Hindi (Native)"
                rows={2}
              />
            </Field>
            <Field label="Achievements">
              <Textarea
                value={resume.extras.achievements}
                onChange={e => ctx.updateExtras('achievements', e.target.value)}
                placeholder="Winner, Smart India Hackathon 2023"
                rows={2}
              />
            </Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
