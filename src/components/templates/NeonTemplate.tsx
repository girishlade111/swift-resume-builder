import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, fontSize = 10, lineHeight = 1.7 }: { items: string[]; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 16, position: 'relative', color: '#cbd5e1' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: 'inherit', opacity: 0.8 }}>{'>'}</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function NeonTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#22d3ee';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 26;

  const MAGENTA = '#ec4899', BG = '#0a0a0f';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 6, height: 6, background: accentColor, borderRadius: '50%', boxShadow: `0 0 8px ${accentColor}` }} />
      <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accentColor, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#e2e8f0', background: BG, minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '44px 50px 34px', borderBottom: `2px solid ${accentColor}20` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', border: `2px solid ${accentColor}`, boxShadow: `0 0 16px ${accentColor}30` }} />}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 800, margin: 0, color: '#fff', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: MAGENTA, marginTop: 4, fontWeight: 600, textShadow: `0 0 10px ${MAGENTA}50` }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: fontSize * 0.9, color: accentColor, padding: '3px 10px', border: `1px solid ${accentColor}30`, borderRadius: 4, background: `${accentColor}08` }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '6px 50px 0' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: fontSize, margin: 0, color: '#94a3b8', lineHeight: lineHeight * 1.15, padding: '10px 16px', borderLeft: `2px solid ${accentColor}`, background: `${accentColor}06` }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, padding: '12px 16px', borderLeft: `2px solid ${MAGENTA}40`, background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: '#fff' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 600 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: MAGENTA, marginTop: 2, fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.5, padding: '8px 16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#94a3b8' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '8px 16px', borderLeft: `2px solid ${MAGENTA}40`, background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#fff' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.9, padding: '4px 12px', border: `1px solid ${i % 2 === 0 ? accentColor : MAGENTA}40`, borderRadius: 4, color: i % 2 === 0 ? accentColor : MAGENTA, background: `${i % 2 === 0 ? accentColor : MAGENTA}08` }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
