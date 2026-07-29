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
   const [errors, setErrors] = useState({});

   const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) {
         newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
         newErrors.name = 'Name must be at least 2 characters';
      }

      if (!formData.email.trim()) {
         newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.message.trim()) {
         newErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
         newErrors.message = 'Message must be at least 10 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;

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
            <div className="section-header">
               <div className="section-header-label">
                  <span className="dot"></span>
                  <p>LET'S TALK</p>
               </div>
               <h2>
                  Ready to shape <br/>the future together?
               </h2>
            </div>

            <div className="contact-right">
               <form ref={form} onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-group">
                     <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        className={errors.name ? 'error-input' : ''}
                        onChange={(e) => {
                           setFormData({ ...formData, name: e.target.value });
                           if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                     />
                     {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                     <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        className={errors.email ? 'error-input' : ''}
                        onChange={(e) => {
                           setFormData({ ...formData, email: e.target.value });
                           if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                     />
                     {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                     <textarea
                        rows="4"
                        name="message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        className={errors.message ? 'error-input' : ''}
                        onChange={(e) => {
                           setFormData({ ...formData, message: e.target.value });
                           if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                     />
                     {errors.message && <span className="error-message">{errors.message}</span>}
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
