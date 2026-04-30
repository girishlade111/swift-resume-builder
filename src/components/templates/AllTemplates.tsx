/**
 * AllTemplates — 15 enterprise-grade resume templates.
 * Each has a truly unique visual identity, color palette, and layout.
 * Designs inspired by 2025 ATS-friendly trends: clean typography,
 * strategic whitespace, one accent color, consistent spacing.
 */
import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

/* ── Shared helpers ── */
function Bul({ items, char = '•', color = '#333', fontSize = 10, lineHeight = 1.7 }: { items: string[]; char?: string; color?: string; fontSize?: number; lineHeight?: number }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>{char}</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</>;
}

/* ═══════════════════════════════════════════════
   1. EXECUTIVE — Distinguished charcoal + platinum
   ═══════════════════════════════════════════════ */
export function ExecutiveTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#1a1a1a';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.4, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>
      <h2 style={{ fontSize: fontSize * 0.95, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 5, color: accentColor, margin: 0, fontFamily: fontFamilyValue }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1f2937', paddingBottom: 44 }}>
      <div style={{ padding: '42px 50px 32px', borderBottom: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', gap: 22 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 74, height: 74, borderRadius: '50%', objectFit: 'cover', border: '3px solid #9ca3af' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 400, margin: 0, letterSpacing: 6, textTransform: 'uppercase', color: accentColor }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: '#6b7280', marginTop: 5, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.85, color: '#9ca3af', marginTop: 10, fontFamily: 'system-ui, sans-serif', letterSpacing: 0.5 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   ·   ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 50px 0' }}>
        {summary && <><S>Executive Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#6b7280', lineHeight: lineHeight * 1.15, fontStyle: 'italic', borderLeft: '3px solid #e5e7eb', paddingLeft: 14 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Professional Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: accentColor }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: '#9ca3af', fontFamily: 'system-ui', fontStyle: 'italic' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: '#6b7280', marginTop: 2, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="—" color="#1f2937" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#9ca3af' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: fontSize, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Key Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.7 }}>
            <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: '#9ca3af', marginLeft: 8 }}>({proj.link})</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#6b7280', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="—" color="#1f2937" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Core Competencies</S><div style={{ fontSize: fontSize, lineHeight: lineHeight * 1.4, letterSpacing: 0.3 }}>{skills.join('   ·   ')}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: fontSize, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* 2. Creative, 3. Elegant, 4. Bold, 5. Tech, 6. Gradient, 7. Infographic, 8. Timeline, 9. Magazine, 10. Monochrome, 11. Artistic, 12. Corporate, 13. Starter, 14. Academic, 15. Designer ... (batch these) */

export function CreativeTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#d946ef';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 20;

  const SB = '#134e4a';

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e293b', display: 'flex', minHeight: 1123, padding: 0 }}>
      <div style={{ width: 210, flexShrink: 0, background: SB, color: '#a7f3d0', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', border: `3px solid ${accentColor}` }} /></div>}
        <h1 style={{ fontSize: fontSize * 1.7, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: fontSize * 0.85, color: accentColor, marginTop: 5, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22, marginBottom: 6 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0 }}>Contact</h2><div style={{ width: 16, height: 1.5, background: accentColor, marginTop: 4 }} /></div>
        {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: fontSize * 0.85, marginBottom: 5, wordBreak: 'break-all' as const, color: '#a7f3d0' }}>{c}</div>)}
        {skills.length > 0 && <>
          <div style={{ marginTop: 18, marginBottom: 6 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0 }}>Skills</h2><div style={{ width: 16, height: 1.5, background: accentColor, marginTop: 4 }} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.75, background: `${accentColor}25`, borderRadius: 4, padding: '3px 8px', color: '#fae8ff', fontWeight: 500 }}>{s}</span>)}</div>
        </>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Profile</h2></div><p style={{ fontSize: fontSize, margin: '0 0 8px', color: '#64748b', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: fontSize * 1.15, color: '#1e293b' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.75, color: '#fff', background: accentColor, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▹" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: fontSize, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.6 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor }}>↗</span>}</div>
            {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="▹" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
      </div>
    </div>
  );
}

export function ElegantTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#5b1a34';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const G = '#b8960c', BG = '#faf7f0', BD = '#e8dcc8';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.4, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 7, height: 7, background: G, transform: 'rotate(45deg)' }} />
      <h2 style={{ fontSize: fontSize * 0.95, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accentColor, margin: 0, fontFamily: fontFamilyValue }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: BD }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#2d2424', paddingBottom: 44 }}>
      <div style={{ background: accentColor, padding: '38px 46px 30px', color: '#fff', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${G}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.4, fontWeight: 400, margin: 0, letterSpacing: 4, textTransform: 'uppercase' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: G, marginTop: 5, letterSpacing: 2.5, fontWeight: 600, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   ·   ')}</div>
        </div>
      </div>
      <div style={{ height: 3.5, background: `linear-gradient(90deg, ${G}, transparent)` }} />
      <div style={{ padding: '8px 46px 0', background: BG }}>
        {summary && <><S>Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#7c6f6f', fontStyle: 'italic', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.2, color: accentColor }}>{exp.role}</strong><span style={{ fontSize: fontSize * 0.9, color: G, fontStyle: 'italic' }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: fontSize, color: G, marginTop: 2, fontWeight: 600, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="◆" color="#2d2424" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#7c6f6f' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#7c6f6f' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.7 }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: G, marginLeft: 8 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: G, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◆" color="#2d2424" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3px 12px', border: `1px solid ${G}`, color: accentColor, background: '#fff' }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function BoldTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#f59e0b';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.2 }}>
      <div style={{ background: '#000', padding: '5px 14px', display: 'inline-block' }}>
        <h2 style={{ fontSize: fontSize * 0.95, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0 }}>{children}</h2>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#171717', paddingBottom: 44 }}>
      <div style={{ background: '#000', padding: '42px 42px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 76, height: 76, borderRadius: 8, objectFit: 'cover', border: `3px solid ${accentColor}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 3.2, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{p.fullName || 'YOUR NAME'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: accentColor, marginTop: 5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 4 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.55)', padding: '2px 10px', background: 'rgba(245,158,11,0.12)', borderRadius: 3 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: accentColor }} />
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>About</S><p style={{ fontSize: fontSize, margin: 0, color: '#525252', lineHeight: lineHeight * 1.15, borderLeft: `4px solid ${accentColor}`, paddingLeft: 14 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: '#000' }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.8, background: '#000', color: accentColor, padding: '2px 10px', fontWeight: 800 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: '#d97706', marginTop: 2, fontWeight: 700 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▶" color="#171717" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#525252' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#525252' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#d97706', fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▶" color="#171717" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3.5px 12px', background: '#000', color: accentColor, fontWeight: 700 }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function TechTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#58a6ff';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"JetBrains Mono", monospace';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const GN = '#3fb950';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.7, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: accentColor, fontSize: fontSize * 1.2, fontFamily: 'monospace' }}>{'>'}</span>
      <h2 style={{ fontSize: fontSize * 0.95, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, color: '#24292f', margin: 0, fontFamily: 'monospace' }}>{children}</h2>
      <div style={{ flex: 1, height: 1, borderTop: '1px dashed #d0d7de' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#24292f', paddingBottom: 44 }}>
      <div style={{ background: '#0d1117', padding: '34px 42px 28px', display: 'flex', alignItems: 'center', gap: 18, borderBottom: `2px solid ${accentColor}` }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', border: '2px solid #30363d' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.4, fontWeight: 800, margin: 0, color: '#fff', fontFamily: 'monospace' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: accentColor, marginTop: 4, fontFamily: 'monospace', fontWeight: 600 }}>// {p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: fontSize * 0.8, color: '#8b949e', padding: '2px 8px', background: '#30363d', borderRadius: 4, fontFamily: 'monospace' }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>README</S><p style={{ fontSize: fontSize, margin: 0, color: '#57606a', lineHeight: lineHeight * 1.15, padding: '10px 14px', background: '#f6f8fa', borderRadius: 8, border: '1px solid #d0d7de' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5, paddingLeft: 16, borderLeft: `2px solid ${accentColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: fontSize * 1.2 }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.8, color: accentColor, fontFamily: 'monospace', background: '#ddf4ff', padding: '1px 8px', borderRadius: 10 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: GN, marginTop: 2, fontFamily: 'monospace' }}>@ {[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
            <Bul items={exp.bulletPoints} char="$" color="#24292f" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#57606a', fontFamily: 'monospace' }}>{edu.startYear}{edu.endYear ? `..${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#57606a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, padding: '10px 14px', background: '#f6f8fa', borderRadius: 8, border: '1px solid #d0d7de' }}>
            <strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗ {proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: fontSize * 0.85, color: GN, fontFamily: 'monospace', marginTop: 2 }}>stack: [{proj.techStack}]</div>}
            <Bul items={proj.bulletPoints} char="→" color="#24292f" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Tech Stack</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.8, padding: '3px 10px', background: '#ddf4ff', color: '#0969da', borderRadius: 12, fontWeight: 600, fontFamily: 'monospace' }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function GradientTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#4f46e5';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const P = '#7c3aed';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.2, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 3.5, height: 16, background: `linear-gradient(180deg, ${accentColor}, ${P})`, borderRadius: 2 }} />
      <h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e1b4b', margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: '#c7d2fe' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e1b4b', paddingBottom: 44 }}>
      <div style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${P} 100%)`, padding: '38px 42px 30px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.15, color: 'rgba(255,255,255,0.85)', marginTop: 5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.75)', padding: '2px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 12 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#4338ca', lineHeight: lineHeight * 1.15, padding: '10px 14px', background: '#eef2ff', borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: fontSize * 1.2 }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.75, color: '#fff', background: `linear-gradient(90deg, ${accentColor}, ${P})`, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: '#6366f1', marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▸" color="#1e1b4b" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#6366f1' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#6366f1' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#6366f1', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▸" color="#1e1b4b" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3px 12px', background: '#eef2ff', color: accentColor, borderRadius: 14, fontWeight: 600, border: '1px solid #c7d2fe' }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function InfographicTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#0891b2';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 20;

  const TD = '#155e75';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 26, height: 3, background: accentColor, borderRadius: 2 }} />
      <h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: TD, margin: 0 }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#164e63', paddingBottom: 44 }}>
      <div style={{ background: `linear-gradient(135deg, ${TD} 0%, ${accentColor} 100%)`, padding: '34px 42px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.6, fontWeight: 900, margin: 0, color: '#fff' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: '#cffafe', marginTop: 4, fontWeight: 600, letterSpacing: 1.5 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.7)', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: fontSize, margin: 0, color: '#6b7280', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {skills.length > 0 && <><S>Skills Matrix</S><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 18px' }}>{skills.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: fontSize * 0.85, fontWeight: 600, color: TD, minWidth: 80 }}>{s}</span>
            <div style={{ flex: 1, height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${75 + (i * 7) % 25}%`, height: '100%', background: `linear-gradient(90deg, ${accentColor}, ${TD})`, borderRadius: 3 }} />
            </div>
          </div>
        ))}</div></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: fontSize * 1.2, color: TD }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.75, color: '#fff', background: accentColor, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◈" color="#164e63" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: TD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#6b7280' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1, color: TD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: accentColor, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◈" color="#164e63" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
      </div>
    </div>
  );
}

