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
        const topOffset = isMobile ? '95px' : (isTablet ? '105px' : '110px');
        const mockup = card.querySelector('.browser-mockup-frame');
        const glow = card.querySelector('.work-card-ambient-glow');

        // Set card 3D spatial properties
        gsap.set(card, {
          transformPerspective: 1600,
          transformOrigin: isMobile ? "center top" : "50% 20%",
          transformStyle: "preserve-3d",
          force3D: true
        });

        if (mockup && !reduceMotion) {
          gsap.set(mockup, {
            transformPerspective: 1200,
            force3D: true
          });
        }

        // 1. Precise stacking pin
        ScrollTrigger.create({
          trigger: card,
          start: `top ${topOffset}`,
          endTrigger: containerRef.current,
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: true,
          id: `card-pin-${i}`
        });

        // 2. 3D Spatial Entry Animation for incoming cards
        if (i > 0) {
          const entryTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 92%' : 'top 88%',
              end: `top ${topOffset}`,
              scrub: 0.6,
              fastScrollEnd: true
            }
          });

          entryTl.fromTo(card,
            {
              y: isMobile ? 45 : 90,
              scale: isMobile ? 0.92 : 0.90,
              rotateX: reduceMotion ? 0 : (isMobile ? 6 : 9),
              rotateY: reduceMotion ? 0 : (isMobile ? 0 : -2),
              opacity: 0.25,
              filter: isMobile ? "none" : "brightness(0.9)"
            },
            {
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              opacity: 1,
              filter: "brightness(1)",
              ease: "power2.out"
            }
          );

          // 3D Parallax lift for the mockup inside the card
          if (mockup && !reduceMotion) {
            entryTl.fromTo(mockup,
              {
                y: isMobile ? 20 : 35,
                rotateX: isMobile ? 4 : 7,
                scale: 0.95
              },
              {
                y: 0,
                rotateX: 0,
                scale: 1,
                ease: "power2.out"
              },
              0
            );
          }

          if (glow && !reduceMotion) {
            entryTl.fromTo(glow,
              { opacity: 0.2, scale: 0.8 },
              { opacity: 1, scale: 1, ease: "power2.out" },
              0
            );
          }
        }

        // 3. Subtle 3D Layer Stack Recession when next card overlaps
        if (i < cards.length - 1 && !reduceMotion) {
          const nextCard = cards[i + 1];
          gsap.to(card, {
            scale: isMobile ? 0.95 : 0.93,
            y: isMobile ? -6 : -14,
            rotateX: isMobile ? -2 : -3.5,
            opacity: isMobile ? 0.7 : 0.55,
            filter: isMobile ? "none" : "brightness(0.92)",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: nextCard,
              start: isMobile ? 'top 90%' : 'top 85%',
              end: `top ${topOffset}`,
              scrub: 0.6,
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
