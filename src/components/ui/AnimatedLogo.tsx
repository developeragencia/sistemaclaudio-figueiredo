
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
      text: 'text-sm ml-2 font-bold'
    },
    medium: {
      container: 'w-12 h-12',
      logoContainer: 'w-12 h-12',
      text: 'text-lg ml-3 font-bold'
    },
    large: {
      container: 'w-20 h-20',
      logoContainer: 'w-20 h-20',
      text: 'text-2xl ml-4 font-bold'
    }
  };

  const selected = dimensions[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${selected.logoContainer} relative transition-transform duration-300 hover:rotate-12 drop-shadow-lg`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-inner"></div>
        {/* Enhanced logo pattern with better blue colors */}
        <div className="absolute inset-0">
          {/* First row - enhanced */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600 transform rotate-45 hover:bg-blue-500 transition-colors"></div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-90"></div>
          <div className="absolute top-0 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-80"></div>
          
          {/* Second row - enhanced */}
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-blue-700 transform rotate-45 hover:bg-blue-600 transition-colors"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-blue-500 transform rotate-45 hover:bg-blue-400 transition-colors"></div>
          <div className="absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-90"></div>
          
          {/* Third row - enhanced */}
          <div className="absolute top-2/3 left-0 w-1/3 h-1/3 bg-blue-800 transform rotate-45 hover:bg-blue-700 transition-colors"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-80"></div>
          <div className="absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-blue-100 transform rotate-45 opacity-90"></div>
        </div>
        
        {/* Add subtle highlight/shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-lg"></div>
      </div>
      
      {showText && (
        <div className="font-medium tracking-wide animate-fade-in">
          <span className={`${selected.text} text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 font-extrabold tracking-wider`}>
            ADVOGADOS ASSOCIADOS
          </span>
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
