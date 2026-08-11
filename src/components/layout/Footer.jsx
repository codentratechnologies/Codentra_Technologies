import { motion } from 'framer-motion';
import { siteConfig } from '../../data/siteData';
import SplitText from '../ui/SplitText';
import MagneticButton from '../ui/MagneticButton';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-background pt-32 pb-10 overflow-hidden" id="contact">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Floating background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-2xl">
                C
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">
                {siteConfig.name}
              </span>
            </motion.div>
            
            <SplitText className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight max-w-md">
              Let's build the future together.
            </SplitText>
            
            <MagneticButton as="a" href={`mailto:${siteConfig.email}`} variant="secondary" className="group">
              Start a project
              <FiArrowUpRight className="ml-2 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">Socials</h4>
            <ul className="space-y-4">
              {Object.entries(siteConfig.socials).map(([platform, url]) => (
                <li key={platform}>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-lg font-medium hover:text-primary transition-colors magnetic inline-block cursor-none capitalize"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-lg font-medium hover:text-primary transition-colors magnetic inline-block cursor-none">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsapp} className="text-lg font-medium hover:text-primary transition-colors magnetic inline-block cursor-none">
                  {siteConfig.displayPhone}
                </a>
              </li>
              <li className="text-lg font-medium text-white/80">
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
