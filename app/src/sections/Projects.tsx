import { useEffect, useRef } from 'react';
import { GitBranch, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Internship Management Platform',
    description:
      'A comprehensive platform for managing student internships. Built with Flask backend and Docker containerization for seamless deployment and scalability.',
    image: '/images/project-gestiona.jpg',
    tech: ['Flask', 'Docker', 'MySQL', 'HTML/CSS','AWS EC2'],
    github: 'https://github.com/ALIfrom51/Internship/tree/main',
    demo: 'http://52.55.28.0',
  },
  {
    title: 'Dockerized Flask Application',
    description:
      'A production-ready Flask application fully containerized with Docker. Features multi-stage builds, health checks, and automated CI/CD pipeline integration.',
    image: '/images/project-docker.jpg',
    tech: ['Docker', 'Flask', 'GitHub Actions', 'Nginx'],
    github: '#',
    demo: null,
  },
  {
    title: 'AWS EC2 Deployment Project',
    description:
      'Automated deployment pipeline provisioning AWS EC2 instances with security hardening, load balancing, and monitoring using CloudWatch dashboards.',
    image: '/images/project-aws.jpg',
    tech: ['AWS EC2', 'Docker', 'CI/CD', 'CloudWatch'],
    github: '#',
    demo: null,
  },
  {
    title: 'DevSecOps CI/CD Pipeline',
    description:
      'An end-to-end DevSecOps pipeline integrating security scanning, automated testing, and deployment orchestration for secure software delivery.',
    image: '/images/project-devsecops.jpg',
    tech: ['GitHub Actions', 'Docker', 'Security Scanning', 'Flask'],
    github: '#',
    demo: null,
  },
];

export default function Projects() {
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
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[1] py-[140px]"
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,15,0.95), rgba(10,10,15,0.8), rgba(10,10,15,0.95))',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p
          className="section-label mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          // FEATURED PROJECTS
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
          What I've Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(15, 15, 25, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-[22px] font-semibold text-[#f0f0f5]">
                  {project.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.7] mt-3 line-clamp-3"
                  style={{ color: 'rgba(240,240,245,0.6)' }}
                >
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-md"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        background: 'rgba(20,184,166,0.1)',
                        border: '1px solid rgba(20,184,166,0.2)',
                        color: '#5eead4',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <a
                    href={project.github}
                    target={project.github && project.github !== '#' ? '_blank' : undefined}
                    rel={project.github && project.github !== '#' ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      if (!project.github || project.github === '#') {
                        e.preventDefault();
                        alert('GitHub link coming soon!');
                      }
                    }}
                    className="flex items-center gap-2 text-[13px] font-medium text-[#f0f0f5] px-5 py-2.5 rounded-lg transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <GitBranch size={16} />
                    View Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target={project.demo && project.demo !== '#' ? '_blank' : undefined}
                      rel={project.demo && project.demo !== '#' ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!project.demo || project.demo === '#') {
                          e.preventDefault();
                          alert('Live demo coming soon!');
                        }
                      }}
                      className="flex items-center gap-2 text-[13px] font-medium text-[#f0f0f5] px-5 py-2.5 rounded-lg transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
