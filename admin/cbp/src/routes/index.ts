import billPayRoutes from './billPayRoutes';
import clientManagementRoutes from './ClientManagementRoutes';
import developmentRoutes from './developmentRoutes';
import { NavigationConfig, NavigationSection, NavigationItem, RouteConfig, NavigationElement, NavigationPermissionRequirement } from '../types/section-navigation.types';
import { sectionConfig, defaultSectionConfig } from '../config/section.config';
import { lazy } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import PaymentIcon from '@mui/icons-material/Payment';
import CodeIcon from '@mui/icons-material/Code';

// Lazy load components
const AdminLanding = lazy(() => import('../components/admin/AdminLanding'));
const ClientManagementHeader = lazy(() => import('../components/client-management/ClientManagementHeader'));
const DevelopmentHeader = lazy(() => import('../components/development/DevelopmentHeader'));
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));

// Define the route sections configuration
const routes = {
  clientManagement: {
    id: 'clientManagement',
    title: 'Client Management',
    basePath: '/admin/client-management',
    routes: clientManagementRoutes,
    icon: BusinessIcon,
    permissions: undefined as NavigationPermissionRequirement | undefined,
  },
  billPay: {
    id: 'billPay',
    title: 'Bill Pay',
    basePath: '/admin/bill-pay',
    routes: billPayRoutes,
    icon: PaymentIcon,
    permissions: undefined as NavigationPermissionRequirement | undefined,
  },
  development: {
    id: 'development',
    title: 'Development',
    basePath: '/admin/development',
    routes: developmentRoutes,
    icon: CodeIcon,
    permissions: undefined as NavigationPermissionRequirement | undefined,
  },
} as const;

// Helper function to get full path
export const getFullPath = (basePath: string, path: string): string => {
  if (!path) return basePath;
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath ? `${cleanBasePath}/${cleanPath}` : cleanBasePath;
};

// Helper function to process routes recursively
const processRoutes = (routes: RouteConfig[], sectionId: string, basePath: string): RouteConfig[] => {
  return routes.flatMap(route => {
    const fullPath = getFullPath(basePath, route.path);
    const processedRoute = {
      ...route,
      sectionId,
      path: fullPath,
    };
    const children = route.children 
      ? processRoutes(route.children, sectionId, fullPath)
      : [];
    // Remove children from the processed route to avoid duplication
    const { children: _, ...routeWithoutChildren } = processedRoute;
    return [routeWithoutChildren, ...children];
  });
};

// Get all routes flattened with full paths
export const getAllRoutes = () => {
  console.log('=== getAllRoutes Debug Start ===');
  
  // Add root admin route
  const adminRoute: RouteConfig = {
    id: 'admin',
    path: '/admin',
    title: 'Admin Dashboard',
    element: AdminLanding,
    sectionId: 'admin',
    hideFromSidebar: true,
  };

  // Process all routes
  const processedRoutes = Object.entries(routes).flatMap(([sectionId, section]) => {
    // Process section routes recursively
    const sectionRoutes = processRoutes(section.routes, sectionId, section.basePath);

    // Only add header route if one doesn't already exist in the section routes
    const hasHeaderRoute = sectionRoutes.some(route => 
      route.id === `${sectionId}-header` || 
      route.id === `${sectionId}-root`
    );

    if (!hasHeaderRoute) {
      // Add section header route
      const headerRoute: RouteConfig = {
        id: `${sectionId}-header`,
        path: section.basePath,
        title: section.title,
        element: (() => {
          switch(sectionId) {
            case 'clientManagement':
              return ClientManagementHeader;
            case 'billPay':
              return BillPayHeader;
            case 'development':
              return DevelopmentHeader;
            default:
              return AdminLanding;
          }
        })(),
        sectionId,
      };
      return [...sectionRoutes, headerRoute];
    }

    return sectionRoutes;
  });

  // Add admin route and return all routes
  return [adminRoute, ...processedRoutes];
};

export default routes;