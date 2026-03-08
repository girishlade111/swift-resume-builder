/**
 * Left Sidebar template — narrow left column for personal info & skills,
 * right column for experience, education, projects.
 */
import { ResumeData } from '@/types/resume';

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: 6,
      marginTop: 14,
      paddingBottom: 3,
      borderBottom: light ? '1px solid rgba(255,255,255,0.3)' : '1.5px solid #ccc',
      color: light ? '#fff' : '#333',
    }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '3px 0 0 14px', padding: 0, listStyle: 'disc' }}>
      {filtered.map((b, i) => <li key={i} style={{ fontSize: 10.5, lineHeight: 1.5, marginBottom: 2 }}>{b}</li>)}
    </ul>
  );
}

export default function LeftSidebarTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 11, lineHeight: 1.4, color: '#222', display: 'flex', minHeight: '100%' }}>
      {/* Left sidebar */}
      <div style={{ width: 220, flexShrink: 0, background: '#1e293b', color: '#e2e8f0', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#fff', lineHeight: 1.2 }}>{personal.fullName || 'Your Name'}</h1>
        {personal.jobTitle && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{personal.jobTitle}</div>}

        <SectionTitle light>Contact</SectionTitle>
        {personal.email && <div style={{ fontSize: 10, marginBottom: 3, wordBreak: 'break-all' }}>{personal.email}</div>}
        {personal.phone && <div style={{ fontSize: 10, marginBottom: 3 }}>{personal.phone}</div>}
        {personal.location && <div style={{ fontSize: 10, marginBottom: 3 }}>{personal.location}</div>}
        {personal.linkedinUrl && <div style={{ fontSize: 10, marginBottom: 3, wordBreak: 'break-all' }}>{personal.linkedinUrl}</div>}
        {personal.githubUrl && <div style={{ fontSize: 10, marginBottom: 3, wordBreak: 'break-all' }}>{personal.githubUrl}</div>}
        {personal.portfolioUrl && <div style={{ fontSize: 10, marginBottom: 3, wordBreak: 'break-all' }}>{personal.portfolioUrl}</div>}

        {skills.length > 0 && <>
          <SectionTitle light>Skills</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 9, background: 'rgba(255,255,255,0.1)', borderRadius: 3, padding: '2px 6px' }}>{s}</span>
            ))}
          </div>
        </>}

        {extras.languages && <>
          <SectionTitle light>Languages</SectionTitle>
          <div style={{ fontSize: 10 }}>{extras.languages}</div>
        </>}

        {extras.certifications && <>
          <SectionTitle light>Certifications</SectionTitle>
          {extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: 10, marginBottom: 2 }}>{c}</div>)}
        </>}
      </div>

      {/* Right main content */}
      <div style={{ flex: 1, padding: '28px 28px 28px 24px' }}>
        {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: 11, margin: 0, lineHeight: 1.6 }}>{summary}</p></>}

        {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 11.5 }}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#888', flexShrink: 0, marginLeft: 6 }}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</span>
            </div>
            {exp.location && <div style={{ fontSize: 9.5, color: '#888' }}>{exp.location}</div>}
            <Bullets items={exp.bulletPoints} />
          </div>
        ))}</>}

        {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
          <div key={edu.id} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: 11.5 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
              <span style={{ fontSize: 9, color: '#888', flexShrink: 0, marginLeft: 6 }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
            </div>
            <div style={{ fontSize: 11 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
          </div>
        ))}</>}

        {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: 11.5 }}>{proj.name}</strong>
            {proj.link && <span style={{ fontSize: 9.5, color: '#888' }}> — {proj.link}</span>}
            {proj.techStack && <div style={{ fontSize: 9.5, color: '#888', fontStyle: 'italic' }}>{proj.techStack}</div>}
            <Bullets items={proj.bulletPoints} />
          </div>
        ))}</>}

        {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: 11 }}>{a}</div>)}</>}
      </div>
    </div>
  );
}
