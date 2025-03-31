
import React, { createContext, useState, useEffect, useContext } from 'react';

interface SidebarContextType {
  isCompact: boolean;
  toggleCompact: () => void;
  expandedItems: string[];
  toggleExpanded: (itemLabel: string) => void;
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const SIDEBAR_STORAGE_KEY = '@SistemaAuditoria:sidebar';

export const SidebarContext = createContext<SidebarContextType>({
  isCompact: false,
  toggleCompact: () => {},
  expandedItems: [],
  toggleExpanded: () => {},
  activeItem: null,
  setActiveItem: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage
  const [sidebarState, setSidebarState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        isCompact: false,
        expandedItems: [],
        activeItem: null
      };
    }
    return {
      isCompact: false,
      expandedItems: [],
      activeItem: null
    };
  });

  const { isCompact, expandedItems, activeItem } = sidebarState;

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(sidebarState));
  }, [sidebarState]);

  const toggleCompact = () => {
    setSidebarState(state => ({
      ...state,
      isCompact: !state.isCompact
    }));
  };

  const toggleExpanded = (itemLabel: string) => {
    setSidebarState(state => {
      const newExpandedItems = state.expandedItems.includes(itemLabel)
        ? state.expandedItems.filter(item => item !== itemLabel)
        : [...state.expandedItems, itemLabel];
      
      return {
        ...state,
        expandedItems: newExpandedItems
      };
    });
  };

  const setActiveItem = (item: string | null) => {
    setSidebarState(state => ({
      ...state,
      activeItem: item
    }));
  };

  return (
    <SidebarContext.Provider 
      value={{
        isCompact,
        toggleCompact,
        expandedItems,
        toggleExpanded,
        activeItem,
        setActiveItem
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useSidebar = () => useContext(SidebarContext);
