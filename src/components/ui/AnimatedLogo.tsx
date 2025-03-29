
import React, { useState } from 'react';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'medium', 
  showText = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Definir tamanhos com base no prop size
  const dimensions = {
    small: {
      container: 'w-8 h-8',
      logoContainer: 'w-8 h-8',
      text: 'text-sm ml-2'
    },
    medium: {
      container: 'w-12 h-12',
      logoContainer: 'w-12 h-12',
      text: 'text-lg ml-3'
    },
    large: {
      container: 'w-20 h-20',
      logoContainer: 'w-20 h-20',
      text: 'text-2xl ml-4'
    }
  };

  const selected = dimensions[size];

  return (
    <div 
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${selected.logoContainer} relative perspective-1000`}>
        {/* Triângulos animados */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}
        >
          {/* Primeira linha de triângulos */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gray-800 transform rotate-45 animate-pulse-slow"></div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-white border border-gray-300 transform rotate-45 animate-pulse-slow delay-200"></div>
          <div className="absolute top-0 left-2/3 w-1/3 h-1/3 bg-white border border-gray-300 transform rotate-45 animate-pulse-slow delay-300"></div>
          
          {/* Segunda linha de triângulos */}
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gray-800 transform rotate-45 animate-pulse-slow delay-400"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-800 transform rotate-45 animate-pulse-slow delay-500"></div>
          <div className="absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white border border-gray-300 transform rotate-45 animate-pulse-slow delay-600"></div>
          
          {/* Terceira linha de triângulos */}
          <div className="absolute top-2/3 left-0 w-1/3 h-1/3 bg-gray-800 transform rotate-45 animate-pulse-slow delay-700"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white border border-gray-300 transform rotate-45 animate-pulse-slow delay-800"></div>
          <div className="absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-white border border-gray-300 transform rotate-45 animate-pulse-slow delay-900"></div>
        </div>
        
        {/* Overlay glow effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-white/10 rounded-full filter blur-md animate-pulse"></div>
        )}
      </div>
      
      {showText && (
        <div 
          className={`${selected.text} font-medium text-gray-700 tracking-wide transition-all duration-300 ${isHovered ? 'text-black font-semibold' : ''}`}
        >
          ADVOGADOS ASSOCIADOS
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo;
