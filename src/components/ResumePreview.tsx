/**
 * ResumePreview — live A4 preview with template switching.
 * PDF export will be added in a later step.
 */
import { useResume } from '@/context/ResumeContext';
import TemplateSelector from '@/components/TemplateSelector';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import CompactTemplate from '@/components/templates/CompactTemplate';
import LeftSidebarTemplate from '@/components/templates/LeftSidebarTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import { useRef, useEffect, useState } from 'react';

export default function ResumePreview() {
  const { resume, selectedTemplate } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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
      case 'compact': return <CompactTemplate data={resume} />;
      case 'left-sidebar': return <LeftSidebarTemplate data={resume} />;
      case 'modern': return <ModernTemplate data={resume} />;
      case 'minimal': return <MinimalTemplate data={resume} />;
      default: return <ClassicTemplate data={resume} />;
    }
  };

  return (
    <div className="space-y-3">
      <TemplateSelector />
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
