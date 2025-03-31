
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], ["0px", "8px"]);
  const headerBg = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"]
  );

  useEffect(() => {
    const updateScrollStatus = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScrollStatus);
    return () => window.removeEventListener("scroll", updateScrollStatus);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
      style={{ 
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur})`,
        backgroundColor: headerBg
      }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedLogo size="medium" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/login">
            <Button 
              variant="default" 
              className={`
                transition-all duration-300 transform
                ${isScrolled 
                  ? "bg-sky-600 hover:bg-sky-500" 
                  : "bg-sky-600/90 hover:bg-sky-500/90"}
                text-white hover:scale-105 hover:shadow-md
              `}
            >
              Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
