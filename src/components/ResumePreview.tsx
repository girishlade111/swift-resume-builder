/**
 * ResumePreview — live A4 preview with template switching and PDF download.
 */
import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import CleanTemplate from '@/components/templates/CleanTemplate';
import { PdfClassic, PdfModern, PdfMinimal, PdfProfessional, PdfClean } from '@/components/pdf/PdfTemplates';
import { pdf } from '@react-pdf/renderer';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

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
    switch (selectedTemplate) {
      case 'modern': return <ModernTemplate data={resume} />;
      case 'minimal': return <MinimalTemplate data={resume} />;
      case 'professional': return <ProfessionalTemplate data={resume} />;
      case 'clean': return <CleanTemplate data={resume} />;
      default: return <ClassicTemplate data={resume} />;
    }
  };

  const getPdfComponent = () => {
    switch (selectedTemplate) {
      case 'modern': return <PdfModern data={resume} />;
      case 'minimal': return <PdfMinimal data={resume} />;
      case 'professional': return <PdfProfessional data={resume} />;
      case 'clean': return <PdfClean data={resume} />;
      default: return <PdfClassic data={resume} />;
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