export function TimelineTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#2563eb';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const BD = '#1e3a5f';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.4 }}>
      <h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0, paddingBottom: 6, borderBottom: `2px solid ${accentColor}` }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e293b', paddingBottom: 44 }}>
      <div style={{ padding: '38px 42px 30px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.8, fontWeight: 900, margin: 0, color: BD }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.2, color: accentColor, marginTop: 4, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, #dbeafe)` }} />
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#64748b', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Career Timeline</S>{experience.map((exp, idx) => (
          <div key={exp.id} style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: idx === 0 ? accentColor : '#cbd5e1', flexShrink: 0, marginTop: 2 }} />
              {idx < experience.length - 1 && <div style={{ width: 2, flex: 1, background: '#cbd5e1' }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: sectionSpacing / 1.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: fontSize * 1.2, color: BD }}>{exp.role}</strong>
                <span style={{ fontSize: fontSize * 0.85, color: accentColor, fontWeight: 600 }}><DR exp={exp} /></span>
              </div>
              <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
              <Bul items={exp.bulletPoints} char="•" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} />
            </div>
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.4 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: BD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 2 }}><strong style={{ fontSize: fontSize * 1.1, color: BD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3px 12px', background: '#dbeafe', color: accentColor, borderRadius: 14, fontWeight: 600 }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function MagazineTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#b45309';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.65;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.8 }}>
      <h2 style={{ fontSize: fontSize * 1.5, fontWeight: 400, fontFamily: fontFamilyValue, color: '#1c1917', margin: 0, fontStyle: 'italic', borderBottom: '1px solid #d6d3d1', paddingBottom: 4 }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#292524', padding: '42px 46px', paddingBottom: 60 }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ height: 2, background: '#1c1917', marginBottom: 14 }} />
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px', display: 'block', border: `2px solid ${accentColor}` }} />}
        <h1 style={{ fontSize: fontSize * 3.2, fontWeight: 400, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: '#1c1917' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: fontSize * 1.05, color: accentColor, marginTop: 5, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
        <div style={{ height: 0.75, background: '#d6d3d1', margin: '14px 0 8px' }} />
        <div style={{ fontSize: fontSize * 0.85, color: '#78716c', fontFamily: 'system-ui, sans-serif' }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        <div style={{ height: 2, background: '#1c1917', marginTop: 14 }} />
      </div>
      {summary && <><S>Summary</S><p style={{ fontSize: fontSize, margin: 0, color: '#78716c', lineHeight: lineHeight * 1.15, fontStyle: 'italic' }}>{summary}</p></>}
      <div style={{ columnCount: 2, columnGap: 26, marginTop: 10 }}>
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.6, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#1c1917' }}>{exp.role}</strong>
            <div style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 600, fontFamily: 'system-ui', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')} — <DR exp={exp} /></div>
            <Bul items={exp.bulletPoints} char="–" color="#292524" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: fontSize * 1.1, color: '#1c1917' }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
            <div style={{ fontSize: fontSize * 0.9, color: '#78716c' }}>{edu.schoolName} ({edu.startYear}{edu.endYear ? `–${edu.endYear}` : ''}){edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8, breakInside: 'avoid' as const }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: accentColor, marginTop: 1, fontFamily: 'system-ui' }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="–" color="#292524" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><p style={{ fontSize: fontSize, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{skills.join(' · ')}</p></>}
      </div>
    </div>
  );
}

export function MonochromeTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#000000';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Helvetica Neue", Arial, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 3, display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{ fontSize: fontSize * 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 6, color: accentColor, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: accentColor }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#222', padding: '46px 50px', paddingBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}`, filter: 'grayscale(100%)' }} />}
        <div>
          <h1 style={{ fontSize: fontSize * 3, fontWeight: 300, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: accentColor }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.05, color: '#666', marginTop: 3, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600 }}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{ height: 2, background: accentColor }} />
      <div style={{ fontSize: fontSize * 0.85, color: '#999', marginTop: 10, letterSpacing: 0.5 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   |   ')}</div>
      {summary && <><S>Profile</S><p style={{ fontSize: fontSize, margin: 0, color: '#666', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
      {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: fontSize * 1.2, color: accentColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>{exp.role}</strong>
            <span style={{ fontSize: fontSize * 0.9, color: '#999' }}><DR exp={exp} /></span>
          </div>
          <div style={{ fontSize: fontSize, color: '#666', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
          <Bul items={exp.bulletPoints} char="—" color="#222" fontSize={fontSize} lineHeight={lineHeight} />
        </div>
      ))}</>}
      {education.length > 0 && <><S>Education</S>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.4 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#999' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#666' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
      ))}</>}
      {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: sectionSpacing / 2 }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: '#999', marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#666', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="—" color="#222" fontSize={fontSize} lineHeight={lineHeight} /></div>
      ))}</>}
      {skills.length > 0 && <><S>Skills</S><div style={{ fontSize: fontSize, lineHeight: lineHeight * 1.4 }}>{skills.join('  ·  ')}</div></>}
    </div>
  );
}

