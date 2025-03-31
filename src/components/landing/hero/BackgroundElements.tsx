
import React from "react";
import { motion, MotionValue } from "framer-motion";
import {
  BarChart2,
  Calculator,
  FileText,
  Database,
  ShieldCheck,
  PieChart,
  TrendingUp,
} from "lucide-react";

interface BackgroundElementsProps {
  scrollYProgress: MotionValue<number>;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ scrollYProgress }) => {
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
    <>
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.08), transparent 40%)",
          opacity: 0.8,
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
    </>
  );
};

export default BackgroundElements;
