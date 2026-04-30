/**
 * Ivy League — Premium academic-inspired template.
 * Traditional serif typography, scholarly aesthetic.
 * Ideal for: Academia, Research, Legal, Finance
 */
import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#333', fs = 10, lh = 1.6 }: { items: string[]; color?: string; fs?: number; lh?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fs / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fs, lineHeight: lh, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>♦</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ startDate, endDate, isCurrent }: { startDate: string; endDate: string; isCurrent: boolean }) {
  return <>{startDate}{startDate && (isCurrent ? ' — Present' : endDate ? ` — ${endDate}` : '')}</>;
}

export default function IvyLeagueTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accent = settings?.accentColor || '#1e3a5f';
  const fontFamily = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fs = settings?.fontSize || 10;
  const lh = settings?.lineHeight || 1.65;
  const ss = settings?.sectionSpacing || 22;
  const cream = '#fdfbf7';
  const border = '#d4cfc5';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: ss, marginBottom: ss / 2.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 6, height: 6, background: accent, transform: 'rotate(45deg)' }} />
        <h2 style={{ fontSize: fs * 0.95, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accent, margin: 0, fontFamily }}>{children}</h2>
        <div style={{ flex: 1, height: 0.75, background: border }} />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily, fontSize: fs, lineHeight: lh, color: '#2d2d2d', padding: '40px 48px', background: cream }}>
      {/* Header */}
      <div style={{ background: accent, padding: '36px 44px 28px', color: '#fff', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `2px solid #fff` }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fs * 2.6, fontWeight: 400, margin: 0, letterSpacing: 4, textTransform: 'uppercase', lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && (
            <div style={{ fontSize: fs * 1.05, color: '#c9b99a', marginTop: 5, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600 }}>{p.jobTitle}</div>
          )}
          <div style={{ fontSize: fs * 0.85, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   •   ')}</div>
        </div>
      </div>

      {/* Decorative line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, #c9b99a, transparent)` }} />

      {/* Body */}
      <div style={{ paddingTop: 8 }}>
        {summary && (
          <>
            <S>Summary</S>
            <p style={{ fontSize: fs, margin: 0, color: '#555', fontStyle: 'italic', lineHeight: lh * 1.15, borderLeft: `2px solid ${border}`, paddingLeft: 12 }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <S>Professional Experience</S>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: ss / 1.3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fs * 1.15, color: accent }}>{exp.role}</strong>
                  <span style={{ fontSize: fs * 0.85, color: '#777', fontStyle: 'italic' }}><DR startDate={exp.startDate} endDate={exp.endDate} isCurrent={exp.isCurrent} /></span>
                </div>
                <div style={{ fontSize: fs, color: '#555', marginTop: 2, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  •  ')}</div>
                <Bul items={exp.bulletPoints} color="#2d2d2d" fs={fs} lh={lh} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <S>Education</S>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: ss / 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fs * 1.1, color: accent }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: fs * 0.85, color: '#777' }}>{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: fs, color: '#555' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <S>Selected Projects</S>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: ss / 1.6 }}>
                <strong style={{ fontSize: fs * 1.1, color: accent }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: fs * 0.8, color: '#777', marginLeft: 6 }}>({proj.link})</span>}
                {proj.techStack && <div style={{ fontSize: fs * 0.9, color: '#666', marginTop: 2 }}>{proj.techStack}</div>}
                <Bul items={proj.bulletPoints} color="#2d2d2d" fs={fs} lh={lh} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <S>Skills & Expertise</S>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: fs * 0.85, padding: '3px 12px', border: `1px solid ${border}`, color: accent, background: '#fff' }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fs, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><p style={{ fontSize: fs, margin: 0 }}><strong>Languages:</strong> {extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fs, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}