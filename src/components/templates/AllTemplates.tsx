/**
 * AllTemplates — 15 new enterprise-grade resume templates.
 * Each has a unique visual identity, color palette, and layout.
 */
import { ResumeData } from '@/types/resume';

/* ── Shared helpers ── */
function Bul({ items, char = '•', color = '#333' }: { items: string[]; char?: string; color?: string }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.65, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>{char}</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DateRange({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</>;
}

/* ═══════════════════════════════════════════════
   1. EXECUTIVE — Charcoal + Silver, distinguished serif
   ═══════════════════════════════════════════════ */
const EX = { dark: '#1a1a1a', silver: '#9ca3af', silverLight: '#e5e7eb', text: '#1f2937', muted: '#6b7280', bg: '#f9fafb' };

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10, borderBottom: `2px solid ${EX.dark}`, paddingBottom: 4 }}>
      <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: EX.dark, margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.55, color: EX.text }}>
      <div style={{ padding: '40px 48px 28px', borderBottom: `3px solid ${EX.dark}`, display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${EX.silver}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: 4, textTransform: 'uppercase', color: EX.dark }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: EX.silver, marginTop: 4, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: EX.muted, marginTop: 8, fontFamily: 'system-ui, sans-serif' }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
          {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
            <div style={{ fontSize: 8.5, color: EX.silver, marginTop: 2, fontFamily: 'system-ui, sans-serif' }}>{[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).join('  ·  ')}</div>
          )}
        </div>
      </div>
      <div style={{ padding: '8px 48px 36px' }}>
        {summary && <><Sec>Executive Summary</Sec><p style={{ fontSize: 10, margin: 0, color: EX.muted, lineHeight: 1.8, fontStyle: 'italic', borderLeft: `3px solid ${EX.silverLight}`, paddingLeft: 14 }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Professional Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 12, color: EX.dark }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: EX.silver, fontFamily: 'system-ui', fontStyle: 'italic' }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: EX.muted, marginTop: 2, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="—" color={EX.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: EX.dark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: EX.silver }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: 10, color: EX.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><Sec>Key Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}>
            <strong style={{ fontSize: 11, color: EX.dark }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: EX.silver, marginLeft: 8 }}>({proj.link})</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: EX.muted, marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="—" color={EX.text} />
          </div>
        ))}</>}
        {skills.length > 0 && <><Sec>Core Competencies</Sec><div style={{ fontSize: 10, color: EX.text, lineHeight: 2 }}>{skills.join('  ·  ')}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. CREATIVE — Teal sidebar + magenta accents
   ═══════════════════════════════════════════════ */
const CR = { sidebar: '#134e4a', accent: '#d946ef', accentLight: '#fae8ff', text: '#1e293b', muted: '#64748b', sText: '#a7f3d0' };

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: CR.text, display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 210, flexShrink: 0, background: CR.sidebar, color: CR.sText, padding: '36px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', border: `3px solid ${CR.accent}` }} /></div>}
        <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 9, color: CR.accent, marginTop: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 20, marginBottom: 6 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CR.accent, margin: 0 }}>Contact</h2><div style={{ width: 16, height: 2, background: CR.accent, marginTop: 4 }} /></div>
        {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: CR.sText }}>{c}</div>)}
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <>
          <div style={{ marginTop: 16, marginBottom: 6 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CR.accent, margin: 0 }}>Links</h2><div style={{ width: 16, height: 2, background: CR.accent, marginTop: 4 }} /></div>
          {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#94a3b8' }}>{l}</div>)}
        </>}
        {skills.length > 0 && <>
          <div style={{ marginTop: 16, marginBottom: 6 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CR.accent, margin: 0 }}>Skills</h2><div style={{ width: 16, height: 2, background: CR.accent, marginTop: 4 }} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8, background: 'rgba(217,70,239,0.15)', borderRadius: 4, padding: '3px 8px', color: '#fae8ff', fontWeight: 500 }}>{s}</span>)}</div>
        </>}
        {extras.languages && <><div style={{ marginTop: 16, marginBottom: 6 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CR.accent, margin: 0 }}>Languages</h2></div><div style={{ fontSize: 9, color: CR.sText }}>{extras.languages}</div></>}
        {extras.certifications && <><div style={{ marginTop: 16, marginBottom: 6 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CR.accent, margin: 0 }}>Certifications</h2></div>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 3, color: CR.sText }}>{c}</div>)}</>}
      </div>
      <div style={{ flex: 1, padding: '36px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: CR.accent }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CR.text, margin: 0 }}>Profile</h2></div><p style={{ fontSize: 10, margin: '0 0 8px', color: CR.muted, lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: CR.accent }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CR.text, margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 11.5, color: CR.text }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: '#fff', background: CR.accent, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: CR.accent, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▹" color={CR.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: CR.accent }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CR.text, margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: CR.text }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: CR.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div>
            <div style={{ fontSize: 10, color: CR.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: CR.accent }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CR.text, margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><strong style={{ fontSize: 11, color: CR.text }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: CR.accent }}>↗ {proj.link}</span>}</div>
            {proj.techStack && <div style={{ fontSize: 9, color: CR.muted, marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} char="▹" color={CR.text} />
          </div>
        ))}</>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: CR.accent }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CR.text, margin: 0 }}>Achievements</h2></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: CR.accent, marginRight: 6 }}>★</span>{a}</div>)}</>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. ELEGANT — Burgundy + gold cream, refined serif
   ═══════════════════════════════════════════════ */
