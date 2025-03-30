
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { UserRole } from '@/types';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
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
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro de login",
        description: "Não foi possível realizar o login. Verifique suas credenciais.",
        variant: "destructive",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  // Sparkle effects coordinates
  const sparkles = [
    { top: '10%', left: '5%', delay: 0 },
    { top: '15%', right: '10%', delay: 0.5 },
    { top: '50%', left: '15%', delay: 1 },
    { top: '70%', right: '8%', delay: 1.5 },
    { top: '80%', left: '8%', delay: 2 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Decorative circles and shapes */}
          <div className="absolute top-24 left-10 w-32 h-32 rounded-full border border-sky-100"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-sky-100"></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 rounded-full border border-sky-200"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-sky-50/30"></div>
          <div className="absolute bottom-32 right-20 w-20 h-20 rounded-full bg-sky-50/20"></div>
        </div>
      </div>
      
      {/* Animated sparkles */}
      {sparkles.map((sparkle, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70"
          style={{ top: sparkle.top, left: sparkle.left, right: sparkle.right }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            delay: sparkle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg w-full"
      >
        <motion.div variants={itemVariants}>
          <LoginHeader />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-xl border-sky-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 space-y-1 border-b border-sky-100">
              <CardTitle className="text-sky-800 text-2xl text-center font-bold">Acesso ao Sistema</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <LoginForm onSubmit={handleLogin} />
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-white to-sky-50/30">
              <LoginFooter />
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Return to Home button moved below the card */}
        <motion.div variants={itemVariants} className="mt-6 flex justify-center">
          <Link to="/">
            <Button 
              variant="outline" 
              className="text-sky-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2 group"
            >
              <ArrowLeft size={16} />
              Voltar para Home
            </Button>
          </Link>
        </motion.div>
        
        {/* Developer attribution */}
        <motion.div variants={itemVariants} className="text-center mt-6 text-sm text-gray-500">
          <p>
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 font-medium transition-colors duration-300 relative inline-block animated-link"
            >
              Alex Developer
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
