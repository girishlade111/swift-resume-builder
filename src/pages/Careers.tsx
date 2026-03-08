import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock, Heart, Rocket, Coffee, Sun } from 'lucide-react';

const perks = [
  { icon: Sun, title: 'Fully Remote', desc: 'Work from anywhere in the world. We\'re a distributed team across multiple time zones.' },
  { icon: Coffee, title: 'Flexible Hours', desc: 'We care about output, not hours logged. Work when you\'re most productive.' },
  { icon: Rocket, title: 'Ship Fast', desc: 'Small team, big impact. Your work reaches thousands of users within days.' },
  { icon: Heart, title: 'Mission-Driven', desc: 'Help millions of people build better resumes and land their dream jobs.' },
];

const openings = [
  { title: 'Senior Frontend Engineer', location: 'Remote', type: 'Full-time', dept: 'Engineering', desc: 'Build and optimize our resume builder UI with React, TypeScript, and modern web technologies. You\'ll own key features from design to deployment.' },
  { title: 'Product Designer', location: 'Remote', type: 'Full-time', dept: 'Design', desc: 'Design beautiful, intuitive resume templates and user experiences. Deep understanding of typography, layout, and print design preferred.' },
  { title: 'Content Writer', location: 'Remote', type: 'Part-time', dept: 'Marketing', desc: 'Create in-depth career guides, resume writing tips, and blog content. Experience in HR, recruiting, or career coaching is a strong plus.' },
  { title: 'DevOps Engineer', location: 'Remote', type: 'Full-time', dept: 'Engineering', desc: 'Manage our infrastructure, CI/CD pipelines, and deployment processes. Experience with edge computing and CDNs preferred.' },
];

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Join Lade Stack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're building the world's best free resume builder. If you're passionate about helping people 
            succeed in their careers, we'd love to hear from you.
          </p>
        </section>

        {/* Perks */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Work With Us</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {perks.map((p) => (
              <div key={p.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Openings */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{job.dept}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Briefcase className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Don't see your role?</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              We're always looking for talented people. Send us your resume and tell us how you'd contribute.
            </p>
            <a href="mailto:careers@ladestack.com" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Send Your Resume
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
