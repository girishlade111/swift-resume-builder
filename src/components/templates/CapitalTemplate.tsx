/**
 * Capital — Investment banking and finance template.
 * Trust signals, structured data, premium feel.
 * Ideal for: Finance, Consulting, Banking, Accounting
 */
import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#1a2332', fs = 10, lh = 1.55 }: { items: string[]; color?: string; fs?: number; lh?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fs / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fs, lineHeight: lh, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, fontSize: fs * 0.7 }}>▸</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ startDate, endDate, isCurrent }: { startDate: string; endDate: string; isCurrent: boolean }) {
  return <>{startDate}{startDate && (isCurrent ? ' — Present' : endDate ? ` — ${endDate}` : '')}</>;
}

export default function CapitalTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const navy = '#0f172a';
  const blue = '#1e40af';
  const slate = '#475569';
  const fontFamily = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fs = settings?.fontSize || 10;
  const lh = settings?.lineHeight || 1.55;
  const ss = settings?.sectionSpacing || 22;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: ss, marginBottom: ss / 2.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 20, height: 3, background: blue, borderRadius: 2 }} />
        <h2 style={{ fontSize: fs * 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, color: navy, margin: 0 }}>{children}</h2>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily, fontSize: fs, lineHeight: lh, color: '#1e293b', padding: '38px 44px' }}>
      {/* Executive Header */}
      <div style={{ borderBottom: `3px solid ${navy}`, paddingBottom: 16, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {p.profileImage && (
            <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${blue}` }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fs * 2.4, fontWeight: 800, margin: 0, letterSpacing: -0.5, color: navy }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && (
              <div style={{ fontSize: fs * 1.1, color: blue, marginTop: 4, fontWeight: 600, letterSpacing: 1.5 }}>{p.jobTitle}</div>
            )}
            <div style={{ fontSize: fs * 0.85, color: slate, marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  |  ')}</div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <>
          <S>Summary</S>
          <p style={{ fontSize: fs, margin: 0, color: slate, lineHeight: lh * 1.15, padding: '10px 14px', background: '#f1f5f9', borderRadius: 6, borderLeft: `3px solid ${blue}` }}>{summary}</p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <S>Experience</S>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: ss / 1.4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: fs * 1.15, color: navy }}>{exp.role}</strong>
                <span style={{ fontSize: fs * 0.8, color: '#fff', background: blue, padding: '2px 10px', borderRadius: 10, fontWeight: 600 }}><DR startDate={exp.startDate} endDate={exp.endDate} isCurrent={exp.isCurrent} /></span>
              </div>
              <div style={{ fontSize: fs, color: blue, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join('  |  ')}</div>
              <Bul items={exp.bulletPoints} color="#1e293b" fs={fs} lh={lh} />
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <S>Education</S>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: ss / 2.2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: fs * 1.1, color: navy }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                <span style={{ fontSize: fs * 0.9, color: slate }}>{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ''}</span>
              </div>
              <div style={{ fontSize: fs, color: slate }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <S>Projects</S>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: ss / 1.6 }}>
              <strong style={{ fontSize: fs * 1.1, color: navy }}>{proj.name}</strong>
              {proj.link && <span style={{ fontSize: fs * 0.85, color: slate, marginLeft: 6 }}>— {proj.link}</span>}
              {proj.techStack && <div style={{ fontSize: fs * 0.9, color: blue, fontWeight: 500, marginTop: 2 }}>{proj.techStack}</div>}
              <Bul items={proj.bulletPoints} color="#1e293b" fs={fs} lh={lh} />
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: fs * 0.85, padding: '3px 12px', background: '#dbeafe', color: blue, borderRadius: 14, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </>
      )}

      {/* Additional */}
      {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fs, margin: 0 }}>{extras.certifications}</p></>}
      {extras.languages && <><p style={{ fontSize: fs, margin: 0 }}><strong>Languages:</strong> {extras.languages}</p></>}
      {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fs, margin: 0 }}>{extras.achievements}</p></>}
    </div>
  );
}