
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { ArrowLeft, LogIn, UserCircle, Key } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Admin credentials (in real app, these would be stored securely)
const ADMIN_EMAIL = "admin@sistemasclaudiofigueiredo.com.br";
const ADMIN_PASSWORD = "admin123";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Successful login
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao sistema de gerenciamento.",
          variant: "default",
        });
        // Use the auth context to login
        login(email);
        navigate("/dashboard");
      } else {
        // Failed login
        toast({
          title: "Falha no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 -right-20 w-60 h-60 bg-sky-300/10 rounded-full blur-3xl animate-pulse-slow delay-300"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-sky-100/20 rounded-full blur-3xl animate-pulse-slow delay-600"></div>
      </div>

      {/* Return to Home */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2 text-sky-800 hover:text-sky-600 transition-colors animated-link">
          <ArrowLeft size={20} />
          <span>Voltar para a página inicial</span>
        </Link>
      </div>
      
      {/* Login Card with Animation */}
      <div className="w-full max-w-md z-10 animate-scale-in">
        <Card className="border-sky-200 shadow-xl backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="mb-2 transform hover:scale-105 transition-transform duration-300">
              <AnimatedLogo size="large" />
            </div>
            <CardTitle className="text-2xl text-center text-sky-800">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-center text-sky-500">
              Entre com suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
                  <Input
                    className="pl-10 border-sky-300 focus:border-sky-800"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
                  <Input
                    className="pl-10 border-sky-300 focus:border-sky-800"
                    type="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-sky-800 hover:bg-sky-700 text-white group"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  "Entrando..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Entrar 
                    <LogIn className="inline-block transition-transform group-hover:translate-x-1" size={18} />
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sky-500 text-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
          © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
