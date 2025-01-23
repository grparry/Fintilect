import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';

// Lazy load components
const DevelopmentHeader = lazy(() => import('../components/development/DevelopmentHeader'));
const APITesting = lazy(() => import('../components/development/APITesting'));

const developmentRoutes: RouteConfig[] = [
  {
    id: 'development',
    path: '/admin/dev',
    title: 'Development',
    element: DevelopmentHeader,
    icon: 'Code',
    hideFromSidebar: false,
    sectionId: 'development',
  },
  {
    id: 'api-testing',
    path: '/admin/dev/testing',
    title: 'API Testing',
    element: APITesting,
    icon: 'Api',
    sectionId: 'development',
  }
];

export default developmentRoutes;
