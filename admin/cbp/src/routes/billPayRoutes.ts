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
import BillPayHeader from '../components/bill-pay/BillPayHeader';

// Lazy load components
const BillPay = lazy(() => import('../components/bill-pay/BillPay'));
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
const PaymentManagement = lazy(() => import('../components/bill-pay/payments/PaymentManagement'));

const billPayRoutes: RouteConfig[] = [
  {
    id: 'billPay',
    path: '',  
    title: 'Bill Pay',
    element: BillPay,
    sectionId: 'billPay',
    permissions: {
      requiredPermissions: ['BillPayViewer']
    },
    children: [
      {
        id: 'billPayIndex',
        path: '',  
        title: 'Bill Pay',
        element: BillPayHeader,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayViewer']
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
          requiredPermissions: ['BillPayViewer']
        }
      },
      {
        id: 'payments',
        path: 'payments',
        title: 'Payment Management',
        element: PaymentManagement,
        icon: PaymentIcon,
        sectionId: 'billPay',
        permissions: {
          requiredPermissions: ['BillPayViewer']
        },
        children: [
          {
            id: 'paymentsIndex',
            path: '',
            title: 'Payment Management',
            element: PaymentManagementHeader,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
            }
          },
          {
            id: 'manage-payments',
            path: 'manage',
            title: 'Manage Payments',
            element: PendingPayments,
            icon: ScheduleIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
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
              requiredPermissions: ['BillPayViewer']
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
              requiredPermissions: ['BillPayViewer']
            }
          },
          {
            id: 'manual-processing',
            path: 'manual',
            title: 'Manual Processing',
            element: ManualProcessing,
            icon: TransformIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
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
              requiredPermissions: ['BillPayViewer']
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
          requiredPermissions: ['BillPayViewer']
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
          requiredPermissions: ['BillPayViewer']
        },
        children: [
          {
            id: 'config',
            path: 'config',
            title: 'Configuration',
            element: BillPayConfig,
            icon: TuneIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
            }
          },
          {
            id: 'holidays',
            path: 'holidays',
            title: 'Holidays',
            element: Holidays,
            icon: EventIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
            }
          },
          {
            id: 'notifications',
            path: 'notifications',
            title: 'Notifications',
            element: NotificationTemplates,
            icon: NotificationsIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
            }
          },
          {
            id: 'security',
            path: 'security',
            title: 'Security',
            element: BillPaySecuritySettings,
            icon: SecurityIcon,
            sectionId: 'billPay',
            permissions: {
              requiredPermissions: ['BillPayViewer']
            }
          }
        ]
      }
    ]
  }
];

export default billPayRoutes;