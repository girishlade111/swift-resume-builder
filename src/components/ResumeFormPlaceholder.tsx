/**
 * ResumeFormPlaceholder — placeholder card for the form editor (left column).
 */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  fullName: string;
  jobTitle: string;
  email: string;
  onChange: (field: string, value: string) => void;
}

export default function ResumeFormPlaceholder({ fullName, jobTitle, email, onChange }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Resume Form</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Full form coming soon. For now, edit these fields to confirm data flow:
      </p>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Full Name</Label>
          <Input value={fullName} onChange={e => onChange('fullName', e.target.value)} placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Job Title</Label>
          <Input value={jobTitle} onChange={e => onChange('jobTitle', e.target.value)} placeholder="Frontend Developer" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Email</Label>
          <Input type="email" value={email} onChange={e => onChange('email', e.target.value)} placeholder="john@email.com" />
        </div>
      </div>
    </div>
  );
}
