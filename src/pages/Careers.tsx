import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock, Heart, Rocket, Coffee, Sun, Users, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const perks = [
  { icon: Sun, title: 'Fully Remote', desc: 'Work from anywhere in the world. We\'re a distributed team across multiple time zones with no office requirements.' },
  { icon: Coffee, title: 'Flexible Hours', desc: 'We care about output, not hours logged. Work when you\'re most productive and maintain healthy work-life balance.' },
  { icon: Rocket, title: 'Ship Fast', desc: 'Small team, big impact. Your work reaches thousands of users within days, not months of bureaucracy.' },
  { icon: Heart, title: 'Mission-Driven', desc: 'Help millions of people build better resumes and land their dream jobs. Every line of code matters.' },
  { icon: Users, title: 'Collaborative Culture', desc: 'Work with talented, friendly people who love what they do. Regular team events and genuine camaraderie.' },
  { icon: Award, title: 'Growth Opportunities', desc: 'We invest in your development with learning budgets, conference attendance, and clear career progression.' },
];

const openings = [
  { 
    title: 'Senior Frontend Engineer', 
    location: 'Remote', 
    type: 'Full-time', 
    dept: 'Engineering',
    salary: '$120K - $160K',
    desc: 'Build and optimize our resume builder UI with React, TypeScript, and modern web technologies. You\'ll own key features from design to deployment.',
    requirements: ['5+ years React experience', 'TypeScript expertise', 'Experience with PDF generation', 'Strong CSS skills'],
  },
  { 
    title: 'Product Designer', 
    location: 'Remote', 
    type: 'Full-time', 
    dept: 'Design',
    salary: '$100K - $140K',
    desc: 'Design beautiful, intuitive resume templates and user experiences. Deep understanding of typography, layout, and print design preferred.',
    requirements: ['Portfolio demonstrating UI/UX work', 'Figma expertise', 'Print design experience', 'User research skills'],
  },
  { 
    title: 'Content Writer', 
    location: 'Remote', 
    type: 'Part-time', 
    dept: 'Marketing',
    salary: '$40K - $60K',
    desc: 'Create in-depth career guides, resume writing tips, and blog content. Experience in HR, recruiting, or career coaching is a strong plus.',
    requirements: ['Excellent writing portfolio', 'SEO knowledge', 'Career/HR industry experience', 'Research skills'],
  },
  { 
    title: 'DevOps Engineer', 
    location: 'Remote', 
    type: 'Full-time', 
    dept: 'Engineering',
    salary: '$130K - $170K',
    desc: 'Manage our infrastructure, CI/CD pipelines, and deployment processes. Experience with edge computing and CDNs preferred.',
    requirements: ['AWS/GCP expertise', 'Kubernetes experience', 'CI/CD pipeline management', 'Security best practices'],
  },
  { 
    title: 'Customer Success Manager', 
    location: 'Remote', 
    type: 'Full-time', 
    dept: 'Support',
    salary: '$70K - $90K',
    desc: 'Lead our user support efforts, gather feedback, and ensure our community gets the help they need. Empathy and communication skills essential.',
    requirements: ['Customer support experience', 'Excellent communication', 'Problem-solving skills', 'Technical aptitude'],
  },
];

const benefits = [
  { title: 'Competitive Salary', desc: 'Above-market compensation reflecting your skills and impact' },
  { title: 'Equity Package', desc: 'Share in the success you help create' },
  { title: 'Health Insurance', desc: 'Comprehensive medical, dental, and vision coverage' },
  { title: 'Unlimited PTO', desc: 'Take the time you need to rest and recharge' },
  { title: 'Home Office Stipend', desc: '$1,000 to set up your ideal workspace' },
  { title: 'Learning Budget', desc: '$2,000 annually for courses, conferences, and books' },
  { title: 'Latest Equipment', desc: 'MacBook Pro and monitor of your choice' },
  { title: 'Team Retreats', desc: 'Quarterly in-person meetups in exciting locations' },
];

export default function Careers() {
  useEffect(() => {
    document.title = 'Careers at Lade Stack | Join Our Remote Team';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Join the Lade Stack team! We\'re hiring talented people passionate about helping others succeed in their careers. Remote-first, competitive pay, great benefits.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-4 w-4" /> We're hiring!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Join Lade Stack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're building the world's best free resume builder. If you're passionate about helping people
            succeed in their careers, we'd love to hear from you.
          </p>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-1">Remote Team</p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">12+</p>
              <p className="text-sm text-muted-foreground mt-1">Countries</p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground mt-1">Users Helped</p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">4.9</p>
              <p className="text-sm text-muted-foreground mt-1">User Rating</p>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Work With Us</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        {/* Benefits */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Benefits & Perks</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{job.dept}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {job.type}
                      </span>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">{job.salary}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{job.desc}</p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Requirements:</p>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href={`mailto:careers@ladestack.com?subject=Application: ${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Briefcase className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Don't see your role?</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              We're always looking for talented people. Send us your resume and tell us how you'd contribute to our mission.
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
