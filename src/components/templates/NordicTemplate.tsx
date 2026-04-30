import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#5c6b7a', fontSize = 10, lineHeight = 1.7 }: { items: string[]; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: 'inherit', opacity: 0.5 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function NordicTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#5b8fa8';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const BG = '#faf8f5', CARD = '#f0ece5';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 }}>
      <h2 style={{ fontSize: fontSize, fontWeight: 600, letterSpacing: 3, color: accentColor, margin: 0, textTransform: 'uppercase' }}>{children}</h2>
      <div style={{ width: 30, height: 2, background: accentColor, marginTop: 5, borderRadius: 1 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#3a4a5a', background: BG, minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '50px 54px 38px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 70, height: 70, borderRadius: 20, objectFit: 'cover', border: `3px solid ${accentColor}40` }} />}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fontSize * 2.6, fontWeight: 300, margin: 0, color: '#2a3a4a', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: accentColor, marginTop: 5, fontWeight: 500 }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 18px', background: CARD, borderRadius: 12, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.9, color: '#5c6b7a' }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 54px 0' }}>
        {summary && <><S>About</S><p style={{ fontSize: fontSize, margin: 0, color: '#5c6b7a', lineHeight: lineHeight * 1.15, padding: '12px 18px', background: CARD, borderRadius: 10 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, padding: '12px 18px', background: CARD, borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.15, color: '#2a3a4a' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 500 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '10px 18px', background: CARD, borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: '#2a3a4a' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#94a3b8' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#5c6b7a' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '10px 18px', background: CARD, borderRadius: 10 }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#2a3a4a' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#94a3b8', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '5px 14px', background: CARD, borderRadius: 20, color: '#3a4a5a', fontWeight: 500 }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
