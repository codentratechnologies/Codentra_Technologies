import React from 'react';
import { testimonialsData } from '../data/siteData';
import { FiMessageSquare } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        
        <div className="testimonials-header">
          <div className="testimonials-subtitle">
            <span className="blue-line"></span>
            <p>CLIENT REVIEWS</p>
          </div>
          <h2 className="testimonials-title">What Our Partners Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-icon"><FiMessageSquare /></div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
