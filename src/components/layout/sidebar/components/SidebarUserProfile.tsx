
import React from 'react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SidebarUserProfileProps {
  collapsed: boolean;
  userRole?: UserRole | null;
  currentUser?: string | null;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ 
  collapsed,
  userRole,
  currentUser
}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use the auth context if no currentUser is provided as prop
  const displayUser = currentUser || auth.currentUser;
  const displayRole = userRole || auth.userRole;

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado do sistema.",
    });
    navigate('/login');
  };

  return (
    <div className="p-4 border-t border-blue-100 bg-blue-50/50">
      <div className={cn(
        "flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed ? (
          <>
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-blue-500/30">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback className="bg-blue-600 text-white">
                  {displayRole?.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none text-blue-900">
                  {typeof displayUser === 'string' ? displayUser : 'Admin User'}
                </p>
                <p className="text-xs text-blue-500">{displayRole === 'admin' ? 'Administrador' : 'Usuário'}</p>
              </div>
            </div>
            
            <motion.button 
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={16} />
            </motion.button>
          </>
        ) : (
          <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback className="bg-blue-600 text-white">
              {displayRole?.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      
      {!collapsed && (
        <div className="mt-3 pt-3 border-t border-blue-100/50 text-xs text-center text-blue-400">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>Sistema Claudio Figueiredo</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarUserProfile;
