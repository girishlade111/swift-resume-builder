import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PenTool, FileText, Lightbulb } from 'lucide-react';

const sections = [
  {
    title: 'Why Cover Letters Still Matter',
    content: `Despite debates about their relevance, cover letters remain important in 2026:

- **49% of hiring managers** consider a cover letter an essential part of applications
- Cover letters let you explain career gaps, transitions, or unique circumstances
- They demonstrate genuine interest in the specific company and role
- A strong cover letter can differentiate you from equally qualified candidates
- Some ATS systems score applications higher when a cover letter is included

**When to always include one:** When the job posting mentions it, when you're changing careers, or when you have a personal connection to refer to.`,
  },
  {
    title: 'The Ideal Structure',
    content: `A winning cover letter follows a clear 4-paragraph structure:

**Paragraph 1 — The Hook (2-3 sentences)**
State the position you're applying for and lead with your strongest qualification or a compelling reason you're excited about the role. Avoid generic openings like "I am writing to apply for..."

**Paragraph 2 — Your Value (3-4 sentences)**
Highlight 2-3 key achievements that directly relate to the job requirements. Use the same CAR method as your resume (Challenge, Action, Result) but in narrative form.

**Paragraph 3 — Why This Company (2-3 sentences)**
Show you've researched the company. Reference their mission, recent projects, culture, or industry position. Explain why you specifically want to work there.

**Paragraph 4 — The Close (2-3 sentences)**
Restate your enthusiasm, mention you've attached your resume, and include a clear call to action. Thank them for their time.`,
  },
  {
    title: 'Opening Lines That Work',
    content: `Your first sentence determines whether the recruiter keeps reading.

❌ **Weak openings:**
"I am writing to express my interest in the Marketing Manager position."
"To whom it may concern, I would like to apply for..."
"I believe I am the perfect candidate for this role."

✅ **Strong openings:**
"After leading a content strategy that generated $2.4M in pipeline revenue at [Company], I'm excited to bring that same data-driven approach to [Target Company]'s growing marketing team."

"When I read about [Company]'s mission to democratize financial literacy, I knew I had to apply — it's exactly the kind of impact I've spent my career working toward."

"Your job posting described a need for someone who can turn complex data into actionable insights. In my 6 years at [Company], that's exactly what I've done — most recently reducing customer churn by 23% through predictive analytics."`,
  },
  {
    title: 'Customization Is Everything',
    content: `A generic cover letter is worse than no cover letter at all. Here's how to customize effectively:

**Research the company:**
- Read their About page, blog, and recent press releases
- Check their social media for culture cues and recent achievements
- Look at employee LinkedIn posts for insider perspective
- Understand their products, competitors, and market position

**Mirror the job description:**
- Use the same terminology and keywords from the posting
- Address the top 3 requirements directly
- Match their tone (formal, casual, innovative)

**Personalize when possible:**
- Address the hiring manager by name (check LinkedIn or call to ask)
- Reference a specific project, product, or company initiative
- Mention a mutual connection if you have one`,
  },
  {
    title: 'Formatting Best Practices',
    content: `**Length:** 250-400 words (about 3/4 of a page). Never exceed one page.

**Font:** Match your resume font for consistency. Standard, professional fonts only.

**Structure:**
- Your contact information at the top
- Date
- Hiring manager's name, title, and company address
- Professional greeting ("Dear [Name]," or "Dear Hiring Team,")
- 3-4 concise paragraphs
- Professional closing ("Sincerely," or "Best regards,")
- Your name and signature

**File format:** PDF, named "[YourName]-CoverLetter-[Company].pdf"

**Tone:** Professional but personable. Write like you're having a conversation with a respected colleague, not drafting a legal document.`,
  },
  {
    title: 'Common Mistakes to Avoid',
    content: `**Content mistakes:**
- Repeating your resume word-for-word instead of adding new context
- Making it about what you want rather than what you can offer
- Being too humble or too boastful
- Not providing specific, quantified examples
- Forgetting to mention the company name (copy-paste errors!)

**Format mistakes:**
- Exceeding one page
- Using a different design style than your resume
- Tiny font to fit more content
- Missing contact information

**Tone mistakes:**
- Being overly formal or stiff
- Using clichés ("team player," "think outside the box," "go-getter")
- Starting every sentence with "I"
- Being desperate ("I really need this job")`,
  },
];

const template = `Dear [Hiring Manager's Name],

[Opening hook — state the role and your strongest relevant qualification or connection to the company. 1-2 compelling sentences.]

[Value paragraph — highlight 2-3 key achievements that align with the job requirements. Use specific numbers and outcomes. Show the impact you've made in similar roles.]

[Company-specific paragraph — demonstrate knowledge of the company. Explain why you want to work there specifically. Connect your experience to their mission, challenges, or goals.]

[Closing — express enthusiasm, reference your attached resume, and include a call to action. Thank them for their consideration.]

Best regards,
[Your Name]
[Phone] | [Email] | [LinkedIn URL]`;

export default function CoverLetterTips() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-12">
            <PenTool className="h-8 w-8 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Cover Letter Tips & Guide</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Learn how to write cover letters that complement your resume and convince hiring managers to call you.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {sections.map((s) => (
              <div key={s.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">{s.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            ))}
          </div>

          {/* Template */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-16">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
              <FileText className="h-5 w-5 text-primary" /> Cover Letter Template
            </h2>
            <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-lg p-5 border">
              {template}
            </pre>
          </div>

          {/* CTA */}
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Pair It With a Great Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">Build a matching ATS-friendly resume to go with your cover letter.</p>
            <a href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Build Your Resume
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
