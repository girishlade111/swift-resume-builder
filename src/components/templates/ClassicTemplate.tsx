/**
 * Classic template — Executive elegance with refined serif typography,
 * subtle warm accents, and sophisticated horizontal rules.
 */
import { ResumeData } from '@/types/resume';

const ACCENT = '#1a1a2e';
const RULE = '#c9b99a';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20, marginBottom: 10 }}>
      <h2 style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 3,
        color: ACCENT,
        margin: 0,
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>
        {children}
      </h2>
      <div style={{ height: 1.5, background: `linear-gradient(to right, ${RULE}, transparent)`, marginTop: 4 }} />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '5px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{ fontSize: 10.5, lineHeight: 1.65, marginBottom: 2, paddingLeft: 14, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color: RULE, fontWeight: 700 }}>—</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Palatino Linotype", Palatino, Georgia, serif', fontSize: 10.5, lineHeight: 1.5, color: '#2d2d2d', padding: '40px 44px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
            margin: '0 auto 12px', display: 'block',
            border: `2px solid ${RULE}`, boxShadow: `0 2px 12px rgba(26,26,46,0.1)`,
          }} />
        )}
        <h1 style={{
          fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: 4,
          fontFamily: 'Georgia, "Times New Roman", serif', color: ACCENT,
          textTransform: 'uppercase',
        }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <div style={{ fontSize: 12, color: '#6b6b6b', marginTop: 4, fontStyle: 'italic', letterSpacing: 1 }}>
            {personal.jobTitle}
          </div>
        )}
        <div style={{ width: 40, height: 2, background: RULE, margin: '10px auto 6px' }} />
        {contactParts.length > 0 && (
          <div style={{ fontSize: 9.5, color: '#777', marginTop: 4, letterSpacing: 0.5 }}>
            {contactParts.join('   ·   ')}
          </div>
        )}
        {linkParts.length > 0 && (
          <div style={{ fontSize: 9.5, color: '#777', marginTop: 2, letterSpacing: 0.5 }}>
            {linkParts.join('   ·   ')}
          </div>
        )}
      </div>

      {summary && (
        <>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ fontSize: 10.5, lineHeight: 1.7, margin: 0, color: '#444', fontStyle: 'italic' }}>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 12, color: ACCENT, fontFamily: 'Georgia, serif' }}>
                  {exp.role}
                </strong>
                <span style={{ fontSize: 9.5, color: '#999', flexShrink: 0, marginLeft: 8, fontStyle: 'italic' }}>
                  {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                </span>
              </div>
              <div style={{ fontSize: 10.5, color: '#666', marginTop: 1 }}>
                {[exp.company, exp.location].filter(Boolean).join(' · ')}
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
                <strong style={{ fontSize: 11.5, color: ACCENT, fontFamily: 'Georgia, serif' }}>
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </strong>
                <span style={{ fontSize: 9.5, color: '#999', flexShrink: 0, marginLeft: 8, fontStyle: 'italic' }}>
                  {edu.startYear}{edu.startYear && edu.endYear ? ` – ${edu.endYear}` : ''}
                </span>
              </div>
              <div style={{ fontSize: 10.5, color: '#666' }}>{edu.schoolName}</div>
              {edu.grade && <div style={{ fontSize: 9.5, color: '#888', fontStyle: 'italic' }}>{edu.grade}</div>}
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <strong style={{ fontSize: 11.5, color: ACCENT, fontFamily: 'Georgia, serif' }}>{proj.name}</strong>
              {proj.link && <span style={{ fontSize: 9.5, color: '#888', fontStyle: 'italic' }}> — {proj.link}</span>}
              {proj.techStack && (
                <div style={{ fontSize: 9.5, color: RULE, fontWeight: 600, marginTop: 2 }}>{proj.techStack}</div>
              )}
              <Bullets items={proj.bulletPoints} />
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle>Skills & Expertise</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                fontSize: 9.5, padding: '3px 10px', border: `1px solid ${RULE}`,
                borderRadius: 2, color: ACCENT, letterSpacing: 0.3,
              }}>
                {s}
              </span>
            ))}
          </div>
        </>
      )}

      {extras.certifications && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
            <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#444' }}>{c}</div>
          ))}
        </>
      )}
      {extras.languages && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p style={{ fontSize: 10.5, margin: 0, color: '#444' }}>{extras.languages}</p>
        </>
      )}
      {extras.achievements && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
            <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#444' }}>{a}</div>
          ))}
        </>
      )}
    </div>
  );
}
