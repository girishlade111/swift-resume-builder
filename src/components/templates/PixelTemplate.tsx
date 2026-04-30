import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, fontSize = 10, lineHeight = 1.7 }: { items: string[]; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 16, position: 'relative', color: '#374151', fontFamily: '"Courier New", monospace' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: '#10b981', opacity: 0.7 }}>{'>>'}</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function PixelTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#10b981';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Courier New", monospace';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const BG = '#f0fdf4', BORDER = '#86efac';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: accentColor, fontFamily: '"Courier New", monospace', fontSize: fontSize, fontWeight: 700 }}>[</span>
      <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#065f46', margin: 0, fontFamily: '"Courier New", monospace' }}>{children}</h2>
      <span style={{ color: accentColor, fontFamily: '"Courier New", monospace', fontSize: fontSize, fontWeight: 700 }}>]</span>
      <div style={{ flex: 1, borderTop: `2px dotted ${BORDER}` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#374151', background: BG, minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '44px 48px 32px', borderBottom: `4px dotted ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
          {p.profileImage && <div style={{ width: 68, height: 68, overflow: 'hidden', border: `3px solid ${accentColor}` }}>
            <img src={p.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' as any }} />
          </div>}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, color: '#94a3b8', marginBottom: 4 }}>{'/* ========= RESUME ========= */'}</div>
            <h1 style={{ fontSize: fontSize * 2.4, fontWeight: 700, margin: 0, color: '#065f46', letterSpacing: 2 }}>{(p.fullName || 'Your Name').toUpperCase()}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: accentColor, marginTop: 4, fontWeight: 600 }}>{'> '}{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 14, padding: '8px 12px', border: `2px solid ${BORDER}`, background: '#fff', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.9, color: '#065f46' }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '4px 48px 0' }}>
        {summary && <><S>README</S><p style={{ fontSize: fontSize, margin: 0, color: '#4b5563', lineHeight: lineHeight * 1.15, padding: '10px 14px', border: `2px solid ${BORDER}`, background: '#fff' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, padding: '10px 14px', border: `2px solid ${BORDER}`, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.15, color: '#065f46' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 600 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2 }}>{'@ '}{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '8px 14px', border: `2px solid ${BORDER}`, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: '#065f46' }}>{edu.degree}{edu.fieldOfStudy ? ` :: ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#94a3b8' }}>{edu.startYear}{edu.endYear ? `-${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#6b7280' }}>{'@ '}{edu.schoolName}{edu.grade ? ` [${edu.grade}]` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '8px 14px', border: `2px solid ${BORDER}`, background: '#fff' }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#065f46' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>[{proj.link}]</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#94a3b8', marginTop: 1 }}>{'stack = ['}{proj.techStack}{']'}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '3px 10px', border: `2px solid ${BORDER}`, background: '#fff', color: '#065f46' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certs</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
