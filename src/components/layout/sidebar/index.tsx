
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calculator, 
  FileText, 
  BarChart3,
  Receipt, 
  CreditCard, 
  ShieldAlert,
  Cog,
  LifeBuoy,
  Import,
  Globe,
  ChevronDown, 
  ChevronRight,
  ShieldCheck,
  Lock,
  Clock,
  Shield,
  ShieldX,
  UserCheck,
  LayoutDashboard,
  Building,
  UserCog,
  BriefcaseBusiness,
  FileBarChart,
  DatabaseBackup
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';

// Expand menu data to include all system components
const calculationItems = [
  { label: "Cálculos IRRF", to: "/irrf-calculations" },
  { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
  { label: "Identificação de Créditos", to: "/credits-identification" },
  { label: "Correção Monetária Selic", to: "/selic-correction" },
];

const reportItems = [
  { label: "Relatórios Detalhados", to: "/detailed-reports" },
  { label: "Comprovantes de Retenção", to: "/retention-receipts" },
  { label: "Relatórios Fiscais", to: "/fiscal-reports" },
  { label: "Dashboard Interativo", to: "/interactive-dashboard" },
  { label: "Dossiês Tributários", to: "/tax-dossiers" },
  { label: "Relatórios para Compensação", to: "/compensation-reports" },
];

const managementItems = [
  { label: "Propostas Comerciais", to: "/commercial-proposals" },
  { label: "Compensação Tributária", to: "/tax-compensation" },
  { label: "Gestão de Auditorias", to: "/audit-management" },
  { label: "Simulação de Compensação", to: "/compensation-simulation" },
];

const systemItems = [
  { label: "Operacional", to: "/operational" },
  { label: "Site e Conteúdo", to: "/site-editor" },
  { label: "Importação", to: "/import" },
  { label: "Processamento de Dados", to: "/data-processing" },
  { label: "Fila de Processamento", to: "/processing-queue" },
];

const securityItems = [
  { label: "Autenticação em Dois Fatores", to: "/two-factor-auth" },
  { label: "Expiração de Sessão", to: "/session-expiration" },
  { label: "Proteção de Acesso", to: "/access-protection" },
  { label: "Trilhas de Auditoria", to: "/audit-trails" },
  { label: "Usuários e Permissões", to: "/users-permissions" },
  { label: "Gestão de Perfis", to: "/role-management" },
];

const clientItems = [
  { label: "Cadastro de Clientes", to: "/clients-register" },
  { label: "Usuários Ativos", to: "/active-users" },
  { label: "Permissões por Perfil", to: "/profile-permissions" },
  { label: "Timeline do Cliente", to: "/client-timeline" },
];

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({
    clients: false,
    calculations: false,
    reports: false,
    management: false,
    system: false,
    security: false
  });
  
  const toggleSubmenu = (menu: string) => {
    if (collapsed) return;
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <aside className={cn(
      "h-screen fixed left-0 top-0 z-30 bg-white border-r transition-all duration-300 flex flex-col shadow-sm",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {/* Dashboard */}
        <SidebarItem 
          icon={<Home />} 
          label="Dashboard" 
          to="/dashboard" 
          isActive={location.pathname === "/dashboard"}
          collapsed={collapsed} 
        />

        {/* Admin */}
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Painel Administrativo" 
          to="/admin" 
          isActive={location.pathname === "/admin"}
          collapsed={collapsed} 
        />
        
        {/* Controle de Clientes */}
        <SidebarSection title="Controle de Clientes" collapsed={collapsed}>
          <SidebarItem 
            icon={<Users />} 
            label="Clientes e Usuários" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.clients}
            toggleSubmenu={() => toggleSubmenu('clients')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={clientItems} 
            isOpen={openMenus.clients} 
            collapsed={collapsed} 
          />
        </SidebarSection>
        
        {/* Módulos Principais */}
        <SidebarSection title="Módulos Principais" collapsed={collapsed}>
          <SidebarItem 
            icon={<Building />} 
            label="Gestão de Clientes" 
            to="/clients-management"
            isActive={location.pathname === "/clients-management"} 
            collapsed={collapsed}
          />
          
          <SidebarItem 
            icon={<Calculator />} 
            label="Cálculos e Recuperação" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.calculations}
            toggleSubmenu={() => toggleSubmenu('calculations')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={calculationItems} 
            isOpen={openMenus.calculations} 
            collapsed={collapsed} 
          />
          
          <SidebarItem 
            icon={<ShieldCheck />} 
            label="Auditoria Tributária" 
            to="/tax-audit"
            isActive={location.pathname === "/tax-audit"} 
            collapsed={collapsed}
          />
          
          <SidebarItem 
            icon={<FileText />} 
            label="Relatórios" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.reports}
            toggleSubmenu={() => toggleSubmenu('reports')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={reportItems} 
            isOpen={openMenus.reports} 
            collapsed={collapsed} 
          />
          
          <SidebarItem 
            icon={<BarChart3 />} 
            label="Gestão" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.management}
            toggleSubmenu={() => toggleSubmenu('management')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={managementItems} 
            isOpen={openMenus.management} 
            collapsed={collapsed} 
          />
        </SidebarSection>
        
        {/* Sistema */}
        <SidebarSection title="Sistema" collapsed={collapsed}>
          <SidebarItem 
            icon={<Globe />} 
            label="Sistema" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.system}
            toggleSubmenu={() => toggleSubmenu('system')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={systemItems} 
            isOpen={openMenus.system} 
            collapsed={collapsed} 
          />

          {/* Segurança & Auditoria */}
          <SidebarItem 
            icon={<ShieldAlert />} 
            label="Segurança & Auditoria" 
            to="#" 
            hasSubmenu={true}
            isSubmenuOpen={openMenus.security}
            toggleSubmenu={() => toggleSubmenu('security')}
            collapsed={collapsed}
          />
          
          <SidebarSubmenu 
            items={securityItems} 
            isOpen={openMenus.security} 
            collapsed={collapsed} 
          />
          
          <SidebarItem 
            icon={<LifeBuoy />} 
            label="Suporte" 
            to="/support" 
            isActive={location.pathname === "/support"}
            collapsed={collapsed}
          />
          
          <SidebarItem 
            icon={<Cog />} 
            label="Configurações" 
            to="/settings" 
            isActive={location.pathname === "/settings"}
            collapsed={collapsed}
          />
        </SidebarSection>
      </div>
    </aside>
  );
};

export default Sidebar;
