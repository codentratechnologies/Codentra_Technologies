import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stats } from '../data/siteData';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ endValue, suffix }) => {
  const nodeRef = useRef(null);
  
  useGSAP(() => {
    const endNum = parseInt(endValue, 10);
    if (isNaN(endNum)) return;
    
    gsap.fromTo(nodeRef.current, 
      { innerText: 0 }, 
      {
        innerText: endNum,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: nodeRef });

  return (
    <h2 className="stat-value">
      <span ref={nodeRef}>0</span>
      <span className="stat-suffix">{suffix}</span>
    </h2>
  );
};

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.stat-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-grid',
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" className="about-section dark-theme" ref={containerRef}>
      <div className="about-container">
        
        <div className="about-header">
          <div className="glow-orb"></div>
          <h1 className="about-title">
            Proven <br/> Results. <br/>
            <span className="text-gradient">Powerful</span> <br/>
            <span className="text-gradient">Impact.</span>
          </h1>
          <p className="about-subtitle">
            We deliver engineered excellence that translates into measurable business growth and digital transformation.
          </p>
        </div>
        
        <div className="about-grid">
          {stats.map((stat, idx) => {
            const num = stat.value.replace(/\D/g, '');
            const suffix = stat.value.replace(/\d/g, '');
            return (
              <div key={idx} className="stat-card">
                <div className="stat-card-glow"></div>
                <div className="stat-card-content">
                  <span className="stat-index">0{idx + 1}</span>
                  <Counter endValue={num} suffix={suffix} />
                  <h3 className="stat-label">{stat.label}</h3>
                  <p className="stat-desc">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
