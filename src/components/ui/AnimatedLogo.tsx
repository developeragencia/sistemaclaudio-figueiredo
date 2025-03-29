
import React, { memo } from 'react';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = memo(({ 
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
      <div className={`${selected.logoContainer} relative transition-transform duration-300 hover:rotate-12`}>
        {/* Simplified and optimized logo pattern */}
        <div className="absolute inset-0">
          {/* First row - simplified */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-700 transform rotate-45"></div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45"></div>
          <div className="absolute top-0 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45"></div>
          
          {/* Second row - simplified */}
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-blue-700 transform rotate-45"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-blue-600 transform rotate-45"></div>
          <div className="absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45"></div>
          
          {/* Third row - simplified */}
          <div className="absolute top-2/3 left-0 w-1/3 h-1/3 bg-blue-700 transform rotate-45"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45"></div>
          <div className="absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45"></div>
        </div>
      </div>
      
      {showText && (
        <div className="font-medium tracking-wide">
          <span className={`${selected.text} text-blue-800 font-semibold`}>ADVOGADOS ASSOCIADOS</span>
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
