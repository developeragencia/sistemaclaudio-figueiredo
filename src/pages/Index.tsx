
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, BarChart4, Users, CheckCircle2, ChevronRightCircle,
  ExternalLink, Briefcase, Calculator, FileText
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
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Efeito para animar elementos ao carregar a página
  useEffect(() => {
    setVisible(true);
    
    // Configura um intervalo para alternar entre seções
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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

  // Slides para o carrossel principal
  const mainSlides = [
    {
      title: "Recuperação de Créditos IRRF/PJ de Forma Inteligente",
      subtitle: "Soluções Avançadas em Recuperação de Créditos",
      description: "Sistema automatizado para apuração e recuperação de créditos tributários, garantindo conformidade e otimizando sua gestão fiscal.",
      image: "bg-[radial-gradient(circle_at_30%_30%,rgba(56,56,56,0.1),transparent_40%)]",
      icon: <Briefcase className="h-12 w-12 text-lawyer-800" />
    },
    {
      title: "Gestão Tributária Simplificada",
      subtitle: "Tecnologia a Serviço da Sua Empresa",
      description: "Plataforma integrada que simplifica processos fiscais complexos, reduzindo custos e maximizando resultados.",
      image: "bg-[radial-gradient(circle_at_30%_30%,rgba(76,76,76,0.1),transparent_40%)]",
      icon: <Calculator className="h-12 w-12 text-lawyer-800" />
    },
    {
      title: "Resultados Comprovados",
      subtitle: "Expertise em Recuperação de Créditos",
      description: "Equipe especializada e metodologia exclusiva para garantir o sucesso na recuperação de seus créditos tributários.",
      image: "bg-[radial-gradient(circle_at_30%_30%,rgba(120,120,120,0.1),transparent_40%)]",
      icon: <FileText className="h-12 w-12 text-lawyer-800" />
    }
  ];

  // Função para criar classes de animação baseadas no estado de visibilidade
  const getAnimationClass = (delay = 0) => {
    return visible ? `opacity-100 translate-y-0 transition-all duration-700 delay-${delay}` : 'opacity-0 translate-y-10';
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Carrossel Principal */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-white">
          {/* Background subtle patterns */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-lawyer-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-lawyer-200/20 rounded-full blur-3xl" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Animated carousel */}
            <div className="space-y-8 relative h-[400px]">
              {mainSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === activeSection 
                      ? 'opacity-100 translate-y-0 z-10' 
                      : 'opacity-0 translate-y-10 -z-10'
                  }`}
                >
                  <div className="inline-block px-4 py-1 bg-opacity-20 rounded-full text-sm font-medium mb-4"
                       style={{ backgroundColor: 'rgba(51,51,51,0.1)',
                                color: '#333333' }}>
                    {slide.subtitle}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-lawyer-800 mb-6">
                    {slide.title.split(' ').map((word, i) => (
                      <span 
                        key={i} 
                        className="inline-block animate-fade-in"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                  
                  <p className="text-lg text-lawyer-600 leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    {slide.description}
                  </p>
                  
                  <Link to="/dashboard">
                    <Button 
                      className="mt-8 hover-scale px-8 py-6 rounded-md transition-all duration-300 group animate-fade-in bg-lawyer-800 hover:bg-lawyer-700"
                      style={{ animationDelay: '0.7s' }}
                    >
                      <span className="text-white font-medium">Acessar Sistemas</span>
                      <ArrowRight className="ml-2 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              ))}

              {/* Indicators */}
              <div className="absolute bottom-0 left-0 flex space-x-2">
                {mainSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === index 
                        ? 'w-8 bg-lawyer-800' 
                        : 'bg-lawyer-300 hover:bg-lawyer-400'
                    }`}
                    aria-label={`Ir para o slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Visual element - Logo */}
            <div className={`flex justify-center items-center ${getAnimationClass(300)}`}>
              <div className="relative perspective-1000">
                <div className="relative w-full max-w-lg aspect-square transform hover:rotate-0 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-10 blur-xl animate-pulse"></div>
                  <div className="relative h-full glass-card rounded-2xl bg-white p-8 shadow-xl overflow-hidden border border-lawyer-200">
                    <div className={`logo-container mb-8 flex justify-center ${getAnimationClass(600)}`}>
                      <img src="/public/lovable-uploads/521c5609-a97d-478f-8a71-63e68cf8d9d8.png" 
                         alt="Advogados Associados" 
                         className="w-64 h-auto animate-fade-in" />
                    </div>
                    
                    <div className="space-y-6">
                      <div className={getAnimationClass(700)}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-lawyer-700">Progresso</span>
                          <span className="text-sm font-medium text-lawyer-800">65%</span>
                        </div>
                        <div className="h-2 w-full bg-lawyer-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-lawyer-800"
                            style={{ width: '65%', transition: 'width 1s ease-in-out' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className={getAnimationClass(800)}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-lawyer-700">Eficiência</span>
                          <span className="text-sm font-medium text-lawyer-800">89%</span>
                        </div>
                        <div className="h-2 w-full bg-lawyer-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-lawyer-800"
                            style={{ width: '89%', transition: 'width 1s ease-in-out' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center text-sm text-lawyer-800 mt-4 ${getAnimationClass(900)}`}>
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                        </svg>
                        <span>15% de crescimento mensal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-lawyer-300 flex justify-center p-1">
              <div className="w-1 h-3 bg-lawyer-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Section - Com animações melhoradas */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(51,51,51,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(51,51,51,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`mb-16 text-center ${getAnimationClass()}`}>
            <span className="inline-block px-4 py-2 bg-lawyer-100 text-lawyer-800 rounded-full text-sm font-medium mb-4">
              Nossos Serviços
            </span>
            <h2 className="text-4xl font-bold mb-4 text-lawyer-800">
              Soluções Inteligentes
            </h2>
            <p className="text-lawyer-600 max-w-2xl mx-auto">
              Explore nossos recursos especializados para maximizar sua eficiência tributária
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className={`w-full ${getAnimationClass(200)}`}
          >
            <CarouselContent>
              {featureCards.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="hover-card h-[260px] overflow-hidden border border-lawyer-200 shadow-lg bg-white">
                      <CardContent className="flex flex-col justify-between p-8 h-full">
                        <div className="space-y-4">
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-lawyer-50 to-lawyer-100">
                            {index === 0 ? <Briefcase className="h-6 w-6 text-lawyer-800" /> :
                             index === 1 ? <Users className="h-6 w-6 text-lawyer-800" /> :
                             index === 2 ? <Calculator className="h-6 w-6 text-lawyer-800" /> :
                             <FileText className="h-6 w-6 text-lawyer-800" />}
                          </div>
                          <h3 className="font-bold text-xl text-lawyer-800">{feature.title}</h3>
                          <p className="text-lawyer-600">{feature.description}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <div className="rounded-full bg-lawyer-100 p-3 text-lawyer-800">
                            {feature.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative static bg-white border-lawyer-200 shadow-md hover:bg-gray-50 hover:border-lawyer-300" />
              <CarouselNext className="relative static bg-white border-lawyer-200 shadow-md hover:bg-gray-50 hover:border-lawyer-300" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Dashboard Section - Com novas cores */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(51,51,51,0.05),transparent_60%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`mb-20 text-center ${getAnimationClass()}`}>
            <span className="inline-block px-4 py-2 bg-lawyer-100 text-lawyer-800 rounded-full text-sm font-medium mb-4">
              Dados em Tempo Real
            </span>
            <h2 className="text-4xl font-bold mb-4 text-lawyer-800">
              Dashboard Fiscal
            </h2>
            <p className="text-lawyer-600 max-w-2xl mx-auto">
              Acompanhe seus resultados e economias em tempo real com nossa plataforma intuitiva
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${getAnimationClass(200)}`}>
            <StatCard 
              title="Economia" 
              value="32%" 
              icon={<BarChart4 className="h-6 w-6 text-lawyer-800" />}
              className="hover-card border border-lawyer-200 shadow-lg bg-white"
            />
            <StatCard 
              title="Processos" 
              value="145" 
              icon={<Users className="h-6 w-6 text-lawyer-800" />}
              className="hover-card border border-lawyer-200 shadow-lg bg-white"
            />
            <StatCard 
              title="Sucesso" 
              value="98%" 
              icon={<CheckCircle2 className="h-6 w-6 text-green-600" />}
              className="hover-card border border-lawyer-200 shadow-lg bg-white"
            />
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${getAnimationClass(400)}`}>
            {/* Evolução Card */}
            <Card className="hover-card overflow-hidden border border-lawyer-200 shadow-lg bg-white">
              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="text-2xl text-lawyer-800">Evolução de Recuperação</CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-lawyer-600">Análise Tributária</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Otimizado
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-lawyer-700">Distribuição de Créditos</span>
                      <span className="text-sm font-medium text-lawyer-800">72%</span>
                    </div>
                    <Progress value={72} className="h-2 bg-lawyer-100" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-lawyer-700">Eficiência Processual</span>
                      <span className="text-sm font-medium text-lawyer-800">89%</span>
                    </div>
                    <Progress value={89} className="h-2 bg-lawyer-100" />
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
            <Card className="hover-card border border-lawyer-200 shadow-lg bg-white">
              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="text-2xl text-lawyer-800">Timeline de Atividades</CardTitle>
                <p className="text-sm text-lawyer-600">Em Tempo Real</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {timelineItems.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 ${
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${600 + idx * 200}ms` }}
                    >
                      <div className={`h-3 w-3 rounded-full ${item.statusColor}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-lawyer-800">{item.title}</p>
                        <div className="flex justify-between text-sm text-lawyer-600">
                          <span>{item.date}</span>
                          <span className={`font-medium ${item.status === "Concluído" ? "text-green-600" : "text-amber-600"}`}>
                            {item.status}
                          </span>
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
      
      {/* Footer - Com animações e link para alexdesenvolvedor.com.br */}
      <footer className="bg-lawyer-800 text-gray-300 py-16 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(51,51,51,0.3),transparent_30%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(26,26,26,0.3),transparent_40%)]"></div>
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 relative">
                  <div className="absolute top-0 left-0 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                  <div className="absolute top-0 left-4 w-4 h-4 bg-white border border-gray-300 transform rotate-45"></div>
                  <div className="absolute top-0 left-8 w-4 h-4 bg-white border border-gray-300 transform rotate-45"></div>
                  <div className="absolute top-4 left-0 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                  <div className="absolute top-4 left-4 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                  <div className="absolute top-4 left-8 w-4 h-4 bg-white border border-gray-300 transform rotate-45"></div>
                  <div className="absolute top-8 left-0 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                  <div className="absolute top-8 left-4 w-4 h-4 bg-white border border-gray-300 transform rotate-45"></div>
                  <div className="absolute top-8 left-8 w-4 h-4 bg-white border border-gray-300 transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-white">Advogados Associados</h3>
              </div>
              
              <p className="text-sm text-gray-400 max-w-md">
                Soluções inteligentes para recuperação de créditos fiscais,
                com tecnologia avançada e equipe especializada para maximizar seus resultados.
              </p>
              
              <div className="flex items-center space-x-2">
                <p className="text-sm">Desenvolvido por</p>
                <a 
                  href="https://alexdesenvolvedor.com.br" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm font-medium text-gray-200 hover:text-white flex items-center transition-colors group"
                >
                  <span className="animated-link">Alex Developer</span>
                  <ExternalLink className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              
              <p className="text-sm text-gray-500">© 2025 Advogados Associados. Todos os direitos reservados.</p>
            </div>
            
            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">Empresa</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white animated-link transition-colors">Sobre nós</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white animated-link transition-colors">Nosso time</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white animated-link transition-colors">Contato</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">Social</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.196 4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
