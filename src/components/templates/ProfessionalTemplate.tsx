/**
 * Professional template — left border accents, structured spacing.
 */
import { ResumeData } from '@/types/resume';

const ACCENT = '#1e40af';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: ACCENT, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 8, marginBottom: 8, marginTop: 16 }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyle: 'disc' }}>
      {filtered.map((b, i) => <li key={i} style={{ fontSize: 11, lineHeight: 1.5, marginBottom: 2 }}>{b}</li>)}
    </ul>
  );
}

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 11, lineHeight: 1.4, color: '#222', padding: '32px 36px' }}>
      <div style={{ borderBottom: `2px solid ${ACCENT}`, paddingBottom: 10, marginBottom: 4 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: ACCENT }}>{personal.fullName || 'Your Name'}</h1>
        {personal.jobTitle && <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{personal.jobTitle}</div>}
        {contactParts.length > 0 && <div style={{ fontSize: 10, color: '#666', marginTop: 6 }}>{contactParts.join('  |  ')}</div>}
        {linkParts.length > 0 && <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{linkParts.join('  |  ')}</div>}
      </div>

      {summary && (<><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 11, margin: 0, lineHeight: 1.6 }}>{summary}</p></>)}
      {experience.length > 0 && (<><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 12 }}>{exp.role}</strong>
            <span style={{ fontSize: 10, color: '#888' }}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</span>
          </div>
          <div style={{ fontSize: 11, color: '#555' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</div>
          <Bullets items={exp.bulletPoints} />
        </div>
      ))}</>)}
      {education.length > 0 && (<><SectionTitle>Education</SectionTitle>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 12 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
            <span style={{ fontSize: 10, color: '#888' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
          </div>
          <div style={{ fontSize: 11 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
        </div>
      ))}</>)}
      {projects.length > 0 && (<><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 10 }}>
          <strong style={{ fontSize: 12 }}>{proj.name}</strong>
          {proj.link && <span style={{ fontSize: 10, color: '#888' }}> — {proj.link}</span>}
          {proj.techStack && <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic' }}>{proj.techStack}</div>}
          <Bullets items={proj.bulletPoints} />
        </div>
      ))}</>)}
      {skills.length > 0 && (<><SectionTitle>Skills</SectionTitle><p style={{ fontSize: 11, margin: 0 }}>{skills.join('  •  ')}</p></>)}
      {extras.certifications && (<><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 11 }}>{c}</div>)}</>)}
      {extras.languages && (<><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 11, margin: 0 }}>{extras.languages}</p></>)}
      {extras.achievements && (<><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 11 }}>{a}</div>)}</>)}
    </div>
  );
}
