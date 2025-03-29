
import React, { memo, useState, useEffect } from 'react';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = memo(({ 
  size = 'medium', 
  showText = true,
  className = '',
  animated = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a small delay to trigger the entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

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

  // Animation classes based on state
  const animationClasses = animated ? 
    `transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : '';

  const hoverEffectClasses = animated ? 
    `transform-gpu transition-all duration-300 ${isHovered ? 'scale-110' : ''}` : '';

  return (
    <div 
      className={`flex items-center ${className} ${animationClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${selected.logoContainer} relative ${hoverEffectClasses}`}>
        {/* Logo with enhanced 3D effect and rotating animation */}
        <div className={`absolute inset-0 perspective-1000`}>
          {/* First row - with gradient and 3D rotation */}
          <div className={`absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-800 to-blue-600 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow' : 'rotate-45'}`}></div>
          <div className={`absolute top-0 left-1/3 w-1/3 h-1/3 bg-white 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-100' : 'rotate-45'}`}></div>
          <div className={`absolute top-0 left-2/3 w-1/3 h-1/3 bg-white 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-200' : 'rotate-45'}`}></div>
          
          {/* Second row - with enhanced shadowing */}
          <div className={`absolute top-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-700 to-blue-500 shadow-lg 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-300' : 'rotate-45'}`}></div>
          <div className={`absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg 
            transform ${animated && isHovered ? 'rotate-45 animate-sparkle' : 'rotate-45'}`}></div>
          <div className={`absolute top-1/3 left-2/3 w-1/3 h-1/3 bg-white shadow-sm 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-400' : 'rotate-45'}`}></div>
          
          {/* Third row - with depth effect */}
          <div className={`absolute top-2/3 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-700 to-blue-500 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-500' : 'rotate-45'}`}></div>
          <div className={`absolute top-2/3 left-1/3 w-1/3 h-1/3 bg-white 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-600' : 'rotate-45'}`}></div>
          <div className={`absolute top-2/3 left-2/3 w-1/3 h-1/3 bg-white 
            transform ${animated && isHovered ? 'rotate-45 animate-pulse-slow delay-700' : 'rotate-45'}`}></div>
        </div>
        
        {/* Highlight overlay for interactive effect */}
        {animated && isHovered && (
          <div className="absolute inset-0 bg-white/20 rounded-full filter blur-md animate-pulse"></div>
        )}
      </div>
      
      {showText && (
        <div className={`font-medium tracking-wide transition-all duration-300 ${animated && isHovered ? 'translate-x-1' : ''}`}>
          <span className={`${selected.text} bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 
            bg-clip-text text-transparent font-semibold ${animated ? 'animate-gradient-x' : ''}`}>
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
