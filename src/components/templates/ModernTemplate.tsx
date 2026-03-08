/**
 * Modern — Bold contemporary design.
 * Deep charcoal with vibrant coral accents, rounded elements,
 * timeline-style experience, card-based projects. Inspired by Notion/Linear.
 */
import { ResumeData } from '@/types/resume';

const C = {
  coral: '#dc4a2d',
  coralLight: '#fef2ef',
  coralDark: '#b83a22',
  charcoal: '#18181b',
  text: '#27272a',
  muted: '#71717a',
  light: '#fafafa',
  border: '#e4e4e7',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 22, height: 3, background: C.coral, borderRadius: 2 }} />
      <h2 style={{
        fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5,
        color: C.charcoal, margin: 0, fontFamily: '"Inter", system-ui, sans-serif',
      }}>
        {children}
      </h2>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10, lineHeight: 1.65, marginBottom: 2, paddingLeft: 14,
          position: 'relative', color: C.text,
        }}>
          <span style={{
            position: 'absolute', left: 0, top: 5, width: 5, height: 5,
            border: `1.5px solid ${C.coral}`, borderRadius: '50%',
          }} />
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;

  return (
    <div style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif', fontSize: 10, lineHeight: 1.5, color: C.text }}>
      {/* Header */}
      <div style={{
        padding: '38px 42px 30px', position: 'relative', overflow: 'hidden', background: C.charcoal,
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50,
          width: 180, height: 180, borderRadius: '50%', background: C.coral, opacity: 0.08,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
          {p.profileImage && (
            <img src={p.profileImage} alt="" style={{
              width: 78, height: 78, borderRadius: 14, objectFit: 'cover',
              border: `3px solid ${C.coral}`, boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: C.white, letterSpacing: -0.5, lineHeight: 1.1 }}>
              {p.fullName || 'Your Name'}
            </h1>
            {p.jobTitle && (
              <div style={{ fontSize: 11.5, color: C.coral, marginTop: 5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
              {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
                <span key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.65)', padding: '2px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: 4 }}>{c}</span>
              ))}
            </div>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
                  <span key={i} style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{l}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.coral}, ${C.coralDark}, transparent)` }} />

      {/* Body */}
      <div style={{ padding: '8px 42px 38px' }}>
        {summary && (
          <>
            <SectionTitle>About Me</SectionTitle>
            <div style={{
              fontSize: 10, lineHeight: 1.75, color: C.muted,
              padding: '10px 14px', background: C.coralLight,
              borderRadius: 8, borderLeft: `3px solid ${C.coral}`,
            }}>
              {summary}
            </div>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{
                marginBottom: 16, paddingLeft: 18,
                borderLeft: `2px solid ${idx === 0 ? C.coral : C.border}`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', left: -5.5, top: 2,
                  width: 9, height: 9, borderRadius: '50%',
                  background: idx === 0 ? C.coral : C.border,
                  border: `2px solid ${C.white}`,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 11.5, color: C.charcoal }}>{exp.role}</strong>
                  <span style={{
                    fontSize: 8, color: C.white, background: C.coral,
                    padding: '2px 10px', borderRadius: 10, fontWeight: 700, flexShrink: 0, marginLeft: 8,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.coral, marginTop: 2, fontWeight: 600 }}>
                  {[exp.company, exp.location].filter(Boolean).join('  ·  ')}
                </div>
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11, color: C.charcoal }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: 8.5, color: C.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{
                marginBottom: 12, padding: '10px 14px',
                background: C.light, borderRadius: 8, border: `1px solid ${C.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 11, color: C.charcoal }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8.5, color: C.coral }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: 8.5, color: C.muted, fontWeight: 600, marginTop: 2 }}>{proj.techStack}</div>}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: 8.5, padding: '3px 12px', borderRadius: 14, background: C.charcoal, color: C.white, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}>{c}</div>)}</>}
        {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}>{a}</div>)}</>}
      </div>
    </div>
  );
}
