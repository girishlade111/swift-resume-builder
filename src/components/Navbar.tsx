/**
 * Navbar — mobile-first responsive top bar with logo and navigation links.
 */
import { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
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

  const scrollToAts = () => {
    setMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      document.getElementById('ats-info')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#ats-info';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl whitespace-nowrap">
          <FileText className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">Lade Stack</span>
          <span className="sm:hidden">Lade Stack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={scrollToAts}>
            Why ATS-friendly?
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:support@ladestack.in">Feedback</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={scrollToAts}
                className="w-full justify-start"
              >
                Why ATS-friendly?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="w-full justify-start"
              >
                <a href="mailto:support@ladestack.in">Feedback</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
