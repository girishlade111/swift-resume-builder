/**
 * Classic — Timeless executive template.
 * Navy + champagne gold palette, refined serif headings, clean horizontal rules,
 * elegant spacing. Inspired by top-tier consulting & finance resumes.
 */
import { ResumeData } from '@/types/resume';

const C = {
  navy: '#1b2a4a',
  gold: '#b8960c',
  goldLight: '#d4af37',
  text: '#2c3e50',
  muted: '#6c7a89',
  light: '#f8f6f0',
  rule: '#e8e2d6',
  white: '#ffffff',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 20, height: 1, background: C.gold }} />
        <h2 style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3.5,
          color: C.navy, margin: 0, fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
          {children}
        </h2>
        <div style={{ flex: 1, height: 1, background: C.rule }} />
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  if (!filtered.length) return null;
  return (
    <ul style={{ margin: '6px 0 0 0', padding: 0, listStyle: 'none' }}>
      {filtered.map((b, i) => (
        <li key={i} style={{
          fontSize: 10, lineHeight: 1.7, marginBottom: 2, paddingLeft: 16,
          position: 'relative', color: C.text,
        }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: C.gold, fontWeight: 700 }}>▪</span>
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
    <div style={{
      fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
      fontSize: 10, lineHeight: 1.55, color: C.text,
    }}>
      {/* Header */}
      <div style={{
        background: C.navy, padding: '32px 44px 28px', color: C.white,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        {personal.profileImage && (
          <img src={personal.profileImage} alt="" style={{
            width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
            border: `2.5px solid ${C.goldLight}`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: 3,
            fontFamily: 'Georgia, "Times New Roman", serif',
            textTransform: 'uppercase',
          }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <div style={{
              fontSize: 11, color: C.goldLight, marginTop: 4,
              fontWeight: 400, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>
              {personal.jobTitle}
            </div>
          )}
          {contactParts.length > 0 && (
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 8, letterSpacing: 0.5 }}>
              {contactParts.join('   |   ')}
            </div>
          )}
          {linkParts.length > 0 && (
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 3, letterSpacing: 0.3 }}>
              {linkParts.join('   |   ')}
            </div>
          )}
        </div>
      </div>

      {/* Gold accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight}, transparent)` }} />

      {/* Body */}
      <div style={{ padding: '6px 44px 36px' }}>
        {summary && (
          <>
            <SectionTitle>Professional Summary</SectionTitle>
            <p style={{
              fontSize: 10, lineHeight: 1.75, margin: 0, color: C.muted,
              fontStyle: 'italic', paddingLeft: 16, borderLeft: `2px solid ${C.gold}`,
            }}>
              {summary}
            </p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Professional Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11.5, color: C.navy, fontFamily: 'Georgia, serif' }}>
                    {exp.role}
                  </strong>
                  <span style={{
                    fontSize: 9, color: C.muted, flexShrink: 0, marginLeft: 8,
                    fontStyle: 'italic', fontFamily: 'Georgia, serif',
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.gold, marginTop: 2, fontWeight: 600, fontFamily: '"Segoe UI", sans-serif' }}>
                  {[exp.company, exp.location].filter(Boolean).join('  ·  ')}
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
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 11, color: C.navy, fontFamily: 'Georgia, serif' }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </strong>
                  <span style={{ fontSize: 9, color: C.muted, flexShrink: 0, marginLeft: 8, fontStyle: 'italic' }}>
                    {edu.startYear}{edu.startYear && edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{edu.schoolName}</div>
                {edu.grade && <div style={{ fontSize: 9, color: C.gold, fontStyle: 'italic' }}>{edu.grade}</div>}
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Key Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 11, color: C.navy, fontFamily: 'Georgia, serif' }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 8.5, color: C.muted }}>({proj.link})</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 9, color: C.gold, fontWeight: 600, marginTop: 2, fontFamily: '"Segoe UI", sans-serif' }}>
                    {proj.techStack}
                  </div>
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
                  fontSize: 9, padding: '3px 12px',
                  border: `1px solid ${C.rule}`, borderRadius: 2,
                  color: C.navy, background: C.light, letterSpacing: 0.3,
                  fontFamily: '"Segoe UI", sans-serif', fontWeight: 500,
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
              <div key={i} style={{ fontSize: 10, marginBottom: 3, color: C.text, paddingLeft: 16 }}>
                <span style={{ color: C.gold, marginRight: 6 }}>✦</span>{c}
              </div>
            ))}
          </>
        )}
        {extras.languages && (
          <>
            <SectionTitle>Languages</SectionTitle>
            <p style={{ fontSize: 10, margin: 0, color: C.text, paddingLeft: 16 }}>{extras.languages}</p>
          </>
        )}
        {extras.achievements && (
          <>
            <SectionTitle>Achievements</SectionTitle>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: 10, marginBottom: 3, color: C.text, paddingLeft: 16 }}>
                <span style={{ color: C.gold, marginRight: 6 }}>★</span>{a}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
