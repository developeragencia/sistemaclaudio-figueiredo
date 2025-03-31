
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    carousel: false
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
      
      const carouselSection = document.getElementById('carousel-section');
      
      if (carouselSection) {
        const carouselPosition = carouselSection.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          carousel: carouselPosition.top < window.innerHeight - 100
        }));
      }
    };

    // Initialize visibility check
    setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Decorative circles and shapes */}
          <div className="absolute top-24 left-10 w-32 h-32 rounded-full border border-sky-100"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-lawyer-100"></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 rounded-full border border-sky-200"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-sky-50/30"></div>
          <div className="absolute bottom-32 right-20 w-20 h-20 rounded-full bg-lawyer-50/20"></div>
        </div>
      </div>

      <Header />
      <div id="hero-section">
        <HeroSection scrollY={scrollY} />
      </div>
      <div id="carousel-section">
        <FeaturesCarousel isVisible={isVisible.carousel} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