export function ArtisticTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#c2410c';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.2 }}>
      <h2 style={{ fontSize: fontSize * 1.3, fontWeight: 300, letterSpacing: 2.5, color: accentColor, margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{children}</h2>
      <div style={{ width: 40, height: 2, background: accentColor, marginTop: 5, borderRadius: 1 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#431407', paddingBottom: 44 }}>
      <div style={{ padding: '46px 46px 34px', background: '#fff7ed', borderBottom: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover', border: `3px solid ${accentColor}`, boxShadow: `0 4px 20px ${accentColor}25` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 3, fontWeight: 300, margin: 0, color: accentColor, fontFamily: 'Georgia, serif', letterSpacing: 1.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.15, color: '#9a3412', marginTop: 5, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.85, color: '#78350f', marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 46px 0' }}>
        {summary && <><S>About Me</S><p style={{ fontSize: fontSize, margin: 0, color: '#78350f', lineHeight: lineHeight * 1.15, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: fontSize * 1.2 }}>{exp.role}</strong>
              <span style={{ fontSize: fontSize * 0.9, color: accentColor, fontStyle: 'italic', fontFamily: 'Georgia' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="✦" color="#431407" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: accentColor }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#78350f' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: accentColor, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="✦" color="#431407" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '4px 14px', background: '#fff7ed', color: accentColor, borderRadius: 20, fontWeight: 600, border: '1px solid #fed7aa' }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function CorporateTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#3b82f6';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 20;

  const SB = '#1e3a5f';

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e293b', display: 'flex', minHeight: 1123, padding: 0 }}>
      <div style={{ width: 200, flexShrink: 0, background: SB, color: '#93c5fd', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}` }} /></div>}
        <h1 style={{ fontSize: fontSize * 1.6, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: fontSize * 0.85, color: accentColor, marginTop: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: fontSize * 0.85, marginBottom: 5, wordBreak: 'break-all' as const, color: '#93c5fd' }}>{c}</div>)}</div>
        {skills.length > 0 && <div style={{ marginTop: 18 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.75, background: 'rgba(59,130,246,0.15)', borderRadius: 3, padding: '2px 7px', color: '#93c5fd' }}>{s}</span>)}</div></div>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Profile</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div><p style={{ fontSize: fontSize, margin: '0 0 4px', color: '#64748b', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Experience</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: fontSize * 1.15 }}>{exp.role}</strong><span style={{ fontSize: fontSize * 0.75, color: '#fff', background: accentColor, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▪" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Education</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Projects</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.6 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▪" color="#1e293b" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
      </div>
    </div>
  );
}

export function StarterTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#16a34a';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 22;

  const GD = '#15803d';

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.7, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, background: accentColor, borderRadius: '50%' }} />
      <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, color: GD, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: '#bbf7d0' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#14532d', paddingBottom: 44 }}>
      <div style={{ padding: '34px 42px 26px', background: '#f0fdf4', borderBottom: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.4, fontWeight: 800, margin: 0, color: GD }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: accentColor, marginTop: 4, fontWeight: 600, letterSpacing: 1.5 }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.85, color: '#166534', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 0' }}>
        {summary && <><S>About Me</S><p style={{ fontSize: fontSize, margin: 0, color: '#166534', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: GD }}>{exp.role}</strong><span style={{ fontSize: fontSize * 0.9, color: accentColor }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: fontSize, color: '#166534', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color="#14532d" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2.2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: GD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#166534' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#166534' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1, color: GD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#166534', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#14532d" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.85, padding: '3px 10px', background: '#f0fdf4', color: GD, borderRadius: 12, fontWeight: 600, border: '1px solid #bbf7d0' }}>{s}</span>)}</div></>}
      </div>
    </div>
  );
}

export function AcademicTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#166534';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Georgia, serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.65;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.4, borderLeft: `4px solid ${accentColor}`, paddingLeft: 10 }}>
      <h2 style={{ fontSize: fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: 0, fontFamily: fontFamilyValue }}>{children}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#052e16', paddingBottom: 44 }}>
      <div style={{ padding: '38px 46px 30px', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.4, fontWeight: 400, margin: 0, letterSpacing: 3 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: fontSize * 1.1, color: '#86efac', marginTop: 4, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.65)', marginTop: 8, fontFamily: 'system-ui' }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 46px 0', background: '#fefce8', minHeight: 800 }}>
        {summary && <><S>Research Interests</S><p style={{ fontSize: fontSize, margin: 0, color: '#365314', lineHeight: lineHeight * 1.15, fontStyle: 'italic' }}>{summary}</p></>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#365314', fontStyle: 'italic' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: fontSize, color: '#365314' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {experience.length > 0 && <><S>Professional Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{exp.role}</strong><span style={{ fontSize: fontSize * 0.9, color: '#365314', fontStyle: 'italic' }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: fontSize, color: '#4d7c0f', marginTop: 1, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color="#052e16" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Research / Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}><strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: '#4d7c0f', marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#4d7c0f', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#052e16" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills & Tools</S><p style={{ fontSize: fontSize, margin: 0, lineHeight: lineHeight * 1.4 }}>{skills.join('  ·  ')}</p></>}
      </div>
    </div>
  );
}

export function DesignerTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#ec4899';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || '"Inter", system-ui, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 20;

  const PKD = '#be185d';

  return (
    <div style={{ fontFamily: fontFamilyValue, fontSize: fontSize, lineHeight: lineHeight, color: '#1e1b4b', display: 'flex', minHeight: 1123, padding: 0 }}>
      <div style={{ width: 210, flexShrink: 0, background: '#fce7f3', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${accentColor}`, boxShadow: `0 4px 20px ${accentColor}20` }} /></div>}
        <h1 style={{ fontSize: fontSize * 1.7, fontWeight: 800, margin: 0, color: PKD, textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: fontSize * 0.85, color: accentColor, marginTop: 5, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: fontSize * 0.85, marginBottom: 5, wordBreak: 'break-all' as const, color: PKD }}>{c}</div>)}</div>
        {skills.length > 0 && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: fontSize * 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: accentColor, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: fontSize * 0.75, background: `${accentColor}20`, borderRadius: 10, padding: '3px 8px', color: PKD, fontWeight: 600 }}>{s}</span>)}</div></div>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor, borderRadius: 2 }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>About</h2></div><p style={{ fontSize: fontSize, margin: '0 0 4px', color: '#6b7280', lineHeight: lineHeight * 1.15 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor, borderRadius: 2 }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: fontSize * 1.15 }}>{exp.role}</strong><span style={{ fontSize: fontSize * 0.75, color: '#fff', background: accentColor, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: fontSize, color: accentColor, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◦" color="#1e1b4b" fontSize={fontSize} lineHeight={lineHeight} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor, borderRadius: 2 }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fontSize * 1.1 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: fontSize * 0.9, color: '#6b7280' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: fontSize, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: accentColor, borderRadius: 2 }} /><h2 style={{ fontSize: fontSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.6 }}><strong style={{ fontSize: fontSize * 1.1 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: '#6b7280', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◦" color="#1e1b4b" fontSize={fontSize} lineHeight={lineHeight} /></div>
        ))}</>}
      </div>
    </div>
  );
}
