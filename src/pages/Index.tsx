/**
 * Index — mobile-first responsive main page with ResumeProvider.
 * Mobile: Form first, then preview below with smooth scrolling
 * Desktop: Side-by-side layout
 */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import InfoSection from '@/components/InfoSection';
import { ResumeProvider } from '@/context/ResumeContext';
import { ArrowDown } from 'lucide-react';
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
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:py-6">
            {/* Mobile: Stack vertically with clear sections */}
            {/* Desktop: Side by side */}
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-6">
              {/* Form Section - Always first */}
              <div className="order-1 w-full min-w-0">
                <div className="mb-6 lg:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-foreground">Build Your Resume</h1>
                      <p className="text-sm text-muted-foreground mt-1">Fill in your details below</p>
                    </div>
                  </div>
                </div>
                <ResumeForm />
                
                {/* Mobile: Scroll to preview button */}
                <div className="lg:hidden mt-6">
                  <Button 
                    onClick={scrollToPreview}
                    variant="outline"
                    size="lg"
                    className="w-full gap-2"
                  >
                    <ArrowDown className="h-4 w-4" />
                    Scroll to Preview
                  </Button>
                </div>
              </div>
              
              {/* Preview Section - Below form on mobile, side on desktop */}
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
