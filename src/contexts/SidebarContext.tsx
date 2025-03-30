import { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextData {
  isCompact: boolean;
  toggleCompact: () => void;
  expandedItems: string[];
  toggleExpanded: (itemLabel: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SidebarContext = createContext<SidebarContextData>({} as SidebarContextData);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Recupera estado do localStorage
  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('@SistemaAuditoria:sidebar-compact');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('@SistemaAuditoria:sidebar-expanded');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('@SistemaAuditoria:theme');
      return (saved as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Persiste alterações no localStorage
  useEffect(() => {
    localStorage.setItem('@SistemaAuditoria:sidebar-compact', JSON.stringify(isCompact));
  }, [isCompact]);

  useEffect(() => {
    localStorage.setItem('@SistemaAuditoria:sidebar-expanded', JSON.stringify(expandedItems));
  }, [expandedItems]);

  useEffect(() => {
    localStorage.setItem('@SistemaAuditoria:theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleCompact = () => setIsCompact(state => !state);

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(state => 
      state.includes(itemLabel)
        ? state.filter(item => item !== itemLabel)
        : [...state, itemLabel]
    );
  };

  const toggleTheme = () => setTheme(state => state === 'light' ? 'dark' : 'light');

  return (
    <SidebarContext.Provider 
      value={{
        isCompact,
        toggleCompact,
        expandedItems,
        toggleExpanded,
        theme,
        toggleTheme
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext); 