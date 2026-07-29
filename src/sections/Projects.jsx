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

    mm.add("all", () => {
      // Create the stacked pinning effect on all devices
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 120px', // Pin at a fixed pixel coordinate to ensure perfect stacking on mobile
          endTrigger: containerRef.current,
          end: 'bottom top',
          pin: true,
          pinSpacing: false, // Don't add spacing so they overlap
          id: `card-${i}`
        });

        // Optional: Add a slight scale down or darken effect to cards behind
        if (i > 0) {
          gsap.fromTo(card,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
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
            <div className="work-card-left">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>

              <div className="work-card-stats">
                {project.statValue && (
                  <div className="stat-item">
                    <h4>{project.statValue}</h4>
                    <p>{project.statLabel}</p>
                  </div>
                )}
                {project.statValue && project.statValue2 && (
                  <div className="divider"></div>
                )}
                {project.statValue2 && (
                  <div className="stat-item">
                    <h4>{project.statValue2}</h4>
                    <p>{project.statLabel2}</p>
                  </div>
                )}
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-external-link"
                >
                  Visit Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              ) : (
                <div className="project-external-link" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
                  Visit Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              )}
            </div>

            <div className="work-card-right">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} mockup`}
                  className="mockup-image"
                />
              ) : (
                <div className="mockup-placeholder"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
