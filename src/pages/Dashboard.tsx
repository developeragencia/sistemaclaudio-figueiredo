
import React from 'react';
import { motion } from 'framer-motion';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Card, CardContent } from '@/components/ui/card';
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
  Layout,
  ArrowLeft
} from 'lucide-react';

const Dashboard = () => {
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <motion.div 
        className="p-6 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="relative overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          <div className="relative z-10 px-8 py-14 text-white">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                Painel Administrador
                <motion.div 
                  className="ml-3 w-3 h-3 bg-white rounded-full"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </h1>
              <p className="text-xl max-w-2xl text-blue-100">
                Bem-vindo ao painel de controle do sistema de gestão tributária. 
                Acesse os módulos através dos cards abaixo.
              </p>
            </motion.div>
          </div>
          
          {/* Animated shapes */}
          <motion.div 
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 right-40 w-24 h-24 rounded-full bg-white/5"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left column - Main Sections */}
          <div className="md:col-span-8 space-y-8">
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-0">
                <div className="p-6 border-b border-blue-100 dark:border-slate-700">
                  <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 flex items-center">
                    <Layout className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Módulos do Sistema
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Acesse as principais funcionalidades do sistema
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-10">
                    {/* Primary Modules Section */}
                    <div>
                      <div className="mb-5 flex items-center">
                        <motion.div 
                          className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                          Principais Módulos
                        </h3>
                      </div>
                      <ModuleGrid modules={systemModules} />
                    </div>
                    
                    {/* Report Modules Section */}
                    <div>
                      <div className="mb-5 flex items-center">
                        <motion.div 
                          className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2" 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                        />
                        <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">
                          Relatórios e Análises
                        </h3>
                      </div>
                      <ModuleGrid modules={reportModules} />
                    </div>
                    
                    {/* Operational Modules Section */}
                    <div>
                      <div className="mb-5 flex items-center">
                        <motion.div 
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                        />
                        <h3 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                          Operações
                        </h3>
                      </div>
                      <ModuleGrid modules={operationalModules} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - System & Support */}
          <div className="md:col-span-4 space-y-8">
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-0">
                <div className="p-6 border-b border-blue-100 dark:border-slate-700">
                  <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 flex items-center">
                    <Settings className="mr-3 h-6 w-6 text-amber-600 dark:text-amber-400" />
                    Sistema e Suporte
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Configurações e opções de sistema
                  </p>
                </div>
                
                <div className="p-6">
                  <div>
                    <div className="mb-5 flex items-center">
                      <motion.div 
                        className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" 
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, delay: 0.9, repeat: Infinity }}
                      />
                      <h3 className="text-lg font-medium text-amber-700 dark:text-amber-300">
                        Configurações e Suporte
                      </h3>
                    </div>
                    <ModuleGrid modules={systemSettingsModules} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Info Card */}
            <Card className="overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Acesso Rápido</h3>
                <ul className="space-y-3">
                  <motion.li 
                    className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    <span>Gestão de usuários</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    <span>Permissões de acesso</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    <span>Documentação</span>
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Footer with version info */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>Sistema de Gestão Tributária • Versão 2.5.0</p>
          <p>© 2024 Advogados Associados. Todos os direitos reservados.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
