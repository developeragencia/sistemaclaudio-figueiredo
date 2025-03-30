
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const scrollToCarousel = () => {
    document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-sky-50/40 to-white pointer-events-none"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`, 
          transition: 'transform 0.2s ease-out' 
        }}
      ></div>
      
      <motion.div 
        className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-sky-100/30 filter blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-100/20 filter blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              duration: 0.8,
              bounce: 0.4
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Sistema de <span className="text-sky-600 relative">
                Gestão Tributária
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span> para Escritórios de Advocacia
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-sky-600 hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-xl w-full sm:w-auto"
                  >
                    Acessar Sistema <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              duration: 0.8,
              bounce: 0.4,
              delay: 0.3
            }}
          >
            <motion.div 
              className="relative bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-500"
              initial={{ rotate: 2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" 
                alt="Dashboard Preview" 
                className="rounded-lg w-full object-cover"
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                Recuperação de Impostos
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-sky-600 cursor-pointer"
            onClick={scrollToCarousel}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
