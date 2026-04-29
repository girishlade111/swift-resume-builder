import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import InfoSection from '@/components/InfoSection';
import { ResumeProvider } from '@/context/ResumeContext';
import { ArrowDown, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const scrollToPreview = () => {
    document.getElementById('resume-preview-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Header */}
          <div className="no-print border-b bg-gradient-to-br from-background via-background to-primary/5">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in">
                  Build Your <span className="gradient-text">Professional Resume</span>
                </h1>
                <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed animate-slide-up">
                  Create stunning, ATS-friendly resumes in minutes. Choose from 32+ enterprise-grade templates, customize colors and fonts, and export to PDF instantly.
                </p>
                <div className="mt-5 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-primary" />32+ Templates</span>
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" />ATS-Friendly</span>
                  <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" />Instant PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Builder */}
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="order-1 w-full min-w-0">
                <div className="mb-6 lg:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Editor</h2>
                      <p className="text-sm text-muted-foreground mt-1">Fill in your details below</p>
                    </div>
                  </div>
                </div>
                <ResumeForm />
                <div className="lg:hidden mt-6">
                  <Button onClick={scrollToPreview} variant="outline" size="lg" className="w-full gap-2 rounded-xl">
                    <ArrowDown className="h-4 w-4" />Scroll to Preview
                  </Button>
                </div>
              </div>
              <div className="order-2 w-full min-w-0" id="resume-preview-section">
                <div className="lg:sticky lg:top-20 lg:self-start">
                  <div className="mb-4 lg:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Live Preview</h2>
                    <p className="text-sm text-muted-foreground mt-1">See your changes in real-time</p>
                  </div>
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
          <InfoSection />
        </main>
        <Footer />
      </div>
    </ResumeProvider>
  );
};

export default Index;
