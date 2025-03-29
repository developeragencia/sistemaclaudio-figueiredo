
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle, Save, Image, Check, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '@/components/ui/separator';

const SiteEditor: React.FC = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock data for the site content
  const [siteContent, setSiteContent] = useState({
    hero: {
      title: "Sistema de Gestão Tributária para Escritórios de Advocacia",
      subtitle: "Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.",
      ctaText: "Acessar Sistema"
    },
    benefits: {
      title: "Benefícios Principais",
      subtitle: "Nossa plataforma foi desenvolvida para otimizar processos e maximizar resultados.",
      items: [
        {
          title: "Aumento de Produtividade",
          description: "Processos automatizados que economizam tempo e reduzem erros operacionais."
        },
        {
          title: "Conformidade Fiscal",
          description: "Garanta que sua empresa esteja sempre em dia com as obrigações fiscais."
        },
        {
          title: "Economia de Tempo",
          description: "Reduza drasticamente o tempo gasto em tarefas manuais e repetitivas."
        }
      ]
    },
    features: {
      title: "Funcionalidades Principais",
      subtitle: "Conheça as ferramentas que irão transformar a gestão tributária da sua empresa.",
      items: [
        {
          title: "Auditoria Tributária",
          description: "Análise completa da situação fiscal da sua empresa para identificar oportunidades de economia."
        },
        {
          title: "Cálculos Fiscais",
          description: "Ferramentas precisas para calcular impostos e identificar créditos tributários."
        }
      ]
    },
    testimonials: {
      title: "O Que Dizem Nossos Clientes",
      subtitle: "Depoimentos de quem já experimentou nossa solução e transformou sua gestão tributária.",
      items: [
        {
          name: "Maria Silva",
          role: "Diretora Financeira",
          company: "Tech Solutions Ltda",
          content: "O sistema de gestão tributária transformou completamente nossa maneira de gerenciar impostos. Economizamos tempo e recursos significativos."
        }
      ]
    },
    cta: {
      title: "Pronto para Otimizar sua Gestão Tributária?",
      subtitle: "Agende uma demonstração com nossa equipe e descubra como podemos ajudar seu escritório a maximizar resultados.",
      buttonText: "Comece Agora"
    },
    footer: {
      developerName: "Alex Developer",
      developerUrl: "https://alexdesenvolvedor.com.br",
      socialLinks: [
        { platform: "Facebook", url: "#" },
        { platform: "Twitter", url: "#" },
        { platform: "Instagram", url: "#" },
        { platform: "GitHub", url: "#" }
      ]
    }
  });

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving to the backend
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Conteúdo salvo",
        description: "As alterações foram salvas com sucesso.",
        duration: 3000
      });
    }, 1000);
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteContent({
      ...siteContent,
      hero: {
        ...siteContent.hero,
        [name]: value
      }
    });
  };

  const handleBenefitChange = (index: number, field: string, value: string) => {
    const updatedBenefits = [...siteContent.benefits.items];
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      [field]: value
    };
    
    setSiteContent({
      ...siteContent,
      benefits: {
        ...siteContent.benefits,
        items: updatedBenefits
      }
    });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...siteContent.testimonials.items];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    
    setSiteContent({
      ...siteContent,
      testimonials: {
        ...siteContent.testimonials,
        items: updatedTestimonials
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-lawyer-800">Editor de Site</h1>
          <p className="text-lawyer-600">Personalize o conteúdo da página inicial do site</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-lawyer-800 hover:bg-lawyer-700"
        >
          {saving ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <Tabs defaultValue="hero">
          <TabsList className="grid grid-cols-5 w-full border-b">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="benefits">Benefícios</TabsTrigger>
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
            <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
            <TabsTrigger value="footer">Rodapé</TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero" className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Seção Principal (Hero)</CardTitle>
                <CardDescription>Edite o conteúdo da seção principal do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Título</Label>
                  <Input 
                    id="hero-title" 
                    name="title" 
                    value={siteContent.hero.title} 
                    onChange={handleHeroChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Textarea 
                    id="hero-subtitle" 
                    name="subtitle" 
                    value={siteContent.hero.subtitle} 
                    onChange={handleHeroChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-cta">Texto do Botão</Label>
                  <Input 
                    id="hero-cta" 
                    name="ctaText" 
                    value={siteContent.hero.ctaText} 
                    onChange={handleHeroChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Imagem do Hero</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button variant="outline">Alterar Imagem</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Seção de Benefícios</CardTitle>
                <CardDescription>Edite os benefícios apresentados no site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Título da Seção</Label>
                  <Input 
                    value={siteContent.benefits.title} 
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      benefits: { ...siteContent.benefits, title: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo da Seção</Label>
                  <Textarea 
                    value={siteContent.benefits.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      benefits: { ...siteContent.benefits, subtitle: e.target.value }
                    })}
                    rows={2}
                  />
                </div>
                
                <Separator className="my-4" />
                
                {siteContent.benefits.items.map((benefit, index) => (
                  <div key={index} className="space-y-4 p-4 border border-lawyer-100 rounded-lg">
                    <h3 className="font-medium">Benefício {index + 1}</h3>
                    <div className="space-y-2">
                      <Label>Título</Label>
                      <Input 
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea 
                        value={benefit.description}
                        onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Seção de Funcionalidades</CardTitle>
                <CardDescription>Edite as funcionalidades apresentadas no site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Título da Seção</Label>
                    <Input 
                      value={siteContent.features.title} 
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        features: { ...siteContent.features, title: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtítulo da Seção</Label>
                    <Textarea 
                      value={siteContent.features.subtitle}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        features: { ...siteContent.features, subtitle: e.target.value }
                      })}
                      rows={2}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {siteContent.features.items.map((feature, index) => (
                    <div key={index} className="space-y-4 p-4 border border-lawyer-100 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Funcionalidade {index + 1}</h3>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lawyer-50">
                          <BarChart3 className="h-6 w-6 text-lawyer-700" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input 
                          value={feature.title}
                          onChange={(e) => {
                            const updatedFeatures = [...siteContent.features.items];
                            updatedFeatures[index] = {
                              ...updatedFeatures[index],
                              title: e.target.value
                            };
                            setSiteContent({
                              ...siteContent,
                              features: {
                                ...siteContent.features,
                                items: updatedFeatures
                              }
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea 
                          value={feature.description}
                          onChange={(e) => {
                            const updatedFeatures = [...siteContent.features.items];
                            updatedFeatures[index] = {
                              ...updatedFeatures[index],
                              description: e.target.value
                            };
                            setSiteContent({
                              ...siteContent,
                              features: {
                                ...siteContent.features,
                                items: updatedFeatures
                              }
                            });
                          }}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSiteContent({
                          ...siteContent,
                          features: {
                            ...siteContent.features,
                            items: [
                              ...siteContent.features.items,
                              { title: "Nova Funcionalidade", description: "Descrição da nova funcionalidade" }
                            ]
                          }
                        });
                      }}
                    >
                      + Adicionar Funcionalidade
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Seção de Depoimentos</CardTitle>
                <CardDescription>Edite os depoimentos de clientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Título da Seção</Label>
                  <Input 
                    value={siteContent.testimonials.title} 
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      testimonials: { ...siteContent.testimonials, title: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo da Seção</Label>
                  <Textarea 
                    value={siteContent.testimonials.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      testimonials: { ...siteContent.testimonials, subtitle: e.target.value }
                    })}
                    rows={2}
                  />
                </div>
                
                <Separator className="my-4" />
                
                {siteContent.testimonials.items.map((testimonial, index) => (
                  <div key={index} className="space-y-4 p-4 border border-lawyer-100 rounded-lg mb-4">
                    <h3 className="font-medium">Depoimento {index + 1}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input 
                          value={testimonial.name}
                          onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input 
                          value={testimonial.role}
                          onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Empresa</Label>
                      <Input 
                        value={testimonial.company}
                        onChange={(e) => handleTestimonialChange(index, 'company', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Depoimento</Label>
                      <Textarea 
                        value={testimonial.content}
                        onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSiteContent({
                        ...siteContent,
                        testimonials: {
                          ...siteContent.testimonials,
                          items: [
                            ...siteContent.testimonials.items,
                            { 
                              name: "Novo Cliente", 
                              role: "Cargo", 
                              company: "Empresa", 
                              content: "Depoimento do cliente sobre nossa solução." 
                            }
                          ]
                        }
                      });
                    }}
                  >
                    + Adicionar Depoimento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer" className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Rodapé</CardTitle>
                <CardDescription>Edite as informações de contato e redes sociais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="developer-name">Nome do Desenvolvedor</Label>
                  <Input 
                    id="developer-name"
                    value={siteContent.footer.developerName}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      footer: { 
                        ...siteContent.footer, 
                        developerName: e.target.value 
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="developer-url">URL do Desenvolvedor</Label>
                  <Input 
                    id="developer-url"
                    value={siteContent.footer.developerUrl}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      footer: { 
                        ...siteContent.footer, 
                        developerUrl: e.target.value 
                      }
                    })}
                  />
                </div>
                
                <Separator className="my-4" />
                <h3 className="font-medium mb-4">Links Redes Sociais</h3>
                
                {siteContent.footer.socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <Label>Plataforma</Label>
                      <Input 
                        value={link.platform}
                        onChange={(e) => {
                          const updatedLinks = [...siteContent.footer.socialLinks];
                          updatedLinks[index] = {
                            ...updatedLinks[index],
                            platform: e.target.value
                          };
                          setSiteContent({
                            ...siteContent,
                            footer: {
                              ...siteContent.footer,
                              socialLinks: updatedLinks
                            }
                          });
                        }}
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input 
                        value={link.url}
                        onChange={(e) => {
                          const updatedLinks = [...siteContent.footer.socialLinks];
                          updatedLinks[index] = {
                            ...updatedLinks[index],
                            url: e.target.value
                          };
                          setSiteContent({
                            ...siteContent,
                            footer: {
                              ...siteContent.footer,
                              socialLinks: updatedLinks
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Alterações no rodapé serão aplicadas em todas as páginas do site.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteEditor;
