/**
 * Footer — mobile-first responsive multi-section footer with social links, resources, and branding.
 */
import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin, Mail, Heart, Sparkles, Shield, Zap, Users, Instagram, Globe, CodepenIcon } from 'lucide-react';

const footerLinks = {
  resources: [
    { label: 'Resume Writing Guide', href: '/resume-guide' },
    { label: 'ATS Tips & Tricks', href: '/#ats-info' },
    { label: 'Cover Letter Tips', href: '/cover-letter-tips' },
    { label: 'Interview Prep', href: '/interview-prep' },
  ],
  company: [
    { label: 'About Lade Stack', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const stats = [
  { icon: Users, value: '50K+', label: 'Resumes Created' },
  { icon: Sparkles, value: '22+', label: 'Templates' },
  { icon: Shield, value: '100%', label: 'ATS Compatible' },
  { icon: Zap, value: 'Instant', label: 'PDF Export' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('/#')) {
    return <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{children}</a>;
  }
  return <Link to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{children}</Link>;
}

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Stats Bar - Mobile optimized grid */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content - Mobile first stacking */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column - Full width on mobile */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg sm:text-xl font-bold text-foreground">Lade Stack</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Build professional, ATS-friendly resumes in minutes. Our free resume builder offers 22+
              templates with live preview and instant PDF export — no signup, no watermarks, no limits.
            </p>
            {/* Social Links - Scrollable on small screens */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/girish_lade_/', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/girish-lade-075bba201/', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/girishlade111', label: 'GitHub' },
                { icon: CodepenIcon, href: 'https://codepen.io/Girish-Lade-the-looper', label: 'CodePen' },
                { icon: Mail, href: 'mailto:admin@ladestack.in', label: 'Email' },
                { icon: Globe, href: 'https://ladestack.in', label: 'Website' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Stacked on mobile */}
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-5">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row">
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Lade Stack. All rights reserved.
            </p>
            {/* Legal Links - Scrollable on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-primary transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              Built with <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-destructive fill-destructive" /> by Lade Stack
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
