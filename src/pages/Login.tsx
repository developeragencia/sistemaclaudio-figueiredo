
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { UserRole } from '@/types';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <LoginHeader />
        
        <Card className="shadow-lg border-sky-100">
          <CardHeader className="bg-sky-50/50 space-y-1">
            <CardTitle className="text-sky-800 text-2xl text-center">Acesso ao Sistema</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <LoginForm onSubmit={handleLogin} />
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <LoginFooter />
          </CardFooter>
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
