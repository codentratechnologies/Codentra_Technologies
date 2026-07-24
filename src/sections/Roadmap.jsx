import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { roadmapData } from '../data/siteData';
import './Roadmap.css';

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.roadmap-step');
    
    // Pin the entire container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%', // scroll duration
      pin: true,
      pinSpacing: true,
    });

    // Update active index based on scroll position within the pinned area
    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top ${-((i - 0.5) * (200 / sections.length))}%`,
        end: `top ${-(i + 0.5) * (200 / sections.length)}%`,
        onToggle: self => {
          if (self.isActive) setActiveIdx(i);
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="roadmap" className="roadmap-section" ref={containerRef}>
      <div className="roadmap-container">
        
        <div className="roadmap-left" ref={leftRef}>
          <div className="roadmap-header">
            <span className="dot"></span>
            <p>Our Approach</p>
          </div>
          <h2>How we turn <br/> ideas into reality.</h2>
          
          <div className="roadmap-steps-list">
            {roadmapData.map((data, idx) => (
              <div 
                key={idx} 
                className={`roadmap-step ${activeIdx === idx ? 'active' : ''}`}
              >
                <span className="step-num">0{idx + 1}</span>
                <h3>{data.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="roadmap-right" ref={rightRef}>
          <div className="roadmap-details">
            {roadmapData.map((data, idx) => (
              <div 
                key={idx} 
                className="roadmap-detail-card"
                style={{
                  opacity: activeIdx === idx ? 1 : 0,
                  pointerEvents: activeIdx === idx ? 'auto' : 'none',
                  transform: `translateY(${activeIdx === idx ? '0' : '20px'})`,
                  transition: 'all 0.5s ease'
                }}
              >
                <h4>{data.phase}</h4>
                <ul>
                  {data.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Roadmap;
