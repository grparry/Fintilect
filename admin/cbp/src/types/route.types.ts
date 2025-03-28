import { ComponentType, LazyExoticComponent } from 'react';
import { SvgIconProps } from '@mui/material';
import { ResourceId } from './permissions.types';

export type IconComponent = ComponentType<SvgIconProps>;
export interface BaseRouteConfig {
  id: string;
  path: string;
  element?: ComponentType | LazyExoticComponent<any>;
  children?: BaseRouteConfig[];
  sectionId?: string;
  title?: string;
  icon?: IconComponent;
  hideFromSidebar?: boolean;
}
export interface RouteConfig extends BaseRouteConfig {
  resourceId?: ResourceId;
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
  | 'emerge'
  | 'billPay'
  | 'development';
export interface RouteSections {
  [key: string]: RouteSection;
  clientManagement: RouteSection;
  emerge?: RouteSection;
  billPay: RouteSection;
  development: RouteSection;
}
export interface NavigationState {
  expandedSections: string[];
  selectedRoute: string | null;
}
// Helper type for lazy loading
export type LazyRouteComponent<T = any> = () => Promise<{ default: ComponentType<T> }>;