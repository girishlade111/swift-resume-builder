/**
 * Compact — High-density professional layout.
 * Deep indigo gradient header, violet accents, maximum content per page.
 * Optimized for tech roles with dense bullet points.
 */
import { ResumeData } from '@/types/resume';

const C = {
  accent: '#5b21b6',
  accentLight: '#ede9fe',
  accentMid: '#7c3aed',
  dark: '#1e1b4b',
  text: '#27272a',
  muted: '#71717a',
  border: '#e4e4e7',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 7 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, boxShadow: `0 0 0 2px ${C.accentLight}` }} />
      <h2 style={{
        fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3,
        color: C.accent, margin: 0, fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 0.75, background: C.border }} />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 9.5, lineHeight: 1.6, marginBottom: 1.5, paddingLeft: 12,
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
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const allContact = [p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif', fontSize: 9.5, lineHeight: 1.5, color: C.text }}>
      {/* Header */}
      <div style={{
        padding: '26px 32px 22px',
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.accent} 100%)`,
        color: C.white, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{
            width: 54, height: 54, borderRadius: '50%', objectFit: 'cover',
            border: '2.5px solid rgba(255,255,255,0.25)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: 0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && (
            <div style={{ fontSize: 10, opacity: 0.85, marginTop: 3, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {allContact.map((c, i) => (
              <span key={i} style={{ fontSize: 7.5, opacity: 0.7, padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '6px 32px 28px' }}>
        {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 9.5, margin: 0, lineHeight: 1.65, color: C.muted }}>{summary}</p></>}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 10.5, color: C.dark }}>{exp.role}</strong>
                    {exp.company && <span style={{ color: C.muted, fontWeight: 400 }}> — {exp.company}</span>}
                  </div>
                  <span style={{
                    fontSize: 7.5, color: C.accent, flexShrink: 0, marginLeft: 8,
                    padding: '2px 8px', background: C.accentLight, borderRadius: 10, fontWeight: 600,
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
              <div key={edu.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 10, color: C.dark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: 8, color: C.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: 9.5, color: C.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <strong style={{ fontSize: 10, color: C.dark }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8, color: C.accentMid }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: 8.5, color: C.accent, fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>}
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
                <span key={i} style={{ fontSize: 8, padding: '2.5px 10px', background: C.accentLight, borderRadius: 12, color: C.accent, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 9.5, marginBottom: 2 }}>{c}</div>)}</>}
        {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 9.5, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 9.5, marginBottom: 2 }}>{a}</div>)}</>}
      </div>
    </div>
  );
}
