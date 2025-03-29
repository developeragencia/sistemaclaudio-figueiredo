
import React, { useEffect } from 'react';

const Favicon: React.FC = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Função para desenhar um triângulo
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

      // Fundo transparente
      ctx.clearRect(0, 0, 32, 32);

      // Desenhar os triângulos geometricamente formando o logo
      // Primeira linha
      drawTriangle(8, 8, 8, '#222222');
      drawTriangle(16, 8, 8, '#FFFFFF', '#222222');
      drawTriangle(24, 8, 8, '#FFFFFF', '#222222');
      
      // Segunda linha
      drawTriangle(8, 16, 8, '#222222');
      drawTriangle(16, 16, 8, '#222222');
      drawTriangle(24, 16, 8, '#FFFFFF', '#222222');
      
      // Terceira linha
      drawTriangle(8, 24, 8, '#222222');
      drawTriangle(16, 24, 8, '#FFFFFF', '#222222');
      drawTriangle(24, 24, 8, '#FFFFFF', '#222222');

      // Converter para data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Encontrar o favicon existente ou criar um novo
      let favicon: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'shortcut icon';
        document.head.appendChild(favicon);
      }
      
      // Atualizar o href com nosso novo ícone
      favicon.href = dataUrl;
    }
  }, []);

  return null; // Este componente não renderiza nada visivelmente
};

export default Favicon;
