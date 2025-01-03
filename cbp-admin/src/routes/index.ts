import billPayRoutes from './billPayRoutes';
import clientManagementRoutes from './ClientManagementRoutes';
import emergeAdminRoutes from './emergeAdminRoutes';
import developmentRoutes from './developmentRoutes';
import { RouteSections, RouteConfig, NavigationItem, NavigationConfig, NavigationSection } from '../types/route.types';
import { lazy } from 'react';

// Lazy load the AdminLanding component
const AdminLanding = lazy(() => import('../components/admin/AdminLanding'));

// Define the route sections configuration
const routes: RouteSections = {
  clientManagement: {
    id: 'clientManagement',
    title: 'Client Management',
    basePath: '/admin/client-management',
    routes: clientManagementRoutes,
  },
  emerge: {
    id: 'emerge',
    title: 'Emerge Admin',
    basePath: '/admin/emerge',
    routes: emergeAdminRoutes,
  },
  billPay: {
    id: 'billPay',
    title: 'Bill Pay',
    basePath: '/admin/bill-pay',
    routes: billPayRoutes,
  },
  development: {
    id: 'development',
    title: 'Development',
    basePath: '/admin/development',
    routes: developmentRoutes,
  },
};

// Helper function to get full path
export const getFullPath = (basePath: string, path: string): string => {
  if (!path) return basePath;
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath ? `${cleanBasePath}/${cleanPath}` : cleanBasePath;
};

// Get all routes flattened with full paths
export const getAllRoutes = (): RouteConfig[] => {
  console.log('=== getAllRoutes Debug Start ===');
  
  // Log the routes object structure
  console.log('Initial routes structure:', Object.entries(routes).map(([key, section]) => ({
    key,
    id: section.id,
    basePath: section.basePath,
    routeCount: section.routes.length
  })));
  
  // Add root admin route
  const adminRoute: RouteConfig = {
    id: 'admin',
    path: '/admin',
    title: 'Admin Dashboard',
    element: AdminLanding,
    sectionId: 'admin'
  };

  // Helper function to process a route and its children
  const processRoute = (route: RouteConfig, sectionId: string, basePath: string): RouteConfig => {
    console.log('Processing route:', {
      route: {
        path: route.path,
        title: route.title,
        hasChildren: !!route.children
      },
      sectionId,
      basePath
    });

    // For child routes, keep the path relative
    const isChildRoute = route.path.startsWith('/') && !route.path.startsWith(basePath);
    const fullPath = isChildRoute ? getFullPath(basePath, route.path) : route.path;
    
    const processedRoute: RouteConfig = {
      id: route.id || `${sectionId}-${route.path.split('/').pop()}`,
      path: fullPath,
      title: route.title,
      element: route.element,
      icon: route.icon,
      hideFromSidebar: route.hideFromSidebar,
      sectionId,
      children: route.children?.map(child => processRoute(child, sectionId, fullPath))
    };

    console.log('Processed route result:', {
      id: processedRoute.id,
      path: processedRoute.path,
      title: processedRoute.title,
      sectionId: processedRoute.sectionId,
      hasChildren: !!processedRoute.children
    });

    return processedRoute;
  };

  // Convert the sections into a flat array of routes
  const sectionRoutes = Object.entries(routes).reduce<RouteConfig[]>((allRoutes, [sectionKey, section]) => {
    console.log(`Processing section ${section.id}:`, {
      key: sectionKey,
      basePath: section.basePath,
      routeCount: section.routes.length,
      routes: section.routes.map(r => ({
        path: r.path,
        title: r.title,
        hasChildren: !!r.children
      }))
    });

    // Get the correct header component for the section
    const headerComponent = (() => {
      switch (section.id) {
        case 'emerge':
          return lazy(() => import('../components/emerge-admin/EmergeAdminHeader'));
        case 'billPay':
          return lazy(() => import('../components/bill-pay/BillPayHeader'));
        case 'clientManagement':
          return lazy(() => import('../components/client-management/ClientManagementHeader'));
        case 'development':
          return lazy(() => import('../components/development/DevelopmentHeader'));
        default:
          return lazy(() => import('../components/common/NavigationLanding'));
      }
    })();

    // Add the section root route with the correct header component
    const sectionRoute: RouteConfig = {
      id: section.id,
      path: section.basePath,
      title: section.title,
      element: headerComponent,
      sectionId: section.id
    };
    
    // Process each route and its children
    const processedRoutes = section.routes.map(route => 
      processRoute(route, section.id, section.basePath)
    );
    
    // Add section route first, then all other routes
    return allRoutes.concat([sectionRoute, ...processedRoutes]);
  }, []);

  const result = [adminRoute, ...sectionRoutes];
  console.log('=== getAllRoutes Final Result ===', result.map(r => ({
    id: r.id,
    path: r.path,
    title: r.title,
    sectionId: r.sectionId
  })));
  
  return result;
};

// Get navigation items for the sidebar
export const getNavigationConfig = (): NavigationConfig => {
  console.log('=== Navigation Config Debug Start ===');
  
  // Log available sections and their contents
  console.log('Routes object:', Object.entries(routes).map(([key, section]) => ({
    key,
    id: section.id,
    title: section.title,
    basePath: section.basePath,
    routeCount: section.routes.length
  })));
  
  // Get all processed routes
  const allRoutes = getAllRoutes();
  console.log('All processed routes:', allRoutes.map(r => ({ 
    id: r.id, 
    path: r.path, 
    sectionId: r.sectionId,
    title: r.title,
    hideFromSidebar: r.hideFromSidebar
  })));
  
  // Group routes by section
  const routesBySection = allRoutes.reduce<Record<string, NavigationItem[]>>((acc, route) => {
    // Skip routes without sectionId or that should be hidden
    if (!route.sectionId) {
      console.log('Skipping route - no sectionId:', { 
        path: route.path,
        title: route.title 
      });
      return acc;
    }

    if (!routes[route.sectionId]) {
      console.log('Skipping route - invalid sectionId:', { 
        path: route.path,
        sectionId: route.sectionId,
        title: route.title,
        availableSections: Object.keys(routes)
      });
      return acc;
    }

    const section = routes[route.sectionId];
    if (!route.hideFromSidebar && route.path !== section.basePath) {
      if (!acc[route.sectionId]) {
        acc[route.sectionId] = [];
      }
      
      console.log('Adding route to section:', {
        sectionId: route.sectionId,
        path: route.path,
        title: route.title
      });
      
      acc[route.sectionId].push({
        id: route.id,
        title: route.title,
        path: route.path,
        icon: route.icon
      });
    } else {
      console.log('Skipping route - hidden or base path:', {
        path: route.path,
        sectionId: route.sectionId,
        title: route.title,
        hideFromSidebar: route.hideFromSidebar,
        isBasePath: route.path === section.basePath
      });
    }
    return acc;
  }, {});

  console.log('Routes grouped by section:', routesBySection);

  // Create navigation config using grouped routes
  const config: NavigationConfig = Object.entries(routes)
    .filter(([sectionId, section]) => {
      const hasRoutes = routesBySection[sectionId]?.length > 0;
      if (!hasRoutes) {
        console.log('Skipping section - no visible routes:', {
          sectionId,
          title: section.title
        });
      }
      return hasRoutes;
    })
    .map(([sectionId, section]): NavigationSection => ({
      id: sectionId,
      title: section.title,
      items: routesBySection[sectionId] || []
    }));

  console.log('=== Final Navigation Config ===', config);
  return config;
};

export default routes;
