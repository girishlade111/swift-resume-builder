/**
 * Professional — Clean corporate layout with blue accents.
 * Left-bordered section titles, structured spacing, ATS-friendly.
 * Standard format for banking, consulting, and enterprise roles.
 */
import { ResumeData } from '@/types/resume';

const C = {
  blue: '#1e40af',
  blueLight: '#dbeafe',
  blueMuted: '#3b82f6',
  text: '#1e293b',
  muted: '#64748b',
  border: '#e2e8f0',
  bg: '#f8fafc',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5,
      color: C.blue, borderLeft: `3px solid ${C.blue}`, paddingLeft: 10,
      marginBottom: 10, marginTop: 20,
      fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
    }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyle: 'disc' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{ fontSize: 10, lineHeight: 1.65, marginBottom: 2, color: C.text }}>{b}</li>
      ))}
    </ul>
  );
}

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const contact = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif', fontSize: 10, lineHeight: 1.5, color: C.text, padding: '36px 40px' }}>
      <div style={{ borderBottom: `2px solid ${C.blue}`, paddingBottom: 12, marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {p.profileImage && (
            <img src={p.profileImage} alt="" style={{
              width: 64, height: 64, borderRadius: '50%', objectFit: 'cover',
              border: `2px solid ${C.blueLight}`,
            }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: C.blue }}>{p.fullName || 'Your Name'}</h1>
            {p.jobTitle && <div style={{ fontSize: 12, color: C.muted, marginTop: 3, fontWeight: 500 }}>{p.jobTitle}</div>}
            {contact.length > 0 && <div style={{ fontSize: 9, color: C.muted, marginTop: 8 }}>{contact.join('  |  ')}</div>}
            {links.length > 0 && <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{links.join('  |  ')}</div>}
          </div>
        </div>
      </div>

      {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 10, margin: 0, lineHeight: 1.7, color: C.muted }}>{summary}</p></>}

      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 11, color: C.text }}>{exp.role}</strong>
                <span style={{ fontSize: 9, color: C.muted, flexShrink: 0, marginLeft: 8 }}>
                  {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                </span>
              </div>
              <div style={{ fontSize: 10, color: C.blueMuted, fontWeight: 500, marginTop: 1 }}>
                {[exp.company, exp.location].filter(Boolean).join(', ')}
              </div>
              <Bullets items={exp.bulletPoints} />
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 11 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                <span style={{ fontSize: 9, color: C.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <strong style={{ fontSize: 11 }}>{proj.name}</strong>
              {proj.link && <span style={{ fontSize: 9, color: C.muted }}> — {proj.link}</span>}
              {proj.techStack && <div style={{ fontSize: 9, color: C.blueMuted, fontWeight: 500, marginTop: 1 }}>{proj.techStack}</div>}
              <Bullets items={proj.bulletPoints} />
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 9, padding: '3px 10px', background: C.blueLight, color: C.blue, borderRadius: 4, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </>
      )}

      {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 10, marginBottom: 2 }}>{c}</div>)}</>}
      {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10, marginBottom: 2 }}>{a}</div>)}</>}
    </div>
  );
}
