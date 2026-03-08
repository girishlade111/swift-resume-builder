/**
 * Index — main page. Holds resume state and renders the full layout.
 */
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeFormPlaceholder from '@/components/ResumeFormPlaceholder';
import ResumePreviewPlaceholder from '@/components/ResumePreviewPlaceholder';
import InfoSection from '@/components/InfoSection';

const Index = () => {
  const [resume, setResume] = useState({
    fullName: 'Aarav Sharma',
    jobTitle: 'Frontend Developer',
    email: 'aarav@email.com',
  });

  const handleChange = (field: string, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ResumeFormPlaceholder
                fullName={resume.fullName}
                jobTitle={resume.jobTitle}
                email={resume.email}
                onChange={handleChange}
              />
            </div>
            <div className="order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start">
              <ResumePreviewPlaceholder
                fullName={resume.fullName}
                jobTitle={resume.jobTitle}
                email={resume.email}
              />
            </div>
          </div>
        </div>
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
