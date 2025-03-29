import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../config/supabase';

interface User {
  id: string;
  email: string;
  nome: string;
  perfil: 'admin' | 'escritorio' | 'cliente' | 'representante';
  clienteAtivo?: {
    id: string;
    cnpj: string;
    razaoSocial: string;
  };
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setClienteAtivo: (cliente: { id: string; cnpj: string; razaoSocial: string }) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const userData = await loadUserData(session?.user?.id);
        setUser(userData);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function loadUserData(userId: string | undefined): Promise<User | null> {
    if (!userId) return null;
    
    const { data: userData } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (userData) {
      return {
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        perfil: userData.perfil,
        clienteAtivo: userData.cliente_ativo
      };
    }
    return null;
  }

  async function checkUser() {
    try {
      const session = await supabase.auth.getSession();
      if (session) {
        const userData = await loadUserData(session.data.session?.user.id);
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userData = await loadUserData(session?.user.id);
      setUser(userData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  function setClienteAtivo(cliente: { id: string; cnpj: string; razaoSocial: string }) {
    if (user) {
      setUser({ ...user, clienteAtivo: cliente });
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, setClienteAtivo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
