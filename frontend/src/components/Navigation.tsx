import React, { useState, useEffect } from 'react';
import { ScanFace } from 'lucide-react';

const navItems = [
  { label: 'Live Entry', href: '#live-entry' },
  { label: 'Member Management', href: '#member-management' },
  { label: 'Entry Logs', href: '#entry-logs' },
  { label: 'Security & System Status', href: '#system-status' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-premium border-b border-border'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
              <ScanFace className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-foreground tracking-wide">
                PremiumLounge
              </span>
              <span className="text-gold font-display text-lg font-light"> AI</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-gold-light'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu indicator */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Menu
            </span>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden border-t border-border pb-3 pt-2 flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'text-gold bg-gold-light'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
