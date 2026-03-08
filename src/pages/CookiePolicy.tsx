import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cookie, Shield, Settings, Info } from 'lucide-react';

const cookieTypes = [
  {
    icon: Shield,
    name: 'Essential Cookies',
    purpose: 'Required for the basic functionality of the website. These cookies ensure the site works correctly and cannot be disabled.',
    examples: 'Session management, security tokens, user preference persistence (e.g., selected template).',
    duration: 'Session-based (deleted when you close your browser)',
    required: true,
  },
  {
    icon: Info,
    name: 'Analytics Cookies',
    purpose: 'Help us understand how visitors interact with our website by collecting anonymous, aggregated data. No personal information is tracked.',
    examples: 'Page views, template popularity, feature usage statistics, browser/device type.',
    duration: 'Up to 12 months',
    required: false,
  },
  {
    icon: Settings,
    name: 'Preference Cookies',
    purpose: 'Remember your settings and preferences to provide a more personalized experience on return visits.',
    examples: 'Theme preference (light/dark mode), last used template selection.',
    duration: 'Up to 6 months',
    required: false,
  },
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Cookie className="h-9 w-9 text-primary" /> Cookie Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 8, 2026</p>

          <div className="space-y-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">What Are Cookies?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cookies are small text files that websites place on your device to store bits of information. 
                They help websites remember your preferences, understand how you use the site, and improve 
                your overall experience. Cookies do not contain viruses and cannot access other data on your device.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">How Lade Stack Uses Cookies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lade Stack uses a minimal number of cookies. Since our resume builder is entirely client-side, 
                we don't need cookies for data processing. The cookies we use are primarily for analytics and 
                remembering your template preferences. We never use cookies for advertising or user tracking 
                across websites.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-foreground text-center">Types of Cookies We Use</h2>

            {cookieTypes.map((cookie) => (
              <div key={cookie.name} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <cookie.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{cookie.name}</h3>
                    {cookie.required && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Required</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Purpose:</strong> {cookie.purpose}</p>
                  <p><strong className="text-foreground">Examples:</strong> {cookie.examples}</p>
                  <p><strong className="text-foreground">Duration:</strong> {cookie.duration}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">Managing Cookies</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>You can control and manage cookies in several ways:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-foreground">Browser settings:</strong> Most browsers allow you to block or delete cookies through their settings menu.</li>
                  <li><strong className="text-foreground">Do Not Track:</strong> We respect your browser's Do Not Track signal.</li>
                  <li><strong className="text-foreground">Incognito/Private mode:</strong> Using private browsing prevents cookies from being stored after your session.</li>
                </ul>
                <p>
                  Please note that disabling essential cookies may affect the functionality of some features, 
                  though the core resume builder will continue to work normally.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have questions about our cookie practices, please email us at{' '}
                <a href="mailto:privacy@ladestack.com" className="text-primary hover:underline">privacy@ladestack.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
