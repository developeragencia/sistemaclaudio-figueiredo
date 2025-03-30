import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { 
  ArrowRight,
  CheckCircle,
  Shield,
  BarChart3,
  FileText,
  FileSearch,
  LayoutDashboard,
  Calculator,
  Database
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="medium" />
          </div>
          <Link to="/login">
            <Button variant="default" className="bg-lawyer-800 hover:bg-lawyer-700 transition-all duration-300 transform hover:scale-105">
              Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/40 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0 animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-lawyer-900 leading-tight">
                Sistema de <span className="text-sky-600">Gestão Tributária</span> para Escritórios de Advocacia
              </h1>
              <p className="text-xl text-lawyer-600 max-w-xl mb-10 leading-relaxed">
                Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105">
                    Acessar Sistema <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-in-right">
              <div className="relative bg-white rounded-xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" alt="Dashboard Preview" className="rounded-lg w-full object-cover" />
                <div className="absolute -bottom-4 -left-4 bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  Recuperação de Impostos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reimagined Feature Carousel Section */}
      <section className="py-16 bg-gradient-to-r from-sky-100 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-lawyer-800 animate-fade-in">
              Sistema Completo para Gestão Tributária
            </h2>
            <p className="text-lawyer-600 md:text-lg max-w-2xl mx-auto animate-fade-in delay-100">
              Ferramenta especializada para escritórios que buscam excelência em consultoria fiscal
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* Painel Administrador */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-blue-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <LayoutDashboard className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">Painel Administrador</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">Controle total sobre todas as operações em uma interface intuitiva e completa</p>
                      <Link to="/dashboard" className="mt-auto">
                        <Button variant="outline" className="border-blue-200 hover:border-blue-400 text-blue-700 hover:text-blue-800 hover:bg-blue-50 w-full">
                          Acessar Painel
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>

                {/* Cálculos e Recuperação */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-green-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <Calculator className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">Cálculos e Recuperação</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">Identifique e recupere créditos tributários com precisão e segurança jurídica</p>
                      <Link to="/irrf-calculations" className="mt-auto">
                        <Button variant="outline" className="border-green-200 hover:border-green-400 text-green-700 hover:text-green-800 hover:bg-green-50 w-full">
                          Iniciar Cálculos
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>

                {/* Importação de Dados */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-purple-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <FileSearch className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">Importação de Dados</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">Importe e processe dados de diversas fontes com facilidade e segurança</p>
                      <Link to="/operational-import" className="mt-auto">
                        <Button variant="outline" className="border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 w-full">
                          Importar Dados
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>

                {/* Auditoria Tributária */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-amber-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">Auditoria Tributária</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">Análises detalhadas e completas para garantir conformidade fiscal</p>
                      <Link to="/tax-audit" className="mt-auto">
                        <Button variant="outline" className="border-amber-200 hover:border-amber-400 text-amber-700 hover:text-amber-800 hover:bg-amber-50 w-full">
                          Iniciar Auditoria
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>

                {/* Sistema Operacional */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-cyan-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-cyan-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="rounded-full bg-cyan-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <Database className="w-6 h-6 text-cyan-600" />
                      </div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">Sistema Operacional</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">Gestão completa das operações diárias com automação e controle</p>
                      <Link to="/operational-dashboard" className="mt-auto">
                        <Button variant="outline" className="border-cyan-200 hover:border-cyan-400 text-cyan-700 hover:text-cyan-800 hover:bg-cyan-50 w-full">
                          Ver Operações
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex items-center justify-center mt-8 gap-4">
                <CarouselPrevious className="static transform-none bg-sky-600 hover:bg-sky-700 text-white border-none" />
                <CarouselNext className="static transform-none bg-sky-600 hover:bg-sky-700 text-white border-none" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Redesigned System Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 bg-grid-white/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <AnimatedLogo size="large" className="mx-auto mb-6" showText={false} />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Sistema Claudio Figueiredo v1.0
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Solução completa e integrada para gestão tributária com foco em resultados concretos para seu escritório.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-6 rounded-xl border-2 border-white/20 shadow-xl">
                  <span className="flex items-center justify-center text-lg font-semibold">
                    Acessar Sistema
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Interface Intuitiva</h3>
                <p className="text-blue-100">Navegação simplificada e recursos facilmente acessíveis</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Tecnologia Avançada</h3>
                <p className="text-blue-100">Sistema desenvolvido com as mais modernas tecnologias do mercado</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Resultados Garantidos</h3>
                <p className="text-blue-100">Ferramentas que maximizam a eficiência e produtividade da sua equipe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 bg-gradient-to-r from-sky-700 to-sky-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 bg-grid-white/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <AnimatedLogo size="large" className="mx-auto mb-6" showText={false} />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Pronto para otimizar sua gestão tributária?
              </h2>
              <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
                Agende uma demonstração com nossa equipe e descubra como podemos ajudar seu escritório a maximizar resultados.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-sky-800 hover:bg-sky-50 px-8 py-6 rounded-xl border-2 border-white/20 shadow-xl">
                  <span className="flex items-center justify-center text-lg font-semibold">
                    Acessar Sistema
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Fácil Integração</h3>
                <p className="text-sky-100">Conecte-se rapidamente com seus sistemas existentes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Suporte Dedicado</h3>
                <p className="text-sky-100">Equipe especializada pronta para ajudar quando necessário</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Resultados Comprovados</h3>
                <p className="text-sky-100">Maximize a recuperação de créditos com métodos eficientes</p>
              </div>
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
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.504.344-1.857.182-.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.043v.08c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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
