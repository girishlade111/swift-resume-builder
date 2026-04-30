import Navbar from '@/components/Navbar';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { ResumeProvider } from '@/context/ResumeContext';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { 
  Save, Download, Printer, Share2, Eye, 
  Settings2, ChevronDown, Zap, CheckCircle, Loader2
} from 'lucide-react';
import { useState, useEffect, Suspense, lazy } from 'react';

const Index = () => {
  const isMobile = useIsMobile();
  const [zoom, setZoom] = useState(100);
  const [showSettings, setShowSettings] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        // Auto-save is already enabled, but we can show a notification
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  if (isMobile) {
    return (
      <ResumeProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 flex flex-col p-4 gap-6">
            {/* Mobile Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-display font-bold tracking-tight">Resume Editor</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Build your professional resume</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-9">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="default" size="sm" className="rounded-lg h-9 bg-gradient-to-r from-blue-600 to-purple-600">
                  {isExporting ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                  Export
                </Button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="pt-2">
              <TemplateSelector />
            </div>

            <ResumeForm />
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold tracking-tight">Preview</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg h-8">
                      <Printer className="h-3.5 w-3.5 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Real-time view of your document</p>
              </div>
              <ResumePreview />
            </div>
          </main>
        </div>
      </ResumeProvider>
    );
  }

  // Desktop Layout
  return (
    <ResumeProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        
        {/* Editor Toolbar */}
        <div className="no-print h-14 border-b bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
          {/* Left: Actions */}
          <div className="flex items-center gap-3">
            <TemplateSelector />
          </div>

          {/* Center: Document Title */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold">My Resume</span>
              <span className="text-xs text-muted-foreground">Auto-saved</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Zoom Control */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-md"
                onClick={() => setZoom(z => Math.max(50, z - 10))}
              >
                -
              </Button>
              <span className="text-xs font-semibold w-10 text-center">{zoom}%</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-md"
                onClick={() => setZoom(z => Math.min(150, z + 10))}
              >
                +
              </Button>
            </div>

            <div className="h-6 w-px bg-border" />

            {/* Action Buttons */}
            <Button variant="outline" size="sm" className="rounded-xl h-9 font-semibold">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl h-9 font-semibold">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-xl h-9 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/20"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export PDF
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <main className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal">
            {/* Form Panel */}
            <Panel 
              defaultSize={40} 
              minSize={30} 
              maxSize={55} 
              className="h-full"
            >
              <div className="h-full overflow-y-auto px-6 py-6 custom-scrollbar">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Header */}
                  <header className="mb-8">
                    <h1 className="text-2xl font-display font-bold tracking-tight">Resume Editor</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fill in your details below. Your resume updates in real-time.
                    </p>
                  </header>
                  
                  <ResumeForm />
                </div>
              </div>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

            {/* Preview Panel */}
            <Panel className="h-full bg-gradient-to-br from-muted/10 to-muted/5">
              <div className="h-full overflow-y-auto p-8 custom-scrollbar flex justify-center">
                <div 
                  className="transition-transform duration-200"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  <div className="w-full max-w-4xl">
                    {/* Preview Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border shadow-sm">
                          <Eye className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">Live Preview</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Updates as you type</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">ATS Optimized</span>
                      </div>
                    </div>
                    
                    {/* Resume Preview */}
                    <div className="shadow-2xl shadow-slate-300/50 rounded-xl overflow-hidden">
                      <ResumePreview />
                    </div>
                  </div>
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
