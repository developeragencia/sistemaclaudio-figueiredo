
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { ArrowRight, ShieldCheck, BarChart3, FileText, Calculator, Users, Settings } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="medium" />
          </div>
          <Link to="/login">
            <Button variant="default" className="bg-lawyer-800 hover:bg-lawyer-700">
              Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-lawyer-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-lawyer-900">
            Sistema de Gestão Tributária
          </h1>
          <p className="text-xl md:text-2xl text-lawyer-600 max-w-3xl mx-auto mb-10">
            Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-lawyer-800 hover:bg-lawyer-700">
                Acessar Sistema <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-lawyer-800">
            Funcionalidades Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-lawyer-700" size={32} />}
              title="Auditoria Tributária"
              description="Análise completa da situação fiscal da sua empresa para identificar oportunidades de economia."
            />
            <FeatureCard 
              icon={<Calculator className="text-lawyer-700" size={32} />}
              title="Cálculos Fiscais"
              description="Ferramentas precisas para calcular impostos e identificar créditos tributários."
            />
            <FeatureCard 
              icon={<FileText className="text-lawyer-700" size={32} />}
              title="Relatórios Detalhados"
              description="Documentação completa e relatórios personalizados para tomada de decisão."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-lawyer-700" size={32} />}
              title="Dashboard Interativo"
              description="Visualize dados importantes da sua empresa em tempo real."
            />
            <FeatureCard 
              icon={<Users className="text-lawyer-700" size={32} />}
              title="Gestão de Clientes"
              description="Organize informações e histórico de todos os clientes em um só lugar."
            />
            <FeatureCard 
              icon={<Settings className="text-lawyer-700" size={32} />}
              title="Configuração Avançada"
              description="Personalize o sistema de acordo com as necessidades específicas da sua empresa."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lawyer-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <AnimatedLogo size="medium" showText={true} className="mb-4" />
              <p className="text-lawyer-200">
                Sistema de Gestão Tributária para Advogados
              </p>
            </div>
            <div>
              <p className="text-lawyer-200">
                © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card className="hover-card border-lawyer-200">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-lawyer-800">{title}</h3>
        <p className="text-lawyer-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
