import { lazy } from 'react';
import { RouteConfig } from '@/types/route.types';
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
const BillPay = lazy(() => import('../components/bill-pay/BillPay'));

const billPayRoutes: RouteConfig[] = [
  {
    id: 'bill-pay',
    path: '/admin/bill-pay',
    title: 'Bill Pay',
    element: BillPayHeader,
    icon: PaymentIcon,
    sectionId: 'billPay',
  },
  {
    id: 'dashboard',
    path: '/admin/bill-pay/dashboard',
    title: 'Dashboard',
    element: Dashboard,
    icon: DashboardIcon,
    sectionId: 'billPay',
  },
  {
    id: 'billPay',
    path: '/admin/bill-pay/payments',
    title: 'Payments',
    icon: PaymentIcon,
    element: BillPay,
    sectionId: 'billPay',
    children: [
      {
        id: 'payments',
        path: '/admin/bill-pay/payments',
        title: 'Payments',
        element: PendingPayments,
      },
      {
        id: 'exceptions',
        path: '/admin/bill-pay/exceptions',
        title: 'Exceptions',
        element: ExceptionTool,
      },
      {
        id: 'exceptions-tool',
        path: '/admin/bill-pay/payments/exceptions',
        title: 'Exception Tool',
        element: ExceptionTool,
        icon: WarningIcon,
        sectionId: 'billPay',
      },
      {
        id: 'fis-exceptions',
        path: '/admin/bill-pay/payments/fis-exceptions',
        title: 'FIS Exception Handling',
        element: FISExceptionHandling,
        icon: ErrorIcon,
        sectionId: 'billPay',
      },
      {
        id: 'pending-payments',
        path: '/admin/bill-pay/payments/pending',
        title: 'Pending Payments',
        element: PendingPayments,
        icon: ScheduleIcon,
        sectionId: 'billPay',
      },
      {
        id: 'manual-processing',
        path: '/admin/bill-pay/payments/manual',
        title: 'Manual Processing',
        element: ManualProcessing,
        icon: BuildIcon,
        sectionId: 'billPay',
      },
      {
        id: 'payee-conversion',
        path: '/admin/bill-pay/payments/payee-conversion',
        title: 'Payee Conversion',
        element: PayeeConversion,
        icon: TransformIcon,
        sectionId: 'billPay',
      }
    ]
  },
  {
    id: 'reports',
    path: '/admin/bill-pay/reports',
    title: 'Reports',
    element: Reports,
    icon: AssessmentIcon,
    sectionId: 'billPay',
  },
  {
    id: 'settings',
    path: '/admin/bill-pay/settings',
    title: 'Settings',
    icon: SettingsIcon,
    element: Settings,
    sectionId: 'billPay',
    children: [
      {
        id: 'holidays',
        path: '/admin/bill-pay/settings/holidays',
        title: 'Holidays',
        element: Holidays,
        icon: EventIcon,
        sectionId: 'billPay',
      },
      {
        id: 'bill-pay-config',
        path: '/admin/bill-pay/settings/config',
        title: 'Bill Pay Config',
        element: BillPayConfig,
        icon: TuneIcon,
        sectionId: 'billPay',
      },
      {
        id: 'notification-templates',
        path: '/admin/bill-pay/settings/notifications',
        title: 'Notification Templates',
        element: NotificationTemplates,
        icon: NotificationsIcon,
        sectionId: 'billPay',
      },
      {
        id: 'permission-groups',
        path: '/admin/bill-pay/settings/permissions',
        title: 'Permission Groups',
        element: PermissionGroups,
        icon: SecurityIcon,
        sectionId: 'billPay',
      },
      {
        id: 'security-settings',
        path: '/admin/bill-pay/settings/security',
        title: 'Security Settings',
        element: BillPaySecuritySettings,
        icon: LockIcon,
        sectionId: 'billPay',
      }
    ]
  }
];

export default billPayRoutes;
