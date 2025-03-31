
import React from 'react';
import { 
  ArrowLeft,
  LayoutDashboard,
  Users, 
  Calculator, 
  FileText, 
  BarChart3,
  Globe,
  LifeBuoy,
  Cog,
  ShieldCheck,
  Database,
  CreditCard,
} from 'lucide-react';
import { MenuItemType } from './types';

export const getSidebarItems = (): MenuItemType[] => {
  return [
    { 
      icon: ArrowLeft, 
      label: "Voltar para Home", 
      to: "/" 
    },
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      to: "/dashboard" 
    },
    { 
      icon: Users, 
      label: "Gestão de Clientes", 
      to: "/clients-management",
      badge: "2" 
    },
    { 
      icon: CreditCard, 
      label: "Créditos Tributários", 
      to: "/tax-credits" 
    },
    { 
      icon: Calculator, 
      label: "Calculadora Avançada", 
      to: "/advanced-calculator" 
    },
    { 
      icon: Calculator, 
      label: "Cálculos e Recuperação", 
      to: "#",
      submenu: [
        { label: "Cálculos IRRF", to: "/irrf-calculations" },
        { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
        { label: "Identificação de Créditos", to: "/credits-identification" },
      ]
    },
    { 
      icon: FileText, 
      label: "Relatórios", 
      to: "#",
      submenu: [
        { label: "Relatórios Detalhados", to: "/detailed-reports" },
        { label: "Comprovantes de Retenção", to: "/retention-receipts" },
        { label: "Relatórios Fiscais", to: "/fiscal-reports" },
      ]
    },
    { 
      icon: BarChart3, 
      label: "Gestão", 
      to: "#",
      submenu: [
        { label: "Propostas Comerciais", to: "/commercial-proposals" },
        { label: "Compensação Tributária", to: "/tax-compensation" },
        { label: "Gestão de Auditorias", to: "/audit-management" },
      ]
    },
    { 
      icon: ShieldCheck, 
      label: "Segurança & Auditoria", 
      to: "/security-hub",
      submenu: [
        { label: "Autenticação em Dois Fatores", to: "/two-factor-auth" },
        { label: "Proteção de Acesso", to: "/access-protection" },
        { label: "Trilhas de Auditoria", to: "/audit-trails" },
        { label: "Usuários e Permissões", to: "/users-permissions" },
      ]
    },
    { 
      icon: Database, 
      label: "Operacional", 
      to: "/operational-dashboard",
      submenu: [
        { label: "Auditorias Operacionais", to: "/operational-audits" },
        { label: "Comprovantes Operacionais", to: "/operational-receipts" },
      ]
    },
    { 
      icon: Globe, 
      label: "Sistema", 
      to: "/site-editor"
    },
    { 
      icon: LifeBuoy, 
      label: "Suporte", 
      to: "/support" 
    },
    { 
      icon: Cog, 
      label: "Configurações", 
      to: "/settings/profile"
    }
  ];
};

// Helper function to group items by category
export const getGroupedSidebarItems = () => {
  const sidebarItems = getSidebarItems();
  
  return {
    mainItems: sidebarItems.slice(0, 2),
    moduleItems: sidebarItems.slice(2, 11),
    systemItems: sidebarItems.slice(11)
  };
};
