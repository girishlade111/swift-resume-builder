/**
 * PDF Templates — all templates for @react-pdf/renderer.
 * 5 original styled + 1 generic factory for all new templates.
 */
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumeSettings } from '@/types/resume';

/* ── Shared helpers ── */

function BulletList({ items, fontSize = 10, lineHeight = 1.5, bullet = '•', color = '#333' }: { items: string[]; fontSize?: number; lineHeight?: number; bullet?: string; color?: string }) {
  const filtered = items.filter(b => b.trim());
  return (
    <View style={{ marginTop: 4 }}>
      {filtered.map((b, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 2, paddingLeft: 12 }}>
          <Text style={{ fontSize, color, width: 10 }}>{bullet}</Text>
          <Text style={{ fontSize, lineHeight, color, flex: 1 }}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

function ContactLine({ parts, style, fontSize = 9 }: { parts: string[]; style?: any; fontSize?: number }) {
  if (!parts.length) return null;
  return <Text style={{ fontSize, color: '#777', marginTop: 2, ...style }}>{parts.join('   |   ')}</Text>;
}

/* ═══════════════════════════════════════════════
   1. CLASSIC — Navy + champagne gold executive
   ═══════════════════════════════════════════════ */

export function PdfClassic({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#1b2a4a';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 18;

  const s = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: fontSize, color: '#2c3e50', lineHeight: lineHeight },
    header: { backgroundColor: accentColor, padding: '28 44 24', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 16 },
    name: { fontSize: fontSize * 2.2, letterSpacing: 3, color: '#ffffff', textTransform: 'uppercase' as const },
    jobTitle: { fontSize: fontSize * 1.05, color: '#ffffff', opacity: 0.8, marginTop: 3, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    accentBar: { height: 3, backgroundColor: '#d4af37' },
    body: { padding: '6 44 32' },
    sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 },
    sectionDash: { width: 16, height: 1, backgroundColor: '#d4af37' },
    section: { fontSize: fontSize * 0.95, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 3.5, color: accentColor },
    sectionRule: { flex: 1, height: 1, backgroundColor: '#e8e2d6' },
    entryTitle: { fontSize: fontSize * 1.1, fontFamily: 'Helvetica-Bold', color: accentColor },
    meta: { fontSize: fontSize * 0.9, color: '#6c7a89', fontStyle: 'italic' },
    row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
    skillTag: { fontSize: fontSize * 0.9, padding: '2 10', backgroundColor: '#f8f6f0', borderWidth: 1, borderColor: '#e8e2d6', color: accentColor, marginRight: 4, marginBottom: 4 },
  });

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View style={s.sectionWrap}><View style={s.sectionDash} /><Text style={s.section}>{children}</Text><View style={s.sectionRule} /></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.header}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 58, height: 58, borderRadius: 29 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={s.jobTitle}>{p.jobTitle}</Text> : null}
          <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ color: 'rgba(255,255,255,0.65)', marginTop: 6, fontSize: fontSize * 0.85 }} fontSize={fontSize * 0.85} />
          <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: fontSize * 0.8 }} fontSize={fontSize * 0.8} />
        </View>
      </View>
      <View style={s.accentBar} />
      <View style={s.body}>
        {summary ? <><SectionTitle>Professional Summary</SectionTitle><Text style={{ fontStyle: 'italic', color: '#6c7a89', lineHeight: lineHeight * 1.15, paddingLeft: 14 }}>{summary}</Text></> : null}
        {experience.length > 0 && <><SectionTitle>Professional Experience</SectionTitle>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <View style={s.row}><Text style={s.entryTitle}>{exp.role}</Text><Text style={s.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={{ fontSize: fontSize, color: '#d4af37', marginTop: 1, fontFamily: 'Helvetica-Bold' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</Text>
            <BulletList items={exp.bulletPoints} bullet="▪" color="#2c3e50" fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: sectionSpacing / 1.8 }}>
            <View style={s.row}><Text style={s.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={s.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text style={{ fontSize: fontSize, color: '#6c7a89' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><SectionTitle>Key Projects</SectionTitle>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
            <Text style={s.entryTitle}>{proj.name}{proj.link ? ` (${proj.link})` : ''}</Text>
            {proj.techStack ? <Text style={{ fontSize: fontSize * 0.9, color: '#d4af37', fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} bullet="▪" color="#2c3e50" fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {skills.length > 0 && <><SectionTitle>Skills & Expertise</SectionTitle><View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>{skills.map((s, i) => <Text key={i} style={s.skillTag}>{s}</Text>)}</View></>}
        {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ color: '#2c3e50' }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ color: '#2c3e50' }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ color: '#2c3e50' }}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}

/* ═══════════════════════════════════════════════
   2. COMPACT — Slate + violet tech-forward
   ═══════════════════════════════════════════════ */

export function PdfCompact({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#6d28d9';
  const fontSize = settings?.fontSize || 9.5;
  const lineHeight = settings?.lineHeight || 1.45;
  const sectionSpacing = settings?.sectionSpacing || 12;

  const s = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: fontSize, color: '#334155', lineHeight: lineHeight },
    header: { padding: '22 28 18', backgroundColor: '#1e1b4b', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 14, color: '#ffffff' },
    name: { fontSize: fontSize * 1.9, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 0.5 },
    jobTitle: { fontSize: fontSize, color: '#a78bfa', marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' as const },
    body: { padding: '4 28 22' },
    sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 6, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2.5 },
    sectionDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: accentColor },
    section: { fontSize: fontSize * 0.9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: accentColor },
    sectionRule: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
    entryTitle: { fontSize: fontSize * 1.05, fontFamily: 'Helvetica-Bold', color: '#1e1b4b' },
    meta: { fontSize: fontSize * 0.85, color: '#94a3b8' },
    datePill: { fontSize: fontSize * 0.8, backgroundColor: `${accentColor}15`, color: accentColor, padding: '1 7', fontFamily: 'Helvetica-Bold' },
    row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
    skillTag: { fontSize: fontSize * 0.85, padding: '2 8', backgroundColor: `${accentColor}15`, color: accentColor, fontFamily: 'Helvetica-Bold', marginRight: 3, marginBottom: 3 },
  });

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View style={s.sectionWrap}><View style={s.sectionDot} /><Text style={s.section}>{children}</Text><View style={s.sectionRule} /></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.header}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 44, height: 44, borderRadius: 22 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={s.jobTitle}>{p.jobTitle}</Text> : null}
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, marginTop: 6 }}>
            {[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((c, i) => (
              <Text key={i} style={{ fontSize: fontSize * 0.8, color: 'rgba(255,255,255,0.65)', backgroundColor: 'rgba(255,255,255,0.08)', padding: '1 5' }}>{c}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={s.body}>
        {summary ? <><SectionTitle>Summary</SectionTitle><Text style={{ fontSize: fontSize, color: '#334155', lineHeight: lineHeight * 1.1 }}>{summary}</Text></> : null}
        {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <View style={s.row}><Text style={s.entryTitle}>{exp.role}{exp.company ? <Text style={{ fontFamily: 'Helvetica', color: '#94a3b8' }}> — {exp.company}</Text> : null}</Text><Text style={s.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            {exp.location ? <Text style={s.meta}>{exp.location}</Text> : null}
            <BulletList items={exp.bulletPoints} fontSize={fontSize * 0.95} bullet="▸" color="#334155" lineHeight={lineHeight} />
          </View>
        ))}</>}
        {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <View style={s.row}><Text style={s.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={s.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text style={{ fontSize: fontSize, color: '#94a3b8' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
            <Text style={s.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ fontSize: fontSize * 0.85, color: accentColor, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} fontSize={fontSize * 0.95} bullet="▸" color="#334155" lineHeight={lineHeight} />
          </View>
        ))}</>}
        {skills.length > 0 && <><SectionTitle>Technical Skills</SectionTitle><View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>{skills.map((s, i) => <Text key={i} style={s.skillTag}>{s}</Text>)}</View></>}
        {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ fontSize: fontSize }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ fontSize: fontSize }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ fontSize: fontSize }}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}

