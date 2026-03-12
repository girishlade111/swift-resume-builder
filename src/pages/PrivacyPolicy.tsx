import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

const sections = [
  {
    icon: Eye,
    title: '1. Information We Collect',
    content: `Lade Stack is designed with privacy at its core. Our resume builder operates entirely client-side — meaning all resume data you enter is processed in your browser and is never transmitted to our servers.

**Data we do NOT collect or store:**
- Resume content (name, contact info, work history, education, skills)
- Uploaded profile images or files
- Personal identification information
- Payment information (we don't collect payments)
- Passwords or account credentials (no accounts required)

**Data that may be automatically collected:**
- **Anonymous analytics:** We may use privacy-respecting analytics tools (such as Plausible or Fathom) to understand general usage patterns. This data is aggregated and cannot identify individual users.
- **Technical data:** Browser type, device type, operating system, and screen resolution to ensure compatibility and improve the user experience.
- **IP addresses:** May be temporarily logged by our hosting provider for security purposes but are not accessed or used by Lade Stack.
- **Cookies:** See our Cookie Policy for detailed information about our minimal cookie usage.`,
  },
  {
    icon: Database,
    title: '2. How We Use Information',
    content: `Any aggregated, anonymous data we collect is used solely for the following purposes:

**Service Improvement:**
- Improve the resume builder's features and usability
- Understand which templates and features are most valued
- Fix bugs and optimize performance
- Plan future development priorities

**Communication:**
- Respond to your inquiries and support requests
- Send important service announcements (if you've contacted us)
- Request feedback to improve our service

**We explicitly DO NOT:**
- Use data for advertising or marketing purposes
- Sell or rent your information to third parties
- Build user profiles for targeted advertising
- Track your activity across other websites
- Share data with data brokers`,
  },
  {
    icon: Lock,
    title: '3. Data Storage & Security',
    content: `Since Lade Stack processes all resume data client-side, our data storage is minimal:

**No Server Storage of Resume Data:**
- Your resume content is never stored on our servers
- Data exists only in your browser session
- When you close the tab, unsaved data is lost unless you exported a PDF
- PDF exports are generated in your browser and saved directly to your device

**Local Storage (Browser):**
- If you enable "Remember on this device," your data is stored in your browser's LocalStorage
- This data remains on your device only
- You can clear this data at any time by clearing your browser's cache
- Disabling the toggle immediately removes stored data

**Security Measures for Minimal Data We Hold:**
- HTTPS encryption for all data in transit
- Secure hosting with industry-standard protections
- Regular security audits and updates
- No database containing personal information`,
  },
  {
    icon: UserCheck,
    title: '4. Third-Party Services',
    content: `Lade Stack uses a limited number of third-party services to operate:

**Hosting & CDN:**
- Our website is hosted on secure cloud infrastructure
- Content Delivery Networks (CDNs) may serve fonts and static assets
- These services may log standard web request data (IP addresses, timestamps) for their operational purposes

**Analytics (Optional/Privacy-Respecting):**
- We may use privacy-focused analytics that don't use cookies
- These services collect only aggregated, anonymous data
- No personal information is tracked or stored

**Email Services:**
- If you contact us via email, your message is processed by our email provider
- We use secure email services with encryption

**What We Don't Use:**
- No advertising networks (Google Ads, Facebook Pixel, etc.)
- No tracking pixels or remarketing tools
- No social media widgets that track browsing
- No third-party cookies for tracking purposes`,
  },
  {
    icon: AlertCircle,
    title: '5. Children's Privacy',
    content: `Lade Stack is not directed at children under the age of 13, and we do not knowingly collect any information from children under 13.

**Our Commitment:**
- We don't market to children under 13
- We don't knowingly collect data from children under 13
- Our service is intended for job seekers, typically 16 and older

**If You're a Parent:**
- Children under 13 should not use Lade Stack without parental supervision
- If you believe a child under 13 has provided data through our service, please contact us
- We will promptly delete any such data upon notification

**For Teenagers (13-17):**
- May use the service with parental consent
- Should not provide sensitive personal information
- Parents should supervise online activities`,
  },
  {
    icon: Shield,
    title: '6. Your Rights',
    content: `Depending on your jurisdiction (GDPR, CCPA, or other privacy laws), you may have the following rights:

**Right to Access:**
- Request information about what data we hold about you
- Since we don't store resume data, there's typically nothing to access
- We can confirm whether any of your data exists in our systems

**Right to Deletion:**
- Request deletion of any data associated with you
- Clear your browser's LocalStorage to remove saved resume data
- Contact us to delete any email correspondence

**Right to Opt-Out:**
- Opt out of analytics tracking by using browser Do Not Track settings
- Disable cookies in your browser settings
- Use private/incognito browsing mode

**Right to Portability:**
- Download your resume as a PDF at any time
- Copy your resume data manually before clearing browser data

**Right to Correction:**
- Update your resume data directly in the builder
- Contact us to correct any information in email correspondence

**How to Exercise Your Rights:**
Email us at privacy@ladestack.com with your request. We'll respond within 30 days.`,
  },
  {
    icon: AlertCircle,
    title: '7. Data Breach Protocol',
    content: `While we collect minimal data, we take security seriously:

**In the Unlikely Event of a Data Breach:**
- We will notify affected users within 72 hours
- Notification will be sent via email if we have your contact information
- We will post a notice on our website
- We will provide guidance on protective steps

**What Would Be Compromised:**
- Given our architecture, a breach would expose minimal data
- Potentially: email addresses of users who contacted us
- Resume content cannot be breached because we don't store it

**Prevention Measures:**
- Regular security audits
- Secure hosting infrastructure
- Minimal data collection reduces risk exposure`,
  },
  {
    icon: AlertCircle,
    title: '8. Changes to This Policy',
    content: `We may update this privacy policy from time to time to reflect changes in our practices or applicable laws.

**How We Notify Users:**
- Changes will be posted on this page with an updated effective date
- Significant changes will be announced on our homepage
- We encourage you to review this page periodically

**Your Continued Use:**
- Continuing to use Lade Stack after changes constitutes acceptance
- If you disagree with changes, please discontinue use
- You can clear your browser data at any time

**Current Version:**
- Last updated: March 12, 2026
- Previous versions available upon request`,
  },
  {
    icon: Mail,
    title: '9. Contact Us',
    content: `If you have any questions or concerns about this privacy policy or our privacy practices, please contact us:

**Privacy Officer**
- **Email:** privacy@ladestack.com
- **General Inquiries:** admin@ladestack.in
- **Response Time:** Within 30 days

**Mailing Address:**
[Your Business Address]
[City, State, ZIP]
[Country]

**Data Protection Officer (if applicable):**
- **Email:** dpo@ladestack.com

We take all privacy concerns seriously and will work to address them promptly.`,
  },
];

