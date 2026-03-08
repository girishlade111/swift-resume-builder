/**
 * ResumePreviewPlaceholder — placeholder card showing live data from form (right column).
 */
interface Props {
  fullName: string;
  jobTitle: string;
  email: string;
}

export default function ResumePreviewPlaceholder({ fullName, jobTitle, email }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Resume Preview</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Live preview with templates coming soon. Data flow demo:
      </p>
      {/* Fake resume card */}
      <div className="rounded-lg border bg-white p-8 shadow-inner" style={{ minHeight: 320 }}>
        <h3 className="text-xl font-bold">{fullName || 'Your Name'}</h3>
        {jobTitle && <p className="text-sm text-primary font-medium mt-1">{jobTitle}</p>}
        {email && <p className="text-xs text-muted-foreground mt-1">{email}</p>}

        <hr className="my-4 border-border" />

        <div className="space-y-3 text-xs text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">EXPERIENCE</p>
            <p className="italic">Placeholder — experience entries will appear here.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">EDUCATION</p>
            <p className="italic">Placeholder — education entries will appear here.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">SKILLS</p>
            <p className="italic">Placeholder — skills will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