/* ═══════════════════════════════════════════════
   3. LEFT SIDEBAR — Midnight + rose-gold executive
   ═══════════════════════════════════════════════ */

export function PdfLeftSidebar({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#e17055';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 18;

  const s = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: fontSize, color: '#2d3436', lineHeight: lineHeight, flexDirection: 'row' as const },
    sidebar: { width: 180, backgroundColor: '#0c1222', color: '#c8d6e5', padding: '32 18' },
    sidebarName: { fontSize: fontSize * 1.6, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center' as const },
    sidebarJobTitle: { fontSize: fontSize * 0.85, color: accentColor, marginTop: 4, fontFamily: 'Helvetica-Bold', textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: 2 },
    sidebarSection: { fontSize: fontSize * 0.75, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 3, color: accentColor, marginTop: 18, marginBottom: 6 },
    sidebarText: { fontSize: fontSize * 0.85, color: '#c8d6e5', marginBottom: 4, lineHeight: 1.4 },
    sidebarSkillTag: { fontSize: fontSize * 0.75, backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', padding: '2 6', marginRight: 3, marginBottom: 3 },
    body: { flex: 1, padding: '32 28 32 24' },
    sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 },
    section: { fontSize: fontSize, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: '#2d3436' },
    sectionRule: { flex: 1, height: 1.5, backgroundColor: '#dfe6e9' },
    entryTitle: { fontSize: fontSize * 1.1, fontFamily: 'Helvetica-Bold', color: '#2d3436' },
    datePill: { fontSize: fontSize * 0.75, backgroundColor: accentColor, color: '#ffffff', padding: '1 7', fontFamily: 'Helvetica-Bold' },
    meta: { fontSize: fontSize * 0.85, color: '#636e72' },
    row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  });

  const MainSection = ({ children }: { children: React.ReactNode }) => (
    <View style={s.sectionWrap}><Text style={s.section}>{children}</Text><View style={s.sectionRule} /></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.sidebar}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 72, height: 72, borderRadius: 36, marginBottom: 12, alignSelf: 'center' as const }} /> : null}
        <Text style={s.sidebarName}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={s.sidebarJobTitle}>{p.jobTitle}</Text> : null}
        <Text style={s.sidebarSection}>Contact</Text>
        {p.email ? <Text style={s.sidebarText}>{p.email}</Text> : null}
        {p.phone ? <Text style={s.sidebarText}>{p.phone}</Text> : null}
        {p.location ? <Text style={s.sidebarText}>{p.location}</Text> : null}
        {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <>
          <Text style={s.sidebarSection}>Links</Text>
          {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((url, i) => (
            <Text key={i} style={{ ...s.sidebarText, fontSize: fontSize * 0.75, color: '#8395a7' }}>{url}</Text>
          ))}
        </>}
        {skills.length > 0 && <>
          <Text style={s.sidebarSection}>Skills</Text>
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
            {skills.map((s, i) => <Text key={i} style={s.sidebarSkillTag}>{s}</Text>)}
          </View>
        </>}
        {extras.languages ? <><Text style={s.sidebarSection}>Languages</Text><Text style={s.sidebarText}>{extras.languages}</Text></> : null}
        {extras.certifications ? <><Text style={s.sidebarSection}>Certifications</Text><Text style={s.sidebarText}>{extras.certifications}</Text></> : null}
      </View>
      <View style={s.body}>
        {summary ? <><MainSection>Profile</MainSection><Text style={{ color: '#636e72', lineHeight: lineHeight * 1.15, fontStyle: 'italic' }}>{summary}</Text></> : null}
        {experience.length > 0 && <><MainSection>Experience</MainSection>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <View style={s.row}><Text style={s.entryTitle}>{exp.role}</Text><Text style={s.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={{ fontSize: fontSize, color: accentColor, marginTop: 1, fontFamily: 'Helvetica-Bold' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
            <BulletList items={exp.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {education.length > 0 && <><MainSection>Education</MainSection>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: sectionSpacing / 1.8 }}>
            <View style={s.row}><Text style={s.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={s.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text style={{ color: '#636e72' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><MainSection>Projects</MainSection>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: sectionSpacing / 1.5 }}>
            <Text style={s.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ fontSize: fontSize * 0.9, color: '#636e72' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {extras.achievements ? <><MainSection>Achievements</MainSection><Text style={{ color: '#2d3436' }}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}

/* ═══════════════════════════════════════════════
   4. MODERN — Charcoal + coral creative
   ═══════════════════════════════════════════════ */

export function PdfModern({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#e85d3a';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.5;
  const sectionSpacing = settings?.sectionSpacing || 18;

  const s = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: fontSize, color: '#292524', lineHeight: lineHeight },
    header: { backgroundColor: '#1c1917', padding: '32 40 26', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 18 },
    name: { fontSize: fontSize * 2.6, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: -0.5 },
    jobTitle: { fontSize: fontSize * 1.1, color: accentColor, marginTop: 3, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase' as const },
    accentBar: { height: 3, backgroundColor: accentColor },
    body: { padding: '6 40 32' },
    sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 },
    sectionBar: { width: 20, height: 3, backgroundColor: accentColor },
    section: { fontSize: fontSize * 1.05, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2, color: '#1c1917' },
    summaryBox: { backgroundColor: `${accentColor}10`, padding: '8 12', lineHeight: lineHeight * 1.15, color: '#78716c' },
    entryTitle: { fontSize: fontSize * 1.15, fontFamily: 'Helvetica-Bold', color: '#1c1917' },
    datePill: { fontSize: fontSize * 0.8, backgroundColor: accentColor, color: '#ffffff', padding: '2 8', fontFamily: 'Helvetica-Bold' },
    meta: { fontSize: fontSize, color: accentColor, fontFamily: 'Helvetica-Bold' },
    row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
    skillTag: { fontSize: fontSize * 0.85, backgroundColor: '#1c1917', color: '#ffffff', padding: '2 10', fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
  });

  const Sec = ({ children }: { children: React.ReactNode }) => (
    <View style={s.sectionWrap}><View style={s.sectionBar} /><Text style={s.section}>{children}</Text></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.header}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 68, height: 68, borderRadius: 10 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={s.jobTitle}>{p.jobTitle}</Text> : null}
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10, marginTop: 10 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
              <Text key={i} style={{ fontSize: fontSize * 0.85, color: 'rgba(255,255,255,0.65)', backgroundColor: 'rgba(255,255,255,0.08)', padding: '1 6' }}>{c}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={s.accentBar} />
      <View style={s.body}>
        {summary ? <><Sec>About Me</Sec><View style={s.summaryBox}><Text>{summary}</Text></View></> : null}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <View style={s.row}><Text style={s.entryTitle}>{exp.role}</Text><Text style={s.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={s.meta}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</Text>
            <BulletList items={exp.bulletPoints} color="#292524" fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <View style={s.row}><Text style={s.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={{ fontSize: fontSize * 0.9, color: '#78716c' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text style={{ fontSize: fontSize, color: '#78716c' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: sectionSpacing / 1.8 }}>
            <Text style={s.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ fontSize: fontSize * 0.9, color: '#78716c' }}>Tech: {proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} color="#292524" fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {skills.length > 0 && <><Sec>Technical Skills</Sec><View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>{skills.map((s, i) => <Text key={i} style={s.skillTag}>{s}</Text>)}</View></>}
        {extras.certifications ? <><Sec>Certifications</Sec><Text style={{ color: '#292524' }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Sec>Languages</Sec><Text style={{ color: '#292524' }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Sec>Achievements</Sec><Text style={{ color: '#292524' }}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}

/* ═══════════════════════════════════════════════
   5. MINIMAL — Scandinavian clean + emerald accent
   ═══════════════════════════════════════════════ */

export function PdfMinimal({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  
  const accentColor = settings?.accentColor || '#059669';
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionSpacing = settings?.sectionSpacing || 24;

  const s = StyleSheet.create({
    page: { padding: '48 52', fontFamily: 'Helvetica', fontSize: fontSize, color: '#262626', lineHeight: lineHeight },
    name: { fontSize: fontSize * 2.6, letterSpacing: 2, color: '#0a0a0a' },
    jobTitle: { fontSize: fontSize * 1.05, color: accentColor, marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' as const },
    dividerLine: { height: 1, backgroundColor: '#e5e5e5', marginTop: 10 },
    sectionLabel: { fontSize: fontSize * 0.8, textTransform: 'uppercase' as const, letterSpacing: 4, color: accentColor, marginTop: sectionSpacing, marginBottom: sectionSpacing / 6 },
    sectionBar: { width: 28, height: 1.5, backgroundColor: accentColor, marginBottom: sectionSpacing / 2.5 },
    entryTitle: { fontSize: fontSize * 1.15, fontFamily: 'Helvetica-Bold', color: '#0a0a0a' },
    meta: { fontSize: fontSize * 0.9, color: '#a3a3a3', letterSpacing: 0.5 },
    entryDivider: { height: 1, backgroundColor: '#e5e5e5', marginTop: 14, marginBottom: 14 },
    skillTag: { fontSize: fontSize * 0.85, padding: '2 8', backgroundColor: `${accentColor}10`, color: accentColor, fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
  });

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View><Text style={s.sectionLabel}>{children}</Text><View style={s.sectionBar} /></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, gap: 14 }}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 52, height: 52, borderRadius: 4 }} /> : null}
        <View><Text style={s.name}>{p.fullName || 'Your Name'}</Text>{p.jobTitle ? <Text style={s.jobTitle}>{p.jobTitle}</Text> : null}</View>
      </View>
      <View style={s.dividerLine} />
      <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 14, marginTop: 8 }}>
        {[p.email, p.phone, p.location, p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((c, i) => (
          <Text key={i} style={{ fontSize: fontSize * 0.85, color: '#737373', letterSpacing: 0.3 }}>{c}</Text>
        ))}
      </View>
      {summary ? <><SectionTitle>Summary</SectionTitle><Text style={{ color: '#737373', lineHeight: lineHeight * 1.15 }}>{summary}</Text></> : null}
      {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map((exp, idx) => (
        <View key={exp.id}>
          <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
            <Text style={s.entryTitle}>{exp.role}</Text>
            <Text style={s.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
          </View>
          <Text style={{ fontSize: fontSize * 0.95, color: accentColor, marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' — ')}</Text>
          <BulletList items={exp.bulletPoints} bullet="·" color="#262626" fontSize={fontSize} lineHeight={lineHeight} />
          {idx < experience.length - 1 && <View style={s.entryDivider} />}
        </View>
      ))}</>}
      {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
        <View key={edu.id} style={{ marginBottom: sectionSpacing / 2.4 }}>
          <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
            <Text style={s.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
            <Text style={s.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
          </View>
          <Text style={{ fontSize: fontSize * 0.95, color: '#737373' }}>{[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}</Text>
        </View>
      ))}</>}
      {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
        <View key={proj.id} style={{ marginBottom: sectionSpacing / 2 }}>
          <Text style={s.entryTitle}>{proj.name}</Text>
          {proj.techStack ? <Text style={s.meta}>{proj.techStack}</Text> : null}
          <BulletList items={proj.bulletPoints} bullet="·" color="#262626" fontSize={fontSize} lineHeight={lineHeight} />
        </View>
      ))}</>}
      {skills.length > 0 && <><SectionTitle>Skills</SectionTitle><View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>{skills.map((s, i) => <Text key={i} style={s.skillTag}>{s}</Text>)}</View></>}
      {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ color: '#262626' }}>{extras.certifications}</Text></> : null}
      {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ color: '#262626' }}>{extras.languages}</Text></> : null}
      {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ color: '#262626' }}>{extras.achievements}</Text></> : null}
    </Page></Document>
  );
}

