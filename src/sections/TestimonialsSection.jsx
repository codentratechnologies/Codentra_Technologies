import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { testimonialsData } from '../data/siteData';
import SplitText from '../components/ui/SplitText';

export default function TestimonialsSection() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const controls = useAnimationControls();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    
    controls.start({
      x: -width,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear"
      }
    });
  }, [width, controls]);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent rounded-full blur-[128px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10 text-center">
        <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
          Client Success
        </h2>
        <SplitText className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
          Don't Just Take Our <span className="text-gradient">Word For It.</span>
        </SplitText>
      </div>

      <div className="relative z-10 w-full overflow-hidden" ref={carousel}>
        <motion.div 
          animate={controls}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() => controls.start({ x: -width, transition: { repeat: Infinity, duration: 30, ease: "linear" } })}
          className="flex gap-8 px-6 cursor-grab active:cursor-grabbing w-max"
        >
          {/* Double the array for infinite loop effect seamlessly */}
          {[...testimonialsData, ...testimonialsData, ...testimonialsData].map((testimonial, idx) => (
            <motion.div 
              key={idx}
              className="w-[350px] md:w-[450px] shrink-0 glass-card p-10 relative group hover:bg-white/[0.05]"
            >
              <div className="absolute top-6 left-6 text-6xl text-primary/20 font-heading font-black group-hover:text-primary/40 transition-colors duration-500">
                "
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 relative z-10">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{testimonial.name}</h4>
                  <p className="text-sm text-white/50">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
