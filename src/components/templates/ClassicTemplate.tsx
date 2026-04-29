import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

export default function ClassicTemplate({ data, settings }: { data: ResumeData, settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#0f1b2d';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Inter, sans-serif';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 20;

  const contact = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean);

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2 style={{
          fontSize: fontSize * 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4.5,
          color: accentColor, margin: 0, fontFamily: fontFamilyValue,
        }}>
          {children}
        </h2>
        <div style={{ flex: 1, height: 0.75, background: '#d4cfc5' }} />
      </div>
    </div>
  );

  const Bullets = ({ items }: { items: string[] }) => {
    const filtered = items.filter(b => b.trim());
    if (!filtered.length) return null;
    return (
      <ul style={{ margin: `${fontSize / 2}px 0 0`, padding: 0, listStyle: 'none' }}>
        {filtered.map((b, i) => (
          <li key={i} style={{
            fontSize: fontSize, lineHeight: lineHeight, marginBottom: 2, paddingLeft: 14,
            position: 'relative', color: '#2a2a2a',
          }}>
            <span style={{ position: 'absolute', left: 0, top: 0, color: accentColor, fontSize: fontSize * 0.8 }}>▪</span>
            {b}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{
      fontFamily: fontFamilyValue,
      fontSize: fontSize,
      lineHeight: lineHeight,
      color: '#2a2a2a',
      paddingBottom: 40,
    }}>
      {/* Header */}
      <div style={{
        background: accentColor, padding: '38px 48px 30px', color: '#ffffff',
        display: 'flex', alignItems: 'center', gap: 22,
      }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{
            width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
            border: `2.5px solid #ffffff`, boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: fontSize * 2.6, fontWeight: 400, margin: 0, letterSpacing: 5,
            textTransform: 'uppercase', lineHeight: 1.1,
          }}>
            {p.fullName || 'Your Name'}
          </h1>
          {p.jobTitle && (
            <div style={{
              fontSize: fontSize * 1.05, color: '#ffffff', opacity: 0.9, marginTop: 6,
              letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600,
            }}>
              {p.jobTitle}
            </div>
          )}
          {contact.length > 0 && (
            <div style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.65)', marginTop: 10, letterSpacing: 0.5 }}>
              {contact.join('   ·   ')}
            </div>
          )}
          {links.length > 0 && (
            <div style={{ fontSize: fontSize * 0.8, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
              {links.join('   ·   ')}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 48px 0' }}>
        {summary && (
          <>
            <SectionHeader>Professional Summary</SectionHeader>
            <p style={{
              fontSize: fontSize, lineHeight: lineHeight * 1.2, margin: 0, color: '#5a6a7a',
              fontStyle: 'italic', paddingLeft: 14, borderLeft: `2px solid ${accentColor}`,
            }}>
              {summary}
            </p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionHeader>Professional Experience</SectionHeader>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: sectionSpacing }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fontSize * 1.15, color: accentColor }}>{exp.role}</strong>
                  <span style={{ fontSize: fontSize * 0.85, color: '#5a6a7a', fontStyle: 'italic', flexShrink: 0, marginLeft: 8 }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                <div style={{ fontSize: fontSize, color: '#5a6a7a', marginTop: 2, fontWeight: 600 }}>
                  {[exp.company, exp.location].filter(Boolean).join('  ·  ')}
                </div>
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeader>Education</SectionHeader>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: fontSize * 0.85, color: '#5a6a7a', fontStyle: 'italic' }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: fontSize, color: '#5a6a7a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionHeader>Key Projects</SectionHeader>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: fontSize * 1.1, color: accentColor }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: fontSize * 0.8, color: '#5a6a7a' }}>({proj.link})</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: fontSize * 0.9, color: accentColor, opacity: 0.8, fontWeight: 600, marginTop: 2 }}>{proj.techStack}</div>
                )}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionHeader>Skills & Expertise</SectionHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: fontSize * 0.85, padding: '3px 12px',
                  background: '#f5f0e6', border: '1px solid #d4cfc5',
                  color: accentColor, fontWeight: 500, letterSpacing: 0.3,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && (
          <>
            <SectionHeader>Certifications</SectionHeader>
            {extras.certifications.split('\n').filter(Boolean).map((c, i) => (
              <div key={i} style={{ fontSize: fontSize, marginBottom: 3, paddingLeft: 14 }}>
                <span style={{ color: accentColor, marginRight: 6 }}>✦</span>{c}
              </div>
            ))}
          </>
        )}
        {extras.languages && <><SectionHeader>Languages</SectionHeader><p style={{ fontSize: fontSize, margin: 0, paddingLeft: 14 }}>{extras.languages}</p></>}
        {extras.achievements && (
          <>
            <SectionHeader>Achievements</SectionHeader>
            {extras.achievements.split('\n').filter(Boolean).map((a, i) => (
              <div key={i} style={{ fontSize: fontSize, marginBottom: 3, paddingLeft: 14 }}>
                <span style={{ color: accentColor, marginRight: 6 }}>★</span>{a}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
