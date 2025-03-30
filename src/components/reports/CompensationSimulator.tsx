
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSpreadsheet, Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CompensationSimulator() {
  const { toast } = useToast();
  const [creditValue, setCreditValue] = useState<string>("0");
  const [creditDate, setCreditDate] = useState<Date | undefined>(new Date());
  const [compensationDate, setCompensationDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() + 3))
  );
  const [compensationType, setCompensationType] = useState<string>("perdcomp");
  const [correctedValue, setCorrectedValue] = useState<number | null>(null);

  const calculateCompensation = () => {
    // Simple calculation for demo purposes
    // In a real implementation, this would use the actual SELIC rates from an API
    const creditAmount = parseFloat(creditValue.replace(/[^\d.-]/g, ''));
    
    if (isNaN(creditAmount) || !creditDate || !compensationDate) {
      toast({
        title: "Erro na simulação",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive",
      });
      return;
    }

    // Calculate months difference
    const monthDiff = (compensationDate.getFullYear() - creditDate.getFullYear()) * 12 + 
                      compensationDate.getMonth() - creditDate.getMonth();
    
    // Apply a mock SELIC rate of 0.5% per month
    const selicMonthlyRate = 0.005;
    const corrected = creditAmount * Math.pow(1 + selicMonthlyRate, monthDiff);
    
    setCorrectedValue(corrected);
    
    toast({
      title: "Simulação realizada",
      description: "O valor corrigido foi calculado com base na taxa SELIC.",
      variant: "default",
    });
  };

  const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value) {
      value = (parseInt(value) / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      value = "0,00";
    }
    setCreditValue(value);
  };

  const exportReport = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório de simulação foi exportado com sucesso.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Valor do Crédito (R$)</Label>
                <Input
                  value={creditValue}
                  onChange={formatCurrency}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Data do Crédito Original</Label>
                <DatePicker
                  date={creditDate}
                  setDate={setCreditDate}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Data Prevista para Compensação</Label>
                <DatePicker
                  date={compensationDate}
                  setDate={setCompensationDate}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Compensação</Label>
                <Select
                  value={compensationType}
                  onValueChange={setCompensationType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perdcomp">PER/DCOMP</SelectItem>
                    <SelectItem value="judicial">Decisão Judicial</SelectItem>
                    <SelectItem value="administrativa">Processo Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculateCompensation}
                className="w-full bg-sky-700 hover:bg-sky-800"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Correção
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Resultado da Simulação</h3>
            
            {correctedValue !== null && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Valor Original:</div>
                  <div className="text-right font-medium">
                    {parseFloat(creditValue.replace(/[^\d.-]/g, '')).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Valor Corrigido:</div>
                  <div className="text-right font-medium text-green-600">
                    {correctedValue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Juros Acumulados:</div>
                  <div className="text-right font-medium text-sky-600">
                    {(correctedValue - parseFloat(creditValue.replace(/[^\d.-]/g, ''))).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Período:</div>
                  <div className="text-right">
                    {creditDate?.toLocaleDateString('pt-BR')} a {compensationDate?.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Tipo de Compensação:</div>
                  <div className="text-right capitalize">
                    {compensationType === "perdcomp" ? "PER/DCOMP" : 
                     compensationType === "judicial" ? "Decisão Judicial" : "Processo Administrativo"}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={exportReport} 
                    variant="outline" 
                    className="w-full border-sky-300 text-sky-700 hover:bg-sky-50"
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Exportar Relatório
                  </Button>
                </div>
              </div>
            )}
            
            {correctedValue === null && (
              <div className="py-8 text-center text-muted-foreground">
                Preencha os dados ao lado e clique em "Calcular Correção" para ver o resultado da simulação.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
