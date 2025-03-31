
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import BackgroundElements from "./hero/BackgroundElements";
import AnimatedHeading from "./hero/AnimatedHeading";
import HeroImage from "./hero/HeroImage";
import ClientStats from "./hero/ClientStats";
import ScrollIndicator from "./hero/ScrollIndicator";

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const scrollToCarousel = () => {
    document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get scroll values using framer-motion's useScroll
  const { scrollYProgress } = useScroll();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 lg:min-h-screen lg:flex lg:items-center relative overflow-hidden">
      {/* Background elements extracted to a separate component */}
      <BackgroundElements scrollYProgress={scrollYProgress} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 lg:pr-10"
            style={{ 
              y: scrollY * -0.2, // Simple calculation based on scrollY prop
              opacity: Math.max(1 - scrollY * 0.003, 0) // Fade out based on scroll
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-4 inline-flex items-center space-x-2 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-600 px-4 py-1.5 rounded-full text-sm font-medium border border-sky-100/50 shadow-sm"
            >
              <motion.span 
                className="w-5 h-5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.span>
              <span>Sistema Completo de Gestão Tributária</span>
            </motion.div>
            
            {/* Animated heading extracted to a separate component */}
            <AnimatedHeading />
            
            <motion.p 
              className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos com segurança jurídica.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white transition-all duration-300 shadow-md hover:shadow-lg border-0 w-full sm:w-auto group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Acessar Sistema 
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-sky-700 border-sky-200 hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 w-full sm:w-auto"
                  onClick={scrollToCarousel}
                >
                  Explorar Recursos
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Client stats extracted to a separate component */}
            <ClientStats />
          </motion.div>
          
          {/* Hero image extracted to a separate component */}
          <HeroImage scrollY={scrollY} />
        </div>
        
        {/* Scroll indicator extracted to a separate component */}
        <ScrollIndicator scrollToCarousel={scrollToCarousel} />
      </div>
    </section>
  );
};

export default HeroSection;
