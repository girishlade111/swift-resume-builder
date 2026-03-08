/**
 * TemplateSelector — full gallery dialog showing all 22 templates in a grid.
 */
import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { useState } from 'react';

interface TemplateInfo {
  name: TemplateName;
  label: string;
  category: string;
  colors: [string, string]; // [header/accent, body bg]
  layout: 'full' | 'sidebar';
}

const templates: TemplateInfo[] = [
  // Professional
  { name: 'classic', label: 'Classic', category: 'Professional', colors: ['#1b2a4a', '#f8f6f0'], layout: 'full' },
  { name: 'executive', label: 'Executive', category: 'Professional', colors: ['#1a1a1a', '#f9fafb'], layout: 'full' },
  { name: 'professional', label: 'Professional', category: 'Professional', colors: ['#1e40af', '#f8fafc'], layout: 'full' },
  { name: 'corporate', label: 'Corporate', category: 'Professional', colors: ['#1e3a5f', '#ffffff'], layout: 'sidebar' },
  { name: 'elegant', label: 'Elegant', category: 'Professional', colors: ['#6b1d3a', '#fdf6ee'], layout: 'full' },
  // Modern
  { name: 'modern', label: 'Modern', category: 'Modern', colors: ['#1c1917', '#ffffff'], layout: 'full' },
  { name: 'gradient', label: 'Gradient', category: 'Modern', colors: ['#4f46e5', '#ffffff'], layout: 'full' },
  { name: 'tech', label: 'Tech', category: 'Modern', colors: ['#0d1117', '#ffffff'], layout: 'full' },
  { name: 'bold', label: 'Bold', category: 'Modern', colors: ['#000000', '#ffffff'], layout: 'full' },
  { name: 'timeline', label: 'Timeline', category: 'Modern', colors: ['#2563eb', '#ffffff'], layout: 'full' },
  { name: 'infographic', label: 'Infographic', category: 'Modern', colors: ['#0891b2', '#ffffff'], layout: 'full' },
  // Minimal
  { name: 'minimal', label: 'Minimal', category: 'Minimal', colors: ['#059669', '#ffffff'], layout: 'full' },
  { name: 'clean', label: 'Clean', category: 'Minimal', colors: ['#9ca3af', '#ffffff'], layout: 'full' },
  { name: 'monochrome', label: 'Monochrome', category: 'Minimal', colors: ['#000000', '#ffffff'], layout: 'full' },
  { name: 'starter', label: 'Starter', category: 'Minimal', colors: ['#16a34a', '#f0fdf4'], layout: 'full' },
  // Creative
  { name: 'left-sidebar', label: 'Left Sidebar', category: 'Creative', colors: ['#0c1222', '#ffffff'], layout: 'sidebar' },
  { name: 'compact', label: 'Compact', category: 'Creative', colors: ['#6d28d9', '#ffffff'], layout: 'full' },
  { name: 'creative', label: 'Creative', category: 'Creative', colors: ['#134e4a', '#ffffff'], layout: 'sidebar' },
  { name: 'artistic', label: 'Artistic', category: 'Creative', colors: ['#c2410c', '#fff7ed'], layout: 'full' },
  { name: 'magazine', label: 'Magazine', category: 'Creative', colors: ['#b45309', '#faf5ef'], layout: 'full' },
  { name: 'designer', label: 'Designer', category: 'Creative', colors: ['#ec4899', '#fdf2f8'], layout: 'sidebar' },
  { name: 'academic', label: 'Academic', category: 'Creative', colors: ['#166534', '#fefce8'], layout: 'full' },
];

const categories = ['All', 'Professional', 'Modern', 'Minimal', 'Creative'];

function TemplateThumbnail({ t, isSelected }: { t: TemplateInfo; isSelected: boolean }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '210 / 297',
      borderRadius: 4, overflow: 'hidden',
      border: isSelected ? '2px solid hsl(var(--primary))' : '1px solid #e5e7eb',
      background: t.colors[1],
      position: 'relative',
    }}>
      {t.layout === 'sidebar' ? (
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '32%', background: t.colors[0] }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', margin: '12px auto 4px' }} />
            <div style={{ height: 2, width: '60%', background: 'rgba(255,255,255,0.3)', margin: '3px auto' }} />
            <div style={{ height: 1.5, width: '50%', background: 'rgba(255,255,255,0.15)', margin: '3px auto' }} />
          </div>
          <div style={{ flex: 1, padding: 6 }}>
            <div style={{ height: 2, width: '70%', background: '#ddd', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1.5, width: '50%', background: '#eee', margin: '3px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '90%', background: '#f0f0f0', margin: '6px 0 2px', borderRadius: 1 }} />
            <div style={{ height: 1, width: '80%', background: '#f0f0f0', margin: '2px 0', borderRadius: 1 }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ height: '22%', background: t.colors[0], padding: '6px 8px' }}>
            <div style={{ height: 3, width: '50%', background: 'rgba(255,255,255,0.4)', borderRadius: 1, marginTop: 4 }} />
            <div style={{ height: 2, width: '35%', background: 'rgba(255,255,255,0.2)', borderRadius: 1, marginTop: 3 }} />
          </div>
          <div style={{ padding: '4px 8px' }}>
            <div style={{ height: 1.5, width: '30%', background: t.colors[0], opacity: 0.6, margin: '4px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '90%', background: '#e5e7eb', margin: '3px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '85%', background: '#e5e7eb', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '70%', background: '#e5e7eb', margin: '2px 0', borderRadius: 1 }} />
          </div>
        </>
      )}
      {isSelected && (
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: 14, height: 14, borderRadius: '50%',
          background: 'hsl(var(--primary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>✓</span>
        </div>
      )}
    </div>
  );
}

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? templates : templates.filter(t => t.category === activeCategory);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LayoutGrid className="h-4 w-4" />
          Templates ({templates.find(t => t.name === selectedTemplate)?.label || 'Classic'})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 flex-shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-all whitespace-nowrap',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="overflow-y-auto flex-1 pr-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 py-2">
            {filtered.map(t => (
              <button
                key={t.name}
                onClick={() => { setSelectedTemplate(t.name); setOpen(false); }}
                className="text-left group"
              >
                <TemplateThumbnail t={t} isSelected={selectedTemplate === t.name} />
                <p className={cn(
                  'text-[10px] font-medium mt-1 text-center truncate',
                  selectedTemplate === t.name ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {t.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
