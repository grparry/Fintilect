import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import SettingsIcon from '@mui/icons-material/Settings';
import TableChartIcon from '@mui/icons-material/TableChart';

// Lazy load components
const DevelopmentHeader = lazy(() => import('../components/development/DevelopmentHeader'));
const APITesting = lazy(() => import('../components/development/APITesting'));
const ClientConfigTest = lazy(() => import('../components/development/ClientConfigTest'));
const TestHarnessPage = lazy(() => import('../components/bill-pay/reports/components/TestHarnessPage'));

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
  },
  {
    id: 'report-table-test-harness',
    path: 'report-table-test-harness',
    title: 'Report Table Test Harness',
    element: TestHarnessPage,
    icon: TableChartIcon,
    sectionId: 'development',
    resourceId: 'route:development.report-table-test-harness',
  }
];
export default developmentRoutes;