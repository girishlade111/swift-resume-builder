/**
 * Index — main page. Wraps everything in ResumeProvider and renders layout.
 */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeFormPlaceholder from '@/components/ResumeFormPlaceholder';
import ResumePreviewPlaceholder from '@/components/ResumePreviewPlaceholder';
import InfoSection from '@/components/InfoSection';
import { ResumeProvider } from '@/context/ResumeContext';

const Index = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <ResumeFormPlaceholder />
              </div>
              <div className="order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start">
                <ResumePreviewPlaceholder />
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
