import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface TemplateInfo {
  name: TemplateName;
  label: string;
  category: string;
  colors: [string, string];
  layout: 'full' | 'sidebar';
  isNew?: boolean;
}

const templates: TemplateInfo[] = [
  // Professional
  { name: 'classic', label: 'Classic', category: 'Professional', colors: ['#1b2a4a', '#f8f6f0'], layout: 'full' },
  { name: 'executive', label: 'Executive', category: 'Professional', colors: ['#1a1a1a', '#f9fafb'], layout: 'full' },
  { name: 'professional', label: 'Professional', category: 'Professional', colors: ['#1e40af', '#f8fafc'], layout: 'full' },
  { name: 'corporate', label: 'Corporate', category: 'Professional', colors: ['#1e3a5f', '#ffffff'], layout: 'sidebar' },
  { name: 'elegant', label: 'Elegant', category: 'Professional', colors: ['#6b1d3a', '#fdf6ee'], layout: 'full' },
  { name: 'luxe', label: 'Luxe', category: 'Professional', colors: ['#0a1628', '#c9a96e'], layout: 'full', isNew: true },
  // Modern
  { name: 'modern', label: 'Modern', category: 'Modern', colors: ['#1c1917', '#ffffff'], layout: 'full' },
  { name: 'gradient', label: 'Gradient', category: 'Modern', colors: ['#4f46e5', '#ffffff'], layout: 'full' },
  { name: 'tech', label: 'Tech', category: 'Modern', colors: ['#0d1117', '#ffffff'], layout: 'full' },
  { name: 'bold', label: 'Bold', category: 'Modern', colors: ['#000000', '#ffffff'], layout: 'full' },
  { name: 'timeline', label: 'Timeline', category: 'Modern', colors: ['#2563eb', '#ffffff'], layout: 'full' },
  { name: 'infographic', label: 'Infographic', category: 'Modern', colors: ['#0891b2', '#ffffff'], layout: 'full' },
  { name: 'swiss', label: 'Swiss', category: 'Modern', colors: ['#e11d48', '#ffffff'], layout: 'full', isNew: true },
  { name: 'metro', label: 'Metro', category: 'Modern', colors: ['#0078d4', '#f0f6ff'], layout: 'full', isNew: true },
  // Minimal
  { name: 'minimal', label: 'Minimal', category: 'Minimal', colors: ['#059669', '#ffffff'], layout: 'full' },
  { name: 'clean', label: 'Clean', category: 'Minimal', colors: ['#9ca3af', '#ffffff'], layout: 'full' },
  { name: 'monochrome', label: 'Monochrome', category: 'Minimal', colors: ['#000000', '#ffffff'], layout: 'full' },
  { name: 'starter', label: 'Starter', category: 'Minimal', colors: ['#16a34a', '#f0fdf4'], layout: 'full' },
  { name: 'nordic', label: 'Nordic', category: 'Minimal', colors: ['#5b8fa8', '#faf8f5'], layout: 'full', isNew: true },
  { name: 'editorial', label: 'Editorial', category: 'Minimal', colors: ['#7c2d12', '#fffbf5'], layout: 'full', isNew: true },
  // Creative
  { name: 'left-sidebar', label: 'Left Sidebar', category: 'Creative', colors: ['#0c1222', '#ffffff'], layout: 'sidebar' },
  { name: 'compact', label: 'Compact', category: 'Creative', colors: ['#6d28d9', '#ffffff'], layout: 'full' },
  { name: 'creative', label: 'Creative', category: 'Creative', colors: ['#134e4a', '#ffffff'], layout: 'sidebar' },
  { name: 'artistic', label: 'Artistic', category: 'Creative', colors: ['#c2410c', '#fff7ed'], layout: 'full' },
  { name: 'magazine', label: 'Magazine', category: 'Creative', colors: ['#b45309', '#faf5ef'], layout: 'full' },
  { name: 'designer', label: 'Designer', category: 'Creative', colors: ['#ec4899', '#fdf2f8'], layout: 'sidebar' },
  { name: 'academic', label: 'Academic', category: 'Creative', colors: ['#166534', '#fefce8'], layout: 'full' },
  { name: 'brutalist', label: 'Brutalist', category: 'Creative', colors: ['#ff6b35', '#fffef5'], layout: 'full', isNew: true },
  { name: 'architect', label: 'Architect', category: 'Creative', colors: ['#334155', '#fdfdfd'], layout: 'full', isNew: true },
  { name: 'pixel', label: 'Pixel', category: 'Creative', colors: ['#10b981', '#f0fdf4'], layout: 'full', isNew: true },
  // Dark
  { name: 'neon', label: 'Neon', category: 'Dark', colors: ['#22d3ee', '#0a0a0f'], layout: 'full', isNew: true },
  { name: 'glass', label: 'Glass', category: 'Dark', colors: ['#a78bfa', '#0f0a1f'], layout: 'full', isNew: true },
];

const categories = ['All', 'Professional', 'Modern', 'Minimal', 'Creative', 'Dark'];

