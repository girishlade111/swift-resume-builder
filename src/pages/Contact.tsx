import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Clock, HelpCircle } from 'lucide-react';
import { useEffect } from 'react';

const contactMethods = [
  { icon: Mail, title: 'Email Us', desc: 'For general inquiries, partnerships, or support.', action: 'admin@ladestack.in', href: 'mailto:admin@ladestack.in' },
  { icon: MessageSquare, title: 'Feedback', desc: 'Have a suggestion or found a bug? Let us know.', action: 'admin@ladestack.in', href: 'mailto:admin@ladestack.in' },
  { icon: HelpCircle, title: 'Support', desc: 'Need help with the resume builder? We\'re here.', action: 'admin@ladestack.in', href: 'mailto:admin@ladestack.in' },
];

const faqs = [
  { q: 'Is Lade Stack really free?', a: 'Yes, 100% free. No hidden charges, no premium tiers, no watermarks on exported PDFs. We believe professional resume tools should be accessible to everyone.' },
  { q: 'Do you store my resume data?', a: 'No. All data is processed entirely in your browser. Nothing is sent to any server. When you close the tab, your data exists only if you exported a PDF.' },
  { q: 'Can I use Lade Stack on mobile?', a: 'Yes! Our builder is fully responsive and works on smartphones, tablets, and desktops. For the best editing experience, we recommend a larger screen.' },
  { q: 'How do I report a bug?', a: 'Send an email to feedback@ladestack.com with a description of the issue, your browser name, and a screenshot if possible. We typically respond within 24 hours.' },
  { q: 'Can I request a new template?', a: 'Absolutely! We love hearing from our users. Email us at feedback@ladestack.com with your template idea and we\'ll consider it for our next update.' },
];

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Lade Stack Support';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with Lade Stack. Email us for support, feedback, or partnerships. We respond within 24 hours.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((m) => (
              <div key={m.title} className="rounded-xl border bg-card p-6 shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                <a href={m.href} className="text-sm font-medium text-primary hover:underline">{m.action}</a>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-6 flex items-center gap-4">
            <Clock className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Typical Response Time</h3>
              <p className="text-sm text-muted-foreground">We respond to most emails within 24 hours during business days (Monday–Friday).</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
