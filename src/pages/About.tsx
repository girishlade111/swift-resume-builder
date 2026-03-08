import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Target, Lightbulb, Heart, Globe, Shield } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Free Forever', desc: 'We believe everyone deserves access to professional resume tools regardless of their financial situation. No hidden fees, no premium tiers, no paywalls.' },
  { icon: Shield, title: 'Privacy First', desc: 'Your resume data never leaves your browser. We don\'t store, sell, or share any personal information. Everything is processed 100% client-side.' },
  { icon: Lightbulb, title: 'Simplicity', desc: 'A powerful tool doesn\'t need to be complicated. We focus on intuitive design so you can build your resume without a learning curve.' },
  { icon: Globe, title: 'Accessibility', desc: 'Our builder works on any device, any browser, anywhere in the world. No downloads, no installations, no accounts required.' },
];


export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Lade Stack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make professional resume building accessible to everyone. 
            No signups, no costs, no compromises — just a powerful, free tool that helps you put your best foot forward.
          </p>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
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
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              We're a small but dedicated team of engineers, designers, and career enthusiasts 
              who believe that the right resume can change someone's life. Every template we build, 
              every feature we ship, is guided by that belief.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
