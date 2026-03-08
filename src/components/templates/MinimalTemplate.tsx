/**
 * Minimal — Ultra-clean Swiss/Scandinavian design.
 * Monochrome with a single emerald accent, generous whitespace,
 * razor-sharp typography hierarchy. Maximum elegance through restraint.
 */
import { ResumeData } from '@/types/resume';

const C = {
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  faint: '#a1a1aa',
  rule: '#e4e4e7',
  accent: '#047857',
  accentLight: '#ecfdf5',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 28, marginBottom: 12 }}>
      <h2 style={{
        fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 5,
        color: C.accent, margin: 0,
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      }}>
        {children}
      </h2>
      <div style={{ width: 28, height: 1.5, background: C.accent, marginTop: 5 }} />
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
          fontSize: 10, lineHeight: 1.8, marginBottom: 1, paddingLeft: 12,
          position: 'relative', color: C.text,
        }}>
          <span style={{ position: 'absolute', left: 0, color: C.accent, fontSize: 14, top: -2, lineHeight: 1 }}>·</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const contact = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean);

  return (
    <div style={{
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontSize: 10, lineHeight: 1.6, color: C.text, padding: '50px 54px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 10 }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{
            width: 58, height: 58, borderRadius: 6, objectFit: 'cover',
            border: `2px solid ${C.accent}`,
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 30, fontWeight: 200, margin: 0, letterSpacing: 3, color: C.black,
          }}>
            {p.fullName || 'Your Name'}
          </h1>
          {p.jobTitle && (
            <div style={{ fontSize: 10.5, color: C.accent, marginTop: 4, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>
          )}
        </div>
      </div>
      <div style={{ height: 0.75, background: C.rule }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10 }}>
        {contact.map((c, i) => <span key={i} style={{ fontSize: 9, color: C.muted, letterSpacing: 0.3 }}>{c}</span>)}
        {links.map((l, i) => <span key={`l${i}`} style={{ fontSize: 9, color: C.faint, letterSpacing: 0.3 }}>{l}</span>)}
      </div>

      {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 10, margin: 0, color: C.muted, lineHeight: 1.85 }}>{summary}</p></>}

      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: 18, paddingBottom: idx < experience.length - 1 ? 16 : 0,
              borderBottom: idx < experience.length - 1 ? `1px solid ${C.rule}` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.black }}>{exp.role}</span>
                <span style={{ fontSize: 8.5, color: C.faint, flexShrink: 0, marginLeft: 8, letterSpacing: 0.5, fontWeight: 500 }}>
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
                <span style={{ fontSize: 11.5, fontWeight: 600, color: C.black }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                <span style={{ fontSize: 8.5, color: C.faint }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>{[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}</div>
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
              {proj.techStack && <span style={{ fontSize: 9, color: C.faint, fontWeight: 500 }}>{proj.techStack}</span>}
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
              <span key={i} style={{ fontSize: 8.5, padding: '3px 10px', background: C.accentLight, borderRadius: 4, color: C.accent, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </>
      )}

      {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}>{c}</div>)}</>}
      {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}>{a}</div>)}</>}
    </div>
  );
}
