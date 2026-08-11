import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { stats, siteConfig } from '../data/siteData';
import GlassCard from '../components/ui/GlassCard';
import SplitText from '../components/ui/SplitText';

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  
  return (
    <section id="about" ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading">
              About Codentra
            </h2>
            <SplitText className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              We Don't Just Build Software. We Engineer <span className="text-gradient">Success.</span>
            </SplitText>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
            >
              We are a team of passionate engineers, designers, and strategists pushing the boundaries of what's possible on the web and mobile. We transform complex challenges into elegant, scalable digital solutions.
            </motion.p>
          </div>

          {/* Image Parallax */}
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden glass p-2 group">
            <motion.div style={{ y, scale }} className="w-full h-full relative rounded-2xl overflow-hidden">
              <img 
                src={siteConfig.aboutImage} 
                alt="Team" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="absolute -bottom-8 -left-8 glass-card p-6 border-primary/30 z-20 hidden md:block"
            >
              <p className="text-4xl font-heading font-bold text-primary mb-1">Top 1%</p>
              <p className="text-sm text-white/70 font-medium">Engineering Talent</p>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-5xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
              <p className="text-sm text-white/60">{stat.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
