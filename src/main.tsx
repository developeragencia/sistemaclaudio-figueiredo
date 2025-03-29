
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Use passive event listeners to improve scrolling performance
document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('wheel', () => {}, { passive: true });

// Optimize critical resource loading
const preloadResources = [
  { href: '/logo-advogados.svg', as: 'image' },
];

// Add preload links for critical resources
preloadResources.forEach(resource => {
  if (document.head.querySelector(`link[rel="preload"][href="${resource.href}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource.href;
  link.as = resource.as;
  document.head.appendChild(link);
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Use a microtask to defer non-critical initialization
queueMicrotask(() => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
