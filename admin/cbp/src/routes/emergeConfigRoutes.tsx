import React, { lazy, ComponentType } from 'react';
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

// Lazy load components
const EmergeConfigWrapper = lazy(() => import('../components/emerge-config/EmergeConfigWrapper'));
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

// Create a wrapper component that combines EmergeConfigWrapper and EmergeConfigHeader
const WrappedEmergeConfigHeader: ComponentType = () => {
  return (
    <React.Suspense fallback={null}>
      <EmergeConfigWrapper>
        <EmergeConfigHeader />
      </EmergeConfigWrapper>
    </React.Suspense>
  );
};

// Define the route configuration
const emergeConfigRoutes: RouteConfig[] = [
  {
    id: 'emerge-config',
    path: '',
    element: WrappedEmergeConfigHeader,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emerge-config-landing',
        path: '',
        element: EmergeConfigLanding,
        title: 'Emerge Configuration',
        icon: SettingsIcon,
      },
      {
        id: 'core-settings',
        path: 'core',
        element: CoreSettingsLanding,
        title: 'Core Settings',
        icon: SettingsApplicationsIcon,
      },
      {
        id: 'accounts',
        path: 'accounts',
        element: AccountsLanding,
        title: 'Accounts',
        icon: AccountBalanceIcon,
      },
      {
        id: 'cards-payments',
        path: 'cards-payments',
        element: CardsPaymentsLanding,
        title: 'Cards & Payments',
        icon: CreditCardIcon,
      },
      {
        id: 'auth-security',
        path: 'auth-security',
        element: AuthSecurityLanding,
        title: 'Authentication & Security',
        icon: SecurityIcon,
      },
      {
        id: 'loans-credit',
        path: 'loans-credit',
        element: LoansCreditLanding,
        title: 'Loans & Credit',
        icon: RequestQuoteIcon,
      },
      {
        id: 'user-services',
        path: 'user-services',
        element: UserServicesLanding,
        title: 'User Services',
        icon: ManageAccountsIcon,
      },
      {
        id: 'document-services',
        path: 'document-services',
        element: DocumentServicesLanding,
        title: 'Document Services',
        icon: FolderSpecialIcon,
      },
      {
        id: 'marketing-offers',
        path: 'marketing-offers',
        element: MarketingOffersLanding,
        title: 'Marketing & Offers',
        icon: CampaignIcon,
      },
      {
        id: 'compliance-support',
        path: 'compliance-support',
        element: ComplianceSupportLanding,
        title: 'Compliance & Support',
        icon: PolicyIcon,
      },
      {
        id: 'misc',
        path: 'misc',
        element: MiscLanding,
        title: 'Miscellaneous',
        icon: WidgetsIcon,
      }
    ]
  }
];

export default emergeConfigRoutes;