function TemplateThumbnail({ t, isSelected }: { t: TemplateInfo; isSelected: boolean }) {
  const isDarkBg = ['#0a0a0f', '#0f0a1f', '#0a1628'].includes(t.colors[1]);
  return (
    <div style={{
      width: '100%', aspectRatio: '210 / 297',
      borderRadius: 8, overflow: 'hidden',
      border: isSelected ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
      background: t.colors[1],
      position: 'relative',
      boxShadow: isSelected ? '0 0 0 2px hsl(var(--primary) / 0.2)' : '0 1px 4px rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease',
    }}>
      {t.layout === 'sidebar' ? (
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '32%', background: t.colors[0] }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', margin: '14px auto 5px' }} />
            <div style={{ height: 2, width: '60%', background: 'rgba(255,255,255,0.3)', margin: '3px auto' }} />
            <div style={{ height: 1.5, width: '45%', background: 'rgba(255,255,255,0.15)', margin: '3px auto' }} />
            <div style={{ height: 1, width: '50%', background: 'rgba(255,255,255,0.1)', margin: '8px auto 2px' }} />
            <div style={{ height: 1, width: '40%', background: 'rgba(255,255,255,0.1)', margin: '2px auto' }} />
          </div>
          <div style={{ flex: 1, padding: 8 }}>
            <div style={{ height: 2.5, width: '70%', background: isDarkBg ? 'rgba(255,255,255,0.15)' : '#ddd', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1.5, width: '50%', background: isDarkBg ? 'rgba(255,255,255,0.1)' : '#eee', margin: '4px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '90%', background: isDarkBg ? 'rgba(255,255,255,0.06)' : '#f0f0f0', margin: '8px 0 2px', borderRadius: 1 }} />
            <div style={{ height: 1, width: '80%', background: isDarkBg ? 'rgba(255,255,255,0.06)' : '#f0f0f0', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '85%', background: isDarkBg ? 'rgba(255,255,255,0.04)' : '#f5f5f5', margin: '2px 0', borderRadius: 1 }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ height: '22%', background: t.colors[0], padding: '6px 8px' }}>
            <div style={{ height: 3.5, width: '50%', background: 'rgba(255,255,255,0.4)', borderRadius: 1, marginTop: 5 }} />
            <div style={{ height: 2, width: '35%', background: 'rgba(255,255,255,0.2)', borderRadius: 1, marginTop: 3 }} />
          </div>
          <div style={{ padding: '5px 8px' }}>
            <div style={{ height: 1.5, width: '30%', background: t.colors[0], opacity: 0.5, margin: '5px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '90%', background: isDarkBg ? 'rgba(255,255,255,0.1)' : '#e5e7eb', margin: '3px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '85%', background: isDarkBg ? 'rgba(255,255,255,0.08)' : '#e5e7eb', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '70%', background: isDarkBg ? 'rgba(255,255,255,0.06)' : '#e5e7eb', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1.5, width: '28%', background: t.colors[0], opacity: 0.4, margin: '6px 0 3px', borderRadius: 1 }} />
            <div style={{ height: 1, width: '88%', background: isDarkBg ? 'rgba(255,255,255,0.06)' : '#f0f0f0', margin: '2px 0', borderRadius: 1 }} />
            <div style={{ height: 1, width: '75%', background: isDarkBg ? 'rgba(255,255,255,0.04)' : '#f0f0f0', margin: '2px 0', borderRadius: 1 }} />
          </div>
        </>
      )}
      {isSelected && (
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: 20, height: 20, borderRadius: '50%',
          background: 'hsl(var(--primary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{'✓'}</span>
        </div>
      )}
      {t.isNew && (
        <div style={{
          position: 'absolute', top: 4, left: 4,
          background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          borderRadius: 6, padding: '1px 6px',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          <Sparkles style={{ width: 8, height: 8, color: '#fff' }} />
          <span style={{ color: '#fff', fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>New</span>
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
        <Button variant="outline" size="sm" className="gap-2 shrink-0 rounded-xl">
          <LayoutGrid className="h-4 w-4" />
          <span>Templates</span>
          <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">
            ({templates.find(t => t.name === selectedTemplate)?.label || 'Classic'})
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-hidden flex flex-col w-[95vw] sm:w-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg flex items-center gap-2">
            Choose a Template
            <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{templates.length} templates</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 overflow-x-auto pb-2 flex-shrink-0 scrollbar-thin">
          {categories.map(cat => {
            const count = cat === 'All' ? templates.length : templates.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="overflow-y-auto flex-1 pr-1 -mr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 py-2">
            {filtered.map(t => (
              <button
                key={t.name}
                onClick={() => { setSelectedTemplate(t.name); setOpen(false); }}
                className="text-left group"
              >
                <TemplateThumbnail t={t} isSelected={selectedTemplate === t.name} />
                <p className={cn(
                  'text-[10px] sm:text-xs font-medium mt-1.5 text-center truncate px-1',
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
