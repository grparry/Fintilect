import React from 'react';
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

import EmergeConfigHeader from '../components/emerge-config/EmergeConfigHeader';
import EmergeConfigLanding from '../components/emerge-config/EmergeConfigLanding';
import CoreSettingsLanding from '../components/emerge-config/core/CoreSettingsLanding';
import PscuLogFileTransformServiceSettingsConfig from '../components/emerge-config/core/PscuLogFileTransformServiceSettingsConfig';
import AccountsLanding from '../components/emerge-config/accounts/AccountsLanding';
import CardsPaymentsLanding from '../components/emerge-config/cards-payments/CardsPaymentsLanding';
import AuthSecurityLanding from '../components/emerge-config/auth-security/AuthSecurityLanding';
import PasswordSettingsConfig from '../components/emerge-config/auth-security/PasswordSettingsConfig';
import PasswordVerificationSettingsConfig from '../components/emerge-config/auth-security/PasswordVerificationSettingsConfig';
import LoansCreditLanding from '../components/emerge-config/loans-credit/LoansCreditLanding';
import UserServicesLanding from '../components/emerge-config/user-services/UserServicesLanding';
import DocumentServicesLanding from '../components/emerge-config/document-services/DocumentServicesLanding';
import MarketingOffersLanding from '../components/emerge-config/marketing-offers/MarketingOffersLanding';
import ComplianceSupportLanding from '../components/emerge-config/compliance-support/ComplianceSupportLanding';
import MiscLanding from '../components/emerge-config/misc/MiscLanding';

export const emergeConfigRoutes: RouteConfig[] = [
  {
    id: 'emerge-config',
    path: '',
    element: EmergeConfigHeader,
    sectionId: 'emergeConfig',
    children: [
      {
        id: 'emerge-config-landing',
        path: '',
        element: EmergeConfigLanding,
        title: 'Emerge Configuration',
        icon: SettingsIcon
      },
      {
        id: 'core-settings',
        path: 'core',
        element: CoreSettingsLanding,
        title: 'Core Settings',
        icon: SettingsApplicationsIcon,
        children: [
          {
            id: 'pscu-log-file-transform',
            path: 'pscu-log-file-transform',
            element: PscuLogFileTransformServiceSettingsConfig,
            title: 'PSCU Log File Transform Service Settings'
          }
        ]
      },
      {
        id: 'accounts',
        path: 'accounts',
        element: AccountsLanding,
        title: 'Accounts',
        icon: AccountBalanceIcon
      },
      {
        id: 'cards-payments',
        path: 'cards-payments',
        element: CardsPaymentsLanding,
        title: 'Cards & Payments',
        icon: CreditCardIcon
      },
      {
        id: 'auth-security',
        path: 'auth-security',
        element: AuthSecurityLanding,
        title: 'Authentication & Security',
        icon: SecurityIcon,
        children: [
          {
            id: 'auth-security-landing',
            path: '',
            element: AuthSecurityLanding,
            title: 'Authentication & Security'
          },
          {
            id: 'password-settings',
            path: 'password',
            element: PasswordSettingsConfig,
            title: 'Password Settings'
          },
          {
            id: 'password-verification',
            path: 'password-verification',
            element: PasswordVerificationSettingsConfig,
            title: 'Password Verification Settings'
          }
        ]
      },
      {
        id: 'loans-credit',
        path: 'loans-credit',
        element: LoansCreditLanding,
        title: 'Loans & Credit',
        icon: RequestQuoteIcon
      },
      {
        id: 'user-services',
        path: 'user-services',
        element: UserServicesLanding,
        title: 'User Services',
        icon: ManageAccountsIcon
      },
      {
        id: 'document-services',
        path: 'document-services',
        element: DocumentServicesLanding,
        title: 'Document Services',
        icon: FolderSpecialIcon
      },
      {
        id: 'marketing-offers',
        path: 'marketing-offers',
        element: MarketingOffersLanding,
        title: 'Marketing & Offers',
        icon: CampaignIcon
      },
      {
        id: 'compliance-support',
        path: 'compliance-support',
        element: ComplianceSupportLanding,
        title: 'Compliance & Support',
        icon: PolicyIcon
      },
      {
        id: 'misc',
        path: 'misc',
        element: MiscLanding,
        title: 'Miscellaneous',
        icon: WidgetsIcon
      }
    ]
  }
];

export default emergeConfigRoutes;