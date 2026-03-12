import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cookie, Shield, Settings, Info, CheckCircle, X, Globe, Clock } from 'lucide-react';
import { useEffect } from 'react';

const cookieTypes = [
  {
    icon: Shield,
    name: 'Essential Cookies',
    purpose: 'Required for the basic functionality of the website. These cookies ensure the site works correctly and cannot be disabled.',
    examples: 'Session management, security tokens, user preference persistence (e.g., selected template during your visit).',
    duration: 'Session-based (deleted when you close your browser)',
    required: true,
    provider: 'Lade Stack (First-party)',
  },
  {
    icon: Info,
    name: 'Analytics Cookies',
    purpose: 'Help us understand how visitors interact with our website by collecting anonymous, aggregated data. No personal information is tracked.',
    examples: 'Page views, template popularity, feature usage statistics, browser/device type, referral source.',
    duration: 'Up to 12 months',
    required: false,
    provider: 'Privacy-focused analytics (First-party)',
  },
  {
    icon: Settings,
    name: 'Preference Cookies',
    purpose: 'Remember your settings and preferences to provide a more personalized experience on return visits.',
    examples: 'Theme preference (light/dark mode), last used template selection, form input persistence.',
    duration: 'Up to 6 months',
    required: false,
    provider: 'Lade Stack (First-party)',
  },
];

const thirdPartyServices = [
  { name: 'Hosting Provider', purpose: 'May set essential cookies for security and load balancing', cookies: 'Session cookies only' },
  { name: 'CDN (Content Delivery Network)', purpose: 'Delivers static assets efficiently', cookies: 'None or minimal technical cookies' },
  { name: 'Analytics Provider', purpose: 'Privacy-respecting analytics (if enabled)', cookies: 'Anonymous, no personal data' },
];

export default function CookiePolicy() {
  useEffect(() => {
    document.title = 'Cookie Policy | Lade Stack - Minimal Cookie Usage';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Lade Stack Cookie Policy: We use minimal cookies for essential functionality and anonymous analytics. Learn what cookies we use and how to manage them.');
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
              <Cookie className="h-4 w-4" /> Transparency
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Cookie className="h-9 w-9 text-primary" /> Cookie Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: March 12, 2026</p>
          </div>

          {/* Intro */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Cookie Policy explains how Lade Stack uses cookies and similar technologies on our website.
              We use cookies sparingly and transparently, prioritizing your privacy while ensuring our service functions properly.
            </p>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Key Point:</strong> Since our resume builder is entirely client-side, 
                we don't need cookies for data processing. The cookies we use are primarily for analytics and remembering 
                your preferences. We never use cookies for advertising or cross-site tracking.
              </div>
            </div>
          </div>

          {/* What Are Cookies */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> What Are Cookies?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Cookies are small text files that websites place on your device to store bits of information.
              They help websites remember your preferences, understand how you use the site, and improve
              your overall experience.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 text-sm">What Cookies Do:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Remember your settings</li>
                  <li>• Keep you logged in (if applicable)</li>
                  <li>• Understand site usage</li>
                  <li>• Improve website functionality</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 text-sm">What Cookies Don't Do:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Contain viruses or malware</li>
                  <li>• Access other data on your device</li>
                  <li>• Identify you personally (our cookies)</li>
                  <li>• Track you across other websites</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Cookies */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">How Lade Stack Uses Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use a minimal number of cookies, all of which serve specific, limited purposes:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>Remember your template selection during your visit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>Understand which features are most used (anonymously)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>Maintain site security and prevent abuse</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>We do NOT use cookies for advertising</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>We do NOT use cookies to track you across websites</span>
              </li>
            </ul>
          </div>

          {/* Types of Cookies */}
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Types of Cookies We Use</h2>

          <div className="space-y-4 mb-8">
            {cookieTypes.map((cookie) => (
              <div key={cookie.name} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <cookie.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{cookie.name}</h3>
                      {cookie.required && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Required</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{cookie.provider}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Purpose:</p>
                    <p className="text-muted-foreground">{cookie.purpose}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Examples:</p>
                    <p className="text-muted-foreground">{cookie.examples}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Duration:</strong> {cookie.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third-Party Cookies */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Third-Party Cookies
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Some cookies on our website may be set by third-party services we use to operate the site.
              These services have their own privacy policies and cookie practices.
            </p>
            <div className="space-y-3">
              {thirdPartyServices.map((service) => (
                <div key={service.name} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{service.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{service.purpose}</p>
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Cookies:</strong> {service.cookies}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" /> Managing Cookies
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>You can control and manage cookies in several ways:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
                  <p className="text-sm mb-2">Most browsers allow you to:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• View and delete individual cookies</li>
                    <li>• Block third-party cookies</li>
                    <li>• Block all cookies from specific websites</li>
                    <li>• Block all cookies entirely</li>
                    <li>• Clear all cookies when you close your browser</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Do Not Track</h3>
                  <p className="text-sm">We respect your browser's Do Not Track signal. If enabled, we'll minimize or disable analytics cookies.</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Private Browsing</h3>
                  <p className="text-sm">Using Incognito (Chrome), Private (Firefox/Safari), or InPrivate (Edge) mode prevents cookies from being stored after your session ends.</p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">
                  <strong className="text-foreground">Note:</strong> Disabling essential cookies may affect the functionality 
                  of some features, though the core resume builder will continue to work normally.
                </p>
              </div>
            </div>
          </div>

          {/* Browser-Specific Instructions */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cookie Management by Browser</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { browser: 'Chrome', path: 'Settings → Privacy and security → Cookies and other site data' },
                { browser: 'Firefox', path: 'Options → Privacy & Security → Cookies and Site Data' },
                { browser: 'Safari', path: 'Preferences → Privacy → Cookies and website data' },
                { browser: 'Edge', path: 'Settings → Cookies and site permissions → Manage and delete cookies' },
              ].map((item) => (
                <div key={item.browser} className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground text-sm mb-1">{item.browser}</h3>
                  <p className="text-xs text-muted-foreground">{item.path}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Updates */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Updates to This Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or 
              applicable laws. Any changes will be posted on this page with an updated effective date. 
              We encourage you to review this page periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-xl border bg-primary/5 p-6 text-center">
            <Cookie className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Questions About Cookies?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about our cookie practices, please email us.
            </p>
            <a href="mailto:privacy@ladestack.com" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Cookie className="h-4 w-4" /> privacy@ladestack.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
