import { ComponentType, LazyExoticComponent } from 'react';
import { SvgIconProps } from '@mui/material';
import type { RouteConfig } from './route.types';

export type NavigationElement = ComponentType | LazyExoticComponent<any>;
export type IconComponent = React.ComponentType<SvgIconProps>;

export interface NavigationPermissionRequirement {
  clientId?: string;
  customCheck?: () => Promise<boolean>;
  requiredPermissions?: string[];
}

export interface NavigationItem {
  id: string;
  title: string;
  description?: string;
  path: string;
  icon?: IconComponent;
  color?: string;
  badge?: number;
  permissions?: NavigationPermissionRequirement;
  element?: NavigationElement;
  hideFromSidebar?: boolean;
  children?: NavigationItem[];
  items?: NavigationItem[];
}

export interface NavigationSection {
  id: string;
  title: string;
  description?: string;
  icon?: IconComponent;
  color?: string;
  basePath?: string;
  path: string;
  permissions?: NavigationPermissionRequirement;
  items: NavigationItem[];
  badge?: number;
  fallbackPath?: string;
}

export interface NavigationState {
  activeSection: string | null;
  activePath: string | null;
  permissionCache: Map<string, boolean>;
  expandedItems: string[];
}

export interface NavigationConfig {
  sections: NavigationSection[];
  defaultSection?: string;
}

export type { RouteConfig };
