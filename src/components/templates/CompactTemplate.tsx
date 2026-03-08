/**
 * Compact template — high-density professional layout with accent top bar,
 * two-column skills, and refined micro-typography.
 */
import { ResumeData } from '@/types/resume';

const ACCENT = '#0f766e';
const LIGHT = '#f0fdfa';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 9.5,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 2,
      color: ACCENT,
      marginBottom: 5,
      marginTop: 12,
      paddingBottom: 3,
      borderBottom: `1.5px solid ${ACCENT}`,
      fontFamily: '"Segoe UI", Roboto, sans-serif',
    }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '3px 0 0 12px', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{ fontSize: 9.5, lineHeight: 1.5, marginBottom: 1, paddingLeft: 8, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color: ACCENT, fontSize: 8 }}>▸</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function CompactTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif', fontSize: 9.5, lineHeight: 1.4, color: '#1f2937' }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: `linear-gradient(to right, ${ACCENT}, #14b8a6)` }} />

      {/* Header */}
      <div style={{ padding: '16px 24px 12px', background: LIGHT, display: 'flex', alignItems: 'center', gap: 14 }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
            border: `2px solid ${ACCENT}`,
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#111827', letterSpacing: 0.5 }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <div style={{ fontSize: 10, color: ACCENT, marginTop: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              {personal.jobTitle}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            {contactParts.map((c, i) => (
              <span key={i} style={{ fontSize: 8.5, color: '#6b7280' }}>{c}</span>
            ))}
            {linkParts.map((l, i) => (
              <span key={`l${i}`} style={{ fontSize: 8.5, color: '#6b7280' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 24px 20px' }}>
        {summary && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p style={{ fontSize: 9.5, margin: 0, lineHeight: 1.55, color: '#374151' }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 10, color: '#111827' }}>
                    {exp.role}
                    {exp.company && <span style={{ fontWeight: 400, color: '#6b7280' }}> at {exp.company}</span>}
                  </strong>
                  <span style={{ fontSize: 8.5, color: '#9ca3af', flexShrink: 0, marginLeft: 6 }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                {exp.location && <div style={{ fontSize: 8.5, color: '#9ca3af' }}>{exp.location}</div>}
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 10, color: '#111827' }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </strong>
                  <span style={{ fontSize: 8.5, color: '#9ca3af', flexShrink: 0, marginLeft: 6 }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: 9.5 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 7 }}>
                <strong style={{ fontSize: 10, color: '#111827' }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 8.5, color: '#9ca3af' }}> — {proj.link}</span>}
                {proj.techStack && (
                  <div style={{ fontSize: 8.5, color: ACCENT, fontWeight: 500 }}>{proj.techStack}</div>
                )}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 8.5, padding: '2px 8px', background: LIGHT,
                  borderRadius: 3, color: ACCENT, fontWeight: 600, border: `1px solid ${ACCENT}20`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && (
          <>
            <SectionTitle>Certifications</SectionTitle>
            {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
              <div key={i} style={{ fontSize: 9.5, marginBottom: 1 }}>{c}</div>
            ))}
          </>
        )}
        {extras.languages && (
          <>
            <SectionTitle>Languages</SectionTitle>
            <p style={{ fontSize: 9.5, margin: 0 }}>{extras.languages}</p>
          </>
        )}
        {extras.achievements && (
          <>
            <SectionTitle>Achievements</SectionTitle>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 9.5, marginBottom: 1 }}>{a}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
