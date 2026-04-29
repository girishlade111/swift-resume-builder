import { ResumeData, ResumeSettings, FONT_FAMILIES } from '@/types/resume';

export default function CompactTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;

  const accentColor = settings?.accentColor || '#5b21b6';
  const fontFamilyValue = FONT_FAMILIES.find(f => f.name === settings?.fontFamily)?.value || 'Inter, sans-serif';
  const fontSize = settings?.fontSize || 9.5;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 16;

  const allContact = [p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.2 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, boxShadow: `0 0 0 2px ${accentColor}20` }} />
      <h2 style={{
        fontSize: fontSize * 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3,
        color: accentColor, margin: 0, fontFamily: fontFamilyValue,
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 0.75, background: '#e4e4e7' }} />
    </div>
  );

  const Bullets = ({ items }: { items: string[] }) => {
    const filtered = items.filter(b => b.trim());
    if (!filtered.length) return null;
    return (
      <ul style={{ margin: `${fontSize / 2.5}px 0 0`, padding: 0, listStyle: 'none' }}>
        {filtered.map((b, i) => (
          <li key={i} style={{
            fontSize: fontSize, lineHeight: lineHeight, marginBottom: 1.5, paddingLeft: 12,
            position: 'relative', color: '#27272a',
          }}>
            <span style={{ position: 'absolute', left: 0, color: accentColor, opacity: 0.7, fontSize: fontSize * 0.75, top: 3 }}>▸</span>
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
      color: '#27272a',
      paddingBottom: 30,
    }}>
      {/* Header */}
      <div style={{
        padding: '26px 32px 22px',
        background: `linear-gradient(135deg, #1e1b4b 0%, ${accentColor} 100%)`,
        color: '#ffffff', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        {p.profileImage && (
          <img src={p.profileImage} alt="" style={{
            width: 54, height: 54, borderRadius: '50%', objectFit: 'cover',
            border: '2.5px solid rgba(255,255,255,0.25)',
          }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSize * 2.3, fontWeight: 800, margin: 0, letterSpacing: 0.5 }}>{p.fullName || 'Your Name'}</h1>
          {p.jobTitle && (
            <div style={{ fontSize: fontSize * 1.05, opacity: 0.85, marginTop: 3, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.jobTitle}</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {allContact.map((c, i) => (
              <span key={i} style={{ fontSize: fontSize * 0.8, opacity: 0.7, padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '6px 32px 0' }}>
        {summary && <><SectionTitle>Summary</SectionTitle><p style={{ fontSize: fontSize, margin: 0, lineHeight: lineHeight * 1.1, color: '#71717a' }}>{summary}</p></>}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: fontSize * 1.1, color: '#1e1b4b' }}>{exp.role}</strong>
                    {exp.company && <span style={{ color: '#71717a', fontWeight: 400 }}> — {exp.company}</span>}
                  </div>
                  <span style={{
                    fontSize: fontSize * 0.8, color: accentColor, flexShrink: 0, marginLeft: 8,
                    padding: '2px 8px', background: `${accentColor}10`, borderRadius: 10, fontWeight: 600,
                  }}>
                    {exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                  </span>
                </div>
                {exp.location && <div style={{ fontSize: fontSize * 0.9, color: '#71717a', marginTop: 1 }}>{exp.location}</div>}
                <Bullets items={exp.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: fontSize * 1.05, color: '#1e1b4b' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong>
                  <span style={{ fontSize: fontSize * 0.85, color: '#71717a' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                </div>
                <div style={{ fontSize: fontSize, color: '#71717a' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <strong style={{ fontSize: fontSize * 1.05, color: '#1e1b4b' }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: fontSize * 0.85, color: accentColor, opacity: 0.8 }}>↗ {proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: fontSize * 0.9, color: accentColor, fontWeight: 600, marginTop: 1 }}>{proj.techStack}</div>}
                <Bullets items={proj.bulletPoints} />
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: fontSize * 0.85, padding: '2.5px 10px', background: `${accentColor}10`, borderRadius: 12, color: accentColor, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {extras.certifications && <><SectionTitle>Certifications</SectionTitle>{extras.certifications.split('\n').filter(Boolean).map((c, i) => <div key={i} style={{ fontSize: fontSize, marginBottom: 2 }}>{c}</div>)}</>}
        {extras.languages && <><SectionTitle>Languages</SectionTitle><p style={{ fontSize: fontSize, margin: 0 }}>{extras.languages}</p></>}
        {extras.achievements && <><SectionTitle>Achievements</SectionTitle>{extras.achievements.split('\n').filter(Boolean).map((a, i) => <div key={i} style={{ fontSize: fontSize, marginBottom: 2 }}>{a}</div>)}</>}
      </div>
    </div>
  );
}
