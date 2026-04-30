import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#e2e8f0', fontSize = 10, lineHeight = 1.7 }: { items: string[]; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: 'inherit', opacity: 0.8 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function GlassTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#a78bfa';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const GLASS = 'rgba(255,255,255,0.08)', BORDER = 'rgba(255,255,255,0.12)';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 }}>
      <h2 style={{ fontSize: fontSize, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0 }}>{children}</h2>
      <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: 5, borderRadius: 1 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#e2e8f0', background: 'linear-gradient(135deg, #0f0a1f 0%, #1a1035 30%, #0d1b2a 70%, #0a0f1f 100%)', minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '48px 50px 36px' }}>
        <div style={{ padding: '24px 28px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', border: `2px solid ${accentColor}40` }} />}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fontSize * 2.6, fontWeight: 700, margin: 0, color: '#fff', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: accentColor, marginTop: 4, fontWeight: 500 }}>{p.jobTitle}</div>}
            <div style={{ marginTop: 10, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
                <span key={i} style={{ fontSize: fontSize * 0.9, color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 50px 0' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: fontSize, margin: 0, color: '#94a3b8', lineHeight: lineHeight * 1.15, padding: '12px 18px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 12 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '12px 18px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.15, color: '#fff' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 500 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 500, opacity: 0.8 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '10px 18px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#94a3b8' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 2.2, padding: '10px 18px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '4px 14px', background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 20, color: '#e2e8f0' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
