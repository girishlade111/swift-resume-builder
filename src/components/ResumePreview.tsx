/**
 * ResumePreview — live preview with template switching and PDF download.
 */
import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import CleanTemplate from '@/components/templates/CleanTemplate';
import { PdfClassic, PdfModern, PdfMinimal, PdfProfessional, PdfClean } from '@/components/pdf/PdfTemplates';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

export default function ResumePreview() {
  const { resume, selectedTemplate } = useResume();
  const [downloading, setDownloading] = useState(false);

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

  const sanitizeFilename = (str: string) => str.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-').trim() || 'Resume';

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const pdfDoc = getPdfComponent();
      const blob = await pdf(pdfDoc).toBlob();
      const name = resume.personal.fullName || 'Resume';
      const title = resume.personal.jobTitle || '';
      const filename = `${sanitizeFilename(name)}${title ? `-${sanitizeFilename(title)}` : ''}-Resume.pdf`;
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

      {/* A4 Preview */}
      <div className="overflow-auto rounded-lg border bg-card shadow-sm">
        <div
          className="mx-auto bg-white origin-top"
          style={{
            width: 794, // A4 width in px at 96dpi
            minHeight: 1123, // A4 height
            transform: 'scale(var(--preview-scale, 1))',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
