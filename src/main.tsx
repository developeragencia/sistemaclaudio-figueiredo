
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add critical resources as preload
const preloadResources = [
  { href: '/logo-advogados.svg', as: 'image' },
  { href: '/favicon.svg', as: 'image' },
  // Add commonly used fonts or styles
  { href: '/index.css', as: 'style' }
];

// Add preload links for critical resources
preloadResources.forEach(resource => {
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

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
