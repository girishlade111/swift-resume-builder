/**
 * TemplateSelector — buttons to switch between the 5 resume templates.
 */
import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/types/resume';
import { cn } from '@/lib/utils';

const templates: { name: TemplateName; label: string }[] = [
  { name: 'classic', label: 'Classic' },
  { name: 'modern', label: 'Modern' },
  { name: 'minimal', label: 'Minimal' },
  { name: 'professional', label: 'Professional' },
  { name: 'clean', label: 'Clean' },
];

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {templates.map(t => (
        <button
          key={t.name}
          onClick={() => setSelectedTemplate(t.name)}
          className={cn(
            'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap',
            selectedTemplate === t.name
              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
              : 'border-border bg-card text-muted-foreground hover:border-primary/50'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
