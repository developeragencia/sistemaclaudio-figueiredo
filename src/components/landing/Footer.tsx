
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-lawyer-900 to-sky-900 text-white py-10 relative">
      <div className="container mx-auto px-6">
        {/* Social Media Icons */}
        <motion.div 
          className="flex justify-center gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
          <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
          <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
          <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com" />
        </motion.div>
        
        {/* Copyright Text */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sky-200 text-sm">
            © 2025 Advogados Associados. Todos os direitos reservados.
          </p>
          <p className="text-sky-300 text-sm mt-2">
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-100 hover:text-white transition-colors duration-300"
            >
              Alex Developer
            </a>
          </p>
        </motion.div>
        
        {/* Subtle footer line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-900/0 via-sky-400/30 to-sky-900/0"></div>
      </div>
    </footer>
  );
};

// Social Icon Component
const SocialIcon: React.FC<{ icon: React.ReactNode, href: string }> = ({ icon, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-sky-800/50 hover:bg-sky-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/20"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

export default Footer;
