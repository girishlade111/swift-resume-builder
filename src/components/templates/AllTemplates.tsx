/**
 * AllTemplates — 15 enterprise-grade resume templates.
 * Each has a truly unique visual identity, color palette, and layout.
 * Designs inspired by 2025 ATS-friendly trends: clean typography,
 * strategic whitespace, one accent color, consistent spacing.
 */
import { ResumeData } from '@/types/resume';

/* ── Shared helpers ── */
function Bul({ items, char = '•', color = '#333' }: { items: string[]; char?: string; color?: string }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
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
export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 24, marginBottom: 10, borderBottom: '2px solid #1a1a1a', paddingBottom: 4 }}>
      <h2 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 5, color: '#1a1a1a', margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.6, color: '#1f2937' }}>
      <div style={{ padding: '42px 50px 32px', borderBottom: '3px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 22 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 74, height: 74, borderRadius: '50%', objectFit: 'cover', border: '3px solid #9ca3af' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: 6, textTransform: 'uppercase', color: '#1a1a1a' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 5, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 8.5, color: '#9ca3af', marginTop: 10, fontFamily: 'system-ui, sans-serif', letterSpacing: 0.5 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   ·   ')}</div>
          {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
            <div style={{ fontSize: 8, color: '#d1d5db', marginTop: 3, fontFamily: 'system-ui' }}>{[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).join('   ·   ')}</div>
          )}
        </div>
      </div>
      <div style={{ padding: '10px 50px 40px' }}>
        {summary && <><S>Executive Summary</S><p style={{ fontSize: 10, margin: 0, color: '#6b7280', lineHeight: 1.85, fontStyle: 'italic', borderLeft: '3px solid #e5e7eb', paddingLeft: 14 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Professional Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 12, color: '#1a1a1a' }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'system-ui', fontStyle: 'italic' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="—" color="#1f2937" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: '#1a1a1a' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#9ca3af' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Key Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 14 }}>
            <strong style={{ fontSize: 11, color: '#1a1a1a' }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: '#9ca3af', marginLeft: 8 }}>({proj.link})</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: '#6b7280', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="—" color="#1f2937" />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Core Competencies</S><div style={{ fontSize: 10, lineHeight: 2.2, letterSpacing: 0.3 }}>{skills.join('   ·   ')}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. CREATIVE — Emerald sidebar + rose accents
   ═══════════════════════════════════════════════ */
export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const A = '#d946ef', SB = '#134e4a';
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: '#1e293b', display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 210, flexShrink: 0, background: SB, color: '#a7f3d0', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', border: `3px solid ${A}` }} /></div>}
        <h1 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 8.5, color: A, marginTop: 5, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22, marginBottom: 6 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>Contact</h2><div style={{ width: 16, height: 1.5, background: A, marginTop: 4 }} /></div>
        {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: '#a7f3d0' }}>{c}</div>)}
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <>
          <div style={{ marginTop: 18, marginBottom: 6 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>Links</h2><div style={{ width: 16, height: 1.5, background: A, marginTop: 4 }} /></div>
          {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#94a3b8' }}>{l}</div>)}
        </>}
        {skills.length > 0 && <>
          <div style={{ marginTop: 18, marginBottom: 6 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>Skills</h2><div style={{ width: 16, height: 1.5, background: A, marginTop: 4 }} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 7.5, background: 'rgba(217,70,239,0.15)', borderRadius: 4, padding: '3px 8px', color: '#fae8ff', fontWeight: 500 }}>{s}</span>)}</div>
        </>}
        {extras.languages && <><div style={{ marginTop: 18, marginBottom: 6 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>Languages</h2></div><div style={{ fontSize: 9, color: '#a7f3d0' }}>{extras.languages}</div></>}
        {extras.certifications && <><div style={{ marginTop: 18, marginBottom: 6 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>Certifications</h2></div>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 3, color: '#a7f3d0' }}>{c}</div>)}</>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: A }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Profile</h2></div><p style={{ fontSize: 10, margin: '0 0 8px', color: '#64748b', lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: A }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 11.5, color: '#1e293b' }}>{exp.role}</strong>
              <span style={{ fontSize: 7.5, color: '#fff', background: A, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: A, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▹" color="#1e293b" />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: A }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: A }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: A }}>↗</span>}</div>
            {proj.techStack && <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="▹" color="#1e293b" />
          </div>
        ))}</>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: A }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e293b', margin: 0 }}>Achievements</h2></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: A, marginRight: 6 }}>★</span>{a}</div>)}</>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. ELEGANT — Deep wine + antique gold
   ═══════════════════════════════════════════════ */
