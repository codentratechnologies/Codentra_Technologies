import React from 'react';
import { siteConfig } from '../../data/siteData';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-logo">
            CODENTRA
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Reach Us</h4>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.displayPhone || siteConfig.phone}</a>
            <p>{siteConfig.address}</p>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">AI & Machine Learning</a>
            <a href="#services">Full Stack Development</a>
            <a href="#services">Mobile Applications</a>
            <a href="#services">Enterprise Solutions</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#projects">Our Work</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Socials</h4>
            {Object.entries(siteConfig.socials).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noreferrer" style={{ textTransform: 'capitalize' }}>
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} {siteConfig.name} Technologies. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
