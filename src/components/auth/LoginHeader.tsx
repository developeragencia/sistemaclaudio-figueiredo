
import React from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <AnimatedLogo size="large" showText={true} />
      <p className="text-sky-700 mt-2">
        Sistema de Auditoria e Gestão Tributária
      </p>
    </div>
  );
};

export default LoginHeader;
