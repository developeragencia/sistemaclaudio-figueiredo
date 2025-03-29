
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
      container: 'w-24 h-24',
      logoContainer: 'w-24 h-24',
      text: 'text-3xl ml-4 font-extrabold'
    }
  };

  const selected = dimensions[size];

  return (
    <div className={`flex flex-col sm:flex-row items-center ${className}`}>
      <div 
        className={`${selected.logoContainer} relative transition-transform duration-500 hover:rotate-12 drop-shadow-xl`}
        style={{ filter: 'drop-shadow(0 10px 15px rgba(37, 99, 235, 0.3))' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg shadow-lg"></div>
        {/* Enhanced logo pattern with better blue colors */}
        <div className="absolute inset-0">
          {/* First row - enhanced */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600 transform rotate-45 hover:bg-blue-500 transition-colors"></div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-90 hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-80 hover:opacity-90 transition-opacity"></div>
          
          {/* Second row - enhanced */}
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-blue-700 transform rotate-45 hover:bg-blue-600 transition-colors"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-blue-500 transform rotate-45 hover:bg-blue-400 transition-colors"></div>
          <div className="absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-90 hover:opacity-100 transition-opacity"></div>
          
          {/* Third row - enhanced */}
          <div className="absolute top-2/3 left-0 w-1/3 h-1/3 bg-blue-800 transform rotate-45 hover:bg-blue-700 transition-colors"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white transform rotate-45 opacity-80 hover:opacity-90 transition-opacity"></div>
          <div className="absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-blue-100 transform rotate-45 opacity-90 hover:opacity-100 transition-opacity"></div>
        </div>
        
        {/* Add enhanced highlight/shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 rounded-lg animate-pulse"></div>
      </div>
      
      {showText && (
        <div className={`mt-3 sm:mt-0 font-medium tracking-widest animate-fade-in ${size === 'large' ? 'ml-0 sm:ml-6' : ''}`}>
          <span className={`${selected.text} text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 font-extrabold tracking-wider`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
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
