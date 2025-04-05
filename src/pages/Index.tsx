
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { CtaSection } from '@/components/landing/cta-section';

const Index = () => {
  useEffect(() => {
    // This would normally be integrated with an analytics service
    console.log('Landing page viewed');

    // Add intersection observer for animation triggers
    const animatedElements = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated-element');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
