import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const industries = [
  "Fintech", "Healthcare", "E-Commerce", "Logistics", "EdTech", "Real Estate", "Web3", "AI & ML"
];

export default function IndustriesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
          Industries We Empower
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-8 -rotate-3 scale-110">
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex gap-8 whitespace-nowrap">
          {[...industries, ...industries, ...industries].map((ind, i) => (
            <div key={i} className="text-6xl md:text-8xl font-heading font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:2px_#00E5FF] hover:text-primary transition-all duration-300 cursor-default uppercase">
              {ind}
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex gap-8 whitespace-nowrap">
          {[...industries.reverse(), ...industries, ...industries].map((ind, i) => (
            <div key={i} className="text-6xl md:text-8xl font-heading font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:2px_#6d28d9] hover:text-accent transition-all duration-300 cursor-default uppercase">
              {ind}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
