import { lazy } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BuildIcon from '@mui/icons-material/Build';
import TransformIcon from '@mui/icons-material/Transform';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Lazy load components
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const FISExceptionHandling = lazy(() => import('../components/bill-pay/payments/FISExceptionHandling'));
const ManagePayments = lazy(() => import('../components/bill-pay/payments/ManagePayments'));
const PaymentManagementHeader = lazy(() => import('../components/bill-pay/payments/PaymentManagementHeader'));
const ManualProcessing = lazy(() => import('../components/bill-pay/payments/ManualProcessing'));
const FisPayeeCheck = lazy(() => import('../components/bill-pay/payments/FisPayeeCheck'));
const Reports = lazy(() => import('../components/bill-pay/reports/Reports'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));
const Holidays = lazy(() => import('../components/bill-pay/settings/Holidays'));
const BillPayConfig = lazy(() => import('../components/bill-pay/settings/BillPayConfig'));
const NotificationTemplates = lazy(() => import('../components/bill-pay/settings/NotificationTemplates'));
const PermissionGroups = lazy(() => import('../components/bill-pay/settings/PermissionGroups'));
const BillPaySecuritySettings = lazy(() => import('../components/bill-pay/settings/security/BillPaySecuritySettings'));

const billPayRoutes = [
  {
    id: 'bill-pay',
    path: '',
    title: 'Bill Pay',
    element: BillPayHeader,
    sectionId: 'billPay',
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'dashboard',
    path: 'dashboard',
    title: 'Dashboard',
    element: Dashboard,
    icon: DashboardIcon,
    sectionId: 'billPay',
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'payments',
    path: 'payments',
    title: 'Payment Management',
    element: PaymentManagementHeader,
    icon: PaymentIcon,
    sectionId: 'billPay',
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'manage-payments',
    path: 'payments/manage',
    title: 'Manage Payments',
    element: ManagePayments,
    icon: ScheduleIcon,
    sectionId: 'billPay',
    hideFromSidebar: true,
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'fis-exceptions',
    path: 'payments/fis-exceptions',
    title: 'FIS Exception Handling',
    element: FISExceptionHandling,
    icon: ErrorIcon,
    sectionId: 'billPay',
    hideFromSidebar: true,
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'manual-processing',
    path: 'payments/manual',
    title: 'Manual Processing',
    element: ManualProcessing,
    icon: BuildIcon,
    sectionId: 'billPay',
    hideFromSidebar: true,
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'fis-payee-check',
    path: 'payments/fis-payee-check',
    title: 'FIS Payee Check',
    element: FisPayeeCheck,
    icon: AccountBalanceIcon,
    sectionId: 'billPay',
    hideFromSidebar: true,
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'reports',
    path: 'reports',
    title: 'Reports',
    element: Reports,
    icon: AssessmentIcon,
    sectionId: 'billPay',
    permissions: {
      permissions: ['bill-pay:read']
    }
  },
  {
    id: 'settings',
    path: 'settings',
    title: 'Settings',
    element: Settings,
    icon: SettingsIcon,
    sectionId: 'billPay',
    permissions: {
      permissions: ['bill-pay:read']
    },
    children: [
      {
        id: 'holidays',
        path: 'holidays',
        title: 'Holidays',
        element: Holidays,
        sectionId: 'billPay'
      },
      {
        id: 'config',
        path: 'config',
        title: 'Configuration',
        element: BillPayConfig,
        sectionId: 'billPay'
      },
      {
        id: 'notifications',
        path: 'notifications',
        title: 'Notifications',
        element: NotificationTemplates,
        sectionId: 'billPay'
      },
      {
        id: 'permissions',
        path: 'permissions',
        title: 'Permissions',
        element: PermissionGroups,
        sectionId: 'billPay'
      },
      {
        id: 'security',
        path: 'security',
        title: 'Security',
        element: BillPaySecuritySettings,
        sectionId: 'billPay'
      }
    ]
  }
];

export default billPayRoutes;