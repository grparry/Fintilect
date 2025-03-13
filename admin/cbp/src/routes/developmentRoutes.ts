import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import SettingsIcon from '@mui/icons-material/Settings';

// Lazy load components
const DevelopmentHeader = lazy(() => import('../components/development/DevelopmentHeader'));
const APITesting = lazy(() => import('../components/development/APITesting'));
const ClientConfigTest = lazy(() => import('../components/development/ClientConfigTest'));

const developmentRoutes: RouteConfig[] = [
  {
    id: 'development',
    path: '',
    title: 'Development',
    element: DevelopmentHeader,
    icon: CodeIcon,
    hideFromSidebar: true,
    sectionId: 'development',
    resourceId: 'route:development',
  },
  {
    id: 'api-testing',
    path: 'api-testing',
    title: 'API Testing',
    element: APITesting,
    icon: ApiIcon,
    sectionId: 'development',
    resourceId: 'route:development.api-testing',
  },
  {
    id: 'client-config',
    path: 'client-config',
    title: 'Client Configuration',
    element: ClientConfigTest,
    icon: SettingsIcon,
    sectionId: 'development',
    resourceId: 'route:development.client-config',
  }
];
export default developmentRoutes;