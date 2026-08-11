import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import PageLoader from './components/ui/PageLoader';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Lazy load sections for better initial load performance (code splitting)
const HeroSection = lazy(() => import('./sections/HeroSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const IndustriesSection = lazy(() => import('./sections/IndustriesSection'));
const ProcessSection = lazy(() => import('./sections/ProcessSection'));
const TechnologiesSection = lazy(() => import('./sections/TechnologiesSection'));
const PortfolioSection = lazy(() => import('./sections/PortfolioSection'));
const WhyChooseUsSection = lazy(() => import('./sections/WhyChooseUsSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const FAQSection = lazy(() => import('./sections/FAQSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

function App() {
  return (
    <div className="relative w-full min-h-screen bg-background selection:bg-primary/30 selection:text-white font-sans text-white">
      <PageLoader />

      <Navbar />
      
      <ErrorBoundary>
        <main>
          <Suspense fallback={null}>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <IndustriesSection />
            <ProcessSection />
            <TechnologiesSection />
            <PortfolioSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
          </Suspense>
        </main>
      </ErrorBoundary>

      <Footer />
    </div>
  );
}

export default App;