const EL = { burg: '#6b1d3a', gold: '#c9a96e', text: '#2d2424', muted: '#7c6f6f', cream: '#fdf6ee', border: '#e8ddd0' };

export function ElegantTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 8, height: 8, background: EL.gold, transform: 'rotate(45deg)' }} />
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5, color: EL.burg, margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: EL.border }} />
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Palatino Linotype", serif', fontSize: 10, lineHeight: 1.55, color: EL.text }}>
      <div style={{ background: EL.burg, padding: '36px 44px 28px', color: '#fff', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${EL.gold}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: 3, textTransform: 'uppercase' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: EL.gold, marginTop: 4, letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('   ·   ')}</div>
          {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).join('   ·   ')}</div>}
        </div>
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${EL.gold}, transparent)` }} />
      <div style={{ padding: '6px 44px 36px', background: EL.cream }}>
        {summary && <><Sec>Summary</Sec><p style={{ fontSize: 10, margin: 0, color: EL.muted, fontStyle: 'italic', lineHeight: 1.8 }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 12, color: EL.burg }}>{exp.role}</strong><span style={{ fontSize: 9, color: EL.gold, fontStyle: 'italic' }}><DateRange exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: EL.gold, marginTop: 2, fontWeight: 600, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} char="◆" color={EL.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: EL.burg }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: EL.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: EL.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: EL.burg }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: EL.gold, marginLeft: 8 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: EL.gold, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◆" color={EL.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '3px 12px', border: `1px solid ${EL.gold}`, borderRadius: 2, color: EL.burg, background: '#fff' }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   4. BOLD — Black + amber, high contrast
   ═══════════════════════════════════════════════ */
const BO = { black: '#000000', amber: '#f59e0b', amberDark: '#d97706', text: '#171717', muted: '#525252', bg: '#fefce8' };

export function BoldTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 10, background: BO.black, padding: '5px 12px', display: 'inline-block' }}>
      <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, color: BO.amber, margin: 0, fontFamily: '"Inter", system-ui' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: BO.text }}>
      <div style={{ background: BO.black, padding: '40px 40px 30px', display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 76, height: 76, borderRadius: 6, objectFit: 'cover', border: `3px solid ${BO.amber}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{p.fullName || 'YOUR NAME'}</h1>
          {p.jobTitle && <div style={{ fontSize: 13, color: BO.amber, marginTop: 4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', padding: '2px 8px', background: 'rgba(245,158,11,0.15)', borderRadius: 3 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: BO.amber }} />
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>About</Sec><p style={{ fontSize: 10, margin: 0, color: BO.muted, lineHeight: 1.8, borderLeft: `4px solid ${BO.amber}`, paddingLeft: 12 }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: BO.black }}>{exp.role}</strong>
              <span style={{ fontSize: 8.5, background: BO.black, color: BO.amber, padding: '2px 10px', fontWeight: 800 }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: BO.amberDark, marginTop: 2, fontWeight: 700 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▶" color={BO.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: BO.black }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: BO.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: BO.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: BO.black }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: BO.amber, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: BO.amberDark, fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▶" color={BO.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '4px 12px', background: BO.black, color: BO.amber, fontWeight: 700, borderRadius: 2 }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. TECH — GitHub-dark inspired, cyan accents
   ═══════════════════════════════════════════════ */
const TK = { bg: '#0d1117', border: '#30363d', cyan: '#58a6ff', green: '#3fb950', text: '#c9d1d9', muted: '#8b949e', bodyBg: '#ffffff', bodyText: '#24292f' };

export function TechTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: TK.cyan, fontSize: 14, fontFamily: 'monospace' }}>{'>'}</span>
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: TK.bodyText, margin: 0, fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: '#d0d7de', borderStyle: 'dashed' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: TK.bodyText }}>
      <div style={{ background: TK.bg, padding: '32px 40px 26px', display: 'flex', alignItems: 'center', gap: 18, borderBottom: `2px solid ${TK.cyan}` }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', border: `2px solid ${TK.border}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: '#fff', fontFamily: '"JetBrains Mono", monospace' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: TK.cyan, marginTop: 3, fontFamily: 'monospace', fontWeight: 600 }}>// {p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8.5, color: TK.muted, padding: '2px 8px', background: TK.border, borderRadius: 4, fontFamily: 'monospace' }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>README</Sec><p style={{ fontSize: 10, margin: 0, color: '#57606a', lineHeight: 1.8, padding: '8px 12px', background: '#f6f8fa', borderRadius: 6, border: '1px solid #d0d7de' }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${TK.cyan}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: TK.bodyText }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: TK.cyan, fontFamily: 'monospace', background: '#ddf4ff', padding: '1px 8px', borderRadius: 10 }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: TK.green, marginTop: 2, fontFamily: 'monospace' }}>@ {[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
            <Bul items={exp.bulletPoints} char="$" color={TK.bodyText} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: TK.bodyText }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#57606a', fontFamily: 'monospace' }}>{edu.startYear}{edu.endYear ? `..${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#57606a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12, padding: '8px 12px', background: '#f6f8fa', borderRadius: 6, border: '1px solid #d0d7de' }}>
            <strong style={{ fontSize: 11, color: TK.bodyText }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: TK.cyan, marginLeft: 6 }}>↗ {proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 8.5, color: TK.green, fontFamily: 'monospace', marginTop: 2 }}>stack: [{proj.techStack}]</div>}
            <Bul items={proj.bulletPoints} char="→" color={TK.bodyText} />
          </div>
        ))}</>}
        {skills.length > 0 && <><Sec>Tech Stack</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '3px 10px', background: '#ddf4ff', color: '#0969da', borderRadius: 12, fontWeight: 600, fontFamily: 'monospace' }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. GRADIENT — Indigo-purple gradient header
   ═══════════════════════════════════════════════ */
