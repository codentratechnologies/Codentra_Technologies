import React from 'react';
import { siteConfig, navLinks } from '../../data/siteData';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3 className="brand-name">{siteConfig.name}</h3>
          <p className="footer-desc">
            Architecting the future of digital innovation with scalable software solutions
            and premium engineering excellence.
          </p>
          <div className="social-links">
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer"><FiGithub /></a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /></a>
            <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer"><FiInstagram /></a>
          </div>
        </div>

        <div className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map(link => (
              <li key={link.name}><a href={link.href}>{link.name}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <a href={`mailto:${siteConfig.email}`} className="contact-item">
            <FiMail /> <span>{siteConfig.email}</span>
          </a>
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="contact-item">
            <FiPhone /> <span>{siteConfig.phone}</span>
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <FiMapPin /> <span>{siteConfig.address}</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
