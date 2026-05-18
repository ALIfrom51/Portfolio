import { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';

export default function LinkedInSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) {
      leftRef.current.style.opacity = '0';
      leftRef.current.style.transform = 'translateX(-30px)';
      leftRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(leftRef.current);
    }

    if (rightRef.current) {
      rightRef.current.style.opacity = '0';
      rightRef.current.style.transform = 'translateX(30px)';
      rightRef.current.style.transition = 'opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s';
      observer.observe(rightRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative z-[1] py-[100px]"
      style={{ background: 'rgba(10,10,15,0.8)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left Column */}
          <div ref={leftRef}>
            <p
              className="section-label mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // CONNECT
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Clash Display', 'Inter', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#f0f0f5',
              }}
            >
              Let's Connect on LinkedIn
            </h2>
            <p
              className="text-base leading-[1.7] max-w-[480px]"
              style={{ color: 'rgba(240,240,245,0.6)' }}
            >
              I'm always open to networking, internship opportunities, and collaborating on
              interesting projects. Let's discuss cloud architecture, containerization strategies,
              or the latest in DevSecOps practices.
            </p>
            <a
              href="https://www.linkedin.com/in/ali-rebbouh-0b0b79221/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:brightness-115 hover:scale-[1.02]"
              style={{ background: '#0a66c2' }}
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
          </div>

          {/* Right Column - Quote Card */}
          <div ref={rightRef}>
            <div
              className="rounded-2xl p-10"
              style={{
                background: 'rgba(124,58,237,0.05)',
                border: '1px solid rgba(124,58,237,0.15)',
              }}
            >
              <p
                className="text-xl italic text-center leading-[1.6]"
                style={{ color: 'rgba(240,240,245,0.5)' }}
              >
                "The best way to predict the future is to build it."
              </p>
              <p
                className="text-xs mt-4 text-center uppercase tracking-wider"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'rgba(240,240,245,0.35)',
                }}
              >
                -- Abraham Lincoln
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
