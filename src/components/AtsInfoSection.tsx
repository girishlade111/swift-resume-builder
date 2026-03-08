/**
 * ATS Info Section — educational block about ATS-friendly resumes.
 */
export default function AtsInfoSection() {
  return (
    <section id="ats-info" className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Why ATS-friendly resumes matter</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">What is an ATS?</strong> An Applicant Tracking System (ATS) is software used by most employers to automatically scan, parse, and rank resumes before a human ever sees them. Over 90% of Fortune 500 companies use an ATS.
          </p>
          <p>
            <strong className="text-foreground">Why does formatting matter?</strong> Complex layouts with tables, columns, images, or fancy icons can confuse ATS parsers — causing your resume to be misread or rejected entirely. Simple, clean formatting ensures your content is correctly extracted.
          </p>
          <p>
            <strong className="text-foreground">What makes a resume ATS-safe?</strong>
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Clear section headings like EXPERIENCE, EDUCATION, SKILLS</li>
            <li>Standard fonts (Arial, Helvetica, Inter) — no decorative typefaces</li>
            <li>Bullet points with action verbs and quantifiable achievements</li>
            <li>Keywords from the job description woven naturally into your content</li>
            <li>Single-column layout without tables or text boxes</li>
          </ul>
          <p>
            <strong className="text-foreground">This tool is designed to keep your resume ATS-safe</strong> — every template uses clean formatting, standard fonts, and simple layouts that parse correctly across all major ATS platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