/* ═══════════════════════════════════════════════
   6. GENERIC — Configurable PDF for all new templates
   ═══════════════════════════════════════════════ */

interface GenericColors {
  headerBg: string;
  accent: string;
  accentLight: string;
  text: string;
  muted: string;
}

export function PdfGeneric({ data, settings, colors }: { data: ResumeData; settings?: ResumeSettings; colors: GenericColors }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const c = colors;
  
  const accentColor = settings?.accentColor || c.accent;
  const fontSize = settings?.fontSize || 10;
  const lineHeight = settings?.lineHeight || 1.55;
  const sectionSpacing = settings?.sectionSpacing || 16;

  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  };
  const headerTextColor = isLight(c.headerBg) ? c.text : '#ffffff';
  const headerSubColor = isLight(c.headerBg) ? accentColor : c.accentLight;

  const s = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: fontSize, color: c.text, lineHeight: lineHeight },
    header: { backgroundColor: c.headerBg, padding: '28 40 22', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 16 },
    name: { fontSize: fontSize * 2.2, fontFamily: 'Helvetica-Bold', color: headerTextColor, letterSpacing: 0.5 },
    jobTitle: { fontSize: fontSize, color: headerSubColor, marginTop: 3, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase' as const },
    bar: { height: 3, backgroundColor: accentColor },
    body: { padding: '6 40 32' },
    secWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: sectionSpacing, marginBottom: sectionSpacing / 2 },
    secBar: { width: 16, height: 3, backgroundColor: accentColor },
    secText: { fontSize: fontSize * 0.95, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: accentColor },
    secLine: { flex: 1, height: 1, backgroundColor: c.accentLight },
    title: { fontSize: fontSize * 1.1, fontFamily: 'Helvetica-Bold', color: c.text },
    meta: { fontSize: fontSize * 0.9, color: c.muted },
    row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
    pill: { fontSize: fontSize * 0.75, backgroundColor: accentColor, color: '#ffffff', padding: '1 7', fontFamily: 'Helvetica-Bold' },
    tag: { fontSize: fontSize * 0.85, padding: '2 8', backgroundColor: c.accentLight, color: accentColor, fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
  });

  const Sec = ({ children }: { children: React.ReactNode }) => (
    <View style={s.secWrap}><View style={s.secBar} /><Text style={s.secText}>{children}</Text><View style={s.secLine} /></View>
  );

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.header}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 56, height: 56, borderRadius: 28 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={s.jobTitle}>{p.jobTitle}</Text> : null}
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, marginTop: 6 }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((ct, i) => (
              <Text key={i} style={{ fontSize: fontSize * 0.8, color: isLight(c.headerBg) ? c.muted : 'rgba(255,255,255,0.65)' }}>{ct}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={s.bar} />
      <View style={s.body}>
        {summary ? <><Sec>Summary</Sec><Text style={{ color: c.muted, lineHeight: lineHeight * 1.1 }}>{summary}</Text></> : null}
        {experience.length > 0 && <><Sec>Experience</Sec>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: sectionSpacing / 1.3 }}>
            <View style={s.row}><Text style={s.title}>{exp.role}</Text><Text style={s.pill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={{ fontSize: fontSize * 0.95, color: accentColor, marginTop: 1, fontFamily: 'Helvetica-Bold' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
            <BulletList items={exp.bulletPoints} color={c.text} fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {education.length > 0 && <><Sec>Education</Sec>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: sectionSpacing / 2 }}>
            <View style={s.row}><Text style={s.title}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={s.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text style={{ color: c.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><Sec>Projects</Sec>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: sectionSpacing / 1.6 }}>
            <Text style={s.title}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ fontSize: fontSize * 0.85, color: accentColor, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} color={c.text} fontSize={fontSize} lineHeight={lineHeight} />
          </View>
        ))}</>}
        {skills.length > 0 && <><Sec>Skills</Sec><View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>{skills.map((sk, i) => <Text key={i} style={s.tag}>{sk}</Text>)}</View></>}
        {extras.certifications ? <><Sec>Certifications</Sec><Text style={{ color: c.text }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Sec>Languages</Sec><Text style={{ color: c.text }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Sec>Achievements</Sec><Text style={{ color: c.text }}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}
