/**
 * Horizon — Growth-focused template for startups and modern careers.
 * Dynamic visuals, achievement emphasis, results-driven.
 * Ideal for: Startups, Sales, Growth, Marketing, Operations
 */
import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#1e1e1e', fs = 10, lh = 1.55 }: { items: string[]; color?: string; fs?: number; lh?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fs / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fs, lineHeight: lh, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: '#22c55e' }}>✓</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ startDate, endDate, isCurrent }: { startDate: string; endDate: string; isCurrent: boolean }) {
  return <>{startDate}{startDate && (isCurrent ? ' — Present' : endDate ? ` — ${endDate}` : '')}</>;
}

export default function HorizonTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const black = '#09090b';
  const green = '#16a34a';
  const gray = '#71717a';
  const fontFamily = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fs = settings?.fontSize || 10;
  const lh = settings?.lineHeight || 1.55;
  const ss = settings?.sectionSpacing || 22;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: ss, marginBottom: ss / 2.5, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: green, fontSize: fs * 1.3, fontWeight: 700 }}>▸</span>
      <h2 style={{ fontSize: fs * 0.9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: black, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 2, background: `#e4e4e7` }} />
    </div>
  );

  return (
    <div style={{ fontFamily, fontSize: fs, lineHeight: lh, color: '#27272a', paddingBottom: 40 }}>
      {/* Hero Header */}
      <div style={{ background: `linear-gradient(135deg, ${black} 0%, #27272a 100%)`, padding: '40px 44px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{ width: 76, height: 76, borderRadius: 14, objectFit: 'cover', border: `3px solid ${green}`, boxShadow: '0 4px 20px rgba(22, 163, 74, 0.3)' }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fs * 2.8, fontWeight: 800, margin: 0, color: '#fff', letterSpacing: -0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && (
            <div style={{ fontSize: fs * 1.15, color: green, marginTop: 5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
              <span key={i} style={{ fontSize: fs * 0.85, color: 'rgba(255,255,255,0.7)', padding: '2px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 6 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Green accent line */}
      <div style={{ height: 4, background: green }} />

      {/* Body */}
      <div style={{ padding: '10px 44px 0' }}>
        {summary && (
          <>
            <S>About</S>
            <p style={{ fontSize: fs, margin: 0, color: gray, lineHeight: lh * 1.15, padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, borderLeft: `3px solid ${green}` }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <S>Experience</S>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: ss / 1.4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: fs * 1.2, color: black }}>{exp.role}</strong>
                  <span style={{ fontSize: fs * 0.75, color: '#fff', background: green, padding: '2px 10px', borderRadius: 12, fontWeight: 700 }}><DR startDate={exp.startDate} endDate={exp.endDate} isCurrent={exp.isCurrent} /></span>
                </div>
                <div style={{ fontSize: fs, color: green, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join('  •  ')}</div>
                <Bul items={exp.bulletPoints} color="#27272a" fs={fs} lh={lh} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <S>Education</S>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: ss / 2.2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: fs * 1.1, color: black }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: fs * 0.9, color: gray }}>{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: fs, color: gray }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <S>Key Projects</S>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: ss / 1.6 }}>
                <strong style={{ fontSize: fs * 1.1, color: black }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: fs * 0.85, color: green, marginLeft: 6 }}>↗</span>}
                {proj.techStack && <div style={{ fontSize: fs * 0.9, color: gray, marginTop: 2 }}>{proj.techStack}</div>}
                <Bul items={proj.bulletPoints} color="#27272a" fs={fs} lh={lh} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <S>Skills</S>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: fs * 0.85, padding: '3.5px 12px', background: black, color: green, borderRadius: 14, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fs, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fs, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fs, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}