export function ElegantTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const W = '#5b1a34', G = '#b8960c', BG = '#faf7f0', BD = '#e8dcc8';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 24, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 7, height: 7, background: G, transform: 'rotate(45deg)' }} />
      <h2 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: W, margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: BD }} />
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Palatino Linotype", serif', fontSize: 10, lineHeight: 1.6, color: '#2d2424' }}>
      <div style={{ background: W, padding: '38px 46px 30px', color: '#fff', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${G}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: 4, textTransform: 'uppercase' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: G, marginTop: 5, letterSpacing: 2.5, fontWeight: 600, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   ·   ')}</div>
          {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).join('   ·   ')}</div>}
        </div>
      </div>
      <div style={{ height: 3.5, background: `linear-gradient(90deg, ${G}, transparent)` }} />
      <div style={{ padding: '8px 46px 40px', background: BG }}>
        {summary && <><S>Summary</S><p style={{ fontSize: 10, margin: 0, color: '#7c6f6f', fontStyle: 'italic', lineHeight: 1.85 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 12, color: W }}>{exp.role}</strong><span style={{ fontSize: 9, color: G, fontStyle: 'italic' }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: G, marginTop: 2, fontWeight: 600, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="◆" color="#2d2424" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: W }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#7c6f6f' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#7c6f6f' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 14 }}><strong style={{ fontSize: 11, color: W }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: G, marginLeft: 8 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: G, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◆" color="#2d2424" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3px 12px', border: `1px solid ${G}`, color: W, background: '#fff' }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   4. BOLD — Pure black + amber, high contrast
   ═══════════════════════════════════════════════ */
export function BoldTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const A = '#f59e0b';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10 }}>
      <div style={{ background: '#000', padding: '5px 14px', display: 'inline-block' }}>
        <h2 style={{ fontSize: 9.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: 0 }}>{children}</h2>
      </div>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#171717' }}>
      <div style={{ background: '#000', padding: '42px 42px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 76, height: 76, borderRadius: 8, objectFit: 'cover', border: `3px solid ${A}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{p.fullName || 'YOUR NAME'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: A, marginTop: 5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 4 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', padding: '2px 10px', background: 'rgba(245,158,11,0.12)', borderRadius: 3 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: A }} />
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>About</S><p style={{ fontSize: 10, margin: 0, color: '#525252', lineHeight: 1.8, borderLeft: `4px solid ${A}`, paddingLeft: 14 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: '#000' }}>{exp.role}</strong>
              <span style={{ fontSize: 8, background: '#000', color: A, padding: '2px 10px', fontWeight: 800 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: '#d97706', marginTop: 2, fontWeight: 700 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▶" color="#171717" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#525252' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#525252' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: A, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#d97706', fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▶" color="#171717" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3.5px 12px', background: '#000', color: A, fontWeight: 700 }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. TECH — GitHub-dark inspired, cyan accents
   ═══════════════════════════════════════════════ */
export function TechTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const CY = '#58a6ff', GN = '#3fb950';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: CY, fontSize: 12, fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>{'>'}</span>
      <h2 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, color: '#24292f', margin: 0, fontFamily: '"JetBrains Mono", monospace' }}>{children}</h2>
      <div style={{ flex: 1, height: 1, borderTop: '1px dashed #d0d7de' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#24292f' }}>
      <div style={{ background: '#0d1117', padding: '34px 42px 28px', display: 'flex', alignItems: 'center', gap: 18, borderBottom: `2px solid ${CY}` }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', border: '2px solid #30363d' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: '#fff', fontFamily: '"JetBrains Mono", monospace' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: CY, marginTop: 4, fontFamily: 'monospace', fontWeight: 600 }}>// {p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8, color: '#8b949e', padding: '2px 8px', background: '#30363d', borderRadius: 4, fontFamily: 'monospace' }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>README</S><p style={{ fontSize: 10, margin: 0, color: '#57606a', lineHeight: 1.8, padding: '10px 14px', background: '#f6f8fa', borderRadius: 8, border: '1px solid #d0d7de' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `2px solid ${CY}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12 }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: CY, fontFamily: 'monospace', background: '#ddf4ff', padding: '1px 8px', borderRadius: 10 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: GN, marginTop: 2, fontFamily: 'monospace' }}>@ {[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
            <Bul items={exp.bulletPoints} char="$" color="#24292f" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#57606a', fontFamily: 'monospace' }}>{edu.startYear}{edu.endYear ? `..${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#57606a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12, padding: '10px 14px', background: '#f6f8fa', borderRadius: 8, border: '1px solid #d0d7de' }}>
            <strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: CY, marginLeft: 6 }}>↗ {proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 8.5, color: GN, fontFamily: 'monospace', marginTop: 2 }}>stack: [{proj.techStack}]</div>}
            <Bul items={proj.bulletPoints} char="→" color="#24292f" />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Tech Stack</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8, padding: '3px 10px', background: '#ddf4ff', color: '#0969da', borderRadius: 12, fontWeight: 600, fontFamily: 'monospace' }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. GRADIENT — Indigo-violet gradient header
   ═══════════════════════════════════════════════ */
