/**
 * PDF Templates — all 5 templates for @react-pdf/renderer.
 * Matches the redesigned HTML templates: Classic, Compact, Modern, Minimal, Left Sidebar.
 */
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

/* ── Shared helpers ── */

function BulletList({ items, fontSize = 10, bullet = '•', color = '#333' }: { items: string[]; fontSize?: number; bullet?: string; color?: string }) {
  const filtered = items.filter(b => b.trim());
  return (
    <View style={{ marginTop: 4 }}>
      {filtered.map((b, i) => (
        <Text key={i} style={{ fontSize, marginBottom: 2, paddingLeft: 12, color }}>{bullet}  {b}</Text>
      ))}
    </View>
  );
}

function ContactLine({ parts, style }: { parts: string[]; style?: any }) {
  if (!parts.length) return null;
  return <Text style={{ fontSize: 9, color: '#777', marginTop: 2, ...style }}>{parts.join('   |   ')}</Text>;
}

/* ═══════════════════════════════════════════════
   1. CLASSIC — Navy + champagne gold executive
   ═══════════════════════════════════════════════ */

const CL = { navy: '#1b2a4a', gold: '#b8960c', goldLight: '#d4af37', text: '#2c3e50', muted: '#6c7a89', light: '#f8f6f0', rule: '#e8e2d6' };

const classicS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: CL.text, lineHeight: 1.55 },
  header: { backgroundColor: CL.navy, padding: '28 44 24', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 16 },
  name: { fontSize: 22, letterSpacing: 3, color: '#ffffff', textTransform: 'uppercase' as const },
  jobTitle: { fontSize: 10.5, color: CL.goldLight, marginTop: 3, letterSpacing: 1.5, textTransform: 'uppercase' as const },
  accentBar: { height: 3, backgroundColor: CL.gold },
  body: { padding: '6 44 32' },
  sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: 18, marginBottom: 8 },
  sectionDash: { width: 16, height: 1, backgroundColor: CL.gold },
  section: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 3.5, color: CL.navy },
  sectionRule: { flex: 1, height: 1, backgroundColor: CL.rule },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: CL.navy },
  meta: { fontSize: 9, color: CL.muted, fontStyle: 'italic' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
  skillTag: { fontSize: 9, padding: '2 10', backgroundColor: CL.light, borderWidth: 1, borderColor: CL.rule, color: CL.navy, marginRight: 4, marginBottom: 4 },
});

export function PdfClassic({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View style={classicS.sectionWrap}>
      <View style={classicS.sectionDash} />
      <Text style={classicS.section}>{children}</Text>
      <View style={classicS.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={classicS.page}>
        <View style={classicS.header}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 58, height: 58, borderRadius: 29 }} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={classicS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={classicS.jobTitle}>{p.jobTitle}</Text> : null}
            <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ color: 'rgba(255,255,255,0.65)', marginTop: 6, fontSize: 8.5 }} />
            <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }} />
          </View>
        </View>
        <View style={classicS.accentBar} />

        <View style={classicS.body}>
          {summary ? <>
            <SectionTitle>Professional Summary</SectionTitle>
            <Text style={{ fontStyle: 'italic', color: CL.muted, lineHeight: 1.75, paddingLeft: 14 }}>{summary}</Text>
          </> : null}

          {experience.length > 0 && <>
            <SectionTitle>Professional Experience</SectionTitle>
            {experience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 14 }}>
                <View style={classicS.row}>
                  <Text style={classicS.entryTitle}>{exp.role}</Text>
                  <Text style={classicS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
                </View>
                <Text style={{ fontSize: 10, color: CL.gold, marginTop: 1, fontFamily: 'Helvetica-Bold' }}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</Text>
                <BulletList items={exp.bulletPoints} bullet="▪" color={CL.text} />
              </View>
            ))}
          </>}

          {education.length > 0 && <>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 10 }}>
                <View style={classicS.row}>
                  <Text style={classicS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                  <Text style={classicS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
                </View>
                <Text style={{ fontSize: 10, color: CL.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
              </View>
            ))}
          </>}

          {projects.length > 0 && <>
            <SectionTitle>Key Projects</SectionTitle>
            {projects.map(proj => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={classicS.entryTitle}>{proj.name}{proj.link ? ` (${proj.link})` : ''}</Text>
                {proj.techStack ? <Text style={{ fontSize: 9, color: CL.gold, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
                <BulletList items={proj.bulletPoints} bullet="▪" color={CL.text} />
              </View>
            ))}
          </>}

          {skills.length > 0 && <>
            <SectionTitle>Skills & Expertise</SectionTitle>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={classicS.skillTag}>{s}</Text>)}
            </View>
          </>}

          {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ color: CL.text }}>{extras.certifications}</Text></> : null}
          {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ color: CL.text }}>{extras.languages}</Text></> : null}
          {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ color: CL.text }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   2. COMPACT — Slate + violet tech-forward
   ═══════════════════════════════════════════════ */

