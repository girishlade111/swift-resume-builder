import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#e8e0d0', fontSize = 10, lineHeight = 1.7 }: { items: string[]; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: 'inherit', opacity: 0.6 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function LuxeTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#c9a96e';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Playfair Display", Georgia, serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const BG = '#0a1628', CARD = '#0f1f3a', T = '#e8e0d0';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{ fontSize: fontSize * 0.9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 5, color: accentColor, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: T, background: BG, minHeight: 1123, paddingBottom: 40 }}>
      <div style={{ padding: '48px 50px 36px', borderBottom: `1px solid ${accentColor}30`, textAlign: 'center' }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}`, marginBottom: 14, display: 'inline-block' }} />}
        <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 400, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: '#fff' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: accentColor, marginTop: 8, letterSpacing: 4, fontWeight: 500, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.85, color: `${accentColor}aa` }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '6px 50px 0' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: fontSize, margin: 0, color: '#94a3b8', lineHeight: lineHeight * 1.15, fontStyle: 'italic', padding: '10px 16px', background: CARD, borderLeft: `2px solid ${accentColor}` }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4, padding: '12px 16px', background: CARD, borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: '#fff' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 3, fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2, padding: '10px 16px', background: CARD, borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#94a3b8' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#94a3b8' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '10px 16px', background: CARD, borderRadius: 4 }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#94a3b8', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '4px 14px', border: `1px solid ${accentColor}60`, color: accentColor, letterSpacing: 0.5 }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
