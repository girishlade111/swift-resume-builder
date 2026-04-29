import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import { PdfClassic, PdfCompact, PdfLeftSidebar, PdfModern, PdfMinimal, PdfGeneric } from '@/components/pdf/PdfTemplates';
import { pdf } from '@react-pdf/renderer';
import { useRef, useEffect, useState, useCallback, lazy, Suspense, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Eye, Maximize2, Minimize2, Printer, ZoomIn, ZoomOut, Monitor } from 'lucide-react';
import { TemplateName } from '@/types/resume';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const lazyTemplate = (loader: () => Promise<{ default: React.ComponentType<any> }>) => lazy(loader);

const templateLoaders: Record<TemplateName, React.LazyExoticComponent<React.ComponentType<{ data: any; settings: any }>>> = {
  classic: lazyTemplate(() => import('@/components/templates/ClassicTemplate')),
  compact: lazyTemplate(() => import('@/components/templates/CompactTemplate')),
  'left-sidebar': lazyTemplate(() => import('@/components/templates/LeftSidebarTemplate')),
  modern: lazyTemplate(() => import('@/components/templates/ModernTemplate')),
  minimal: lazyTemplate(() => import('@/components/templates/MinimalTemplate')),
  professional: lazyTemplate(() => import('@/components/templates/ProfessionalTemplate')),
  clean: lazyTemplate(() => import('@/components/templates/CleanTemplate')),
  executive: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.ExecutiveTemplate }))),
  creative: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.CreativeTemplate }))),
  elegant: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.ElegantTemplate }))),
  bold: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.BoldTemplate }))),
  tech: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.TechTemplate }))),
  gradient: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.GradientTemplate }))),
  infographic: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.InfographicTemplate }))),
  timeline: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.TimelineTemplate }))),
  magazine: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.MagazineTemplate }))),
  monochrome: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.MonochromeTemplate }))),
  artistic: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.ArtisticTemplate }))),
  corporate: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.CorporateTemplate }))),
  starter: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.StarterTemplate }))),
  academic: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.AcademicTemplate }))),
  designer: lazyTemplate(() => import('@/components/templates/AllTemplates').then(m => ({ default: m.DesignerTemplate }))),
  swiss: lazyTemplate(() => import('@/components/templates/SwissTemplate')),
  metro: lazyTemplate(() => import('@/components/templates/MetroTemplate')),
  luxe: lazyTemplate(() => import('@/components/templates/LuxeTemplate')),
  nordic: lazyTemplate(() => import('@/components/templates/NordicTemplate')),
  architect: lazyTemplate(() => import('@/components/templates/ArchitectTemplate')),
  editorial: lazyTemplate(() => import('@/components/templates/EditorialTemplate')),
  brutalist: lazyTemplate(() => import('@/components/templates/BrutalistTemplate')),
  glass: lazyTemplate(() => import('@/components/templates/GlassTemplate')),
  neon: lazyTemplate(() => import('@/components/templates/NeonTemplate')),
  pixel: lazyTemplate(() => import('@/components/templates/PixelTemplate')),
};

