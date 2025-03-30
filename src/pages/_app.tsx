import type { AppProps } from 'next/app';
import { SidebarProvider } from '@/contexts/SidebarContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
} 