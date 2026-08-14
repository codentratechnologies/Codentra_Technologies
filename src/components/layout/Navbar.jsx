import React, { useState, useEffect } from 'react';
import { siteConfig, navLinks } from '../../data/siteData';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Classes known to have a white/light background
    const lightClasses = ['services-section', 'testimonials-section'];

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
           setIsLightBackground(window.scrollY < window.innerHeight * 1.2);
        } else {
           const isLight = lightClasses.some(c => currentSection.classList.contains(c));
           setIsLightBackground(isLight);
        }
      }
      
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle browser back button to close menu intuitively
  useEffect(() => {
    const handlePopState = (e) => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.history.pushState({ menuOpen: true }, '');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [mobileMenuOpen]);

  const handleHamburgerClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Only navigate back if the user manually clicks the X
      if (window.history.state && window.history.state.menuOpen) {
        window.history.back();
      }
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    // If they click a link, clean up the history state so pressing back later doesn't reopen the menu,
    // but DO NOT call history.back() because we want the anchor link to successfully navigate!
    if (window.history.state && window.history.state.menuOpen) {
      window.history.replaceState({}, '');
    }
  };

  const glassClass = !isScrolled 
    ? 'navbar-glass-transparent' 
    : (isLightBackground ? 'navbar-glass-light' : 'navbar-glass-dark');

  return (
    <>
      <div className={`navbar-glass-bg ${glassClass}`}></div>
      <header className={`navbar-wrapper ${isLightBackground && !mobileMenuOpen ? 'navbar-dark-text' : ''}`}>
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
              onClick={handleHamburgerClick}
            >
              <span style={{ transform: mobileMenuOpen ? 'translateY(9px) rotate(45deg)' : 'none' }}></span>
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span style={{ transform: mobileMenuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none' }}></span>
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
          transition: 'transform var(--transition-smooth)',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}
            onClick={handleLinkClick}
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#contact" 
          style={{ marginTop: '1rem', backgroundColor: '#00E5FF', color: 'black', fontSize: '1.125rem', fontWeight: 'bold', padding: '1rem clamp(1.5rem, 5vw, 3rem)', borderRadius: '0.75rem', textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          Contact Us
        </a>
      </div>
    </>
  );
};

export default Navbar;
