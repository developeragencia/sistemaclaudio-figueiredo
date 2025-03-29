
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  getSupplierByCNPJ, 
  addPayment, 
  getPaymentsByClientId, 
  auditPayment,
  getAuditReportsByClientId,
  getAllSuppliers
} from '../services/mockDatabaseService';
import { Payment, Supplier, AuditReport } from '../types';

const AuditTax = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('import');
  const [cnpjInput, setCnpjInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState<Supplier | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [taxWithheld, setTaxWithheld] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [auditReports, setAuditReports] = useState<AuditReport[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  
  // Mock client ID - in a real app, this would come from auth context
  const mockClientId = "client-123";
  
  // Format CNPJ for display
  const formatCNPJ = (cnpj: string) => {
    const cleaned = cnpj.replace(/[^\d]/g, '');
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };
  
  // Handle CNPJ lookup
  const handleLookupCNPJ = async () => {
    if (!cnpjInput) {
      toast({
        title: "CNPJ não informado",
        description: "Por favor, informe um CNPJ válido",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const supplier = await getSupplierByCNPJ(cnpjInput);
      setSupplierDetails(supplier);
      
      if (!supplier) {
        toast({
          title: "Fornecedor não encontrado",
          description: "Não foi possível encontrar informações para este CNPJ",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar CNPJ:", error);
      toast({
        title: "Erro ao buscar CNPJ",
        description: "Ocorreu um erro ao buscar informações do CNPJ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle payment record
  const handleAddPayment = () => {
    if (!supplierDetails) {
      toast({
        title: "Fornecedor não selecionado",
        description: "Por favor, busque um fornecedor pelo CNPJ",
        variant: "destructive",
      });
      return;
    }
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido",
        variant: "destructive",
      });
      return;
    }
    
    const parsedTaxWithheld = parseFloat(taxWithheld || '0');
    
    const newPayment = addPayment({
      clientId: mockClientId,
      supplierId: supplierDetails.id,
      amount,
      date: paymentDate ? new Date(paymentDate) : new Date(),
      description: paymentDescription,
      invoiceNumber: invoiceNumber,
      taxWithheld: isNaN(parsedTaxWithheld) ? 0 : parsedTaxWithheld
    });
    
    toast({
      title: "Pagamento registrado",
      description: "O pagamento foi registrado com sucesso",
    });
    
    // Reset form
    setPaymentAmount('');
    setPaymentDate('');
    setPaymentDescription('');
    setInvoiceNumber('');
    setTaxWithheld('');
    
    // Update payments list
    loadPayments();
  };
  
  // Load payments
  const loadPayments = () => {
    const clientPayments = getPaymentsByClientId(mockClientId);
    setPayments(clientPayments);
    
    const clientAuditReports = getAuditReportsByClientId(mockClientId);
    setAuditReports(clientAuditReports);
    
    const allSuppliers = getAllSuppliers();
    setSuppliers(allSuppliers);
  };
  
  // Handle audit payment
  const handleAuditPayment = async (paymentId: string) => {
    try {
      const auditResult = await auditPayment(paymentId);
      
      if (auditResult) {
        toast({
          title: "Auditoria concluída",
          description: auditResult.status === 'correct' 
            ? "O valor retido está correto!" 
            : "Foi detectada uma discrepância na retenção",
        });
        
        // Refresh data
        loadPayments();
      }
    } catch (error) {
      console.error("Erro ao auditar pagamento:", error);
      toast({
        title: "Erro na auditoria",
        description: "Não foi possível auditar este pagamento",
        variant: "destructive",
      });
    }
  };
  
  // Load data when tab changes
  React.useEffect(() => {
    if (activeTab === 'payments' || activeTab === 'audit') {
      loadPayments();
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Auditoria Fiscal e Tributária</h1>
      
      <Tabs defaultValue="import" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="import">Importar Dados</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="audit">Resultados da Auditoria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Importar Dados de Fornecedores</CardTitle>
              <CardDescription>
                Busque informações de fornecedores pelo CNPJ e registre pagamentos para análise posterior.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Label htmlFor="cnpj">CNPJ do Fornecedor</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={cnpjInput}
                    onChange={(e) => setCnpjInput(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleLookupCNPJ} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Buscando..." : "Buscar CNPJ"}
                  </Button>
                </div>
              </div>
              
              {supplierDetails && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Dados do Fornecedor</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Nome:</p>
                        <p className="text-sm">{supplierDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">CNPJ:</p>
                        <p className="text-sm">{formatCNPJ(supplierDetails.cnpj)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nome Fantasia:</p>
                        <p className="text-sm">{supplierDetails.tradeName || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Atividade Principal:</p>
                        <p className="text-sm">{supplierDetails.activityDescription || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Código da Atividade:</p>
                        <p className="text-sm">{supplierDetails.activityCode || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Regime Tributário:</p>
                        <p className="text-sm">{supplierDetails.taxRegime || 'Não informado'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Registrar Pagamento</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="invoiceNumber">Número da Nota Fiscal</Label>
                        <Input
                          id="invoiceNumber"
                          placeholder="NF-123456"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="paymentAmount">Valor do Pagamento (R$)</Label>
                        <Input
                          id="paymentAmount"
                          type="number"
                          placeholder="0,00"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paymentDate">Data do Pagamento</Label>
                        <Input
                          id="paymentDate"
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="taxWithheld">Valor Retido (R$)</Label>
                        <Input
                          id="taxWithheld"
                          type="number"
                          placeholder="0,00"
                          value={taxWithheld}
                          onChange={(e) => setTaxWithheld(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="paymentDescription">Descrição</Label>
                      <Input
                        id="paymentDescription"
                        placeholder="Descrição do pagamento"
                        value={paymentDescription}
                        onChange={(e) => setPaymentDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            {supplierDetails && (
              <CardFooter>
                <Button onClick={handleAddPayment}>Registrar Pagamento</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Registrados</CardTitle>
              <CardDescription>
                Visualize todos os pagamentos registrados e selecione pagamentos para auditoria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Nota Fiscal</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Valor Retido</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => {
                      const supplier = suppliers.find(s => s.id === payment.supplierId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>{supplier?.name || 'Desconhecido'}</TableCell>
                          <TableCell>{payment.invoiceNumber || 'N/A'}</TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{formatCurrency(payment.taxWithheld || 0)}</TableCell>
                          <TableCell>{payment.hasAudit ? 'Auditado' : 'Pendente'}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAuditPayment(payment.id)}
                              disabled={payment.hasAudit}
                            >
                              {payment.hasAudit ? 'Auditado' : 'Auditar'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum pagamento registrado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Auditoria</CardTitle>
              <CardDescription>
                Visualize os resultados da auditoria fiscal e tributária.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {auditReports.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Auditado</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {auditReports.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pagamentos Corretos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-500">
                          {auditReports.filter(ar => ar.status === 'correct').length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Com Discrepâncias</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-red-500">
                          {auditReports.filter(ar => ar.status === 'discrepancy').length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead>Valor Original</TableHead>
                        <TableHead>Retenção Aplicada</TableHead>
                        <TableHead>Retenção Calculada</TableHead>
                        <TableHead>Diferença</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditReports.map((report) => {
                        const supplier = suppliers.find(s => s.id === report.supplierId);
                        return (
                          <TableRow key={report.id}>
                            <TableCell>{supplier?.name || 'Desconhecido'}</TableCell>
                            <TableCell>{formatCurrency(report.originalAmount)}</TableCell>
                            <TableCell>{formatCurrency(report.actualTaxAmount)}</TableCell>
                            <TableCell>{formatCurrency(report.calculatedTaxAmount)}</TableCell>
                            <TableCell className={report.difference > 0 ? 'text-red-500' : report.difference < 0 ? 'text-amber-500' : 'text-green-500'}>
                              {formatCurrency(Math.abs(report.difference))}
                              {report.difference > 0 ? ' (a menos)' : report.difference < 0 ? ' (a mais)' : ''}
                            </TableCell>
                            <TableCell>
                              {report.status === 'correct' ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Correto
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Discrepância
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma auditoria realizada.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditTax;
