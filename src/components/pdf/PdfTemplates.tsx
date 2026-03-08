/**
 * PDF Templates — all 5 templates for @react-pdf/renderer.
 * Matches the HTML templates: Classic, Compact, Left Sidebar, Modern, Minimal.
 */
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

/* ── Shared helpers ── */

function BulletList({ items, fontSize = 10 }: { items: string[]; fontSize?: number }) {
  const filtered = items.filter(b => b.trim());
  return (
    <View style={{ marginTop: 3 }}>
      {filtered.map((b, i) => (
        <Text key={i} style={{ fontSize, marginBottom: 2, paddingLeft: 12 }}>•  {b}</Text>
      ))}
    </View>
  );
}

function ContactLine({ parts, style }: { parts: string[]; style?: any }) {
  if (!parts.length) return null;
  return <Text style={{ fontSize: 9, color: '#666', marginTop: 2, ...style }}>{parts.join('  |  ')}</Text>;
}

/* ═══════════════════════════════════════════════
   1. CLASSIC — serif headings, centered header
   ═══════════════════════════════════════════════ */

const classicS = StyleSheet.create({
  page: { padding: '32 36', fontFamily: 'Helvetica', fontSize: 10, color: '#222', lineHeight: 1.4 },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', textAlign: 'center' as const },
  jobTitle: { fontSize: 12, color: '#555', textAlign: 'center' as const, marginTop: 2 },
  section: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, borderBottomWidth: 1.5, borderBottomColor: '#222', paddingBottom: 2, marginTop: 12, marginBottom: 6 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#666' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfClassic({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={classicS.page}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 56, height: 56, borderRadius: 28, marginBottom: 6, alignSelf: 'center' as const }} /> : null}
        <Text style={classicS.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={classicS.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ textAlign: 'center', marginTop: 4 }} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ textAlign: 'center' }} />

        {summary ? <><Text style={classicS.section}>Summary</Text><Text>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={classicS.section}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 8 }}>
            <View style={classicS.row}>
              <Text style={classicS.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text>
              <Text style={classicS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
            </View>
            {exp.location ? <Text style={classicS.meta}>{exp.location}</Text> : null}
            <BulletList items={exp.bulletPoints} />
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={classicS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 6 }}>
            <View style={classicS.row}>
              <Text style={classicS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={classicS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
            </View>
            <Text>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={classicS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 8 }}>
            <Text style={classicS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ ...classicS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={classicS.section}>Skills</Text><Text>{skills.join(', ')}</Text></>}
        {extras.certifications ? <><Text style={classicS.section}>Certifications</Text><Text>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={classicS.section}>Languages</Text><Text>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={classicS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   2. COMPACT — tighter spacing, smaller fonts
   ═══════════════════════════════════════════════ */

const compactS = StyleSheet.create({
  page: { padding: '24 28', fontFamily: 'Helvetica', fontSize: 9, color: '#222', lineHeight: 1.3 },
  name: { fontSize: 16, fontFamily: 'Helvetica-Bold', textAlign: 'center' as const },
  jobTitle: { fontSize: 10, color: '#555', textAlign: 'center' as const, marginTop: 1 },
  section: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: '#bbb', paddingBottom: 2, marginTop: 8, marginBottom: 4 },
  entryTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 8, color: '#777' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfCompact({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={compactS.page}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 44, height: 44, borderRadius: 22, marginBottom: 4, alignSelf: 'center' as const }} /> : null}
        <Text style={compactS.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={compactS.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ textAlign: 'center', marginTop: 3, fontSize: 8 }} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ textAlign: 'center', fontSize: 8 }} />

        {summary ? <><Text style={compactS.section}>Summary</Text><Text style={{ fontSize: 9 }}>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={compactS.section}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 5 }}>
            <View style={compactS.row}>
              <Text style={compactS.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text>
              <Text style={compactS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
            </View>
            {exp.location ? <Text style={compactS.meta}>{exp.location}</Text> : null}
            <BulletList items={exp.bulletPoints} fontSize={9} />
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={compactS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 4 }}>
            <View style={compactS.row}>
              <Text style={compactS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={compactS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
            </View>
            <Text style={{ fontSize: 9 }}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={compactS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 5 }}>
            <Text style={compactS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ ...compactS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} fontSize={9} />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={compactS.section}>Skills</Text><Text style={{ fontSize: 9 }}>{skills.join(', ')}</Text></>}
        {extras.certifications ? <><Text style={compactS.section}>Certifications</Text><Text style={{ fontSize: 9 }}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={compactS.section}>Languages</Text><Text style={{ fontSize: 9 }}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={compactS.section}>Achievements</Text><Text style={{ fontSize: 9 }}>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   3. LEFT SIDEBAR — dark left column, right body
   ═══════════════════════════════════════════════ */

const sidebarS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#222', lineHeight: 1.4, flexDirection: 'row' as const },
  sidebar: { width: 180, backgroundColor: '#1e293b', color: '#e2e8f0', padding: '28 16' },
  sidebarName: { fontSize: 15, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  sidebarJobTitle: { fontSize: 10, color: '#94a3b8', marginTop: 3 },
  sidebarSection: { fontSize: 9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, color: '#ffffff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', paddingBottom: 2, marginTop: 12, marginBottom: 5 },
  sidebarText: { fontSize: 9, color: '#cbd5e1', marginBottom: 2 },
  body: { flex: 1, padding: '28 24' },
  section: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, borderBottomWidth: 1.5, borderBottomColor: '#ccc', paddingBottom: 2, marginTop: 12, marginBottom: 6, color: '#333' },
  entryTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#888' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfLeftSidebar({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={sidebarS.page}>
        {/* Sidebar */}
        <View style={sidebarS.sidebar}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 8, alignSelf: 'center' as const }} /> : null}
          <Text style={sidebarS.sidebarName}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={sidebarS.sidebarJobTitle}>{p.jobTitle}</Text> : null}

          <Text style={sidebarS.sidebarSection}>Contact</Text>
          {p.email ? <Text style={sidebarS.sidebarText}>{p.email}</Text> : null}
          {p.phone ? <Text style={sidebarS.sidebarText}>{p.phone}</Text> : null}
          {p.location ? <Text style={sidebarS.sidebarText}>{p.location}</Text> : null}
          {p.linkedinUrl ? <Text style={sidebarS.sidebarText}>{p.linkedinUrl}</Text> : null}
          {p.githubUrl ? <Text style={sidebarS.sidebarText}>{p.githubUrl}</Text> : null}
          {p.portfolioUrl ? <Text style={sidebarS.sidebarText}>{p.portfolioUrl}</Text> : null}

          {skills.length > 0 && <>
            <Text style={sidebarS.sidebarSection}>Skills</Text>
            <Text style={sidebarS.sidebarText}>{skills.join(', ')}</Text>
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

        {/* Main body */}
        <View style={sidebarS.body}>
          {summary ? <><Text style={sidebarS.section}>Summary</Text><Text>{summary}</Text></> : null}

          {experience.length > 0 && <><Text style={sidebarS.section}>Experience</Text>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 8 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text>
                <Text style={sidebarS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
              </View>
              {exp.location ? <Text style={sidebarS.meta}>{exp.location}</Text> : null}
              <BulletList items={exp.bulletPoints} />
            </View>
          ))}</>}

          {education.length > 0 && <><Text style={sidebarS.section}>Education</Text>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View style={sidebarS.row}>
                <Text style={sidebarS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                <Text style={sidebarS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
              </View>
              <Text>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><Text style={sidebarS.section}>Projects</Text>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 8 }}>
              <Text style={sidebarS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ ...sidebarS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} />
            </View>
          ))}</>}

          {extras.achievements ? <><Text style={sidebarS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   4. MODERN — blue accent name, colored dividers
   ═══════════════════════════════════════════════ */

const BLUE = '#2563eb';
const modernS = StyleSheet.create({
  page: { padding: '32 36', fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', lineHeight: 1.4 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: BLUE },
  jobTitle: { fontSize: 13, color: '#444', marginTop: 2 },
  section: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1, color: BLUE, borderBottomWidth: 2, borderBottomColor: BLUE, paddingBottom: 2, marginTop: 14, marginBottom: 6 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#888' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfModern({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={modernS.page}>
        <View style={{ flexDirection: 'row' as const, alignItems: 'center' as const, gap: 12, marginBottom: 4 }}>
          {p.profileImage ? <Image src={p.profileImage} style={{ width: 60, height: 60, borderRadius: 30 }} /> : null}
          <View>
            <Text style={modernS.name}>{p.fullName || 'Your Name'}</Text>
            {p.jobTitle ? <Text style={modernS.jobTitle}>{p.jobTitle}</Text> : null}
            <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ marginTop: 6 }} />
            <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
          </View>
        </View>
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />

        {summary ? <><Text style={modernS.section}>Summary</Text><Text>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={modernS.section}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 8 }}>
            <View style={modernS.row}><Text style={modernS.entryTitle}>{exp.role}</Text><Text style={modernS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={{ fontSize: 10, color: '#555' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</Text>
            <BulletList items={exp.bulletPoints} />
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={modernS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 6 }}>
            <View style={modernS.row}><Text style={modernS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={modernS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={modernS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 8 }}>
            <Text style={modernS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ ...modernS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={modernS.section}>Skills</Text><Text>{skills.join('  •  ')}</Text></>}
        {extras.certifications ? <><Text style={modernS.section}>Certifications</Text><Text>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={modernS.section}>Languages</Text><Text>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={modernS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   5. MINIMAL — light, airy, understated
   ═══════════════════════════════════════════════ */

const minimalS = StyleSheet.create({
  page: { padding: '40 44', fontFamily: 'Helvetica', fontSize: 10, color: '#333', lineHeight: 1.5 },
  name: { fontSize: 18, letterSpacing: 1 },
  jobTitle: { fontSize: 11, color: '#888', marginTop: 2 },
  section: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 2, color: '#999', marginTop: 16, marginBottom: 6 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#999' },
});

export function PdfMinimal({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={minimalS.page}>
        {p.profileImage ? <Image src={p.profileImage} style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 8 }} /> : null}
        <Text style={minimalS.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={minimalS.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ color: '#aaa', marginTop: 8 }} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} style={{ color: '#aaa' }} />

        {summary ? <><Text style={minimalS.section}>Summary</Text><Text style={{ color: '#555' }}>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={minimalS.section}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 10 }}>
            <Text style={minimalS.entryTitle}>{exp.role}{exp.company ? `, ${exp.company}` : ''}</Text>
            <Text style={minimalS.meta}>{[exp.location, exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' · ')}</Text>
            <BulletList items={exp.bulletPoints} />
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={minimalS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 6 }}>
            <Text style={minimalS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
            <Text style={minimalS.meta}>{[edu.schoolName, edu.startYear && edu.endYear ? `${edu.startYear}–${edu.endYear}` : '', edu.grade].filter(Boolean).join(' · ')}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={minimalS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 8 }}>
            <Text style={minimalS.entryTitle}>{proj.name}</Text>
            {proj.techStack ? <Text style={minimalS.meta}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={minimalS.section}>Skills</Text><Text style={{ color: '#555' }}>{skills.join(', ')}</Text></>}
        {extras.certifications ? <><Text style={minimalS.section}>Certifications</Text><Text>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={minimalS.section}>Languages</Text><Text>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={minimalS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}
