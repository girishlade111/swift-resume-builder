import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Choose the Right Format',
    content: `There are three main resume formats:
    
**Reverse-Chronological** (Most Common): Lists your most recent experience first. Best for candidates with a solid, progressive work history. This is what most ATS systems and recruiters prefer.

**Functional:** Focuses on skills rather than timeline. Best for career changers or those with employment gaps, but many ATS systems struggle to parse this format.

**Combination/Hybrid:** Merges a skills section with reverse-chronological work history. Good for experienced professionals with diverse skill sets.

**Our recommendation:** Use reverse-chronological unless you have a compelling reason not to. It's the safest choice for ATS compatibility and recruiter expectations.`,
  },
  {
    num: '02',
    title: 'Write a Compelling Summary',
    content: `Your resume summary (or professional profile) sits at the top and gets the most attention — recruiters spend an average of 6-7 seconds on an initial scan.

**Formula for a strong summary:**
[Title/Experience Level] + [Key Skills/Specialties] + [Notable Achievement] + [What You're Looking For]

**Example:**
"Results-driven Senior Software Engineer with 8+ years building scalable web applications using React and Node.js. Led a team of 12 to deliver a platform processing 2M+ daily transactions. Seeking a principal engineering role at a mission-driven company."

**Tips:**
- Keep it to 2-4 sentences (40-60 words)
- Include your target job title naturally
- Add at least one quantified achievement
- Avoid first-person pronouns (I, me, my)`,
  },
  {
    num: '03',
    title: 'Showcase Your Experience',
    content: `Your experience section is the heart of your resume. Each entry should follow this structure:

**Job Title** | Company Name | Location | Date Range
- Achievement-focused bullet point with quantified results
- Another accomplishment demonstrating impact

**Writing powerful bullet points:**
Use the CAR method — Challenge, Action, Result.

❌ "Responsible for managing social media accounts"
✅ "Grew company Instagram following by 340% (5K → 22K) in 8 months through data-driven content strategy, generating 15% increase in inbound leads"

**Key principles:**
- Start every bullet with a strong action verb (Led, Built, Increased, Reduced, Launched)
- Quantify everything possible (percentages, dollar amounts, time saved, team size)
- Focus on outcomes, not responsibilities
- Limit to 3-5 bullets per role (most recent roles get more)
- Tailor bullets to match the target job description`,
  },
  {
    num: '04',
    title: 'Highlight Education & Certifications',
    content: `**Education format:**
Degree | Major | University Name | Graduation Year
- Relevant coursework, honors, or GPA (if 3.5+ and recent graduate)

**Tips:**
- Put education after experience if you have 3+ years of work history
- Put education first if you're a recent graduate
- Include relevant certifications with issuing organization and date
- Online certifications from reputable platforms (Google, AWS, Coursera) are valuable
- Don't include high school if you have a college degree

**Certifications to consider:**
Industry-specific certifications can significantly boost your resume. Examples: PMP, AWS Solutions Architect, Google Analytics, CPA, SHRM-CP, Salesforce Admin.`,
  },
  {
    num: '05',
    title: 'Optimize Your Skills Section',
    content: `A well-organized skills section helps both ATS systems and recruiters quickly assess your qualifications.

**Structure your skills by category:**
- **Technical Skills:** Programming languages, tools, platforms
- **Soft Skills:** Leadership, communication, problem-solving (use sparingly)
- **Industry Skills:** Domain-specific knowledge and methodologies

**ATS optimization tips:**
- Match skills exactly as they appear in the job description
- Include both acronyms and full names (e.g., "Search Engine Optimization (SEO)")
- Don't use rating scales or progress bars — ATS can't parse them
- List 8-15 relevant skills, prioritized by relevance to the target role

**Avoid:**
- Generic skills everyone claims (Microsoft Office, teamwork)
- Skills you can't demonstrate or discuss in an interview
- Outdated technologies unless the job specifically requires them`,
  },
  {
    num: '06',
    title: 'Format for ATS Success',
    content: `Even a well-written resume can be rejected if the formatting confuses ATS parsers.

**ATS-friendly formatting rules:**
✅ Use standard section headings (Experience, Education, Skills, Summary)
✅ Use simple bullet points (•) not custom symbols
✅ Stick to standard fonts (Arial, Calibri, Garamond, Helvetica)
✅ Use a single-column layout
✅ Save as PDF (preserves formatting)
✅ Include your contact info in the body, not headers/footers

**Avoid these common traps:**
❌ Tables, columns, or text boxes
❌ Images, logos, or graphics
❌ Custom icons or emoji
❌ Headers and footers (many ATS ignore these)
❌ Fancy borders or decorative elements
❌ Unusual file formats (.pages, .odt)`,
  },
];

const dosDonts = {
  dos: [
    'Tailor your resume for each application',
    'Use keywords from the job description',
    'Quantify achievements with numbers',
    'Keep it to 1-2 pages maximum',
    'Proofread multiple times',
    'Use consistent formatting throughout',
    'Include a professional email address',
    'List relevant volunteer work or projects',
  ],
  donts: [
    'Use "References available upon request"',
    'Include personal photos or headshots',
    'List every job you\'ve ever had',
    'Use an unprofessional email address',
    'Include salary information',
    'Write in paragraph form instead of bullets',
    'Use colored or decorative fonts',
    'Lie or exaggerate about experience',
  ],
};

export default function ResumeGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">The Complete Resume Writing Guide</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to write a resume that passes ATS systems, impresses recruiters, and lands interviews.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step) => (
              <div key={step.num} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                    {step.num}
                  </span>
                  <h2 className="text-xl font-bold text-foreground">{step.title}</h2>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{step.content}</div>
              </div>
            ))}
          </div>

          {/* Dos and Don'ts */}
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Resume Dos & Don'ts</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" /> Do
              </h3>
              <ul className="space-y-2">
                {dosDonts.dos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Don't
              </h3>
              <ul className="space-y-2">
                {dosDonts.donts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to Build Your Resume?</h3>
            <p className="text-sm text-muted-foreground mb-4">Put these tips into practice with our free ATS-friendly resume builder.</p>
            <a href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Building Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
