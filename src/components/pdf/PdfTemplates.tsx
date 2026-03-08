/**
 * PDF Templates — all 5 templates for @react-pdf/renderer export.
 * Uses react-pdf's Document, Page, View, Text, StyleSheet.
 */
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Register a clean sans-serif font
Font.register({
  family: 'Helvetica',
  src: undefined as any, // Helvetica is built-in
});

const BASE_STYLES = {
  page: { padding: '32 36', fontFamily: 'Helvetica', fontSize: 11, color: '#222', lineHeight: 1.4 },
  name: { fontSize: 22, fontWeight: 'bold' as const, marginBottom: 2 },
  jobTitle: { fontSize: 13, color: '#555', marginBottom: 4 },
  contact: { fontSize: 10, color: '#666', marginBottom: 2 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginTop: 14, marginBottom: 6, paddingBottom: 3 },
  entryTitle: { fontSize: 12, fontWeight: 'bold' as const },
  entryMeta: { fontSize: 10, color: '#666' },
  bullet: { fontSize: 11, marginBottom: 2, paddingLeft: 12 },
  text: { fontSize: 11 },
};

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter(b => b.trim());
  return (
    <View style={{ marginTop: 3 }}>
      {filtered.map((b, i) => (
        <Text key={i} style={BASE_STYLES.bullet}>• {b}</Text>
      ))}
    </View>
  );
}

function ContactLine({ parts }: { parts: string[] }) {
  if (!parts.length) return null;
  return <Text style={BASE_STYLES.contact}>{parts.join('  |  ')}</Text>;
}

// ===== CLASSIC PDF =====
const classicStyles = StyleSheet.create({
  ...BASE_STYLES,
  header: { textAlign: 'center', marginBottom: 6 },
  sectionTitle: { ...BASE_STYLES.sectionTitle, borderBottomWidth: 1.5, borderBottomColor: '#222' },
});

