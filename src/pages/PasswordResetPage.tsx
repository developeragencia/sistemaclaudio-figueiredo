
import React from 'react';
import { motion } from 'framer-motion';
import LoginHeader from '@/components/auth/LoginHeader';
import PasswordReset from '@/components/auth/PasswordReset';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function PasswordResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <LoginHeader />
        
        <div className="mb-4">
          <Link 
            to="/login" 
            className="text-sky-600 hover:text-sky-800 text-sm flex items-center transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para o login
          </Link>
        </div>
        
        <PasswordReset />
        
        {/* Developer attribution */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 font-medium"
            >
              Alex Developer
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PasswordResetPage;
