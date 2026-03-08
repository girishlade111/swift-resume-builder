/**
 * ResumePreview — live A4 preview with template switching and PDF download.
 * Templates are lazy-loaded to reduce initial bundle size.
 */
import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import { PdfClassic, PdfCompact, PdfLeftSidebar, PdfModern, PdfMinimal, PdfGeneric } from '@/components/pdf/PdfTemplates';
import { pdf } from '@react-pdf/renderer';
import { useRef, useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { TemplateName } from '@/types/resume';

// Lazy-load all templates — only fetched when selected
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
};

// PDF color configs for generic templates
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
};

export default function ResumePreview() {
  const { resume, selectedTemplate } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setScale(Math.min(containerWidth / 794, 1));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const renderTemplate = () => {
    const Component = templateMap[selectedTemplate] || ClassicTemplate;
    return <Component data={resume} />;
  };

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

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TemplateSelector />
        <Button onClick={handleDownload} disabled={downloading} size="sm">
          {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Download className="h-4 w-4 mr-1" />}
          {downloading ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
      <div ref={containerRef} className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div
          className="bg-white origin-top-left"
          style={{
            width: 794,
            minHeight: 1123,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            marginBottom: `${1123 * (scale - 1)}px`,
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
