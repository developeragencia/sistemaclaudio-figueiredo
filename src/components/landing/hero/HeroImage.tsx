
import React from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

interface HeroImageProps {
  scrollY: number;
}

const HeroImage: React.FC<HeroImageProps> = ({ scrollY }) => {
  // Transform values based on scroll using direct calculations
  const imageScale = 1 + (scrollY * 0.0003); // Simple scale calculation
  const imageY = scrollY * 0.07; // Simple Y translation calculation

  return (
    <motion.div 
      className="lg:w-1/2"
      style={{ 
        scale: imageScale,
        y: imageY
      }}
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
              <ShieldIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Inline SVG for the shield icon to avoid another import
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default HeroImage;
