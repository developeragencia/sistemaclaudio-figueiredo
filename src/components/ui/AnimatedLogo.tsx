
import React from 'react';

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
  
  // Define sizes based on the size prop
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
    <div className={`flex items-center ${className}`}>
      <div className={`${selected.logoContainer} relative hover-scale`}>
        {/* Logo triangular pattern */}
        <div className="absolute inset-0">
          {/* First row of triangles */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-lawyer-800 transform rotate-45"></div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-white border border-lawyer-300 transform rotate-45"></div>
          <div className="absolute top-0 left-2/3 w-1/3 h-1/3 bg-white border border-lawyer-300 transform rotate-45"></div>
          
          {/* Second row of triangles */}
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-lawyer-800 transform rotate-45"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-lawyer-800 transform rotate-45"></div>
          <div className="absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white border border-lawyer-300 transform rotate-45"></div>
          
          {/* Third row of triangles */}
          <div className="absolute top-2/3 left-0 w-1/3 h-1/3 bg-lawyer-800 transform rotate-45"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white border border-lawyer-300 transform rotate-45"></div>
          <div className="absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-white border border-lawyer-300 transform rotate-45"></div>
        </div>
      </div>
      
      {showText && (
        <div className="font-medium tracking-wide">
          <span className={`${selected.text} text-lawyer-800`}>ADVOGADOS ASSOCIADOS</span>
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo;
