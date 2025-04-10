import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';

// Lazy load components
const DevelopmentHeader = lazy(() => import('../components/development/DevelopmentHeader'));
const APITesting = lazy(() => import('../components/development/APITesting'));
const developmentRoutes: RouteConfig[] = [
  {
    id: 'development',
    path: '/admin/dev',
    title: 'Development',
    element: DevelopmentHeader,
    icon: CodeIcon,
    hideFromSidebar: true,
    sectionId: 'development',
  },
  {
    id: 'api-testing',
    path: '/admin/dev/testing',
    title: 'API Testing',
    element: APITesting,
    icon: ApiIcon,
    sectionId: 'development',
  }
];
export default developmentRoutes;