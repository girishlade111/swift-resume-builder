import Navbar from '@/components/Navbar';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { ResumeProvider } from '@/context/ResumeContext';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ResumeProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 flex flex-col p-4 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Editor</h1>
              <p className="text-sm text-muted-foreground">Fill in your details to build your resume</p>
            </div>
            <ResumeForm />
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
                <p className="text-sm text-muted-foreground">Real-time view of your document</p>
              </div>
              <ResumePreview />
            </div>
          </main>
        </div>
      </ResumeProvider>
    );
  }

  return (
    <ResumeProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-background">
        <Navbar />
        <main className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={40} minSize={30} maxSize={60} className="h-full">
              <div className="h-full overflow-y-auto px-6 py-8 custom-scrollbar">
                <div className="max-w-2xl mx-auto space-y-6">
                  <header>
                    <h1 className="text-2xl font-bold tracking-tight">Resume Editor</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Professional details and customization
                    </p>
                  </header>
                  <ResumeForm />
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

            <Panel className="h-full bg-muted/30">
              <div className="h-full overflow-y-auto px-8 py-10 custom-scrollbar flex justify-center">
                <div className="w-full max-w-4xl">
                  <header className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Live Preview</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Perfect for print & ATS</p>
                    </div>
                  </header>
                  <ResumePreview />
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </main>
      </div>
    </ResumeProvider>
  );
};

export default Index;
