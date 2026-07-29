import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoPinRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRefs = useRef([]);
  const lastInteractionTime = useRef(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const videos = [
    isMobileDevice ? '/video4_mobile.mp4' : '/video4.mp4',
    '/video1.mp4', 
    '/video2.mp4', 
    '/video3.mp4'
  ];
  const taglines = ["What's Coming Next", "Scale", "Innovation", "The Future"];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobileDevice(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tagline Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard and Horizontal Trackpad Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      
      let nextIndex = currentVideo;
      if (e.key === 'ArrowRight') {
        nextIndex = Math.min(currentVideo + 1, videos.length - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        nextIndex = Math.max(currentVideo - 1, 0);
        e.preventDefault();
      }

      if (nextIndex !== currentVideo) {
        setCurrentVideo(nextIndex);
      }
    };

    const handleWheel = (e) => {
      if (!isFullscreen) return;
      
      // Handle horizontal swipe (trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastInteractionTime.current < 600) return; // Debounce fast swipes
        
        let nextIndex = currentVideo;
        if (e.deltaX > 0) {
          nextIndex = Math.min(currentVideo + 1, videos.length - 1);
        } else {
          nextIndex = Math.max(currentVideo - 1, 0);
        }

        if (nextIndex !== currentVideo) {
          lastInteractionTime.current = now;
          setCurrentVideo(nextIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isFullscreen, currentVideo, videos.length]);

  // Video Autoplay and Switching Logic
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentVideo) {
          vid.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });
  }, [currentVideo]);

  const handleVideoEnded = () => {
    if (isFullscreen) {
      setCurrentVideo((prev) => (prev + 1) % videos.length); // Loop to next video
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoPinRef.current,
        start: 'center center',
        end: '+=150%', // Just enough to scrub the zoom animation smoothly
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Trigger fullscreen state when the animation is mostly complete
          const isFull = self.progress > 0.8;
          setIsFullscreen(prev => {
            if (prev !== isFull) {
              // Reset video system when switching states
              setCurrentVideo(0);
              if (videoRefs.current[0]) {
                videoRefs.current[0].currentTime = 0;
                videoRefs.current[0].play().catch(e => console.log(e));
              }
            }
            return isFull;
          });
        }
      }
    });

    // Animate the video wrapper to cover screen
    // On mobile, animating to 100vh causes cropping, but we restore it and fix it in CSS
    tl.to(videoWrapperRef.current, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      ease: 'power1.inOut',
    }, 0);

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
            The Digital Engineering Partner Built for
            <span className="hero-dynamic-wrapper">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={taglineIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    y: { type: "spring", stiffness: 400, damping: 35 }, 
                    opacity: { duration: 0.25 } 
                  }}
                  className="hero-dynamic-text"
                >
                  {taglines[taglineIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <a href="#projects" className="hero-btn">
            Explore Work
            <ArrowDown size={18} className="arrow-icon" />
          </a>
        </div>
      </div>

      {/* Video Pin Container (Scrolls into view, then pins) */}
      <div ref={videoPinRef} className="hero-video-pin-container">
        
        {/* Video Mockup (Scales up) */}
        <div ref={videoWrapperRef} className="hero-video-wrapper">
          <div className="hero-video-inner">
            <div 
              className="hero-video-slider"
              style={{
                display: 'flex',
                width: `${(isFullscreen ? videos.length : 1) * 100}%`,
                height: '100%',
                transition: 'transform var(--transition-smooth)',
                transform: `translateX(-${currentVideo * (100 / (isFullscreen ? videos.length : 1))}%)`
              }}
            >
              {(isFullscreen ? videos : [videos[0]]).map((src, idx) => (
                <video 
                  key={isFullscreen ? idx : "main-video"}
                  ref={el => videoRefs.current[idx] = el}
                  src={src} 
                  preload={idx === 0 ? "auto" : "metadata"}
                  autoPlay={idx === 0} 
                  muted 
                  playsInline
                  onEnded={handleVideoEnded}
                  className="hero-video"
                  style={{ width: `${100 / (isFullscreen ? videos.length : 1)}%`, height: '100%', objectFit: 'cover' }}
                ></video>
              ))}
            </div>
            
            {/* Total Count Bar - Only visible in fullscreen */}
            {isFullscreen && (
              <div className="video-progress-container">
                {videos.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`video-progress-bar ${idx === currentVideo ? 'active' : ''}`}
                    onClick={() => setCurrentVideo(idx)} // Added click to navigate
                    style={{ cursor: 'pointer' }}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <div className="hero-device-mockup"></div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
