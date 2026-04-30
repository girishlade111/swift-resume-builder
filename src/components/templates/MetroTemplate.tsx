import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#1e293b', fontSize = 10, lineHeight = 1.7 }: { items: string[]; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, fontWeight: 700 }}>+</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function MetroTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#0078d4';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Segoe UI", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const L = `${accentColor}10`;

  const Tile = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing }}>
      <div style={{ background: accentColor, padding: '7px 16px', display: 'inline-block', marginBottom: sectionSpacing / 2 }}>
        <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#fff', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e293b', minHeight: 1123, paddingBottom: 40 }}>
      <div style={{ background: accentColor, padding: '44px 50px 34px', display: 'flex', alignItems: 'center', gap: 22 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 300, margin: 0, color: '#fff', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.3, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontWeight: 600 }}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{ background: L, padding: '10px 50px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
          <span key={i} style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 500 }}>{c}</span>
        ))}
      </div>
      <div style={{ padding: '4px 50px 0' }}>
        {summary && <Tile title="About"><p style={{ fontSize: fontSize, margin: 0, color: '#475569', lineHeight: lineHeight * 1.15, background: L, padding: '10px 14px' }}>{summary}</p></Tile>}
        {experience.length > 0 && <Tile title="Experience">{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4, padding: '10px 14px', background: L }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: '#0f172a' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 600 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</Tile>}
        {education.length > 0 && <Tile title="Education">{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2, padding: '8px 14px', background: L }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</Tile>}
        {projects.length > 0 && <Tile title="Projects">{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '8px 14px', background: L }}>
            <strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</Tile>}
        {skills.length > 0 && <Tile title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '4px 12px', background: accentColor, color: '#fff', fontWeight: 500 }}>{s}</span>)}
          </div>
        </Tile>}
        {extras.certifications && <Tile title="Certifications"><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></Tile>}
        {extras.languages && <Tile title="Languages"><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></Tile>}
        {extras.achievements && <Tile title="Achievements"><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></Tile>}
      </div>
    </div>
  );
}
