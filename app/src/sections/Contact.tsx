import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

    if (leftRef.current) {
      leftRef.current.style.opacity = '0';
      leftRef.current.style.transform = 'translateY(30px)';
      leftRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(leftRef.current);
    }

    if (formRef.current) {
      formRef.current.style.opacity = '0';
      formRef.current.style.transform = 'scale(0.97)';
      formRef.current.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('Email service not configured. Please provide EmailJS keys.');
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'rebbouhali54@gmail.com',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setSubmitError('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'rebbouhali54@gmail.com',
      href: 'mailto:rebbouhali54@gmail.com',
      hoverColor: '#14b8a6',
    },
    {
      icon: Phone,
      label: '0781483644',
      href: 'tel:0781483644',
      hoverColor: '#22c55e',
    },
    {
      icon: Linkedin,
      label: 'linkedin.com/in/ali-rebbouh-0b0b79221',
      href: 'https://www.linkedin.com/in/ali-rebbouh-0b0b79221/',
      hoverColor: '#0a66c2',
    },
    {
      icon: Github,
      label: 'github.com/ALIfrom51',
      href: 'https://github.com/ALIfrom51',
      hoverColor: '#f0f0f5',
    },
    {
      icon: MapPin,
      label: 'Casablanca, Maroc',
      href: null,
      hoverColor: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-[1] py-[140px]"
      style={{ background: 'rgba(10,10,15,0.92)' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftRef}>
            <p
              className="section-label mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // GET IN TOUCH
            </p>
            <h2
              className="mb-12"
              style={{
                fontFamily: "'Clash Display', 'Inter', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#f0f0f5',
              }}
            >
              Let's Work Together
            </h2>

            <div className="flex flex-col gap-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 group">
                    <Icon
                      size={20}
                      className="transition-colors duration-300"
                      style={{ color: 'rgba(240,240,245,0.4)' }}
                    />
                    <span
                      className="text-base transition-colors duration-300"
                      style={{ color: '#f0f0f5' }}
                    >
                      {item.label}
                    </span>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="transition-colors duration-300"
                      onMouseEnter={(e) => {
                        const icon = e.currentTarget.querySelector('svg');
                        const text = e.currentTarget.querySelector('span');
                        if (icon) icon.style.color = item.hoverColor || '#f0f0f5';
                        if (text) text.style.color = item.hoverColor || '#f0f0f5';
                      }}
                      onMouseLeave={(e) => {
                        const icon = e.currentTarget.querySelector('svg');
                        const text = e.currentTarget.querySelector('span');
                        if (icon) icon.style.color = 'rgba(240,240,245,0.4)';
                        if (text) text.style.color = '#f0f0f5';
                      }}
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: 'rgba(15,15,25,0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(20,184,166,0.15)' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-xl font-medium text-[#f0f0f5]">Message Sent!</p>
                  <p className="text-sm mt-2" style={{ color: 'rgba(240,240,245,0.5)' }}>
                    I'll get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl text-[15px] transition-all duration-300 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f0f0f5',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl text-[15px] transition-all duration-300 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f0f0f5',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl text-[15px] transition-all duration-300 outline-none resize-y min-h-[140px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f0f0f5',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-[15px] font-semibold tracking-[0.02em] text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
