import { useEffect, useRef } from 'react';
import {
  Cloud,
  Container,
  FlaskConical,
  Server,
  Code2,
  Database,
  GitBranch,
  Terminal,
} from 'lucide-react';

const skills = [
  {
    name: 'Cloud & AWS',
    icon: Cloud,
    color: '#14b8a6',
    proficiency: 90,
    label: 'Advanced',
  },
  {
    name: 'Docker & Containers',
    icon: Container,
    color: '#0ea5e9',
    proficiency: 85,
    label: 'Advanced',
  },
  {
    name: 'Python',
    icon: FlaskConical,
    color: '#22c55e',
    proficiency: 80,
    label: 'Advanced',
  },
  {
    name: 'Node.js',
    icon: Server,
    color: '#22c55e',
    proficiency: 75,
    label: 'Intermediate',
  },
  {
    name: 'React & Frontend',
    icon: Code2,
    color: '#0ea5e9',
    proficiency: 85,
    label: 'Advanced',
  },
  {
    name: 'MySQL & Databases',
    icon: Database,
    color: '#f59e0b',
    proficiency: 70,
    label: 'Intermediate',
  },
  {
    name: 'Git & GitHub',
    icon: GitBranch,
    color: '#a78bfa',
    proficiency: 90,
    label: 'Advanced',
  },
  {
    name: 'Linux & DevOps',
    icon: Terminal,
    color: '#9ca3af',
    proficiency: 80,
    label: 'Advanced',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-[1] py-[120px]"
      style={{ background: 'rgba(10,10,15,0.9)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p
          className="section-label mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          // TECHNICAL SKILLS
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
          Tools &amp; Technologies I Work With
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group p-8 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                  e.currentTarget.style.background = 'rgba(124,58,237,0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={40} style={{ color: skill.color }} />
                <p className="text-lg font-medium text-[#f0f0f5] mt-4">{skill.name}</p>

                {/* Progress bar */}
                <div
                  className="mt-3 h-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.proficiency}%`,
                      background: 'linear-gradient(90deg, #7c3aed, #14b8a6)',
                    }}
                  />
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'rgba(240,240,245,0.4)',
                  }}
                >
                  {skill.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
