import React, { useState, useEffect } from 'react';
import { siteConfig, navLinks } from '../../data/siteData';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(true);

  useEffect(() => {
    // Classes known to have a white/light background
    const lightClasses = ['about-section', 'services-section', 'projects-section', 'testimonials-section'];

    const handleScroll = () => {
      // Query sections dynamically in case they are rendered after navbar
      const sections = Array.from(document.querySelectorAll(
        '.hero-wrapper, .about-section, .services-section, .why-section, .projects-section, .testimonials-section, .roadmap-section, .contact-section, footer'
      ));

      let currentSection = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Check if the navbar (which is roughly 80px tall) is inside this section
        if (rect.top <= 40 && rect.bottom >= 40) {
          currentSection = section;
          break;
        }
      }

      if (currentSection) {
        if (currentSection.classList.contains('hero-wrapper')) {
           // Hero is light until the dark overlay fades in significantly
           // Pin starts after text (~40vh), timeline is 150vh. Dark overlay starts at 30% of 150vh = 45vh.
           // Total scroll to dark start: ~85vh. Full dark: ~160vh. We switch text color around 120vh.
           setIsLightBackground(window.scrollY < window.innerHeight * 1.2);
        } else {
           const isLight = lightClasses.some(c => currentSection.classList.contains(c));
           setIsLightBackground(isLight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="navbar-glass-bg"></div>
      <header className={`navbar-wrapper ${isLightBackground ? 'navbar-dark-text' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo-area">
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img src="/logo.png" alt="Codentra Logo" className="navbar-logo-img" style={{ height: '48px', width: 'auto' }} />
            </a>
          </div>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="navbar-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            <a href="#contact" className="navbar-contact-btn">Contact Us</a>
            <button 
              className="navbar-hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          backgroundColor: '#0a121e', 
          zIndex: 99, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '2rem',
          transition: 'transform 0.5s ease-in-out',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#contact" 
          style={{ marginTop: '1rem', backgroundColor: '#00E5FF', color: 'white', fontSize: '1.125rem', fontWeight: 'bold', padding: '1rem clamp(1.5rem, 5vw, 3rem)', borderRadius: '0.75rem' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact Us
        </a>
      </div>
    </>
  );
};

export default Navbar;
