import { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface SidebarContextData {
  isCompact: boolean;
  toggleCompact: () => void;
  expandedItems: string[];
  toggleExpanded: (itemLabel: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const SidebarContext = createContext<SidebarContextData>({} as SidebarContextData);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { theme: currentTheme, setTheme } = useTheme();
  
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

  useEffect(() => {
    localStorage.setItem('@SistemaAuditoria:sidebar-compact', JSON.stringify(isCompact));
  }, [isCompact]);

  useEffect(() => {
    localStorage.setItem('@SistemaAuditoria:sidebar-expanded', JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleCompact = () => setIsCompact(state => !state);

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(state => 
      state.includes(itemLabel)
        ? state.filter(item => item !== itemLabel)
        : [...state, itemLabel]
    );
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <SidebarContext.Provider 
      value={{
        isCompact,
        toggleCompact,
        expandedItems,
        toggleExpanded,
        theme: currentTheme || 'light',
        toggleTheme
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext); 