const pdfConfigs: Record<string, { headerBg: string; accent: string; accentLight: string; text: string; muted: string }> = {
  professional: { headerBg: '#1e40af', accent: '#1e40af', accentLight: '#dbeafe', text: '#1e293b', muted: '#64748b' },
  clean: { headerBg: '#ffffff', accent: '#9ca3af', accentLight: '#f3f4f6', text: '#374151', muted: '#9ca3af' },
  executive: { headerBg: '#1a1a1a', accent: '#9ca3af', accentLight: '#e5e7eb', text: '#1f2937', muted: '#6b7280' },
  creative: { headerBg: '#134e4a', accent: '#d946ef', accentLight: '#fae8ff', text: '#1e293b', muted: '#64748b' },
  elegant: { headerBg: '#6b1d3a', accent: '#c9a96e', accentLight: '#fdf6ee', text: '#2d2424', muted: '#7c6f6f' },
  bold: { headerBg: '#000000', accent: '#f59e0b', accentLight: '#fefce8', text: '#171717', muted: '#525252' },
  tech: { headerBg: '#0d1117', accent: '#58a6ff', accentLight: '#ddf4ff', text: '#24292f', muted: '#57606a' },
  gradient: { headerBg: '#4f46e5', accent: '#7c3aed', accentLight: '#eef2ff', text: '#1e1b4b', muted: '#6366f1' },
  infographic: { headerBg: '#155e75', accent: '#0891b2', accentLight: '#ecfeff', text: '#164e63', muted: '#6b7280' },
  timeline: { headerBg: '#1e3a5f', accent: '#2563eb', accentLight: '#dbeafe', text: '#1e293b', muted: '#64748b' },
  magazine: { headerBg: '#ffffff', accent: '#b45309', accentLight: '#faf5ef', text: '#292524', muted: '#78716c' },
  monochrome: { headerBg: '#000000', accent: '#000000', accentLight: '#f5f5f5', text: '#222222', muted: '#666666' },
  artistic: { headerBg: '#fff7ed', accent: '#c2410c', accentLight: '#fff7ed', text: '#431407', muted: '#9a3412' },
  corporate: { headerBg: '#1e3a5f', accent: '#3b82f6', accentLight: '#dbeafe', text: '#1e293b', muted: '#64748b' },
  starter: { headerBg: '#f0fdf4', accent: '#16a34a', accentLight: '#f0fdf4', text: '#14532d', muted: '#166534' },
  academic: { headerBg: '#166534', accent: '#166534', accentLight: '#f0fdf4', text: '#052e16', muted: '#365314' },
  designer: { headerBg: '#fdf2f8', accent: '#ec4899', accentLight: '#fce7f3', text: '#1e1b4b', muted: '#6b7280' },
  swiss: { headerBg: '#ffffff', accent: '#e11d48', accentLight: '#fff1f2', text: '#0f172a', muted: '#64748b' },
  metro: { headerBg: '#0078d4', accent: '#0078d4', accentLight: '#f0f6ff', text: '#1e293b', muted: '#64748b' },
  luxe: { headerBg: '#0a1628', accent: '#c9a96e', accentLight: '#0f1f3a', text: '#e8e0d0', muted: '#94a3b8' },
  nordic: { headerBg: '#faf8f5', accent: '#5b8fa8', accentLight: '#f0ece5', text: '#3a4a5a', muted: '#5c6b7a' },
  architect: { headerBg: '#fdfdfd', accent: '#334155', accentLight: '#f8fafc', text: '#374151', muted: '#6b7280' },
  editorial: { headerBg: '#fffbf5', accent: '#7c2d12', accentLight: '#fffbf5', text: '#374151', muted: '#78716c' },
  brutalist: { headerBg: '#fffef5', accent: '#ff6b35', accentLight: '#fff', text: '#1a1a1a', muted: '#666666' },
  glass: { headerBg: '#0f0a1f', accent: '#a78bfa', accentLight: '#1a1035', text: '#e2e8f0', muted: '#94a3b8' },
  neon: { headerBg: '#0a0a0f', accent: '#22d3ee', accentLight: '#0a0a0f', text: '#e2e8f0', muted: '#64748b' },
  pixel: { headerBg: '#f0fdf4', accent: '#10b981', accentLight: '#f0fdf4', text: '#374151', muted: '#6b7280' },
};

