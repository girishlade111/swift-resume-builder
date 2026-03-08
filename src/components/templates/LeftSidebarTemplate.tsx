/**
 * Left Sidebar — Premium two-column executive layout.
 * Deep midnight sidebar with warm terracotta accents, refined main column.
 * Inspired by IDEO/Bain consulting resumes.
 */
import { ResumeData } from '@/types/resume';

const C = {
  sidebar: '#0c1222',
  sidebarMid: '#162033',
  sidebarText: '#c4d0de',
  sidebarMuted: '#8899ad',
  accent: '#d4623c',
  accentLight: '#f8b49a',
  mainDark: '#1a1a1a',
  mainText: '#2a2a2a',
  mainMuted: '#6b6b6b',
  border: '#e5e5e5',
  white: '#ffffff',
};

function SidebarSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22, marginBottom: 8 }}>
      <h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: C.accent, margin: 0 }}>{children}</h2>
      <div style={{ width: 16, height: 1.5, background: C.accent, marginTop: 4 }} />
    </div>
  );
}

function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h2 style={{
          fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3,
          color: C.mainDark, margin: 0, fontFamily: '"Inter", system-ui, sans-serif',
        }}>
          {children}
        </h2>
        <div style={{ flex: 1, height: 1.5, background: C.border }} />
      </div>
    </div>
  );
}

function Bullets({ items, color = '#2a2a2a' }: { items: string[]; color?: string }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10, lineHeight: 1.65, marginBottom: 2, paddingLeft: 14,
          position: 'relative', color,
        }}>
          <span style={{
            position: 'absolute', left: 0, top: 4, width: 5, height: 5,
            background: C.accent, borderRadius: '50%',
          }} />
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function LeftSidebarTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;

  return (
    <div style={{
      fontFamily: '"Inter", system-ui, Roboto, sans-serif',
      fontSize: 10, lineHeight: 1.5, color: C.mainText, display: 'flex', minHeight: '100%',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 218, flexShrink: 0,
        background: `linear-gradient(180deg, ${C.sidebar} 0%, ${C.sidebarMid} 100%)`,
        color: C.sidebarText, padding: '38px 20px',
      }}>
        {p.profileImage && (
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <img src={p.profileImage} alt="" style={{
              width: 88, height: 88, borderRadius: '50%', objectFit: 'cover',
              border: `3px solid ${C.accent}`, boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }} />
          </div>
        )}
        <h1 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: C.white, lineHeight: 1.2, textAlign: 'center' }}>
          {p.fullName || 'Your Name'}
        </h1>
        {p.jobTitle && (
          <div style={{ fontSize: 9, color: C.accent, marginTop: 5, fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 }}>{p.jobTitle}</div>
        )}

        <SidebarSection>Contact</SidebarSection>
        {[p.email, p.phone, p.location].filter(Boolean).map((item, i) => (
          <div key={i} style={{
            fontSize: 8.5, marginBottom: 6, wordBreak: 'break-all' as const,
            color: C.sidebarText, lineHeight: 1.4,
            paddingLeft: 10, borderLeft: '1.5px solid rgba(212,98,60,0.3)',
          }}>
            {item}
          </div>
        ))}

        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && (
          <>
            <SidebarSection>Links</SidebarSection>
            {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((url, i) => (
              <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: C.sidebarMuted }}>{url}</div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SidebarSection>Skills</SidebarSection>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 7.5, background: 'rgba(212,98,60,0.12)',
                  borderRadius: 3, padding: '3px 8px', color: C.accentLight, fontWeight: 500,
                }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.languages && (
          <>
            <SidebarSection>Languages</SidebarSection>
            {extras.languages.split('\n').filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 9, color: C.sidebarText, marginBottom: 3 }}>{l}</div>)}
          </>
        )}
        {extras.certifications && (
          <>
            <SidebarSection>Certifications</SidebarSection>
            {extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 4, color: C.sidebarText, lineHeight: 1.4 }}>{c}</div>)}
          </>
        )}
      </div>

      {/* Main Column */}
      <div style={{ flex: 1, padding: '38px 32px 38px 28px' }}>
        {summary && (
          <>
            <MainSection>Profile</MainSection>
            <p style={{ fontSize: 10, margin: 0, lineHeight: 1.75, color: C.mainMuted, fontStyle: 'italic' }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <MainSection>Experience</MainSection>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 11.5, color: C.mainDark }}>{exp.role}</strong>
                  <span style={{
                    fontSize: 7.5, color: C.white, background: C.accent,
                    padding: '2px 8px', borderRadius: 10, fontWeight: 700, flexShrink: 0, marginLeft: 8,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.accent, marginTop: 2, fontWeight: 600 }}>
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
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11, color: C.mainDark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: 8.5, color: C.mainMuted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: 10, color: C.mainMuted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <MainSection>Projects</MainSection>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 11, color: C.mainDark }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8.5, color: C.accent }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: 9, color: C.mainMuted, fontWeight: 500, marginTop: 2 }}>{proj.techStack}</div>}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {extras.achievements && (
          <>
            <MainSection>Achievements</MainSection>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 10, marginBottom: 3, paddingLeft: 12 }}>
                <span style={{ color: C.accent, marginRight: 6 }}>★</span>{a}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
