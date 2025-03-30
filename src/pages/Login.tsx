
import React, { useState, FormEvent } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Check, AlertTriangle, Lock, Mail } from 'lucide-react';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

function Login() {
  const [email, setEmail] = useState<string>('admin@claudiofigueiredo.com');
  const [password, setPassword] = useState<string>('password');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isAdminUser = email.includes('admin');
      
      // Determine user role
      const userRole: UserRole = email.includes('admin') 
        ? 'admin' 
        : email.includes('client') 
          ? 'client' 
          : email.includes('sales') 
            ? 'sales_rep' 
            : 'office_staff';

      // Check if the user requires 2FA (no longer required for admin users)
      if (!isAdminUser && email.includes('client')) {
        // Only redirect to 2FA for non-admin users
        toast({
          title: "Verificação adicional necessária",
          description: "Por favor, complete a autenticação de dois fatores.",
        });
        login(email, userRole); // Store login info for the 2FA component
        navigate('/2fa');
      } else {
        // For admin users or other roles, log in directly
        login(email, userRole);
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo de volta${isAdminUser ? ', Administrador' : ''}!`,
          variant: "default",
        });
        
        navigate('/dashboard');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro ao realizar login. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <AnimatedLogo size="large" showText={true} />
          <p className="text-sky-700 mt-2">
            Sistema de Auditoria e Gestão Tributária
          </p>
        </div>
        
        <Card className="shadow-lg border-sky-100">
          <CardHeader className="bg-sky-50/50 space-y-1">
            <CardTitle className="text-sky-800 text-2xl text-center">Acesso ao Sistema</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@exemplo.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Lembrar-me
                  </Label>
                </div>
                
                <a href="#" className="text-sm text-sky-600 hover:text-sky-800">
                  Esqueceu a senha?
                </a>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Este é um sistema de acesso restrito para clientes e usuários autorizados.
              </p>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Precisa de ajuda? Entre em contato com o suporte.
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        {/* Developer attribution */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 font-medium"
            >
              Alex Developer
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
