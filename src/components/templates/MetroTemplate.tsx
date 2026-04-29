import { ResumeData } from '@/types/resume';

function Bul({ items, color = '#1e293b' }: { items: string[]; color?: string }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 14, position: 'relative', color }}>
          <span style={{ position: 'absolute', left: 0, top: 0, fontWeight: 700 }}>+</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function MetroTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const A = '#0078d4', L = '#f0f6ff';
  const Tile = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginTop: 22 }}>
      <div style={{ background: A, padding: '7px 16px', display: 'inline-block', marginBottom: 12 }}>
        <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#fff', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
  return (
    <div style={{ fontFamily: '"Segoe UI", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#1e293b', minHeight: 1123 }}>
      <div style={{ background: A, padding: '44px 50px 34px', display: 'flex', alignItems: 'center', gap: 22 }}>
        {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 72, height: 72, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 300, margin: 0, color: '#fff', letterSpacing: 1 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontWeight: 600 }}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{ background: L, padding: '10px 50px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
          <span key={i} style={{ fontSize: 9, color: A, fontWeight: 500 }}>{c}</span>
        ))}
        {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
          <span key={`l${i}`} style={{ fontSize: 8.5, color: '#64748b' }}>{l}</span>
        ))}
      </div>
      <div style={{ padding: '4px 50px 40px' }}>
        {summary && <Tile title="About"><p style={{ fontSize: 10, margin: 0, color: '#475569', lineHeight: 1.8, background: L, padding: '10px 14px' }}>{summary}</p></Tile>}
        {experience.length > 0 && <Tile title="Experience">{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16, padding: '10px 14px', background: L }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 12, color: '#0f172a' }}>{exp.role}</strong>
              <span style={{ fontSize: 9, color: A, fontWeight: 600 }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: A, marginTop: 2, fontWeight: 500 }}>{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <Bul items={exp.bulletPoints} />
          </div>
        ))}</Tile>}
        {education.length > 0 && <Tile title="Education">{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10, padding: '8px 14px', background: L }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#64748b' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</Tile>}
        {projects.length > 0 && <Tile title="Projects">{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 12, padding: '8px 14px', background: L }}>
            <strong style={{ fontSize: 11 }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: 8.5, color: A, marginLeft: 8 }}>{proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{proj.techStack}</div>}
            <Bul items={proj.bulletPoints} />
          </div>
        ))}</Tile>}
        {skills.length > 0 && <Tile title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '4px 12px', background: A, color: '#fff', fontWeight: 500 }}>{s}</span>)}
          </div>
        </Tile>}
        {extras.certifications && <Tile title="Certifications"><p style={{ fontSize: 10, margin: 0 }}>{extras.certifications}</p></Tile>}
        {extras.languages && <Tile title="Languages"><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></Tile>}
        {extras.achievements && <Tile title="Achievements"><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></Tile>}
      </div>
    </div>
  );
}
