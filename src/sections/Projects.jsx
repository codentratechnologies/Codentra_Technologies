import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projectsData } from '../data/siteData';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.work-card');

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 768px)",
      isTablet: "(min-width: 769px) and (max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { isMobile, isTablet } = context.conditions;
      
      cards.forEach((card, i) => {
        // Generous top clearance on mobile/tablet so the card NEVER touches the navbar/top edge
        const topOffset = isMobile ? '100px' : (isTablet ? '110px' : '110px');

        ScrollTrigger.create({
          trigger: card,
          start: `top ${topOffset}`,
          endTrigger: containerRef.current,
          end: 'bottom top',
          pin: true,
          pinSpacing: false, // Don't add spacing so they stack seamlessly
          anticipatePin: 1,
          fastScrollEnd: true,
          id: `card-${i}`
        });

        // Slight fade and slide-in for subsequent cards
        if (i > 0) {
          gsap.fromTo(card,
            { y: isMobile ? 40 : 80, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: `top ${topOffset}`,
                scrub: true,
                fastScrollEnd: true
              }
            }
          );
        }
      });
    });

    return () => mm.revert();

  }, { scope: containerRef });

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      <div className="section-header">
        <div className="section-header-label">
          <span className="dot"></span>
          <p>Our Work</p>
        </div>
        <h2>Unseen Possibilities.</h2>
        <p className="section-desc">
          Codentra Technologies is a people-first technology company focused on building innovative digital solutions that care about your business growth and product success as much as you do.
        </p>
      </div>

      <div className="projects-cards-container">
        {projectsData.map((project, idx) => (
          <div key={idx} className="work-card">
            {/* Card Background Ambient Glow */}
            <div className="work-card-ambient-glow"></div>

            <div className="work-card-left">
              <div className="work-card-meta">
                <span className="project-index">0{idx + 1}</span>
                <span className="project-category-badge">Featured Case Study</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>

              {(project.statValue || project.statValue2) && (
                <div className="work-card-stats">
                  {project.statValue && (
                    <div className="stat-pill">
                      <span className="stat-pill-value">{project.statValue}</span>
                      <span className="stat-pill-label">{project.statLabel}</span>
                    </div>
                  )}
                  {project.statValue && project.statValue2 && (
                    <div className="stat-pill-divider"></div>
                  )}
                  {project.statValue2 && (
                    <div className="stat-pill">
                      <span className="stat-pill-value">{project.statValue2}</span>
                      <span className="stat-pill-label">{project.statLabel2}</span>
                    </div>
                  )}
                </div>
              )}

              {project.link && (
                <div className="project-action-row">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-external-link"
                  >
                    <span>Explore Live Site</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow-icon">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              )}
            </div>

            <div className="work-card-right">
              <div className="browser-mockup-frame">
                <div className="browser-mockup-header">
                  <div className="browser-dot dot-red"></div>
                  <div className="browser-dot dot-yellow"></div>
                  <div className="browser-dot dot-green"></div>
                  <div className="browser-url-bar">
                    {project.link ? project.link.replace('https://', '').replace('/', '') : 'codentra.preview.internal'}
                  </div>
                </div>
                <div className="browser-mockup-body">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="mockup-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="mockup-placeholder"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
