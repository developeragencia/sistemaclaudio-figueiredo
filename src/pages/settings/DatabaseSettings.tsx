
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Database, DatabaseBackup, Download, FileLock2, FileUp, Loader2, RefreshCcw, Settings, Shield, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const DatabaseSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  const [optimizeInProgress, setOptimizeInProgress] = useState(false);
  const [connection, setConnection] = useState({
    host: 'localhost',
    port: '5432',
    database: 'tax_audit_db',
    username: 'admin',
    password: '********',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConnection(prev => ({ ...prev, [name]: value }));
  };

  const handleBackup = async () => {
    setBackupInProgress(true);
    setBackupProgress(0);
    
    // Simulate backup process
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        const next = prev + 10;
        return next > 100 ? 100 : next;
      });
    }, 500);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      toast({
        title: "Backup concluído",
        description: "O backup do banco de dados foi realizado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao realizar backup",
        description: "Ocorreu um erro durante o processo de backup.",
        variant: "destructive",
      });
    } finally {
      clearInterval(interval);
      setBackupInProgress(false);
      setBackupProgress(100);
      setTimeout(() => setBackupProgress(0), 2000);
    }
  };

  const handleRestore = async () => {
    setRestoreInProgress(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Restauração concluída",
        description: "O banco de dados foi restaurado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao restaurar banco de dados",
        description: "Ocorreu um erro durante o processo de restauração.",
        variant: "destructive",
      });
    } finally {
      setRestoreInProgress(false);
    }
  };

  const handleOptimize = async () => {
    setOptimizeInProgress(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Otimização concluída",
        description: "O banco de dados foi otimizado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao otimizar banco de dados",
        description: "Ocorreu um erro durante o processo de otimização.",
        variant: "destructive",
      });
    } finally {
      setOptimizeInProgress(false);
    }
  };

  const handleSaveConnection = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurações atualizadas",
        description: "As configurações de conexão foram atualizadas com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar configurações",
        description: "Ocorreu um erro ao atualizar as configurações de conexão.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Configurações de Banco de Dados</h3>
        <p className="text-muted-foreground">
          Gerencie as configurações e manutenção do banco de dados.
        </p>
      </div>
      
      <Alert variant="warning" className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Alterações nas configurações do banco de dados podem afetar o funcionamento do sistema.
          Certifique-se de realizar backups antes de fazer modificações.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-500" />
            Conexão com Banco de Dados
          </CardTitle>
          <CardDescription>
            Configure os parâmetros de conexão com o banco de dados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                name="host"
                value={connection.host}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="port">Porta</Label>
              <Input
                id="port"
                name="port"
                value={connection.port}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Nome do Banco de Dados</Label>
              <Input
                id="database"
                name="database"
                value={connection.database}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select defaultValue="postgres">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="mssql">SQL Server</SelectItem>
                  <SelectItem value="sqlite">SQLite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                value={connection.username}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={connection.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveConnection} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar configurações
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            Manutenção do Banco de Dados
          </CardTitle>
          <CardDescription>
            Realize operações de manutenção no banco de dados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <DatabaseBackup className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Backup</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Realize um backup completo do banco de dados.
              </p>
              {backupProgress > 0 && (
                <Progress value={backupProgress} className="h-2 mb-2" />
              )}
              <div className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  disabled={backupInProgress}
                  onClick={handleBackup}
                >
                  {backupInProgress ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-1" />
                  )}
                  Criar Backup
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  disabled={backupInProgress}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <FileUp className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Restauração</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Restaure o banco de dados a partir de um backup.
              </p>
              <div className="flex items-center mb-3">
                <Input 
                  type="file" 
                  disabled={restoreInProgress}
                  accept=".sql,.gz,.zip"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                disabled={restoreInProgress}
                onClick={handleRestore}
              >
                {restoreInProgress ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <FileLock2 className="h-4 w-4 mr-1" />
                )}
                Restaurar
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <RefreshCcw className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Otimização</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Otimize o desempenho do banco de dados.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                disabled={optimizeInProgress}
                onClick={handleOptimize}
              >
                {optimizeInProgress ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Settings className="h-4 w-4 mr-1" />
                )}
                Otimizar Banco de Dados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
