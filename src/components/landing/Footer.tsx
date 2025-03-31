
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-b from-lawyer-50 to-lawyer-100 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky-100 opacity-40 filter blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-30 filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <motion.div 
            className="col-span-1 md:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLogo size="small" />
              <h3 className="text-lawyer-800 font-bold text-lg">Advogados Associados</h3>
            </div>
            <p className="text-lawyer-600 mb-6 max-w-md">
              Soluções completas para gestão tributária, recuperação de impostos e consultoria fiscal para escritórios de advocacia e empresas.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 text-sky-600 hover:text-sky-700"
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lawyer-800 font-bold mb-5">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Início', 'Sobre Nós', 'Serviços', 'Blog', 'Contato'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-lawyer-600 hover:text-sky-600 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lawyer-800 font-bold mb-5">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-sky-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-lawyer-600">
                  Av. Paulista, 1000<br />
                  São Paulo, SP<br />
                  01310-000
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-sky-600 mr-3 flex-shrink-0" />
                <span className="text-lawyer-600">(11) 3000-5000</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-sky-600 mr-3 flex-shrink-0" />
                <a href="mailto:contato@advogadosassociados.com" className="text-lawyer-600 hover:text-sky-600 transition-colors">
                  contato@advogados.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-lawyer-200/50 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lawyer-600 text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Advogados Associados. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-lawyer-500">
            <Link to="#" className="hover:text-lawyer-800 transition-colors">Termos de Uso</Link>
            <span className="hidden md:inline">•</span>
            <Link to="#" className="hover:text-lawyer-800 transition-colors">Política de Privacidade</Link>
            <span className="hidden md:inline">•</span>
            <Link to="#" className="hover:text-lawyer-800 transition-colors">Cookies</Link>
          </div>
        </motion.div>
        
        <motion.div
          className="text-center mt-8 text-sm text-lawyer-500"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lawyer-700 hover:text-sky-600 transition-colors duration-300 font-medium"
            >
              Alex Developer
            </a>
          </p>
        </motion.div>
      </div>
      
      {/* Subtle footer line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lawyer-100/0 via-lawyer-300/30 to-lawyer-100/0"></div>
    </footer>
  );
};

export default Footer;
