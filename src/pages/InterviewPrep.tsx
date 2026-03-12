import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mic, CheckCircle, AlertTriangle, Star, MessageSquare, Lightbulb, Target } from 'lucide-react';
import { useEffect } from 'react';

const commonQuestions = [
  {
    q: 'Tell me about yourself',
    tip: 'Use a 60-90 second "present-past-future" formula: Start with your current role and key accomplishment, briefly mention relevant past experience, then explain why you\'re excited about this opportunity.',
    example: '"I\'m currently a Senior Product Manager at TechCorp where I led the launch of our mobile app, growing it to 500K users in 6 months. Before that, I spent 4 years at StartupXYZ building product strategy from the ground up. I\'m now looking to bring that 0-to-1 and scaling experience to a mission-driven company like yours."',
  },
  {
    q: 'Why do you want to work here?',
    tip: 'Show genuine research. Reference specific projects, company values, or recent news. Connect their mission to your career goals.',
    example: '"I\'ve been following your open-source contributions to the developer community, and your recent focus on AI-powered developer tools aligns perfectly with my background in ML infrastructure. I want to be part of a team that\'s genuinely moving the industry forward."',
  },
  {
    q: 'What\'s your greatest weakness?',
    tip: 'Choose a real weakness that isn\'t critical to the role. Show self-awareness and describe concrete steps you\'re taking to improve.',
    example: '"I tend to over-prepare for presentations, spending more time polishing slides than necessary. I\'ve been working on this by setting strict time limits for prep work and focusing on the key messages rather than perfecting every visual detail."',
  },
  {
    q: 'Tell me about a challenge you faced',
    tip: 'Use the STAR method (Situation, Task, Action, Result). Choose a professional challenge that showcases relevant skills.',
    example: '"When our main client threatened to leave due to delivery delays (Situation), I was tasked with retaining the account (Task). I restructured our sprint planning, implemented daily standups, and personally managed client communication (Action). We delivered the next milestone 2 weeks early and the client renewed for 3 more years, worth $1.2M (Result)."',
  },
  {
    q: 'Where do you see yourself in 5 years?',
    tip: 'Show ambition aligned with the company\'s growth. Focus on skills and impact, not titles.',
    example: '"In 5 years, I want to be leading a design team that\'s recognized for shipping products that genuinely improve people\'s lives. I see this role as the foundation for developing both my leadership skills and deep product expertise."',
  },
];

const behavioralTips = [
  { title: 'Use STAR Method', desc: 'Structure every behavioral answer: Situation → Task → Action → Result. Practice until this framework feels natural.' },
  { title: 'Prepare 8-10 Stories', desc: 'Have versatile stories ready that can be adapted to different questions. Each should demonstrate leadership, problem-solving, collaboration, or resilience.' },
  { title: 'Quantify Results', desc: 'End every story with measurable impact: revenue generated, time saved, users acquired, problems resolved, efficiency gained.' },
  { title: 'Keep It Concise', desc: 'Each answer should be 1-2 minutes. Practice with a timer. Rambling is the #1 interview mistake.' },
];

const interviewTypes = [
  {
    type: 'Phone Screen',
    duration: '15-30 min',
    tips: [
      'Have your resume and the job description in front of you',
      'Use a quiet room with good reception',
      'Stand up while talking — it improves vocal energy',
      'Prepare 2-3 questions about the role and team',
      'Follow up with a thank-you email within 2 hours',
    ],
  },
  {
    type: 'Video Interview',
    duration: '30-60 min',
    tips: [
      'Test your camera, mic, and internet beforehand',
      'Use a clean, professional background',
      'Look at the camera, not the screen, to simulate eye contact',
      'Dress professionally from head to toe (you might need to stand)',
      'Close all other applications to avoid notifications',
    ],
  },
  {
    type: 'On-Site / Panel',
    duration: '2-5 hours',
    tips: [
      'Arrive 10-15 minutes early',
      'Bring 5+ printed copies of your resume',
      'Make eye contact with each panel member when answering',
      'Ask each interviewer at least one personalized question',
      'Send individual thank-you emails to each interviewer',
    ],
  },
  {
    type: 'Technical Interview',
    duration: '45-90 min',
    tips: [
      'Think out loud — interviewers want to see your reasoning process',
      'Ask clarifying questions before diving into solutions',
      'Start with a brute-force approach, then optimize',
      'Practice on platforms like LeetCode, HackerRank, or Pramp',
      'It\'s OK to say "I don\'t know, but here\'s how I\'d approach it"',
    ],
  },
];

const dosDonts = {
  dos: [
    'Research the company thoroughly before the interview',
    'Practice your answers out loud, not just in your head',
    'Prepare thoughtful questions for the interviewer',
    'Send a personalized thank-you email within 24 hours',
    'Bring examples of your work if relevant',
    'Arrive early and be polite to everyone you meet',
  ],
  donts: [
    'Badmouth previous employers or colleagues',
    'Give one-word answers or ramble for 5+ minutes',
    'Check your phone during the interview',
    'Lie about your experience or skills',
    'Ask about salary in the first interview (unless they bring it up)',
    'Forget to follow up after the interview',
  ],
};

export default function InterviewPrep() {
  useEffect(() => {
    document.title = 'Interview Preparation Guide | Common Questions & Tips | Lade Stack';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Master your job interview with our comprehensive guide. Learn the STAR method, common interview questions with example answers, and expert tips for 2026.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-12">
            <Mic className="h-8 w-8 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Interview Preparation Guide</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Master every interview format with proven strategies, sample answers, and expert tips.
            </p>
          </div>

          {/* Common Questions */}
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" /> Top 5 Interview Questions
          </h2>
          <div className="space-y-6 mb-16">
            {commonQuestions.map((q) => (
              <div key={q.q} className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">"{q.q}"</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  <strong className="text-foreground">Strategy:</strong> {q.tip}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{q.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Behavioral Tips */}
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" /> Behavioral Interview Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2 mb-16">
            {behavioralTips.map((tip) => (
              <div key={tip.title} className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* Interview Types */}
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" /> Interview Types & How to Ace Them
          </h2>
          <div className="space-y-6 mb-16">
            {interviewTypes.map((type) => (
              <div key={type.type} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{type.type}</h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{type.duration}</span>
                </div>
                <ul className="space-y-2">
                  {type.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Dos and Don'ts */}
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Interview Dos & Don'ts</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" /> Do
              </h3>
              <ul className="space-y-2">
                {dosDonts.dos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Don't
              </h3>
              <ul className="space-y-2">
                {dosDonts.donts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl border bg-primary/5 p-8 text-center">
            <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Get Your Resume Interview-Ready</h3>
            <p className="text-sm text-muted-foreground mb-4">A strong resume gets you the interview. Our free builder makes it easy.</p>
            <a href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Build Your Resume
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