export function GradientTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const I = '#4f46e5', P = '#7c3aed';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 3.5, height: 16, background: `linear-gradient(180deg, ${I}, ${P})`, borderRadius: 2 }} />
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e1b4b', margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: '#c7d2fe' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#1e1b4b' }}>
      <div style={{ background: `linear-gradient(135deg, ${I} 0%, ${P} 100%)`, padding: '38px 42px 30px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.75)', padding: '2px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 12 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: 10, margin: 0, color: '#4338ca', lineHeight: 1.8, padding: '10px 14px', background: '#eef2ff', borderRadius: 8, borderLeft: `3px solid ${I}` }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12 }}>{exp.role}</strong>
              <span style={{ fontSize: 7.5, color: '#fff', background: `linear-gradient(90deg, ${I}, ${P})`, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: '#6366f1', marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▸" color="#1e1b4b" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#6366f1' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#6366f1' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: I, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#6366f1', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▸" color="#1e1b4b" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3px 12px', background: '#eef2ff', color: I, borderRadius: 14, fontWeight: 600, border: '1px solid #c7d2fe' }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. INFOGRAPHIC — Teal with visual skill bars
   ═══════════════════════════════════════════════ */
export function InfographicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const T = '#0891b2', TD = '#155e75';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 26, height: 3, background: T, borderRadius: 2 }} />
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: TD, margin: 0 }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#164e63' }}>
      <div style={{ background: `linear-gradient(135deg, ${TD} 0%, ${T} 100%)`, padding: '34px 42px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, color: '#fff' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: '#cffafe', marginTop: 4, fontWeight: 600, letterSpacing: 1.5 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.7)', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: 10, margin: 0, color: '#6b7280', lineHeight: 1.8 }}>{summary}</p></>}
        {skills.length > 0 && <><S>Skills Matrix</S><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 18px' }}>{skills.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8.5, fontWeight: 600, color: TD, minWidth: 80 }}>{s}</span>
            <div style={{ flex: 1, height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${75 + (i * 7) % 25}%`, height: '100%', background: `linear-gradient(90deg, ${T}, ${TD})`, borderRadius: 3 }} />
            </div>
          </div>
        ))}</div></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: TD }}>{exp.role}</strong>
              <span style={{ fontSize: 7.5, color: '#fff', background: T, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: T, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◈" color="#164e63" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: TD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#6b7280' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: TD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: T, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: T, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◈" color="#164e63" /></div>
        ))}</>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   8. TIMELINE — Vertical timeline experience
   ═══════════════════════════════════════════════ */
export function TimelineTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const B = '#2563eb', BD = '#1e3a5f';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 24, marginBottom: 10 }}>
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3.5, color: B, margin: 0, paddingBottom: 6, borderBottom: `2px solid ${B}` }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#1e293b' }}>
      <div style={{ padding: '38px 42px 30px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${B}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: BD }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: B, marginTop: 4, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${B}, #dbeafe)` }} />
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: 10, margin: 0, color: '#64748b', lineHeight: 1.8 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Career Timeline</S>{experience.map((exp, idx) => (
          <div key={exp.id} style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: idx === 0 ? B : '#cbd5e1', flexShrink: 0, marginTop: 2 }} />
              {idx < experience.length - 1 && <div style={{ width: 2, flex: 1, background: '#cbd5e1' }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 12, color: BD }}>{exp.role}</strong>
                <span style={{ fontSize: 8.5, color: B, fontWeight: 600 }}><DR exp={exp} /></span>
              </div>
              <div style={{ fontSize: 10, color: B, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
              <Bul items={exp.bulletPoints} char="•" color="#1e293b" />
            </div>
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: BD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: BD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: B, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#1e293b" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3px 12px', background: '#dbeafe', color: B, borderRadius: 14, fontWeight: 600 }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   9. MAGAZINE — Editorial newspaper style
   ═══════════════════════════════════════════════ */
export function MagazineTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const A = '#b45309';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 8 }}>
      <h2 style={{ fontSize: 15, fontWeight: 400, fontFamily: 'Georgia, "Times New Roman", serif', color: '#1c1917', margin: 0, fontStyle: 'italic', borderBottom: '1px solid #d6d3d1', paddingBottom: 4 }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.65, color: '#292524', padding: '42px 46px' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ height: 2, background: '#1c1917', marginBottom: 14 }} />
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px', display: 'block', border: `2px solid ${A}` }} />}
        <h1 style={{ fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: '#1c1917' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 10.5, color: A, marginTop: 5, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
        <div style={{ height: 0.75, background: '#d6d3d1', margin: '14px 0 8px' }} />
        <div style={{ fontSize: 8.5, color: '#78716c', fontFamily: 'system-ui, sans-serif' }}>{[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).join('  ·  ')}</div>
        <div style={{ height: 2, background: '#1c1917', marginTop: 14 }} />
      </div>
      {summary && <><S>Summary</S><p style={{ fontSize: 10, margin: 0, color: '#78716c', lineHeight: 1.9, fontStyle: 'italic' }}>{summary}</p></>}
      <div style={{ columnCount: 2, columnGap: 26, marginTop: 10 }}>
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: 11, color: '#1c1917' }}>{exp.role}</strong>
            <div style={{ fontSize: 9, color: A, fontWeight: 600, fontFamily: 'system-ui', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')} — <DR exp={exp} /></div>
            <Bul items={exp.bulletPoints} char="–" color="#292524" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: 11, color: '#1c1917' }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
            <div style={{ fontSize: 9, color: '#78716c' }}>{edu.schoolName} ({edu.startYear}{edu.endYear ? `–${edu.endYear}` : ''}){edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12, breakInside: 'avoid' as const }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.techStack && <div style={{ fontSize: 9, color: A, marginTop: 1, fontFamily: 'system-ui' }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="–" color="#292524" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><p style={{ fontSize: 10, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{skills.join(' · ')}</p></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   10. MONOCHROME — Pure black & white
   ═══════════════════════════════════════════════ */
export function MonochromeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 6, color: '#000', margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: '#000' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#222', padding: '46px 50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #000', filter: 'grayscale(100%)' }} />}
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: '#000' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 10.5, color: '#666', marginTop: 3, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600 }}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{ height: 2, background: '#000' }} />
      <div style={{ fontSize: 8.5, color: '#999', marginTop: 10, letterSpacing: 0.5 }}>{[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).join('   |   ')}</div>
      {summary && <><S>Profile</S><p style={{ fontSize: 10, margin: 0, color: '#666', lineHeight: 1.85 }}>{summary}</p></>}
      {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 12, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>{exp.role}</strong>
            <span style={{ fontSize: 9, color: '#999' }}><DR exp={exp} /></span>
          </div>
          <div style={{ fontSize: 10, color: '#666', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
          <Bul items={exp.bulletPoints} char="—" color="#222" />
        </div>
      ))}</>}
      {education.length > 0 && <><S>Education</S>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#999' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#666' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
      ))}</>}
      {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: '#999', marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="—" color="#222" /></div>
      ))}</>}
      {skills.length > 0 && <><S>Skills</S><div style={{ fontSize: 10, lineHeight: 2.2 }}>{skills.join('  ·  ')}</div></>}
      {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
      {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   11. ARTISTIC — Warm terracotta + cream
   ═══════════════════════════════════════════════ */
export function ArtisticTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const T = '#c2410c';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10 }}>
      <h2 style={{ fontSize: 13, fontWeight: 300, letterSpacing: 2.5, color: T, margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{children}</h2>
      <div style={{ width: 40, height: 2, background: T, marginTop: 5, borderRadius: 1 }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#431407' }}>
      <div style={{ padding: '46px 46px 34px', background: '#fff7ed', borderBottom: `3px solid ${T}`, display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover', border: `3px solid ${T}`, boxShadow: '0 4px 20px rgba(194,65,12,0.15)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, color: T, fontFamily: 'Georgia, serif', letterSpacing: 1.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11.5, color: '#9a3412', marginTop: 5, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 8.5, color: '#78350f', marginTop: 10 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 46px 38px' }}>
        {summary && <><S>About Me</S><p style={{ fontSize: 10, margin: 0, color: '#78350f', lineHeight: 1.9, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 12 }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: T, fontStyle: 'italic', fontFamily: 'Georgia' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: T, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="✦" color="#431407" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: T }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#78350f' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: T, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: T, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="✦" color="#431407" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '4px 14px', background: '#fff7ed', color: T, borderRadius: 20, fontWeight: 600, border: '1px solid #fed7aa' }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   12. CORPORATE — Navy sidebar + steel blue
   ═══════════════════════════════════════════════ */
export function CorporateTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const SB = '#1e3a5f', A = '#3b82f6';
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: '#1e293b', display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 200, flexShrink: 0, background: SB, color: '#93c5fd', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${A}` }} /></div>}
        <h1 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 8.5, color: A, marginTop: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: '#93c5fd' }}>{c}</div>)}</div>
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <div style={{ marginTop: 18 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: '0 0 6px' }}>Links</h2>{[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#94a3b8' }}>{l}</div>)}</div>}
        {skills.length > 0 && <div style={{ marginTop: 18 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 7.5, background: 'rgba(59,130,246,0.15)', borderRadius: 3, padding: '2px 7px', color: '#93c5fd' }}>{s}</span>)}</div></div>}
        {extras.languages && <div style={{ marginTop: 18 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: '0 0 4px' }}>Languages</h2><div style={{ fontSize: 9, color: '#93c5fd' }}>{extras.languages}</div></div>}
        {extras.certifications && <div style={{ marginTop: 18 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: A, margin: '0 0 4px' }}>Certifications</h2>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 3, color: '#93c5fd' }}>{c}</div>)}</div>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Profile</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div><p style={{ fontSize: 10, margin: '0 0 4px', color: '#64748b', lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Experience</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: 11.5 }}>{exp.role}</strong><span style={{ fontSize: 7.5, color: '#fff', background: A, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: A, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▪" color="#1e293b" />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Education</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Projects</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: A, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▪" color="#1e293b" /></div>
        ))}</>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: '#1e293b', margin: 0 }}>Achievements</h2><div style={{ flex: 1, height: 1.5, background: '#e2e8f0' }} /></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: A, marginRight: 6 }}>★</span>{a}</div>)}</>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   13. STARTER — Soft green, beginner-friendly
   ═══════════════════════════════════════════════ */
export function StarterTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const G = '#16a34a', GD = '#15803d';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, background: G, borderRadius: '50%' }} />
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, color: GD, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 0.75, background: '#bbf7d0' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#14532d' }}>
      <div style={{ padding: '34px 42px 26px', background: '#f0fdf4', borderBottom: `3px solid ${G}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${G}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: GD }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: G, marginTop: 4, fontWeight: 600, letterSpacing: 1.5 }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 8.5, color: '#166534', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 42px 38px' }}>
        {summary && <><S>About Me</S><p style={{ fontSize: 10, margin: 0, color: '#166534', lineHeight: 1.8 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: GD }}>{exp.role}</strong><span style={{ fontSize: 9, color: G }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: '#166534', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color="#14532d" />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: GD }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#166534' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#166534' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: GD }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: G, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#166534', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#14532d" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3px 10px', background: '#f0fdf4', color: GD, borderRadius: 12, fontWeight: 600, border: '1px solid #bbf7d0' }}>{s}</span>)}</div></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   14. ACADEMIC — Forest green, scholarly
   ═══════════════════════════════════════════════ */
export function AcademicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const G = '#166534';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 24, marginBottom: 10, borderLeft: `4px solid ${G}`, paddingLeft: 10 }}>
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: G, margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.65, color: '#052e16' }}>
      <div style={{ padding: '38px 46px 30px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: 3 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: '#86efac', marginTop: 4, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.65)', marginTop: 8, fontFamily: 'system-ui' }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 46px 38px', background: '#fefce8' }}>
        {summary && <><S>Research Interests / Summary</S><p style={{ fontSize: 10, margin: 0, color: '#365314', lineHeight: 1.9, fontStyle: 'italic' }}>{summary}</p></>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: G }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#365314', fontStyle: 'italic' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#365314' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {experience.length > 0 && <><S>Professional Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: G }}>{exp.role}</strong><span style={{ fontSize: 9, color: '#365314', fontStyle: 'italic' }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: '#4d7c0f', marginTop: 1, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color="#052e16" />
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Research / Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: G }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: '#4d7c0f', marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#4d7c0f', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color="#052e16" /></div>
        ))}</>}
        {skills.length > 0 && <><S>Skills & Tools</S><p style={{ fontSize: 10, margin: 0, lineHeight: 2.2 }}>{skills.join('  ·  ')}</p></>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Awards & Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   15. DESIGNER — Rose-pink creative portfolio
   ═══════════════════════════════════════════════ */
export function DesignerTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const PK = '#ec4899', PKD = '#be185d';
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: '#1e1b4b', display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 210, flexShrink: 0, background: '#fce7f3', padding: '38px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${PK}`, boxShadow: '0 4px 20px rgba(236,72,153,0.2)' }} /></div>}
        <h1 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: PKD, textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 8.5, color: PK, marginTop: 5, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 22 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: PK, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: PKD }}>{c}</div>)}</div>
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: PK, margin: '0 0 6px' }}>Portfolio</h2>{[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#9ca3af' }}>{l}</div>)}</div>}
        {skills.length > 0 && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: PK, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 7.5, background: 'rgba(236,72,153,0.12)', borderRadius: 10, padding: '3px 8px', color: PKD, fontWeight: 600 }}>{s}</span>)}</div></div>}
        {extras.languages && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: PK, margin: '0 0 4px' }}>Languages</h2><div style={{ fontSize: 9, color: PKD }}>{extras.languages}</div></div>}
      </div>
      <div style={{ flex: 1, padding: '38px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>About</h2></div><p style={{ fontSize: 10, margin: '0 0 4px', color: '#6b7280', lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: 11.5 }}>{exp.role}</strong><span style={{ fontSize: 7.5, color: '#fff', background: PK, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DR exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: PK, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◦" color="#1e1b4b" />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#6b7280' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11 }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: PK, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#6b7280', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◦" color="#1e1b4b" /></div>
        ))}</>}
        {extras.certifications && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Certifications</h2></div><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: PK, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#1e1b4b', margin: 0 }}>Achievements</h2></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: PK, marginRight: 6 }}>✦</span>{a}</div>)}</>}
      </div>
    </div>
  );
}
