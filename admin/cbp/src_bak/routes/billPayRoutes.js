import React from 'react';
import { lazy } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const PendingPayments = lazy(() => import('../components/bill-pay/payments/PendingPayments'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const Reports = lazy(() => import('../components/bill-pay/reports/Reports'));
const PayeeConversion = lazy(() => import('../components/bill-pay/payments/PayeeConversion'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));

const billPayRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
    title: 'Dashboard',
    icon: 'Dashboard',
  },
  {
    path: '/payments',
    element: PendingPayments,
    title: 'Payment Management',
    icon: 'AccountBalance',
  },
  {
    path: '/payments/exceptions',
    element: ExceptionTool,
    title: 'Exceptions',
    icon: 'Warning',
    hideFromSidebar: true,
  },
  {
    path: '/reports',
    element: Reports,
    title: 'Reports',
    icon: 'Assessment',
  },
  {
    path: '/data-conversion',
    element: PayeeConversion,
    title: 'Data Conversion',
    icon: 'SwapHoriz',
  },
  {
    path: '/settings',
    element: Settings,
    title: 'Settings',
    icon: 'Settings',
    description: 'Notifications, Templates, System Config',
  },
];

export default billPayRoutes;
