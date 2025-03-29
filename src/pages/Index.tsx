
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, Users, CheckCircle2, ArrowRight, 
  ChevronLeft, ChevronRight 
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
      icon: <ChevronRight className="h-6 w-6" />
    },
    {
      title: "Gestão de Clientes",
      description: "Acompanhe processos e resultados dos seus clientes em tempo real",
      icon: <ChevronRight className="h-6 w-6" />
    },
    {
      title: "Cálculos Tributários",
      description: "Automatize cálculos complexos e reduza riscos de conformidade",
      icon: <ChevronRight className="h-6 w-6" />
    },
    {
      title: "Relatórios Fiscais",
      description: "Visualize dados detalhados sobre sua recuperação de créditos",
      icon: <ChevronRight className="h-6 w-6" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-6 animate-fade-in">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-taxTeal-400">Recuperação de Créditos IRRF/PJ</span> de Forma Inteligente
              </h1>
              
              <p className="text-lg text-gray-300">
                Sistema automatizado para apuração e recuperação de créditos tributários, 
                garantindo conformidade e otimizando sua gestão fiscal.
              </p>
              
              <Link to="/dashboard">
                <Button className="mt-6 hover-scale bg-taxTeal-400 hover:bg-taxTeal-500 text-black font-medium px-8 py-6 rounded-md transition-transform">
                  Acessar Sistemas
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 lg:max-w-md">
              <div className="glass-card p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover-card">
                <div className="logo-container mb-8 flex justify-center">
                  <div className="cloned-logo animate-logo scale-150">
                    <div className="logo-triangle"></div>
                    <div className="logo-circle"></div>
                  </div>
                </div>
                <h3 className="text-center text-xl font-semibold mb-4">Sistemas Claudio Figueiredo</h3>
                <p className="text-center text-gray-300">Soluções inteligentes para gestão tributária</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Nossas Soluções</h2>
            <p className="text-gray-500">Explore nossos recursos principais</p>
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
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="hover-card h-[200px] glass-card">
                      <CardContent className="flex flex-col justify-between p-6 h-full">
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-gray-500 text-sm mt-2">{feature.description}</p>
                        <div className="mt-4 flex justify-end">
                          <div className="rounded-full bg-gray-200 p-2">
                            {feature.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Dashboard Fiscal</h2>
            <p className="text-gray-500">Atualizado</p>
          </div>
          
          <Carousel
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full mb-12"
          >
            <CarouselContent>
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="p-1">
                  <StatCard 
                    title="Economia" 
                    value="32%" 
                    icon={<BarChart4 className="h-6 w-6 text-taxBlue-800" />}
                    className="hover-card"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="p-1">
                  <StatCard 
                    title="Processos" 
                    value="145" 
                    icon={<Users className="h-6 w-6 text-taxBlue-800" />}
                    className="hover-card"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="p-1">
                  <StatCard 
                    title="Sucesso" 
                    value="98%" 
                    icon={<CheckCircle2 className="h-6 w-6 text-taxBlue-800" />}
                    className="hover-card"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
          
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="basis-full md:basis-1/2">
                <div className="p-1">
                  <Card className="hover-card overflow-hidden">
                    <CardHeader>
                      <CardTitle>Evolução de Recuperação</CardTitle>
                      <p className="text-sm text-gray-500">Análise Tributária</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Otimizado
                      </span>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Distribuição de Créditos</span>
                            <span className="text-sm font-medium text-taxBlue-800">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Eficiência Processual</span>
                            <span className="text-sm font-medium text-taxBlue-800">89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                        
                        <div className="pt-4">
                          <div className="flex items-center text-sm text-green-700">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                              </svg>
                              15% de crescimento este mês
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/2">
                <div className="p-1">
                  <Card className="hover-card">
                    <CardHeader>
                      <CardTitle>Timeline de Atividades</CardTitle>
                      <p className="text-sm text-gray-500">Em Tempo Real</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {timelineItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className={`h-3 w-3 rounded-full ${item.statusColor}`}></div>
                            <div className="flex-1">
                              <p className="font-medium">{item.title}</p>
                              <div className="flex justify-between text-sm text-gray-500">
                                <span>{item.date}</span>
                                <span>{item.status}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">Desenvolvido por Alex Developer</p>
              <p className="text-sm">© 2025 Sistemas Claudio Figueiredo. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
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
