/**
 * ResumePreviewPlaceholder — reads from ResumeContext and shows all data sections.
 */
import { useResume } from '@/context/ResumeContext';

export default function ResumePreviewPlaceholder() {
  const { resume } = useResume();
  const { personal, summary, experience, education, projects, skills, extras } = resume;

  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Resume Preview</h2>

      <div className="rounded-lg border bg-white p-8 shadow-inner" style={{ minHeight: 400 }}>
        {/* Header */}
        <h3 className="text-xl font-bold">{personal.fullName || 'Your Name'}</h3>
        {personal.jobTitle && <p className="text-sm text-primary font-medium mt-1">{personal.jobTitle}</p>}
        {contactParts.length > 0 && <p className="text-xs text-muted-foreground mt-1">{contactParts.join(' • ')}</p>}
        {linkParts.length > 0 && <p className="text-xs text-muted-foreground mt-0.5">{linkParts.join(' • ')}</p>}

        <hr className="my-4 border-border" />

        {/* Summary */}
        {summary && (
          <div className="mb-4">
            <p className="font-semibold text-sm mb-1">SUMMARY</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-4">
          <p className="font-semibold text-sm mb-1">EXPERIENCE</p>
          {experience.length > 0 ? experience.map(exp => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{exp.role}{exp.company ? ` — ${exp.company}` : ''}</span>
                <span className="text-muted-foreground">{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</span>
              </div>
              {exp.location && <p className="text-xs text-muted-foreground">{exp.location}</p>}
              {exp.bulletPoints.filter(b => b.trim()).length > 0 && (
                <ul className="ml-4 list-disc text-xs text-muted-foreground mt-1">
                  {exp.bulletPoints.filter(b => b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          )) : <p className="text-xs text-muted-foreground italic">No experience added yet.</p>}
        </div>

        {/* Education */}
        <div className="mb-4">
          <p className="font-semibold text-sm mb-1">EDUCATION</p>
          {education.length > 0 ? education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                <span className="text-muted-foreground">{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
              </div>
              <p className="text-xs text-muted-foreground">{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</p>
            </div>
          )) : <p className="text-xs text-muted-foreground italic">No education added yet.</p>}
        </div>

        {/* Projects */}
        <div className="mb-4">
          <p className="font-semibold text-sm mb-1">PROJECTS</p>
          {projects.length > 0 ? projects.map(proj => (
            <div key={proj.id} className="mb-2">
              <span className="text-xs font-medium">{proj.name}</span>
              {proj.techStack && <span className="text-xs text-muted-foreground ml-1">({proj.techStack})</span>}
              {proj.bulletPoints.filter(b => b.trim()).length > 0 && (
                <ul className="ml-4 list-disc text-xs text-muted-foreground mt-1">
                  {proj.bulletPoints.filter(b => b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          )) : <p className="text-xs text-muted-foreground italic">No projects added yet.</p>}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="font-semibold text-sm mb-1">SKILLS</p>
          {skills.length > 0
            ? <p className="text-xs text-muted-foreground">{skills.join(', ')}</p>
            : <p className="text-xs text-muted-foreground italic">No skills added yet.</p>}
        </div>

        {/* Extras */}
        {(extras.certifications || extras.languages || extras.achievements) && (
          <>
            {extras.certifications && (
              <div className="mb-3">
                <p className="font-semibold text-sm mb-1">CERTIFICATIONS</p>
                {extras.certifications.split('\n').filter(Boolean).map((c, i) => <p key={i} className="text-xs text-muted-foreground">{c}</p>)}
              </div>
            )}
            {extras.languages && (
              <div className="mb-3">
                <p className="font-semibold text-sm mb-1">LANGUAGES</p>
                <p className="text-xs text-muted-foreground">{extras.languages}</p>
              </div>
            )}
            {extras.achievements && (
              <div className="mb-3">
                <p className="font-semibold text-sm mb-1">ACHIEVEMENTS</p>
                {extras.achievements.split('\n').filter(Boolean).map((a, i) => <p key={i} className="text-xs text-muted-foreground">{a}</p>)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
