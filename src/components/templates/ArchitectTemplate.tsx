import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, color = '#374151', fontSize = 10, lineHeight = 1.7 }: { items: string[]; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 16, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: '#6b7280', opacity: 0.7, fontFamily: '"Courier New", monospace', fontSize: fontSize * 0.9 }}>&gt;</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function ArchitectTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#334155';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const GRID = '#e2e8f0';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: '#94a3b8', fontWeight: 700 }}>//</span>
      <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accentColor, margin: 0, fontFamily: '"Courier New", monospace' }}>{children}</h2>
      <div style={{ flex: 1, height: 0, borderTop: `1px dashed ${GRID}` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#374151', background: '#fdfdfd', minHeight: 1123, backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`, backgroundSize: '40px 40px', paddingBottom: 44 }}>
      <div style={{ padding: '46px 52px 34px', borderBottom: `2px solid ${accentColor}`, background: 'rgba(253,253,253,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, objectFit: 'cover', border: `2px solid ${accentColor}` }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Courier New", monospace', fontSize: 8, color: '#94a3b8', marginBottom: 4 }}>// CURRICULUM VITAE</div>
            <h1 style={{ fontSize: fontSize * 2.6, fontWeight: 700, margin: 0, color: accentColor, fontFamily: '"Courier New", monospace', letterSpacing: 2 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: '#64748b', marginTop: 4, fontFamily: '"Courier New", monospace' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: '"Courier New", monospace' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.85, color: '#64748b', padding: '3px 8px', border: `1px solid ${GRID}`, background: '#f8fafc' }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '6px 52px 0', background: 'rgba(253,253,253,0.92)' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#6b7280', lineHeight: lineHeight * 1.15, padding: '8px 14px', borderLeft: `3px solid ${accentColor}`, background: '#f8fafc' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, padding: '10px 14px', borderLeft: `3px solid ${GRID}`, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.15, color: accentColor }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.85, color: '#94a3b8', fontFamily: '"Courier New", monospace' }}><DR exp={exp} /></span>
            </div>
            <div style={{ color: '#64748b', marginTop: 2, fontFamily: '"Courier New", monospace', fontSize: fontSize * 0.9 }}>{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '8px 14px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.85, color: '#94a3b8', fontFamily: '"Courier New", monospace' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '8px 14px', borderLeft: `3px solid ${GRID}`, background: '#f8fafc' }}>
            <strong style={{ fontSize: fontSize * 1.1, color: accentColor, fontFamily: '"Courier New", monospace' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: '#64748b', marginLeft: 8, fontFamily: '"Courier New"' }}>[{proj.link}]</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#94a3b8', marginTop: 1, fontFamily: '"Courier New", monospace' }}>stack: {proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '3px 10px', border: `1px solid ${GRID}`, fontFamily: '"Courier New", monospace', background: '#f8fafc' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0, fontFamily: '"Courier New", monospace' }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
