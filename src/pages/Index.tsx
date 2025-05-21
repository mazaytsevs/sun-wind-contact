
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Technologies from '@/components/Technologies';
import BloggerTestimonials from '@/components/BloggerTestimonials';
import SunGame from '@/components/SunGame';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import AiChat from '@/components/AiChat';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import ConsultationBooking from '@/components/ConsultationBooking';
import NewsSection from '@/components/NewsSection';
import AiProductSupport from '@/components/AiProductSupport';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'ЭкоЭнергия - Энергия будущего уже сегодня';
    
    // Add scroll reveal functionality
    const revealSections = () => {
      const sections = document.querySelectorAll('.section-reveal');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          section.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealSections);
    revealSections(); // Initial check on load
    
    return () => {
      window.removeEventListener('scroll', revealSections);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Technologies />
        <NewsSection />
        <BloggerTestimonials />
        <AiProductSupport />
        <SunGame />
        <AiChat />
        <NewsletterSubscription />
        <ConsultationBooking />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