const TemplateRenderer = memo(({ selectedTemplate, resume, settings }: { selectedTemplate: TemplateName; resume: any; settings: any }) => {
  const Component = templateLoaders[selectedTemplate] || templateLoaders.classic;
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center bg-white shadow-2xl rounded-sm" style={{ width: 794, minHeight: 1123 }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
      </div>
    }>
      <Component data={resume} settings={settings} />
    </Suspense>
  );
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default function ResumePreview() {
  const { resume, selectedTemplate, settings } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  const [downloading, setDownloading] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'focus'>('preview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateScale = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth;
          const isMobile = window.innerWidth < 1024;
          const padding = isMobile ? 32 : 64;
          const targetWidth = Math.min(containerWidth - padding, 794);
          setScale(Math.min(targetWidth / 794, 1));
        }
      }, 100);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    setIsLoaded(true);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const getPdfComponent = () => {
    switch (selectedTemplate) {
      case 'classic': return <PdfClassic data={resume} />;
      case 'compact': return <PdfCompact data={resume} />;
      case 'left-sidebar': return <PdfLeftSidebar data={resume} />;
      case 'modern': return <PdfModern data={resume} />;
      case 'minimal': return <PdfMinimal data={resume} />;
      default: {
        const config = pdfConfigs[selectedTemplate];
        return <PdfGeneric data={resume} colors={config || pdfConfigs.professional} />;
      }
    }
  };

  const sanitize = (s: string) => s.replace(/[^a-zA-Z0-9 _-]/g, '').replace(/\s+/g, '-').trim() || 'Resume';

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const blob = await pdf(getPdfComponent()).toBlob();
      const name = sanitize(resume.personal.fullName || 'Resume');
      const title = resume.personal.jobTitle ? `-${sanitize(resume.personal.jobTitle)}` : '';
      const filename = `${name}${title}-Resume.pdf`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setDownloading(false);
    }
  }, [resume, selectedTemplate]);

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background/50 p-4 rounded-2xl border backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <TemplateSelector />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-1 mr-2 border">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={() => setScale(s => Math.max(s - 0.1, 0.4))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="px-2 text-[10px] font-bold text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={() => setScale(s => Math.min(s + 0.1, 1.5))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'preview' | 'focus')} className="lg:hidden">
            <TabsList className="grid w-full grid-cols-2 h-9 rounded-lg">
              <TabsTrigger value="preview" className="text-xs rounded-md">
                <Eye className="h-3.5 w-3.5 mr-1" />View
              </TabsTrigger>
              <TabsTrigger value="focus" className="text-xs rounded-md">
                <Maximize2 className="h-3.5 w-3.5 mr-1" />Focus
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={handlePrint} variant="outline" size="sm" className="h-9 rounded-lg hidden sm:flex border-2 font-bold">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="sm"
            className="h-9 rounded-lg shadow-lg shadow-primary/20 font-bold px-4"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
            <span>{downloading ? 'Processing...' : 'Download PDF'}</span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`flex-1 overflow-auto rounded-3xl border-4 border-dashed border-muted/50 bg-muted/20 p-8 sm:p-12 transition-all relative ${
          viewMode === 'focus' ? 'fixed inset-0 z-50 m-0 rounded-none bg-background' : ''
        }`}
      >
        {viewMode === 'focus' && (
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-6 right-6 z-[60] h-10 w-10 rounded-full shadow-xl" 
            onClick={() => setViewMode('preview')}
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
        )}

        <div className="flex justify-center items-start min-h-full">
          {!isLoaded ? (
            <div className="bg-white shadow-2xl rounded-sm w-[794px] h-[1123px] flex items-center justify-center">
               <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
            </div>
          ) : (
            <div 
              className="bg-white shadow-2xl origin-top transition-transform duration-200 ease-out rounded-sm overflow-hidden"
              style={{
                width: 794,
                minHeight: 1123,
                transform: `scale(${scale})`,
                marginBottom: `${1123 * (scale - 1)}px`,
              }}
            >
              <TemplateRenderer selectedTemplate={selectedTemplate} resume={resume} settings={settings} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 py-2 border-t bg-background/50 rounded-2xl">
         <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
           <Monitor className="h-3 w-3" /> Real-time Studio Engine Active
         </div>
      </div>
    </div>
  );
}
