/**
 * Minimal template — maximum whitespace, light typography.
 */
import { ResumeData } from '@/types/resume';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#999', marginBottom: 8, marginTop: 18 }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyle: 'disc' }}>
      {filtered.map((b, i) => <li key={i} style={{ fontSize: 11, lineHeight: 1.6, marginBottom: 2, color: '#444' }}>{b}</li>)}
    </ul>
  );
}

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: 11, lineHeight: 1.5, color: '#333', padding: '40px 44px' }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 400, margin: 0, letterSpacing: 1 }}>{personal.fullName || 'Your Name'}</h1>
        {personal.jobTitle && <div style={{ fontSize: 12, color: '#888', marginTop: 2, fontWeight: 300 }}>{personal.jobTitle}</div>}
        {contactParts.length > 0 && <div style={{ fontSize: 10, color: '#aaa', marginTop: 8 }}>{contactParts.join('  ·  ')}</div>}
        {linkParts.length > 0 && <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{linkParts.join('  ·  ')}</div>}
      </div>

      {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 11, margin: 0, color: '#555', lineHeight: 1.7 }}>{summary}</p></>}

      {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{exp.role}{exp.company ? `, ${exp.company}` : ''}</div>
          <div style={{ fontSize: 10, color: '#999' }}>{[exp.location, exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' · ')}</div>
          <Bullets items={exp.bulletPoints} />
        </div>
      ))}</>}

      {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
          <div style={{ fontSize: 10, color: '#999' }}>{[edu.schoolName, edu.startYear && edu.endYear ? `${edu.startYear}–${edu.endYear}` : '', edu.grade].filter(Boolean).join(' · ')}</div>
        </div>
      ))}</>}

      {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{proj.name}</div>
          {proj.techStack && <div style={{ fontSize: 10, color: '#999' }}>{proj.techStack}</div>}
          <Bullets items={proj.bulletPoints} />
        </div>
      ))}</>}

      {skills.length > 0 && <><SectionTitle>Skills</SectionTitle><p style={{ fontSize: 11, margin: 0, color: '#555' }}>{skills.join(', ')}</p></>}
      {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 11, color: '#555' }}>{c}</div>)}</>}
      {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: 11, margin: 0, color: '#555' }}>{extras.languages}</p></>}
      {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 11, color: '#555' }}>{a}</div>)}</>}
    </div>
  );
}