const keyPoints = [
  { icon: Lock, title: 'Client-Side Processing', desc: 'Your resume data never leaves your browser' },
  { icon: Eye, title: 'No Tracking', desc: 'We don\'t track you across the web' },
  { icon: Database, title: 'No Storage', desc: 'We don\'t store your resume on servers' },
  { icon: UserCheck, title: 'No Accounts', desc: 'No sign-up required, no passwords' },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Lade Stack - Your Data Stays Private';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Lade Stack Privacy Policy: We don\'t collect, store, or share your resume data. Everything is processed in your browser. Learn about our privacy-first approach.');
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
              <Shield className="h-4 w-4" /> Privacy First
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 12, 2026</p>
          </div>

          {/* Intro */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <p className="text-muted-foreground leading-relaxed">
              At Lade Stack, we take your privacy seriously. This Privacy Policy explains how we handle
              information when you use our free resume builder at ladestack.com. By using our service,
              you agree to the practices described below. Our fundamental principle: <strong className="text-foreground">your resume data belongs to you, not us.</strong>
            </p>
          </div>

          {/* Key Privacy Points */}
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {keyPoints.map((point) => (
              <div key={point.title} className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <point.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{point.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{point.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
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

          {/* Quick Contact */}
          <div className="mt-8 rounded-xl border bg-primary/5 p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Questions About Privacy?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're here to help. Contact our privacy team with any questions or concerns.
            </p>
            <a href="mailto:privacy@ladestack.com" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Mail className="h-4 w-4" /> privacy@ladestack.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
