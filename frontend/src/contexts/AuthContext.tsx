import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

interface SignInCredentials {
  email: string;
  password: string;
  twoFactorToken?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@BueiroDigital:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = useCallback(async ({ email, password, twoFactorToken }: SignInCredentials) => {
    try {
      const response = await api.post('/auth/login', {
        username: email,
        password,
        ...(twoFactorToken && { two_factor_token: twoFactorToken }),
      });

      const { access_token, user: userData } = response.data;

      localStorage.setItem('@BueiroDigital:token', access_token);
      localStorage.setItem('@BueiroDigital:user', JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      throw new Error('Erro na autenticação');
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@BueiroDigital:token');
    localStorage.removeItem('@BueiroDigital:user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 