const CP = { accent: '#6d28d9', accentLight: '#ede9fe', dark: '#1e1b4b', text: '#334155', muted: '#94a3b8' };

const compactS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9.5, color: CP.text, lineHeight: 1.45 },
  header: { padding: '22 28 18', backgroundColor: CP.dark, flexDirection: 'row' as const, alignItems: 'center' as const, gap: 14, color: '#ffffff' },
  name: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 0.5 },
  jobTitle: { fontSize: 9.5, color: '#a78bfa', marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' as const },
  body: { padding: '4 28 22' },
  sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 6, marginTop: 12, marginBottom: 5 },
  sectionDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: CP.accent },
  section: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: CP.accent },
  sectionRule: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  entryTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: CP.dark },
  meta: { fontSize: 8, color: CP.muted },
  datePill: { fontSize: 7.5, backgroundColor: CP.accentLight, color: CP.accent, padding: '1 7', fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  skillTag: { fontSize: 8, padding: '2 8', backgroundColor: CP.accentLight, color: CP.accent, fontFamily: 'Helvetica-Bold', marginRight: 3, marginBottom: 3 },
});

export function PdfCompact({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View style={compactS.sectionWrap}>
      <View style={compactS.sectionDot} />
      <Text style={compactS.section}>{children}</Text>
      <View style={compactS.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={compactS.page}>
        <View style={compactS.header}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 44, height: 44, borderRadius: 22 }} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={compactS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={compactS.jobTitle}>{p.jobTitle}</Text> : null}
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, marginTop: 6 }}>
              {[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((c, i) => (
                <Text key={i} style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.65)', backgroundColor: 'rgba(255,255,255,0.08)', padding: '1 5' }}>{c}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={compactS.body}>
          {summary ? <><SectionTitle>Summary</SectionTitle><Text style={{ fontSize: 9.5, color: CP.text, lineHeight: 1.55 }}>{summary}</Text></> : null}

          {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 9 }}>
              <View style={compactS.row}>
                <Text style={compactS.entryTitle}>{exp.role}{exp.company ? <Text style={{ fontFamily: 'Helvetica', color: CP.muted }}> — {exp.company}</Text> : null}</Text>
                <Text style={compactS.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              {exp.location ? <Text style={compactS.meta}>{exp.location}</Text> : null}
              <BulletList items={exp.bulletPoints} fontSize={9} bullet="▸" color={CP.text} />
            </View>
          ))}</>}

          {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View style={compactS.row}>
                <Text style={compactS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={compactS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text style={{ fontSize: 9.5, color: CP.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 7 }}>
              <Text style={compactS.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ fontSize: 8, color: CP.accent, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} fontSize={9} bullet="▸" color={CP.text} />
            </View>
          ))}</>}

          {skills.length > 0 && <>
            <SectionTitle>Technical Skills</SectionTitle>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={compactS.skillTag}>{s}</Text>)}
            </View>
          </>}

          {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ fontSize: 9 }}>{extras.certifications}</Text></> : null}
          {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ fontSize: 9 }}>{extras.languages}</Text></> : null}
          {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ fontSize: 9 }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   3. LEFT SIDEBAR — Midnight + rose-gold executive
   ═══════════════════════════════════════════════ */

