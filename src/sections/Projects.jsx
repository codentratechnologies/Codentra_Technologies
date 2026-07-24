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
    
    // Create the stacked pinning effect
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 15%', // Pin when the card hits 15% from top
        endTrigger: containerRef.current,
        end: 'bottom bottom',
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

  }, { scope: containerRef });

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      <div className="projects-header">
        <div className="projects-header-label">
          <span className="dot"></span>
          <p>Our Work</p>
        </div>
        <h2>Unseen Possibilities.</h2>
        <p className="projects-desc">
          Codentra Technologies is a people-first technology company focused on building innovative digital solutions that care about your business growth and product success as much as you do.
        </p>
        <a href="#contact" className="view-all-btn">View All Projects</a>
      </div>

      <div className="projects-cards-container">
        {projectsData.map((project, idx) => (
          <div key={idx} className="work-card">
            <div className="work-card-left">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              
              <div className="work-card-stats">
                <div className="stat-item">
                  <h4>{project.statValue}</h4>
                  <p>{project.statLabel}</p>
                </div>
                <div className="divider"></div>
                <div className="stat-item">
                  <h4>{project.statValue2}</h4>
                  <p>{project.statLabel2}</p>
                </div>
              </div>
            </div>
            
            <div className="work-card-right">
              {/* Placeholder image for mockup */}
              <div className="mockup-placeholder"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
