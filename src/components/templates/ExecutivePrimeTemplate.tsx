/**
 * Executive Prime — Ultra-premium template for C-suite executives.
 * Refined typography, gold accents, boardroom-ready.
 * Ideal for: CEOs, Board Members, Senior Leadership
 */
import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#333', fs = 10, lh = 1.6 }: { items: string[]; color?: string; fs?: number; lh?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fs / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fs, lineHeight: lh, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color, opacity: 0.5 }}>◆</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' — Present' : exp.endDate ? ` — ${exp.endDate}` : '')}</>;
}

export default function ExecutivePrimeTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accent = settings?.accentColor || '#1a1a1a';
  const gold = '#b8860b';
  const fontFamily = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fs = settings?.fontSize || 10;
  const lh = settings?.lineHeight || 1.6;
  const ss = settings?.sectionSpacing || 24;
  const bg = '#fafaf9';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: ss, marginBottom: ss / 2.5, borderBottom: `1px solid #d4d4d4`, paddingBottom: 8 }}>
      <h2 style={{ fontSize: fs * 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accent, margin: 0, fontFamily }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily, fontSize: fs, lineHeight: lh, color: '#2a2a2a', padding: '44px 52px', background: bg }}>
      {/* Executive Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 20, marginBottom: 24, borderBottom: `3px solid ${accent}` }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${gold}` }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fs * 2.8, fontWeight: 400, margin: 0, letterSpacing: 6, textTransform: 'uppercase', color: accent }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && (
            <div style={{ fontSize: fs * 1.1, color: gold, marginTop: 6, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{p.jobTitle}</div>
          )}
          <div style={{ fontSize: fs * 0.85, color: '#666', marginTop: 12, fontFamily: 'system-ui' }}>{[p.email, p.phone, p.location].filter(Boolean).join('   •   ')}</div>
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <>
          <S>Board Summary</S>
          <p style={{ fontSize: fs, margin: 0, color: '#555', lineHeight: lh * 1.2, fontStyle: 'italic', borderLeft: `3px solid ${gold}`, paddingLeft: 14 }}>{summary}</p>
        </>
      )}

      {/* Leadership Experience */}
      {experience.length > 0 && (
        <>
          <S>Executive Experience</S>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: ss / 1.4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: fs * 1.2, color: accent }}>{exp.role}</strong>
                <span style={{ fontSize: fs * 0.9, color: '#666', fontFamily: 'system-ui', fontStyle: 'italic' }}><DR exp={exp} /></span>
              </div>
              <div style={{ fontSize: fs, color: gold, marginTop: 2, fontWeight: 600, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  •  ')}</div>
              <Bul items={exp.bulletPoints} color="#2a2a2a" fs={fs} lh={lh} />
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <S>Academic Credentials</S>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: ss / 2.2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: fs * 1.1, color: accent }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                <span style={{ fontSize: fs * 0.9, color: '#666' }}>{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ''}</span>
              </div>
              <div style={{ fontSize: fs, color: '#555' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <S>Strategic Initiatives</S>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: ss / 1.6 }}>
              <strong style={{ fontSize: fs * 1.1, color: accent }}>{proj.name}</strong>
              {proj.link && <span style={{ fontSize: fs * 0.85, color: '#666', marginLeft: 8 }}>({proj.link})</span>}
              {proj.techStack && <div style={{ fontSize: fs * 0.9, color: gold, marginTop: 2 }}>{proj.techStack}</div>}
              <Bul items={proj.bulletPoints} color="#2a2a2a" fs={fs} lh={lh} />
            </div>
          ))}
        </>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <>
          <S>Core Competencies</S>
          <div style={{ fontSize: fs, lineHeight: lh * 1.4, letterSpacing: 0.3 }}>{skills.join('   •   ')}</div>
        </>
      )}

      {/* Additional */}
      {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fs, margin: 0 }}>{extras.certifications}</p></>}
      {extras.languages && <><S>Languages</S><p style={{ fontSize: fs, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><S>Distinctions</S><p style={{ fontSize: fs, margin: 0 }}>{extras.achievements}</p></>}
    </div>
  );
}