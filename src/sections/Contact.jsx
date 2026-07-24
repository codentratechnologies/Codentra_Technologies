import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
   const form = useRef();
   const [formData, setFormData] = useState({
      name: '', email: '', subject: '', message: ''
   });
   const [status, setStatus] = useState('idle');

   const handleSubmit = (e) => {
      e.preventDefault();
      setStatus('sending');

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
         console.error('EmailJS keys are missing.');
         setTimeout(() => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
         }, 1000);
         return;
      }

      emailjs.sendForm(serviceID, templateID, form.current, publicKey)
         .then(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
         }, () => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
         });
   };

   return (
      <section id="contact" className="contact-section">
         <div className="contact-container">
            <div className="contact-left">
               <h2 className="contact-heading">
                  Ready to shape <br/>the future together?
               </h2>
               <div className="contact-cta">
                  <span className="contact-cta-line"></span>
                  <p>LET'S TALK</p>
               </div>
            </div>

            <div className="contact-right">
               <form ref={form} onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                     <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     />
                  </div>
                  <div className="form-group">
                     <textarea
                        rows="4"
                        name="message"
                        required
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                     />
                  </div>
                  <button
                     type="submit"
                     className="contact-submit-btn"
                     disabled={status === 'sending'}
                  >
                     {status === 'sending' ? 'Sending...' : 
                      status === 'success' ? 'Sent!' : 
                      status === 'error' ? 'Failed' : 'Send Message'}
                     {status === 'success' ? <FiCheckCircle /> : 
                      status === 'error' ? <FiAlertCircle /> : <FiSend />}
                  </button>
               </form>
            </div>
         </div>
      </section>
   );
};

export default Contact;
