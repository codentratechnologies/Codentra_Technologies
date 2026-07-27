import React from 'react';
import { siteConfig } from '../../data/siteData';
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiFacebook, FiGlobe } from 'react-icons/fi';
import './Footer.css';

const SocialIcon = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case 'github': return <FiGithub className="footer-icon" />;
    case 'linkedin': return <FiLinkedin className="footer-icon" />;
    case 'instagram': return <FiInstagram className="footer-icon" />;
    case 'twitter': return <FiTwitter className="footer-icon" />;
    case 'facebook': return <FiFacebook className="footer-icon" />;
    default: return <FiGlobe className="footer-icon" />;
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Reach Us</h4>
            <a href={`mailto:${siteConfig.email}`} className="footer-contact-link">
              <FiMail className="footer-icon" /> <span>{siteConfig.email}</span>
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="footer-contact-link">
              <FiPhone className="footer-icon" /> <span>{siteConfig.displayPhone || siteConfig.phone}</span>
            </a>
            <p className="footer-contact-link">
              <FiMapPin className="footer-icon" /> <span>{siteConfig.address}</span>
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services"><FiArrowRight className="footer-arrow" /> AI & Machine Learning</a>
            <a href="#services"><FiArrowRight className="footer-arrow" /> Full Stack Development</a>
            <a href="#services"><FiArrowRight className="footer-arrow" /> Mobile Applications</a>
            <a href="#services"><FiArrowRight className="footer-arrow" /> Enterprise Solutions</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about"><FiArrowRight className="footer-arrow" /> About Us</a>
            <a href="#projects"><FiArrowRight className="footer-arrow" /> Our Work</a>
            <a href="#careers"><FiArrowRight className="footer-arrow" /> Careers</a>
            <a href="#contact"><FiArrowRight className="footer-arrow" /> Contact</a>
          </div>

          <div className="footer-col">
            <h4>Socials</h4>
            <div className="footer-socials">
               {Object.entries(siteConfig.socials).map(([platform, url]) => (
                 <a key={platform} href={url} target="_blank" rel="noreferrer" style={{ textTransform: 'capitalize' }}>
                   <SocialIcon platform={platform} /> <span>{platform}</span>
                 </a>
               ))}
            </div>
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
