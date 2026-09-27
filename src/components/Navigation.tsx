import { useState, useEffect } from 'react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'System', id: 'layers' },
    { label: 'Journey', id: 'journey' },
    { label: 'Impact', id: 'impact' },
    { label: 'Work', id: 'flagship' },
    { label: 'Ecosystem', id: 'ecosystem' },
    { label: 'Security', id: 'security' },
    { label: 'Automation', id: 'automation' },
    { label: 'About', id: 'about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="nav-pill lg flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          data-cursor="magnetic"
          className="text-base sm:text-lg font-display font-bold tracking-tight text-[#F5F5F2] hover:text-[#6EA8FF] transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span>VIJAYA KUMAR L</span>
          
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-1 text-[14px] font-display font-medium tracking-tight text-[#A1A1AA]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-cursor="magnetic"
              className={`hover:text-white hover:bg-white/5 transition-colors relative px-3.5 py-2 rounded-full ${
                activeSection === item.id ? 'text-white' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2F7BFF] rounded-full shadow-[0_0_8px_#2F7BFF]" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: CTA action and mobile hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            data-cursor="magnetic"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#F5F5F2] text-[14px] font-display font-semibold tracking-tight transition-all duration-200 shadow-sm"
          >
            <span>Let’s talk</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white border border-white/10"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07080B]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-1 font-display text-2xl font-semibold tracking-tight text-[#A1A1AA]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-white ${
                  activeSection === item.id ? 'text-[#2F7BFF] font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3.5 rounded-full bg-white text-black text-base font-display font-semibold"
          >
            Let’s talk →
          </button>
        </div>
      )}
    </header>
  );
}
