import { ResumeData } from '@/types/resume';

function Bul({ items, color = '#e8e0d0' }: { items: string[]; color?: string }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: '#c9a96e' }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function LuxeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const G = '#c9a96e', BG = '#0a1628', CARD = '#0f1f3a', T = '#e8e0d0';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 26, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 5, color: G, margin: 0, fontFamily: '"Playfair Display", Georgia, serif' }}>{children}</h2>
      <div style={{ flex: 1, height: 0.5, background: 'linear-gradient(90deg, ' + G + ', transparent)' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 10, lineHeight: 1.6, color: T, background: BG, minHeight: 1123 }}>
      <div style={{ padding: '48px 50px 36px', borderBottom: `1px solid ${G}30`, textAlign: 'center' }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${G}`, marginBottom: 14, display: 'inline-block' }} />}
        <h1 style={{ fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: 8, textTransform: 'uppercase', color: '#fff' }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && <div style={{ fontSize: 11, color: G, marginTop: 8, letterSpacing: 4, fontWeight: 500, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>{p.jobTitle}</div>}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: 8.5, color: `${G}aa`, fontFamily: 'system-ui, sans-serif' }}>{c}</span>
          ))}
        </div>
        {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center', gap: 16 }}>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
              <span key={i} style={{ fontSize: 8, color: '#64748b', fontFamily: 'system-ui' }}>{l}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '6px 50px 44px' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: 10, margin: 0, color: '#94a3b8', lineHeight: 1.85, fontFamily: 'system-ui, sans-serif', fontStyle: 'italic', padding: '10px 16px', background: CARD, borderLeft: `2px solid ${G}` }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 18, padding: '12px 16px', background: CARD, borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 12, color: '#fff' }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: G, fontFamily: 'system-ui' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: G, marginTop: 3, fontFamily: 'system-ui', fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</div>
            <Bul items={exp.bulletPoints} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 12, padding: '10px 16px', background: CARD, borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 11, color: '#fff' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#94a3b8' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'system-ui' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 14, padding: '10px 16px', background: CARD, borderRadius: 4 }}>
            <strong style={{ fontSize: 11, color: '#fff' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: 8.5, color: G, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1, fontFamily: 'system-ui' }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: 8.5, padding: '4px 14px', border: `1px solid ${G}60`, color: G, fontFamily: 'system-ui', letterSpacing: 0.5 }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0, fontFamily: 'system-ui' }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0, fontFamily: 'system-ui' }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0, fontFamily: 'system-ui' }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
