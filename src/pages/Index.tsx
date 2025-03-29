import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { 
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  BarChart3,
  FileText,
  Database,
  Lock,
  Users,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after a small delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation classes based on loaded state
  const fadeInClass = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
  const staggerDelay = (index: number) => `delay-${index * 100}`;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="medium" />
          </div>
          <Link to="/login">
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:bg-blue-700 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Redesigned with animations */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-0"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-blue-100/30 z-0 animate-pulse-slow"></div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full 
          opacity-50 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full 
          opacity-40 filter blur-3xl animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className={`md:w-1/2 transition-all duration-700 ${fadeInClass}`}>
              <div className="mb-8 transform-gpu transition-all duration-500 hover:scale-105">
                <AnimatedLogo size="large" animated={true} className="mb-6" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 
                bg-clip-text text-transparent leading-tight">
                Sistema de Gestão Tributária para <span className="relative">
                  <span className="relative z-10">Escritórios de Advocacia</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 to-blue-100 -z-0 opacity-50"></span>
                </span>
              </h1>
              <p className="text-xl text-blue-700 max-w-xl mb-8 leading-relaxed">
                Plataforma especializada para escritórios que buscam excelência em consultoria fiscal e recuperação de impostos.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Recuperação eficiente de créditos tributários",
                  "Integração com sistemas contábeis",
                  "Relatórios avançados e personalizáveis"
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 transition-all duration-700 ${fadeInClass} ${staggerDelay(index+3)}`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 
                      flex items-center justify-center p-1 shadow-sm transform-gpu hover:scale-110 transition-all duration-300">
                      <CheckCircle className="text-blue-600 h-4 w-4" />
                    </div>
                    <span className="text-blue-800">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900
                    transition-all duration-500 shadow-lg hover:shadow-xl px-8 py-6 rounded-xl
                    transform-gpu hover:translate-y-[-4px]"
                >
                  <span className="text-lg relative z-10">Acessar Sistema</span> 
                  <ArrowRight className="ml-2 h-5 w-5 animate-pulse group-hover:translate-x-1" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 opacity-0 
                    hover:opacity-100 transition-opacity duration-300 blur-lg"></span>
                </Button>
              </Link>
            </div>
            <div className={`md:w-1/2 transition-all duration-700 ${fadeInClass} delay-300`}>
              <div className="relative transform-gpu transition-all duration-500 hover:-rotate-1 hover:scale-105">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-lg opacity-75 
                  animate-pulse-slow"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-100/50">
                  <img src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" alt="Dashboard Preview" 
                    className="rounded-lg w-full object-cover" />
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white 
                    px-6 py-3 rounded-xl shadow-lg font-semibold transform-gpu hover:scale-105 transition-transform duration-300">
                    Sistema Integrado de Gestão
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-100 
                  rounded-full opacity-80 animate-bounce"></div>
                <div className="absolute -bottom-4 left-20 w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-200 
                  rounded-full opacity-80 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - System-focused cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-lawyer-800">
              Módulos do Sistema
            </h2>
            <p className="text-lawyer-600 md:text-lg max-w-2xl mx-auto">
              Conheça as principais funcionalidades que tornam nosso sistema a escolha ideal para gestão tributária
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Recuperação de Créditos</h3>
                <p className="text-lawyer-600 mb-4">
                  Identificação e recuperação automática de créditos tributários com algoritmos avançados que maximizam resultados.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Análise de documentos fiscais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Cálculo automático de compensações</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Relatórios Detalhados</h3>
                <p className="text-lawyer-600 mb-4">
                  Visualização completa de dados para tomada de decisões estratégicas com relatórios personalizáveis.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Dashboards interativos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Exportação em múltiplos formatos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Gestão de Clientes</h3>
                <p className="text-lawyer-600 mb-4">
                  Gerenciamento completo da carteira de clientes com histórico, documentos e acompanhamento de processos.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Registro completo de informações</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Histórico de interações</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Card 4 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Análise Tributária</h3>
                <p className="text-lawyer-600 mb-4">
                  Ferramentas analíticas para avaliação de cenários fiscais e identificação de oportunidades de economia.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Simulações de cenários fiscais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Comparativos de regimes tributários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Card 5 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Auditoria Tributária</h3>
                <p className="text-lawyer-600 mb-4">
                  Verificação automática de inconsistências fiscais com sugestões de correção e prevenção de problemas.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Detecção de inconsistências</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Sugestões de correção automáticas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Card 6 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-lawyer-800 mb-3">Segurança & Auditoria</h3>
                <p className="text-lawyer-600 mb-4">
                  Proteção completa dos dados com trilhas de auditoria, autenticação em dois fatores e controle de permissões.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Autenticação em dois fatores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-lawyer-700">Controle granular de permissões</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-lawyer-800">
              Benefícios do Sistema
            </h2>
            <p className="text-lawyer-600 md:text-lg max-w-2xl mx-auto">
              Descubra como nossa solução pode transformar a gestão tributária do seu escritório
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-lawyer-800 mb-2">Economia de Tempo</h3>
              <p className="text-lawyer-600">
                Automatização de processos que reduz em até 70% o tempo gasto em tarefas operacionais.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-lawyer-800 mb-2">Aumento de Receita</h3>
              <p className="text-lawyer-600">
                Identificação de oportunidades de recuperação de créditos que podem aumentar a receita em até 30%.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-lawyer-800 mb-2">Satisfação do Cliente</h3>
              <p className="text-lawyer-600">
                Atendimento mais ágil e resultados consistentes que elevam a satisfação e retenção dos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 bg-grid-white/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <AnimatedLogo size="large" className="mx-auto mb-6" showText={false} />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Pronto para otimizar sua gestão tributária?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Agende uma demonstração com nossa equipe e descubra como podemos ajudar seu escritório a maximizar resultados.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-xl border-2 border-white/20 shadow-xl">
                  <span className="flex items-center justify-center text-lg font-semibold">
                    Acessar Sistema
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-lawyer-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lawyer-200">
              © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
            </p>
            <div className="flex items-center">
              <p className="text-lawyer-200 mr-3">
                Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-white hover:text-lawyer-300 transition-colors">Alex Developer</a>
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-lawyer-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-lawyer-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-lawyer-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-lawyer-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
