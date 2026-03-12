import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Target, Lightbulb, Heart, Globe, Shield, Award, TrendingUp, Zap } from 'lucide-react';
import { useEffect } from 'react';

const values = [
  { icon: Heart, title: 'Free Forever', desc: 'We believe everyone deserves access to professional resume tools regardless of their financial situation. No hidden fees, no premium tiers, no paywalls.' },
  { icon: Shield, title: 'Privacy First', desc: 'Your resume data never leaves your browser. We don\'t store, sell, or share any personal information. Everything is processed 100% client-side.' },
  { icon: Lightbulb, title: 'Simplicity', desc: 'A powerful tool doesn\'t need to be complicated. We focus on intuitive design so you can build your resume without a learning curve.' },
  { icon: Globe, title: 'Accessibility', desc: 'Our builder works on any device, any browser, anywhere in the world. No downloads, no installations, no accounts required.' },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Resumes Created' },
  { icon: Globe, value: '120+', label: 'Countries Reached' },
  { icon: Award, value: '22', label: 'Professional Templates' },
  { icon: TrendingUp, value: '98%', label: 'User Satisfaction' },
];

const timeline = [
  { year: '2024', title: 'The Idea', desc: 'Frustrated with existing resume builders that required signups, charged fees, or added watermarks, we set out to build something better.' },
  { year: '2024', title: 'First Launch', desc: 'Lade Stack launched with 5 templates and a simple mission: make professional resume building accessible to everyone, completely free.' },
  { year: '2025', title: 'Rapid Growth', desc: 'Reached 10,000 users and expanded to 15 templates based on community feedback. Added ATS optimization features.' },
  { year: '2026', title: 'Today', desc: 'Over 50,000 resumes created with 22+ templates, comprehensive career resources, and a commitment to staying free forever.' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Lade Stack | Free Resume Builder Mission';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about Lade Stack\'s mission to provide free, privacy-focused, ATS-friendly resume building tools to job seekers worldwide. Founded in 2024.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-4 w-4" /> Building the future of career tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Lade Stack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make professional resume building accessible to everyone.
            No signups, no costs, no compromises — just a powerful, free tool that helps you put your best foot forward.
          </p>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" /> Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lade Stack was born out of frustration. We saw too many talented professionals struggling with
                outdated resume builders that charged hefty fees, slapped watermarks on exports, or required
                lengthy sign-up processes before you could even start typing.
              </p>
              <p>
                We asked a simple question: <strong className="text-foreground">What if building a resume was as easy as filling out a form?</strong> What
                if the tool was completely free, worked instantly in your browser, and produced ATS-friendly
                documents that actually got past the automated filters?
              </p>
              <p>
                That question became Lade Stack — a 100% client-side resume builder with 22+ professionally
                designed templates, real-time preview, and instant PDF export. No server uploads, no data
                collection, no strings attached.
              </p>
              <p>
                Today, Lade Stack has helped thousands of job seekers create polished, ATS-optimized resumes
                that land interviews. And we're just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <div className="rounded-xl border bg-card p-6 shadow-sm ml-12 md:ml-0">
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 mt-6" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-card p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-primary" /> The Team
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
              We're a small but dedicated team of engineers, designers, and career enthusiasts
              who believe that the right resume can change someone's life. Every template we build,
              every feature we ship, is guided by that belief.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Girish Lade</p>
                <p className="text-xs text-muted-foreground">Founder & Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to Build Your Resume?</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of job seekers who have created professional resumes with Lade Stack.
            </p>
            <a href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Building Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
