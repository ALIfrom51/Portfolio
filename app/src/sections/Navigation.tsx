import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,10,15,0.8)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.04)]'
          : 'bg-[rgba(10,10,15,0.3)] backdrop-blur-[8px]'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-mono text-lg font-semibold tracking-[0.1em] text-[#f0f0f5] hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          AR
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium tracking-[0.02em] text-[rgba(240,240,245,0.7)] hover:text-[#f0f0f5] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('#contact')}
          className="hidden md:block text-xs font-medium tracking-[0.03em] uppercase text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
          }}
        >
          Get In Touch
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#f0f0f5] p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-[rgba(10,10,15,0.95)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)] py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-left text-base font-medium text-[rgba(240,240,245,0.7)] hover:text-[#f0f0f5] transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-2 text-xs font-medium tracking-[0.03em] uppercase text-white px-6 py-3 rounded-lg w-full"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
            }}
          >
            Get In Touch
          </button>
        </div>
      )}
    </nav>
  );
}
