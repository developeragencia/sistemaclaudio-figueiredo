
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Keyboard,
  Menu,
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

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r shadow-sm",
          isCompact ? "w-16" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-3 border-b">
            {!isCompact && <span className="text-lg font-semibold">Sistema Admin</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCompact}
              className="ml-auto"
            >
              {isCompact ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
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
                                  (isActive || item.submenu?.some(sub => sub.to === location.pathname)) && "bg-accent"
                                )}
                              >
                                <div className={cn("flex items-center", isCompact ? "justify-center w-full" : "")}>
                                  <Icon className="h-4 w-4 mr-2" />
                                  {!isCompact && (
                                    <>
                                      <span className="flex-grow text-left">{item.label}</span>
                                      <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                                    </>
                                  )}
                                </div>
                              </Button>
                            </CollapsibleTrigger>
                            {isCompact && (
                              <TooltipContent side="right">
                                {item.label}
                              </TooltipContent>
                            )}
                          </div>
                          
                          <CollapsibleContent className="pl-9 space-y-1 pt-1">
                            {item.submenu.map((subItem) => (
                              <Button
                                key={subItem.to}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "w-full justify-start",
                                  location.pathname === subItem.to && "bg-accent"
                                )}
                                onClick={() => {
                                  navigate(subItem.to);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Button>
                            ))}
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
                            isActive && "bg-accent"
                          )}
                          onClick={() => {
                            navigate(item.to);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          {!isCompact && <span className="ml-2">{item.label}</span>}
                        </Button>
                      </TooltipTrigger>
                      {isCompact && (
                        <TooltipContent side="right">
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
          <div className="p-3 border-t">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full h-8"
                    onClick={() => navigate('/atalhos')}
                  >
                    <Keyboard className="h-4 w-4" />
                    {!isCompact && <span className="ml-2">Atalhos</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Atalhos de teclado
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
}
