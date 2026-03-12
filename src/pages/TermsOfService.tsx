import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, CheckCircle, AlertTriangle, Scale, Shield, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

const sections = [
  {
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: `By accessing or using Lade Stack's resume builder ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

**What This Means:**
- These terms apply to all users of ladestack.com
- Your use of the Service constitutes acceptance
- We reserve the right to modify these terms at any time
- Continued use after changes constitutes acceptance of modifications

**Your Responsibilities:**
- Review these terms periodically for updates
- Ensure your use complies with all applicable laws
- Use the Service only for lawful purposes`,
  },
  {
    icon: BookOpen,
    title: '2. Description of Service',
    content: `Lade Stack provides a free, client-side resume builder that allows users to create, preview, and export professional resumes as PDF documents.

**Features Include:**
- Resume creation and editing tools
- 22+ professional resume templates
- Real-time preview functionality
- PDF export capabilities
- Local storage for data persistence (optional)
- Resume writing guides and resources

**Service Availability:**
- Available via web browser at ladestack.com
- No software download required
- No account creation required
- Free to use without limitations

**Service Provided "As Is":**
- No warranties of any kind, express or implied
- We don't guarantee specific outcomes (e.g., job interviews)
- Functionality may change without notice`,
  },
  {
    icon: UserCheck,
    title: '3. User Responsibilities',
    content: `When using the Service, you agree to the following:

**Accurate Information:**
- Provide truthful and accurate information in your resume
- You are responsible for the content you create
- We don't verify the accuracy of resume content

**Lawful Use:**
- Use the Service only for lawful purposes
- Don't create resumes with fraudulent information
- Don't impersonate others or provide false credentials
- Don't use the Service to violate any laws or regulations

**Technical Restrictions:**
- Don't attempt to reverse-engineer our code
- Don't modify, copy, or distribute our templates without permission
- Don't use automated tools or bots that degrade performance
- Don't attempt to access other users' data (though we don't store any)
- Don't overload our infrastructure

**Prohibited Conduct:**
- Harassing, threatening, or harmful behavior
- Spam or unsolicited advertising
- Malicious code or viruses
- Interference with Service operation`,
  },
  {
    icon: Scale,
    title: '4. Intellectual Property',
    content: `**Our Intellectual Property:**
The Service, including its design, templates, code, branding, and content, is the intellectual property of Lade Stack.

**What You Cannot Do:**
- Copy, modify, or distribute our source code without permission
- Resell or redistribute our templates as your own
- Create derivative works of our templates for commercial purposes
- Scrape or extract template designs for competing services
- Remove any proprietary notices or labels

**What You Can Do:**
- Use templates to create your personal resume
- Share your resume created with our Service
- Link to our Service (with attribution appreciated)
- Use screenshots for personal or educational purposes (with attribution)

**Your Content:**
You retain full ownership of all content you create using the Service. The resumes you build and export are yours. We claim no rights over your resume content, personal information, or creations.

**Trademarks:**
"Lade Stack" and our logo are trademarks of Lade Stack. You may not use these marks without prior written permission.`,
  },
  {
    icon: Shield,
    title: '5. Data & Privacy',
    content: `**Client-Side Processing:**
All resume data is processed client-side in your browser. We do not store, access, or transmit your resume content to any server.

**What This Means for You:**
- Your resume data exists only in your browser
- Closing the tab may result in data loss (unless exported)
- We cannot recover lost resume data
- You are responsible for saving your work (via PDF export)

**Local Storage:**
- Optional persistence uses browser LocalStorage
- Data remains on your device only
- You can clear this data at any time
- Disabling persistence removes stored data

**For Complete Details:**
Please refer to our Privacy Policy for comprehensive information about our data practices.`,
  },
  {
    icon: AlertTriangle,
    title: '6. Limitation of Liability',
    content: `**To the Maximum Extent Permitted by Law:**

**No Consequential Damages:**
Lade Stack shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.

**No Employment Guarantees:**
We do not guarantee that resumes created with our Service will result in:
- Job interviews
- Employment offers
- Career advancement
- ATS system compatibility (though we design for it)

**Not Responsible for Third Parties:**
We are not responsible for:
- How employers process or evaluate resumes
- ATS system decisions or rankings
- Recruiter responses (or lack thereof)
- Third-party services linked from our site

**Maximum Liability:**
Our total liability for any claims related to the Service shall not exceed the amount you paid for the Service (which is $0 for our free tier).

**Your Recourse:**
If you're dissatisfied with the Service, your sole remedy is to discontinue use.`,
  },
  {
    icon: CheckCircle,
    title: '7. Service Availability',
    content: `**Our Commitment:**
We strive to keep the Service available 24/7, but we don't guarantee uninterrupted access.

**Potential Downtime:**
The Service may be temporarily unavailable due to:
- Scheduled maintenance
- Bug fixes and updates
- Infrastructure issues beyond our control
- Force majeure events

**Our Efforts:**
- We will make reasonable efforts to minimize downtime
- We'll restore service promptly after interruptions
- Critical updates may require brief downtime
- We'll announce major maintenance when possible

**No Compensation:**
We are not liable for any losses resulting from Service unavailability.`,
  },
  {
    icon: FileText,
    title: '8. Modifications to Service',
    content: `**We Reserve the Right To:**
- Modify, suspend, or discontinue any part of the Service
- Add or remove templates and features
- Change design, functionality, or capabilities
- Introduce new features or remove existing ones

**No Liability for Changes:**
We will not be liable to you or any third party for any modifications to the Service.

**No Notice Required:**
While we may announce major changes, we're not required to provide notice before making modifications.

**Suggestions:**
We welcome user feedback and suggestions. By submitting ideas, you grant us the right to implement them without compensation or attribution.`,
  },
  {
    icon: Scale,
    title: '9. Termination',
    content: `**By Us:**
We reserve the right to suspend or terminate your access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.

**By You:**
You may stop using the Service at any time. Simply close your browser.

**Effect of Termination:**
- All provisions of these Terms survive termination
- Sections on intellectual property, liability, and governing law remain in effect
- Your resume data (if stored in LocalStorage) may persist until cleared`,
  },
  {
    icon: BookOpen,
    title: '10. Governing Law',
    content: `**Applicable Law:**
These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.

**Dispute Resolution:**
1. **Good Faith Negotiation:** Any disputes shall first be addressed through good-faith negotiation between you and us.
2. **Binding Arbitration:** If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.
3. **Small Claims Exception:** You may pursue claims in small claims court if they qualify.

**Class Action Waiver:**
Any proceedings must be conducted on an individual basis, not as part of a class or representative action.

**Jurisdiction:**
For any legal proceedings, you agree to submit to the personal jurisdiction of courts in our jurisdiction.`,
  },
  {
    icon: Mail,
    title: '11. Contact Information',
    content: `For questions about these Terms of Service, please contact us:

**Legal Department**
- **Email:** legal@ladestack.com
- **General Inquiries:** admin@ladestack.in
- **Response Time:** Within 30 days

**Mailing Address:**
[Your Business Address]
[City, State, ZIP]
[Country]

**Updates:**
We'll post any legal notices or updates to these Terms on this page.`,
  },
  {
    icon: AlertCircle,
    title: '12. Additional Terms',
    content: `**Entire Agreement:**
These Terms constitute the entire agreement between you and Lade Stack regarding the Service.

**Severability:**
If any provision is found unenforceable, the remaining provisions remain in full effect.

**No Waiver:**
Our failure to enforce any right or provision doesn't constitute a waiver of those rights.

**Assignment:**
You may not assign your rights under these Terms. We may assign our rights without restriction.

**Third-Party Beneficiaries:**
There are no third-party beneficiaries to these Terms.

**Survival:**
Provisions that by their nature should survive termination will survive, including intellectual property, liability limitations, and governing law.`,
  },
];

export default function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service | Lade Stack';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms of Service for Lade Stack resume builder. Read our terms governing use of our free, client-side resume creation service.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <FileText className="h-4 w-4" /> Legal
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 12, 2026</p>
          </div>

          {/* Intro */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Lade Stack. These Terms of Service govern your use of our website and resume builder
              service. Please read them carefully before using our platform. By accessing or using Lade Stack,
              you agree to be bound by these terms.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="rounded-xl border bg-primary/5 p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" /> Key Points
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Free service with no hidden fees or premium tiers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Your resume data stays in your browser - we don't store it</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>You own your resume content; we own our templates and code</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Use the service responsibly and for lawful purposes only</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>No guarantees of employment outcomes</span>
              </li>
            </ul>
          </div>

          {/* Main Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>

          {/* Acceptance */}
          <div className="mt-8 rounded-xl border bg-card p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">By Using Lade Stack</h3>
            <p className="text-sm text-muted-foreground">
              You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
