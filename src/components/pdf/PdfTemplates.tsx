/**
 * PDF Templates — all 5 templates for @react-pdf/renderer.
 * Matches the redesigned HTML templates: Classic, Compact, Left Sidebar, Modern, Minimal.
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
  return <Text style={{ fontSize: 9, color: '#777', marginTop: 2, ...style }}>{parts.join('   ·   ')}</Text>;
}

/* ═══════════════════════════════════════════════
   1. CLASSIC — Executive serif elegance with gold accents
   ═══════════════════════════════════════════════ */

const CLASSIC_ACCENT = '#1a1a2e';
const CLASSIC_RULE = '#c9b99a';

const classicS = StyleSheet.create({
  page: { padding: '40 44', fontFamily: 'Helvetica', fontSize: 10.5, color: '#2d2d2d', lineHeight: 1.5 },
  name: { fontSize: 24, letterSpacing: 3, textAlign: 'center' as const, color: CLASSIC_ACCENT, textTransform: 'uppercase' as const },
  jobTitle: { fontSize: 11, color: '#6b6b6b', textAlign: 'center' as const, marginTop: 3, fontStyle: 'italic', letterSpacing: 1 },
  divider: { width: 40, height: 2, backgroundColor: CLASSIC_RULE, alignSelf: 'center' as const, marginTop: 8, marginBottom: 4 },
  section: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 3, color: CLASSIC_ACCENT, marginTop: 18, marginBottom: 4 },
  sectionRule: { height: 1, backgroundColor: CLASSIC_RULE, marginBottom: 8 },
  entryTitle: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: CLASSIC_ACCENT },
  meta: { fontSize: 9, color: '#999', fontStyle: 'italic' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
  skillTag: { fontSize: 9, padding: '2 8', borderWidth: 1, borderColor: CLASSIC_RULE, color: CLASSIC_ACCENT, marginRight: 4, marginBottom: 4 },
});

