/**
 * ResumeFormPlaceholder — reads/writes from ResumeContext, shows personal fields + controls.
 */
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FileText, RotateCcw } from 'lucide-react';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

export default function ResumeFormPlaceholder() {
  const { resume, updatePersonal, resetToExample, resetToEmpty, persistEnabled, togglePersist } = useResume();

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-semibold">Resume Form</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Switch checked={persistEnabled} onCheckedChange={togglePersist} id="persist" />
          <Label htmlFor="persist" className="text-xs text-muted-foreground cursor-pointer">Remember on this device</Label>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetToExample}>
            <FileText className="h-3.5 w-3.5 mr-1" /> Example
          </Button>
          <Button variant="outline" size="sm" onClick={resetToEmpty}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        </div>
      </div>

      {/* Personal info fields */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Full Name *">
          <Input value={resume.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} placeholder="John Doe" />
        </Field>
        <Field label="Job Title">
          <Input value={resume.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} placeholder="Frontend Developer" />
        </Field>
        <Field label="Email *">
          <Input type="email" value={resume.personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="john@email.com" />
        </Field>
        <Field label="Phone">
          <Input value={resume.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Location">
          <Input value={resume.personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="Bangalore, India" />
        </Field>
        <Field label="Portfolio / Website">
          <Input value={resume.personal.portfolioUrl} onChange={e => updatePersonal('portfolioUrl', e.target.value)} placeholder="https://yoursite.com" />
        </Field>
        <Field label="LinkedIn">
          <Input value={resume.personal.linkedinUrl} onChange={e => updatePersonal('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
        </Field>
        <Field label="GitHub">
          <Input value={resume.personal.githubUrl} onChange={e => updatePersonal('githubUrl', e.target.value)} placeholder="https://github.com/..." />
        </Field>
      </div>

      <p className="text-xs text-muted-foreground italic">
        Full form with Experience, Education, Projects, Skills, and more coming next.
      </p>
    </div>
  );
}
