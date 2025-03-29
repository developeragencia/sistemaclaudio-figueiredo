
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
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';
import { 
  calculationItems, 
  reportItems, 
  managementItems, 
  systemItems, 
  securityItems 
} from './menuData';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({
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
      "h-screen fixed z-30 bg-white border-r transition-all duration-300 flex flex-col",
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
        
        {/* Módulos Principais */}
        <SidebarSection title="Módulos Principais" collapsed={collapsed}>
          <SidebarItem 
            icon={<Users />} 
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
