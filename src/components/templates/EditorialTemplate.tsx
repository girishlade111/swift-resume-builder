import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

function Bul({ items, fontSize = 10, lineHeight = 1.8 }: { items: string[]; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color: '#374151' }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function EditorialTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#7c2d12';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, "Times New Roman", serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.65;
  const sectionSpacing = settings?.sectionSpacing || 28;

  const BG = '#fffbf5';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.8 }}>
      <h2 style={{ fontSize: fontSize * 1.6, fontWeight: 400, color: accentColor, margin: 0, fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}>{children}</h2>
      <div style={{ width: '100%', height: 1, background: accentColor, marginTop: 4 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#374151', background: BG, minHeight: 1123, paddingBottom: 44 }}>
      <div style={{ padding: '50px 54px 30px', borderBottom: `3px double ${accentColor}` }}>
        <div style={{ textAlign: 'center' }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 74, height: 74, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}`, marginBottom: 12, display: 'inline-block' }} />}
          <h1 style={{ fontSize: fontSize * 3.2, fontWeight: 400, margin: 0, color: accentColor, fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: 3 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.3, color: '#92400e', marginTop: 6, fontStyle: 'italic', letterSpacing: 1 }}>{p.jobTitle}</div>}
          <div style={{ marginTop: 12, fontSize: fontSize * 0.9, color: '#78716c', letterSpacing: 0.5 }}>
            {[p.email, p.phone, p.location].filter(Boolean).join('  |  ')}
          </div>
        </div>
      </div>
      <div style={{ padding: '6px 54px 0' }}>
        {summary && <><S>About</S><p style={{ fontSize: fontSize * 1.05, margin: 0, color: '#57534e', lineHeight: lineHeight * 1.15, fontStyle: 'italic', textIndent: 24 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>
          <div style={{ columnCount: experience.length >= 3 ? 2 : 1, columnGap: 24 }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.7, breakInside: 'avoid' }}>
                <strong style={{ fontSize: fontSize * 1.2, color: accentColor }}>{exp.role}</strong>
                <div style={{ fontSize: fontSize * 0.95, color: '#92400e', marginTop: 2, fontStyle: 'italic' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</div>
                <div style={{ fontSize: fontSize * 0.85, color: '#a8a29e', marginTop: 1 }}><DR exp={exp} /></div>
                <Bul items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
              </div>
            ))}
          </div>
        </>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#a8a29e', fontStyle: 'italic' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: fontSize, color: '#78716c' }}>{edu.schoolName}{edu.grade ? ` - ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>
          <div style={{ columnCount: projects.length >= 3 ? 2 : 1, columnGap: 24 }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: sectionSpacing / 2, breakInside: 'avoid' }}>
                <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: fontSize * 0.85, color: '#a8a29e', marginLeft: 6 }}>{proj.link}</span>}
                {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#78716c', marginTop: 1, fontStyle: 'italic' }}>{proj.techStack}</div>}
                <Bul items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
              </div>
            ))}
          </div>
        </>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {skills.map((s, i) => <div key={i} style={{ fontSize: fontSize, color: '#57534e' }}>{s}</div>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0, fontStyle: 'italic' }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
