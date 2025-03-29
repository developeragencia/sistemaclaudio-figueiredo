
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  Calculator, 
  Users, 
  Settings,
  CheckCircle2,
  TrendingUp,
  Clock
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index: React.FC = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      company: "Tech Solutions Ltda",
      content: "O sistema de gestão tributária transformou completamente nossa maneira de gerenciar impostos. Economizamos tempo e recursos significativos.",
      role: "Diretora Financeira"
    },
    {
      name: "João Pereira",
      company: "Construtora Horizonte",
      content: "Recuperamos créditos tributários que nem sabíamos que existiam. A plataforma é intuitiva e o suporte é excepcional.",
      role: "Controller"
    },
    {
      name: "Ana Costa",
      company: "Indústrias Progresso",
      content: "A auditoria fiscal automatizada nos permitiu identificar e corrigir irregularidades antes que se tornassem problemas maiores.",
      role: "CFO"
    }
  ];
  
  const benefits = [
    {
      icon: <TrendingUp className="h-16 w-16 text-lawyer-800" />,
      title: "Aumento de Produtividade",
      description: "Processos automatizados que economizam tempo e reduzem erros operacionais."
    },
    {
      icon: <CheckCircle2 className="h-16 w-16 text-lawyer-800" />,
      title: "Conformidade Fiscal",
      description: "Garanta que sua empresa esteja sempre em dia com as obrigações fiscais."
    },
    {
      icon: <Clock className="h-16 w-16 text-lawyer-800" />,
      title: "Economia de Tempo",
      description: "Reduza drasticamente o tempo gasto em tarefas manuais e repetitivas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="medium" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-lawyer-700 hover:text-lawyer-900 font-medium animated-link">
              Funcionalidades
            </Link>
            <Link to="#benefits" className="text-lawyer-700 hover:text-lawyer-900 font-medium animated-link">
              Benefícios
            </Link>
            <Link to="#testimonials" className="text-lawyer-700 hover:text-lawyer-900 font-medium animated-link">
              Depoimentos
            </Link>
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
        <div className="absolute inset-0 bg-gradient-to-b from-lawyer-50/30 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0 animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-lawyer-900 leading-tight">
                Sistema de <span className="text-lawyer-700">Gestão Tributária</span> para Escritórios de Advocacia
              </h1>
              <p className="text-xl text-lawyer-600 max-w-xl mb-10 leading-relaxed">
                Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-lawyer-800 hover:bg-lawyer-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105">
                    Acessar Sistema <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="#features">
                  <Button size="lg" variant="outline" className="border-lawyer-300 text-lawyer-800 hover:bg-lawyer-50 transition-all duration-300">
                    Explorar Recursos
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-in-right">
              <div className="relative bg-white rounded-xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" alt="Dashboard Preview" className="rounded-lg w-full object-cover" />
                <div className="absolute -bottom-4 -left-4 bg-lawyer-800 text-white px-6 py-3 rounded-lg shadow-lg">
                  Interface Intuitiva
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-lawyer-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lawyer-900 mb-4">Benefícios Principais</h2>
            <p className="text-lawyer-600 max-w-2xl mx-auto">Nossa plataforma foi desenvolvida para otimizar processos e maximizar resultados.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-lawyer-800 mb-4">{benefit.title}</h3>
                  <p className="text-lawyer-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-lawyer-900">
              Funcionalidades Principais
            </h2>
            <p className="text-lawyer-600 max-w-2xl mx-auto">
              Conheça as ferramentas que irão transformar a gestão tributária da sua empresa.
            </p>
          </div>
          
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
      
      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20 bg-lawyer-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-lawyer-900">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="text-lawyer-600 max-w-2xl mx-auto">
              Depoimentos de quem já experimentou nossa solução e transformou sua gestão tributária.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto px-12">
            <Carousel 
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                    <div className="p-6">
                      <Card className="border-lawyer-200 hover:shadow-xl transition-all duration-300 h-full">
                        <CardContent className="p-8 flex flex-col h-full">
                          <div className="mb-6 text-lawyer-800">
                            <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-lawyer-300">
                              <path d="M13.515 0.75C5.985 5.86 0 14.155 0 22.06C0 29.23 5.15 36 12.0675 36C18.5625 36 23.205 30.4 23.205 24.145C23.205 18.305 18.78 13.325 12.495 13.325C11.7225 13.325 10.5675 13.535 10.08 13.655C11.52 10.22 17.0775 5.48 20.9325 3.475L13.515 0.75ZM35.31 0.75C27.7575 5.86 21.7725 14.155 21.7725 22.06C21.7725 29.23 26.9225 36 33.84 36C40.335 36 45 30.4 45 24.145C45 18.305 40.5525 13.325 34.2675 13.325C33.495 13.325 32.3625 13.535 31.875 13.655C33.315 10.22 38.8725 5.48 42.7275 3.475L35.31 0.75Z" />
                            </svg>
                          </div>
                          <p className="text-lg text-lawyer-700 mb-6 flex-grow">"{testimonial.content}"</p>
                          <div className="mt-6">
                            <p className="font-bold text-lawyer-800">{testimonial.name}</p>
                            <p className="text-lawyer-600">{testimonial.role}</p>
                            <p className="text-lawyer-500 text-sm">{testimonial.company}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="-left-12" />
                <CarouselNext className="-right-12" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-lawyer-800 to-lawyer-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Pronto para Otimizar sua Gestão Tributária?
                </h2>
                <p className="text-lawyer-100 mb-8 text-lg">
                  Agende uma demonstração com nossa equipe e descubra como podemos ajudar seu escritório a maximizar resultados.
                </p>
                <div>
                  <Link to="/login">
                    <Button size="lg" className="bg-white text-lawyer-800 hover:bg-lawyer-100 transition-all duration-300 shadow-lg">
                      Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-lawyer-900 opacity-20"></div>
                <img 
                  src="/lovable-uploads/521c5609-a97d-478f-8a71-63e68cf8d9d8.png" 
                  alt="Gestão Tributária" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lawyer-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col">
              <AnimatedLogo size="medium" showText={true} className="mb-6" />
              <p className="text-lawyer-200 mb-4">
                Sistema de Gestão Tributária para Advogados
              </p>
              <p className="text-lawyer-300 text-sm">
                Tecnologia avançada para recuperação de créditos e conformidade fiscal
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Nossa Equipe</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Guias Fiscais</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="text-lawyer-300 hover:text-white transition-colors">Licenças</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-lawyer-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-lawyer-400 text-sm">
              © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
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
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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
    <Card className="border-lawyer-200 hover-card transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-8">
        <div className="mb-6 bg-lawyer-50 w-16 h-16 rounded-lg flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-lawyer-800">{title}</h3>
        <p className="text-lawyer-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
