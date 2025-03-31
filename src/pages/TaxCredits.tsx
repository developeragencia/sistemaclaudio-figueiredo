
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Calculator, FileCheck, BarChart3 } from 'lucide-react';

// Import components
import TaxCreditsTable from '@/components/tax-credits/TaxCreditsTable';
import TaxCreditsSummary from '@/components/tax-credits/TaxCreditsSummary';
import TaxCreditsTimeline from '@/components/tax-credits/TaxCreditsTimeline';
import TaxCreditSimulator from '@/components/tax-credits/TaxCreditSimulator';
import TaxCreditsCalculator from '@/components/tax-credits/TaxCreditsCalculator';

const TaxCredits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col space-y-2" variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Créditos Tributários
        </h1>
        <p className="text-muted-foreground">
          Gestão completa de créditos tributários: identifique, calcule e recupere valores.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border shadow-lg border-blue-100/50 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50/50">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Gestão de Créditos Tributários
            </CardTitle>
            <CardDescription className="text-blue-600/70">
              Sistema integrado para controle e recuperação de créditos fiscais
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid grid-cols-5 p-2 bg-muted/30">
                <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-300">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Créditos Disponíveis
                </TabsTrigger>
                <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-300">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Resumo Gerencial
                </TabsTrigger>
                <TabsTrigger value="simulator" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-300">
                  <Calculator className="h-4 w-4 mr-2" />
                  Simulador
                </TabsTrigger>
                <TabsTrigger value="calculator" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-300">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculadora
                </TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-300">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Linha do Tempo
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="table" className="mt-0">
                  <TaxCreditsTable />
                </TabsContent>
                
                <TabsContent value="summary" className="mt-0">
                  <TaxCreditsSummary />
                </TabsContent>
                
                <TabsContent value="simulator" className="mt-0">
                  <TaxCreditSimulator />
                </TabsContent>
                
                <TabsContent value="calculator" className="mt-0">
                  <TaxCreditsCalculator />
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-0">
                  <TaxCreditsTimeline />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TaxCredits;
