
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  Lightbulb, 
  BarChart3, 
  Receipt, 
  CreditCard,
  Database,
  Globe,
  Settings,
  LifeBuoy,
  Shield,
  Cog,
  FileCheck,
  Import,
  Clipboard,
  Gauge,
  FileBarChart,
  Handshake,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

// Import refactored components
import DashboardHeroBanner from '@/components/dashboard/DashboardHeroBanner';
import MainModulesSection from '@/components/dashboard/MainModulesSection';
import SystemSettingsSection from '@/components/dashboard/SystemSettingsSection';
import DashboardQuickAccess from '@/components/dashboard/DashboardQuickAccess';
import DashboardFooter from '@/components/dashboard/DashboardFooter';

const Dashboard = () => {
  // Module data definitions
  const systemModules = [
    {
      title: "Gestão de Clientes",
      description: "Gerencie todos os dados de clientes, contratos e histórico de interações.",
      icon: Users,
      to: "/clients-management",
    },
    {
      title: "Créditos Tributários",
      description: "Gerenciamento de créditos e recuperação tributária.",
      icon: CreditCard,
      to: "/tax-credits",
    },
    {
      title: "Calculadora Avançada",
      description: "Ferramentas para cálculos de IRRF e identificação de créditos tributários.",
      icon: Calculator,
      to: "/advanced-calculator",
    },
    {
      title: "Cálculos IRRF",
      description: "Cálculos específicos para Imposto de Renda Retido na Fonte.",
      icon: Calculator,
      to: "/irrf-calculations",
    },
    {
      title: "Recuperação IRRF/PJ",
      description: "Ferramentas para recuperação de IRRF para Pessoas Jurídicas.",
      icon: FileCheck,
      to: "/irrf-recovery",
    },
    {
      title: "Identificação de Créditos",
      description: "Analisar e identificar créditos tributários disponíveis.",
      icon: Lightbulb,
      to: "/credits-identification",
    },
  ];
  
  const reportModules = [
    {
      title: "Relatórios Detalhados",
      description: "Relatórios personalizados e detalhados para análise tributária.",
      icon: FileText,
      to: "/detailed-reports",
    },
    {
      title: "Comprovantes de Retenção",
      description: "Gerenciamento de comprovantes de retenção tributária.",
      icon: Receipt,
      to: "/retention-receipts",
    },
    {
      title: "Relatórios Fiscais",
      description: "Relatórios específicos para obrigações fiscais.",
      icon: FileBarChart,
      to: "/fiscal-reports",
    }
  ];
  
  const operationalModules = [
    {
      title: "Painel Interativo",
      description: "Dashboard interativo com métricas e indicadores importantes.",
      icon: Gauge,
      to: "/interactive-dashboard",
    },
    {
      title: "Propostas Comerciais",
      description: "Gestão de propostas para clientes e prospects.",
      icon: Handshake,
      to: "/commercial-proposals",
    },
    {
      title: "Compensação Tributária",
      description: "Ferramentas para simulação e gestão de compensações tributárias.",
      icon: Clipboard,
      to: "/tax-compensation",
    },
    {
      title: "Gestão de Auditorias",
      description: "Controle e acompanhamento de processos de auditoria tributária.",
      icon: ShieldCheck,
      to: "/audit-management",
    },
    {
      title: "Operacional",
      description: "Gestão operacional do sistema.",
      icon: Database,
      to: "/operational-dashboard",
    }
  ];
  
  const systemSettingsModules = [
    {
      title: "Segurança & Auditoria",
      description: "Central de segurança e ferramentas de auditoria do sistema.",
      icon: Shield,
      to: "/security-hub",
    },
    {
      title: "Sistema",
      description: "Configurações do sistema e personalização.",
      icon: Globe,
      to: "/site-editor",
    },
    {
      title: "Suporte",
      description: "Acesso ao suporte e documentação.",
      icon: LifeBuoy,
      to: "/support",
    },
    {
      title: "Configurações",
      description: "Acesse as configurações do sistema.",
      icon: Cog,
      to: "/settings/profile",
    },
    {
      title: "Voltar para Home",
      description: "Retornar para a página inicial do site",
      icon: ArrowLeft,
      to: "/",
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
      <motion.div 
        className="container mx-auto px-4 py-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Banner */}
        <motion.div variants={itemVariants} className="mb-8">
          <DashboardHeroBanner />
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Main Modules */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
            <MainModulesSection 
              systemModules={systemModules}
              reportModules={reportModules}
              operationalModules={operationalModules}
            />
          </motion.div>
          
          {/* Right column - Settings & Quick Access */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <SystemSettingsSection modules={systemSettingsModules} />
            <DashboardQuickAccess />
          </motion.div>
        </div>
        
        {/* Footer */}
        <DashboardFooter />
      </motion.div>
    </div>
  );
};

export default Dashboard;
