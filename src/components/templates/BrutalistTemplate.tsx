import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, fontSize = 10, lineHeight = 1.7 }: { items: string[]; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 3, paddingLeft: 16, position: 'relative', color: '#1a1a1a' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, fontWeight: 900 }}>*</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function BrutalistTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#ff6b35';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 }}>
      <h2 style={{ fontSize: fontSize * 1.4, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, color: '#000', margin: 0, padding: '6px 12px', border: '3px solid #000', display: 'inline-block', background: accentColor, transform: 'rotate(-1deg)' }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1a1a1a', background: '#fffef5', minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '44px 48px 32px', border: '4px solid #000', margin: 0, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, objectFit: 'cover', border: '4px solid #000' }} />}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fontSize * 3.2, fontWeight: 900, margin: 0, color: '#000', letterSpacing: -1, lineHeight: 1.05 }}>{(p.fullName || 'YOUR NAME').toUpperCase()}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.4, color: accentColor, marginTop: 4, fontWeight: 800, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.9, padding: '3px 10px', border: '2px solid #000', fontWeight: 600, background: i === 0 ? accentColor : '#fff', color: i === 0 ? '#fff' : '#000' }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '4px 48px 0' }}>
        {summary && <><S>About Me</S><p style={{ fontSize: fontSize * 1.05, margin: 0, color: '#333', lineHeight: lineHeight * 1.15, padding: '12px 16px', border: '2px solid #000', background: '#fff' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Work</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, padding: '12px 16px', border: '2px solid #000', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.3, color: '#000' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#fff', background: '#000', padding: '2px 8px', fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize * 1.05, color: accentColor, marginTop: 3, fontWeight: 700 }}>{[exp.company, exp.location].filter(Boolean).join(' // ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '8px 16px', border: '2px solid #000', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` / ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, fontWeight: 700 }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#666' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '8px 16px', border: '2px solid #000', background: '#fff' }}>
            <strong style={{ fontSize: fontSize * 1.2, color: '#000' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8, fontWeight: 700 }}>[LINK]</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#666', marginTop: 1, fontWeight: 600 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.95, padding: '4px 12px', border: '2px solid #000', fontWeight: 700, background: i % 3 === 0 ? accentColor : '#fff', color: i % 3 === 0 ? '#fff' : '#000' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certs</S><p style={{ fontSize: fontSize, margin: 0, fontWeight: 600 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Wins</S><p style={{ fontSize: fontSize, margin: 0, fontWeight: 600 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
