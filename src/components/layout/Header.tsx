import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X, Shield, PhoneCall, Sparkles } from 'lucide-react';

export function Header() {
  const { path, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Stay', href: '/stay' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Dining', href: '/dining' },
    { label: 'Weddings & Events', href: '/weddings-events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  const isCurrent = (href: string) => {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full border-b ${
        isScrolled
          ? 'bg-[#FBF9F4]/95 dark:bg-[#0B120F]/95 backdrop-blur-md shadow-xs border-[#E6DDCF]/80 dark:border-[#25362E]/80 py-2.5 sm:py-3'
          : 'bg-[#FBF9F4] dark:bg-[#0B120F] border-[#E6DDCF]/50 dark:border-[#25362E]/50 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 min-w-0">
          {/* Zone 1: Brand Wordmark (Aligned Left) */}
          <Link
            href="/"
            className="group flex items-center min-w-0 shrink text-decoration-none"
          >
            <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-wide font-semibold text-[#17382B] dark:text-[#F4EFE8] group-hover:text-[#B88E52] dark:group-hover:text-[#C59F67] transition-colors truncate">
              Rajmahal Resort
            </span>
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isCurrent(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors relative py-1 text-[13.5px] ${
                    active
                      ? 'text-[#17382B] dark:text-[#C59F67] font-semibold'
                      : 'text-[#4E5B54] dark:text-[#A7B5AD] hover:text-[#17382B] dark:hover:text-[#F4EFE8]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B88E52] dark:bg-[#C59F67] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Toggle, Book Button, Hamburger Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Current theme: ${theme}. Click to switch.`}
              className="p-1.5 sm:p-2 rounded-lg text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8] hover:bg-[#F0EAE0] dark:hover:bg-[#1A2821] transition-colors shrink-0"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#C59F67]" />}
            </button>

            {/* Admin shortcut on tablet/desktop */}
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="hidden sm:flex items-center p-2 rounded-lg text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8] hover:bg-[#F0EAE0] dark:hover:bg-[#1A2821] transition-colors shrink-0"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Primary Booking CTA */}
            <button
              onClick={() => navigate('/booking')}
              className="px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2.5 rounded-md text-[11px] sm:text-xs lg:text-sm font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 bg-[#17382B] text-[#FAF7F2] hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] shadow-xs hover:shadow shrink-0"
            >
              <span className="inline sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Your Stay</span>
            </button>

            {/* Hamburger Menu Button at the FAR RIGHT */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="lg:hidden p-1.5 sm:p-2 text-[#17382B] dark:text-[#F4EFE8] hover:bg-[#F0EAE0] dark:hover:bg-[#1A2821] rounded-lg transition-colors shrink-0 ml-0.5"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer (Slide-in from right) */}
      <div
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[340px] bg-[#FBF9F4] dark:bg-[#0E1612] text-[#18201C] dark:text-[#F4EFE8] border-l border-[#E6DDCF] dark:border-[#25362E] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6DDCF] dark:border-[#25362E] flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8] block">
              Rajmahal Resort
            </span>
            <span className="text-[11px] text-[#A8B6AE] tracking-wide block">
              Nagaon, Assam · NH-37
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-[#5E6963] dark:text-[#95A39B] hover:text-[#18201C] dark:hover:text-[#F4EFE8] hover:bg-[#F0EAE0] dark:hover:bg-[#1A2821] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleMobileNav(link.href)}
              className={`w-full text-left py-3 px-3.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                isCurrent(link.href)
                  ? 'bg-[#EFE8DD] dark:bg-[#182820] text-[#17382B] dark:text-[#C59F67] font-semibold'
                  : 'text-[#4E5B54] dark:text-[#A7B5AD] hover:bg-[#F4EFE6] dark:hover:bg-[#131F19]'
              }`}
            >
              <span>{link.label}</span>
              {isCurrent(link.href) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E52] dark:bg-[#C59F67]" />
              )}
            </button>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E6DDCF] dark:border-[#25362E] bg-[#F4EFE6]/60 dark:bg-[#121C17]/60 space-y-3">
          <button
            onClick={() => handleMobileNav('/booking')}
            className="w-full py-3 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#17382B] text-[#FAF7F2] dark:bg-[#C59F67] dark:text-[#0D1612] text-center shadow-xs"
          >
            Book Your Stay
          </button>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs text-[#5E6963] dark:text-[#95A39B] py-1.5 px-2 rounded hover:bg-[#EFE8DD] dark:hover:bg-[#182820] transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-[#B88E52]" />
                  <span>Switch to Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#C59F67]" />
                  <span>Switch to Light</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleMobileNav('/admin/login')}
              className="flex items-center gap-1.5 text-xs text-[#5E6963] dark:text-[#95A39B] py-1.5 px-2 rounded hover:bg-[#EFE8DD] dark:hover:bg-[#182820] transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#B88E52]" />
              <span>Admin Portal</span>
            </button>
          </div>

          <a
            href="tel:+919678275255"
            className="flex items-center justify-center gap-2 text-xs text-[#5E6963] dark:text-[#95A39B] py-1 hover:text-[#17382B] dark:hover:text-[#F4EFE8]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#B88E52]" />
            <span>Concierge: +91 96782 75255</span>
          </a>
        </div>
      </div>
    </header>
  );
}
