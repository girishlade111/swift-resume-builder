/**
 * Minimal — Ultra-clean Scandinavian design.
 * Monochrome with single emerald accent, generous whitespace,
 * razor-sharp typography hierarchy. Maximum elegance through restraint.
 */
import { ResumeData } from '@/types/resume';

const C = {
  black: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  faint: '#a3a3a3',
  rule: '#e5e5e5',
  accent: '#059669',
  accentLight: '#ecfdf5',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 26, marginBottom: 12 }}>
      <h2 style={{
        fontSize: 8.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4,
        color: C.accent, margin: 0,
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      }}>
        {children}
      </h2>
      <div style={{ width: 32, height: 1.5, background: C.accent, marginTop: 5 }} />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '5px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10, lineHeight: 1.75, marginBottom: 1, paddingLeft: 12,
          position: 'relative', color: C.text,
        }}>
          <span style={{ position: 'absolute', left: 0, color: C.accent, fontSize: 14, top: -2 }}>·</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontSize: 10, lineHeight: 1.6, color: C.text, padding: '48px 52px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 8 }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 60, height: 60, borderRadius: 6, objectFit: 'cover', flexShrink: 0,
            border: `2px solid ${C.accent}`,
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 200, margin: 0, letterSpacing: 2, color: C.black,
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <div style={{
              fontSize: 11, color: C.accent, marginTop: 3,
              fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase',
            }}>
              {personal.jobTitle}
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 1, background: C.rule }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10, marginBottom: 4 }}>
        {contactParts.map((c, i) => (
          <span key={i} style={{ fontSize: 9, color: C.muted, letterSpacing: 0.3 }}>{c}</span>
        ))}
        {linkParts.map((l, i) => (
          <span key={`l${i}`} style={{ fontSize: 9, color: C.faint, letterSpacing: 0.3 }}>{l}</span>
        ))}
      </div>

      {summary && (
        <>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ fontSize: 10, margin: 0, color: C.muted, lineHeight: 1.85 }}>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: 18,
              paddingBottom: idx < experience.length - 1 ? 16 : 0,
              borderBottom: idx < experience.length - 1 ? `1px solid ${C.rule}` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.black }}>{exp.role}</span>
                <span style={{
                  fontSize: 9, color: C.faint, flexShrink: 0, marginLeft: 8,
                  letterSpacing: 0.5, fontWeight: 500,
                }}>
                  {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                </span>
              </div>
              <div style={{ fontSize: 10, color: C.accent, marginTop: 2, fontWeight: 500 }}>
                {[exp.company, exp.location].filter(Boolean).join(' — ')}
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
            <div key={edu.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: C.black }}>
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </span>
                <span style={{ fontSize: 9, color: C.faint, flexShrink: 0, marginLeft: 8 }}>
                  {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                </span>
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>
                {[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}
              </div>
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: C.black }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: 8.5, color: C.accent }}>↗</span>}
              </div>
              {proj.techStack && (
                <span style={{ fontSize: 9, color: C.faint, fontWeight: 500 }}>{proj.techStack}</span>
              )}
              <Bullets items={proj.bulletPoints} />
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                fontSize: 9, padding: '3px 10px',
                background: C.accentLight, borderRadius: 4,
                color: C.accent, fontWeight: 600, letterSpacing: 0.3,
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
            <div key={i} style={{ fontSize: 10, marginBottom: 3, color: C.text }}>{c}</div>
          ))}
        </>
      )}
      {extras.languages && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p style={{ fontSize: 10, margin: 0, color: C.text }}>{extras.languages}</p>
        </>
      )}
      {extras.achievements && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
            <div key={i} style={{ fontSize: 10, marginBottom: 3, color: C.text }}>{a}</div>
          ))}
        </>
      )}
    </div>
  );
}
