/**
 * Compact — High-density tech-forward layout.
 * Slate + violet accent, tight spacing, maximum content per page.
 * Inspired by top tech company resume formats.
 */
import { ResumeData } from '@/types/resume';

const C = {
  accent: '#6d28d9',
  accentLight: '#ede9fe',
  accentMid: '#8b5cf6',
  dark: '#1e1b4b',
  text: '#334155',
  muted: '#94a3b8',
  border: '#e2e8f0',
  bg: '#faf5ff',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      marginTop: 14, marginBottom: 6,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%', background: C.accent,
        boxShadow: `0 0 0 2px ${C.accentLight}`,
      }} />
      <h2 style={{
        fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5,
        color: C.accent, margin: 0, fontFamily: '"Inter", "Segoe UI", sans-serif',
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '4px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 9.5, lineHeight: 1.55, marginBottom: 1, paddingLeft: 12,
          position: 'relative', color: C.text,
        }}>
          <span style={{ position: 'absolute', left: 0, color: C.accentMid, fontSize: 7, top: 3 }}>▸</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function CompactTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const allContact = [personal.email, personal.phone, personal.location, personal.linkedinUrl, personal.githubUrl, personal.portfolioUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif', fontSize: 9.5, lineHeight: 1.45, color: C.text }}>
      {/* Header */}
      <div style={{
        padding: '24px 28px 20px',
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.accent} 100%)`,
        color: C.white, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.3)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: 0.5 }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>
              {personal.jobTitle}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
            {allContact.map((c, i) => (
              <span key={i} style={{
                fontSize: 8, opacity: 0.75,
                padding: '1px 6px', borderRadius: 3,
                background: 'rgba(255,255,255,0.1)',
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '4px 28px 24px' }}>
        {summary && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p style={{ fontSize: 9.5, margin: 0, lineHeight: 1.6, color: C.text }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 10.5, color: C.dark }}>{exp.role}</strong>
                    {exp.company && <span style={{ color: C.muted, fontWeight: 400 }}> — {exp.company}</span>}
                  </div>
                  <span style={{
                    fontSize: 8, color: C.accent, flexShrink: 0, marginLeft: 8,
                    padding: '1px 8px', background: C.accentLight, borderRadius: 10, fontWeight: 600,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                {exp.location && <div style={{ fontSize: 8.5, color: C.muted, marginTop: 1 }}>{exp.location}</div>}
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 10, color: C.dark }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </strong>
                  <span style={{ fontSize: 8, color: C.muted, flexShrink: 0, marginLeft: 6 }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: 9.5, color: C.muted }}>
                  {edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}
                </div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <strong style={{ fontSize: 10, color: C.dark }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8, color: C.accentMid }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 8.5, color: C.accent, fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>
                )}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 8.5, padding: '2px 10px',
                  background: C.accentLight, borderRadius: 12,
                  color: C.accent, fontWeight: 600,
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
              <div key={i} style={{ fontSize: 9.5, marginBottom: 2 }}>{c}</div>
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
              <div key={i} style={{ fontSize: 9.5, marginBottom: 2 }}>{a}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
