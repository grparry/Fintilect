import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import { ResourceId } from '../types/permissions.types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorIcon from '@mui/icons-material/Error';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import TransformIcon from '@mui/icons-material/Transform';
import LockIcon from '@mui/icons-material/Lock';
import HistoryIcon from '@mui/icons-material/History';

// Lazy load components
const BillPay = lazy(() => import('../components/bill-pay/BillPay'));
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const PaymentManagement = lazy(() => import('../components/bill-pay/payments/PaymentManagement'));
const PaymentManagementHeader = lazy(() => import('../components/bill-pay/payments/PaymentManagementHeader'));
const PendingPayments = lazy(() => import('../components/bill-pay/payments/ManagePayments'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const Reports = lazy(() => import('../components/bill-pay/reports/index'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));
const BillPayConfig = lazy(() => import('../components/bill-pay/settings/BillPayConfig'));
const Holidays = lazy(() => import('../components/bill-pay/settings/Holidays'));
const NotificationTemplates = lazy(() => import('../components/bill-pay/settings/NotificationTemplates'));
const BillPaySecuritySettings = lazy(() => import('../components/bill-pay/settings/security/BillPaySecuritySettings'));
const ManualProcessing = lazy(() => import('../components/bill-pay/payments/ManualProcessing'));
const FisPayeeCheck = lazy(() => import('../components/bill-pay/payments/FisPayeeCheck'));
const FISExceptionHandling = lazy(() => import('../components/bill-pay/payments/FISExceptionHandling'));
const CopyMemberPayees = lazy(() => import('../components/bill-pay/payments/CopyMemberPayees'));
const ChangeHistory = lazy(() => import('../components/bill-pay/payments/ChangeHistory'));

const billPayRoutes: RouteConfig[] = [
  {
    id: 'billPay',
    path: '',  
    title: 'Bill Pay',
    element: BillPay,
    sectionId: 'billPay',
    resourceId: 'route:billPay' as ResourceId,
    children: [
      {
        id: 'billPayIndex',
        path: '',  
        title: 'Bill Pay',
        element: BillPayHeader,
        sectionId: 'billPay',
        resourceId: 'route:billPay.index' as ResourceId
      },
      {
        id: 'dashboard',
        path: 'dashboard',
        title: 'Dashboard',
        element: Dashboard,
        icon: DashboardIcon,
        sectionId: 'billPay',
        resourceId: 'route:billPay.dashboard' as ResourceId
      },
      {
        id: 'payments',
        path: 'payments',
        title: 'Payment Management',
        element: PaymentManagement,
        icon: PaymentIcon,
        sectionId: 'billPay',
        resourceId: 'route:billPay.payments' as ResourceId,
        children: [
          {
            id: 'paymentsIndex',
            path: '',
            title: 'Payment Management',
            element: PaymentManagementHeader,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.index' as ResourceId
          },
          {
            id: 'manage-payments',
            path: 'manage',
            title: 'Manage Payments',
            element: PendingPayments,
            icon: ScheduleIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.manage' as ResourceId
          },
          {
            id: 'exceptions',
            path: 'exceptions',
            title: 'Exceptions',
            element: ExceptionTool,
            icon: WarningIcon,
            sectionId: 'billPay',
            hideFromSidebar: true,
            resourceId: 'route:billPay.payments.exceptions' as ResourceId
          },
          {
            id: 'fis-exception-handling',
            path: 'fis-exceptions',
            title: 'FIS Exception Handling',
            element: FISExceptionHandling,
            icon: ErrorIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.fis-exceptions' as ResourceId
          },
          {
            id: 'manual-processing',
            path: 'manual',
            title: 'Manual Processing',
            element: ManualProcessing,
            icon: TransformIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.manual' as ResourceId
          },
          {
            id: 'fis-payee-check',
            path: 'fis-payee',
            title: 'FIS Payee Check',
            element: FisPayeeCheck,
            icon: BuildIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.fis-payee' as ResourceId
          },
          {
            id: 'copy-member-payees',
            path: 'copy-payees',
            title: 'Copy Member Payees',
            element: CopyMemberPayees,
            icon: TransformIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.copy-payees' as ResourceId
          },
          {
            id: 'change-history',
            path: 'change-history',
            title: 'Change History',
            element: ChangeHistory,
            icon: HistoryIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.payments.change-history' as ResourceId
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
        resourceId: 'route:billPay.reports' as ResourceId
      },
      {
        id: 'settings',
        path: 'settings',
        title: 'Settings',
        element: Settings,
        icon: SettingsIcon,
        sectionId: 'billPay',
        resourceId: 'route:billPay.settings' as ResourceId,
        children: [
          {
            id: 'config',
            path: 'config',
            title: 'Configuration',
            element: BillPayConfig,
            icon: LockIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.settings.config' as ResourceId
          },
          {
            id: 'holidays',
            path: 'holidays',
            title: 'Holidays',
            element: Holidays,
            icon: EventIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.settings.holidays' as ResourceId
          },
          {
            id: 'notifications',
            path: 'notifications',
            title: 'Notifications',
            element: NotificationTemplates,
            icon: NotificationsIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.settings.notifications' as ResourceId
          },
          {
            id: 'security',
            path: 'security',
            title: 'Security',
            element: BillPaySecuritySettings,
            icon: SecurityIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.settings.security' as ResourceId
          }
        ]
      }
    ]
  }
];

export default billPayRoutes;