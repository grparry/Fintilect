import { ComponentType, LazyExoticComponent } from 'react';

export interface BaseRouteConfig {
  id: string;
  path: string;
  title: string;
  icon?: string;
  hideFromSidebar?: boolean;
}

export interface RouteConfig extends BaseRouteConfig {
  element: ComponentType<any> | LazyExoticComponent<ComponentType<any>> | JSX.Element;
  children?: RouteConfig[];
  items?: never;
  sectionId?: string; // Added for navigation grouping
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
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
  emerge: RouteSection;
  billPay: RouteSection;
  development: RouteSection;
}

export interface NavigationState {
  expandedSections: string[];
  selectedRoute: string | null;
}

// Helper type for lazy loading
export type LazyRouteComponent<T = any> = () => Promise<{ default: ComponentType<T> }>;
