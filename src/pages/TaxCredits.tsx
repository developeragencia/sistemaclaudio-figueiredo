
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Calculator, FileCheck, BarChart3 } from 'lucide-react';

// Import components
import TaxCreditsTable from '@/components/tax-credits/TaxCreditsTable';
import TaxCreditsSummary from '@/components/tax-credits/TaxCreditsSummary';
import TaxCreditsCalculator from '@/components/tax-credits/TaxCreditsCalculator';
import TaxCreditsTimeline from '@/components/tax-credits/TaxCreditsTimeline';

const TaxCredits = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Créditos Tributários</h1>
        <p className="text-muted-foreground">
          Gestão completa de créditos tributários: identifique, calcule e recupere valores.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gestão de Créditos Tributários</CardTitle>
          <CardDescription>
            Sistema integrado para controle e recuperação de créditos fiscais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="table">Créditos Disponíveis</TabsTrigger>
              <TabsTrigger value="summary">Resumo Gerencial</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table" className="mt-0">
              <TaxCreditsTable />
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0">
              <TaxCreditsSummary />
            </TabsContent>
            
            <TabsContent value="calculator" className="mt-0">
              <TaxCreditsCalculator />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <TaxCreditsTimeline />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCredits;
