import { useState } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import MagneticButton from '../components/ui/MagneticButton';
import emailjs from '@emailjs/browser';
import { FiSend } from 'react-icons/fi';
import { cn } from '../utils/cn';

const InputField = ({ label, name, type = "text", value, onChange, required = true }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative mb-8">
      <label 
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none text-white/50",
          isActive ? "-top-6 text-xs text-primary" : "top-2 text-base"
        )}
      >
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="w-full bg-transparent border-b border-white/20 focus:border-primary text-white py-2 outline-none resize-none transition-colors duration-300"
          rows={4}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="w-full bg-transparent border-b border-white/20 focus:border-primary text-white py-2 outline-none transition-colors duration-300"
        />
      )}
    </div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Simulate API call for the mockup
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="contact-form">
      
      {/* World Map Background (Stylized) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Copy */}
        <div>
          <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
            Start A Project
          </h2>
          <SplitText className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight">
            Let's Create <br />
            <span className="text-gradient">Something Epic.</span>
          </SplitText>
          <p className="text-lg text-white/60 mb-12 max-w-md">
            Whether you have a fully fleshed out idea or just a concept, we're ready to engineer it into reality. Drop us a line.
          </p>

          <div className="space-y-6">
            <div className="glass-card p-6 inline-block">
              <h4 className="text-sm text-white/50 mb-1 uppercase tracking-widest">Email</h4>
              <a href="mailto:codentratechnologies@gmail.com" className="text-xl font-bold hover:text-primary transition-colors">
                codentratechnologies@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md z-20 text-center px-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl mb-6">
                ✓
              </div>
              <h3 className="text-3xl font-heading font-bold mb-2">Message Received</h3>
              <p className="text-white/60">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit} className="relative z-10">
            <InputField 
              label="Your Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
            <InputField 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
            <InputField 
              label="Tell us about your project" 
              name="message" 
              type="textarea" 
              value={formData.message} 
              onChange={handleChange} 
            />
            
            <div className="mt-12">
              <MagneticButton 
                variant="primary" 
                className="w-full flex justify-between items-center group"
                type="submit"
                disabled={status === 'loading'}
              >
                <span className="text-lg font-bold">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </span>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-black/20 transition-all">
                  <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </MagneticButton>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
