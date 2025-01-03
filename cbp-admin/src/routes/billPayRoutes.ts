import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';

// Lazy load components
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const FISExceptionHandling = lazy(() => import('../components/bill-pay/payments/FISExceptionHandling'));
const PendingPayments = lazy(() => import('../components/bill-pay/payments/PendingPayments'));
const ManualProcessing = lazy(() => import('../components/bill-pay/payments/ManualProcessing'));
const PayeeConversion = lazy(() => import('../components/bill-pay/payments/PayeeConversion'));
const Reports = lazy(() => import('../components/bill-pay/reports/Reports'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));
const Holidays = lazy(() => import('../components/bill-pay/settings/Holidays'));
const BillPayConfig = lazy(() => import('../components/bill-pay/settings/BillPayConfig'));
const NotificationTemplates = lazy(() => import('../components/bill-pay/settings/NotificationTemplates'));
const PermissionGroups = lazy(() => import('../components/bill-pay/settings/PermissionGroups'));
const BillPaySecuritySettings = lazy(() => import('../components/bill-pay/settings/security/BillPaySecuritySettings'));

const billPayRoutes: RouteConfig[] = [
  {
    id: 'bill-pay',
    path: '/admin/bill-pay',
    title: 'Bill Pay',
    element: BillPayHeader,
    icon: 'Payment',
    sectionId: 'billPay',
  },
  {
    id: 'dashboard',
    path: '/admin/bill-pay/dashboard',
    title: 'Dashboard',
    element: Dashboard,
    icon: 'Dashboard',
    sectionId: 'billPay',
  },
  {
    id: 'payments',
    path: '/admin/bill-pay/payments',
    title: 'Payments',
    icon: 'Payment',
    element: React.createElement(React.Fragment),
    sectionId: 'billPay',
    children: [
      {
        id: 'exceptions',
        path: '/admin/bill-pay/payments/exceptions',
        title: 'Exception Tool',
        element: ExceptionTool,
        icon: 'Warning',
        sectionId: 'billPay',
      },
      {
        id: 'fis-exceptions',
        path: '/admin/bill-pay/payments/fis-exceptions',
        title: 'FIS Exception Handling',
        element: FISExceptionHandling,
        icon: 'Error',
        sectionId: 'billPay',
      },
      {
        id: 'pending-payments',
        path: '/admin/bill-pay/payments/pending',
        title: 'Pending Payments',
        element: PendingPayments,
        icon: 'Schedule',
        sectionId: 'billPay',
      },
      {
        id: 'manual-processing',
        path: '/admin/bill-pay/payments/manual',
        title: 'Manual Processing',
        element: ManualProcessing,
        icon: 'Build',
        sectionId: 'billPay',
      },
      {
        id: 'payee-conversion',
        path: '/admin/bill-pay/payments/payee-conversion',
        title: 'Payee Conversion',
        element: PayeeConversion,
        icon: 'Transform',
        sectionId: 'billPay',
      }
    ]
  },
  {
    id: 'reports',
    path: '/admin/bill-pay/reports',
    title: 'Reports',
    element: Reports,
    icon: 'Assessment',
    sectionId: 'billPay',
  },
  {
    id: 'settings',
    path: '/admin/bill-pay/settings',
    title: 'Settings',
    icon: 'Settings',
    element: Settings,
    sectionId: 'billPay',
    children: [
      {
        id: 'holidays',
        path: '/admin/bill-pay/settings/holidays',
        title: 'Holidays',
        element: Holidays,
        icon: 'Event',
        sectionId: 'billPay',
      },
      {
        id: 'bill-pay-config',
        path: '/admin/bill-pay/settings/config',
        title: 'Bill Pay Config',
        element: BillPayConfig,
        icon: 'Tune',
        sectionId: 'billPay',
      },
      {
        id: 'notification-templates',
        path: '/admin/bill-pay/settings/notifications',
        title: 'Notification Templates',
        element: NotificationTemplates,
        icon: 'Notifications',
        sectionId: 'billPay',
      },
      {
        id: 'permission-groups',
        path: '/admin/bill-pay/settings/permissions',
        title: 'Permission Groups',
        element: PermissionGroups,
        icon: 'Security',
        sectionId: 'billPay',
      },
      {
        id: 'security-settings',
        path: '/admin/bill-pay/settings/security',
        title: 'Security Settings',
        element: BillPaySecuritySettings,
        icon: 'Lock',
        sectionId: 'billPay',
      }
    ]
  }
];

export default billPayRoutes;