export function PdfClassic({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document><Page size="A4" style={classicStyles.page}>
      <View style={classicStyles.header}>
        <Text style={classicStyles.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={classicStyles.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
      </View>
      {summary ? <><Text style={classicStyles.sectionTitle}>Summary</Text><Text style={classicStyles.text}>{summary}</Text></> : null}
      {experience.length > 0 && <><Text style={classicStyles.sectionTitle}>Experience</Text>{experience.map(exp => (
        <View key={exp.id} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={classicStyles.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text>
            <Text style={classicStyles.entryMeta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
          </View>
          {exp.location ? <Text style={classicStyles.entryMeta}>{exp.location}</Text> : null}
          <BulletList items={exp.bulletPoints} />
        </View>
      ))}</>}
      {education.length > 0 && <><Text style={classicStyles.sectionTitle}>Education</Text>{education.map(edu => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={classicStyles.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
            <Text style={classicStyles.entryMeta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
          </View>
          <Text style={classicStyles.text}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
        </View>
      ))}</>}
      {projects.length > 0 && <><Text style={classicStyles.sectionTitle}>Projects</Text>{projects.map(proj => (
        <View key={proj.id} style={{ marginBottom: 8 }}>
          <Text style={classicStyles.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
          {proj.techStack ? <Text style={{ ...classicStyles.entryMeta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
          <BulletList items={proj.bulletPoints} />
        </View>
      ))}</>}
      {skills.length > 0 && <><Text style={classicStyles.sectionTitle}>Skills</Text><Text style={classicStyles.text}>{skills.join(', ')}</Text></>}
      {extras.certifications ? <><Text style={classicStyles.sectionTitle}>Certifications</Text><Text style={classicStyles.text}>{extras.certifications}</Text></> : null}
      {extras.languages ? <><Text style={classicStyles.sectionTitle}>Languages</Text><Text style={classicStyles.text}>{extras.languages}</Text></> : null}
      {extras.achievements ? <><Text style={classicStyles.sectionTitle}>Achievements</Text><Text style={classicStyles.text}>{extras.achievements}</Text></> : null}
    </Page></Document>
  );
}

// ===== MODERN PDF =====
const modernStyles = StyleSheet.create({
  ...BASE_STYLES,
  name: { ...BASE_STYLES.name, fontSize: 26, color: '#2563eb' },
  sectionTitle: { ...BASE_STYLES.sectionTitle, color: '#2563eb', borderBottomWidth: 2, borderBottomColor: '#2563eb' },
});

export function PdfModern({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document><Page size="A4" style={modernStyles.page}>
      <View style={{ marginBottom: 8 }}>
        <Text style={modernStyles.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={{ fontSize: 14, color: '#444', marginBottom: 4 }}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
      </View>
      {summary ? <><Text style={modernStyles.sectionTitle}>Summary</Text><Text style={modernStyles.text}>{summary}</Text></> : null}
      {experience.length > 0 && <><Text style={modernStyles.sectionTitle}>Experience</Text>{experience.map(exp => (
        <View key={exp.id} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={modernStyles.entryTitle}>{exp.role}</Text>
            <Text style={modernStyles.entryMeta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
          </View>
          <Text style={{ fontSize: 11, color: '#555' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</Text>
          <BulletList items={exp.bulletPoints} />
        </View>
      ))}</>}
      {education.length > 0 && <><Text style={modernStyles.sectionTitle}>Education</Text>{education.map(edu => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={modernStyles.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
            <Text style={modernStyles.entryMeta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
          </View>
          <Text style={modernStyles.text}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
        </View>
      ))}</>}
      {projects.length > 0 && <><Text style={modernStyles.sectionTitle}>Projects</Text>{projects.map(proj => (
        <View key={proj.id} style={{ marginBottom: 8 }}>
          <Text style={modernStyles.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
          {proj.techStack ? <Text style={{ ...modernStyles.entryMeta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
          <BulletList items={proj.bulletPoints} />
        </View>
      ))}</>}
      {skills.length > 0 && <><Text style={modernStyles.sectionTitle}>Skills</Text><Text style={modernStyles.text}>{skills.join('  •  ')}</Text></>}
      {extras.certifications ? <><Text style={modernStyles.sectionTitle}>Certifications</Text><Text style={modernStyles.text}>{extras.certifications}</Text></> : null}
      {extras.languages ? <><Text style={modernStyles.sectionTitle}>Languages</Text><Text style={modernStyles.text}>{extras.languages}</Text></> : null}
      {extras.achievements ? <><Text style={modernStyles.sectionTitle}>Achievements</Text><Text style={modernStyles.text}>{extras.achievements}</Text></> : null}
    </Page></Document>
  );
}

// ===== MINIMAL PDF =====
const minimalStyles = StyleSheet.create({
  ...BASE_STYLES,
  page: { ...BASE_STYLES.page, padding: '40 44' },
  name: { fontSize: 20, fontWeight: 'normal' as const, letterSpacing: 1, marginBottom: 2 },
  jobTitle: { fontSize: 12, color: '#888', marginBottom: 4 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: 2, color: '#999', marginTop: 16, marginBottom: 6 },
});

export function PdfMinimal({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document><Page size="A4" style={minimalStyles.page}>
      <View style={{ marginBottom: 12 }}>
        <Text style={minimalStyles.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={minimalStyles.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
      </View>
      {summary ? <><Text style={minimalStyles.sectionTitle}>Summary</Text><Text style={{ ...minimalStyles.text, color: '#555' }}>{summary}</Text></> : null}
      {experience.length > 0 && <><Text style={minimalStyles.sectionTitle}>Experience</Text>{experience.map(exp => (
        <View key={exp.id} style={{ marginBottom: 10 }}>
          <Text style={minimalStyles.entryTitle}>{exp.role}{exp.company ? `, ${exp.company}` : ''}</Text>
          <Text style={{ fontSize: 10, color: '#999' }}>{[exp.location, exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' · ')}</Text>
          <BulletList items={exp.bulletPoints} />
        </View>
      ))}</>}
      {education.length > 0 && <><Text style={minimalStyles.sectionTitle}>Education</Text>{education.map(edu => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <Text style={minimalStyles.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
          <Text style={{ fontSize: 10, color: '#999' }}>{[edu.schoolName, edu.startYear && edu.endYear ? `${edu.startYear}–${edu.endYear}` : '', edu.grade].filter(Boolean).join(' · ')}</Text>
        </View>
      ))}</>}
      {projects.length > 0 && <><Text style={minimalStyles.sectionTitle}>Projects</Text>{projects.map(proj => (
        <View key={proj.id} style={{ marginBottom: 8 }}>
          <Text style={minimalStyles.entryTitle}>{proj.name}</Text>
          {proj.techStack ? <Text style={{ fontSize: 10, color: '#999' }}>{proj.techStack}</Text> : null}
          <BulletList items={proj.bulletPoints} />
        </View>
      ))}</>}
      {skills.length > 0 && <><Text style={minimalStyles.sectionTitle}>Skills</Text><Text style={{ ...minimalStyles.text, color: '#555' }}>{skills.join(', ')}</Text></>}
      {extras.certifications ? <><Text style={minimalStyles.sectionTitle}>Certifications</Text><Text style={minimalStyles.text}>{extras.certifications}</Text></> : null}
      {extras.languages ? <><Text style={minimalStyles.sectionTitle}>Languages</Text><Text style={minimalStyles.text}>{extras.languages}</Text></> : null}
      {extras.achievements ? <><Text style={minimalStyles.sectionTitle}>Achievements</Text><Text style={minimalStyles.text}>{extras.achievements}</Text></> : null}
    </Page></Document>
  );
}

// ===== PROFESSIONAL PDF =====
const profStyles = StyleSheet.create({
  ...BASE_STYLES,
  name: { ...BASE_STYLES.name, fontSize: 24, color: '#1e40af' },
  sectionTitle: { ...BASE_STYLES.sectionTitle, color: '#1e40af', borderLeftWidth: 3, borderLeftColor: '#1e40af', paddingLeft: 8 },
});

export function PdfProfessional({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document><Page size="A4" style={profStyles.page}>
      <View style={{ borderBottomWidth: 2, borderBottomColor: '#1e40af', paddingBottom: 8, marginBottom: 4 }}>
        <Text style={profStyles.name}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={profStyles.jobTitle}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
      </View>
      {summary ? <><Text style={profStyles.sectionTitle}>Summary</Text><Text style={profStyles.text}>{summary}</Text></> : null}
      {experience.length > 0 && <><Text style={profStyles.sectionTitle}>Experience</Text>{experience.map(exp => (
        <View key={exp.id} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={profStyles.entryTitle}>{exp.role}</Text>
            <Text style={profStyles.entryMeta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
          </View>
          <Text style={{ fontSize: 11, color: '#555' }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</Text>
          <BulletList items={exp.bulletPoints} />
        </View>
      ))}</>}
      {education.length > 0 && <><Text style={profStyles.sectionTitle}>Education</Text>{education.map(edu => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={profStyles.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
            <Text style={profStyles.entryMeta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
          </View>
          <Text style={profStyles.text}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
        </View>
      ))}</>}
      {projects.length > 0 && <><Text style={profStyles.sectionTitle}>Projects</Text>{projects.map(proj => (
        <View key={proj.id} style={{ marginBottom: 8 }}>
          <Text style={profStyles.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
          {proj.techStack ? <Text style={{ ...profStyles.entryMeta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
          <BulletList items={proj.bulletPoints} />
        </View>
      ))}</>}
      {skills.length > 0 && <><Text style={profStyles.sectionTitle}>Skills</Text><Text style={profStyles.text}>{skills.join('  •  ')}</Text></>}
      {extras.certifications ? <><Text style={profStyles.sectionTitle}>Certifications</Text><Text style={profStyles.text}>{extras.certifications}</Text></> : null}
      {extras.languages ? <><Text style={profStyles.sectionTitle}>Languages</Text><Text style={profStyles.text}>{extras.languages}</Text></> : null}
      {extras.achievements ? <><Text style={profStyles.sectionTitle}>Achievements</Text><Text style={profStyles.text}>{extras.achievements}</Text></> : null}
    </Page></Document>
  );
}

// ===== CLEAN PDF =====
const cleanStyles = StyleSheet.create({
  ...BASE_STYLES,
  sectionTitle: { ...BASE_STYLES.sectionTitle, borderBottomWidth: 1, borderBottomColor: '#ddd', color: '#333' },
});

export function PdfClean({ data }: { data: ResumeData }) {
  const { personal: p, summary, experience, education, projects, skills, extras } = data;
  return (
    <Document><Page size="A4" style={{ fontFamily: 'Helvetica', fontSize: 11, color: '#222', lineHeight: 1.4 }}>
      <View style={{ backgroundColor: '#f0f4f8', padding: '28 36 20', borderBottomWidth: 2, borderBottomColor: '#2563eb' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{p.fullName || 'Your Name'}</Text>
        {p.jobTitle ? <Text style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{p.jobTitle}</Text> : null}
        <ContactLine parts={[p.email, p.phone, p.location].filter(Boolean)} />
        <ContactLine parts={[p.portfolioUrl, p.linkedinUrl, p.githubUrl].filter(Boolean)} />
      </View>
      <View style={{ padding: '8 36 32' }}>
        {summary ? <><Text style={cleanStyles.sectionTitle}>Summary</Text><Text style={cleanStyles.text}>{summary}</Text></> : null}
        {experience.length > 0 && <><Text style={cleanStyles.sectionTitle}>Experience</Text>{experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={cleanStyles.entryTitle}>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</Text>
              <Text style={cleanStyles.entryMeta}>{exp.startDate}{exp.startDate && (exp.isCurrent ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}</Text>
            </View>
            {exp.location ? <Text style={cleanStyles.entryMeta}>{exp.location}</Text> : null}
            <BulletList items={exp.bulletPoints} />
          </View>
        ))}</>}
        {education.length > 0 && <><Text style={cleanStyles.sectionTitle}>Education</Text>{education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={cleanStyles.entryTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={cleanStyles.entryMeta}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</Text>
            </View>
            <Text style={cleanStyles.text}>{edu.schoolName}{edu.grade ? ` — ${edu.grade}` : ''}</Text>
          </View>
        ))}</>}
        {projects.length > 0 && <><Text style={cleanStyles.sectionTitle}>Projects</Text>{projects.map(proj => (
          <View key={proj.id} style={{ marginBottom: 8 }}>
            <Text style={cleanStyles.entryTitle}>{proj.name}{proj.link ? ` — ${proj.link}` : ''}</Text>
            {proj.techStack ? <Text style={{ ...cleanStyles.entryMeta, fontStyle: 'italic' }}>{proj.techStack}</Text> : null}
            <BulletList items={proj.bulletPoints} />
          </View>
        ))}</>}
        {skills.length > 0 && <><Text style={cleanStyles.sectionTitle}>Skills</Text><Text style={cleanStyles.text}>{skills.join(', ')}</Text></>}
        {extras.certifications ? <><Text style={cleanStyles.sectionTitle}>Certifications</Text><Text style={cleanStyles.text}>{extras.certifications}</Text></> : null}
        {extras.languages ? <><Text style={cleanStyles.sectionTitle}>Languages</Text><Text style={cleanStyles.text}>{extras.languages}</Text></> : null}
        {extras.achievements ? <><Text style={cleanStyles.sectionTitle}>Achievements</Text><Text style={cleanStyles.text}>{extras.achievements}</Text></> : null}
      </View>
    </Page></Document>
  );
}
