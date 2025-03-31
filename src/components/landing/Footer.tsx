
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-lawyer-50 to-lawyer-100 py-8 relative overflow-hidden">
      {/* Subtle footer line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lawyer-100/0 via-lawyer-300/30 to-lawyer-100/0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <p className="text-lawyer-600 text-sm mb-2">
            © {currentYear} Advogados Associados. Todos os direitos reservados.
          </p>
          <p className="text-sm text-lawyer-500">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
