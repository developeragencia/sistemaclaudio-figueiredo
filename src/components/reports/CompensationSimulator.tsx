
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorIcon, PlusCircle, Download, LineChart } from 'lucide-react';

export function CompensationSimulator() {
  const [baseValue, setBaseValue] = useState<number>(10000);
  const [taxRate, setTaxRate] = useState<number>(4.65);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 3)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selicRate, setSelicRate] = useState<number>(0.92);
  const [compensationType, setCompensationType] = useState<string>("per_dcomp");
  const [result, setResult] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  // Calculate the compensation value
  useEffect(() => {
    if (baseValue && taxRate && startDate && endDate) {
      // Get the difference in months
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      
      // Calculate base tax amount
      const taxAmount = baseValue * (taxRate / 100);
      
      // Apply Selic correction
      const selicCorrection = taxAmount * ((selicRate / 100) * diffMonths);
      
      const totalCompensation = taxAmount + selicCorrection;
      setResult(totalCompensation);
      
      // Generate historical data for simulation
      const newHistoricalData = [];
      let currentDate = new Date(startDate);
      let accumulatedValue = taxAmount;
      
      while (currentDate <= end) {
        newHistoricalData.push({
          date: new Date(currentDate).toLocaleDateString('pt-BR'),
          value: accumulatedValue
        });
        
        // Move to next month and add Selic correction
        currentDate.setMonth(currentDate.getMonth() + 1);
        accumulatedValue += accumulatedValue * (selicRate / 100);
      }
      
      setHistoricalData(newHistoricalData);
    }
  }, [baseValue, taxRate, startDate, endDate, selicRate]);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-sky-50/50">
        <CardTitle className="text-sky-800 flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-sky-600" />
          Simulador de Compensação Tributária
        </CardTitle>
        <CardDescription>
          Simule valores de compensação com correção monetária pela taxa Selic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseValue">Valor Base (R$)</Label>
              <Input 
                id="baseValue"
                type="number" 
                value={baseValue}
                onChange={(e) => setBaseValue(Number(e.target.value))}
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">Alíquota (%)</Label>
              <Input 
                id="taxRate"
                type="number" 
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                step="0.01"
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <DatePicker
                date={startDate}
                onSelect={setStartDate}
                id="startDate"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <DatePicker
                date={endDate}
                onSelect={setEndDate}
                id="endDate"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="selicRate">Taxa Selic mensal (%)</Label>
              <Input 
                id="selicRate"
                type="number"
                value={selicRate}
                onChange={(e) => setSelicRate(Number(e.target.value))}
                step="0.01"
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compensationType">Tipo de Compensação</Label>
              <Select 
                value={compensationType} 
                onValueChange={setCompensationType}
              >
                <SelectTrigger className="border-sky-200 focus:border-sky-500">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_dcomp">PER/DCOMP</SelectItem>
                  <SelectItem value="judicial">Decisão Judicial</SelectItem>
                  <SelectItem value="administrative">Processo Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {result !== null && (
              <div className="p-4 bg-sky-50 rounded-md mt-4">
                <p className="text-sm text-sky-700 font-medium">Valor estimado para compensação:</p>
                <p className="text-xl font-bold text-sky-800">
                  R$ {result.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-sky-600 mt-1">
                  Valor original: R$ {(baseValue * (taxRate / 100)).toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-sky-600">
                  Correção Selic: R$ {(result - (baseValue * (taxRate / 100))).toFixed(2).replace('.', ',')}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between bg-sky-50/30">
        <div className="flex gap-2">
          <Button variant="outline" className="text-sky-700 border-sky-300">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Cálculo
          </Button>
          <Button variant="outline" className="text-sky-700 border-sky-300">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
        <Button className="bg-sky-700 hover:bg-sky-800">
          <LineChart className="mr-2 h-4 w-4" /> Ver Projeção
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CompensationSimulator;
