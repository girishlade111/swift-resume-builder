import { ResumeData } from '@/types/resume';

function Bul({ items }: { items: string[] }) {
  const f = items.filter(b => b.trim());
  if (!f.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
      {f.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.8, marginBottom: 2, paddingLeft: 14, position: 'relative', color: '#374151' }}>
          <span style={{ position: 'absolute', left: 0, top: 0 }}>-</span>{b}
        </li>
      ))}
    </ul>
  );
}

function DR({ exp }: { exp: { startDate: string; endDate: string; isCurrent: boolean } }) {
  return <>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' - Present' : exp.endDate ? ` - ${exp.endDate}` : '')}</>;
}

export default function EditorialTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const A = '#7c2d12', BG = '#fffbf5';
  const S = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: 28, marginBottom: 10 }}>
      <h2 style={{ fontSize: 16, fontWeight: 400, color: A, margin: 0, fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}>{children}</h2>
      <div style={{ width: '100%', height: 1, background: A, marginTop: 4 }} />
    </div>
  );
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 10, lineHeight: 1.65, color: '#374151', background: BG, minHeight: 1123 }}>
      <div style={{ padding: '50px 54px 30px', borderBottom: `3px double ${A}` }}>
        <div style={{ textAlign: 'center' }}>
          {p.profileImage && <img src={p.profileImage} alt="" style={{ width: 74, height: 74, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${A}`, marginBottom: 12, display: 'inline-block' }} />}
          <h1 style={{ fontSize: 32, fontWeight: 400, margin: 0, color: A, fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: 3 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && <div style={{ fontSize: 13, color: '#92400e', marginTop: 6, fontStyle: 'italic', letterSpacing: 1 }}>{p.jobTitle}</div>}
          <div style={{ marginTop: 12, fontSize: 9, color: '#78716c', letterSpacing: 0.5 }}>
            {[p.email, p.phone, p.location].filter(Boolean).join('  |  ')}
          </div>
          {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
            <div style={{ fontSize: 8.5, color: '#a8a29e', marginTop: 4 }}>
              {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).join('  |  ')}
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '6px 54px 44px' }}>
        {summary && <><S>About</S><p style={{ fontSize: 10.5, margin: 0, color: '#57534e', lineHeight: 1.9, fontStyle: 'italic', textIndent: 24 }}>{summary}</p></>}
        {experience.length > 0 && <><S>Experience</S>
          <div style={{ columnCount: experience.length >= 3 ? 2 : 1, columnGap: 24, columnRule: `1px solid #e7e5e4` }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 16, breakInside: 'avoid' }}>
                <strong style={{ fontSize: 12, color: A }}>{exp.role}</strong>
                <div style={{ fontSize: 9.5, color: '#92400e', marginTop: 2, fontStyle: 'italic' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</div>
                <div style={{ fontSize: 8.5, color: '#a8a29e', marginTop: 1 }}><DR exp={exp} /></div>
                <Bul items={exp.bulletPoints} />
              </div>
            ))}
          </div>
        </>}
        {education.length > 0 && <><S>Education</S>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 11, color: A }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#a8a29e', fontStyle: 'italic' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 10, color: '#78716c' }}>{edu.schoolName}{edu.grade ? ` - ${edu.grade}` : ''}</div>
          </div>
        ))}</>}
        {projects.length > 0 && <><S>Projects</S>
          <div style={{ columnCount: projects.length >= 3 ? 2 : 1, columnGap: 24, columnRule: `1px solid #e7e5e4` }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 14, breakInside: 'avoid' }}>
                <strong style={{ fontSize: 11, color: A }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 8.5, color: '#a8a29e', marginLeft: 6 }}>{proj.link}</span>}
                {proj.techStack && <div style={{ fontSize: 9, color: '#78716c', marginTop: 1, fontStyle: 'italic' }}>{proj.techStack}</div>}
                <Bul items={proj.bulletPoints} />
              </div>
            ))}
          </div>
        </>}
        {skills.length > 0 && <><S>Skills</S>
          <div style={{ columnCount: 3, columnGap: 16 }}>
            {skills.map((s, i) => <div key={i} style={{ fontSize: 10, marginBottom: 3, color: '#57534e' }}>{s}</div>)}
          </div>
        </>}
        {extras.certifications && <><S>Certifications</S><p style={{ fontSize: 10, margin: 0, fontStyle: 'italic' }}>{extras.certifications}</p></>}
        {extras.languages && <><S>Languages</S><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><S>Achievements</S><p style={{ fontSize: 10, margin: 0 }}>{extras.achievements}</p></>}
      </div>
    </div>
  );
}
