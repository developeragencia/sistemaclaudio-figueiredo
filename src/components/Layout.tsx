
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';
import { MainMenu } from '@/components/MainMenu';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isCompact } = useContext(SidebarContext);
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <motion.div 
        className="flex-1"
        initial={false}
        animate={{ 
          marginLeft: isCompact ? '4rem' : '16rem',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <header className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="container flex h-16 items-center">
            <MainMenu />
          </div>
        </header>
        <main className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full"
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
