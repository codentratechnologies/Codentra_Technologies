import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { roadmapData } from '../data/siteData';

const ProcessStep = ({ step, idx, total, scrollYProgress }) => {
  const start = idx / total;
  const end = (idx + 1) / total;
  
  const p1 = Math.max(0, start - 0.2);
  const p2 = Math.max(0.0001, start);
  const p3 = Math.min(0.9999, end);
  const p4 = Math.min(1, end + 0.2);
  
  const opacity = useTransform(scrollYProgress, [p1, p2, p3, p4], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [p1, p2, p3, p4], [0.8, 1, 1, 0.8]);
  
  const isEven = idx % 2 === 0;

  return (
    <motion.div 
      style={{ opacity, scale }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Node */}
      <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-background bg-primary md:-translate-x-1/2 shadow-[0_0_20px_rgba(0,229,255,0.5)] z-20" />

      {/* Content Box */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
        <span className="text-primary font-heading font-bold tracking-widest text-sm mb-2 block">
          {step.phase}
        </span>
        <h4 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h4>
        <ul className={`space-y-2 text-white/70 ${isEven ? "md:items-end" : "md:items-start"} flex flex-col`}>
          {step.items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />}
              {item}
              {isEven && <span className="w-1.5 h-1.5 rounded-full bg-primary/50 block md:hidden" />}
              {isEven && <span className="w-1.5 h-1.5 rounded-full bg-primary/50 hidden md:block" />}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-background h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
            Our Process
          </h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold">
            How We Build <span className="text-gradient">Magic</span>
          </h3>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 px-6">
          {/* Progress Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary md:-translate-x-1/2 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-32">
            {roadmapData.map((step, idx) => (
              <ProcessStep 
                key={idx} 
                step={step} 
                idx={idx} 
                total={roadmapData.length} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
