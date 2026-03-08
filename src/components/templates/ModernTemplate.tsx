/**
 * Modern template — bold geometric header with gradient accent,
 * contemporary typography, and striking visual hierarchy.
 */
import { ResumeData } from '@/types/resume';

const PRIMARY = '#1d4ed8';
const DARK = '#0f172a';
const LIGHT_BG = '#eff6ff';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 3, height: 16, background: PRIMARY, borderRadius: 2 }} />
      <h2 style={{
        fontSize: 12,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: DARK,
        margin: 0,
        fontFamily: '"Inter", "Segoe UI", sans-serif',
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
    <ul style={{ margin: '5px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{ fontSize: 10.5, lineHeight: 1.6, marginBottom: 2, paddingLeft: 14, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, top: 6, width: 5, height: 5, background: PRIMARY, borderRadius: '50%' }} />
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;

  return (
    <div style={{ fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif', fontSize: 10.5, lineHeight: 1.5, color: '#1e293b' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${DARK} 0%, ${PRIMARY} 100%)`,
        padding: '28px 36px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
            border: '3px solid rgba(255,255,255,0.3)',
          }} />
        )}
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: 0.5 }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <div style={{ fontSize: 13, fontWeight: 400, marginTop: 2, opacity: 0.85, letterSpacing: 1 }}>
              {personal.jobTitle}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10, fontSize: 9.5, opacity: 0.8 }}>
            {[personal.email, personal.phone, personal.location].filter(Boolean).map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
          {[personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 3, fontSize: 9, opacity: 0.7 }}>
              {[personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean).map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 36px 32px' }}>
        {summary && (
          <>
            <SectionTitle>About Me</SectionTitle>
            <div style={{
              fontSize: 10.5, lineHeight: 1.7, color: '#475569',
              borderLeft: `3px solid ${LIGHT_BG}`, paddingLeft: 12,
              background: LIGHT_BG, padding: '8px 12px', borderRadius: 4,
            }}>
              {summary}
            </div>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 12, color: DARK }}>{exp.role}</strong>
                  <span style={{
                    fontSize: 9, color: '#fff', background: PRIMARY, padding: '1px 8px',
                    borderRadius: 10, flexShrink: 0, marginLeft: 8, fontWeight: 600,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 1, fontWeight: 500 }}>
                  {[exp.company, exp.location].filter(Boolean).join(' · ')}
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
                  <strong style={{ fontSize: 11.5, color: DARK }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </strong>
                  <span style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: '#64748b' }}>
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
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 11.5, color: DARK }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 9, color: PRIMARY }}> ↗ {proj.link}</span>}
                {proj.techStack && (
                  <div style={{ fontSize: 9, color: '#64748b', fontWeight: 500, marginTop: 2 }}>
                    Tech: {proj.techStack}
                  </div>
                )}
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
                <span key={i} style={{
                  fontSize: 9.5, padding: '3px 12px',
                  background: `linear-gradient(135deg, ${LIGHT_BG}, #dbeafe)`,
                  borderRadius: 12, color: PRIMARY, fontWeight: 600,
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
              <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#475569' }}>{c}</div>
            ))}
          </>
        )}
        {extras.languages && (
          <>
            <SectionTitle>Languages</SectionTitle>
            <p style={{ fontSize: 10.5, margin: 0, color: '#475569' }}>{extras.languages}</p>
          </>
        )}
        {extras.achievements && (
          <>
            <SectionTitle>Achievements</SectionTitle>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#475569' }}>{a}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
