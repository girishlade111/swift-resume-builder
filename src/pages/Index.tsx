/**
 * Index page — main single-page layout for the resume builder.
 */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import AtsInfoSection from '@/components/AtsInfoSection';
import { ResumeProvider } from '@/context/ResumeContext';

const Index = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left: Form */}
              <div className="order-2 lg:order-1">
                <h2 className="mb-4 text-lg font-semibold">Edit Resume</h2>
                <ResumeForm />
              </div>
              {/* Right: Preview */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start">
                <h2 className="mb-4 text-lg font-semibold">Preview</h2>
                <ResumePreview />
              </div>
            </div>
          </div>
          <AtsInfoSection />
        </main>
        <Footer />
      </div>
    </ResumeProvider>
  );
};

export default Index;
