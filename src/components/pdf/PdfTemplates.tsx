/**
 * PDF Templates — all 5 templates for @react-pdf/renderer.
 * Uses built-in Helvetica font (no external font loading needed).
 */
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

/* ── Shared helpers ── */

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  return (
    <View style={{ marginTop: 3 }}>
      {filtered.map((b, i) => (
        <Text key={i} style={{ fontSize: 10, marginBottom: 2, paddingLeft: 12 }}>•  {b}</Text>
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
   2. MODERN — blue accent name, colored dividers
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
        <Text style={modernS.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={modernS.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ marginTop: 6 }} />
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
   3. MINIMAL — light, airy, understated
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

/* ═══════════════════════════════════════════════
   4. PROFESSIONAL — left border accents
   ═══════════════════════════════════════════════ */

const DARK_BLUE = '#1e40af';
const profS = StyleSheet.create({
  page: { padding: '32 36', fontFamily: 'Helvetica', fontSize: 10, color: '#222', lineHeight: 1.4 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: DARK_BLUE },
  jobTitle: { fontSize: 12, color: '#555', marginTop: 2 },
  section: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1, color: DARK_BLUE, borderLeftWidth: 3, borderLeftColor: DARK_BLUE, paddingLeft: 8, marginTop: 14, marginBottom: 6 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#888' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfProfessional({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={profS.page}>
        <View style={{ borderBottomWidth: 2, borderBottomColor: DARK_BLUE, paddingBottom: 8, marginBottom: 4 }}>
          <Text style={profS.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={profS.jobTitle}>{p.jobTitle}</Text> : null}
          <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ marginTop: 6 }} />
          <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
        </View>

        {summary ? <><Text style={profS.section}>Summary</Text><Text>{summary}</Text></> : null}

        {experience.length > 0 && <><Text style={profS.section}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 8 }}>
            <View style={profS.row}><Text style={profS.entryTitle}>{exp.role}</Text><Text style={profS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
            <Text style={{ fontSize: 10, color: '#555' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</Text>
            <BulletList items={exp.bulletPoints} />
          </View>
        ))}</>}

        {education.length > 0 && <><Text style={profS.section}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 6 }}>
            <View style={profS.row}><Text style={profS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={profS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
            <Text>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}

        {projects.length > 0 && <><Text style={profS.section}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 8 }}>
            <Text style={profS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ ...profS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} />
          </View>
        ))}</>}

        {skills.length > 0 && <><Text style={profS.section}>Skills</Text><Text>{skills.join('  •  ')}</Text></>}
        {extras.certifications ? <><Text style={profS.section}>Certifications</Text><Text>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={profS.section}>Languages</Text><Text>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={profS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
      </Page>
    </Document>
  );
}

/* ═══════════════════════════════════════════════
   5. CLEAN — two-tone header
   ═══════════════════════════════════════════════ */

const cleanS = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#222', lineHeight: 1.4 },
  header: { backgroundColor: '#f0f4f8', padding: '28 36 20', borderBottomWidth: 2, borderBottomColor: '#2563eb' },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold' },
  jobTitle: { fontSize: 12, color: '#555', marginTop: 2 },
  body: { padding: '8 36 32' },
  section: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' as const, letterSpacing: 1.5, color: '#333', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 2, marginTop: 14, marginBottom: 6 },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 9, color: '#888' },
  row: { flexDirection: 'row' as const, justifyContent: 'space-between' as const },
});

export function PdfClean({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document>
      <Page size="A4" style={cleanS.page}>
        <View style={cleanS.header}>
          <Text style={cleanS.name}>{p.fullName || 'Your Name'}</Text>
          {p.jobTitle ? <Text style={cleanS.jobTitle}>{p.jobTitle}</Text> : null}
          <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} style={{ marginTop: 8 }} />
          <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
        </View>
        <View style={cleanS.body}>
          {summary ? <><Text style={cleanS.section}>Summary</Text><Text>{summary}</Text></> : null}

          {experience.length > 0 && <><Text style={cleanS.section}>Experience</Text>{experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 8 }}>
              <View style={cleanS.row}><Text style={cleanS.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text><Text style={cleanS.meta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text></View>
              {exp.location ? <Text style={cleanS.meta}>{exp.location}</Text> : null}
              <BulletList items={exp.bulletPoints} />
            </View>
          ))}</>}

          {education.length > 0 && <><Text style={cleanS.section}>Education</Text>{education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View style={cleanS.row}><Text style={cleanS.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text><Text style={cleanS.meta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text></View>
              <Text>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
            </View>
          ))}</>}

          {projects.length > 0 && <><Text style={cleanS.section}>Projects</Text>{projects.map(proj => (
            <View key={proj.id} style={{ marginBottom: 8 }}>
              <Text style={cleanS.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
              {proj.techStack ? <Text style={{ ...cleanS.meta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
              <BulletList items={proj.bulletPoints} />
            </View>
          ))}</>}

          {skills.length > 0 && <><Text style={cleanS.section}>Skills</Text><Text>{skills.join(', ')}</Text></>}
          {extras.certifications ? <><Text style={cleanS.section}>Certifications</Text><Text>{extras.certifications}</Text></> : null}
          {extras.languages ? <><Text style={cleanS.section}>Languages</Text><Text>{extras.languages}</Text></> : null}
          {extras.achievements ? <><Text style={cleanS.section}>Achievements</Text><Text>{extras.achievements}</Text></> : null}
        </View>
      </Page>
    </Document>
  );
}
