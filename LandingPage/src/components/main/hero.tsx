import React from 'react';
import '../../styles/hero.css';
import StatItem from "../statItem";

interface Stat {
  number: string;
  label: string;
  style?: React.CSSProperties;
  numberClassName?: string;
  labelClassName?: string;
  delay?: number;
}

const Hero: React.FC = () => {
  const stats: Stat[] = [
    { number: "500+", label: "Verified Lawyers", delay: 0, style: { '--stat-number-color': '#0f172a' } as React.CSSProperties },
    { number: "10,000+", label: "Cases Resolved", delay: 200, style: { '--stat-number-color': '#0f172a' } as React.CSSProperties },
    { number: "98%", label: "Client Satisfaction", delay: 400, style: { '--stat-number-color': '#0f172a' } as React.CSSProperties },
    { number: "24/7", label: "Support Available", delay: 600, style: { '--stat-number-color': '#0f172a' } as React.CSSProperties }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="gradient-text"> Legal Match</span>
            </h1>
            <p className="hero-description">
              Connect with verified lawyers across Sri Lanka. Get expert legal help for your case in minutes, not days.
            </p>

            <div className="app-store-buttons">
            </div>
          </div>

          <div className="hero-card-container">
            <div className="hero-card">
              <div className="card-header">
                <div>
                  <div className="badge">
                    🎯 Sri Lanka's Trusted Legal Platform
                  </div>
                </div>
              </div>
              <div className="card-features">
                <div className="feature-item blue">
                  <span className="check">✓</span>
                  <span>Verified Professionals</span>
                </div>
                <div className="feature-item purple">
                  <span className="check">✓</span>
                  <span>Instant Matching</span>
                </div>
                <div className="feature-item green">
                  <span className="check">✓</span>
                  <span>Secure Platform</span>
                </div>
              </div>
              <button className="btn-primary full-width" onClick={() => scrollToSection('contact')}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatItem
              key={i}
              number={s.number}
              label={s.label}
              delay={s.delay}
              style={s.style}
              numberClassName={s.numberClassName}
              labelClassName={s.labelClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
