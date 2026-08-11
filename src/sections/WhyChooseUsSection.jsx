import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import SplitText from '../components/ui/SplitText';

const reasons = [
  { title: "Elite Engineering", desc: "We don't outsource. Every line of code is written by top-tier in-house engineers." },
  { title: "Scalable Architecture", desc: "Built for growth. Our systems handle millions of requests without breaking a sweat." },
  { title: "Design Excellence", desc: "Award-winning interfaces that captivate users and drive conversions." },
  { title: "Rapid Delivery", desc: "Agile methodologies ensure you get to market faster than the competition." },
];

export default function WhyChooseUsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
            Why Codentra
          </h2>
          <SplitText className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
            The Codentra <span className="text-gradient">Advantage</span>
          </SplitText>
        </div>

        <div className="relative">
          {/* Animated SVG Line connecting cards (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 h-px hidden lg:block -translate-y-1/2 z-0">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="#00E5FF" 
                strokeWidth="2" 
                strokeDasharray="10 10"
                style={{ pathLength, opacity: pathLength }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {reasons.map((reason, idx) => (
              <GlassCard 
                key={idx} 
                delay={idx * 0.2}
                className="p-8 h-full group hover:-translate-y-4 transition-all duration-500 bg-background/50 hover:bg-white/[0.05]"
              >
                {/* Node connector */}
                <div className="absolute top-1/2 -left-4 w-8 h-px bg-primary hidden lg:block group-hover:scale-x-150 origin-left transition-transform" />
                <div className="absolute top-1/2 -right-4 w-8 h-px bg-primary hidden lg:block group-hover:scale-x-150 origin-right transition-transform" />
                
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <span className="text-primary font-heading font-bold">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{reason.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