const GR = { indigo: '#4f46e5', purple: '#7c3aed', text: '#1e1b4b', muted: '#6366f1', light: '#eef2ff', border: '#c7d2fe' };

export function GradientTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 4, height: 16, background: `linear-gradient(180deg, ${GR.indigo}, ${GR.purple})`, borderRadius: 2 }} />
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: GR.text, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: GR.border }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: GR.text }}>
      <div style={{ background: `linear-gradient(135deg, ${GR.indigo} 0%, ${GR.purple} 100%)`, padding: '36px 40px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#fff', letterSpacing: -0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', padding: '2px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 12 }}>{c}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>Summary</Sec><p style={{ fontSize: 10, margin: 0, color: '#4338ca', lineHeight: 1.8, padding: '8px 14px', background: GR.light, borderRadius: 8, borderLeft: `3px solid ${GR.indigo}` }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: GR.text }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: '#fff', background: `linear-gradient(90deg, ${GR.indigo}, ${GR.purple})`, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: GR.muted, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▸" color={GR.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: GR.text }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: GR.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#6366f1' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: GR.text }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: GR.indigo, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: GR.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▸" color={GR.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '3px 12px', background: GR.light, color: GR.indigo, borderRadius: 14, fontWeight: 600, border: `1px solid ${GR.border}` }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. INFOGRAPHIC — Visual skills + teal accent
   ═══════════════════════════════════════════════ */
