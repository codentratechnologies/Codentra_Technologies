import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Reveal from '../components/common/Reveal';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: "Drashti Gajera",
    company: "Creative Canvas",
    image: "https://i.pravatar.cc/150?img=47",
    text: "Codentra Technologies delivered a highly creative and smooth platform with excellent UI/UX. The team was professional, responsive, and delivered quality work on time.",
    rating: 5
  },
  {
    id: 2,
    name: "Rohit Asodariya",
    company: "Radheshyam Furniture",
    image: "https://i.pravatar.cc/150?img=11",
    text: "The mobile application simplified our furniture calculations and workflow management. Great support and development experience.",
    rating: 5
  },
  {
    id: 3,
    name: "Aura Finance",
    company: "Aura Finance Platform",
    image: "https://i.pravatar.cc/150?img=32",
    text: "The finance platform was built professionally with modern dashboards and smooth workflow management. Highly satisfied with the results.",
    rating: 5
  },
  {
    id: 4,
    name: "Madhav Sales",
    company: "Madhav Ecommerce",
    image: "https://i.pravatar.cc/150?img=15",
    text: "The Power BI dashboard provided clear business insights and improved our sales tracking process significantly.",
    rating: 5
  },
  {
    id: 5,
    name: "Het, Prince & Romeet",
    company: "Eventia App",
    image: "https://i.pravatar.cc/150?img=12",
    text: "The application and admin panel were developed smoothly with excellent UI and performance. Great communication throughout the project.",
    rating: 5
  },
  {
    id: 6,
    name: "Neha Patel",
    company: "Nexora CRM",
    image: "https://i.pravatar.cc/150?img=43",
    text: "The CRM platform improved our lead and workflow management efficiently. Very professional and reliable team.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonialsData.length - 1;
      if (nextIndex >= testimonialsData.length) return 0;
      return nextIndex;
    });
  };

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <Reveal width="100%">
          <div className="section-header">
             <span className="section-badge">Client Feedback</span>
             <h2 className="section-title">What Our <span className="text-gradient">Clients Say</span></h2>
          </div>
        </Reveal>

        <div className="carousel-container">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="testimonial-card glass-card"
            >
              <FaQuoteLeft className="quote-icon" />
              <div className="stars">
                {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} color="#fbbc05" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonialsData[currentIndex].text}"</p>
              <div className="testimonial-author">
                <img src={testimonialsData[currentIndex].image} alt={testimonialsData[currentIndex].name} />
                <div className="author-info">
                  <h4>{testimonialsData[currentIndex].name}</h4>
                  <span>{testimonialsData[currentIndex].company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button className="nav-btn prev" onClick={() => paginate(-1)}>
              <FaChevronLeft />
            </button>
            <div className="carousel-dots">
              {testimonialsData.map((_, index) => (
                <button 
                  key={index} 
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
            <button className="nav-btn next" onClick={() => paginate(1)}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
