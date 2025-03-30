import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Building2,
  Receipt,
  ClipboardCheck,
  Settings,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Clientes',
    href: '/admin/clientes',
    icon: Users
  },
  {
    title: 'Fornecedores',
    href: '/admin/fornecedores',
    icon: Building2
  },
  {
    title: 'Pagamentos',
    href: '/admin/pagamentos',
    icon: Receipt
  },
  {
    title: 'Auditoria',
    href: '/admin/auditoria',
    icon: ClipboardCheck
  },
  {
    title: 'Relatórios',
    href: '/admin/relatorios',
    icon: FileText
  },
  {
    title: 'Configurações',
    href: '/admin/configuracoes',
    icon: Settings
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    // Implementar logout
    router.push('/login');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Sistema CF</h1>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-40"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:bg-white lg:dark:bg-gray-800">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-10">
          {children}
        </main>
      </div>
    </div>
  );
} 