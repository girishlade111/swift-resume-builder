import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

export default function ModernTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;

  const accentColor = settings?.accentColor || '#dc4a2d';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Inter, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 22, height: 3, background: accentColor, borderRadius: 2 }} />
      <h2 style={{
        fontSize: fontSize * 1.05, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5,
        color: '#18181b', margin: 0, fontFamily: fontFamilyValue,
      }}>
        {children}
      </h2>
    </div>
  );

  const Bullets = ({ items }: { items: string[] }) => {
    const filtered = items.filter(b => b.trim());
    if (!filtered.length) return null;
    return (
      <ul style={{ margin: `${fontSize / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
        {filtered.map((b, i) => (
          <li key={i} style={{
            fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14,
            position: 'relative', color: '#27272a',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 5, width: 5, height: 5,
              border: `1.5px solid ${accentColor}`, borderRadius: '50%',
            }} />
            {b}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#27272a', paddingBottom: 38 }}>
      {/* Header */}
      <div style={{
        padding: '38px 42px 30px', position: 'relative', overflow: 'hidden', background: '#18181b',
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50,
          width: 180, height: 180, borderRadius: '50%', background: accentColor, opacity: 0.1,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
          {p.profileImage && (
            <img src={p.profileImage} alt="" style={{
              width: 78, height: 78, borderRadius: 14, objectFit: 'cover',
              border: `3px solid ${accentColor}`, boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 900, margin: 0, color: '#ffffff', letterSpacing: -0.5, lineHeight: 1.1 }}>
              {p.fullName || 'Your Name'}
            </h1>
            {p.jobTitle && (
              <div style={{ fontSize: fontSize * 1.15, color: accentColor, marginTop: 5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
              {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
                <span key={i} style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.65)', padding: '2px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: 4 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd, transparent)` }} />

      {/* Body */}
      <div style={{ padding: '8px 42px 0' }}>
        {summary && (
          <>
            <SectionTitle>About Me</SectionTitle>
            <div style={{
              fontSize: fontSize, lineHeight: lineHeight * 1.15, color: '#71717a',
              padding: '10px 14px', background: `${accentColor}10`,
              borderRadius: 8, borderLeft: `3px solid ${accentColor}`,
            }}>
              {summary}
            </div>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{
                marginBottom: sectionSpacing / 1.3, paddingLeft: 18,
                borderLeft: `2px solid ${idx === 0 ? accentColor : '#e4e4e7'}`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', left: -5.5, top: 2,
                  width: 9, height: 9, borderRadius: '50%',
                  background: idx === 0 ? accentColor : '#e4e4e7',
                  border: `2px solid #ffffff`,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: fontSize * 1.15, color: '#18181b' }}>{exp.role}</strong>
                  <span style={{
                    fontSize: fontSize * 0.8, color: '#ffffff', background: accentColor,
                    padding: '2px 10px', borderRadius: 10, fontWeight: 700, flexShrink: 0, marginLeft: 8,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>
                  {[exp.company, exp.location].filter(Boolean).join('  ·  ')}
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
              <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fontSize * 1.1, color: '#18181b' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: fontSize * 0.85, color: '#71717a' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: fontSize, color: '#71717a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{
                marginBottom: sectionSpacing / 1.8, padding: '10px 14px',
                background: '#fafafa', borderRadius: 8, border: `1px solid #e4e4e7`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: fontSize * 1.1, color: '#18181b' }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: fontSize * 0.85, color: '#71717a', fontWeight: 600, marginTop: 2 }}>{proj.techStack}</div>}
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
                <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3px 12px', borderRadius: 14, background: '#18181b', color: '#ffffff', fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: fontSize, marginBottom: 3 }}>{c}</div>)}</>}
        {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: fontSize, marginBottom: 3 }}>{a}</div>)}</>}
      </div>
    </div>
  );
}
