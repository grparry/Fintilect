import { NavigationConfig } from '../types/section-navigation.types';
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
      items: [
        {
          id: 'client-list',
          title: 'Clients',
          path: '/admin/client-management/list',
          icon: ListIcon,
          permissions: {
            permissions: ['view-clients', 'read']
          }
        }
      ],
      permissions: {
        permissions: ['view-clients', 'read']
      }
    },
    {
      id: 'billPay',
      title: 'Bill Pay',
      icon: PaymentsIcon,
      color: '#ed6c02',
      description: 'Manage bill pay features and settings',
      path: '/admin/bill-pay',
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          path: '/admin/bill-pay/dashboard',
          icon: DashboardIcon,
          permissions: {
            permissions: ['bill-pay:read']
          }
        },
        {
          id: 'payments',
          title: 'Payment Management',
          path: '/admin/bill-pay/payments',
          icon: PaymentIcon,
          permissions: {
            permissions: ['bill-pay:read']
          },
          items: [
            {
              id: 'manage-payments',
              title: 'Manage Payments',
              path: '/admin/bill-pay/payments/manage',
              icon: ScheduleIcon,
              permissions: {
                permissions: ['bill-pay:read']
              }
            },
            {
              id: 'fis-exceptions',
              title: 'FIS Exception Handling',
              path: '/admin/bill-pay/payments/fis-exceptions',
              icon: ErrorIcon,
              permissions: {
                permissions: ['bill-pay:read']
              }
            },
            {
              id: 'manual-processing',
              title: 'Manual Processing',
              path: '/admin/bill-pay/payments/manual',
              icon: BuildIcon,
              permissions: {
                permissions: ['bill-pay:read']
              }
            },
            {
              id: 'fis-payee-check',
              title: 'FIS Payee Check',
              path: '/admin/bill-pay/payments/fis-payee-check',
              icon: AccountBalanceIcon,
              permissions: {
                permissions: ['bill-pay:read']
              }
            }
          ]
        },
        {
          id: 'reports',
          title: 'Reports',
          path: '/admin/bill-pay/reports',
          icon: AssessmentIcon,
          permissions: {
            permissions: ['bill-pay:read']
          }
        },
        {
          id: 'settings',
          title: 'Settings',
          path: '/admin/bill-pay/settings',
          icon: SettingsIcon,
          permissions: {
            permissions: ['bill-pay:read']
          }
        }
      ],
      permissions: {
        permissions: ['bill-pay:read']
      }
    },
    {
      id: 'development',
      title: 'Development',
      icon: CodeIcon,
      color: '#9c27b0',
      description: 'Development and testing tools',
      path: '/admin/development',
      items: [
        {
          id: 'development',
          title: 'Development',
          path: '/admin/development',
          icon: CodeIcon,
          permissions: {
            permissions: ['use-development', 'read']
          }
        },
        {
          id: 'api-testing',
          title: 'API Testing',
          path: '/admin/development/api-testing',
          icon: ApiIcon,
          permissions: {
            permissions: ['use-api-testing', 'read']
          }
        }
      ],
      permissions: {
        permissions: ['access-development', 'read']
      }
    }
  ],
  defaultSection: 'clientManagement'
};
