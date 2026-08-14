import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    // Only activate cursor glow on devices with actual mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={glowRef}
      className="cursor-glow"
    >
      <style>{`
        .cursor-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          will-change: transform;
          transform: translate3d(-1000px, -1000px, 0);
          display: none;
        }
        @media (pointer: fine) {
          .cursor-glow {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default CursorGlow;
