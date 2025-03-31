
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Index: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    carousel: false,
    testimonials: false,
    cta: false
  });
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = {
        carousel: document.getElementById('carousel-section'),
        testimonials: document.getElementById('testimonials-section'),
        cta: document.getElementById('cta-section')
      };
      
      for (const [key, section] of Object.entries(sections)) {
        if (section) {
          const position = section.getBoundingClientRect();
          setIsVisible(prev => ({
            ...prev,
            [key]: position.top < window.innerHeight - 100
          }));
        }
      }
    };

    // Initialize visibility check
    setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-sky-50/30 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-100/30 filter blur-[100px]"
            animate={{ 
              x: [50, -20, 50], 
              y: [-50, 20, -50],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-100/20 filter blur-[80px]"
            animate={{ 
              x: [-30, 40, -30], 
              y: [40, -40, 40],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 25,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full border-2 border-sky-300/40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-2/3 right-1/4 w-4 h-4 rounded-full bg-sky-400/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        </div>

        <Header />
        
        <main>
          <HeroSection scrollY={scrollY} />
          
          <motion.div 
            id="carousel-section"
            style={{
              opacity: isVisible.carousel ? 1 : 0.5,
              y: isVisible.carousel ? 0 : 20,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
            }}
          >
            <FeaturesCarousel isVisible={isVisible.carousel} />
          </motion.div>
          
          <motion.div 
            id="testimonials-section"
            style={{
              opacity: isVisible.testimonials ? 1 : 0.5,
              y: isVisible.testimonials ? 0 : 20,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
            }}
          >
            <TestimonialsSection isVisible={isVisible.testimonials} />
          </motion.div>
          
          <motion.div 
            id="cta-section"
            style={{
              opacity: isVisible.cta ? 1 : 0.5,
              y: isVisible.cta ? 0 : 20,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
            }}
          >
            <CtaSection isVisible={isVisible.cta} />
          </motion.div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
