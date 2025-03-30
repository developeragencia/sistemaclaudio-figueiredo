import { useRouter } from 'next/router';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function MainMenu() {
  const router = useRouter();

  const menuModules = [
    {
      label: 'Empresas',
      icon: Building2,
      items: [
        {
          label: 'Cadastro de Empresas',
          href: '/empresas/cadastro',
          description: 'Gerenciar cadastro de empresas e filiais'
        },
        {
          label: 'Consulta CNPJ',
          href: '/empresas/consulta-cnpj',
          description: 'Consultar dados via CNPJ.ws'
        },
        {
          label: 'Histórico de Consultas',
          href: '/empresas/historico-consultas',
          description: 'Visualizar histórico de consultas CNPJ'
        }
      ]
    },
    {
      label: 'Auditoria',
      icon: FileSearch,
      items: [
        {
          label: 'Retenções',
          href: '/auditoria/retencoes',
          description: 'Gerenciar retenções de impostos'
        },
        {
          label: 'Análise de Notas',
          href: '/auditoria/notas',
          description: 'Analisar notas fiscais'
        },
        {
          label: 'Pendências',
          href: '/auditoria/pendencias',
          description: 'Verificar pendências de documentação'
        }
      ]
    },
    {
      label: 'Relatórios',
      icon: BarChart3,
      items: [
        {
          label: 'Dashboard',
          href: '/relatorios/dashboard',
          description: 'Visualizar indicadores principais'
        },
        {
          label: 'Relatórios Gerenciais',
          href: '/relatorios/gerenciais',
          description: 'Gerar relatórios customizados'
        },
        {
          label: 'Exportação',
          href: '/relatorios/exportacao',
          description: 'Exportar dados para análise'
        }
      ]
    },
    {
      label: 'Documentos',
      icon: FileText,
      items: [
        {
          label: 'Documentos Fiscais',
          href: '/documentos/fiscais',
          description: 'Gerenciar documentação fiscal'
        },
        {
          label: 'Certidões',
          href: '/documentos/certidoes',
          description: 'Controle de certidões'
        },
        {
          label: 'Arquivos',
          href: '/documentos/arquivos',
          description: 'Repositório de arquivos'
        }
      ]
    },
    {
      label: 'Usuários',
      icon: Users,
      items: [
        {
          label: 'Gerenciar Usuários',
          href: '/usuarios/gerenciar',
          description: 'Administrar usuários do sistema'
        },
        {
          label: 'Perfis de Acesso',
          href: '/usuarios/perfis',
          description: 'Configurar perfis e permissões'
        },
        {
          label: 'Logs de Acesso',
          href: '/usuarios/logs',
          description: 'Visualizar logs de acesso'
        }
      ]
    },
    {
      label: 'Configurações',
      icon: Settings,
      items: [
        {
          label: 'Parâmetros',
          href: '/configuracoes/parametros',
          description: 'Configurar parâmetros do sistema'
        },
        {
          label: 'Integrações',
          href: '/configuracoes/integracoes',
          description: 'Gerenciar integrações (CNPJ.ws)'
        },
        {
          label: 'Backup',
          href: '/configuracoes/backup',
          description: 'Configurar backup de dados'
        }
      ]
    }
  ];

  const supportModules = [
    {
      label: 'Ajuda',
      icon: HelpCircle,
      items: [
        {
          label: 'Central de Ajuda',
          href: '/ajuda',
          description: 'Acesse nossa base de conhecimento'
        },
        {
          label: 'Tutoriais',
          href: '/tutoriais',
          description: 'Aprenda a usar o sistema'
        },
        {
          label: 'Suporte',
          href: '/suporte',
          description: 'Entre em contato com o suporte'
        }
      ]
    },
    {
      label: 'Alertas',
      icon: AlertCircle,
      items: [
        {
          label: 'Notificações',
          href: '/alertas/notificacoes',
          description: 'Visualizar notificações do sistema'
        },
        {
          label: 'Avisos',
          href: '/alertas/avisos',
          description: 'Mensagens importantes'
        }
      ]
    },
    {
      label: 'Documentação',
      icon: BookOpen,
      items: [
        {
          label: 'Manual do Usuário',
          href: '/documentacao/manual',
          description: 'Guia completo do sistema'
        },
        {
          label: 'Novidades',
          href: '/documentacao/novidades',
          description: 'Últimas atualizações'
        }
      ]
    }
  ];

  return (
    <nav className="flex items-center space-x-4">
      {menuModules.map((module) => (
        <DropdownMenu key={module.label}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <module.icon className="h-4 w-4" />
              {module.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{module.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {module.items.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="flex flex-col items-start"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Suporte
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {supportModules.map((module) => (
            <DropdownMenuSub key={module.label}>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <module.icon className="h-4 w-4" />
                {module.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-56">
                {module.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="flex flex-col items-start"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
} 