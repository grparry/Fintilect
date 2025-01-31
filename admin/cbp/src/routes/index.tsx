import { RouteConfig, RouteSection, RouteSections } from '../types/route.types';
import { NavigationPermissionRequirement } from '../types/section-navigation.types';
import AdminLanding from '../components/admin/AdminLanding';
import ClientManagementHeader from '../components/client-management/ClientManagementHeader';
import EmergeAdminHeader from '../components/emerge-admin/EmergeAdminHeader';
import EmergeConfigHeader from '../components/emerge-config/EmergeConfigHeader';
import BillPayHeader from '../components/bill-pay/BillPayHeader';
import DevelopmentHeader from '../components/development/DevelopmentHeader';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import CodeIcon from '@mui/icons-material/Code';

import billPayRoutes from './billPayRoutes';
import clientManagementRoutes from './ClientManagementRoutes';
import emergeAdminRoutes from './emergeAdminRoutes';
import emergeConfigRoutes from './emerge-config/index';
import developmentRoutes from './developmentRoutes';

// Define route sections
const routes: RouteSections = {
  clientManagement: {
    id: 'clientManagement',
    title: 'Client Management',
    basePath: '/admin/client-management',
    routes: [{
      id: 'client-management-root',
      path: '',
      element: ClientManagementHeader,
      icon: BusinessIcon,
      title: 'Client Management',
      permissions: {
        permissions: ['client-management:read']
      },
      children: clientManagementRoutes
    }]
  },
  emergeAdmin: {
    id: 'emergeAdmin',
    title: 'Emerge Admin',
    basePath: '/admin/emerge',
    routes: [{
      id: 'emerge-admin-root',
      path: '',
      element: EmergeAdminHeader,
      icon: AdminPanelSettingsIcon,
      title: 'Emerge Admin',
      permissions: {
        permissions: ['emerge-admin:read']
      },
      children: emergeAdminRoutes
    }]
  },
  emergeConfig: {
    id: 'emergeConfig',
    title: 'Emerge Config',
    basePath: '/admin/emerge-config',
    routes: [{
      id: 'emerge-config-root',
      path: '',
      element: <EmergeConfigHeader />, // Fix JSX syntax
      icon: SettingsIcon,
      title: 'Emerge Config',
      permissions: {
        permissions: ['emerge-config:read']
      },
      children: emergeConfigRoutes
    }]
  },
  billPay: {
    id: 'billPay',
    title: 'Bill Pay',
    basePath: '/admin/bill-pay',
    routes: [{
      id: 'bill-pay-root',
      path: '',
      element: BillPayHeader,
      icon: PaymentIcon,
      title: 'Bill Pay',
      permissions: {
        permissions: ['bill-pay:read']
      },
      children: billPayRoutes
    }]
  },
  development: {
    id: 'development',
    title: 'Development',
    basePath: '/admin/development',
    routes: [{
      id: 'development-root',
      path: '',
      element: DevelopmentHeader,
      icon: CodeIcon,
      title: 'Development',
      permissions: {
        permissions: ['development:read']
      },
      children: developmentRoutes
    }]
  }
};

// Helper function to get full path
const getFullPath = (basePath: string, path: string): string => {
  if (!path) return basePath;
  return `${basePath}/${path}`.replace(/\/+/g, '/');
};

// Helper function to process routes recursively
const processRoutes = (route: RouteConfig, sectionId: string, basePath: string): RouteConfig => {
  const fullPath = getFullPath(basePath, route.path);
  const processedRoute = {
    ...route,
    sectionId,
    path: fullPath,
  };

  if (route.children) {
    return {
      ...processedRoute,
      children: route.children.map(child => processRoutes(child, sectionId, fullPath))
    };
  }

  return processedRoute;
};

// Get all routes with full paths
export const getAllRoutes = () => {
  console.log('=== getAllRoutes Debug Start ===');
  
  // Add root admin route
  const adminRoute: RouteConfig = {
    id: 'admin',
    path: '/admin',
    title: 'Admin Dashboard',
    element: <AdminLanding />, // Fix JSX syntax
    sectionId: 'admin',
    hideFromSidebar: true,
    icon: AdminPanelSettingsIcon,
    permissions: {
      permissions: ['admin:read']
    }
  };

  // Process all routes
  const processedRoutes = Object.entries(routes).map(([sectionId, section]) => {
    // Process section routes recursively
    const sectionRoute = processRoutes(section.routes[0], sectionId, section.basePath);
    return sectionRoute;
  });

  // Add admin route and return all routes
  return [adminRoute, ...processedRoutes];
};

export default routes;