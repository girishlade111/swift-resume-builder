/**
 * InfoSection — mobile-first responsive static ATS educational content.
 */
export default function InfoSection() {
  return (
    <section id="ats-info" className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <div className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold">Why ATS-friendly resumes matter</h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            An <strong className="text-foreground">Applicant Tracking System (ATS)</strong> is software that most employers use to automatically scan and rank resumes before a human ever reads them. Over 90% of large companies rely on an ATS to filter applicants.
          </p>
          <p>
            Resumes with complex layouts — tables, columns, images, or decorative icons — often get misread or rejected by these systems. Simple, clean formatting with clear section headings ensures your content is correctly parsed and ranked.
          </p>
          <p>
            This tool is designed to keep your resume <strong className="text-foreground">ATS-safe</strong>: standard fonts, clear headings like EXPERIENCE and SKILLS, bullet-point content, and single-column layouts that work across all major ATS platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
