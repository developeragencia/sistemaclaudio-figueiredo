
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useTransform, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  ChevronDown, 
  BarChart2, 
  FileText, 
  Calculator, 
  Database, 
  ShieldCheck,
  ArrowUpRight,
  PieChart,
  TrendingUp,
  Check
} from "lucide-react";

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const scrollToCarousel = () => {
    document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Transform values based on scroll
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const imageY = useTransform(scrollY, [0, 300], [0, 20]);
  
  // Spring animations for smoother transitions
  const smoothY = useSpring(headerY, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(headerOpacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(imageScale, { stiffness: 100, damping: 25 });
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 25 });

  // Floating icons with staggered animation
  const floatingIcons = [
    { icon: <BarChart2 size={22} />, delay: 0, x: '15%', y: '25%', color: "text-sky-500/70" },
    { icon: <Calculator size={22} />, delay: 1.2, x: '85%', y: '15%', color: "text-blue-500/70" },
    { icon: <FileText size={18} />, delay: 2.4, x: '75%', y: '75%', color: "text-indigo-500/70" },
    { icon: <Database size={20} />, delay: 3.6, x: '20%', y: '65%', color: "text-sky-600/70" },
    { icon: <ShieldCheck size={24} />, delay: 4.8, x: '60%', y: '85%', color: "text-green-500/70" },
    { icon: <PieChart size={20} />, delay: 6, x: '25%', y: '35%', color: "text-purple-500/70" },
    { icon: <TrendingUp size={18} />, delay: 7.2, x: '45%', y: '55%', color: "text-orange-500/70" },
  ];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 lg:min-h-screen lg:flex lg:items-center relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.08), transparent 40%)",
          opacity: 0.8,
          y: smoothY,
        }}
      />
      
      {/* Animated blobs */}
      <motion.div 
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-sky-100/30 to-blue-100/30 filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-100/20 to-sky-100/20 filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute z-10 ${item.color}`}
          style={{
            left: item.x,
            top: item.y,
            boxShadow: "0 0 20px rgba(255,255,255,0.8)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.7, 1.1, 0.7],
            y: `calc(${item.y} - 20px)`,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 lg:pr-10"
            style={{ y: smoothY, opacity: smoothOpacity }}
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
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block">Sistema de</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Gestão Tributária
                </span>
                <motion.span 
                  className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sky-400/80 to-blue-500/80"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2, duration: 1 }}
                ></motion.span>
              </span>
              <span className="block">para Escritórios de Advocacia</span>
            </motion.h1>
            
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
            
            <motion.div 
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
                      ['bg-sky-400', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500'][i-1]
                    }`}
                  >
                    <span className="text-white text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-sky-700">+500</span> empresas confiam em nosso sistema
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            style={{ scale: smoothScale, y: smoothImageY }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-white to-sky-50 rounded-2xl shadow-2xl border border-sky-100/50 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                duration: 1,
                bounce: 0.4,
                delay: 0.5
              }}
              whileHover={{ 
                boxShadow: "0 25px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 16px -3px rgba(0, 0, 0, 0.1)",
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Status label */}
              <motion.div 
                className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-20 flex items-center gap-1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10, 
                  delay: 1.5 
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>Online</span>
              </motion.div>
              
              {/* Glare effect */}
              <motion.div 
                className="absolute -inset-full z-10 bg-gradient-to-tr from-white via-white to-transparent opacity-30"
                animate={{ 
                  left: ["100%", "-100%"],
                  top: ["100%", "-100%"], 
                }}
                transition={{ 
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 7
                }}
              />
              
              <div className="p-6 relative z-0">
                <img 
                  src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" 
                  alt="Dashboard Preview" 
                  className="rounded-lg w-full object-cover shadow-inner"
                />
                
                {/* Gradient overlays for effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent mix-blend-overlay rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 mix-blend-overlay rounded-lg" />
              </div>
              
              {/* Feature callout */}
              <motion.div 
                className="absolute -bottom-6 -left-6 flex items-center bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-3 rounded-xl shadow-2xl shadow-sky-500/20"
                initial={{ scale: 0, rotate: -10, x: -20, y: 20 }}
                animate={{ scale: 1, rotate: 0, x: 0, y: 0 }}
                transition={{ 
                  delay: 1.0, 
                  type: "spring", 
                  stiffness: 100 
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.4), 0 8px 10px -6px rgba(14, 165, 233, 0.2)"
                }}
              >
                <motion.div
                  className="mr-3"
                  animate={{ 
                    rotateZ: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut", 
                    repeatDelay: 1
                  }}
                >
                  <BarChart2 className="h-6 w-6" />
                </motion.div>
                <div>
                  <h4 className="font-bold">Recuperação de Impostos</h4>
                  <p className="text-xs text-sky-100">Cálculos precisos e seguros</p>
                </div>
              </motion.div>
              
              {/* Security badge */}
              <motion.div 
                className="absolute -top-5 -left-5 bg-white p-3 rounded-full shadow-lg shadow-sky-200/50"
                initial={{ scale: 0, x: 20, y: 20 }}
                animate={{ scale: 1, x: 0, y: 0 }}
                transition={{ 
                  delay: 1.2, 
                  type: "spring", 
                  stiffness: 200 
                }}
              >
                <div className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-full p-2">
                  <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-full w-8 h-8 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.button
            className="text-sky-600 flex flex-col items-center gap-1 cursor-pointer"
            onClick={scrollToCarousel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Conhecer recursos</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
