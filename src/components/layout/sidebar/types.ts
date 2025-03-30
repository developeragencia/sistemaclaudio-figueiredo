
import { ReactNode } from 'react';

export interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export interface MenuItemType {
  icon: ReactNode;
  label: string;
  to: string;
  badge?: number | string;
  submenu?: {
    label: string;
    to: string;
    badge?: number | string;
  }[];
}

export interface SidebarItemProps {
  item: MenuItemType;
  collapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
}
