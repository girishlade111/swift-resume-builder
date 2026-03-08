/**
 * Left Sidebar template — premium dark sidebar with gradient,
 * refined typography, and polished two-column layout.
 */
import { ResumeData } from '@/types/resume';

const SIDEBAR_BG = 'linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #334155 100%)';
const ACCENT = '#38bdf8';

function SidebarSection({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 9,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 2.5,
      color: ACCENT,
      marginBottom: 8,
      marginTop: 18,
      paddingBottom: 4,
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      {children}
    </h2>
  );
}

function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 18, marginBottom: 10 }}>
      <h2 style={{
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#0f172a',
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: '2px solid #e2e8f0',
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
    <ul style={{ margin: '4px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{ fontSize: 10.5, lineHeight: 1.6, marginBottom: 2, paddingLeft: 12, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, top: 6, width: 4, height: 4, background: '#cbd5e1', borderRadius: '50%' }} />
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function LeftSidebarTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;

  return (
    <div style={{
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      fontSize: 10.5, lineHeight: 1.5, color: '#1e293b', display: 'flex', minHeight: '100%',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 230, flexShrink: 0, background: SIDEBAR_BG,
        color: '#e2e8f0', padding: '32px 22px',
      }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 88, height: 88, borderRadius: '50%', objectFit: 'cover',
            margin: '0 auto 16px', display: 'block',
            border: `3px solid ${ACCENT}`, boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }} />
        )}
        <h1 style={{
          fontSize: 20, fontWeight: 800, margin: 0, color: '#fff',
          lineHeight: 1.2, textAlign: 'center',
        }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <div style={{
            fontSize: 10, color: ACCENT, marginTop: 4, fontWeight: 500,
            textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5,
          }}>
            {personal.jobTitle}
          </div>
        )}

        <SidebarSection>Contact</SidebarSection>
        {[
          { icon: '✉', value: personal.email },
          { icon: '☎', value: personal.phone },
          { icon: '◉', value: personal.location },
        ].filter(x => x.value).map((item, i) => (
          <div key={i} style={{
            fontSize: 9.5, marginBottom: 5, wordBreak: 'break-all',
            display: 'flex', alignItems: 'flex-start', gap: 6, color: '#cbd5e1',
          }}>
            <span style={{ color: ACCENT, fontSize: 8, marginTop: 2 }}>{item.icon}</span>
            {item.value}
          </div>
        ))}
        {[personal.linkedinUrl, personal.githubUrl, personal.portfolioUrl].filter(Boolean).map((url, i) => (
          <div key={`link${i}`} style={{
            fontSize: 9, marginBottom: 3, wordBreak: 'break-all', color: '#94a3b8',
          }}>
            {url}
          </div>
        ))}

        {skills.length > 0 && (
          <>
            <SidebarSection>Skills</SidebarSection>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 8.5, background: 'rgba(56,189,248,0.15)',
                  borderRadius: 4, padding: '3px 8px', color: ACCENT,
                  border: '1px solid rgba(56,189,248,0.2)', fontWeight: 500,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {extras.languages && (
          <>
            <SidebarSection>Languages</SidebarSection>
            <div style={{ fontSize: 9.5, color: '#cbd5e1', lineHeight: 1.6 }}>{extras.languages}</div>
          </>
        )}

        {extras.certifications && (
          <>
            <SidebarSection>Certifications</SidebarSection>
            {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
              <div key={i} style={{ fontSize: 9.5, marginBottom: 3, color: '#cbd5e1' }}>{c}</div>
            ))}
          </>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '32px 30px 32px 26px' }}>
        {summary && (
          <>
            <MainSection>Profile</MainSection>
            <p style={{ fontSize: 10.5, margin: 0, lineHeight: 1.7, color: '#475569' }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <MainSection>Experience</MainSection>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11.5, color: '#0f172a' }}>{exp.role}</strong>
                  <span style={{
                    fontSize: 8.5, color: '#94a3b8', flexShrink: 0, marginLeft: 6,
                    fontWeight: 500, letterSpacing: 0.3,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 1, fontWeight: 500 }}>
                  {[exp.company, exp.location].filter(Boolean).join(' · ')}
                </div>
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <MainSection>Education</MainSection>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11.5, color: '#0f172a' }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </strong>
                  <span style={{ fontSize: 8.5, color: '#94a3b8', flexShrink: 0, marginLeft: 6 }}>
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
            <MainSection>Projects</MainSection>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 11.5, color: '#0f172a' }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 9, color: '#3b82f6' }}> ↗ {proj.link}</span>}
                {proj.techStack && (
                  <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>
                    {proj.techStack}
                  </div>
                )}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {extras.achievements && (
          <>
            <MainSection>Achievements</MainSection>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#475569' }}>{a}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
