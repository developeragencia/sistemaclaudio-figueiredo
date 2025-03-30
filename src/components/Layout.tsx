import { MainMenu } from '@/components/MainMenu';
import { Sidebar } from '@/components/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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