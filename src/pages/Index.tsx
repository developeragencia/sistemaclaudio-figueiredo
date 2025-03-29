import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, Users, CheckCircle2, ArrowRight, 
  ChevronLeft, ChevronRight, ChevronRightCircle
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  // Timeline data
  const timelineItems = [
    {
      id: 1,
      title: "Análise preliminar concluída",
      date: "Hoje",
      status: "Concluído",
      statusColor: "bg-green-500"
    },
    {
      id: 2,
      title: "Levantamento de documentos",
      date: "Ontem",
      status: "Concluído",
      statusColor: "bg-green-500"
    },
    {
      id: 3,
      title: "Cálculo de projeção de créditos",
      date: "07/09",
      status: "Em andamento",
      statusColor: "bg-amber-500"
    }
  ];

  // Feature cards data
  const featureCards = [
    {
      title: "Recuperação IRRF/PJ",
      description: "Maximize seus créditos tributários com nossa solução especializada",
      icon: <ChevronRightCircle className="h-6 w-6" />
    },
    {
      title: "Gestão de Clientes",
      description: "Acompanhe processos e resultados dos seus clientes em tempo real",
      icon: <ChevronRightCircle className="h-6 w-6" />
    },
    {
      title: "Cálculos Tributários",
      description: "Automatize cálculos complexos e reduza riscos de conformidade",
      icon: <ChevronRightCircle className="h-6 w-6" />
    },
    {
      title: "Relatórios Fiscais",
      description: "Visualize dados detalhados sobre sua recuperação de créditos",
      icon: <ChevronRightCircle className="h-6 w-6" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Modernizado */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-taxBlue-800 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,178,172,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(26,54,93,0.2),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1 bg-taxTeal-400/20 rounded-full text-taxTeal-400 text-sm font-medium mb-4">
                Soluções Avançadas em Recuperação de Créditos
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
                <span className="text-taxTeal-400">Recuperação de Créditos IRRF/PJ</span> de Forma Inteligente
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Sistema automatizado para apuração e recuperação de créditos tributários, 
                garantindo conformidade e otimizando sua gestão fiscal.
              </p>
              
              <Link to="/dashboard">
                <Button className="mt-6 hover-scale bg-taxTeal-400 hover:bg-taxTeal-500 text-black font-medium px-8 py-6 rounded-md transition-all group">
                  <span>Acessar Sistemas</span>
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1">
              <div className="glass-card p-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover-card transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-xl">
                <div className="logo-container mb-8 flex justify-center">
                  <div className="cloned-logo animate-logo scale-150">
                    <div className="logo-triangle"></div>
                    <div className="logo-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Section - Redesenhado */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-taxBlue-50 text-taxBlue-800 rounded-full text-sm font-medium mb-4">
              Nossos Serviços
            </span>
            <h2 className="text-4xl font-bold mb-4">Nossas Soluções</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore nossos recursos especializados para maximizar sua eficiência tributária</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featureCards.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
                  <Card className="hover-card h-[220px] overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="flex flex-col justify-between p-8 h-full">
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-taxBlue-800">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <div className="rounded-full bg-taxTeal-400/10 p-3 text-taxTeal-600">
                          {feature.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative static bg-white border-gray-200 shadow-md hover:bg-gray-50 hover:border-gray-300" />
              <CarouselNext className="relative static bg-white border-gray-200 shadow-md hover:bg-gray-50 hover:border-gray-300" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Dashboard Section - Redesenhado */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-taxBlue-50 text-taxBlue-800 rounded-full text-sm font-medium mb-4">
              Dados em Tempo Real
            </span>
            <h2 className="text-4xl font-bold mb-4">Dashboard Fiscal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Acompanhe seus resultados e economias em tempo real</p>
          </div>
          
          {/* Stats Cards - Redesenhados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard 
              title="Economia" 
              value="32%" 
              icon={<BarChart4 className="h-6 w-6 text-taxTeal-600" />}
              className="hover-card border-none shadow-lg"
            />
            <StatCard 
              title="Processos" 
              value="145" 
              icon={<Users className="h-6 w-6 text-taxTeal-600" />}
              className="hover-card border-none shadow-lg"
            />
            <StatCard 
              title="Sucesso" 
              value="98%" 
              icon={<CheckCircle2 className="h-6 w-6 text-taxTeal-600" />}
              className="hover-card border-none shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Evolução Card */}
            <Card className="hover-card overflow-hidden border-none shadow-lg bg-white">
              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="text-2xl text-taxBlue-800">Evolução de Recuperação</CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Análise Tributária</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Otimizado
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Distribuição de Créditos</span>
                      <span className="text-sm font-medium text-taxBlue-800">72%</span>
                    </div>
                    <Progress value={72} className="h-2 bg-gray-100" indicatorClassName="bg-taxTeal-400" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Eficiência Processual</span>
                      <span className="text-sm font-medium text-taxBlue-800">89%</span>
                    </div>
                    <Progress value={89} className="h-2 bg-gray-100" indicatorClassName="bg-taxTeal-400" />
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center text-sm text-green-700">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                      </svg>
                      <span>15% de crescimento este mês</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Card */}
            <Card className="hover-card border-none shadow-lg bg-white">
              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="text-2xl text-taxBlue-800">Timeline de Atividades</CardTitle>
                <p className="text-sm text-gray-500">Em Tempo Real</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {timelineItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`h-3 w-3 rounded-full ${item.statusColor}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{item.date}</span>
                          <span className={`font-medium ${item.status === "Concluído" ? "text-green-600" : "text-amber-600"}`}>{item.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer - Redesenhado */}
      <footer className="bg-gradient-to-b from-taxBlue-900 to-gray-900 text-gray-300 py-16 mt-auto">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <div className="cloned-logo scale-75">
                    <div className="logo-triangle"></div>
                    <div className="logo-circle"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Sistema CF</h3>
              </div>
              <p className="text-sm mb-1">Desenvolvido por Alex Developer</p>
              <p className="text-sm">© 2025 Sistemas Claudio Figueiredo. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex justify-start md:justify-end items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taxTeal-400 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taxTeal-400 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.196 4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taxTeal-400 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
