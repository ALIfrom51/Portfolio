import { useEffect, useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      footerRef.current.style.opacity = '0';
      footerRef.current.style.transform = 'translateY(20px)';
      footerRef.current.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-[1] border-t"
      style={{
        background: '#050508',
        borderColor: 'rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-[60px]">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span
              className="text-base font-medium text-[#f0f0f5]"
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}
            >
              AR
            </span>
            <span className="text-base font-medium text-[#f0f0f5]">
              Ali Rebbouh
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300"
              style={{ color: 'rgba(240,240,245,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f0f0f5';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(240,240,245,0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/ali-rebbouh-0b0b79221/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300"
              style={{ color: 'rgba(240,240,245,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f0f0f5';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(240,240,245,0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-[13px]"
            style={{ color: 'rgba(240,240,245,0.35)' }}
          >
            2026 Ali Rebbouh. All rights reserved.
          </p>
          <p
            className="text-[13px]"
            style={{ color: 'rgba(240,240,245,0.35)' }}
          >

          </p>
        </div>
      </div>
    </footer>
  );
}