export function PdfClassic({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={classicS.page}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 8, alignSelf: 'center' as const }} /> : null}
        <Text style={classicS.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={classicS.jobTitle}>{p.jobTitle}</Text> : null}
        <View style={classicS.divider} />
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ textAlign: 'center', marginTop: 4, letterSpacing: 0.5 }} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ textAlign: 'center', letterSpacing: 0.5 }} />

        {summary ? <>
          <Text style={classicS.section}>Professional Summary</Text>
          <View style={classicS.sectionRule} />
          <Text style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.7 }}>{summary}</Text>
        </> : null}

        {experience.length > 0 && <>
          <Text style={classicS.section}>Professional Experience</Text>
          <View style={classicS.sectionRule} />
          {experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 12 }}>
              <View style={classicS.row}>
                <Text style={classicS.entryTitle}>{exp.role}</Text>
                <Text style={classicS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              <Text style={{ fontSize: 10, color: '#666', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
              <BulletList items={exp.bulletPoints} bullet="—" color="#2d2d2d" />
            </View>
          ))}
        </>}

        {education.length > 0 && <>
          <Text style={classicS.section}>Education</Text>
          <View style={classicS.sectionRule} />
          {education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 8 }}>
              <View style={classicS.row}>
                <Text style={classicS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={classicS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text style={{ fontSize: 10, color: '#666' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}
        </>}

        {projects.length > 0 && <>
          <Text style={classicS.section}>Projects</Text>
          <View style={classicS.sectionRule} />
          {projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 10 }}>
              <Text style={classicS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ fontSize: 9, color: CLASSIC_RULE, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} bullet="—" color="#2d2d2d" />
            </View>
          ))}
        </>}

        {skills.length > 0 && <>
          <Text style={classicS.section}>Skills & Expertise</Text>
          <View style={classicS.sectionRule} />
          <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
            {skills.map((s, i) => <Text key={i} style={classicS.skillTag}>{s}</Text>)}
          </View>
        </>}

        {extras.certifications ? <><Text style={classicS.section}>Certifications</Text><View style={classicS.sectionRule} /><Text style={{ color: '#444' }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={classicS.section}>Languages</Text><View style={classicS.sectionRule} /><Text style={{ color: '#444' }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={classicS.section}>Achievements</Text><View style={classicS.sectionRule} /><Text style={{ color: '#444' }}>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   2. COMPACT — Teal accent, dense professional layout
   ═══════════════════════════════════════════════ */

const COMPACT_ACCENT = '#0f766e';

const compactS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9.5, color: '#1f2937', lineHeight: 1.4 },
  topBar: { height: 4, backgroundColor: COMPACT_ACCENT },
  header: { padding: '14 24 10', backgroundColor: '#f0fdfa', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 12 },
  name: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#111827', letterSpacing: 0.5 },
  jobTitle: { fontSize: 9.5, color: COMPACT_ACCENT, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1, marginTop: 1 },
  body: { padding: '6 24 18' },
  section: { fontSize: 9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2, color: COMPACT_ACCENT, borderBottomWidth: 1.5, borderBottomColor: COMPACT_ACCENT, paddingBottom: 2, marginTop: 10, marginBottom: 5 },
  entryTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827' },
  meta: { fontSize: 8, color: '#9ca3af' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
  skillTag: { fontSize: 8, padding: '2 6', backgroundColor: '#f0fdfa', color: COMPACT_ACCENT, fontFamily: 'Helvetica-Bold', marginRight: 3, marginBottom: 3 },
});

export function PdfCompact({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={compactS.page}>
        <View style={compactS.topBar} />
        <View style={compactS.header}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 42, height: 42, borderRadius: 21 }} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={compactS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={compactS.jobTitle}>{p.jobTitle}</Text> : null}
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10, marginTop: 3 }}>
              {[p.email, p.phone, p.location, p.linkedinUrl, p.githubUrl, p.portfolioUrl].filter(Boolean).map((c, i) => (
                <Text key={i} style={{ fontSize: 8, color: '#6b7280' }}>{c}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={compactS.body}>
          {summary ? <><Text style={compactS.section}>Summary</Text><Text style={{ fontSize: 9.5, color: '#374151', lineHeight: 1.5 }}>{summary}</Text></> : null}

          {experience.length > 0 && <><Text style={compactS.section}>Experience</Text>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 7 }}>
              <View style={compactS.row}>
                <Text style={compactS.entryTitle}>{exp.role}{exp.company ? <Text style={{ fontFamily: 'Helvetica', color: '#6b7280' }}> at {exp.company}</Text> : null}</Text>
                <Text style={compactS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              {exp.location ? <Text style={compactS.meta}>{exp.location}</Text> : null}
              <BulletList items={exp.bulletPoints} fontSize={9} bullet="▸" />
            </View>
          ))}</>}

          {education.length > 0 && <><Text style={compactS.section}>Education</Text>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 5 }}>
              <View style={compactS.row}>
                <Text style={compactS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={compactS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text style={{ fontSize: 9.5 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><Text style={compactS.section}>Projects</Text>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 6 }}>
              <Text style={compactS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ fontSize: 8, color: COMPACT_ACCENT, fontFamily: 'Helvetica-Bold' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} fontSize={9} bullet="▸" />
            </View>
          ))}</>}

          {skills.length > 0 && <>
            <Text style={compactS.section}>Skills</Text>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={compactS.skillTag}>{s}</Text>)}
            </View>
          </>}

          {extras.certifications ? <><Text style={compactS.section}>Certifications</Text><Text style={{ fontSize: 9 }}>{extras.certifications}</Text></> : null}
          {extras.languages ? <><Text style={compactS.section}>Languages</Text><Text style={{ fontSize: 9 }}>{extras.languages}</Text></> : null}
          {extras.achievements ? <><Text style={compactS.section}>Achievements</Text><Text style={{ fontSize: 9 }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   3. LEFT SIDEBAR — Premium dark gradient sidebar with sky-blue accents
   ═══════════════════════════════════════════════ */

const SIDEBAR_ACCENT = '#38bdf8';

const sidebarS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#1e293b', lineHeight: 1.5, flexDirection: 'row' as const },
  sidebar: { width: 190, backgroundColor: '#0f172a', color: '#e2e8f0', padding: '32 18' },
  sidebarName: { fontSize: 17, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center' as const },
  sidebarJobTitle: { fontSize: 9, color: SIDEBAR_ACCENT, marginTop: 3, fontFamily: 'Helvetica-Bold', textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: 1.5 },
  sidebarSection: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2.5, color: SIDEBAR_ACCENT, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 3, marginTop: 16, marginBottom: 6 },
  sidebarText: { fontSize: 9, color: '#cbd5e1', marginBottom: 3 },
  sidebarSkillTag: { fontSize: 8, backgroundColor: 'rgba(56,189,248,0.15)', color: SIDEBAR_ACCENT, padding: '2 6', marginRight: 3, marginBottom: 3 },
  body: { flex: 1, padding: '32 26 32 22' },
  section: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2, color: '#0f172a', borderBottomWidth: 2, borderBottomColor: '#e2e8f0', paddingBottom: 3, marginTop: 16, marginBottom: 8 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#0f172a' },
  meta: { fontSize: 8.5, color: '#94a3b8', letterSpacing: 0.3 },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfLeftSidebar({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
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
          {p.linkedinUrl ? <Text style={{ ...sidebarS.sidebarText, fontSize: 8, color: '#94a3b8' }}>{p.linkedinUrl}</Text> : null}
          {p.githubUrl ? <Text style={{ ...sidebarS.sidebarText, fontSize: 8, color: '#94a3b8' }}>{p.githubUrl}</Text> : null}
          {p.portfolioUrl ? <Text style={{ ...sidebarS.sidebarText, fontSize: 8, color: '#94a3b8' }}>{p.portfolioUrl}</Text> : null}

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
          {summary ? <><Text style={sidebarS.section}>Profile</Text><Text style={{ color: '#475569', lineHeight: 1.7 }}>{summary}</Text></> : null}

          {experience.length > 0 && <><Text style={sidebarS.section}>Experience</Text>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 12 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{exp.role}</Text>
                <Text style={sidebarS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              <Text style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
              <BulletList items={exp.bulletPoints} />
            </View>
          ))}</>}

          {education.length > 0 && <><Text style={sidebarS.section}>Education</Text>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 8 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={sidebarS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text style={{ color: '#64748b' }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><Text style={sidebarS.section}>Projects</Text>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 10 }}>
              <Text style={sidebarS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ fontSize: 9, color: '#94a3b8' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} />
            </View>
          ))}</>}

          {extras.achievements ? <><Text style={sidebarS.section}>Achievements</Text><Text style={{ color: '#475569' }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   4. MODERN — Bold gradient header with pill badges
   ═══════════════════════════════════════════════ */

const MOD_PRIMARY = '#1d4ed8';
const MOD_DARK = '#0f172a';

const modernS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#1e293b', lineHeight: 1.5 },
  header: { backgroundColor: MOD_DARK, padding: '24 36', color: '#ffffff', flexDirection: 'row' as const, alignItems: 'center' as const, gap: 16 },
  name: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 0.5 },
  jobTitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2, letterSpacing: 1 },
  body: { padding: '10 36 28' },
  sectionWrap: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 6, marginTop: 16, marginBottom: 8 },
  sectionBar: { width: 3, height: 14, backgroundColor: MOD_PRIMARY },
  section: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, color: MOD_DARK },
  summaryBox: { backgroundColor: '#eff6ff', padding: '8 12', lineHeight: 1.7, color: '#475569' },
  entryTitle: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: MOD_DARK },
  datePill: { fontSize: 8.5, backgroundColor: MOD_PRIMARY, color: '#ffffff', padding: '1 8', fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 10, color: '#64748b' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  skillPill: { fontSize: 9, backgroundColor: '#eff6ff', color: MOD_PRIMARY, padding: '3 10', fontFamily: 'Helvetica-Bold', marginRight: 4, marginBottom: 4 },
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
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 64, height: 64, borderRadius: 32 }} /> : null}
          <View>
            <Text style={modernS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={modernS.jobTitle}>{p.jobTitle}</Text> : null}
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 12, marginTop: 8 }}>
              {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => (
                <Text key={i} style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)' }}>{c}</Text>
              ))}
            </View>
            {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).length > 0 && (
              <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 12, marginTop: 2 }}>
                {[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((l, i) => (
                  <Text key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.6)' }}>{l}</Text>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={modernS.body}>
          {summary ? <>
            <ModernSectionTitle>About Me</ModernSectionTitle>
            <View style={modernS.summaryBox}><Text>{summary}</Text></View>
          </> : null}

          {experience.length > 0 && <>
            <ModernSectionTitle>Experience</ModernSectionTitle>
            {experience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 12 }}>
                <View style={modernS.row}>
                  <Text style={modernS.entryTitle}>{exp.role}</Text>
                  <Text style={modernS.datePill}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
                </View>
                <Text style={modernS.meta}>{[exp.company, exp.location].filter(Boolean).join(' · ')}</Text>
                <BulletList items={exp.bulletPoints} />
              </View>
            ))}
          </>}

          {education.length > 0 && <>
            <ModernSectionTitle>Education</ModernSectionTitle>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={modernS.row}>
                  <Text style={modernS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                  <Text style={{ fontSize: 9, color: '#94a3b8' }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
                </View>
                <Text style={modernS.meta}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
              </View>
            ))}
          </>}

          {projects.length > 0 && <>
            <ModernSectionTitle>Projects</ModernSectionTitle>
            {projects.map(proj => (
              <View key={proj.id} style={{ marginBottom: 10 }}>
                <Text style={modernS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
                {proj.techStack ? <Text style={{ fontSize: 9, color: '#64748b' }}>Tech: {proj.techStack}</Text> : null}
                <BulletList items={proj.bulletPoints} />
              </View>
            ))}
          </>}

          {skills.length > 0 && <>
            <ModernSectionTitle>Technical Skills</ModernSectionTitle>
            <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const }}>
              {skills.map((s, i) => <Text key={i} style={modernS.skillPill}>{s}</Text>)}
            </View>
          </>}

          {extras.certifications ? <><ModernSectionTitle>Certifications</ModernSectionTitle><Text style={{ color: '#475569' }}>{extras.certifications}</Text></> : null}
          {extras.languages ? <><ModernSectionTitle>Languages</ModernSectionTitle><Text style={{ color: '#475569' }}>{extras.languages}</Text></> : null}
          {extras.achievements ? <><ModernSectionTitle>Achievements</ModernSectionTitle><Text style={{ color: '#475569' }}>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   5. MINIMAL — Swiss precision, ultra-clean
   ═══════════════════════════════════════════════ */

const minimalS = StyleSheet.create({
  page: { padding: '48 52', fontFamily: 'Helvetica', fontSize: 10.5, color: '#18181b', lineHeight: 1.6 },
  name: { fontSize: 22, letterSpacing: 2 },
  jobTitle: { fontSize: 10.5, color: '#71717a', marginTop: 2, letterSpacing: 0.5 },
  dividerLine: { height: 1, backgroundColor: '#e4e4e7', marginTop: 12, marginBottom: 0 },
  section: { fontSize: 8.5, textTransform: 'uppercase' as const, letterSpacing: 3, color: '#71717a', marginTop: 22, marginBottom: 8 },
  entryTitle: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: '#18181b' },
  meta: { fontSize: 9, color: '#71717a', letterSpacing: 0.5 },
  entryDivider: { height: 1, backgroundColor: '#e4e4e7', marginTop: 12, marginBottom: 12 },
});

