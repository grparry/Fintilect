import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import PaymentIcon from '@mui/icons-material/Payment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BuildIcon from '@mui/icons-material/Build';
import TransformIcon from '@mui/icons-material/Transform';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';

// Lazy load components
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const FISExceptionHandling = lazy(() => import('../components/bill-pay/payments/FISExceptionHandling'));
const PendingPayments = lazy(() => import('../components/bill-pay/payments/ManagePayments'));
const PaymentManagementHeader = lazy(() => import('../components/bill-pay/payments/PaymentManagementHeader'));
const ManualProcessing = lazy(() => import('../components/bill-pay/payments/ManualProcessing'));
const FisPayeeCheck = lazy(() => import('../components/bill-pay/payments/FisPayeeCheck'));
const Reports = lazy(() => import('../components/bill-pay/reports/Reports'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));
const Holidays = lazy(() => import('../components/bill-pay/settings/Holidays'));
const BillPayConfig = lazy(() => import('../components/bill-pay/settings/BillPayConfig'));
const NotificationTemplates = lazy(() => import('../components/bill-pay/settings/NotificationTemplates'));
const BillPaySecuritySettings = lazy(() => import('../components/bill-pay/settings/security/BillPaySecuritySettings'));
const BillPay = lazy(() => import('../components/bill-pay/BillPay'));

const billPayRoutes: RouteConfig[] = [
  {
    id: 'dashboard',
    path: 'dashboard',
    title: 'Dashboard',
    element: Dashboard,
    icon: DashboardIcon,
    sectionId: 'billPay',
    permissions: {
      requiredPermissions: ['BillPayConfiguration_Read']
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
      requiredPermissions: ['BillPayConfiguration_Read']
    },
    children: [
      {
        id: 'manage-payments',
        path: 'manage',
        title: 'Manage Payments',
        element: PendingPayments,
        icon: ScheduleIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'exceptions',
        path: 'exceptions',
        title: 'Exceptions',
        element: ExceptionTool,
        icon: WarningIcon,
        sectionId: 'billPay',
        hideFromSidebar: true,
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'fis-exception-handling',
        path: 'fis-exceptions',
        title: 'FIS Exception Handling',
        element: FISExceptionHandling,
        icon: ErrorIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'manual-processing',
        path: 'manual',
        title: 'Manual Processing',
        element: ManualProcessing,
        icon: BuildIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'fis-payee-check',
        path: 'fis-payee',
        title: 'FIS Payee Check',
        element: FisPayeeCheck,
        icon: BuildIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      }
    ]
  },
  {
    id: 'reports',
    path: 'reports',
    title: 'Reports',
    element: Reports,
    icon: AssessmentIcon,
    sectionId: 'billPay',
    permissions: {
      requiredPermissions: ['BillPayConfiguration_Read']
    }
  },
  {
    id: 'settings',
    path: 'settings',
    title: 'Settings',
    icon: SettingsIcon,
    element: Settings,
    sectionId: 'billPay',
    permissions: {
      requiredPermissions: ['BillPayConfiguration_Read']
    },
    children: [
      {
        id: 'holidays',
        path: 'holidays',
        title: 'Holidays',
        element: Holidays,
        icon: EventIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'bill-pay-config',
        path: 'config',
        title: 'Bill Pay Config',
        element: BillPayConfig,
        icon: TuneIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'notification-templates',
        path: 'notifications',
        title: 'Notification Templates',
        element: NotificationTemplates,
        icon: NotificationsIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      },
      {
        id: 'security-settings',
        path: 'security',
        title: 'Security Settings',
        element: BillPaySecuritySettings,
        icon: LockIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayConfiguration_Read']
        }
      }
    ]
  }
];

export default billPayRoutes;