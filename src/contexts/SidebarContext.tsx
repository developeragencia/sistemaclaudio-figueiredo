
import React, { createContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isCompact: boolean;
  toggleCompact: () => void;
  expandedItems: string[];
  toggleExpanded: (itemLabel: string) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCompact: false,
  toggleCompact: () => {},
  expandedItems: [],
  toggleExpanded: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <SidebarContext.Provider 
      value={{
        isCompact,
        toggleCompact,
        expandedItems,
        toggleExpanded
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => React.useContext(SidebarContext);
