import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoPinRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useGSAP(() => {
    // Pin the video container when it hits the center of the screen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoPinRef.current,
        start: 'center center',
        end: '+=150%', // Scroll for 150% of viewport height while pinned
        pin: true,
        scrub: 1,
      }
    });

    // Animate the video wrapper to cover screen without scaling the actual video content
    tl.to(videoWrapperRef.current, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      ease: 'power1.inOut',
    }, 0);

    // Also remove the border radius and border of the mockup as it goes fullscreen
    tl.to('.hero-device-mockup', {
      borderWidth: '0px',
      borderRadius: '0px',
      ease: 'power1.inOut',
    }, 0);

    tl.to('.hero-video-inner', {
      borderRadius: '0px',
      ease: 'power1.inOut',
    }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-wrapper">
      
      {/* Initial White State Text (Scrolls normally) */}
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-heading">
            The Digital Engineering Partner Built <br/> for What's Coming Next
          </h1>
          <button className="hero-btn">
            Explore Work
            <ArrowDown size={18} className="arrow-icon" />
          </button>
        </div>
      </div>

      {/* Video Pin Container (Scrolls into view, then pins) */}
      <div ref={videoPinRef} className="hero-video-pin-container">
        
        {/* Video Mockup (Scales up) */}
        <div ref={videoWrapperRef} className="hero-video-wrapper">
          <div className="hero-video-inner">
            <video 
              src="/video1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="hero-video"
            ></video>
          </div>
          <div className="hero-device-mockup" style={{ border: '16px solid #222', borderRadius: '24px', boxSizing: 'border-box' }}></div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
