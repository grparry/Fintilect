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

export const navigationConfig: NavigationConfig = {
  sections: [
    {
      id: 'emergeAdmin',
      title: 'Emerge Admin',
      icon: AdminPanelSettings,
      color: '#1976d2',
      description: 'Manage Emerge settings and configurations',
      path: '/admin/emerge',
      items: [
        {
          id: 'member-center',
          title: 'Member Center',
          path: '/admin/emerge/member-center',
          icon: PeopleIcon,
          permissions: {
            permissions: ['view-members', 'read']
          }
        },
        {
          id: 'money-desktop',
          title: 'Money Desktop',
          path: '/admin/emerge/money-desktop',
          icon: AccountBalanceIcon,
          permissions: {
            permissions: ['view-money-desktop', 'read']
          }
        }
      ],
      permissions: {
        permissions: ['view-emerge-admin', 'read']
      }
    },
    {
      id: 'emergeConfig',
      title: 'Emerge Config',
      icon: SettingsIcon,
      color: '#0288d1',  // Light Blue
      basePath: '/admin/emerge-config',
      path: '/admin/emerge-config',
      description: 'Emerge configuration settings',
      items: [
        {
          id: 'core',
          title: 'Core',
          path: '/admin/emerge-config/core',
          icon: SettingsApplicationsIcon,
          items: [
            { id: 'connect-native', title: 'ConnectNative', path: '/admin/emerge-config/core/connect-native', icon: PhonelinkIcon },
            { id: 'features', title: 'Features', path: '/admin/emerge-config/core/features', icon: ToggleOnIcon },
            { id: 'financial-cores', title: 'FinancialCores', path: '/admin/emerge-config/core/financial-cores', icon: AccountBalanceIcon },
            { id: 'institution', title: 'Institution', path: '/admin/emerge-config/core/institution', icon: BusinessIcon },
            { id: 'app-info-settings', title: 'AppInfoSettings', path: '/admin/emerge-config/core/app-info', icon: InfoIcon },
            { id: 'deployment', title: 'Deployment', path: '/admin/emerge-config/core/deployment', icon: CloudUploadIcon },
            {
              id: 'system-services',
              title: 'System Services',
              path: '/admin/emerge-config/core/system-services',
              icon: ApiIcon,
              description: 'Configure system services and integrations'
            }
          ]
        },
        {
          id: 'accounts',
          title: 'Accounts',
          path: '/admin/emerge-config/accounts',
          icon: AccountBalanceIcon,
          items: [
            { id: 'account', title: 'Account', path: '/admin/emerge-config/accounts/account', icon: AccountCircleIcon },
            { id: 'business-banking', title: 'BusinessBanking', path: '/admin/emerge-config/accounts/business-banking', icon: BusinessCenterIcon },
            { id: 'checking-rewards', title: 'CheckingRewards', path: '/admin/emerge-config/accounts/checking-rewards', icon: StarsIcon },
            { id: 'direct-deposit', title: 'Direct Deposit', path: '/admin/emerge-config/accounts/direct-deposit', icon: AccountBalanceWalletIcon },
            { id: 'history', title: 'History', path: '/admin/emerge-config/accounts/history', icon: HistoryIcon }
          ]
        },
        {
          id: 'cards-payments',
          title: 'Cards & Payments',
          path: '/admin/emerge-config/cards-payments',
          icon: CreditCardIcon,
          items: [
            { id: 'card-management', title: 'CardManagement', path: '/admin/emerge-config/cards-payments/card-management', icon: CreditScoreIcon },
            { id: 'credit-cards', title: 'CreditCards', path: '/admin/emerge-config/cards-payments/credit-cards', icon: CreditCardIcon },
            { id: 'bill-pay', title: 'BillPay', path: '/admin/emerge-config/cards-payments/bill-pay', icon: PaymentsIcon },
            { id: 'ach-service', title: 'AchService', path: '/admin/emerge-config/cards-payments/ach-service', icon: SwapHorizIcon }
          ]
        },
        {
          id: 'auth-security',
          title: 'Authentication & Security',
          path: '/admin/emerge-config/auth-security',
          icon: SecurityIcon,
          items: [
            {
              id: 'login',
              title: 'Login Settings',
              path: '/admin/emerge-config/auth-security/login',
              icon: LoginIcon,
              description: 'Home banking login and password policies'
            },
            {
              id: 'security-verification',
              title: 'Security Verification',
              path: '/admin/emerge-config/auth-security/security-verification',
              icon: FingerprintIcon,
              description: 'MFA and device verification settings'
            },
            {
              id: 'admin-security',
              title: 'Admin Security',
              path: '/admin/emerge-config/auth-security/admin-security',
              icon: AdminPanelSettingsIcon,
              description: 'Admin access and audit logs'
            }
          ]
        },
        {
          id: 'loans-credit',
          title: 'Loans & Credit',
          path: '/admin/emerge-config/loans-credit',
          icon: RequestQuoteIcon,
          items: [
            { id: 'loans', title: 'Loans', path: '/admin/emerge-config/loans-credit/loans', icon: AccountBalanceIcon },
            { id: 'loan-offers', title: 'LoanOffers', path: '/admin/emerge-config/loans-credit/loan-offers', icon: LocalOfferIcon },
            { id: 'loan-sso', title: 'LoanSSO', path: '/admin/emerge-config/loans-credit/loan-sso', icon: LinkIcon },
            { id: 'fico', title: 'FICO', path: '/admin/emerge-config/loans-credit/fico', icon: AnalyticsIcon },
            { id: 'credit-score-history', title: 'CreditScoreHistory', path: '/admin/emerge-config/loans-credit/credit-score-history', icon: TrendingUpIcon }
          ]
        },
        {
          id: 'user-services',
          title: 'User Services',
          path: '/admin/emerge-config/user-services',
          icon: ManageAccountsIcon,
          items: [
            { id: 'address', title: 'Address', path: '/admin/emerge-config/user-services/address', icon: LocationOnIcon },
            { id: 'alerts', title: 'Alerts', path: '/admin/emerge-config/user-services/alerts', icon: NotificationsIcon },
            { id: 'email', title: 'Email', path: '/admin/emerge-config/user-services/email', icon: EmailIcon },
            { id: 'beneficiary', title: 'Beneficiary', path: '/admin/emerge-config/user-services/beneficiary', icon: PersonAddIcon },
            { id: 'chat', title: 'Chat', path: '/admin/emerge-config/user-services/chat', icon: ChatIcon }
          ]
        },
        {
          id: 'document-services',
          title: 'Document Services',
          path: '/admin/emerge-config/document-services',
          icon: FolderSpecialIcon,
          items: [
            { id: 'check-images', title: 'CheckImages', path: '/admin/emerge-config/document-services/check-images', icon: ImageIcon },
            { id: 'check-reorder', title: 'CheckReorder', path: '/admin/emerge-config/document-services/check-reorder', icon: RefreshIcon },
            { id: 'info-image-estatements', title: 'InfoImageEstatements', path: '/admin/emerge-config/document-services/info-image-estatements', icon: DescriptionIcon },
            { id: 'custom-pages', title: 'CustomPages', path: '/admin/emerge-config/document-services/custom-pages', icon: ArticleIcon }
          ]
        },
        {
          id: 'marketing-offers',
          title: 'Marketing & Offers',
          path: '/admin/emerge-config/marketing-offers',
          icon: CampaignIcon,
          items: [
            { id: 'marketing', title: 'Marketing', path: '/admin/emerge-config/marketing-offers/marketing', icon: AdsClickIcon },
            { id: 'cardlytics', title: 'Cardlytics', path: '/admin/emerge-config/marketing-offers/cardlytics', icon: AnalyticsIcon }
          ]
        },
        {
          id: 'compliance-support',
          title: 'Compliance & Support',
          path: '/admin/emerge-config/compliance-support',
          icon: PolicyIcon,
          items: [
            { id: 'ada-compliance', title: 'ADACompliance', path: '/admin/emerge-config/compliance-support/ada-compliance', icon: AccessibilityNewIcon },
            { id: 'error-messages', title: 'ErrorMessages', path: '/admin/emerge-config/compliance-support/error-messages', icon: ErrorOutlineIcon },
            { id: 'co-browse', title: 'CoBrowse', path: '/admin/emerge-config/compliance-support/co-browse', icon: GroupWorkIcon }
          ]
        },
        {
          id: 'miscellaneous',
          title: 'Miscellaneous',
          path: '/admin/emerge-config/misc',
          icon: WidgetsIcon,
          items: [
            { id: 'google', title: 'Google', path: '/admin/emerge-config/misc/google', icon: GTranslateIcon },
            { id: 'better-lobby', title: 'BetterLobby', path: '/admin/emerge-config/misc/better-lobby', icon: MeetingRoomIcon },
            { id: 'imi-mobile-text-banking', title: 'ImiMobileTextBanking', path: '/admin/emerge-config/misc/imi-mobile-text-banking', icon: SmsIcon }
          ]
        }
      ],
      permissions: {
        permissions: ['view-emerge-config', 'read']
      }
    },
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
            permissions: ['view-dashboard', 'read']
          }
        },
        {
          id: 'payment-management',
          title: 'Payment Management',
          path: '/admin/bill-pay/payments',
          icon: AccountBalanceIcon,
          permissions: {
            permissions: ['manage-payments', 'read', 'write']
          }
        },
        {
          id: 'reports',
          title: 'Reports',
          path: '/admin/bill-pay/reports',
          icon: AssessmentIcon,
          permissions: {
            permissions: ['view-reports', 'read']
          }
        },
        {
          id: 'data-conversion',
          title: 'Data Conversion',
          path: '/admin/bill-pay/data-conversion',
          icon: SyncAltIcon,
          permissions: {
            permissions: ['manage-data-conversion', 'read', 'write']
          }
        },
        {
          id: 'settings',
          title: 'Settings',
          path: '/admin/bill-pay/settings',
          icon: SettingsIcon,
          permissions: {
            permissions: ['manage-settings', 'read', 'write']
          }
        }
      ],
      permissions: {
        permissions: ['view-bill-pay', 'read']
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
  defaultSection: 'emergeAdmin'
};
