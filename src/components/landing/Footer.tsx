
import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-lawyer-900 to-sky-900 text-white py-8 relative">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
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

export default Footer;
