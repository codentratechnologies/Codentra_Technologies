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
      const { isMobile, isTablet, reduceMotion } = context.conditions;
      
      cards.forEach((card, i) => {
        const topOffset = isMobile ? '100px' : (isTablet ? '110px' : '110px');

        // Set 3D perspective and hardware acceleration
        gsap.set(card, {
          transformPerspective: 1200,
          transformOrigin: "center top",
          force3D: true
        });

        // 1. Pin each card as it reaches the topOffset
        ScrollTrigger.create({
          trigger: card,
          start: `top ${topOffset}`,
          endTrigger: containerRef.current,
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: true,
          id: `card-${i}`
        });

        // 2. Ultra-smooth 3D Slide & Scale-in animation for incoming cards
        if (i > 0) {
          gsap.fromTo(card,
            {
              y: isMobile ? 35 : 60,
              scale: 0.94,
              opacity: 0.3,
              rotateX: reduceMotion ? 0 : (isMobile ? 3 : 5)
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              rotateX: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: `top ${topOffset}`,
                scrub: 0.5,
                fastScrollEnd: true
              }
            }
          );
        }

        // 3. Subtle 3D Depth recession as newer cards stack on top (if not the last card)
        if (i < cards.length - 1 && !reduceMotion) {
          const nextCard = cards[i + 1];
          gsap.to(card, {
            scale: isMobile ? 0.96 : 0.94,
            opacity: isMobile ? 0.75 : 0.65,
            y: isMobile ? -8 : -15,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: `top 85%`,
              end: `top ${topOffset}`,
              scrub: 0.5,
              fastScrollEnd: true
            }
          });
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
          <div key={idx} className={`work-card ${project.link ? 'has-link' : 'no-link'}`}>
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
