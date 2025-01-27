import { ComponentType, LazyExoticComponent } from 'react';
import { NavigationPermissionRequirement } from './section-navigation.types';
import { SvgIconProps } from '@mui/material';

export type IconComponent = ComponentType<SvgIconProps>;

export interface BaseRouteConfig {
  id: string;
  path: string;
  element?: ComponentType | LazyExoticComponent<any>;
  children?: BaseRouteConfig[];
  sectionId?: string;
  permissions?: NavigationPermissionRequirement;
  title?: string;
  icon?: IconComponent;
  hideFromSidebar?: boolean;
}

export interface RouteConfig extends BaseRouteConfig {
  children?: RouteConfig[];
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: IconComponent;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export type NavigationConfig = NavigationSection[];

export interface RouteSection {
  id: string;
  title: string;
  basePath: string;
  routes: RouteConfig[];
}

export type RouteSectionKey = 
  | 'clientManagement'









  | 'clientManagement'
  | 'emerge'
  | 'billPay'
  | 'development';

  [key: string]: RouteSection;


// Helper type for lazy loading
