import { ComponentType, LazyExoticComponent } from 'react';
import { SvgIconProps } from '@mui/material';
import type { RouteConfig } from './route.types';
import { ResourceId } from './permissions.types';

export type NavigationElement = ComponentType | LazyExoticComponent<any>;
export type IconComponent = React.ComponentType<SvgIconProps>;

export interface NavigationItem {
  id: string;
  title: string;
  description?: string;
  path?: string;
  icon?: IconComponent;
  color?: string;
  badge?: number;
  resourceId?: ResourceId;
  element?: NavigationElement;
  hideFromSidebar?: boolean;
  children?: NavigationItem[];
  items?: NavigationItem[];
  requiredPermission?: string;
}

export interface NavigationSection {
  id: string;
  title: string;
  description?: string;
  icon?: IconComponent;
  color?: string;
  basePath?: string;
  path?: string;
  resourceId?: ResourceId;
  requiredPermission?: string;
  items?: NavigationItem[];
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
