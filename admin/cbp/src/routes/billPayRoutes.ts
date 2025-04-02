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
import WarningIcon from '@mui/icons-material/Warning';
import TransformIcon from '@mui/icons-material/Transform';
import LockIcon from '@mui/icons-material/Lock';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RepeatIcon from '@mui/icons-material/Repeat';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

// Lazy load components
const BillPay = lazy(() => import('../components/bill-pay/BillPay'));
const BillPayHeader = lazy(() => import('../components/bill-pay/BillPayHeader'));
const Dashboard = lazy(() => import('../components/bill-pay/dashboard/Dashboard'));
const PaymentManagement = lazy(() => import('../components/bill-pay/payments/PaymentManagement'));
const PaymentManagementHeader = lazy(() => import('../components/bill-pay/payments/PaymentManagementHeader'));
const PendingPayments = lazy(() => import('../components/bill-pay/payments/ManagePayments'));
const ExceptionTool = lazy(() => import('../components/bill-pay/payments/ExceptionTool'));
const ReportsLanding = lazy(() => import('../components/bill-pay/reports/ReportsLanding'));
const ReportsHeader = lazy(() => import('../components/bill-pay/reports/ReportsHeader'));
const PaymentActivityReport = lazy(() => import('../components/bill-pay/reports/reports/PaymentActivityReport'));
const ErrorRecapReport = lazy(() => import('../components/bill-pay/reports/reports/ErrorRecapReport'));
const ActiveUserCountReport = lazy(() => import('../components/bill-pay/reports/reports/ActiveUserCountReport'));
const FailedOnUsReport = lazy(() => import('../components/bill-pay/reports/reports/FailedOnUsReport'));
const GlobalHolidaysReport = lazy(() => import('../components/bill-pay/reports/reports/GlobalHolidaysReport'));
const MonthlyUsersReport = lazy(() => import('../components/bill-pay/reports/reports/MonthlyUsersReport'));
const PendingPaymentsReport = lazy(() => import('../components/bill-pay/reports/reports/PendingPaymentsReport'));
const RecurringPaymentChangeHistoryReport = lazy(() => import('../components/bill-pay/reports/reports/RecurringPaymentChangeHistoryReport'));
const UserPayeeChangeHistoryReport = lazy(() => import('../components/bill-pay/reports/reports/UserPayeeChangeHistoryReport'));
const OnUsPostingsReport = lazy(() => import('../components/bill-pay/reports/reports/OnUsPostingsReport'));
const StatusesWithNotificationsReport = lazy(() => import('../components/bill-pay/reports/reports/StatusesWithNotificationsReport'));
const LargePaymentReport = lazy(() => import('../components/bill-pay/reports/reports/LargePaymentReport'));
const ProcessingConfirmationReport = lazy(() => import('../components/bill-pay/reports/reports/ProcessingConfirmationReport'));
const ScheduledPaymentChangeHistoryReport = lazy(() => import('../components/bill-pay/reports/reports/ScheduledPaymentChangeHistoryReport'));
const PayeeReport = lazy(() => import('../components/bill-pay/reports/reports/PayeeReport'));
const PaymentReport = lazy(() => import('../components/bill-pay/reports/reports/PaymentReport'));
const PaymentClearReport = lazy(() => import('../components/bill-pay/reports/reports/PaymentClearReport'));
const RecurringPaymentReport = lazy(() => import('../components/bill-pay/reports/reports/RecurringPaymentReport'));
const UserPayeeReport = lazy(() => import('../components/bill-pay/reports/reports/UserPayeeReport'));
const BillPayConfig = lazy(() => import('../components/bill-pay/settings/BillPayConfig'));
const Holidays = lazy(() => import('../components/bill-pay/settings/Holidays'));
const NotificationTemplates = lazy(() => import('../components/bill-pay/settings/NotificationTemplates'));
const ManualProcessing = lazy(() => import('../components/bill-pay/payments/ManualProcessing'));
const FisPayeeCheck = lazy(() => import('../components/bill-pay/payments/FisPayeeCheck'));
const FISExceptionHandling = lazy(() => import('../components/bill-pay/payments/FISExceptionHandling'));
const CopyMemberPayees = lazy(() => import('../components/bill-pay/payments/CopyMemberPayees'));
const ChangeHistory = lazy(() => import('../components/bill-pay/payments/ChangeHistory'));
const Settings = lazy(() => import('../components/bill-pay/settings/Settings'));

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
        hideFromSidebar: true,
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
        element: ReportsHeader,
        icon: AssessmentIcon,
        sectionId: 'billPay',
        resourceId: 'route:billPay.reports' as ResourceId,
        children: [
          {
            id: 'reportsIndex',
            path: '',
            title: 'Reports',
            element: ReportsLanding,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.index' as ResourceId
          },
          {
            id: 'paymentActivityReport',
            path: 'payment-activity',
            title: 'Payment Activity Report',
            element: PaymentActivityReport,
            icon: PaymentIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.paymentActivity' as ResourceId
          },
          {
            id: 'errorRecapReport',
            path: 'error-recap',
            title: 'Error Recap Report',
            element: ErrorRecapReport,
            icon: ErrorIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.errorRecap' as ResourceId
          },
          {
            id: 'activeUserCountReport',
            path: 'active-user-count',
            title: 'Active User Count Report',
            element: ActiveUserCountReport,
            icon: GroupIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.activeUserCount' as ResourceId
          },
          {
            id: 'failedOnUsReport',
            path: 'failed-on-us',
            title: 'Failed On Us Report',
            element: FailedOnUsReport,
            icon: ReportProblemIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.failedOnUs' as ResourceId
          },
          {
            id: 'globalHolidaysReport',
            path: 'global-holidays',
            title: 'Global Holidays Report',
            element: GlobalHolidaysReport,
            icon: EventIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.globalHolidays' as ResourceId
          },
          {
            id: 'monthlyUsersReport',
            path: 'monthly-users',
            title: 'Monthly Users Report',
            element: MonthlyUsersReport,
            icon: PeopleIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.monthlyUsers' as ResourceId
          },
          {
            id: 'pendingPaymentsReport',
            path: 'pending-payments',
            title: 'Pending Payments Report',
            element: PendingPaymentsReport,
            icon: PaymentIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.pendingPayments' as ResourceId
          },
          {
            id: 'recurringPaymentChangeHistoryReport',
            path: 'recurring-payment-change-history',
            title: 'Recurring Payment Change History Report',
            element: RecurringPaymentChangeHistoryReport,
            icon: HistoryIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.recurringPaymentChangeHistory' as ResourceId
          },
          {
            id: 'userPayeeChangeHistoryReport',
            path: 'user-payee-change-history',
            title: 'User Payee Change History Report',
            element: UserPayeeChangeHistoryReport,
            icon: HistoryIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.userPayeeChangeHistory' as ResourceId
          },
          {
            id: 'onUsPostingsReport',
            path: 'on-us-postings',
            title: 'On Us Postings Report',
            element: OnUsPostingsReport,
            icon: AccountBalanceIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.onUsPostings' as ResourceId
          },
          {
            id: 'statusesWithNotificationsReport',
            path: 'statuses-with-notifications',
            title: 'Statuses with Notifications Report',
            element: StatusesWithNotificationsReport,
            icon: NotificationsIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.statusesWithNotifications' as ResourceId
          },
          {
            id: 'largePaymentReport',
            path: 'large-payment',
            title: 'Large Payment Report',
            element: LargePaymentReport,
            icon: PaymentsIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.largePayment' as ResourceId
          },
          {
            id: 'processingConfirmationReport',
            path: 'processing-confirmation',
            title: 'Processing Confirmation Report',
            element: ProcessingConfirmationReport,
            icon: ConfirmationNumberIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.processingConfirmation' as ResourceId
          },
          {
            id: 'scheduledPaymentChangeHistoryReport',
            path: 'scheduled-payment-change-history',
            title: 'Scheduled Payment Change History Report',
            element: ScheduledPaymentChangeHistoryReport,
            icon: HistoryIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.scheduledPaymentChangeHistory' as ResourceId
          },
          {
            id: 'payeeReport',
            path: 'payee',
            title: 'Payee Report',
            element: PayeeReport,
            icon: SearchIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.payee' as ResourceId
          },
          {
            id: 'paymentReport',
            path: 'payment',
            title: 'Payment Report',
            element: PaymentReport,
            icon: PaymentsIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.payment' as ResourceId
          },
          {
            id: 'paymentClearReport',
            path: 'payment-clear',
            title: 'Payment Clear Report',
            element: PaymentClearReport,
            icon: ConfirmationNumberIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.paymentClear' as ResourceId
          },
          {
            id: 'recurringPaymentReport',
            path: 'recurring-payment',
            title: 'Recurring Payment Report',
            element: RecurringPaymentReport,
            icon: RepeatIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.recurringPayment' as ResourceId
          },
          {
            id: 'userPayeeReport',
            path: 'user-payee',
            title: 'User Payee Report',
            element: UserPayeeReport,
            icon: SearchIcon,
            sectionId: 'billPay',
            resourceId: 'route:billPay.reports.userPayee' as ResourceId
          }
        ]
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
          }
        ]
      }
    ]
  }
];

export default billPayRoutes;