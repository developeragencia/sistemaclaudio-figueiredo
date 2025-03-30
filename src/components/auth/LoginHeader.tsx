
import React from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <AnimatedLogo size="large" showText={true} />
      </div>
      <p className="text-sky-700 text-center">
        Sistema de Auditoria e Gestão Tributária
      </p>
      <div className="mt-4 flex justify-center">
        <Link to="/">
          <Button 
            variant="outline" 
            className="text-sky-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
