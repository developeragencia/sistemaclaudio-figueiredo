
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
  BarChart4,
  Clipboard,
  FileCheck,
  Import
} from 'lucide-react';
import { MenuItemType } from './types';

export const getSidebarItems = (): MenuItemType[] => {
  return [
    { 
      icon: <ArrowLeft />, 
      label: "Voltar para Home", 
      to: "/" 
    },
    { 
      icon: <LayoutDashboard />, 
      label: "Painel Administrador", 
      to: "/dashboard" 
    },
    { 
      icon: <Users />, 
      label: "Gestão de Clientes", 
      to: "/clients-management",
      badge: "2" 
    },
    { 
      icon: <Calculator />, 
      label: "Cálculos e Recuperação", 
      to: "#",
      submenu: [
        { label: "Cálculos IRRF", to: "/irrf-calculations" },
        { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
        { label: "Identificação de Créditos", to: "/credits-identification" },
      ]
    },
    { 
      icon: <ShieldCheck />, 
      label: "Auditoria Tributária", 
      to: "/tax-audit" 
    },
    { 
      icon: <FileText />, 
      label: "Relatórios", 
      to: "#",
      badge: "3",
      submenu: [
        { label: "Relatórios Detalhados", to: "/detailed-reports" },
        { label: "Comprovantes de Retenção", to: "/retention-receipts", badge: "3" },
        { label: "Relatórios Fiscais", to: "/fiscal-reports" },
        { label: "Dashboard Interativo", to: "/interactive-dashboard" },
      ]
    },
    { 
      icon: <BarChart3 />, 
      label: "Gestão", 
      to: "#",
      badge: "5",
      submenu: [
        { label: "Propostas Comerciais", to: "/commercial-proposals", badge: "5" },
        { label: "Compensação Tributária", to: "/tax-compensation" },
        { label: "Gestão de Auditorias", to: "/audit-management" },
        { label: "Importação de Dados", to: "/operational-import" },
      ]
    },
    { 
      icon: <Database />, 
      label: "Operacional", 
      to: "#",
      badge: "New",
      submenu: [
        { label: "Painel Operacional", to: "/operational-dashboard" },
        { label: "Auditorias Operacionais", to: "/operational-audits" },
        { label: "Comprovantes Operacionais", to: "/operational-receipts" },
      ]
    },
    { 
      icon: <Globe />, 
      label: "Sistema", 
      to: "#",
      submenu: [
        { label: "Segurança & Auditoria", to: "/security-audit" },
        { label: "Operacional", to: "/operational" },
        { label: "Site e Conteúdo", to: "/site-editor" },
      ]
    },
    { 
      icon: <LifeBuoy />, 
      label: "Suporte", 
      to: "/support" 
    },
    { 
      icon: <Cog />, 
      label: "Configurações", 
      to: "/settings" 
    }
  ];
};

// Helper function to group items by category
export const getGroupedSidebarItems = () => {
  const sidebarItems = getSidebarItems();
  return {
    mainItems: sidebarItems.slice(0, 2),
    moduleItems: sidebarItems.slice(2, 8),
    systemItems: sidebarItems.slice(8)
  };
};
