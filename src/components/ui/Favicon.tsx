
import React, { useEffect } from 'react';

const Favicon: React.FC = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create a function to draw a triangle
      const drawTriangle = (x: number, y: number, size: number, fill: string, stroke?: string) => {
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.lineTo(x - size/2, y + size/2);
        ctx.closePath();
        
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        
        ctx.fillStyle = fill;
        ctx.fill();
      };

      // Function to update the favicon with animation
      const updateFavicon = (frame: number) => {
        // Clear canvas
        ctx.clearRect(0, 0, 32, 32);
        
        // Calculate pulsing effect (0-1 range)
        const pulse = Math.sin(frame * 0.05) * 0.1 + 0.9;
        
        // Draw triangles with subtle animation
        // First row
        drawTriangle(8, 8, 8 * pulse, '#222222');
        drawTriangle(16, 8, 8 * (pulse + 0.05), '#FFFFFF', '#222222');
        drawTriangle(24, 8, 8 * (pulse + 0.1), '#FFFFFF', '#222222');
        
        // Second row
        drawTriangle(8, 16, 8 * (pulse + 0.15), '#222222');
        drawTriangle(16, 16, 8 * (pulse + 0.2), '#222222');
        drawTriangle(24, 16, 8 * (pulse + 0.25), '#FFFFFF', '#222222');
        
        // Third row
        drawTriangle(8, 24, 8 * (pulse + 0.3), '#222222');
        drawTriangle(16, 24, 8 * (pulse + 0.35), '#FFFFFF', '#222222');
        drawTriangle(24, 24, 8 * (pulse + 0.4), '#FFFFFF', '#222222');

        // Convert to data URL and update favicon
        const dataUrl = canvas.toDataURL('image/png');
        
        // Find existing favicon or create a new one
        let favicon: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'shortcut icon';
          document.head.appendChild(favicon);
        }
        
        // Update href with our new icon
        favicon.href = dataUrl;
      };

      // Start animation loop
      let frame = 0;
      const animateFavicon = () => {
        updateFavicon(frame);
        frame++;
        requestAnimationFrame(animateFavicon);
      };

      // Start the animation
      animateFavicon();
    }
  }, []);

  return null; // This component doesn't render anything visibly
};

export default Favicon;
