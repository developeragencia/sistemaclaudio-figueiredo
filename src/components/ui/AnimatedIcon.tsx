
import React, { useState } from 'react';

interface AnimatedIconProps {
  size?: number;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  size = 32,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110' : ''}`}
        style={{ perspective: '1000px' }}
      >
        {/* Container que rotaciona */}
        <div 
          className={`relative w-full h-full transition-transform duration-500 ease-in-out ${isHovered ? 'rotate-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Frente - Logo normal */}
          <div className="absolute inset-0 backface-hidden">
            <svg viewBox="0 0 100 100" width={size} height={size}>
              <polygon 
                points="25,12.5 50,12.5 37.5,25 12.5,25" 
                fill="#222222" 
                className={`transition-all duration-300 ${isHovered ? 'opacity-80' : ''}`} 
              />
              <polygon 
                points="50,12.5 75,12.5 62.5,25 37.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 ${isHovered ? 'opacity-80' : ''}`}
              />
              <polygon 
                points="75,12.5 100,12.5 87.5,25 62.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 ${isHovered ? 'opacity-80' : ''}`}
              />
              
              <polygon 
                points="12.5,25 37.5,25 25,37.5 0,37.5" 
                fill="#222222"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-80' : ''}`}
              />
              <polygon 
                points="37.5,25 62.5,25 50,37.5 25,37.5" 
                fill="#222222"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-80' : ''}`}
              />
              <polygon 
                points="62.5,25 87.5,25 75,37.5 50,37.5" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-80' : ''}`}
              />
              
              <polygon 
                points="0,37.5 25,37.5 12.5,50 -12.5,50" 
                fill="#222222"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-80' : ''}`}
              />
              <polygon 
                points="25,37.5 50,37.5 37.5,50 12.5,50" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-80' : ''}`}
              />
              <polygon 
                points="50,37.5 75,37.5 62.5,50 37.5,50" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-80' : ''}`}
              />
            </svg>
          </div>
          
          {/* Verso - Logo invertida horizontal */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <svg viewBox="0 0 100 100" width={size} height={size}>
              <polygon points="75,12.5 50,12.5 62.5,25 87.5,25" fill="#222222" />
              <polygon points="50,12.5 25,12.5 37.5,25 62.5,25" fill="#FFFFFF" stroke="#222222" strokeWidth="1" />
              <polygon points="25,12.5 0,12.5 12.5,25 37.5,25" fill="#FFFFFF" stroke="#222222" strokeWidth="1" />
              
              <polygon points="87.5,25 62.5,25 75,37.5 100,37.5" fill="#222222" />
              <polygon points="62.5,25 37.5,25 50,37.5 75,37.5" fill="#222222" />
              <polygon points="37.5,25 12.5,25 25,37.5 50,37.5" fill="#FFFFFF" stroke="#222222" strokeWidth="1" />
              
              <polygon points="100,37.5 75,37.5 87.5,50 112.5,50" fill="#222222" />
              <polygon points="75,37.5 50,37.5 62.5,50 87.5,50" fill="#FFFFFF" stroke="#222222" strokeWidth="1" />
              <polygon points="50,37.5 25,37.5 37.5,50 62.5,50" fill="#FFFFFF" stroke="#222222" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedIcon;
