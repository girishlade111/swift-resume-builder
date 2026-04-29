import { ResumeData } from '@/types/resume';

function Bul({ items, color = '#1a1a1a' }: { items: string[]; color?: string }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function SwissTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const R = '#e11d48';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 26, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 4, height: 16, background: R }} />
      <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: '#0f172a', margin: 0, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>{children}</h2>
    </div>
  );
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#1a1a1a', padding: 0, minHeight: 1123 }}>
      <div style={{ padding: '48px 52px 36px', borderBottom: `3px solid ${R}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 68, height: 68, borderRadius: 4, objectFit: 'cover' }} />}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, letterSpacing: 2, color: '#0f172a', lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: 12, color: R, marginTop: 6, fontWeight: 500, letterSpacing: 1 }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: 9, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: R, display: 'inline-block' }} />{c}
            </span>
          ))}
        </div>
        {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
              <span key={i} style={{ fontSize: 8.5, color: '#94a3b8' }}>{l}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '6px 52px 44px' }}>
        {summary && <><S>Profile</S><p style={{ fontSize: 10, margin: 0, color: '#475569', lineHeight: 1.85 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: '2px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 11.5, color: '#0f172a' }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: R, fontWeight: 500 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>{[exp.company, exp.location].filter(Boolean).join(' / ')}</div>
            <Bul items={exp.bulletPoints} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: '2px solid #f1f5f9' }}>
            <strong style={{ fontSize: 11 }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: 8.5, color: R, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: 9.5, padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
