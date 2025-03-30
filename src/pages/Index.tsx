
import React, { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import Footer from "@/components/landing/Footer";

const Index: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    carousel: false
  });

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

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection scrollY={scrollY} />
      <FeaturesCarousel isVisible={isVisible.carousel} />
      <Footer />
    </div>
  );
};

export default Index;
