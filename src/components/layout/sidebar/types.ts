
import { ReactNode } from 'react';

export interface MenuItemType {
  icon: ReactNode;
  label: string;
  to: string;
  badge?: string | number;
  submenu?: SubMenuItemType[];
}

export interface SubMenuItemType {
  label: string;
  to: string;
  badge?: string | number;
}

export interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export interface SidebarItemProps {
  item: MenuItemType;
  collapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
}
