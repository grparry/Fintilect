import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CampaignIcon from '@mui/icons-material/Campaign';
import PolicyIcon from '@mui/icons-material/Policy';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import LockIcon from '@mui/icons-material/Lock';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GavelIcon from '@mui/icons-material/Gavel';
import ExtensionIcon from '@mui/icons-material/Extension';

// Lazy load components
const EmergeConfigHeader = lazy(() => import('../components/emerge-config/EmergeConfigHeader'));
const EmergeConfigLanding = lazy(() => import('../components/emerge-config/EmergeConfigLanding'));
const CoreSettingsLanding = lazy(() => import('../components/emerge-config/core/CoreSettingsLanding'));
const AccountsLanding = lazy(() => import('../components/emerge-config/accounts/AccountsLanding'));
const CardsPaymentsLanding = lazy(() => import('../components/emerge-config/cards-payments/CardsPaymentsLanding'));
const AuthSecurityLanding = lazy(() => import('../components/emerge-config/auth-security/AuthSecurityLanding'));
const LoansCreditLanding = lazy(() => import('../components/emerge-config/loans-credit/LoansCreditLanding'));
const UserServicesLanding = lazy(() => import('../components/emerge-config/user-services/UserServicesLanding'));
const DocumentServicesLanding = lazy(() => import('../components/emerge-config/document-services/DocumentServicesLanding'));
const MarketingOffersLanding = lazy(() => import('../components/emerge-config/marketing-offers/MarketingOffersLanding'));
const ComplianceSupportLanding = lazy(() => import('../components/emerge-config/compliance-support/ComplianceSupportLanding'));
const MiscLanding = lazy(() => import('../components/emerge-config/misc/MiscLanding'));
const ConfigPlaceholder = lazy(() => import('../components/emerge-config/ConfigPlaceholder'));
const emergeConfigRoutes: RouteConfig[] = [
  // Root and landing routes
  {
    id: 'emerge-config-root',
    path: '',
    title: 'Emerge Config',
    element: EmergeConfigHeader,
    icon: SettingsIcon,
    sectionId: 'emergeConfig',
    hideFromSidebar: true,
  },
  {
    id: 'emerge-config-landing',
    path: '',
    title: 'Emerge Config Overview',
    element: EmergeConfigLanding,
    icon: SettingsIcon,
    sectionId: 'emergeConfig',
    hideFromSidebar: true,
  },
  // Core Settings section
  {
    id: 'emergeConfig-core',
    path: 'core',
    title: 'Core Settings',
    element: CoreSettingsLanding,
    icon: SettingsApplicationsIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-core-general',
        path: 'general',
        title: 'General Settings',
        element: ConfigPlaceholder,
        icon: SettingsApplicationsIcon,
        children: [
          {
            id: 'emergeConfig-core-general-basic',
            path: 'basic',
            title: 'Basic Settings',
            element: ConfigPlaceholder,
            icon: SettingsApplicationsIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-core-branding',
        path: 'branding',
        title: 'Branding',
        element: ConfigPlaceholder,
        icon: SettingsApplicationsIcon,
        children: [
          {
            id: 'emergeConfig-core-branding-logos',
            path: 'logos',
            title: 'Logo Settings',
            element: ConfigPlaceholder,
            icon: SettingsApplicationsIcon,
          }
        ]
      }
    ]
  },
  // Accounts section
  {
    id: 'emergeConfig-accounts',
    path: 'accounts',
    title: 'Accounts',
    element: AccountsLanding,
    icon: AccountBalanceIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-accounts-types',
        path: 'types',
        title: 'Account Types',
        element: ConfigPlaceholder,
        icon: AccountBoxIcon,
        children: [
          {
            id: 'emergeConfig-accounts-types-savings',
            path: 'savings',
            title: 'Savings Accounts',
            element: ConfigPlaceholder,
            icon: AccountBoxIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-accounts-features',
        path: 'features',
        title: 'Account Features',
        element: ConfigPlaceholder,
        icon: AccountBalanceIcon,
        children: [
          {
            id: 'emergeConfig-accounts-features-overdraft',
            path: 'overdraft',
            title: 'Overdraft Settings',
            element: ConfigPlaceholder,
            icon: AccountBalanceIcon,
          }
        ]
      }
    ]
  },
  // Cards & Payments section
  {
    id: 'emergeConfig-cards-payments',
    path: 'cards-payments',
    title: 'Cards & Payments',
    element: CardsPaymentsLanding,
    icon: CreditCardIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-cards-settings',
        path: 'cards',
        title: 'Card Settings',
        element: ConfigPlaceholder,
        icon: CreditCardIcon,
        children: [
          {
            id: 'emergeConfig-cards-settings-physical',
            path: 'physical',
            title: 'Physical Card Settings',
            element: ConfigPlaceholder,
            icon: CreditCardIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-payment-methods',
        path: 'methods',
        title: 'Payment Methods',
        element: ConfigPlaceholder,
        icon: PaymentsIcon,
        children: [
          {
            id: 'emergeConfig-payment-methods-bank-transfer',
            path: 'bank-transfer',
            title: 'Bank Transfer Settings',
            element: ConfigPlaceholder,
            icon: PaymentsIcon,
          }
        ]
      }
    ]
  },
  // Authentication & Security section
  {
    id: 'emergeConfig-auth-security',
    path: 'auth-security',
    title: 'Authentication & Security',
    element: AuthSecurityLanding,
    icon: SecurityIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-auth-methods',
        path: 'methods',
        title: 'Authentication Methods',
        element: ConfigPlaceholder,
        icon: LockIcon,
        children: [
          {
            id: 'emergeConfig-auth-methods-password',
            path: 'password',
            title: 'Password Settings',
            element: ConfigPlaceholder,
            icon: LockIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-security-policies',
        path: 'policies',
        title: 'Security Policies',
        element: ConfigPlaceholder,
        icon: SecurityIcon,
        children: [
          {
            id: 'emergeConfig-security-policies-password-policy',
            path: 'password-policy',
            title: 'Password Policy Settings',
            element: ConfigPlaceholder,
            icon: SecurityIcon,
          }
        ]
      }
    ]
  },
  // Loans & Credit section
  {
    id: 'emergeConfig-loans-credit',
    path: 'loans-credit',
    title: 'Loans & Credit',
    element: LoansCreditLanding,
    icon: RequestQuoteIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-loan-products',
        path: 'products',
        title: 'Loan Products',
        element: ConfigPlaceholder,
        icon: CurrencyExchangeIcon,
        children: [
          {
            id: 'emergeConfig-loan-products-personal-loans',
            path: 'personal-loans',
            title: 'Personal Loan Settings',
            element: ConfigPlaceholder,
            icon: CurrencyExchangeIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-credit-settings',
        path: 'credit',
        title: 'Credit Settings',
        element: ConfigPlaceholder,
        icon: RequestQuoteIcon,
        children: [
          {
            id: 'emergeConfig-credit-settings-credit-score',
            path: 'credit-score',
            title: 'Credit Score Settings',
            element: ConfigPlaceholder,
            icon: RequestQuoteIcon,
          }
        ]
      }
    ]
  },
  // User Services section
  {
    id: 'emergeConfig-user-services',
    path: 'user-services',
    title: 'User Services',
    element: UserServicesLanding,
    icon: ManageAccountsIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-user-roles',
        path: 'roles',
        title: 'User Roles',
        element: ConfigPlaceholder,
        icon: GroupIcon,
        children: [
          {
            id: 'emergeConfig-user-roles-admin',
            path: 'admin',
            title: 'Admin Role Settings',
            element: ConfigPlaceholder,
            icon: GroupIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-service-settings',
        path: 'settings',
        title: 'Service Settings',
        element: ConfigPlaceholder,
        icon: ManageAccountsIcon,
        children: [
          {
            id: 'emergeConfig-service-settings-notification',
            path: 'notification',
            title: 'Notification Settings',
            element: ConfigPlaceholder,
            icon: ManageAccountsIcon,
          }
        ]
      }
    ]
  },
  // Document Services section
  {
    id: 'emergeConfig-document-services',
    path: 'document-services',
    title: 'Document Services',
    element: DocumentServicesLanding,
    icon: FolderSpecialIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-document-types',
        path: 'types',
        title: 'Document Types',
        element: ConfigPlaceholder,
        icon: DescriptionIcon,
        children: [
          {
            id: 'emergeConfig-document-types-identification',
            path: 'identification',
            title: 'Identification Document Settings',
            element: ConfigPlaceholder,
            icon: DescriptionIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-document-workflows',
        path: 'workflows',
        title: 'Document Workflows',
        element: ConfigPlaceholder,
        icon: FolderSpecialIcon,
        children: [
          {
            id: 'emergeConfig-document-workflows-upload',
            path: 'upload',
            title: 'Document Upload Settings',
            element: ConfigPlaceholder,
            icon: FolderSpecialIcon,
          }
        ]
      }
    ]
  },
  // Marketing & Offers section
  {
    id: 'emergeConfig-marketing-offers',
    path: 'marketing-offers',
    title: 'Marketing & Offers',
    element: MarketingOffersLanding,
    icon: CampaignIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-campaign-settings',
        path: 'campaigns',
        title: 'Campaign Settings',
        element: ConfigPlaceholder,
        icon: CampaignIcon,
        children: [
          {
            id: 'emergeConfig-campaign-settings-email',
            path: 'email',
            title: 'Email Campaign Settings',
            element: ConfigPlaceholder,
            icon: CampaignIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-offer-management',
        path: 'offers',
        title: 'Offer Management',
        element: ConfigPlaceholder,
        icon: LocalOfferIcon,
        children: [
          {
            id: 'emergeConfig-offer-management-promotions',
            path: 'promotions',
            title: 'Promotion Settings',
            element: ConfigPlaceholder,
            icon: LocalOfferIcon,
          }
        ]
      }
    ]
  },
  // Compliance & Support section
  {
    id: 'emergeConfig-compliance-support',
    path: 'compliance-support',
    title: 'Compliance & Support',
    element: ComplianceSupportLanding,
    icon: PolicyIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-compliance-rules',
        path: 'rules',
        title: 'Compliance Rules',
        element: ConfigPlaceholder,
        icon: GavelIcon,
        children: [
          {
            id: 'emergeConfig-compliance-rules-aml',
            path: 'aml',
            title: 'AML Settings',
            element: ConfigPlaceholder,
            icon: GavelIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-support-settings',
        path: 'support',
        title: 'Support Settings',
        element: ConfigPlaceholder,
        icon: PolicyIcon,
        children: [
          {
            id: 'emergeConfig-support-settings-faq',
            path: 'faq',
            title: 'FAQ Settings',
            element: ConfigPlaceholder,
            icon: PolicyIcon,
          }
        ]
      }
    ]
  },
  // Miscellaneous section
  {
    id: 'emergeConfig-misc',
    path: 'misc',
    title: 'Miscellaneous',
    element: MiscLanding,
    icon: WidgetsIcon,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emergeConfig-misc-integrations',
        path: 'integrations',
        title: 'Integrations',
        element: ConfigPlaceholder,
        icon: ExtensionIcon,
        children: [
          {
            id: 'emergeConfig-misc-integrations-api',
            path: 'api',
            title: 'API Settings',
            element: ConfigPlaceholder,
            icon: ExtensionIcon,
          }
        ]
      },
      {
        id: 'emergeConfig-misc-settings',
        path: 'settings',
        title: 'Other Settings',
        element: ConfigPlaceholder,
        icon: WidgetsIcon,
        children: [
          {
            id: 'emergeConfig-misc-settings-debug',
            path: 'debug',
            title: 'Debug Settings',
            element: ConfigPlaceholder,
            icon: WidgetsIcon,
          }
        ]
      }
    ]
  }
];
export default emergeConfigRoutes;