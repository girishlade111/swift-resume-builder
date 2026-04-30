import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutGrid, Sparkles, Search, Star, Shield, 
  Briefcase, Palette, Code, GraduationCap, Zap, Crown,
  ArrowRight, CheckCircle, TrendingUp, Monitor, PenTool, Layers
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface TemplateInfo {
  name: TemplateName;
  label: string;
  category: string;
  subcategory: string;
  colors: [string, string];
  layout: 'full' | 'sidebar' | 'split';
  isNew?: boolean;
  isPopular?: boolean;
  atsFriendly: boolean;
  description: string;
  bestFor: string[];
}

const templates: TemplateInfo[] = [
  // Corporate / Professional
  { name: 'classic', label: 'Classic', category: 'Corporate', subcategory: 'Traditional', colors: ['#1b2a4a', '#f8f6f0'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Time-honored format that emphasizes experience and credentials', bestFor: ['Finance', 'Legal', 'Management'] },
  { name: 'executive', label: 'Executive', category: 'Corporate', subcategory: 'Premium', colors: ['#1a1a1a', '#f9fafb'], layout: 'full', isNew: true, atsFriendly: true, description: 'Sophisticated layout with refined typography for senior roles', bestFor: ['C-Suite', 'Directors', 'Executives'] },
  { name: 'executive-prime', label: 'Executive Prime', category: 'Corporate', subcategory: 'Premium', colors: ['#1a1a1a', '#fafaf9'], layout: 'full', isNew: true, atsFriendly: true, description: 'Ultra-premium gold accents for C-suite executives', bestFor: ['CEO', 'Board', 'Leadership'] },
  { name: 'professional', label: 'Professional', category: 'Corporate', subcategory: 'Business', colors: ['#1e40af', '#f8fafc'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Clean business aesthetic with strong visual hierarchy', bestFor: ['Consulting', 'Finance', 'Marketing'] },
  { name: 'capital', label: 'Capital', category: 'Corporate', subcategory: 'Finance', colors: ['#0f172a', '#ffffff'], layout: 'full', isNew: true, atsFriendly: true, description: 'Investment banking and finance template', bestFor: ['Finance', 'Banking', 'Consulting'] },
  { name: 'corporate', label: 'Corporate', category: 'Corporate', subcategory: 'Traditional', colors: ['#1e3a5f', '#ffffff'], layout: 'sidebar', atsFriendly: true, description: 'Structured two-column with proven effectiveness', bestFor: ['Banking', 'Legal', 'HR'] },
  { name: 'elegant', label: 'Elegant', category: 'Corporate', subcategory: 'Premium', colors: ['#6b1d3a', '#fdf6ee'], layout: 'full', atsFriendly: true, description: 'Refined serif typography with classic appeal', bestFor: ['Law', 'Academia', 'Creative'] },
  { name: 'ivy-league', label: 'Ivy League', category: 'Corporate', subcategory: 'Academic', colors: ['#1e3a5f', '#fdfbf7'], layout: 'full', isNew: true, atsFriendly: true, description: 'Traditional academic styling for professionals', bestFor: ['Academia', 'Research', 'Legal'] },
  { name: 'luxe', label: 'Luxe', category: 'Corporate', subcategory: 'Premium', colors: ['#0a1628', '#c9a96e'], layout: 'full', isNew: true, atsFriendly: false, description: 'Premium gold accents for high-impact presentation', bestFor: ['Executives', 'Board', 'Premium'] },
  
  // Modern / Tech
  { name: 'modern', label: 'Modern', category: 'Modern', subcategory: 'Clean', colors: ['#1c1917', '#ffffff'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Contemporary design with bold accent elements', bestFor: ['Tech', 'Startup', 'Digital'] },
  { name: 'horizon', label: 'Horizon', category: 'Modern', subcategory: 'Growth', colors: ['#09090b', '#ffffff'], layout: 'full', isNew: true, atsFriendly: true, description: 'Dynamic growth-focused template for startups', bestFor: ['Startup', 'Sales', 'Growth'] },
  { name: 'gradient', label: 'Gradient', category: 'Modern', subcategory: 'Creative', colors: ['#4f46e5', '#ffffff'], layout: 'full', isNew: true, atsFriendly: true, description: 'Vibrant gradient accents for creative roles', bestFor: ['Design', 'Marketing', 'Media'] },
  { name: 'tech', label: 'Tech Pro', category: 'Modern', subcategory: 'Developer', colors: ['#0d1117', '#ffffff'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Built for developers with GitHub/portfolio integration', bestFor: ['Engineer', 'Developer', 'DevOps'] },
  { name: 'bold', label: 'Bold', category: 'Modern', subcategory: 'Impact', colors: ['#000000', '#ffffff'], layout: 'full', atsFriendly: true, description: 'High-contrast design that commands attention', bestFor: ['Sales', 'Startup', 'Leadership'] },
  { name: 'timeline', label: 'Timeline', category: 'Modern', subcategory: 'Progression', colors: ['#2563eb', '#ffffff'], layout: 'full', atsFriendly: true, description: 'Visual timeline showing career progression', bestFor: ['Growth', 'Career Change', 'Sales'] },
  { name: 'infographic', label: 'Infographic', category: 'Modern', subcategory: 'Visual', colors: ['#0891b2', '#ffffff'], layout: 'full', atsFriendly: false, description: 'Visual-rich format for showcasing achievements', bestFor: ['Marketing', 'Design', 'Operations'] },
  { name: 'swiss', label: 'Swiss', category: 'Modern', subcategory: 'Minimal', colors: ['#e11d48', '#ffffff'], layout: 'full', isNew: true, atsFriendly: true, description: 'International typographic style', bestFor: ['Design', 'Architecture', 'Creative'] },
  { name: 'metro', label: 'Metro', category: 'Modern', subcategory: 'Urban', colors: ['#0078d4', '#f0f6ff'], layout: 'full', isNew: true, atsFriendly: true, description: 'Metro system-inspired grid layout', bestFor: ['Tech', 'Urban', 'Consulting'] },
  
  // Minimal / Clean
  { name: 'minimal', label: 'Minimal', category: 'Minimal', subcategory: 'Essential', colors: ['#059669', '#ffffff'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Ultra-clean with maximum whitespace', bestFor: ['Design', 'UX', 'Content'] },
  { name: 'clean', label: 'CleanPro', category: 'Minimal', subcategory: 'Essential', colors: ['#9ca3af', '#ffffff'], layout: 'full', atsFriendly: true, description: 'Distraction-free with focus on content', bestFor: ['All Industries', 'Entry Level', 'Career Change'] },
  { name: 'monochrome', label: 'Monochrome', category: 'Minimal', subcategory: 'Mono', colors: ['#000000', '#ffffff'], layout: 'full', atsFriendly: true, description: 'Black and white for maximum versatility', bestFor: ['Legal', 'Finance', 'Government'] },
  { name: 'starter', label: 'Starter', category: 'Minimal', subcategory: 'Simple', colors: ['#16a34a', '#f0fdf4'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Simple template perfect for first resumes', bestFor: ['Students', 'Graduates', 'Entry Level'] },
  { name: 'nordic', label: 'Nordic', category: 'Minimal', subcategory: 'Scandinavian', colors: ['#5b8fa8', '#faf8f5'], layout: 'full', isNew: true, atsFriendly: true, description: 'Nordic minimalism with warm tones', bestFor: ['Design', 'Europe', 'Startup'] },
  { name: 'editorial', label: 'Editorial', category: 'Minimal', subcategory: 'Publisher', colors: ['#7c2d12', '#fffbf5'], layout: 'full', isNew: true, atsFriendly: true, description: 'Editorial design with strong typography', bestFor: ['Writing', 'Publishing', 'Content'] },
  
  // Creative
  { name: 'left-sidebar', label: 'Sidebar', category: 'Creative', subcategory: 'Two-Column', colors: ['#0c1222', '#ffffff'], layout: 'sidebar', isPopular: true, atsFriendly: true, description: 'Classic two-column with sidebar', bestFor: ['Tech', 'Creative', 'Marketing'] },
  { name: 'compact', label: 'Compact', category: 'Creative', subcategory: 'Space-Saving', colors: ['#6d28d9', '#ffffff'], layout: 'full', atsFriendly: true, description: 'Dense single-page for maximum content', bestFor: ['Career Change', 'Experienced', 'Military'] },
  { name: 'creative', label: 'Creative', category: 'Creative', subcategory: 'Expressive', colors: ['#134e4a', '#ffffff'], layout: 'sidebar', isPopular: true, atsFriendly: true, description: 'Vibrant design for creative industries', bestFor: ['Design', 'Art', 'Media'] },
  { name: 'artistic', label: 'Artistic', category: 'Creative', subcategory: 'Expressive', colors: ['#c2410c', '#fff7ed'], layout: 'full', isNew: true, atsFriendly: false, description: 'Artistic flair for creative roles', bestFor: ['Artist', 'Designer', 'Creative'] },
  { name: 'magazine', label: 'Magazine', category: 'Creative', subcategory: 'Editorial', colors: ['#b45309', '#faf5ef'], layout: 'full', isNew: true, atsFriendly: false, description: 'Editorial magazine style layout', bestFor: ['Editor', 'Writer', 'Media'] },
  { name: 'designer', label: 'Designer', category: 'Creative', subcategory: 'Portfolio', colors: ['#ec4899', '#fdf2f8'], layout: 'sidebar', isNew: true, atsFriendly: true, description: 'Portfolio-focused with visual emphasis', bestFor: ['Designer', 'Artist', 'UX'] },
  { name: 'academic', label: 'Academic', category: 'Creative', subcategory: 'Scholarly', colors: ['#166534', '#fefce8'], layout: 'full', isPopular: true, atsFriendly: true, description: 'Research and publication focused', bestFor: ['PhD', 'Research', 'Education'] },
  
  // Specialty
  { name: 'brutalist', label: 'Brutalist', category: 'Specialty', subcategory: 'Bold', colors: ['#ff6b35', '#fffef5'], layout: 'full', isNew: true, atsFriendly: false, description: 'Raw, bold aesthetic', bestFor: ['Design', 'Architecture', 'Creative'] },
  { name: 'architect', label: 'Architect', category: 'Specialty', subcategory: 'Structure', colors: ['#334155', '#fdfdfd'], layout: 'full', isNew: true, atsFriendly: true, description: 'Structured architectural layout', bestFor: ['Architect', 'Engineer', 'Construction'] },
  { name: 'pixel', label: 'Pixel', category: 'Specialty', subcategory: 'Retro', colors: ['#10b981', '#f0fdf4'], layout: 'full', isNew: true, atsFriendly: true, description: 'Retro pixel-inspired design', bestFor: ['Game Dev', 'Tech', 'Developer'] },
  
  // Dark / Specialty
  { name: 'neon', label: 'Neon', category: 'Dark', subcategory: 'Glow', colors: ['#22d3ee', '#0a0a0f'], layout: 'full', isNew: true, atsFriendly: false, description: 'Neon glow for standout impact', bestFor: ['Tech', 'Gaming', 'Startup'] },
  { name: 'glass', label: 'Glass', category: 'Dark', subcategory: 'Modern', colors: ['#a78bfa', '#0f0a1f'], layout: 'full', isNew: true, atsFriendly: false, description: 'Glassmorphism with modern depth', bestFor: ['Tech', 'Design', 'Creative'] },
];

const categories = [
  { id: 'All', label: 'All Templates', icon: LayoutGrid, count: templates.length },
  { id: 'Corporate', label: 'Corporate', icon: Briefcase, count: templates.filter(t => t.category === 'Corporate').length },
  { id: 'Modern', label: 'Modern', icon: Zap, count: templates.filter(t => t.category === 'Modern').length },
  { id: 'Minimal', label: 'Minimal', icon: Monitor, count: templates.filter(t => t.category === 'Minimal').length },
  { id: 'Creative', label: 'Creative', icon: Palette, count: templates.filter(t => t.category === 'Creative').length },
  { id: 'Specialty', label: 'Specialty', icon: Star, count: templates.filter(t => t.category === 'Specialty' || t.category === 'Dark').length },
];

function TemplateCard({ t, isSelected, onSelect }: { t: TemplateInfo; isSelected: boolean; onSelect: () => void }) {
  const isDarkTemplate = ['#0a0a0f', '#0f0a1f', '#0a1628'].includes(t.colors[1]);
  
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full text-left transition-all duration-300",
        "hover:transform hover:-translate-y-2"
      )}
    >
      <div 
        className={cn(
          "relative aspect-[210/297] rounded-2xl overflow-hidden transition-all duration-300",
          "border-2 shadow-sm hover:shadow-2xl",
          isSelected 
            ? "border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/10" 
            : "border-transparent hover:border-border"
        )}
        style={{ background: t.colors[1] }}
      >
        {/* Template Preview */}
        {t.layout === 'sidebar' && (
          <div className="flex h-full">
            <div style={{ width: '35%', background: t.colors[0] }} className="opacity-75">
              <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-4 mb-2" />
              <div className="h-1 w-3/4 bg-white/20 mx-auto my-1 rounded-full" />
              <div className="h-1 w-1/2 bg-white/10 mx-auto my-1 rounded-full" />
              <div className="h-1 w-3/5 bg-white/10 mx-auto my-1 rounded-full" />
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-2 w-3/4 bg-black/10 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-5/6 bg-black/5 rounded-full" />
            </div>
          </div>
        )}

        {t.layout === 'split' && (
          <div className="flex h-full">
            <div style={{ width: '45%', background: t.colors[0] }} className="opacity-80">
              <div className="h-2 w-8 bg-white/20 mx-auto mt-4 rounded-full" />
              <div className="h-1 w-12 bg-white/10 mx-auto mt-3 rounded-full" />
            </div>
            <div className="flex-1 p-2 space-y-1.5">
              <div className="h-1.5 w-16 bg-black/10 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-14 bg-black/5 rounded-full" />
            </div>
          </div>
        )}

        {t.layout === 'full' && (
          <div className="flex flex-col h-full">
            <div style={{ height: '28%', background: t.colors[0] }} className="p-3 opacity-80">
              <div className="h-2.5 w-20 bg-white/30 rounded-full mb-2" />
              <div className="h-1.5 w-12 bg-white/20 rounded-full" />
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-1.5 w-10 bg-black/10 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-full bg-black/5 rounded-full" />
              <div className="h-1 w-5/6 bg-black/5 rounded-full" />
            </div>
          </div>
        )}

        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/15 flex items-center justify-center backdrop-blur-[1px]">
            <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center shadow-lg transform scale-110">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {t.isNew && (
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-sm">
              <span className="text-[9px] font-black text-white uppercase tracking-wider">New</span>
            </span>
          )}
          {t.isPopular && (
            <span className="bg-amber-500/90 px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-sm">
              <span className="text-[9px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" /> Popular
              </span>
            </span>
          )}
        </div>

        {/* ATS Badge */}
        {t.atsFriendly && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-emerald-500/90 px-2 py-1 rounded-md shadow-lg backdrop-blur-sm">
              <span className="text-[8px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <Shield className="h-3 w-3" /> ATS
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="mt-4 px-2">
        <div className="flex items-center justify-between">
          <p className={cn(
            'text-sm font-bold tracking-tight',
            isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
          )}>
            {t.label}
          </p>
          <ArrowRight className={cn(
            "h-4 w-4 transition-transform",
            isSelected ? "text-primary" : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          )} />
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{t.subcategory}</p>
      </div>
    </button>
  );
}

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = activeCategory === 'All' 
      ? templates 
      : templates.filter(t => t.category === activeCategory || (activeCategory === 'Specialty' && (t.category === 'Specialty' || t.category === 'Dark')));
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.label.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.bestFor.some(b => b.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  const currentTemplate = templates.find(t => t.name === selectedTemplate);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 shrink-0 rounded-xl border-2 font-semibold h-10 px-4 hover:bg-muted/50 transition-all bg-gradient-to-r from-background to-muted/20"
        >
          <div className="relative">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-pulse" />
          </div>
          <span>Browse Templates</span>
          <div className="h-5 w-px bg-border mx-1" />
          <span className="text-xs font-bold text-muted-foreground">
            {currentTemplate?.label || 'Classic'}
          </span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[98vw] xl:max-w-7xl max-h-[95vh] overflow-hidden flex flex-col rounded-3xl border-none shadow-2xl bg-background">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-muted/20 to-transparent">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display font-bold tracking-tight flex items-center gap-4">
              Template Gallery
              <Badge variant="secondary" className="text-sm font-bold px-4 py-1.5 rounded-full">
                {templates.length} Premium Designs
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search templates, styles, or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-background border-2 text-base"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-8 px-8">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap rounded-xl border-2',
                    activeCategory === cat.id
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-background border-transparent text-muted-foreground hover:border-muted-foreground/20 hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                  <span className="text-xs opacity-60 ml-1 font-medium">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Grid */}
        <div className="overflow-y-auto flex-1 px-8 py-6 bg-muted/5 custom-scrollbar">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filtered.map((t, idx) => (
                <div 
                  key={t.name} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <TemplateCard 
                    t={t} 
                    isSelected={selectedTemplate === t.name}
                    onSelect={() => { setSelectedTemplate(t.name); setOpen(false); }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No templates found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                className="mt-4 rounded-xl"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 border-t bg-muted/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> templates available
            </p>
            {currentTemplate && (
              <span className="text-xs text-muted-foreground/50">•</span>
            )}
            {currentTemplate && (
              <p className="text-sm text-muted-foreground">
                Currently: <span className="font-semibold text-primary">{currentTemplate.label}</span>
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="rounded-xl font-semibold">
            Close Gallery
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
