/**
 * Minimal template — Swiss/Bauhaus inspired with precise grid,
 * ultra-clean typography, and deliberate negative space.
 */
import { ResumeData } from '@/types/resume';

const TEXT = '#18181b';
const MUTED = '#71717a';
const DIVIDER = '#e4e4e7';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 9,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: 3,
      color: MUTED,
      marginBottom: 10,
      marginTop: 24,
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    }}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '6px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10.5, lineHeight: 1.7, marginBottom: 2, paddingLeft: 12,
          position: 'relative', color: '#3f3f46',
        }}>
          <span style={{ position: 'absolute', left: 0, color: '#a1a1aa' }}>·</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, projects, skills, extras } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.portfolioUrl, personal.linkedinUrl, personal.githubUrl].filter(Boolean);

  return (
    <div style={{ fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif', fontSize: 10.5, lineHeight: 1.6, color: TEXT, padding: '48px 52px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          {personal.profileImage && (
            <img src={personal.profileImage} alt="" style={{
              width: 56, height: 56, borderRadius: 4, objectFit: 'cover', flexShrink: 0,
              filter: 'grayscale(20%)',
            }} />
          )}
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 300, margin: 0, letterSpacing: 2, color: TEXT }}>
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <div style={{ fontSize: 11, color: MUTED, marginTop: 3, fontWeight: 400, letterSpacing: 0.5 }}>
                {personal.jobTitle}
              </div>
            )}
          </div>
        </div>
        <div style={{ height: 1, background: DIVIDER, margin: '14px 0 0' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
          {contactParts.map((c, i) => (
            <span key={i} style={{ fontSize: 9, color: MUTED, letterSpacing: 0.3 }}>{c}</span>
          ))}
          {linkParts.map((l, i) => (
            <span key={`l${i}`} style={{ fontSize: 9, color: MUTED, letterSpacing: 0.3 }}>{l}</span>
          ))}
        </div>
      </div>

      {summary && (
        <>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ fontSize: 10.5, margin: 0, color: '#3f3f46', lineHeight: 1.8 }}>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: 16,
              paddingBottom: idx < experience.length - 1 ? 14 : 0,
              borderBottom: idx < experience.length - 1 ? `1px solid ${DIVIDER}` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{exp.role}</span>
                <span style={{ fontSize: 9, color: MUTED, flexShrink: 0, marginLeft: 8, letterSpacing: 0.5 }}>
                  {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                </span>
              </div>
              <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>
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
                <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT }}>
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </span>
                <span style={{ fontSize: 9, color: MUTED, flexShrink: 0, marginLeft: 8 }}>
                  {edu.startYear}{edu.endYear ? `–${edu.endYear}` : ''}
                </span>
              </div>
              <div style={{ fontSize: 10, color: MUTED }}>
                {[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}
              </div>
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT }}>{proj.name}</span>
              {proj.techStack && (
                <span style={{ fontSize: 9, color: MUTED, marginLeft: 8 }}>{proj.techStack}</span>
              )}
              <Bullets items={proj.bulletPoints} />
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p style={{ fontSize: 10.5, margin: 0, color: '#3f3f46', lineHeight: 1.8 }}>
            {skills.join('  ·  ')}
          </p>
        </>
      )}

      {extras.certifications && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
            <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#3f3f46' }}>{c}</div>
          ))}
        </>
      )}
      {extras.languages && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p style={{ fontSize: 10.5, margin: 0, color: '#3f3f46' }}>{extras.languages}</p>
        </>
      )}
      {extras.achievements && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
            <div key={i} style={{ fontSize: 10.5, marginBottom: 2, color: '#3f3f46' }}>{a}</div>
          ))}
        </>
      )}
    </div>
  );
}
