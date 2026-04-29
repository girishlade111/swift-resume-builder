import { ResumeData } from '@/types/resume';

function Bul({ items }: { items: string[] }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 16, position: 'relative', color: '#374151' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: '#6b7280', fontFamily: '"Courier New", monospace', fontSize: 9 }}>&gt;</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function ArchitectTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const GRID = '#e2e8f0', A = '#334155';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 26, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: '#94a3b8', fontWeight: 700 }}>//</span>
      <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: A, margin: 0, fontFamily: '"Courier New", monospace' }}>{children}</h2>
      <div style={{ flex: 1, height: 0, borderTop: `1px dashed ${GRID}` }} />
    </div>
  );
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, lineHeight: 1.6, color: '#374151', background: '#fdfdfd', minHeight: 1123, backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      <div style={{ padding: '46px 52px 34px', borderBottom: `2px solid ${A}`, background: 'rgba(253,253,253,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 64, height: 64, objectFit: 'cover', border: `2px solid ${A}` }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Courier New", monospace', fontSize: 8, color: '#94a3b8', marginBottom: 4 }}>// CURRICULUM VITAE</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: A, fontFamily: '"Courier New", monospace', letterSpacing: 2 }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, fontFamily: '"Courier New", monospace' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: '"Courier New", monospace' }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: 8.5, color: '#64748b', padding: '3px 8px', border: `1px solid ${GRID}`, background: '#f8fafc' }}>{c}</span>
          ))}
        </div>
        {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', gap: 14, fontFamily: '"Courier New", monospace' }}>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
              <span key={i} style={{ fontSize: 8, color: '#94a3b8' }}>{l}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '6px 52px 44px', background: 'rgba(253,253,253,0.92)' }}>
        {summary && <><S>Summary</S><p style={{ fontSize: 10, margin: 0, color: '#6b7280', lineHeight: 1.85, padding: '8px 14px', borderLeft: `3px solid ${A}`, background: '#f8fafc' }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 16, padding: '10px 14px', borderLeft: `3px solid ${GRID}`, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 11.5, color: A }}>{exp.role}</strong>
              <span style={{ fontSize: 8.5, color: '#94a3b8', fontFamily: '"Courier New", monospace' }}><DR exp={exp} /></span>
            </div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, fontFamily: '"Courier New", monospace', fontSize: 9 }}>{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <Bul items={exp.bulletPoints} />
          </div>
        ))}</>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10, padding: '8px 14px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 11, color: A }}>{edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 8.5, color: '#94a3b8', fontFamily: '"Courier New", monospace' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>{edu.schoolName}{edu.grade ? ` | ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 14, padding: '8px 14px', borderLeft: `3px solid ${GRID}`, background: '#f8fafc' }}>
            <strong style={{ fontSize: 11, color: A, fontFamily: '"Courier New", monospace' }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: 8.5, color: '#64748b', marginLeft: 8, fontFamily: '"Courier New"' }}>[{proj.link}]</span>}
            {proj.techStack && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1, fontFamily: '"Courier New", monospace' }}>stack: {proj.techStack}</div>}
            <Bul items={proj.bulletPoints} />
          </div>
        ))}</>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: 9, padding: '3px 10px', border: `1px solid ${GRID}`, fontFamily: '"Courier New", monospace', background: '#f8fafc' }}>{s}</span>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0, fontFamily: '"Courier New", monospace' }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
