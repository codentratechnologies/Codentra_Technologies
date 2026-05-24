import React, { useState, useEffect } from 'react';
import { navLinks, siteConfig } from '../../data/siteData';
import Button from '../common/Button';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo-container" aria-label="Home">
            <picture>
              <source srcSet="/images/logo-removed-bg.png" type="image/png" />
              <img 
                src="/images/logo-removed-bg.png" 
                srcSet="/images/logo-removed-bg.png 1x, /images/logo-removed-bg.png 2x"
                alt={siteConfig.name} 
                className="nav-logo" 
                loading="eager"
                decoding="async"
              />
            </picture>
          </a>

          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-drawer-header">
              <picture>
                <img 
                  src="/images/logo-removed-bg.png" 
                  srcSet="/images/logo-removed-bg.png 1x, /images/logo-removed-bg.png 2x"
                  alt={siteConfig.name} 
                  className="drawer-logo"
                  loading="eager"
                  decoding="async" 
                />
              </picture>
              <button className="drawer-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
                ✕
              </button>
            </div>
            <div className="drawer-nav-items">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button href="#contact" variant="primary" className="mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Button>
          </div>

          <div className="nav-actions">
            <Button href="#contact" variant="glass" className="desktop-cta">Get Started</Button>
            <button
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
