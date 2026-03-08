/**
 * Compact template — tighter spacing, smaller fonts, maximum content density.
 */
import { ResumeData } from '@/types/resume';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '1px solid #bbb', paddingBottom: 2, marginBottom: 5, marginTop: 10, color: '#333' }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '2px 0 0 14px', padding: 0, listStyle: 'disc' }}>
      {filtered.map((b, i) => <li key={i} style={{ fontSize: 10, lineHeight: 1.4, marginBottom: 1 }}>{b}</li>)}
    </ul>
  );
}

export default function CompactTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 10, lineHeight: 1.3, color: '#222', padding: '24px 28px' }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 6px', display: 'block' }} />
        )}
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{personal.fullName || 'Your Name'}</h1>
        {personal.jobTitle && <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>{personal.jobTitle}</div>}
        {contactParts.length > 0 && <div style={{ fontSize: 9, color: '#666', marginTop: 3 }}>{contactParts.join(' · ')}</div>}
        {linkParts.length > 0 && <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>{linkParts.join(' · ')}</div>}
      </div>

      {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 10, margin: 0, lineHeight: 1.4 }}>{summary}</p></>}

      {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <strong style={{ fontSize: 10.5 }}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</strong>
            <span style={{ fontSize: 9, color: '#777', flexShrink: 0, marginLeft: 6 }}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</span>
          </div>
          {exp.location && <div style={{ fontSize: 9, color: '#777' }}>{exp.location}</div>}
          <Bullets items={exp.bulletPoints} />
        </div>
      ))}</>}

      {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <strong style={{ fontSize: 10.5 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
            <span style={{ fontSize: 9, color: '#777', flexShrink: 0, marginLeft: 6 }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
          </div>
          <div style={{ fontSize: 10 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
        </div>
      ))}</>}

      {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 6 }}>
          <strong style={{ fontSize: 10.5 }}>{proj.name}</strong>
          {proj.link && <span style={{ fontSize: 9, color: '#777' }}> — {proj.link}</span>}
          {proj.techStack && <div style={{ fontSize: 9, color: '#777', fontStyle: 'italic' }}>{proj.techStack}</div>}
          <Bullets items={proj.bulletPoints} />
        </div>
      ))}</>}

      {skills.length > 0 && <><SectionTitle>Skills</SectionTitle><p style={{ fontSize: 10, margin: 0 }}>{skills.join(', ')}</p></>}
      {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 10 }}>{c}</div>)}</>}
      {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 10, margin: 0 }}>{extras.languages}</p></>}
      {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 10 }}>{a}</div>)}</>}
    </div>
  );
}
