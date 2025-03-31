
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
  Sparkles,
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
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 border-r border-blue-800/20 shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "overflow-hidden" // Ensure overflow is hidden for the glass effect
        )}
        variants={variants}
        animate={isCompact ? 'compact' : 'expanded'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        data-test="sidebar"
      >
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-filter backdrop-blur-sm" />
        
        <div className="flex flex-col h-full relative z-10"> {/* z-10 to appear above the glass overlay */}
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <AnimatePresence mode="wait">
              {!isCompact && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-300" />
                    <span className="text-lg font-semibold text-white">Sistema Admin</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCompact}
              className="text-white hover:bg-white/10 transition-colors"
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
                                    ? "bg-white/15 text-white hover:bg-white/20" 
                                    : "text-blue-100/80 hover:bg-white/10 hover:text-white"
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
                              <TooltipContent side="right" className="bg-indigo-900 text-white border-indigo-700">
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
                                        ? "bg-white/10 text-purple-200" 
                                        : "text-blue-100/70 hover:bg-white/10 hover:text-white"
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
                            "w-full relative overflow-hidden group",
                            isCompact ? "justify-center" : "justify-start",
                            isActive 
                              ? "bg-white/15 text-white hover:bg-white/20" 
                              : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                          )}
                          onClick={() => {
                            navigate(item.to);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {/* Hover animation */}
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                          
                          <Icon className="h-5 w-5 relative z-10" />
                          <AnimatePresence>
                            {!isCompact && (
                              <motion.span 
                                className="ml-3 relative z-10"
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
                        <TooltipContent side="right" className="bg-indigo-900 text-white border-indigo-700">
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
          <div className="p-3 border-t border-white/10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-10 relative overflow-hidden group",
                      isCompact ? "justify-center" : "justify-start",
                      "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => navigate('/atalhos')}
                  >
                    {/* Hover animation */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    
                    <Keyboard className="h-5 w-5 relative z-10" />
                    <AnimatePresence>
                      {!isCompact && (
                        <motion.span 
                          className="ml-3 relative z-10"
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
                  <TooltipContent side="right" className="bg-indigo-900 text-white border-indigo-700">
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
