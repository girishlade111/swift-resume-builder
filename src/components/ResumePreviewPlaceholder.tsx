import { FileText, Sparkles, Layout, Type, Palette, MousePointer2 } from 'lucide-react';

export default function ResumePreviewPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] text-center p-12 bg-white rounded-sm shadow-2xl animate-fade-in border border-border/50">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative w-24 h-32 bg-card border-2 border-primary/20 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-8 bg-muted/50 border-b border-primary/10" />
           <FileText className="h-10 w-10 text-primary/40" />
           <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-muted/30 rounded-full" />
           <div className="absolute bottom-8 left-4 right-8 h-1.5 bg-muted/30 rounded-full" />
           <div className="absolute bottom-12 left-4 right-6 h-1.5 bg-muted/30 rounded-full" />
        </div>
        <div className="absolute -top-4 -right-4 bg-background border shadow-xl p-2 rounded-lg animate-bounce">
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
      </div>
      
      <h3 className="text-3xl font-bold tracking-tight mb-4">Resume Studio</h3>
      <p className="text-muted-foreground max-w-sm mb-12 text-base leading-relaxed">
        Your professional document will appear here in real-time. Start by choosing a template or filling in your details.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-md w-full">
        <div className="p-5 rounded-2xl border bg-muted/5 flex flex-col items-center gap-3 transition-all hover:bg-muted/10 hover:scale-105">
           <Layout className="h-6 w-6 text-primary" />
           <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Grid Layouts</span>
        </div>
        <div className="p-5 rounded-2xl border bg-muted/5 flex flex-col items-center gap-3 transition-all hover:bg-muted/10 hover:scale-105">
           <Type className="h-6 w-6 text-primary" />
           <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Typography</span>
        </div>
        <div className="p-5 rounded-2xl border bg-muted/5 flex flex-col items-center gap-3 transition-all hover:bg-muted/10 hover:scale-105">
           <Palette className="h-6 w-6 text-primary" />
           <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Custom Themes</span>
        </div>
        <div className="p-5 rounded-2xl border bg-muted/5 flex flex-col items-center gap-3 transition-all hover:bg-muted/10 hover:scale-105">
           <MousePointer2 className="h-6 w-6 text-primary" />
           <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Drag & Drop</span>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-3 text-sm font-semibold text-muted-foreground/40 tracking-widest uppercase">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        Studio Ready
      </div>
    </div>
  );
}
