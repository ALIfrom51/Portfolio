import { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';

export default function GitHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [repoCount, setRepoCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);

  // Generate contribution graph data
  const contributionData = Array.from({ length: 20 * 7 }, () =>
    Math.random() > 0.6 ? Math.random() * 0.8 + 0.2 : Math.random() * 0.15
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
            observer.unobserve(el);

            // Animate counters
            animateCounter(0, 14, 1500, setRepoCount, 200);
            animateCounter(0, 3, 1500, setYearsCount, 600);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'scale(0.95)';
      cardRef.current.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function animateCounter(
    start: number,
    end: number,
    duration: number,
    setter: (v: number) => void,
    delay: number
  ) {
    setTimeout(() => {
      const startTime = performance.now();
      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setter(Math.floor(start + (end - start) * eased));
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }, delay);
  }

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative z-[1] py-[120px]"
      style={{ background: 'rgba(10,10,15,0.88)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
        <p
          className="section-label mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          // GITHUB
        </p>
        <h2
          style={{
            fontFamily: "'Clash Display', 'Inter', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#f0f0f5',
          }}
        >
          My Open Source Journey
        </h2>

        {/* GitHub Showcase Card */}
        <div
          ref={cardRef}
          className="mx-auto mt-16 max-w-[800px] rounded-[20px] p-10 md:p-12 text-center"
          style={{
            background: 'rgba(15,15,25,0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Github size={64} className="mx-auto text-[#f0f0f5] mb-6" />

          <p
            className="text-xl font-medium text-[#f0f0f5]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            @ALIfrom51
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-8">
            <div className="text-center">
              <p
                className="text-4xl font-semibold gradient-text"
                style={{ fontFamily: "'Clash Display', 'Inter', sans-serif" }}
              >
                {repoCount}+
              </p>
              <p
                className="text-[11px] mt-1 uppercase tracking-wider"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'rgba(240,240,245,0.4)',
                }}
              >
                Repositories
              </p>
            </div>
            {/* Contributions stat removed per request */}
            <div className="text-center">
              <p
                className="text-4xl font-semibold gradient-text"
                style={{ fontFamily: "'Clash Display', 'Inter', sans-serif" }}
              >
                {yearsCount}
              </p>
              <p
                className="text-[11px] mt-1 uppercase tracking-wider"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'rgba(240,240,245,0.4)',
                }}
              >
                Years Active
              </p>
            </div>
          </div>

          {/* Contribution Graph */}
          <div
            className="mt-8 rounded-lg overflow-hidden"
            style={{
              height: '120px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div
              className="grid gap-[3px] p-3 h-full"
              style={{
                gridTemplateColumns: 'repeat(20, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
              }}
            >
              {contributionData.map((opacity, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    background: `rgba(20, 184, 166, ${opacity})`,
                    opacity: 0.7 + Math.random() * 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://github.com/ALIfrom51"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-8 py-3.5 rounded-xl text-sm font-medium text-[#f0f0f5] transition-all duration-300"
            style={{
              background: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#7c3aed';
              e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = '#1a1a2e';
            }}
          >
            <Github size={18} />
            Visit My GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