const IG = { teal: '#0891b2', tealDark: '#155e75', tealLight: '#ecfeff', text: '#164e63', muted: '#6b7280', border: '#cffafe' };

export function InfographicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 18, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 28, height: 3, background: IG.teal, borderRadius: 2 }} />
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: IG.tealDark, margin: 0 }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: IG.text }}>
      <div style={{ background: `linear-gradient(135deg, ${IG.tealDark} 0%, ${IG.teal} 100%)`, padding: '32px 40px 26px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, color: '#fff' }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: IG.border, marginTop: 3, fontWeight: 600, letterSpacing: 1 }}>{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <span key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.75)', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>Profile</Sec><p style={{ fontSize: 10, margin: 0, color: IG.muted, lineHeight: 1.8 }}>{summary}</p></>}
        {skills.length > 0 && <><Sec>Skills Matrix</Sec><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>{skills.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: IG.tealDark, minWidth: 80 }}>{s}</span>
            <div style={{ flex: 1, height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${70 + Math.random() * 30}%`, height: '100%', background: `linear-gradient(90deg, ${IG.teal}, ${IG.tealDark})`, borderRadius: 3 }} />
            </div>
          </div>
        ))}</div></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 12, color: IG.tealDark }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: '#fff', background: IG.teal, padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: IG.teal, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◈" color={IG.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: IG.tealDark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: IG.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: IG.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: IG.tealDark }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: IG.teal, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: IG.teal, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◈" color={IG.text} /></div>
        ))}</>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   8. TIMELINE — Connected vertical timeline
   ═══════════════════════════════════════════════ */
const TL = { blue: '#2563eb', blueDark: '#1e3a5f', blueLight: '#dbeafe', text: '#1e293b', muted: '#64748b', border: '#cbd5e1' };

export function TimelineTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10 }}>
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, color: TL.blue, margin: 0, paddingBottom: 6, borderBottom: `2px solid ${TL.blue}` }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: TL.text }}>
      <div style={{ padding: '36px 40px 28px', background: '#fff', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${TL.blue}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: TL.blueDark }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: TL.blue, marginTop: 3, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: TL.muted, marginTop: 6 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${TL.blue}, ${TL.blueLight})` }} />
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>Summary</Sec><p style={{ fontSize: 10, margin: 0, color: TL.muted, lineHeight: 1.8 }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Career Timeline</Sec>{experience.map((exp, idx) => (
          <div key={exp.id} style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: idx === 0 ? TL.blue : TL.border, border: `2px solid ${idx === 0 ? TL.blue : TL.border}`, flexShrink: 0, marginTop: 2 }} />
              {idx < experience.length - 1 && <div style={{ width: 2, flex: 1, background: TL.border }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 12, color: TL.blueDark }}>{exp.role}</strong>
                <span style={{ fontSize: 8.5, color: TL.blue, fontWeight: 600 }}><DateRange exp={exp} /></span>
              </div>
              <div style={{ fontSize: 10, color: TL.blue, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
              <Bul items={exp.bulletPoints} char="•" color={TL.text} />
            </div>
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: TL.blueDark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: TL.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: TL.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: TL.blueDark }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: TL.blue, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: TL.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color={TL.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '3px 12px', background: TL.blueLight, color: TL.blue, borderRadius: 14, fontWeight: 600 }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   9. MAGAZINE — Editorial newspaper style
   ═══════════════════════════════════════════════ */
const MG = { dark: '#1c1917', accent: '#b45309', text: '#292524', muted: '#78716c', border: '#d6d3d1', cream: '#faf5ef' };

export function MagazineTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 8 }}>
      <h2 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'Georgia, "Times New Roman", serif', color: MG.dark, margin: 0, fontStyle: 'italic', borderBottom: `1px solid ${MG.border}`, paddingBottom: 4 }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.6, color: MG.text, padding: '40px 44px' }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ height: 2, background: MG.dark, marginBottom: 12 }} />
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px', display: 'block', border: `2px solid ${MG.accent}` }} />}
        <h1 style={{ fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: 6, textTransform: 'uppercase', fontFamily: 'Georgia, serif', color: MG.dark }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 11, color: MG.accent, marginTop: 4, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
        <div style={{ height: 1, background: MG.border, margin: '12px 0 6px' }} />
        <div style={{ fontSize: 9, color: MG.muted, fontFamily: 'system-ui, sans-serif' }}>{[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).join('  ·  ')}</div>
        <div style={{ height: 2, background: MG.dark, marginTop: 12 }} />
      </div>
      {summary && <><Sec>Summary</Sec><p style={{ fontSize: 10, margin: 0, color: MG.muted, lineHeight: 1.85, fontStyle: 'italic' }}>{summary}</p></>}
      <div style={{ columnCount: 2, columnGap: 24, marginTop: 8 }}>
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: 11, color: MG.dark }}>{exp.role}</strong>
            <div style={{ fontSize: 9, color: MG.accent, fontWeight: 600, fontFamily: 'system-ui', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')} — <DateRange exp={exp} /></div>
            <Bul items={exp.bulletPoints} char="–" color={MG.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10, breakInside: 'avoid' as const }}>
            <strong style={{ fontSize: 11, color: MG.dark }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
            <div style={{ fontSize: 9, color: MG.muted }}>{edu.schoolName} ({edu.startYear}{edu.endYear ? `–${edu.endYear}` : ''}){edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12, breakInside: 'avoid' as const }}><strong style={{ fontSize: 11, color: MG.dark }}>{proj.name}</strong>{proj.techStack && <div style={{ fontSize: 9, color: MG.accent, marginTop: 1, fontFamily: 'system-ui' }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="–" color={MG.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><p style={{ fontSize: 10, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{skills.join(' · ')}</p></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   10. MONOCHROME — Pure black & white
   ═══════════════════════════════════════════════ */
const MC = { black: '#000', text: '#222', muted: '#666', light: '#999', border: '#ddd' };

export function MonochromeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 5, color: MC.black, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: MC.black }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: 10, lineHeight: 1.55, color: MC.text, padding: '44px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 6 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #000', filter: 'grayscale(100%)' }} />}
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, letterSpacing: 6, textTransform: 'uppercase', color: MC.black }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: MC.muted, marginTop: 2, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{ height: 2, background: MC.black }} />
      <div style={{ fontSize: 9, color: MC.light, marginTop: 8, letterSpacing: 0.5 }}>{[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).join('   |   ')}</div>
      {summary && <><Sec>Profile</Sec><p style={{ fontSize: 10, margin: 0, color: MC.muted, lineHeight: 1.8 }}>{summary}</p></>}
      {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 12, color: MC.black, textTransform: 'uppercase', letterSpacing: 0.5 }}>{exp.role}</strong>
            <span style={{ fontSize: 9, color: MC.light }}><DateRange exp={exp} /></span>
          </div>
          <div style={{ fontSize: 10, color: MC.muted, marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' — ')}</div>
          <Bul items={exp.bulletPoints} char="—" color={MC.text} />
        </div>
      ))}</>}
      {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: MC.black }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: MC.light }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: MC.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
      ))}</>}
      {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: MC.black }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: MC.light, marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: 9, color: MC.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="—" color={MC.text} /></div>
      ))}</>}
      {skills.length > 0 && <><Sec>Skills</Sec><div style={{ fontSize: 10, lineHeight: 2 }}>{skills.join('  ·  ')}</div></>}
      {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
      {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   11. ARTISTIC — Warm terracotta + cream
   ═══════════════════════════════════════════════ */
const AR = { terra: '#c2410c', terraLight: '#fff7ed', text: '#431407', muted: '#9a3412', border: '#fed7aa', cream: '#fffbeb' };

export function ArtisticTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 10 }}>
      <h2 style={{ fontSize: 13, fontWeight: 300, letterSpacing: 2, color: AR.terra, margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{children}</h2>
      <div style={{ width: 40, height: 2, background: AR.terra, marginTop: 4, borderRadius: 1 }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: AR.text }}>
      <div style={{ padding: '44px 44px 32px', background: AR.terraLight, borderBottom: `3px solid ${AR.terra}`, display: 'flex', alignItems: 'center', gap: 20 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover', border: `3px solid ${AR.terra}`, boxShadow: '0 4px 20px rgba(194,65,12,0.2)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, color: AR.terra, fontFamily: 'Georgia, serif', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 12, color: AR.muted, marginTop: 4, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: '#78350f', marginTop: 8 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '8px 44px 36px' }}>
        {summary && <><Sec>About Me</Sec><p style={{ fontSize: 10, margin: 0, color: '#78350f', lineHeight: 1.85, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 12, color: AR.text }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: AR.terra, fontStyle: 'italic', fontFamily: 'Georgia' }}><DateRange exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: AR.terra, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="✦" color={AR.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: AR.text }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: AR.terra }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#78350f' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: AR.text }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: AR.terra, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: AR.terra, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="✦" color={AR.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '4px 14px', background: AR.terraLight, color: AR.terra, borderRadius: 20, fontWeight: 600, border: `1px solid ${AR.border}` }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   12. CORPORATE — Navy sidebar + steel blue
   ═══════════════════════════════════════════════ */
