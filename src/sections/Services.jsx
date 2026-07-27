import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as FiIcons from 'react-icons/fi';
import { services } from '../data/siteData';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  // Gradient of deep blues for the service cards
  const cardColors = [
    '#00BFFF', '#00A0E0', '#0070AA', '#004077',
    '#0f172a', '#1e293b', '#334155', '#475569'
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: `top ${20 + (i * 2)}%`, // Stagger the pinning point slightly so they layer visibly
        endTrigger: containerRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
        id: `service-card-${i}`
      });
      
      // Add a scale effect to give a sense of depth
      if (i > 0) {
        gsap.fromTo(card,
          { scale: 0.95, y: 100 },
          {
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: `top ${20 + (i * 2)}%`,
              scrub: true
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-header">
        <div className="services-header-label">
          <span className="dot"></span>
          <p>Our Services</p>
        </div>
        <h2>From architecture design <br/>to AI-powered platforms</h2>
        <p className="services-desc">
          we design and build software for the future.
        </p>
      </div>

      <div className="services-cards-container">
        {services.map((service, idx) => {
          const Icon = FiIcons[service.icon];
          return (
            <div 
              key={idx} 
              className="service-card"
              style={{ 
                backgroundColor: cardColors[idx % cardColors.length],
                zIndex: idx + 1
              }}
            >
              <div className="service-card-content">
                <div className="service-card-top">
                  {Icon && <Icon className="service-icon" />}
                  <h3>{service.title}</h3>
                </div>
                
                <div className="service-card-bottom">
                  <p className="service-main-desc">{service.desc}</p>
                  
                  <div className="service-tags">
                    {service.features && service.features.length > 0 && (
                      <div className="tag-group">
                        <h4>Features</h4>
                        <div className="tags">
                          {service.features.map(f => (
                            <span key={f} className="tag">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {service.tech && service.tech.length > 0 && (
                      <div className="tag-group">
                        <h4>Technologies</h4>
                        <div className="tags">
                          {service.tech.map(t => (
                            <span key={t} className="tag tag-tech">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Visual Decorative Circle */}
              <div className="visual-circle"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
