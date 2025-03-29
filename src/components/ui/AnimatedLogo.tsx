
import React, { memo, useEffect, useState } from 'react';

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
      container: 'w-24 h-24',
      logoContainer: 'w-24 h-24',
      text: 'text-2xl ml-4'
    }
  };

  const selected = dimensions[size];
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Trigger animation sequence on load if animated prop is true
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setAnimationClass('animate-in');
        
        // Reset animation periodically
        const interval = setInterval(() => {
          setAnimationClass('animate-pulse');
          setTimeout(() => {
            setAnimationClass('animate-in');
          }, 2000);
        }, 8000);
        
        return () => {
          clearInterval(interval);
        };
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const handleLogoHover = () => {
    if (!isAnimating) return;
    setAnimationClass('animate-bounce');
    setTimeout(() => {
      setAnimationClass('animate-in');
    }, 1000);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        className={`${selected.logoContainer} relative transition-all duration-500 group ${animationClass}`}
        onMouseEnter={handleLogoHover}
      >
        {/* 3D effect with layered triangles */}
        <div className="absolute inset-0 transform transition-all duration-500 group-hover:rotate-12">
          {/* Shadow layer */}
          <div className="absolute left-1 top-1 w-full h-full opacity-20 blur-sm">
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`shadow-${i}`} className="relative bg-blue-900 transform rotate-45"></div>
              ))}
            </div>
          </div>

          {/* Main logo grid - with reflection effect */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 w-full h-full gap-0.5 bg-gradient-to-br from-blue-100 to-white p-0.5 rounded-sm">
            {/* First row */}
            <div className="bg-blue-700 transform rotate-45 transition-all duration-300 hover:bg-blue-600"></div>
            <div className="bg-white border border-blue-200 transform rotate-45 transition-all duration-300 hover:bg-blue-50"></div>
            <div className="bg-white border border-blue-200 transform rotate-45 transition-all duration-300 hover:bg-blue-50"></div>
            
            {/* Second row */}
            <div className="bg-blue-700 transform rotate-45 transition-all duration-300 hover:bg-blue-600"></div>
            <div className="bg-blue-600 transform rotate-45 transition-all duration-300 hover:bg-blue-500"></div>
            <div className="bg-white border border-blue-200 transform rotate-45 transition-all duration-300 hover:bg-blue-50"></div>
            
            {/* Third row */}
            <div className="bg-blue-700 transform rotate-45 transition-all duration-300 hover:bg-blue-600"></div>
            <div className="bg-white border border-blue-200 transform rotate-45 transition-all duration-300 hover:bg-blue-50"></div>
            <div className="bg-white border border-blue-200 transform rotate-45 transition-all duration-300 hover:bg-blue-50"></div>
          </div>
        </div>

        {/* Reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-full group-hover:translate-x-0 transform ease-in-out"></div>
      </div>
      
      {showText && (
        <div className="font-medium tracking-wide overflow-hidden">
          <span 
            className={`${selected.text} text-blue-800 font-bold inline-block transition-all duration-500 ${isAnimating ? 'animate-in' : ''}`}
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              background: 'linear-gradient(180deg, #1e40af, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
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
