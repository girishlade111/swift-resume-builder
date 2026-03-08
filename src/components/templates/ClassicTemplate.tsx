/**
 * Classic — Timeless executive elegance.
 * Deep navy header, champagne gold accents, sophisticated serif typography.
 * Inspired by McKinsey/Goldman Sachs executive resume formatting.
 */
import { ResumeData } from '@/types/resume';

const C = {
  navy: '#0f1b2d',
  navyMid: '#1a2d4a',
  gold: '#c5a55a',
  goldLight: '#e8dcc8',
  goldFaint: '#f5f0e6',
  text: '#2a2a2a',
  muted: '#5a6a7a',
  rule: '#d4cfc5',
  white: '#ffffff',
};

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 24, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2 style={{
          fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4.5,
          color: C.navy, margin: 0, fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
        }}>
          {children}
        </h2>
        <div style={{ flex: 1, height: 0.75, background: C.rule }} />
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 14,
          position: 'relative', color: C.text,
        }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: C.gold, fontSize: 8 }}>▪</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const contact = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean);

  return (
    <div style={{
      fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
      fontSize: 10, lineHeight: 1.55, color: C.text,
    }}>
      {/* Header */}
      <div style={{
        background: C.navy, padding: '38px 48px 30px', color: C.white,
        display: 'flex', alignItems: 'center', gap: 22,
      }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{
            width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
            border: `2.5px solid ${C.gold}`, boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: 5,
            textTransform: 'uppercase', lineHeight: 1.1,
          }}>
            {p.fullName || 'Your Name'}
          </h1>
          {p.jobTitle && (
            <div style={{
              fontSize: 10.5, color: C.gold, marginTop: 6,
              letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600,
              fontFamily: '"Segoe UI", Helvetica, sans-serif',
            }}>
              {p.jobTitle}
            </div>
          )}
          {contact.length > 0 && (
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.65)', marginTop: 10, letterSpacing: 0.5, fontFamily: '"Segoe UI", sans-serif' }}>
              {contact.join('   ·   ')}
            </div>
          )}
          {links.length > 0 && (
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', marginTop: 3, fontFamily: '"Segoe UI", sans-serif' }}>
              {links.join('   ·   ')}
            </div>
          )}
        </div>
      </div>

      {/* Gold accent line */}
      <div style={{ height: 2.5, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight} 60%, transparent)` }} />

      {/* Body */}
      <div style={{ padding: '8px 48px 40px' }}>
        {summary && (
          <>
            <SectionHeader>Professional Summary</SectionHeader>
            <p style={{
              fontSize: 10, lineHeight: 1.8, margin: 0, color: C.muted,
              fontStyle: 'italic', paddingLeft: 14, borderLeft: `2px solid ${C.gold}`,
            }}>
              {summary}
            </p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionHeader>Professional Experience</SectionHeader>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11.5, color: C.navy, fontFamily: 'Georgia, serif' }}>{exp.role}</strong>
                  <span style={{ fontSize: 8.5, color: C.muted, fontStyle: 'italic', fontFamily: '"Segoe UI", sans-serif', flexShrink: 0, marginLeft: 8 }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.gold, marginTop: 2, fontWeight: 600, fontFamily: '"Segoe UI", sans-serif' }}>
                  {[exp.company, exp.location].filter(Boolean).join('  ·  ')}
                </div>
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeader>Education</SectionHeader>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11, color: C.navy }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: 8.5, color: C.muted, fontStyle: 'italic', fontFamily: '"Segoe UI", sans-serif' }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionHeader>Key Projects</SectionHeader>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 11, color: C.navy }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8, color: C.muted }}>({proj.link})</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 9, color: C.gold, fontWeight: 600, marginTop: 2, fontFamily: '"Segoe UI", sans-serif' }}>{proj.techStack}</div>
                )}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionHeader>Skills & Expertise</SectionHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 8.5, padding: '3px 12px',
                  background: C.goldFaint, border: `1px solid ${C.rule}`,
                  color: C.navy, fontFamily: '"Segoe UI", sans-serif', fontWeight: 500, letterSpacing: 0.3,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && (
          <>
            <SectionHeader>Certifications</SectionHeader>
            {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
              <div key={i} style={{ fontSize: 10, marginBottom: 3, paddingLeft: 14 }}>
                <span style={{ color: C.gold, marginRight: 6 }}>✦</span>{c}
              </div>
            ))}
          </>
        )}
        {extras.languages && <><SectionHeader>Languages</SectionHeader><p style={{ fontSize: 10, margin: 0, paddingLeft: 14 }}>{extras.languages}</p></>}
        {extras.achievements && (
          <>
            <SectionHeader>Achievements</SectionHeader>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 10, marginBottom: 3, paddingLeft: 14 }}>
                <span style={{ color: C.gold, marginRight: 6 }}>★</span>{a}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
