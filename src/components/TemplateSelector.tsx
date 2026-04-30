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
    <div className={cn(
      "w-full aspect-[210/297] rounded-xl overflow-hidden relative transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1",
      isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl" : "border bg-card shadow-sm"
    )} style={{ background: t.colors[1] }}>
      {t.layout === 'sidebar' ? (
        <div className="flex h-full">
          <div style={{ width: '32%', background: t.colors[0] }} className="opacity-80">
            <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-4 mb-2" />
            <div className="h-1 w-3/4 bg-white/20 mx-auto my-1 rounded-full" />
            <div className="h-1 w-1/2 bg-white/10 mx-auto my-1 rounded-full" />
          </div>
          <div className="flex-1 p-2 space-y-2">
            <div className="h-1.5 w-3/4 bg-muted/40 rounded-full" />
            <div className="h-1 w-full bg-muted/20 rounded-full" />
            <div className="h-1 w-full bg-muted/20 rounded-full" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div style={{ height: '25%', background: t.colors[0] }} className="p-3 opacity-80">
             <div className="h-2 w-3/4 bg-white/30 rounded-full mb-2" />
             <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
          </div>
          <div className="flex-1 p-3 space-y-3">
             <div className="h-1.5 w-1/3 bg-muted/40 rounded-full" />
             <div className="h-1 w-full bg-muted/20 rounded-full" />
             <div className="h-1 w-full bg-muted/20 rounded-full" />
             <div className="h-1 w-5/6 bg-muted/20 rounded-full" />
          </div>
        </div>
      )}
      {isSelected && (
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center shadow-lg transform scale-110">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      )}
      {t.isNew && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-0.5 rounded-md shadow-lg">
          <span className="text-[8px] font-black text-white uppercase tracking-tighter">Premium</span>
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
        <Button variant="outline" size="sm" className="gap-2 shrink-0 rounded-lg border-2 font-bold h-9 hover:bg-muted/50 transition-all">
          <LayoutGrid className="h-4 w-4 text-primary" />
          <span>Gallery</span>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline">
            {templates.find(t => t.name === selectedTemplate)?.label || 'Classic'}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl border-none shadow-2xl p-0">
        <div className="p-8 border-b bg-muted/5">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
              Explore Templates
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">{templates.length} Designs</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map(cat => {
              const count = cat === 'All' ? templates.length : templates.filter(t => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'rounded-xl px-5 py-2 text-xs font-bold transition-all whitespace-nowrap border-2',
                    activeCategory === cat
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-background border-transparent text-muted-foreground hover:border-muted-foreground/20 hover:text-foreground'
                  )}
                >
                  {cat} <span className="opacity-40 ml-1">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-8 bg-background custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filtered.map(t => (
              <button
                key={t.name}
                onClick={() => { setSelectedTemplate(t.name); setOpen(false); }}
                className="text-left group flex flex-col gap-3"
              >
                <TemplateThumbnail t={t} isSelected={selectedTemplate === t.name} />
                <div className="px-1">
                   <p className={cn(
                    'text-[11px] font-bold uppercase tracking-widest truncate',
                    selectedTemplate === t.name ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}>
                    {t.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground/50 font-medium uppercase mt-0.5">{t.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t bg-muted/5 flex items-center justify-between">
           <p className="text-xs text-muted-foreground font-medium italic">Click a template to apply it to your current data instantly.</p>
           <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="rounded-lg font-bold">Close Gallery</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
