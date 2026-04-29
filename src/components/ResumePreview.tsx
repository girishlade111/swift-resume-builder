import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import { PdfClassic, PdfCompact, PdfLeftSidebar, PdfModern, PdfMinimal, PdfGeneric } from '@/components/pdf/PdfTemplates';
import { pdf } from '@react-pdf/renderer';
import { useRef, useEffect, useState, useCallback, lazy, Suspense, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Eye, Maximize2, Minimize2, Printer } from 'lucide-react';
import { TemplateName } from '@/types/resume';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const lazyTemplate = (loader: () => Promise<{ default: React.ComponentType<any> }>) => lazy(loader);

const templateLoaders: Record<TemplateName, React.LazyExoticComponent<React.ComponentType<{ data: any }>>> = {
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

const TemplateRenderer = memo(({ selectedTemplate, resume }: { selectedTemplate: TemplateName; resume: any }) => {
  const Component = templateLoaders[selectedTemplate] || templateLoaders.classic;
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center" style={{ width: 794, minHeight: 1123 }}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <Component data={resume} />
    </Suspense>
  );
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default function ResumePreview() {
  const { resume, selectedTemplate } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
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
          const isMobile = containerWidth < 640;
          const padding = isMobile ? 32 : 48;
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
    <div className="space-y-4 no-print">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <TemplateSelector />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'preview' | 'focus')} className="sm:hidden">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />Preview
              </TabsTrigger>
              <TabsTrigger value="focus" className="text-xs">
                {viewMode === 'focus' ? <><Minimize2 className="h-3.5 w-3.5 mr-1" />Close</> : <><Maximize2 className="h-3.5 w-3.5 mr-1" />Full</>}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handlePrint} variant="outline" size="sm" className="shrink-0 rounded-xl hidden sm:flex">
            <Printer className="h-4 w-4 mr-1" />Print
          </Button>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="sm"
            className="shrink-0 bg-primary hover:bg-primary/90 rounded-xl"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Download className="h-4 w-4 mr-1" />}
            <span className="hidden sm:inline">{downloading ? 'Generating...' : 'Download PDF'}</span>
            <span className="sm:hidden">{downloading ? '...' : 'PDF'}</span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 ${
          viewMode === 'focus'
            ? 'fixed inset-0 z-50 m-0 rounded-none bg-background p-4 sm:p-6'
            : 'p-3 sm:p-4'
        }`}
      >
        {!isLoaded && (
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-4" />
            <div className="h-64 bg-muted rounded" />
          </div>
        )}
        <div className="transition-transform duration-200">
          <div
            className="bg-white origin-top-left mx-auto"
            style={{
              width: 794,
              minHeight: 1123,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              marginBottom: `${1123 * (scale - 1)}px`,
            }}
          >
            <TemplateRenderer selectedTemplate={selectedTemplate} resume={resume} />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 sm:hidden">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live updating as you type
        </div>
      </div>
    </div>
  );
}
