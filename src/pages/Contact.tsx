import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Clock, HelpCircle, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

const contactMethods = [
  { 
    icon: Mail, 
    title: 'Email Us', 
    desc: 'For general inquiries, partnerships, or support.', 
    action: 'admin@ladestack.in', 
    href: 'mailto:admin@ladestack.in',
    responseTime: 'Response within 24 hours'
  },
  { 
    icon: MessageSquare, 
    title: 'Feedback', 
    desc: 'Have a suggestion or found a bug? Let us know.', 
    action: 'feedback@ladestack.in', 
    href: 'mailto:feedback@ladestack.in',
    responseTime: 'We read every message'
  },
  { 
    icon: HelpCircle, 
    title: 'Support', 
    desc: 'Need help with the resume builder? We\'re here.', 
    action: 'support@ladestack.in', 
    href: 'mailto:support@ladestack.in',
    responseTime: 'Priority support'
  },
];

const faqs = [
  { 
    q: 'Is Lade Stack really free?', 
    a: 'Yes, 100% free. No hidden charges, no premium tiers, no watermarks on exported PDFs. We believe professional resume tools should be accessible to everyone. Our mission is to help job seekers worldwide, regardless of their financial situation.' 
  },
  { 
    q: 'Do you store my resume data?', 
    a: 'No. All data is processed entirely in your browser using client-side technologies. Nothing is sent to any server. When you close the tab, your data exists only if you exported a PDF. This approach ensures complete privacy and security for your personal information.' 
  },
  { 
    q: 'Can I use Lade Stack on mobile?', 
    a: 'Yes! Our builder is fully responsive and works on smartphones, tablets, and desktops. The interface adapts to your screen size. However, for the best editing experience, we recommend using a larger screen (tablet or desktop) for easier typing and previewing.' 
  },
  { 
    q: 'How do I report a bug?', 
    a: 'Send an email to feedback@ladestack.com with a description of the issue, your browser name and version, and a screenshot if possible. Include steps to reproduce the bug. We typically respond within 24 hours and prioritize fixes based on impact.' 
  },
  { 
    q: 'Can I request a new template?', 
    a: 'Absolutely! We love hearing from our users. Email us at feedback@ladestack.com with your template idea, including any specific design elements or industries you\'d like it to target. We review all suggestions and consider them for our next update cycle.' 
  },
  { 
    q: 'What file formats can I download?', 
    a: 'Currently, we support PDF export, which is the standard format for resume submissions. PDF ensures your formatting is preserved across all devices and ATS systems. We\'re exploring additional formats based on user demand.' 
  },
  { 
    q: 'Can I edit my resume after downloading?', 
    a: 'The PDF itself is not easily editable, but your data remains in your browser\'s local storage if you have persistence enabled. Simply return to the site and your resume should load. We recommend keeping a copy of your resume data for your records.' 
  },
];

const teamContacts = [
  { department: 'General Inquiries', email: 'admin@ladestack.in' },
  { department: 'Technical Support', email: 'support@ladestack.in' },
  { department: 'Feedback & Suggestions', email: 'feedback@ladestack.in' },
  { department: 'Partnerships', email: 'partnerships@ladestack.in' },
  { department: 'Press & Media', email: 'press@ladestack.in' },
];

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Lade Stack Support';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with Lade Stack. Email us for support, feedback, or partnerships. We respond within 24 hours. Find answers to common questions in our FAQ.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            Our team typically responds within 24 hours.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Get in Touch</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((m) => (
              <div key={m.title} className="rounded-xl border bg-card p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                <a href={m.href} className="text-sm font-medium text-primary hover:underline break-all">{m.action}</a>
                <p className="text-xs text-muted-foreground mt-2">{m.responseTime}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Directory */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-4">Department Directory</h2>
            <div className="space-y-3">
              {teamContacts.map((contact) => (
                <div key={contact.department} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b last:border-0">
                  <span className="text-sm font-medium text-foreground">{contact.department}</span>
                  <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">{contact.email}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-6 flex items-start gap-4">
            <Clock className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Typical Response Time</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We respond to most emails within 24 hours during business days (Monday–Friday, 9 AM–6 PM IST). 
                Messages received on weekends or holidays will be answered the next business day.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">What to Expect</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">1. Send Your Message</h3>
              <p className="text-sm text-muted-foreground">Email us with your question, feedback, or inquiry. Include relevant details for faster assistance.</p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">2. Wait for Response</h3>
              <p className="text-sm text-muted-foreground">Our team reviews messages daily and typically responds within 24 hours on business days.</p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">3. Get Help</h3>
              <p className="text-sm text-muted-foreground">Receive a helpful response with solutions, resources, or next steps for your inquiry.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Still Have Questions?</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our team is here to help. Send us a message and we'll get back to you as soon as possible.
            </p>
            <a href="mailto:admin@ladestack.in" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4" /> Send Us a Message
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
