
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
    // Use requestAnimationFrame for better performance
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    
    return () => cancelAnimationFrame(frame);
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

  // Performance optimized animation classes
  const animationClasses = animated ? 
    `transition-transform duration-500 ${isLoaded ? 'translate-y-0' : 'translate-y-4'}` : '';

  return (
    <div 
      className={`flex flex-col items-center ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
    >
      <div className={`${selected.width} ${selected.height} ${isHovered ? 'scale-105' : ''} transition-transform duration-200`}>
        <img 
          src="/logo-advogados.svg" 
          alt="Advogados Associados Logo" 
          className="w-full h-full object-contain" 
          loading="eager"
        />
      </div>
      
      {showText && (
        <div className={`mt-2 font-bold tracking-wide ${selected.text} text-blue-800`}>
          ADVOGADOS ASSOCIADOS
        </div>
      )}
    </div>
  );
});

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
