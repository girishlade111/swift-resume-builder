import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using Lade Stack's resume builder ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.`,
  },
  {
    title: '2. Description of Service',
    content: `Lade Stack provides a free, client-side resume builder that allows users to create, preview, and export professional resumes as PDF documents. The Service includes:
- Resume creation and editing tools
- 22+ professional resume templates
- Real-time preview functionality
- PDF export capabilities

The Service is provided "as is" and "as available" without warranties of any kind.`,
  },
  {
    title: '3. User Responsibilities',
    content: `When using the Service, you agree to:
- Provide accurate and truthful information in your resume
- Use the Service for lawful purposes only
- Not attempt to reverse-engineer, modify, or distribute our source code without permission
- Not use the Service to create resumes containing false credentials, fraudulent information, or content that violates any laws
- Not use automated tools or bots to access the Service in a way that degrades performance for other users`,
  },
  {
    title: '4. Intellectual Property',
    content: `**Our IP:** The Service, including its design, templates, code, and branding, is the intellectual property of Lade Stack. You may not copy, modify, distribute, or create derivative works of our templates or code without written permission.

**Your Content:** You retain full ownership of all content you create using the Service. The resumes you build and export are yours. We claim no rights over your resume content.`,
  },
  {
    title: '5. Data & Privacy',
    content: `All resume data is processed client-side in your browser. We do not store, access, or transmit your resume content to any server. For complete details on how we handle information, please refer to our Privacy Policy.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law:
- Lade Stack shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
- We do not guarantee that resumes created with our Service will result in job interviews or employment.
- We are not responsible for how employers, ATS systems, or recruiters process or evaluate resumes created with our tool.
- Our total liability for any claims related to the Service shall not exceed the amount you paid for the Service (which is $0 for our free tier).`,
  },
  {
    title: '7. Service Availability',
    content: `We strive to keep the Service available 24/7, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
- Scheduled maintenance
- Bug fixes and updates
- Infrastructure issues beyond our control

We will make reasonable efforts to minimize downtime and restore service promptly.`,
  },
  {
    title: '8. Modifications to Service',
    content: `We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. This includes adding or removing templates, features, or capabilities. We will not be liable to you or any third party for any such modifications.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms or your use of the Service shall be resolved through good-faith negotiation first, and if necessary, through binding arbitration.`,
  },
  {
    title: '10. Contact',
    content: `For questions about these Terms of Service, please contact us at:

**Email:** legal@ladestack.com`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 8, 2026</p>

          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Lade Stack. These Terms of Service govern your use of our website and resume builder 
              service. Please read them carefully before using our platform.
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
