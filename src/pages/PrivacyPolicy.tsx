import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Information We Collect',
    content: `Lade Stack is designed with privacy at its core. Our resume builder operates entirely client-side — meaning all resume data you enter is processed in your browser and is never transmitted to our servers.

**Data we do NOT collect:**
- Resume content (name, contact info, work history, education, skills)
- Uploaded files or images
- Personal identification information

**Data we may collect:**
- **Anonymous analytics:** We may use privacy-respecting analytics tools to understand general usage patterns (e.g., which templates are most popular, page views). This data is aggregated and cannot identify individual users.
- **Technical data:** Browser type, device type, and screen resolution to ensure compatibility and improve the user experience.`,
  },
  {
    title: '2. How We Use Information',
    content: `Any aggregated, anonymous data we collect is used solely to:
- Improve the resume builder's features and usability
- Understand which templates and features are most valued
- Fix bugs and optimize performance
- Plan future development priorities

We never use data for advertising, profiling, or any purpose unrelated to improving Lade Stack.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `Since Lade Stack processes all resume data client-side:
- **No server storage:** Your resume data is never stored on our servers.
- **Browser-only:** Data exists only in your browser session. When you close the tab or navigate away, unsaved data is lost unless you exported a PDF.
- **PDF exports:** Downloaded PDFs are generated in your browser and saved directly to your device. We never see or store these files.

For any minimal analytics data we collect, we use industry-standard security measures including encryption in transit (HTTPS) and secure data storage practices.`,
  },
  {
    title: '4. Third-Party Services',
    content: `Lade Stack may use the following third-party services:
- **Content Delivery Networks (CDNs):** To serve fonts and assets efficiently. These services may log standard web request data (IP addresses, timestamps).
- **Analytics providers:** If used, we select providers that respect user privacy and comply with applicable data protection laws.

We do not use third-party advertising services, and we do not share any data with advertisers.`,
  },
  {
    title: '5. Cookies',
    content: `Lade Stack uses minimal cookies:
- **Essential cookies:** May be used for basic site functionality such as remembering your template preference during a session.
- **Analytics cookies:** If analytics are enabled, anonymous usage cookies may be set. These do not contain personal information.

You can disable cookies in your browser settings at any time. The resume builder will continue to function normally without cookies.`,
  },
  {
    title: '6. Children\'s Privacy',
    content: `Lade Stack is not directed at children under the age of 13. We do not knowingly collect any information from children. If you believe a child has provided data through our service, please contact us and we will take appropriate action.`,
  },
  {
    title: '7. Your Rights',
    content: `Depending on your jurisdiction, you may have the following rights:
- **Access:** Request information about what data (if any) we hold about you.
- **Deletion:** Request deletion of any data associated with you.
- **Opt-out:** Opt out of analytics tracking by using browser Do Not Track settings or disabling JavaScript.

Since we collect minimal to no personal data, most of these rights are satisfied by default.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. Any changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions or concerns about this privacy policy, please contact us at:

**Email:** privacy@ladestack.com`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 8, 2026</p>

          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              At Lade Stack, we take your privacy seriously. This Privacy Policy explains how we handle 
              information when you use our free resume builder at ladestack.com. By using our service, 
              you agree to the practices described below.
            </p>
            {sections.map((s) => (
              <div key={s.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-3">{s.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