const CO = { sidebar: '#1e3a5f', accent: '#3b82f6', sText: '#93c5fd', text: '#1e293b', muted: '#64748b', border: '#e2e8f0' };

export function CorporateTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: CO.text, display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 200, flexShrink: 0, background: CO.sidebar, color: CO.sText, padding: '36px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${CO.accent}` }} /></div>}
        <h1 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#fff', textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 9, color: CO.accent, marginTop: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 20 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CO.accent, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: CO.sText }}>{c}</div>)}</div>
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CO.accent, margin: '0 0 6px' }}>Links</h2>{[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#94a3b8' }}>{l}</div>)}</div>}
        {skills.length > 0 && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CO.accent, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8, background: 'rgba(59,130,246,0.15)', borderRadius: 3, padding: '2px 7px', color: CO.sText }}>{s}</span>)}</div></div>}
        {extras.languages && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CO.accent, margin: '0 0 4px' }}>Languages</h2><div style={{ fontSize: 9, color: CO.sText }}>{extras.languages}</div></div>}
        {extras.certifications && <div style={{ marginTop: 16 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: CO.accent, margin: '0 0 4px' }}>Certifications</h2>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 3, color: CO.sText }}>{c}</div>)}</div>}
      </div>
      <div style={{ flex: 1, padding: '36px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CO.text, margin: 0 }}>Profile</h2><div style={{ flex: 1, height: 1.5, background: CO.border }} /></div><p style={{ fontSize: 10, margin: '0 0 4px', color: CO.muted, lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CO.text, margin: 0 }}>Experience</h2><div style={{ flex: 1, height: 1.5, background: CO.border }} /></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: 11.5, color: CO.text }}>{exp.role}</strong><span style={{ fontSize: 8, color: '#fff', background: CO.accent, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DateRange exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: CO.accent, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="▪" color={CO.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CO.text, margin: 0 }}>Education</h2><div style={{ flex: 1, height: 1.5, background: CO.border }} /></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: CO.text }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: CO.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: CO.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CO.text, margin: 0 }}>Projects</h2><div style={{ flex: 1, height: 1.5, background: CO.border }} /></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: CO.text }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: CO.accent, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: CO.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="▪" color={CO.text} /></div>
        ))}</>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: CO.text, margin: 0 }}>Achievements</h2><div style={{ flex: 1, height: 1.5, background: CO.border }} /></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: CO.accent, marginRight: 6 }}>★</span>{a}</div>)}</>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   13. STARTER — Soft green pastel, beginner-friendly
   ═══════════════════════════════════════════════ */
