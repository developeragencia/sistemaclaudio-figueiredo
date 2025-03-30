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
  Home,
  ChevronDown,
  DollarSign,
  FileCheck,
  Bell,
  Search,
  Calendar,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  isCollapsible?: boolean;
  children?: {
    href: string;
    label: string;
  }[];
}

function SidebarItem({ icon: Icon, label, href, isActive, isCollapsible, children }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (isCollapsible && children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between px-2 hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-accent"
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 pt-1">
          {children.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start px-2 hover:bg-accent hover:text-accent-foreground",
                router.pathname === item.href && "bg-accent"
              )}
              onClick={() => router.push(item.href)}
            >
              {item.label}
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start px-2 hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent"
      )}
      onClick={() => href && router.push(href)}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </Button>
  );
}

export function Sidebar() {
  const router = useRouter();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/'
    },
    {
      icon: Building2,
      label: 'Empresas',
      isCollapsible: true,
      children: [
        { href: '/empresas/cadastro', label: 'Cadastro' },
        { href: '/empresas/consulta-cnpj', label: 'Consulta CNPJ' },
        { href: '/empresas/historico-consultas', label: 'Histórico' }
      ]
    },
    {
      icon: FileSearch,
      label: 'Auditoria',
      isCollapsible: true,
      children: [
        { href: '/auditoria/retencoes', label: 'Retenções' },
        { href: '/auditoria/notas', label: 'Análise de Notas' },
        { href: '/auditoria/pendencias', label: 'Pendências' }
      ]
    },
    {
      icon: DollarSign,
      label: 'Financeiro',
      isCollapsible: true,
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
      children: [
        { href: '/agenda/vencimentos', label: 'Vencimentos' },
        { href: '/agenda/compromissos', label: 'Compromissos' },
        { href: '/agenda/lembretes', label: 'Lembretes' }
      ]
    },
    {
      icon: Bell,
      label: 'Notificações',
      href: '/notificacoes'
    },
    {
      icon: Search,
      label: 'Busca Avançada',
      href: '/busca'
    },
    {
      icon: Users,
      label: 'Usuários',
      isCollapsible: true,
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
      children: [
        { href: '/configuracoes/sistema', label: 'Sistema' },
        { href: '/configuracoes/integracoes', label: 'Integrações' },
        { href: '/configuracoes/backup', label: 'Backup' }
      ]
    }
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileSearch className="h-5 w-5" />
          Sistema Auditoria
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
            />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-2 text-sm">
          <HelpCircle className="h-4 w-4" />
          <Link href="/ajuda" className="text-muted-foreground hover:text-foreground">
            Central de Ajuda
          </Link>
        </div>
      </div>
    </div>
  );
} 