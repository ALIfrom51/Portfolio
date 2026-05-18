import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (label) {
      label.style.opacity = '0';
      label.style.transform = 'translateY(20px)';
      label.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      setTimeout(() => {
        label.style.opacity = '1';
        label.style.transform = 'translateY(0)';
      }, 300);
    }

    const lines = [line1, line2, line3];
    lines.forEach((line, i) => {
      if (line) {
        line.style.opacity = '0';
        line.style.transform = 'translateY(40px)';
        line.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.15}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.15}s`;
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, 100);
      }
    });

    if (subtitle) {
      subtitle.style.opacity = '0';
      subtitle.style.transform = 'translateY(30px)';
      subtitle.style.transition = 'opacity 0.9s ease-out 1s, transform 0.9s ease-out 1s';
      setTimeout(() => {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }, 100);
    }

    if (cta) {
      cta.style.opacity = '0';
      cta.style.transform = 'translateY(20px)';
      cta.style.transition = 'opacity 0.7s ease-out 1.3s, transform 0.7s ease-out 1.3s';
      setTimeout(() => {
        cta.style.opacity = '1';
        cta.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  function scrollToSection(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center z-[1]"
    >
      {/* Text readability overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.2) 70%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        <p
          ref={labelRef}
          className="text-[13px] tracking-[0.12em] uppercase mb-8"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(240,240,245,0.45)',
          }}
        >
          // Network &amp; Telecommunications Engineering Student
        </p>

        <h1 className="space-y-1">
          <span
            ref={line1Ref}
            className="block"
            style={{
              fontFamily: "'Clash Display', 'Inter', sans-serif",
              fontSize: 'clamp(48px, 7vw, 100px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: '#f0f0f5',
              textShadow: '0 0 80px rgba(124,58,237,0.3)',
            }}
          >
            Building Secure
          </span>
          <span
            ref={line2Ref}
            className="block gradient-text"
            style={{
              fontFamily: "'Clash Display', 'Inter', sans-serif",
              fontSize: 'clamp(48px, 7vw, 100px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              textShadow: '0 0 80px rgba(124,58,237,0.3)',
            }}
          >
            Cloud-Native
          </span>
          <span
            ref={line3Ref}
            className="block"
            style={{
              fontFamily: "'Clash Display', 'Inter', sans-serif",
              fontSize: 'clamp(48px, 7vw, 100px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: '#f0f0f5',
              textShadow: '0 0 80px rgba(124,58,237,0.3)',
            }}
          >
            Infrastructure And Automation
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 mx-auto max-w-[560px] text-lg leading-[1.7]"
          style={{ color: 'rgba(240,240,245,0.6)' }}
        >
          Third-year engineering student passionate about Docker, AWS, CI/CD pipelines, and building scalable full-stack applications with security at the core.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollToSection('#projects')}
            className="px-8 py-3.5 rounded-lg text-sm font-medium tracking-[0.02em] text-[#f0f0f5] transition-all duration-300 hover:brightness-110"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3.5 rounded-lg text-sm font-medium tracking-[0.02em] text-[#f0f0f5] transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(124,58,237,0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Contact Me
          </button>
          <a
            href="/Ali_CV.pdf"
            download
            className="px-8 py-3.5 rounded-lg text-sm font-medium tracking-[0.02em] text-[#f0f0f5] transition-all duration-300 hover:brightness-110 inline-flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
            }}
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
