import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: '10 Resume Mistakes That Get You Rejected by ATS Systems',
    excerpt: 'Applicant tracking systems reject up to 75% of resumes before a human ever sees them. Learn the most common formatting mistakes and how to fix them instantly.',
    date: 'March 5, 2026',
    readTime: '8 min read',
    category: 'ATS Tips',
  },
  {
    title: 'How to Write a Resume Summary That Gets Interviews',
    excerpt: 'Your resume summary is the first thing recruiters read. Here\'s a proven formula for writing one that hooks attention and highlights your value in under 3 seconds.',
    date: 'March 1, 2026',
    readTime: '6 min read',
    category: 'Resume Writing',
  },
  {
    title: 'The Complete Guide to Resume Keywords in 2026',
    excerpt: 'Strategic keyword placement can make or break your resume\'s ATS score. Learn how to identify, place, and optimize keywords for your target role without keyword stuffing.',
    date: 'February 25, 2026',
    readTime: '10 min read',
    category: 'ATS Tips',
  },
  {
    title: 'Creative vs. Traditional Resumes: When to Use Each',
    excerpt: 'Should you go with a bold, creative design or stick to a clean, traditional layout? The answer depends on your industry, role, and the company\'s culture.',
    date: 'February 20, 2026',
    readTime: '5 min read',
    category: 'Career Advice',
  },
  {
    title: 'How to Quantify Your Achievements on a Resume',
    excerpt: 'Numbers speak louder than words. Learn how to transform vague job descriptions into powerful, quantified accomplishments that prove your impact.',
    date: 'February 15, 2026',
    readTime: '7 min read',
    category: 'Resume Writing',
  },
  {
    title: 'Remote Job Resumes: What Hiring Managers Actually Look For',
    excerpt: 'Remote positions require a different resume strategy. Discover what remote-first companies prioritize and how to showcase your remote work readiness.',
    date: 'February 10, 2026',
    readTime: '6 min read',
    category: 'Career Advice',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog & Career Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert advice on resume writing, job searching, and navigating ATS systems. 
              Updated weekly with actionable tips to help you land your dream job.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.title} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary cursor-pointer hover:underline">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