export function PdfMinimal({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={minimalS.page}>
        <View style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, gap: 12 }}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 48, height: 48, borderRadius: 4 }} /> : null}
          <View>
            <Text style={minimalS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={minimalS.jobTitle}>{p.jobTitle}</Text> : null}
          </View>
        </View>
        <View style={minimalS.dividerLine} />
        <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 14, marginTop: 6 }}>
          {[p.email, p.phone, p.location, p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean).map((c, i) => (
            <Text key={i} style={{ fontSize: 8.5, color: '#71717a', letterSpacing: 0.3 }}>{c}</Text>
          ))}
        </View>

        {summary ? <><Text style={minimalS.section}>Summary</Text><Text style={{ color: '#3f3f46', lineHeight: 1.8 }}>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={minimalS.section}>Experience</Text>{experience.map((exp, idx) => (
          <View key={exp.id}>
            <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
              <Text style={minimalS.entryTitle}>{exp.role}</Text>
              <Text style={minimalS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
            </View>
            <Text style={{ fontSize: 9.5, color: '#71717a', marginTop: 1 }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</Text>
            <BulletList items={exp.bulletPoints} bullet="·" color="#3f3f46" />
            {idx < experience.length - 1 && <View style={minimalS.entryDivider} />}
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={minimalS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const }}>
              <Text style={minimalS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={minimalS.meta}>{edu.startYear}{edu.endYear ? `–${edu.endYear}` : ''}</Text>
            </View>
            <Text style={{ fontSize: 9.5, color: '#71717a' }}>{[edu.schoolName, edu.grade].filter(Boolean).join(' — ')}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={minimalS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 10 }}>
            <Text style={minimalS.entryTitle}>{proj.name}</Text>
            {proj.techStack ? <Text style={minimalS.meta}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} bullet="·" color="#3f3f46" />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={minimalS.section}>Skills</Text><Text style={{ color: '#3f3f46', lineHeight: 1.8 }}>{skills.join('  ·  ')}</Text></>}
        {extras.certifications ? <><Text style={minimalS.section}>Certifications</Text><Text style={{ color: '#3f3f46' }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={minimalS.section}>Languages</Text><Text style={{ color: '#3f3f46' }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={minimalS.section}>Achievements</Text><Text style={{ color: '#3f3f46' }}>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}
