
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Keyboard,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { getSidebarItems } from './layout/sidebar/sidebarMenuItems';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCompact, toggleCompact, expandedItems, toggleExpanded } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarItems();

  const variants = {
    expanded: { width: '16rem' },
    compact: { width: '4rem' },
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    compact: { opacity: 0, x: -10 },
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        data-test="sidebar-toggle"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-gradient-to-b from-blue-900 to-indigo-900 border-r shadow-lg",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        variants={variants}
        animate={isCompact ? 'compact' : 'expanded'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        data-test="sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800/50">
            <AnimatePresence mode="wait">
              {!isCompact && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <span className="text-lg font-semibold text-white">Sistema Admin</span>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCompact}
              className="text-white hover:bg-blue-800/50"
              data-test="sidebar-toggle"
            >
              {isCompact ? 
                <PanelLeftOpen className="h-5 w-5" /> : 
                <PanelLeftClose className="h-5 w-5" />
              }
            </Button>
          </div>
          
          {/* Menu items */}
          <ScrollArea className="flex-grow">
            <div className="p-3 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.to;
                const isExpanded = expandedItems.includes(item.label);
                const Icon = item.icon;
                
                if (item.submenu) {
                  return (
                    <TooltipProvider key={item.label}>
                      <Tooltip>
                        <Collapsible
                          open={isCompact ? false : isExpanded}
                          onOpenChange={() => !isCompact && toggleExpanded(item.label)}
                        >
                          <div className="relative">
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start",
                                  (isActive || item.submenu?.some(sub => sub.to === location.pathname)) 
                                    ? "bg-blue-700/50 text-white hover:bg-blue-700/70" 
                                    : "text-blue-100/80 hover:bg-blue-800/50 hover:text-white"
                                )}
                              >
                                <div className={cn("flex items-center", isCompact ? "justify-center w-full" : "")}>
                                  <Icon className="h-5 w-5 min-w-[20px]" />
                                  <AnimatePresence>
                                    {!isCompact && (
                                      <motion.div 
                                        className="flex items-center justify-between flex-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                      >
                                        <span className="ml-3 flex-grow text-left">{item.label}</span>
                                        <motion.div
                                          animate={{ rotate: isExpanded ? 180 : 0 }}
                                          transition={{ duration: 0.3 }}
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </motion.div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </Button>
                            </CollapsibleTrigger>
                            {isCompact && (
                              <TooltipContent side="right" className="bg-blue-900 text-white border-blue-700">
                                {item.label}
                              </TooltipContent>
                            )}
                          </div>
                          
                          <CollapsibleContent className="pl-9 space-y-1 pt-1 overflow-hidden">
                            <AnimatePresence>
                              {item.submenu.map((subItem) => (
                                <motion.div
                                  key={subItem.to}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                      "w-full justify-start",
                                      location.pathname === subItem.to 
                                        ? "bg-blue-700/30 text-white" 
                                        : "text-blue-100/70 hover:bg-blue-800/30 hover:text-white"
                                    )}
                                    onClick={() => {
                                      navigate(subItem.to);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {subItem.label}
                                  </Button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </CollapsibleContent>
                        </Collapsible>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }
                
                return (
                  <TooltipProvider key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full",
                            isCompact ? "justify-center" : "justify-start",
                            isActive 
                              ? "bg-blue-700/50 text-white hover:bg-blue-700/70" 
                              : "text-blue-100/80 hover:bg-blue-800/50 hover:text-white"
                          )}
                          onClick={() => {
                            navigate(item.to);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Icon className="h-5 w-5" />
                          <AnimatePresence>
                            {!isCompact && (
                              <motion.span 
                                className="ml-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                variants={itemVariants}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </TooltipTrigger>
                      {isCompact && (
                        <TooltipContent side="right" className="bg-blue-900 text-white border-blue-700">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </ScrollArea>
          
          {/* Footer */}
          <div className="p-3 border-t border-blue-800/50">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-10",
                      isCompact ? "justify-center" : "justify-start",
                      "text-blue-100/80 hover:bg-blue-800/50 hover:text-white"
                    )}
                    onClick={() => navigate('/atalhos')}
                  >
                    <Keyboard className="h-5 w-5" />
                    <AnimatePresence>
                      {!isCompact && (
                        <motion.span 
                          className="ml-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          variants={itemVariants}
                        >
                          Atalhos
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </TooltipTrigger>
                {isCompact && (
                  <TooltipContent side="right" className="bg-blue-900 text-white border-blue-700">
                    Atalhos de teclado
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>
    </>
  );
}
