
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { 
  ArrowRight,
  ChevronDown,
  BarChart3,
  Calculator,
  Database,
  LayoutDashboard,
  FileSearch,
  Shield
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    carousel: false
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Handle scroll for animations
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
    // Trigger once on mount to check initial positions
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with hover effect */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <AnimatedLogo size="medium" />
          </div>
          <Link to="/login">
            <Button 
              variant="default" 
              className="bg-lawyer-800 hover:bg-lawyer-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </header>

      {/* Enhanced Hero Section with parallax effect */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-sky-50/40 to-white pointer-events-none"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`, 
            transition: 'transform 0.2s ease-out' 
          }}
        ></div>
        
        {/* Animated background elements */}
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
          className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-100/20 filter blur-xl"
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-lawyer-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Sistema de <span className="text-sky-600 relative">
                  Gestão Tributária
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-sky-400"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                  ></motion.span>
                </span> para Escritórios de Advocacia
              </motion.h1>
              
              <motion.p 
                className="text-xl text-lawyer-600 max-w-xl mb-10 leading-relaxed"
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
                  className="absolute -bottom-4 -left-4 bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  Recuperação de Impostos
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated scroll indicator */}
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
              onClick={() => {
                document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ChevronDown className="h-8 w-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Feature Carousel Section */}
      <motion.section 
        id="carousel-section"
        className="py-16 bg-gradient-to-br from-sky-100 to-sky-50/80 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isVisible.carousel ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-200/30 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-purple-200/20 filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.carousel ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-lawyer-800"
            >
              Sistema Completo para Gestão Tributária
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lawyer-600 md:text-lg max-w-2xl mx-auto"
            >
              Ferramenta especializada para escritórios que buscam excelência em consultoria fiscal
            </motion.p>
          </motion.div>
          
          {/* Enhanced carousel with 3D effects */}
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={item.title} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <motion.div 
                      className={`h-full rounded-xl overflow-hidden bg-gradient-to-br from-${item.colorFrom}-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-${item.colorFrom}-500 perspective-1000`}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.03,
                        rotateY: 5,
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <div className="p-6 flex flex-col h-full">
                        <motion.div 
                          className={`rounded-full bg-${item.colorFrom}-100 p-3 w-12 h-12 flex items-center justify-center mb-4`}
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <item.icon className={`w-6 h-6 text-${item.colorFrom}-600`} />
                        </motion.div>
                        <h3 className="text-xl font-bold text-lawyer-800 mb-2">{item.title}</h3>
                        <p className="text-lawyer-600 mb-4 flex-grow">{item.description}</p>
                        <Link to={item.link} className="mt-auto">
                          <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                          >
                            <Button 
                              variant="outline" 
                              className={`border-${item.colorFrom}-200 hover:border-${item.colorFrom}-400 text-${item.colorFrom}-700 hover:text-${item.colorFrom}-800 hover:bg-${item.colorFrom}-50 w-full group`}
                            >
                              {item.buttonText}
                              <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`} />
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-8 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="shadow-lg"
                >
                  <CarouselPrevious className="static transform-none bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white border-none h-12 w-12" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="shadow-lg"
                >
                  <CarouselNext className="static transform-none bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white border-none h-12 w-12" />
                </motion.div>
              </div>
            </Carousel>
          </div>
          
          {/* Carousel indicators */}
          <div className="carousel-dots mt-8 flex justify-center items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="carousel-dot w-3 h-3 rounded-full bg-sky-200 cursor-pointer"
                whileHover={{ scale: 1.3 }}
                animate={{ 
                  backgroundColor: i === 0 ? 'rgb(14 165 233)' : 'rgb(186 230 253)', 
                  scale: i === 0 ? 1.2 : 1 
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Footer with animation */}
      <footer className="bg-gradient-to-br from-lawyer-800 to-lawyer-900 text-white py-16 relative overflow-hidden">
        {/* Animated particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          />
        ))}
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mb-6 md:mb-0"
            >
              <Link to="/" className="flex items-center">
                <AnimatedLogo size="medium" />
                <span className="ml-2 text-xl font-bold">Advogados Associados</span>
              </Link>
              <p className="text-lawyer-200 mt-3 max-w-md">
                Soluções jurídicas especializadas em direito tributário, recuperação de créditos e consultoria fiscal para empresas.
              </p>
            </motion.div>
            
            <div className="flex flex-col items-end">
              <p className="text-lawyer-200 mb-3">
                Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 transition-colors font-medium">Alex Developer</a>
              </p>
              <div className="flex space-x-4">
                {socialIcons.map((social, index) => (
                  <motion.a 
                    key={index}
                    href="#" 
                    className="text-lawyer-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 pt-10 border-t border-lawyer-700 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-lawyer-300">
              © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

// Carousel items data
const carouselItems = [
  {
    title: "Painel Administrador",
    description: "Controle total sobre todas as operações em uma interface intuitiva e completa",
    icon: LayoutDashboard,
    link: "/dashboard",
    buttonText: "Acessar Painel",
    colorFrom: "blue"
  },
  {
    title: "Cálculos e Recuperação",
    description: "Identifique e recupere créditos tributários com precisão e segurança jurídica",
    icon: Calculator,
    link: "/irrf-calculations",
    buttonText: "Iniciar Cálculos",
    colorFrom: "green"
  },
  {
    title: "Importação de Dados",
    description: "Importe e processe dados de diversas fontes com facilidade e segurança",
    icon: FileSearch,
    link: "/operational-import",
    buttonText: "Importar Dados",
    colorFrom: "purple"
  },
  {
    title: "Auditoria Tributária",
    description: "Análises detalhadas e completas para garantir conformidade fiscal",
    icon: Shield,
    link: "/tax-audit",
    buttonText: "Iniciar Auditoria",
    colorFrom: "amber"
  },
  {
    title: "Sistema Operacional",
    description: "Gestão completa das operações diárias com automação e controle",
    icon: Database,
    link: "/operational-dashboard",
    buttonText: "Ver Operações",
    colorFrom: "cyan"
  }
];

// Social icons
const socialIcons = [
  {
    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  },
  {
    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  },
  {
    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.504.344-1.857.182-.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.043v.08c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  },
  {
    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  }
];

export default Index;
