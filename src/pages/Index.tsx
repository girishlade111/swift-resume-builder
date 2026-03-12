/**
 * Index — mobile-first responsive main page with ResumeProvider.
 */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import InfoSection from '@/components/InfoSection';
import { ResumeProvider } from '@/context/ResumeContext';

const Index = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:py-6">
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
              {/* Form Section */}
              <div className="order-1 w-full min-w-0">
                <ResumeForm />
              </div>
              
              {/* Preview Section - Sticky on desktop, normal flow on mobile */}
              <div className="order-2 w-full min-w-0">
                <div className="lg:sticky lg:top-20 lg:self-start">
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
