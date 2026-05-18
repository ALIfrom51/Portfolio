import { useEffect, useRef } from 'react';

const techBadges = [
  'Docker',
  'AWS EC2',
  'GitHub Actions',
  'Linux',
  'Flask',
  'Node.js',
  'MySQL',
  'CI/CD',
  'DevSecOps',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

    if (leftRef.current) {
      leftRef.current.style.opacity = '0';
      leftRef.current.style.transform = 'translateY(30px)';
      leftRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(leftRef.current);
    }

    if (rightRef.current) {
      rightRef.current.style.opacity = '0';
      rightRef.current.style.transform = 'scale(0.95)';
      rightRef.current.style.transition = 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s';
      observer.observe(rightRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-[1] py-[140px]"
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,15,0.85), rgba(10,10,15,0.7))',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-start">
          {/* Left Column - Text */}
          <div ref={leftRef}>
            <p
              className="section-label mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // ABOUT ME
            </p>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Clash Display', 'Inter', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#f0f0f5',
              }}
            >
              Passionate About Cloud, Security &amp; Automation
            </h2>

            <p
              className="text-base leading-[1.8] mb-6"
              style={{ color: 'rgba(240,240,245,0.65)' }}
            >
              I'm a third-year engineering student specializing in DevSecOps and Cloud Computing.
              I Train My self to have a solid base in building secure,
              scalable applications. My journey in tech started with a curiosity for how systems work
              — now I'm Trying to build them.
            </p>

            <p
              className="text-base leading-[1.8] mb-12"
              style={{ color: 'rgba(240,240,245,0.65)' }}
            >
              From configuring Linux servers to deploying applications with automated security
              scans, I bring a security-first mindset to every project. I'm constantly learning and
              experimenting with new cloud technologies.
            </p>

            {/* Education Timeline */}
            <div className="mb-8">
              <p
                className="text-[11px] tracking-[0.12em] uppercase mb-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'rgba(240,240,245,0.35)',
                }}
              >
                EDUCATION
              </p>
              <div
                className="pl-4 border-l-2"
                style={{ borderColor: 'rgba(124,58,237,0.4)' }}
              >
                <p className="text-[15px] font-medium text-[#f0f0f5]">
                  Third Year in Network &amp; telecommunication Engineering (3rd Year)
                </p>
                <p className="text-sm mt-1" style={{ color: 'rgba(240,240,245,0.5)' }}>
                  The National School of Applied Sciences, Safi
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2.5">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-1.5 rounded-full text-xs"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    color: '#a78bfa',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Photo Card */}
          <div ref={rightRef} className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src="/images/profile-photo.jpeg"
                alt="Professional portrait"
                className="w-full aspect-[3/4] object-cover"
              />
              {/* Stats Bar */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: 'rgba(15,15,25,0.8)' }}
              >
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#f0f0f5]">Network</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(240,240,245,0.4)' }}>
                  &amp; infrastructure
                  </p>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#f0f0f5]">Security</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(240,240,245,0.4)' }}>
                    &amp; Operating Systems
                  </p>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#f0f0f5]">Docker</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(240,240,245,0.4)' }}>
                    &amp; AWS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