const ST = { green: '#16a34a', greenDark: '#15803d', greenLight: '#f0fdf4', text: '#14532d', muted: '#4ade80', border: '#bbf7d0' };

export function StarterTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, background: ST.green, borderRadius: '50%' }} />
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: ST.greenDark, margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: ST.border }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.55, color: ST.text }}>
      <div style={{ padding: '32px 40px 24px', background: ST.greenLight, borderBottom: `3px solid ${ST.green}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${ST.green}` }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: ST.greenDark }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: ST.green, marginTop: 3, fontWeight: 600, letterSpacing: 1 }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: '#166534', marginTop: 6 }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '8px 40px 36px' }}>
        {summary && <><Sec>About Me</Sec><p style={{ fontSize: 10, margin: 0, color: '#166534', lineHeight: 1.8 }}>{summary}</p></>}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: ST.greenDark }}>{exp.role}</strong><span style={{ fontSize: 9, color: ST.green }}><DateRange exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: '#166534', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color={ST.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: ST.greenDark }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#166534' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#166534' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: ST.greenDark }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: ST.green, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: '#166534', marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color={ST.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '3px 10px', background: ST.greenLight, color: ST.greenDark, borderRadius: 12, fontWeight: 600, border: `1px solid ${ST.border}` }}>{s}</span>)}</div></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   14. ACADEMIC — Forest green, scholarly
   ═══════════════════════════════════════════════ */
