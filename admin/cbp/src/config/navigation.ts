import { NavigationConfig } from '../types/section-navigation.types';
import { ResourceId } from '../types/permissions.types';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import StarsIcon from '@mui/icons-material/Stars';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentsIcon from '@mui/icons-material/Payments';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SecurityIcon from '@mui/icons-material/Shield';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LinkIcon from '@mui/icons-material/Link';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ImageIcon from '@mui/icons-material/Image';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArticleIcon from '@mui/icons-material/Article';
import CampaignIcon from '@mui/icons-material/Campaign';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PolicyIcon from '@mui/icons-material/Policy';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SmsIcon from '@mui/icons-material/Sms';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import TransformIcon from '@mui/icons-material/Transform';
import PaymentIcon from '@mui/icons-material/Payment';

export const navigationConfig: NavigationConfig = {
  sections: [
    {
      id: 'clientManagement',
      title: 'Client Management',
      icon: BusinessIcon,
      color: '#2e7d32',
      description: 'Manage clients, users, and permissions',
      path: '/admin/client-management',
      resourceId: 'navigation:clientManagement' as ResourceId,
      items: [
        {
          id: 'client-list',
          title: 'Clients',
          path: '/admin/client-management/list',
          icon: ListIcon,
          resourceId: 'route:client-management.list' as ResourceId
        }
      ]
    },
    {
      id: 'billPay',
      title: 'Bill Pay',
      icon: PaymentsIcon,
      color: '#ed6c02',
      description: 'Manage bill pay features and settings',
      path: '/admin/bill-pay',
      resourceId: 'navigation:billPay' as ResourceId,
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          path: '/admin/bill-pay/dashboard',
          icon: DashboardIcon,
          resourceId: 'route:billPay.dashboard' as ResourceId
        },
        {
          id: 'payments',
          title: 'Payment Management',
          path: '/admin/bill-pay/payments',
          icon: PaymentIcon,
          resourceId: 'route:billPay.payments' as ResourceId,
          items: [
            {
              id: 'manage-payments',
              title: 'Manage Payments',
              path: '/admin/bill-pay/payments/manage',
              icon: ScheduleIcon,
              resourceId: 'route:billPay.payments.manage' as ResourceId
            },
            {
              id: 'payment-exceptions',
              title: 'Exception Handling',
              path: '/admin/bill-pay/payments/exceptions',
              icon: ErrorIcon,
              resourceId: 'route:billPay.payments.exceptions' as ResourceId
            },
            {
              id: 'fis-payee-check',
              title: 'FIS Payee Check',
              path: '/admin/bill-pay/payments/fis-payee',
              icon: AccountBalanceIcon,
              resourceId: 'route:billPay.payments.fis-payee' as ResourceId
            },
            {
              id: 'copy-member-payees',
              title: 'Copy Member Payees',
              path: '/admin/bill-pay/payments/copy-payees',
              icon: TransformIcon,
              resourceId: 'route:billPay.payments.copy-payees' as ResourceId
            },
            {
              id: 'change-history',
              title: 'Change History',
              path: '/admin/bill-pay/payments/change-history',
              icon: HistoryIcon,
              resourceId: 'route:billPay.payments.change-history' as ResourceId
            }
          ]
        },
        {
          id: 'reports',
          title: 'Reports',
          path: '/admin/bill-pay/reports',
          icon: AssessmentIcon,
          resourceId: 'route:billPay.reports' as ResourceId
        },
        {
          id: 'settings',
          title: 'Settings',
          path: '/admin/bill-pay/settings',
          icon: SettingsIcon,
          resourceId: 'route:billPay.settings' as ResourceId
        }
      ]
    },
    {
      id: 'development',
      title: 'Development',
      icon: CodeIcon,
      color: '#9c27b0',
      description: 'Development and testing tools',
      path: '/admin/development',
      resourceId: 'navigation:development' as ResourceId,
      items: [
        {
          id: 'development',
          title: 'Development',
          path: '/admin/development',
          icon: CodeIcon,
          resourceId: 'route:development' as ResourceId
        },
        {
          id: 'api-testing',
          title: 'API Testing',
          path: '/admin/development/api-testing',
          icon: ApiIcon,
          resourceId: 'route:development.api-testing' as ResourceId
        }
      ]
    }
  ],
  defaultSection: 'clientManagement'
};
