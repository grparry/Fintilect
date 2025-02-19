import { RouteConfig, RouteSection, RouteSections } from '../types/route.types';
import { NavigationPermissionRequirement } from '../types/section-navigation.types';
import AdminLanding from '../components/admin/AdminLanding';
import ClientManagementHeader from '../components/client-management/ClientManagementHeader';
import BillPayHeader from '../components/bill-pay/BillPayHeader';
import DevelopmentHeader from '../components/development/DevelopmentHeader';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaymentIcon from '@mui/icons-material/Payment';
import CodeIcon from '@mui/icons-material/Code';

import billPayRoutes from './billPayRoutes';
import clientManagementRoutes from './ClientManagementRoutes';
import developmentRoutes from './developmentRoutes';

// Define route sections
const routes: RouteSections = {
  clientManagement: {
    id: 'clientManagement',
    title: 'Client Management',
    basePath: '/admin/client-management',
    routes: clientManagementRoutes
  },
  billPay: {
    id: 'billPay',
    title: 'Bill Pay',
    basePath: '/admin/bill-pay',
    routes: billPayRoutes
  },
  development: {
    id: 'development',
    title: 'Development',
    basePath: '/admin/development',
    routes: developmentRoutes
  }
};

// Helper function to get full path
export const getFullPath = (basePath: string, path: string): string => {
  if (!path) return basePath;
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath ? `${cleanBasePath}/${cleanPath}` : cleanBasePath;
};

// Helper function to process routes recursively
const processRoutes = (route: RouteConfig, sectionId: string, basePath: string): RouteConfig => {
  const fullPath = getFullPath(basePath, route.path);
  console.log(`Processing route ${route.id} with path ${route.path} -> ${fullPath}`);

  const processedRoute = {
    ...route,
    path: fullPath,
    sectionId,
  };

  if (route.children) {
    processedRoute.children = route.children.map(child => 
      processRoutes(child, sectionId, fullPath)
    );
  }

  return processedRoute;
};

// Get all routes with full paths
export const getAllRoutes = (): RouteConfig[] => {
  const adminRoute: RouteConfig = {
    id: 'admin',
    path: '/admin',
    title: 'Admin Dashboard',
    element: AdminLanding,
    sectionId: 'admin',
    hideFromSidebar: true,
    icon: AdminPanelSettingsIcon,
  };

  const processedRoutes = Object.entries(routes).flatMap(([sectionId, section]) => {
    console.log(`Processing section: ${sectionId}`);
    console.log('Section routes before processing:', JSON.stringify(section.routes, null, 2));
    
    const sectionRoutes = section.routes.map(route => {
      console.log('Processing route:', JSON.stringify(route, null, 2));
      return processRoutes(route, sectionId, section.basePath);
    });
    
    console.log('Section routes after processing:', JSON.stringify(sectionRoutes, null, 2));
    return sectionRoutes;
  });

  return [adminRoute, ...processedRoutes];
};

export default routes;