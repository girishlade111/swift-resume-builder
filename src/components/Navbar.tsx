import { useState, useEffect } from 'react';
import { FileText, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Resume Builder', href: '/' },
  { label: 'Resume Guide', href: '/resume-guide' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">Swift Resume</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-1">Studio v2.0</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 border-l pl-8 h-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 mr-4 text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Auto-save Active
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(d => !d)}
            className="h-8 w-8 rounded-lg hover:bg-muted/80"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>

          <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold px-4 hidden md:flex">
             Share Studio
          </Button>
          
          <Button variant="default" size="sm" className="h-8 rounded-lg text-xs font-bold px-4 shadow-md shadow-primary/10">
             Upgrade Pro
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background animate-slide-up shadow-2xl">
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
