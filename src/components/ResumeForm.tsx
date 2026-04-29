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
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, RotateCcw, FileText, Upload, X, Download, UploadCloud, Eye, EyeOff, Palette, Shield, Settings2, MoreHorizontal } from 'lucide-react';
import AtsTips from '@/components/AtsTips';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</Label>
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
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${color}`}>
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
      className="ml-auto mr-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
      title={settings.visibleSections[section] !== false ? 'Hide section from preview' : 'Show section in preview'}
    >
      {settings.visibleSections[section] !== false
        ? <Eye className="h-4 w-4 text-muted-foreground" />
        : <EyeOff className="h-4 w-4 text-muted-foreground/50" />}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/50">
        <AtsScoreBadge score={atsScore} />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuLabel>Data Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={resetToExample} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" /> Load Example
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToJson} className="cursor-pointer">
                <Download className="h-4 w-4 mr-2" /> Export JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => jsonInputRef.current?.click()} className="cursor-pointer">
                <UploadCloud className="h-4 w-4 mr-2" /> Import JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <div className="flex items-center gap-2 px-2 py-1.5 w-full">
                  <Switch checked={persistEnabled} onCheckedChange={togglePersist} id="persist-dd" className="scale-75" />
                  <Label htmlFor="persist-dd" className="text-xs cursor-pointer">Auto-save</Label>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive cursor-pointer">
                    <RotateCcw className="h-4 w-4 mr-2" /> Clear All Data
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all resume content. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetToEmpty} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">Clear</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
          <input ref={jsonInputRef} type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
        </div>
      </div>

      <Accordion
        type="multiple"
        defaultValue={['customize', 'personal']}
        className="space-y-4"
      >
        {/* ── Customization Engine ── */}
        <AccordionItem value="customize" className="rounded-2xl border bg-card overflow-hidden transition-all">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            <span className="flex items-center gap-2.5"><Settings2 className="h-4 w-4 text-primary" />Advanced Customization</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-semibold flex items-center gap-2">
                <Palette className="h-3.5 w-3.5" /> Accent Color
              </Label>
              <div className="flex gap-2.5 flex-wrap">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => updateSettings({ accentColor: c.value })}
                    className="group relative w-7 h-7 rounded-full border border-border/50 transition-all hover:scale-110 active:scale-95"
                    style={{ background: c.value }}
                    title={c.name}
                  >
                    {settings.accentColor === c.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      </div>
                    )}
                    <div className={`absolute -inset-1 rounded-full border-2 transition-opacity ${settings.accentColor === c.value ? 'opacity-100' : 'opacity-0'}`} style={{ borderColor: c.value + '40' }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-xs font-semibold">Font Family</Label>
                <Select value={settings.fontFamily} onValueChange={(v) => updateSettings({ fontFamily: v })}>
                  <SelectTrigger className="w-full rounded-xl bg-muted/30 border-none h-10 px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {FONT_FAMILIES.map(f => (
                      <SelectItem key={f.name} value={f.name} className="rounded-lg">
                        <span style={{ fontFamily: f.value }}>{f.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Font Size</span>
                  <span className="text-primary font-bold">{settings.fontSize}pt</span>
                </Label>
                <Slider
                  value={[settings.fontSize]}
                  min={8}
                  max={14}
                  step={0.5}
                  onValueChange={([v]) => updateSettings({ fontSize: v })}
                  className="py-2"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Line Height</span>
                  <span className="text-primary font-bold">{settings.lineHeight}</span>
                </Label>
                <Slider
                  value={[settings.lineHeight]}
                  min={1}
                  max={2}
                  step={0.1}
                  onValueChange={([v]) => updateSettings({ lineHeight: v })}
                  className="py-2"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Section Spacing</span>
                  <span className="text-primary font-bold">{settings.sectionSpacing}px</span>
                </Label>
                <Slider
                  value={[settings.sectionSpacing]}
                  min={10}
                  max={40}
                  step={2}
                  onValueChange={([v]) => updateSettings({ sectionSpacing: v })}
                  className="py-2"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Personal Info ── */}
        <AccordionItem value="personal" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">Personal Details</AccordionTrigger>
          <AccordionContent className="grid gap-4 px-5 pb-6 pt-2 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Profile Picture</Label>
              <div className="flex items-center gap-5 p-4 rounded-xl bg-muted/30">
                {resume.personal.profileImage ? (
                  <div className="relative group">
                    <img src={resume.personal.profileImage} alt="Profile" className="h-20 w-20 rounded-2xl object-cover border-2 border-background shadow-sm ring-1 ring-border" />
                    <button onClick={removeImage} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110" aria-label="Remove profile picture">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-2xl bg-background flex items-center justify-center border-2 border-dashed border-border group-hover:border-primary/50 transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <Button variant="secondary" size="sm" type="button" onClick={() => fileInputRef.current?.click()} className="rounded-lg h-9 font-semibold">
                    {resume.personal.profileImage ? 'Change Image' : 'Upload Photo'}
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">JPG or PNG. High resolution recommended for better print quality.</p>
                </div>
              </div>
            </div>
            <Field label="Full Name">
              <Input value={resume.personal.fullName} onChange={e => ctx.updatePersonal('fullName', e.target.value)} placeholder="John Doe" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="Job Title">
              <Input value={resume.personal.jobTitle} onChange={e => ctx.updatePersonal('jobTitle', e.target.value)} placeholder="Senior Software Engineer" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="Email Address">
              <Input type="email" value={resume.personal.email} onChange={e => ctx.updatePersonal('email', e.target.value)} placeholder="john@example.com" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="Phone Number">
              <Input value={resume.personal.phone} onChange={e => ctx.updatePersonal('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="Location">
              <Input value={resume.personal.location} onChange={e => ctx.updatePersonal('location', e.target.value)} placeholder="New York, USA" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="Portfolio URL">
              <Input value={resume.personal.portfolioUrl} onChange={e => ctx.updatePersonal('portfolioUrl', e.target.value)} placeholder="https://johndoe.com" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="LinkedIn Profile">
              <Input value={resume.personal.linkedinUrl} onChange={e => ctx.updatePersonal('linkedinUrl', e.target.value)} placeholder="linkedin.com/in/johndoe" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
            <Field label="GitHub Profile">
              <Input value={resume.personal.githubUrl} onChange={e => ctx.updatePersonal('githubUrl', e.target.value)} placeholder="github.com/johndoe" className="rounded-lg bg-muted/30 border-none h-10" />
            </Field>
          </AccordionContent>
        </AccordionItem>

        {/* ── Summary ── */}
        <AccordionItem value="summary" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Professional Summary
            <SectionToggle section="summary" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-3">
            <Textarea 
              value={resume.summary} 
              onChange={e => ctx.updateSummary(e.target.value)} 
              placeholder="Highly motivated engineer with 5+ years of experience in building scalable web applications..." 
              rows={4} 
              className="rounded-xl bg-muted/30 border-none resize-none p-4" 
            />
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
              <span className={resume.summary.length > 400 ? 'text-destructive' : 'text-muted-foreground'}>
                {resume.summary.length} Characters
              </span>
              <span className="text-muted-foreground">Recommended: 150-300</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Experience ── */}
        <AccordionItem value="experience" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Work Experience
            <SectionToggle section="experience" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-5">
            <AtsTips tips={[
              'Focus on measurable achievements and outcomes.',
              'Use strong action verbs to start each bullet point.',
              'Tailor keywords to the job description.',
            ]} />
            
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="group relative space-y-4 rounded-xl border border-border/50 p-4 bg-muted/10 transition-colors hover:bg-muted/20">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => ctx.removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid gap-4 sm:grid-cols-2 pr-8">
                    <Field label="Role / Title">
                      <Input value={exp.role} onChange={e => ctx.updateExperience(exp.id, 'role', e.target.value)} placeholder="Full Stack Developer" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Company Name">
                      <Input value={exp.company} onChange={e => ctx.updateExperience(exp.id, 'company', e.target.value)} placeholder="Google" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Location">
                      <Input value={exp.location} onChange={e => ctx.updateExperience(exp.id, 'location', e.target.value)} placeholder="Remote" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start Date">
                        <Input value={exp.startDate} onChange={e => ctx.updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                      </Field>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">End Date</Label>
                        <Input value={exp.isCurrent ? 'Present' : exp.endDate} disabled={exp.isCurrent} onChange={e => ctx.updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <Checkbox checked={exp.isCurrent} onCheckedChange={v => ctx.updateExperience(exp.id, 'isCurrent', !!v)} id={`curr-${exp.id}`} />
                      <Label htmlFor={`curr-${exp.id}`} className="text-xs font-medium cursor-pointer">I currently work in this role</Label>
                    </div>
                  </div>
                  
                  <Field label="Key Accomplishments (One per line)">
                    <Textarea 
                      value={exp.bulletPoints.join('\n')} 
                      onChange={e => ctx.updateExperience(exp.id, 'bulletPoints', e.target.value.split('\n'))} 
                      placeholder={"• Developed and launched 3 new features...\n• Optimized database queries resulting in 20% faster load times..."} 
                      rows={4} 
                      className="rounded-lg bg-background border-none resize-none shadow-sm p-3" 
                    />
                  </Field>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={ctx.addExperience} className="w-full rounded-xl border-dashed h-10 border-2 hover:border-primary hover:bg-primary/5 transition-all font-bold">
              <Plus className="h-4 w-4 mr-2" /> Add Work Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Education ── */}
        <AccordionItem value="education" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Education
            <SectionToggle section="education" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-5">
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="group relative space-y-4 rounded-xl border border-border/50 p-4 bg-muted/10 transition-colors hover:bg-muted/20">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => ctx.removeEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid gap-4 sm:grid-cols-2 pr-8">
                    <Field label="Institution">
                      <Input value={edu.schoolName} onChange={e => ctx.updateEducation(edu.id, 'schoolName', e.target.value)} placeholder="Stanford University" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Degree / Qualification">
                      <Input value={edu.degree} onChange={e => ctx.updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Field of Study">
                      <Input value={edu.fieldOfStudy} onChange={e => ctx.updateEducation(edu.id, 'fieldOfStudy', e.target.value)} placeholder="Computer Science" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Grade / GPA">
                      <Input value={edu.grade} onChange={e => ctx.updateEducation(edu.id, 'grade', e.target.value)} placeholder="3.8 / 4.0" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start Year">
                        <Input value={edu.startYear} onChange={e => ctx.updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2018" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                      </Field>
                      <Field label="End Year">
                        <Input value={edu.endYear} onChange={e => ctx.updateEducation(edu.id, 'endYear', e.target.value)} placeholder="2022" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={ctx.addEducation} className="w-full rounded-xl border-dashed h-10 border-2 hover:border-primary hover:bg-primary/5 transition-all font-bold">
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Projects ── */}
        <AccordionItem value="projects" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Key Projects
            <SectionToggle section="projects" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-5">
            <div className="space-y-4">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="group relative space-y-4 rounded-xl border border-border/50 p-4 bg-muted/10 transition-colors hover:bg-muted/20">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => ctx.removeProject(proj.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid gap-4 sm:grid-cols-2 pr-8">
                    <Field label="Project Name">
                      <Input value={proj.name} onChange={e => ctx.updateProject(proj.id, 'name', e.target.value)} placeholder="E-commerce Platform" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <Field label="Project Link">
                      <Input value={proj.link} onChange={e => ctx.updateProject(proj.id, 'link', e.target.value)} placeholder="https://github.com/..." className="rounded-lg bg-background border-none h-9 shadow-sm" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Tech Stack used">
                        <Input value={proj.techStack} onChange={e => ctx.updateProject(proj.id, 'techStack', e.target.value)} placeholder="Next.js, Tailwind CSS, PostgreSQL" className="rounded-lg bg-background border-none h-9 shadow-sm" />
                      </Field>
                    </div>
                  </div>
                  <Field label="Project Description">
                    <Textarea 
                      value={proj.bulletPoints.join('\n')} 
                      onChange={e => ctx.updateProject(proj.id, 'bulletPoints', e.target.value.split('\n'))} 
                      placeholder={"• Built a secure payment gateway integration...\n• Implemented real-time inventory management..."} 
                      rows={3} 
                      className="rounded-lg bg-background border-none resize-none shadow-sm p-3" 
                    />
                  </Field>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={ctx.addProject} className="w-full rounded-xl border-dashed h-10 border-2 hover:border-primary hover:bg-primary/5 transition-all font-bold">
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* ── Skills ── */}
        <AccordionItem value="skills" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Skills & Expertise
            <SectionToggle section="skills" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-4">
            <AtsTips tips={[
              'Group related skills (e.g., Languages, Frameworks, Tools).',
              'Avoid vague skills like "Good communication".',
              'Include industry-specific keywords.',
            ]} />
            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-muted/30 min-h-[44px]">
              {resume.skills.length === 0 && <span className="text-xs text-muted-foreground italic px-1">No skills added yet...</span>}
              {resume.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary ring-1 ring-primary/20">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-destructive transition-colors" aria-label={`Remove ${skill}`}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="relative">
              <Input 
                value={skillInput} 
                onChange={e => setSkillInput(e.target.value)} 
                onKeyDown={handleSkillKeyDown} 
                placeholder="Type a skill and press Enter (e.g. React, TypeScript...)" 
                className="rounded-xl bg-muted/30 border-none h-11 pr-10" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase opacity-50">
                Enter
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Extras ── */}
        <AccordionItem value="extras" className="rounded-2xl border bg-card overflow-hidden">
          <AccordionTrigger className="text-sm font-bold px-5 py-4 hover:no-underline hover:bg-muted/50">
            Certifications & More
            <SectionToggle section="extras" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6 pt-2 space-y-5">
            <Field label="Certifications">
              <Textarea value={resume.extras.certifications} onChange={e => ctx.updateExtras('certifications', e.target.value)} placeholder={"AWS Certified Solutions Architect (2024)\nGoogle UX Design Specialization (2023)"} rows={3} className="rounded-xl bg-muted/30 border-none resize-none p-3 shadow-sm" />
            </Field>
            <Field label="Languages">
              <Textarea value={resume.extras.languages} onChange={e => ctx.updateExtras('languages', e.target.value)} placeholder="English (Native), Spanish (Conversational)" rows={2} className="rounded-xl bg-muted/30 border-none resize-none p-3 shadow-sm" />
            </Field>
            <Field label="Key Achievements">
              <Textarea value={resume.extras.achievements} onChange={e => ctx.updateExtras('achievements', e.target.value)} placeholder="• Winner of 48-hour Global Hackathon 2023\n• Published research paper on AI ethics..." rows={3} className="rounded-xl bg-muted/30 border-none resize-none p-3 shadow-sm" />
            </Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
