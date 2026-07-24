import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const barRef = useRef(null);

  useEffect(() => {
    // Progress counter
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);
      
      if (barRef.current) {
        barRef.current.style.width = `${nextProgress}%`;
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        
        // Outro animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    }, interval);

    // Initial character animations
    gsap.to(charsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    return () => clearInterval(timer);
  }, [onComplete]);

  const brandName = "CODENTRA"; // using their brand name but cloning exact style

  return (
    <div 
      ref={containerRef}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A1016', color: 'white' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '12px', letterSpacing: '0.45em', textTransform: 'uppercase', fontWeight: 'bold', color: 'rgba(229, 233, 236, 0.9)', marginBottom: '2rem', display: 'flex', gap: '0.1em' }}>
          {brandName.split('').map((char, i) => (
            <span 
              key={i} 
              ref={el => charsRef.current[i] = el}
              style={{ display: 'inline-block', opacity: 0, transform: 'translateY(12px)' }}
            >
              {char}
            </span>
          ))}
        </h2>

        <div style={{ width: '180px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden', position: 'relative', marginBottom: '0.75rem' }}>
          <div 
            ref={barRef}
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '0%', background: 'linear-gradient(to right, #00E5FF, #00FFFF)', boxShadow: '0 0 8px #00E5FF' }}
          ></div>
        </div>

        <div style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.25em', color: 'rgba(38, 147, 237, 0.9)', fontWeight: 500 }}>
          LOADING <span>{progress.toString().padStart(2, '0')}</span>%
        </div>
      </div>
    </div>
  );
};

export default Loader;
