import React from 'react';
import { testimonialsData } from '../data/siteData';
import { FiMessageSquare } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleInteraction = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        
        <div className="section-header">
          <div className="section-header-label">
            <span className="dot"></span>
            <p>CLIENT REVIEWS</p>
          </div>
          <h2>What Our Partners Say</h2>
        </div>

        <div className="testimonials-marquee">
          <div 
            className={`testimonials-track ${isPaused ? 'is-paused' : ''}`}
            onClick={handleInteraction}
          >
            {[...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData].map((testimonial, i) => (
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

      </div>
    </section>
  );
};

export default Testimonials;
