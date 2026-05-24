import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { siteConfig } from '../data/siteData';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/common/Reveal';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
   const form = useRef();
   const [formData, setFormData] = useState({
      name: '', email: '', subject: '', message: ''
   });
   const [status, setStatus] = useState('idle'); // idle, sending, success, error

   const handleSubmit = (e) => {
      e.preventDefault();
      setStatus('sending');

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
         console.error('EmailJS keys are missing. Please check your .env file.');
         setTimeout(() => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
         }, 1000);
         return;
      }

      emailjs.sendForm(serviceID, templateID, form.current, publicKey)
         .then((result) => {
            console.log('Email successfully sent!', result.text);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
         }, (error) => {
            console.error('Failed to send email:', error.text);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
         });
   };

   const infoVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
   };

   const formVariants = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
   };

   return (
      <section id="contact" className="section contact-section">
         <div className="container contact-grid">
            <motion.div
               className="contact-info"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={infoVariants}
            >
               <Reveal>
                  <span className="section-badge">Secure Connection</span>
                  <h2 className="section-title">Ready to Launch Your <span className="text-gradient">Next Project?</span></h2>
               </Reveal>

               <Reveal delay={0.4}>
                  <p className="contact-desc">
                     We're ready to engineer your vision into a high-performance digital reality.
                     Let's build something exceptional together.
                  </p>
               </Reveal>

               <div className="contact-methods">
                  <motion.a
                     href={`mailto:${siteConfig.email}`}
                     className="method-item"
                     whileHover={{ x: 10, color: "var(--color-primary)" }}
                  >
                     <div className="method-icon"><FiMail /></div>
                     <div className="method-details">
                        <span className="method-label">Direct Email</span>
                        <span className="method-value">{siteConfig.email}</span>
                     </div>
                  </motion.a>
                  <motion.a
                     href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                     className="method-item"
                     whileHover={{ x: 10, color: "var(--color-primary)" }}
                  >
                     <div className="method-icon"><FiPhone /></div>
                     <div className="method-details">
                        <span className="method-label">Voice Channel</span>
                        <span className="method-value">{siteConfig.displayPhone || siteConfig.phone}</span>
                     </div>
                  </motion.a>
                  <motion.a
                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                     target="_blank"
                     rel="noreferrer"
                     className="method-item"
                     whileHover={{ x: 10, color: "var(--color-primary)" }}
                  >
                     <div className="method-icon"><FiMapPin /></div>
                     <div className="method-details">
                        <span className="method-label">Location</span>
                        <span className="method-value">{siteConfig.address}</span>
                     </div>
                  </motion.a>
               </div>
            </motion.div>

            <motion.div
               className="contact-form-container"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={formVariants}
            >
               <Card className="form-card" glow={true}>
                  <form ref={form} onSubmit={handleSubmit} className="premium-form">
                     <div className="form-row">
                        <div className="form-group">
                           <label>Full Name</label>
                           <input
                              type="text"
                              name="name"
                              required
                              placeholder="John Connor"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="form-group">
                           <label>Secure Email</label>
                           <input
                              type="email"
                              name="email"
                              required
                              placeholder="john@resistance.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="form-group">
                        <label>Project Subject</label>
                        <input
                           type="text"
                           name="subject"
                           required
                           placeholder="Software Architecture Inquiry"
                           value={formData.subject}
                           onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                     </div>

                     <div className="form-group">
                        <label>Mission Details</label>
                        <textarea
                           rows="5"
                           name="message"
                           required
                           placeholder="Describe your vision and technical requirements..."
                           value={formData.message}
                           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                     </div>

                     <Button
                        type="submit"
                        variant="primary"
                        className="submit-btn"
                        disabled={status === 'sending'}
                     >
                        {status === 'sending' ? 'Transmitting...' : 
                         status === 'success' ? 'Sent!' : 
                         status === 'error' ? 'Failed' : 'Send Message'}
                        {status === 'success' ? <FiCheckCircle /> : 
                         status === 'error' ? <FiAlertCircle /> : <FiSend />}
                     </Button>

                     {status === 'success' && (
                        <motion.div
                           className="success-message"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                        >
                           Message Transmitted Successfully. We'll be in touch soon.
                        </motion.div>
                     )}

                     {status === 'error' && (
                        <motion.div
                           className="error-message"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}
                        >
                           Transmission Failed. Please check your connection or try again later.
                        </motion.div>
                     )}
                  </form>
               </Card>
            </motion.div>
         </div>
      </section>
   );
};

export default Contact;
