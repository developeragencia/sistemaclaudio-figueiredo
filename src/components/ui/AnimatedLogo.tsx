
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
      width: 'w-16',
      height: 'h-8',
      text: 'text-sm'
    },
    medium: {
      width: 'w-24',
      height: 'h-12',
      text: 'text-base'
    },
    large: {
      width: 'w-40',
      height: 'h-20',
      text: 'text-xl'
    }
  };

  const selected = dimensions[size];

  // Animation classes based on state
  const animationClasses = animated ? 
    `transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : '';

  const hoverEffectClasses = animated ? 
    `transition-all duration-300 ${isHovered ? 'scale-105' : ''}` : '';

  return (
    <div 
      className={`flex flex-col items-center ${className} ${animationClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${selected.width} ${selected.height} ${hoverEffectClasses}`}>
        <img 
          src="/logo-advogados.svg" 
          alt="Advogados Associados Logo" 
          className={`w-full h-full object-contain ${animated && isHovered ? 'animate-pulse' : ''}`} 
        />
      </div>
      
      {showText && (
        <div className={`mt-2 font-bold tracking-wide ${selected.text} bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent ${animated ? 'animate-gradient-x' : ''}`}>
          ADVOGADOS ASSOCIADOS
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
