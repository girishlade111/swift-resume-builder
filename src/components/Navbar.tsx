import { useState, useEffect } from 'react';
import { 
  FileText, Menu, X, Moon, Sun, ChevronDown, Sparkles, 
  LayoutDashboard, FilePlus, Download, Settings, Zap,
  Rocket, ArrowRight, CheckCircle2, LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Templates', href: '/#templates', icon: LayoutGrid },
  { label: 'Guide', href: '/resume-guide', icon: FileText },
  { label: 'Pricing', href: '/#pricing', icon: Zap },
];

const quickActions = [
  { label: 'New Resume', icon: FilePlus, primary: true },
  { label: 'Import', icon: Download, primary: false },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`
        no-print sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled 
          ? 'bg-background/90 backdrop-blur-xl border-b shadow-sm' 
          : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-105">
                <FileText className="h-5 w-5" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-400 animate-pulse" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight leading-none bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Swift Resume
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                Studio v2.0
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-border/60">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {/* Auto-save Status */}
          <div className="hidden md:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30">
            <div className="relative flex h-2 w-2">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping" />
              <div className="relative h-2 w-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              Auto-saved
            </span>
          </div>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant={action.primary ? 'default' : 'ghost'}
                size="sm"
                className={`
                  h-9 rounded-lg text-sm font-semibold px-4
                  ${action.primary 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-600/20' 
                    : 'hover:bg-muted'
                  }
                `}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(d => !d)}
            className="h-9 w-9 rounded-lg hover:bg-muted/80"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Upgrade CTA */}
          <Button 
            variant="default" 
            size="sm" 
            className="hidden lg:flex h-9 rounded-lg text-sm font-bold px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md shadow-amber-500/20"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Upgrade Pro
            <ArrowRight className="h-3 w-3 ml-2" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-xl animate-slide-down">
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border/50">
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="default" size="sm" className="h-11 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600">
                  <FilePlus className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
                <Button variant="outline" size="sm" className="h-11 rounded-xl font-semibold">
                  <Download className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