const LS = { sidebar: '#0c1222', accent: '#e17055', accentLight: '#fab1a0', text: '#2d3436', muted: '#636e72' };

const sidebarS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: LS.text, lineHeight: 1.5, flexDirection: 'row' as const },
  sidebar: { width: 180, backgroundColor: LS.sidebar, color: '#c8d6e5', padding: '32 18' },
  sidebarName: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center' as const },
  sidebarJobTitle: { fontSize: 8.5, color: LS.accent, marginTop: 4, fontFamily: 'Helvetica-Bold', textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: 2 },
  sidebarSection: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 3, color: LS.accent, marginTop: 18, marginBottom: 6 },
  sidebarText: { fontSize: 8.5, color: '#c8d6e5', marginBottom: 4, lineHeight: 1.4 },
  sidebarSkillTag: { fontSize: 7.5, backgroundColor: 'rgba(225,112,85,0.12)', color: LS.accentLight, padding: '2 6', marginRight: 3, marginBottom: 3 },
  body: { flex: 1, padding: '32 28 32 24' },
  sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: 18, marginBottom: 8 },
  section: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: LS.text },
  sectionRule: { flex: 1, height: 1.5, backgroundColor: '#dfe6e9' },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: LS.text },
  datePill: { fontSize: 7.5, backgroundColor: LS.accent, color: '#ffffff', padding: '1 7', fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 8.5, color: LS.muted },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
});

export function PdfLeftSidebar({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const MainSection = ({ children }: { children: React.ReactNode }) => (
    <View style={sidebarS.sectionWrap}>
      <Text style={sidebarS.section}>{children}</Text>
      <View style={sidebarS.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={sidebarS.page}>
        <View style={sidebarS.sidebar}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 72, height: 72, borderRadius: 36, marginBottom: 12, alignSelf: 'center' as const }} /> : null}
          <Text style={sidebarS.sidebarName}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={sidebarS.sidebarJobTitle}>{p.jobTitle}</Text> : null}

          <Text style={sidebarS.sidebarSection}>Contact</Text>
          {p.email ? <Text style={sidebarS.sidebarText}>{p.email}</Text> : null}
          {p.phone ? <Text style={sidebarS.sidebarText}>{p.phone}</Text> : null}
          {p.location ? <Text style={sidebarS.sidebarText}>{p.location}</Text> : null}

          {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).length > 0 && <>
            <Text style={sidebarS.sidebarSection}>Links</Text>
            {[p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((url, i) => (
              <Text key={i} style={{ ...sidebarS.sidebarText, fontSize: 7.5, color: '#8395a7' }}>{url}</Text>
            ))}
          </>}

          {skills.length > 0 && <>
            <Text style={sidebarS.sidebarSection}>Skills</Text>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={sidebarS.sidebarSkillTag}>{s}</Text>)}
            </View>
          </>}

          {extras.languages ? <>
            <Text style={sidebarS.sidebarSection}>Languages</Text>
            <Text style={sidebarS.sidebarText}>{extras.languages}</Text>
          </> : null}
          {extras.certifications ? <>
            <Text style={sidebarS.sidebarSection}>Certifications</Text>
            <Text style={sidebarS.sidebarText}>{extras.certifications}</Text>
          </> : null}
        </View>

        <View style={sidebarS.body}>
          {summary ? <><MainSection>Profile</MainSection><Text style={{ color: LS.muted, lineHeight: 1.75, fontStyle: 'italic' }}>{summary}</Text></> : null}

          {experience.length > 0 && <><MainSection>Experience</MainSection>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 14 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{exp.role}</Text>
                <Text style={sidebarS.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              <Text style={{ fontSize: 10, color: LS.accent, marginTop: 1, fontFamily: 'Helvetica-Bold' }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
              <BulletList items={exp.bulletPoints} />
            </View>
          ))}</>}

          {education.length > 0 && <><MainSection>Education</MainSection>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 10 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={sidebarS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text style={{ color: LS.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><MainSection>Projects</MainSection>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 12 }}>
              <Text style={sidebarS.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ fontSize: 9, color: LS.muted }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} />
            </View>
          ))}</>}

          {extras.achievements ? <><MainSection>Achievements</MainSection><Text style={{ color: LS.text }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   4. MODERN — Charcoal + coral creative
   ═══════════════════════════════════════════════ */

const MD = { coral: '#e85d3a', charcoal: '#1c1917', text: '#292524', muted: '#78716c', coralLight: '#fff1ed' };

const modernS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: MD.text, lineHeight: 1.5 },
  header: { backgroundColor: MD.charcoal, padding: '32 40 26', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 18 },
  name: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: -0.5 },
  jobTitle: { fontSize: 11, color: MD.coral, marginTop: 3, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase' as const },
  accentBar: { height: 3, backgroundColor: MD.coral },
  body: { padding: '6 40 32' },
  sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginTop: 18, marginBottom: 8 },
  sectionBar: { width: 20, height: 3, backgroundColor: MD.coral },
  section: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2, color: MD.charcoal },
  summaryBox: { backgroundColor: MD.coralLight, padding: '8 12', lineHeight: 1.75, color: MD.muted },
  entryTitle: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: MD.charcoal },
  datePill: { fontSize: 8, backgroundColor: MD.coral, color: '#ffffff', padding: '2 8', fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 10, color: MD.coral, fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  skillTag: { fontSize: 8.5, backgroundColor: MD.charcoal, color: '#ffffff', padding: '2 10', fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
});

function ModernSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <View style={modernS.sectionWrap}>
      <View style={modernS.sectionBar} />
      <Text style={modernS.section}>{children}</Text>
    </View>
  );
}

export function PdfModern({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={modernS.page}>
        <View style={modernS.header}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 68, height: 68, borderRadius: 10 }} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={modernS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={modernS.jobTitle}>{p.jobTitle}</Text> : null}
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10, marginTop: 10 }}>
              {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
                <Text key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.65)', backgroundColor: 'rgba(255,255,255,0.08)', padding: '1 6' }}>{c}</Text>
              ))}
            </View>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
              <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, marginTop: 3 }}>
                {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
                  <Text key={i} style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>{l}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={modernS.accentBar} />

        <View style={modernS.body}>
          {summary ? <>
            <ModernSectionTitle>About Me</ModernSectionTitle>
            <View style={modernS.summaryBox}><Text>{summary}</Text></View>
          </> : null}

          {experience.length > 0 && <>
            <ModernSectionTitle>Experience</ModernSectionTitle>
            {experience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 14 }}>
                <View style={modernS.row}>
                  <Text style={modernS.entryTitle}>{exp.role}</Text>
                  <Text style={modernS.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
                </View>
                <Text style={modernS.meta}>{[exp.company, exp.location].filter(Boolean).join('  ·  ')}</Text>
                <BulletList items={exp.bulletPoints} color={MD.text} />
              </View>
            ))}
          </>}

          {education.length > 0 && <>
            <ModernSectionTitle>Education</ModernSectionTitle>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={modernS.row}>
                  <Text style={modernS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                  <Text style={{ fontSize: 9, color: MD.muted }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
                </View>
                <Text style={{ fontSize: 10, color: MD.muted }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
              </View>
            ))}
          </>}

          {projects.length > 0 && <>
            <ModernSectionTitle>Projects</ModernSectionTitle>
            {projects.map(proj => (
              <View key={proj.id} style={{ marginBottom: 10 }}>
                <Text style={modernS.entryTitle}>{proj.name}{proj.link ? ` ↗ ${proj.link}` : ''}</Text>
                {proj.techStack ? <Text style={{ fontSize: 9, color: MD.muted }}>Tech: {proj.techStack}</Text> : null}
                <BulletList items={proj.bulletPoints} color={MD.text} />
              </View>
            ))}
          </>}

          {skills.length > 0 && <>
            <ModernSectionTitle>Technical Skills</ModernSectionTitle>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={modernS.skillTag}>{s}</Text>)}
            </View>
          </>}

          {extras.certifications ? <><ModernSectionTitle>Certifications</ModernSectionTitle><Text style={{ color: MD.text }}>{extras.certifications}</Text></> : null}
          {extras.languages ? <><ModernSectionTitle>Languages</ModernSectionTitle><Text style={{ color: MD.text }}>{extras.languages}</Text></> : null}
          {extras.achievements ? <><ModernSectionTitle>Achievements</ModernSectionTitle><Text style={{ color: MD.text }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   5. MINIMAL — Scandinavian clean + emerald accent
   ═══════════════════════════════════════════════ */

const MN = { black: '#0a0a0a', text: '#262626', muted: '#737373', faint: '#a3a3a3', accent: '#059669', accentLight: '#ecfdf5', rule: '#e5e5e5' };

const minimalS = StyleSheet.create({
  page: { padding: '48 52', fontFamily: 'Helvetica', fontSize: 10, color: MN.text, lineHeight: 1.6 },
  name: { fontSize: 26, letterSpacing: 2, color: MN.black },
  jobTitle: { fontSize: 10.5, color: MN.accent, marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' as const },
  dividerLine: { height: 1, backgroundColor: MN.rule, marginTop: 10, marginBottom: 0 },
  sectionLabel: { fontSize: 8, textTransform: 'uppercase' as const, letterSpacing: 4, color: MN.accent, marginTop: 24, marginBottom: 4 },
  sectionBar: { width: 28, height: 1.5, backgroundColor: MN.accent, marginBottom: 10 },
  entryTitle: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: MN.black },
  meta: { fontSize: 9, color: MN.faint, letterSpacing: 0.5 },
  entryDivider: { height: 1, backgroundColor: MN.rule, marginTop: 14, marginBottom: 14 },
  skillTag: { fontSize: 8.5, padding: '2 8', backgroundColor: MN.accentLight, color: MN.accent, fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
});

export function PdfMinimal({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <View>
      <Text style={minimalS.sectionLabel}>{children}</Text>
      <View style={minimalS.sectionBar} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={minimalS.page}>
        <View style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, gap: 14 }}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 52, height: 52, borderRadius: 4 }} /> : null}
          <View>
            <Text style={minimalS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={minimalS.jobTitle}>{p.jobTitle}</Text> : null}
          </View>
        </View>
        <View style={minimalS.dividerLine} />
        <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 14, marginTop: 8 }}>
          {[p.email, p.phone, p.location, p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((c, i) => (
            <Text key={i} style={{ fontSize: 8.5, color: MN.muted, letterSpacing: 0.3 }}>{c}</Text>
          ))}
        </View>

        {summary ? <><SectionTitle>Summary</SectionTitle><Text style={{ color: MN.muted, lineHeight: 1.85 }}>{summary}</Text></> : null}

        {experience.length > 0 && <><SectionTitle>Experience</SectionTitle>{experience.map((exp, idx) => (
          <View key={exp.id}>
            <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
              <Text style={minimalS.entryTitle}>{exp.role}</Text>
              <Text style={minimalS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
            </View>
            <Text style={{ fontSize: 9.5, color: MN.accent, marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' — ')}</Text>
            <BulletList items={exp.bulletPoints} bullet="·" color={MN.text} />
            {idx < experience.length - 1 && <View style={minimalS.entryDivider} />}
          </View>
        ))}</>}

        {education.length > 0 && <><SectionTitle>Education</SectionTitle>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
              <Text style={minimalS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={minimalS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
            </View>
            <Text style={{ fontSize: 9.5, color: MN.muted }}>{[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><SectionTitle>Projects</SectionTitle>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 12 }}>
            <Text style={minimalS.entryTitle}>{proj.name}</Text>
            {proj.techStack ? <Text style={minimalS.meta}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} bullet="·" color={MN.text} />
          </View>
        ))}</>}

        {skills.length > 0 && <>
          <SectionTitle>Skills</SectionTitle>
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
            {skills.map((s, i) => <Text key={i} style={minimalS.skillTag}>{s}</Text>)}
          </View>
        </>}

        {extras.certifications ? <><SectionTitle>Certifications</SectionTitle><Text style={{ color: MN.text }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><SectionTitle>Languages</SectionTitle><Text style={{ color: MN.text }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><SectionTitle>Achievements</SectionTitle><Text style={{ color: MN.text }}>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}
