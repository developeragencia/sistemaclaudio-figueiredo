
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';
import { MainMenu } from '@/components/MainMenu';
import { Sidebar } from '@/components/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isCompact } = useContext(SidebarContext);
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${isCompact ? 'ml-16' : 'ml-64'}`}>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <MainMenu />
          </div>
        </header>
        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
