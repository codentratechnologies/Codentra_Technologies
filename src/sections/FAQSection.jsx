import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import { FiPlus } from 'react-icons/fi';

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our project timelines vary depending on complexity. A standard web application takes 8-12 weeks from discovery to deployment. We work in agile sprints, providing continuous updates and functional builds every two weeks."
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Absolutely. We offer comprehensive SLA-based support packages to ensure your application remains secure, updated, and optimized for performance as your user base grows."
  },
  {
    question: "What tech stack do you primarily use?",
    answer: "We specialize in modern JavaScript ecosystems (React, Next.js, Node.js), native-like mobile apps with Flutter, and robust backends using Python, PostgreSQL, and AWS cloud infrastructure."
  },
  {
    question: "How do you ensure the security of our application?",
    answer: "Security is built into our CI/CD pipeline. We implement robust authentication, data encryption at rest and in transit, regular vulnerability scanning, and strict adherence to OWASP guidelines."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
            Knowledge Base
          </h2>
          <SplitText className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </SplitText>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-primary/30 cursor-pointer"
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            >
              <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${openIndex === idx ? 'text-primary' : 'text-white'}`}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${openIndex === idx ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}
                >
                  <FiPlus />
                </motion.div>
              </div>
              
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-white/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
