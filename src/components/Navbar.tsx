/**
 * Navbar — top bar with logo and navigation links.
 */
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const scrollToAts = () => {
    document.getElementById('ats-info')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Lade Stack Resume
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={scrollToAts}>
            Why ATS-friendly?
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:feedback@ladestack.com">Feedback</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