const AC = { green: '#166534', greenLight: '#f0fdf4', text: '#052e16', muted: '#4d7c0f', border: '#86efac', ivory: '#fefce8' };

export function AcademicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 22, marginBottom: 10, borderLeft: `4px solid ${AC.green}`, paddingLeft: 10 }}>
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: AC.green, margin: 0, fontFamily: 'Georgia, serif' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.6, color: AC.text }}>
      <div style={{ padding: '36px 44px 28px', background: AC.green, color: '#fff', display: 'flex', alignItems: 'center', gap: 18 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: 2 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 11, color: '#86efac', marginTop: 3, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>}
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 6, fontFamily: 'system-ui' }}>{[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}</div>
        </div>
      </div>
      <div style={{ padding: '8px 44px 36px', background: AC.ivory }}>
        {summary && <><Sec>Research Interests / Summary</Sec><p style={{ fontSize: 10, margin: 0, color: '#365314', lineHeight: 1.85, fontStyle: 'italic' }}>{summary}</p></>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: AC.green }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: '#365314', fontStyle: 'italic' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: '#365314' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {experience.length > 0 && <><Sec>Professional Experience</Sec>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: AC.green }}>{exp.role}</strong><span style={{ fontSize: 9, color: '#365314', fontStyle: 'italic' }}><DateRange exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: AC.muted, marginTop: 1, fontFamily: 'system-ui' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="•" color={AC.text} />
          </div>
        ))}</>}
        {projects.length > 0 && <><Sec>Research / Projects</Sec>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: AC.green }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: AC.muted, marginLeft: 8 }}>({proj.link})</span>}{proj.techStack && <div style={{ fontSize: 9, color: AC.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="•" color={AC.text} /></div>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills & Tools</Sec><p style={{ fontSize: 10, margin: 0, lineHeight: 2 }}>{skills.join('  ·  ')}</p></>}
        {extras.certifications && <><Sec>Certifications</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><Sec>Languages</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><Sec>Awards & Achievements</Sec><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   15. DESIGNER — Pink creative portfolio sidebar
   ═══════════════════════════════════════════════ */
const DS = { pink: '#ec4899', pinkDark: '#be185d', pinkLight: '#fdf2f8', sidebar: '#fce7f3', text: '#1e1b4b', muted: '#6b7280' };

export function DesignerTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: DS.text, display: 'flex', minHeight: '100%' }}>
      <div style={{ width: 210, flexShrink: 0, background: DS.sidebar, padding: '36px 18px' }}>
        {p.profileImage && <div style={{ textAlign: 'center', marginBottom: 14 }}><img src={p.profileImage} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${DS.pink}`, boxShadow: '0 4px 20px rgba(236,72,153,0.25)' }} /></div>}
        <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: DS.pinkDark, textAlign: 'center' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 9, color: DS.pink, marginTop: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 20 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: DS.pink, margin: '0 0 6px' }}>Contact</h2>{[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 5, wordBreak: 'break-all' as const, color: DS.pinkDark }}>{c}</div>)}</div>
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <div style={{ marginTop: 14 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: DS.pink, margin: '0 0 6px' }}>Portfolio</h2>{[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((l, i) => <div key={i} style={{ fontSize: 8, marginBottom: 4, wordBreak: 'break-all' as const, color: '#9ca3af' }}>{l}</div>)}</div>}
        {skills.length > 0 && <div style={{ marginTop: 14 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: DS.pink, margin: '0 0 6px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map((s, i) => <span key={i} style={{ fontSize: 8, background: 'rgba(236,72,153,0.12)', borderRadius: 10, padding: '3px 8px', color: DS.pinkDark, fontWeight: 600 }}>{s}</span>)}</div></div>}
        {extras.languages && <div style={{ marginTop: 14 }}><h2 style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: DS.pink, margin: '0 0 4px' }}>Languages</h2><div style={{ fontSize: 9, color: DS.pinkDark }}>{extras.languages}</div></div>}
      </div>
      <div style={{ flex: 1, padding: '36px 28px' }}>
        {summary && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>About</h2></div><p style={{ fontSize: 10, margin: '0 0 4px', color: DS.muted, lineHeight: 1.75 }}>{summary}</p></>}
        {experience.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>Experience</h2></div>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: 11.5, color: DS.text }}>{exp.role}</strong><span style={{ fontSize: 8, color: '#fff', background: DS.pink, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}><DateRange exp={exp} /></span></div>
            <div style={{ fontSize: 10, color: DS.pink, marginTop: 2, fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
            <Bul items={exp.bulletPoints} char="◦" color={DS.text} />
          </div>
        ))}</>}
        {education.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>Education</h2></div>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: 11, color: DS.text }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong><span style={{ fontSize: 9, color: DS.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span></div><div style={{ fontSize: 10, color: DS.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div></div>
        ))}</>}
        {projects.length > 0 && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>Projects</h2></div>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12 }}><strong style={{ fontSize: 11, color: DS.text }}>{proj.name}</strong>{proj.link && <span style={{ fontSize: 8.5, color: DS.pink, marginLeft: 6 }}>↗</span>}{proj.techStack && <div style={{ fontSize: 9, color: DS.muted, marginTop: 1 }}>{proj.techStack}</div>}<Bul items={proj.bulletPoints} char="◦" color={DS.text} /></div>
        ))}</>}
        {extras.certifications && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>Certifications</h2></div><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.achievements && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 }}><div style={{ width: 20, height: 3, background: DS.pink, borderRadius: 2 }} /><h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: DS.text, margin: 0 }}>Achievements</h2></div>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ color: DS.pink, marginRight: 6 }}>✦</span>{a}</div>)}</>}
      </div>
    </div>
  );
}
