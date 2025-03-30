
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
