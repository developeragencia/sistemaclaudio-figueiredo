import { useRouter } from 'next/router';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Building2,
  FileSearch,
  BarChart3,
  Settings,
  Users,
  FileText,
  AlertCircle,
  BookOpen,
  HelpCircle,
  ChevronDown,
  DollarSign,
  FileCheck,
  Bell,
  Search,
  Calendar,
  LayoutDashboard,
  ChevronRight,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Keyboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebar } from '@/contexts/SidebarContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEffect } from 'react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  isCollapsible?: boolean;
  children?: {
    href: string;
    label: string;
    shortcut?: string;
  }[];
  shortcut?: string;
}

function SidebarItem({ icon: Icon, label, href, isActive, isCollapsible, children, shortcut }: SidebarItemProps) {
  const router = useRouter();
  const { isCompact, expandedItems, toggleExpanded } = useSidebar();

  const isExpanded = expandedItems.includes(label);

  // Registra atalhos de teclado
  useHotkeys(shortcut || '', () => {
    if (href) {
      router.push(href);
    }
  }, [href, router]);

  children?.forEach((child) => {
    useHotkeys(child.shortcut || '', () => {
      router.push(child.href);
    }, [router]);
  });

  const content = (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" />
      {!isCompact && <span>{label}</span>}
    </div>
  );

  if (isCollapsible && children) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Collapsible open={isCompact ? false : isExpanded} onOpenChange={() => !isCompact && toggleExpanded(label)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between px-2 hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent"
                  )}
                >
                  {content}
                  {!isCompact && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className={cn("space-y-1", isCompact ? "absolute left-full ml-2 w-48 rounded-md border bg-background p-2" : "pl-6 pt-1")}>
                {children.map((item) => (
                  <TooltipProvider key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 px-2 hover:bg-accent hover:text-accent-foreground",
                            router.pathname === item.href && "bg-accent"
                          )}
                          onClick={() => router.push(item.href)}
                        >
                          <ChevronRight className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </TooltipTrigger>
                      {item.shortcut && (
                        <TooltipContent side="right">
                          <kbd className="px-2 py-1 text-xs font-semibold">{item.shortcut}</kbd>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </TooltipTrigger>
          {isCompact && (
            <TooltipContent side="right" className="flex items-center gap-2">
              {label}
              {shortcut && <kbd className="px-2 py-1 text-xs font-semibold">{shortcut}</kbd>}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-2 hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-accent"
            )}
            onClick={() => href && router.push(href)}
          >
            {content}
          </Button>
        </TooltipTrigger>
        {isCompact && (
          <TooltipContent side="right" className="flex items-center gap-2">
            {label}
            {shortcut && <kbd className="px-2 py-1 text-xs font-semibold">{shortcut}</kbd>}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { isCompact, toggleCompact, theme, toggleTheme } = useSidebar();

  // Registra atalhos globais
  useHotkeys('mod+b', (e) => {
    e.preventDefault();
    toggleCompact();
  }, [toggleCompact]);

  useHotkeys('mod+j', (e) => {
    e.preventDefault();
    toggleTheme();
  }, [toggleTheme]);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/',
      shortcut: 'mod+1'
    },
    {
      icon: Building2,
      label: 'Empresas',
      isCollapsible: true,
      shortcut: 'mod+2',
      children: [
        { href: '/empresas/cadastro', label: 'Cadastro', shortcut: 'mod+shift+c' },
        { href: '/empresas/consulta-cnpj', label: 'Consulta CNPJ', shortcut: 'mod+shift+n' },
        { href: '/empresas/historico-consultas', label: 'Histórico', shortcut: 'mod+shift+h' }
      ]
    },
    {
      icon: FileSearch,
      label: 'Auditoria',
      isCollapsible: true,
      shortcut: 'mod+3',
      children: [
        { href: '/auditoria/retencoes', label: 'Retenções', shortcut: 'mod+shift+r' },
        { href: '/auditoria/notas', label: 'Análise de Notas', shortcut: 'mod+shift+a' },
        { href: '/auditoria/pendencias', label: 'Pendências', shortcut: 'mod+shift+p' }
      ]
    },
    {
      icon: DollarSign,
      label: 'Financeiro',
      isCollapsible: true,
      shortcut: 'mod+4',
      children: [
        { href: '/financeiro/pagamentos', label: 'Pagamentos' },
        { href: '/financeiro/recebimentos', label: 'Recebimentos' },
        { href: '/financeiro/conciliacao', label: 'Conciliação' }
      ]
    },
    {
      icon: FileCheck,
      label: 'Documentos',
      isCollapsible: true,
      shortcut: 'mod+5',
      children: [
        { href: '/documentos/fiscais', label: 'Documentos Fiscais' },
        { href: '/documentos/certidoes', label: 'Certidões' },
        { href: '/documentos/arquivos', label: 'Arquivos' }
      ]
    },
    {
      icon: BarChart3,
      label: 'Relatórios',
      isCollapsible: true,
      shortcut: 'mod+6',
      children: [
        { href: '/relatorios/gerenciais', label: 'Gerenciais' },
        { href: '/relatorios/retencoes', label: 'Retenções' },
        { href: '/relatorios/empresas', label: 'Empresas' }
      ]
    },
    {
      icon: Calendar,
      label: 'Agenda',
      isCollapsible: true,
      shortcut: 'mod+7',
      children: [
        { href: '/agenda/vencimentos', label: 'Vencimentos' },
        { href: '/agenda/compromissos', label: 'Compromissos' },
        { href: '/agenda/lembretes', label: 'Lembretes' }
      ]
    },
    {
      icon: Bell,
      label: 'Notificações',
      href: '/notificacoes',
      shortcut: 'mod+8'
    },
    {
      icon: Search,
      label: 'Busca Avançada',
      href: '/busca',
      shortcut: 'mod+k'
    },
    {
      icon: Users,
      label: 'Usuários',
      isCollapsible: true,
      shortcut: 'mod+9',
      children: [
        { href: '/usuarios/gerenciar', label: 'Gerenciar' },
        { href: '/usuarios/perfis', label: 'Perfis' },
        { href: '/usuarios/logs', label: 'Logs' }
      ]
    },
    {
      icon: Settings,
      label: 'Configurações',
      isCollapsible: true,
      shortcut: 'mod+0',
      children: [
        { href: '/configuracoes/sistema', label: 'Sistema' },
        { href: '/configuracoes/integracoes', label: 'Integrações' },
        { href: '/configuracoes/backup', label: 'Backup' }
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCompact ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileSearch className="h-5 w-5" />
          {!isCompact && "Sistema Auditoria"}
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.href === router.pathname}
              isCollapsible={item.isCollapsible}
              children={item.children}
              shortcut={item.shortcut}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCompact}
                  className="h-8 w-8"
                >
                  {isCompact ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="flex items-center gap-2">
                  {isCompact ? "Expandir" : "Recolher"} menu
                  <kbd className="px-2 py-1 text-xs font-semibold">mod+b</kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="flex items-center gap-2">
                  Alternar tema
                  <kbd className="px-2 py-1 text-xs font-semibold">mod+j</kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push('/atalhos')}
                >
                  <Keyboard className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Ver atalhos de teclado
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
} 