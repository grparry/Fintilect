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
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import EmergeConfigHeader from '../components/emerge-config/EmergeConfigHeader';
import EmergeConfigLanding from '../components/emerge-config/EmergeConfigLanding';
import CoreSettingsLanding from '../components/emerge-config/core/CoreSettingsLanding';
import PscuLogFileTransformServiceSettingsConfig from '../components/emerge-config/core/PscuLogFileTransformServiceSettingsConfig';
import ConnectNativeLanding from '../components/emerge-config/core/connect-native/ConnectNativeLanding';
import AppInfoLanding from '../components/emerge-config/core/app-info/AppInfoLanding';
import ApplicationSettingsLanding from '../components/emerge-config/core/application-settings/ApplicationSettingsLanding';
import DeploymentLanding from '../components/emerge-config/core/deployment/DeploymentLanding';
import CoreFeaturesLanding from '../components/emerge-config/core/features/CoreFeaturesLanding';
import FinancialCoresLanding from '../components/emerge-config/core/financial-cores/FinancialCoresLanding';
import InstitutionSettingsLanding from '../components/emerge-config/core/institution/InstitutionSettingsLanding';
import SystemServicesLanding from '../components/emerge-config/core/system-services/SystemServicesLanding';
import AccountsLanding from '../components/emerge-config/accounts/AccountsLanding';
import CardsPaymentsLanding from '../components/emerge-config/cards-payments/CardsPaymentsLanding';
import AuthSecurityLanding from '../components/emerge-config/auth-security/AuthSecurityLanding';
import PasswordSettingsConfig from '../components/emerge-config/auth-security/login/PasswordSettingsConfig';
import PasswordVerificationSettingsConfig from '../components/emerge-config/auth-security/security-verification/PasswordVerificationSettingsConfig';
import LoansCreditLanding from '../components/emerge-config/loans-credit/LoansCreditLanding';
import LoansLanding from '../components/emerge-config/loans-credit/loans/LoansLanding';
import LoanOffersLanding from '../components/emerge-config/loans-credit/loan-offers/LoanOffersLanding';
import UserServicesLanding from '../components/emerge-config/user-services/UserServicesLanding';
import AddressLanding from '../components/emerge-config/user-services/address/AddressLanding';
import AlertsLanding from '../components/emerge-config/user-services/alerts/AlertsLanding';
import DocumentServicesLanding from '../components/emerge-config/document-services/DocumentServicesLanding';
import MarketingOffersLanding from '../components/emerge-config/marketing-offers/MarketingOffersLanding';
import ComplianceSupportLanding from '../components/emerge-config/compliance-support/ComplianceSupportLanding';
import MiscLanding from '../components/emerge-config/misc/MiscLanding';
import MobileLanding from '../components/emerge-config/mobile/MobileLanding';
import MobileAppSettingsLanding from '../components/emerge-config/mobile/app-settings/MobileAppSettingsLanding';
import MobileFeaturesLanding from '../components/emerge-config/mobile/features/MobileFeaturesLanding';
import MobileSecurityLanding from '../components/emerge-config/mobile/security/MobileSecurityLanding';
import AccountLanding from '../components/emerge-config/accounts/account/AccountLanding';
import AccountFeaturesLanding from '../components/emerge-config/accounts/account-features/AccountFeaturesLanding';
import AccountManagementLanding from '../components/emerge-config/accounts/account-management/AccountManagementLanding';
import AddressManagementLanding from '../components/emerge-config/accounts/address-management/AddressManagementLanding';
import BusinessBankingLanding from '../components/emerge-config/accounts/business-banking/BusinessBankingLanding';
import CheckingRewardsLanding from '../components/emerge-config/accounts/checking-rewards/CheckingRewardsLanding';
import DirectDepositLanding from '../components/emerge-config/accounts/direct-deposit/DirectDepositLanding';
import HistoryLanding from '../components/emerge-config/accounts/history/HistoryLanding';
import CardAlertsLanding from '../components/emerge-config/cards-payments/card-alerts/CardAlertsLanding';
import CardFeaturesLanding from '../components/emerge-config/cards-payments/card-features/CardFeaturesLanding';
import CardManagementLanding from '../components/emerge-config/cards-payments/card-management/CardManagementLanding';
import PaymentSettingsLanding from '../components/emerge-config/cards-payments/payment-settings/PaymentSettingsLanding';
import AuthenticationLanding from '../components/emerge-config/auth-security/authentication/AuthenticationLanding';
import FraudPreventionLanding from '../components/emerge-config/auth-security/fraud-prevention/FraudPreventionLanding';
import SecuritySettingsLanding from '../components/emerge-config/auth-security/security-settings/SecuritySettingsLanding';
import EStatementsLanding from '../components/emerge-config/document-services/estatements/EStatementsLanding';
import ComplianceSettingsLanding from '../components/emerge-config/compliance-support/compliance/ComplianceSettingsLanding';
import SupportSettingsLanding from '../components/emerge-config/compliance-support/support/SupportSettingsLanding';
import TermsConditionsLanding from '../components/emerge-config/compliance-support/terms/TermsConditionsLanding';
import LoginLanding from '../components/emerge-config/auth-security/login/LoginLanding';
import SecurityVerificationLanding from '../components/emerge-config/auth-security/security-verification/SecurityVerificationLanding';
import AdminLanding from '../components/emerge-config/auth-security/admin/AdminLanding';
import AuditLoggingLanding from '../components/emerge-config/auth-security/audit-logging/AuditLoggingLanding';
import EmailLanding from '../components/emerge-config/user-services/email/EmailLanding';
import BeneficiaryLanding from '../components/emerge-config/user-services/beneficiary/BeneficiaryLanding';
import ChatLanding from '../components/emerge-config/user-services/chat/ChatLanding';
import CheckImagesLanding from '../components/emerge-config/document-services/check-images/CheckImagesLanding';
import CheckReorderLanding from '../components/emerge-config/document-services/check-reorder/CheckReorderLanding';
import InfoImageEStatementsLanding from '../components/emerge-config/document-services/info-image-estatements/InfoImageEStatementsLanding';
import CustomPagesLanding from '../components/emerge-config/document-services/custom-pages/CustomPagesLanding';
import MarketingLanding from '../components/emerge-config/marketing-offers/marketing/MarketingLanding';
import CardlyticsLanding from '../components/emerge-config/marketing-offers/cardlytics/CardlyticsLanding';
import AdaComplianceLanding from '../components/emerge-config/compliance-support/ada-compliance/AdaComplianceLanding';
import ErrorMessagesLanding from '../components/emerge-config/compliance-support/error-messages/ErrorMessagesLanding';
import CoBrowseLanding from '../components/emerge-config/compliance-support/co-browse/CoBrowseLanding';
import GoogleLanding from '../components/emerge-config/misc/google/GoogleLanding';
import BetterLobbyLanding from '../components/emerge-config/misc/better-lobby/BetterLobbyLanding';
import ImiMobileTextBankingLanding from '../components/emerge-config/misc/imi-mobile-text-banking/ImiMobileTextBankingLanding';
import CreditCardsLanding from '../components/emerge-config/cards-payments/credit-cards/CreditCardsLanding';
import BillPayLanding from '../components/emerge-config/cards-payments/bill-pay/BillPayLanding';
import AchServiceLanding from '../components/emerge-config/cards-payments/ach-service/AchServiceLanding';
import LoanSsoLanding from '../components/emerge-config/loans-credit/loan-sso/LoanSsoLanding';
import FicoLanding from '../components/emerge-config/loans-credit/fico/FicoLanding';
import CreditScoreHistoryLanding from '../components/emerge-config/loans-credit/credit-score-history/CreditScoreHistoryLanding';

const emergeConfigRoutes: RouteConfig[] = [
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
            id: 'connect-native',
            path: 'connect-native',
            element: ConnectNativeLanding,
            title: 'Connect Native Settings'
          },
          {
            id: 'app-info',
            path: 'app-info',
            element: AppInfoLanding,
            title: 'App Info'
          },
          {
            id: 'application-settings',
            path: 'application-settings',
            element: ApplicationSettingsLanding,
            title: 'Application Settings'
          },
          {
            id: 'deployment',
            path: 'deployment',
            element: DeploymentLanding,
            title: 'Deployment'
          },
          {
            id: 'core-features',
            path: 'features',
            element: CoreFeaturesLanding,
            title: 'Core Features'
          },
          {
            id: 'financial-cores',
            path: 'financial-cores',
            element: FinancialCoresLanding,
            title: 'Financial Cores'
          },
          {
            id: 'institution',
            path: 'institution',
            element: InstitutionSettingsLanding,
            title: 'Institution Settings'
          },
          {
            id: 'system-services',
            path: 'system-services',
            element: SystemServicesLanding,
            title: 'System Services',
            children: [
              {
                id: 'pscu-log-file-transform',
                path: 'pscu-log-file-transform',
                element: null,
                title: 'PSCU Log File Transform Service'
              }
            ]
          }
        ]
      },
      {
        id: 'accounts',
        path: 'accounts',
        element: AccountsLanding,
        title: 'Accounts',
        icon: AccountBalanceIcon,
        children: [
          {
            id: 'account',
            path: 'account',
            element: AccountLanding,
            title: 'Account'
          },
          {
            id: 'account-features',
            path: 'account-features',
            element: AccountFeaturesLanding,
            title: 'Account Features'
          },
          {
            id: 'account-management',
            path: 'account-management',
            element: AccountManagementLanding,
            title: 'Account Management'
          },
          {
            id: 'address-management',
            path: 'address-management',
            element: AddressManagementLanding,
            title: 'Address Management'
          },
          {
            id: 'business-banking',
            path: 'business-banking',
            element: BusinessBankingLanding,
            title: 'Business Banking'
          },
          {
            id: 'checking-rewards',
            path: 'checking-rewards',
            element: CheckingRewardsLanding,
            title: 'Checking Rewards'
          },
          {
            id: 'direct-deposit',
            path: 'direct-deposit',
            element: DirectDepositLanding,
            title: 'Direct Deposit'
          },
          {
            id: 'history',
            path: 'history',
            element: HistoryLanding,
            title: 'History'
          }
        ]
      },
      {
        id: 'cards-payments',
        path: 'cards-payments',
        element: CardsPaymentsLanding,
        title: 'Cards & Payments',
        icon: CreditCardIcon,
        children: [
          {
            id: 'card-alerts',
            path: 'card-alerts',
            element: CardAlertsLanding,
            title: 'Card Alerts'
          },
          {
            id: 'card-features',
            path: 'card-features',
            element: CardFeaturesLanding,
            title: 'Card Features'
          },
          {
            id: 'card-management',
            path: 'card-management',
            element: CardManagementLanding,
            title: 'Card Management'
          },
          {
            id: 'credit-cards',
            path: 'credit-cards',
            element: CreditCardsLanding,
            title: 'Credit Cards',
            children: [
              {
                id: 'credit-cards-settings',
                path: 'settings',
                element: CreditCardsLanding,
                title: 'Credit Card Settings'
              },
              {
                id: 'pscu-sso',
                path: 'pscu-sso',
                element: CreditCardsLanding,
                title: 'PSCU SSO'
              },
              {
                id: 'omaha-sso',
                path: 'omaha-sso',
                element: CreditCardsLanding,
                title: 'Omaha SSO'
              },
              {
                id: 'goto-my-card',
                path: 'goto-my-card',
                element: CreditCardsLanding,
                title: 'GoToMyCard'
              }
            ]
          },
          {
            id: 'bill-pay',
            path: 'bill-pay',
            element: BillPayLanding,
            title: 'Bill Pay',
            children: [
              {
                id: 'bill-pay-settings',
                path: 'settings',
                element: BillPayLanding,
                title: 'Bill Pay Settings'
              },
              {
                id: 'checkfree',
                path: 'checkfree',
                element: BillPayLanding,
                title: 'CheckFree'
              },
              {
                id: 'checkfree-admin',
                path: 'checkfree-admin',
                element: BillPayLanding,
                title: 'CheckFree Admin'
              },
              {
                id: 'metavante',
                path: 'metavante',
                element: BillPayLanding,
                title: 'Metavante'
              },
              {
                id: 'symmetry',
                path: 'symmetry',
                element: BillPayLanding,
                title: 'Symmetry Bill Pay'
              },
              {
                id: 'bill-matrix',
                path: 'bill-matrix',
                element: BillPayLanding,
                title: 'Bill Matrix'
              },
              {
                id: 'good-funds',
                path: 'good-funds',
                element: BillPayLanding,
                title: 'Good Funds'
              },
              {
                id: 'out-of-band',
                path: 'out-of-band',
                element: BillPayLanding,
                title: 'Out of Band'
              },
              {
                id: 'recurring',
                path: 'recurring',
                element: BillPayLanding,
                title: 'Recurring Bill Pay'
              },
              {
                id: 'admin-member-menu',
                path: 'admin-member-menu',
                element: BillPayLanding,
                title: 'Bill Pay Admin Member Menu'
              }
            ]
          },
          {
            id: 'ach-service',
            path: 'ach-service',
            element: AchServiceLanding,
            title: 'ACH Service',
            children: [
              {
                id: 'ach-settings',
                path: 'settings',
                element: AchServiceLanding,
                title: 'ACH Settings'
              },
              {
                id: 'external-transfers',
                path: 'external-transfers',
                element: AchServiceLanding,
                title: 'External Transfers'
              },
              {
                id: 'internal-transfers',
                path: 'internal-transfers',
                element: AchServiceLanding,
                title: 'Internal Transfers'
              },
              {
                id: 'recurring-transfers',
                path: 'recurring-transfers',
                element: AchServiceLanding,
                title: 'Recurring Transfers'
              },
              {
                id: 'limits',
                path: 'limits',
                element: AchServiceLanding,
                title: 'Transfer Limits'
              },
              {
                id: 'processing',
                path: 'processing',
                element: AchServiceLanding,
                title: 'ACH Processing'
              }
            ]
          },
          {
            id: 'payment-settings',
            path: 'payment-settings',
            element: PaymentSettingsLanding,
            title: 'Payment Settings'
          }
        ]
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
          },
          {
            id: 'authentication',
            path: 'authentication',
            element: AuthenticationLanding,
            title: 'Authentication'
          },
          {
            id: 'fraud-prevention',
            path: 'fraud-prevention',
            element: FraudPreventionLanding,
            title: 'Fraud Prevention'
          },
          {
            id: 'security-settings',
            path: 'security-settings',
            element: SecuritySettingsLanding,
            title: 'Security Settings'
          },
          {
            id: 'security-verification',
            path: 'security-verification',
            element: SecurityVerificationLanding,
            title: 'Security Verification',
            children: [
              {
                id: 'password-verification',
                path: 'password-verification',
                element: null,
                title: 'Password Verification'
              },
              {
                id: 'security-code',
                path: 'security-code',
                element: null,
                title: 'Security Code Verification'
              },
              {
                id: 'mfa',
                path: 'mfa',
                element: null,
                title: 'MFA Settings'
              },
              {
                id: 'device',
                path: 'device',
                element: null,
                title: 'Device Settings'
              }
            ]
          },
          {
            id: 'admin',
            path: 'admin',
            element: AdminLanding,
            title: 'Admin',
            children: [
              {
                id: 'admin-settings',
                path: 'settings',
                element: AdminLanding,
                title: 'Admin Settings'
              },
              {
                id: 'admin-sms',
                path: 'sms',
                element: AdminLanding,
                title: 'SMS Settings'
              },
              {
                id: 'admin-audit',
                path: 'audit-logs',
                element: AdminLanding,
                title: 'Audit Logs'
              }
            ]
          },
          {
            id: 'login',
            path: 'login',
            element: LoginLanding,
            title: 'Login Settings',
            children: [
              {
                id: 'password',
                path: 'password',
                element: null,
                title: 'Password Settings'
              },
              {
                id: 'username',
                path: 'username',
                element: null,
                title: 'Username Settings'
              },
              {
                id: 'recaptcha',
                path: 'recaptcha',
                element: null,
                title: 'ReCAPTCHA Settings'
              },
              {
                id: 'home-banking-login',
                path: 'home-banking-login',
                element: null,
                title: 'Home Banking Login Settings'
              }
            ]
          },
          {
            id: 'audit-logging',
            path: 'audit-logging',
            element: AuditLoggingLanding,
            title: 'Audit Logging',
            children: [
              {
                id: 'audit-logs',
                path: 'logs',
                element: AuditLoggingLanding,
                title: 'Audit Logs'
              },
              {
                id: 'audit-settings',
                path: 'settings',
                element: AuditLoggingLanding,
                title: 'Settings'
              }
            ]
          }
        ]
      },
      {
        id: 'loans-credit',
        path: 'loans-credit',
        element: LoansCreditLanding,
        title: 'Loans & Credit',
        icon: RequestQuoteIcon,
        children: [
          {
            id: 'loans',
            path: 'loans',
            element: LoansLanding,
            title: 'Loans',
            children: [
              {
                id: 'loan-settings',
                path: 'settings',
                element: LoansLanding,
                title: 'Loan Settings'
              },
              {
                id: 'qcash-loan',
                path: 'qcash',
                element: LoansLanding,
                title: 'Qcash Loan Application'
              }
            ]
          },
          {
            id: 'loan-offers',
            path: 'loan-offers',
            element: LoanOffersLanding,
            title: 'Loan Offers',
            children: [
              {
                id: 'loan-offers-settings',
                path: 'settings',
                element: LoanOffersLanding,
                title: 'Loan Offer Settings'
              },
              {
                id: 'loan-offers-cunexus',
                path: 'cunexus',
                element: LoanOffersLanding,
                title: 'CuNexus Loan Offer SSO'
              }
            ]
          },
          {
            id: 'loan-sso',
            path: 'loan-sso',
            element: LoanSsoLanding,
            title: 'Loan SSO',
            children: [
              {
                id: 'loan-sso-settings',
                path: 'settings',
                element: LoanSsoLanding,
                title: 'Loan SSO Settings'
              },
              {
                id: 'cu-direct',
                path: 'cu-direct',
                element: LoanSsoLanding,
                title: 'CU Direct Loan SSO'
              },
              {
                id: 'harland-engine',
                path: 'harland-engine',
                element: LoanSsoLanding,
                title: 'Harland Loan Engine'
              },
              {
                id: 'show-apply-button',
                path: 'show-apply-button',
                element: LoanSsoLanding,
                title: 'Apply for Loan Button'
              },
              {
                id: 'cu-nexus',
                path: 'cu-nexus',
                element: LoanSsoLanding,
                title: 'CU Nexus Loan Offers'
              },
              {
                id: 'meridian-link',
                path: 'meridian-link',
                element: LoanSsoLanding,
                title: 'MeridianLink SSO'
              }
            ]
          },
          {
            id: 'fico',
            path: 'fico',
            element: FicoLanding,
            title: 'FICO',
            children: [
              {
                id: 'fico-settings',
                path: 'settings',
                element: FicoLanding,
                title: 'FICO Settings'
              },
              {
                id: 'credit-score',
                path: 'credit-score',
                element: FicoLanding,
                title: 'FICO Credit Score'
              },
              {
                id: 'savvy-money',
                path: 'savvy-money',
                element: FicoLanding,
                title: 'Savvy Money'
              }
            ]
          },
          {
            id: 'credit-score-history',
            path: 'credit-score-history',
            element: CreditScoreHistoryLanding,
            title: 'Credit Score History',
            children: [
              {
                id: 'credit-score-history-settings',
                path: 'settings',
                element: CreditScoreHistoryLanding,
                title: 'General Settings'
              },
              {
                id: 'history-settings',
                path: 'history-settings',
                element: CreditScoreHistoryLanding,
                title: 'History Settings'
              },
              {
                id: 'tracking',
                path: 'tracking',
                element: CreditScoreHistoryLanding,
                title: 'Score Tracking'
              },
              {
                id: 'reporting',
                path: 'reporting',
                element: CreditScoreHistoryLanding,
                title: 'Score Reporting'
              }
            ]
          }
        ]
      },
      {
        id: 'user-services',
        path: 'user-services',
        element: UserServicesLanding,
        title: 'User Services',
        icon: ManageAccountsIcon,
        children: [
          {
            id: 'address',
            path: 'address',
            element: AddressLanding,
            title: 'Address',
            children: [
              {
                id: 'address-verification',
                path: 'verification',
                element: AddressLanding,
                title: 'Address Verification'
              },
              {
                id: 'address-multiple',
                path: 'multiple',
                element: AddressLanding,
                title: 'Multiple Addresses'
              },
              {
                id: 'address-change',
                path: 'change',
                element: AddressLanding,
                title: 'Change Address'
              }
            ]
          },
          {
            id: 'alerts',
            path: 'alerts',
            element: AlertsLanding,
            title: 'Alerts',
            children: [
              {
                id: 'alerts-settings',
                path: 'settings',
                element: AlertsLanding,
                title: 'Alert Settings'
              },
              {
                id: 'alerts-types',
                path: 'types',
                element: AlertsLanding,
                title: 'Alert Types'
              },
              {
                id: 'alerts-preferences',
                path: 'preferences',
                element: AlertsLanding,
                title: 'Notification Preferences'
              }
            ]
          },
          {
            id: 'email',
            path: 'email',
            element: EmailLanding,
            title: 'Email',
            children: [
              {
                id: 'email-settings',
                path: 'settings',
                element: EmailLanding,
                title: 'Email Settings'
              },
              {
                id: 'email-smtp',
                path: 'smtp',
                element: EmailLanding,
                title: 'SMTP Configuration'
              },
              {
                id: 'email-templates',
                path: 'templates',
                element: EmailLanding,
                title: 'Email Templates'
              }
            ]
          },
          {
            id: 'beneficiary',
            path: 'beneficiary',
            element: BeneficiaryLanding,
            title: 'Beneficiary',
            children: [
              {
                id: 'beneficiary-settings',
                path: 'settings',
                element: BeneficiaryLanding,
                title: 'Beneficiary Settings'
              },
              {
                id: 'beneficiary-types',
                path: 'types',
                element: BeneficiaryLanding,
                title: 'Beneficiary Types'
              },
              {
                id: 'beneficiary-verification',
                path: 'verification',
                element: BeneficiaryLanding,
                title: 'Verification Rules'
              }
            ]
          },
          {
            id: 'chat',
            path: 'chat',
            element: ChatLanding,
            title: 'Chat',
            children: [
              {
                id: 'chat-talkative',
                path: 'talkative',
                element: ChatLanding,
                title: 'Talkative Chat'
              },
              {
                id: 'chat-comm100',
                path: 'comm100',
                element: ChatLanding,
                title: 'Comm100'
              },
              {
                id: 'chat-live-chat',
                path: 'live-chat',
                element: ChatLanding,
                title: 'Live Chat'
              },
              {
                id: 'chat-glia',
                path: 'glia',
                element: ChatLanding,
                title: 'Glia'
              },
              {
                id: 'chat-cobrowse',
                path: 'cobrowse',
                element: ChatLanding,
                title: 'CoBrowse'
              }
            ]
          }
        ]
      },
      {
        id: 'document-services',
        path: 'document-services',
        element: DocumentServicesLanding,
        title: 'Document Services',
        icon: FolderSpecialIcon,
        children: [
          {
            id: 'estatements',
            path: 'estatements',
            element: EStatementsLanding,
            title: 'eStatements'
          },
          {
            id: 'check-images',
            path: 'check-images',
            element: CheckImagesLanding,
            title: 'Check Images',
            children: [
              {
                id: 'check-images-validation',
                path: 'validation',
                element: CheckImagesLanding,
                title: 'Validation Settings'
              },
              {
                id: 'check-images-settings',
                path: 'settings',
                element: CheckImagesLanding,
                title: 'Image Settings'
              },
              {
                id: 'check-images-storage',
                path: 'storage',
                element: CheckImagesLanding,
                title: 'Storage Settings'
              }
            ]
          },
          {
            id: 'check-reorder',
            path: 'check-reorder',
            element: CheckReorderLanding,
            title: 'Check Reorder',
            children: [
              {
                id: 'check-reorder-settings',
                path: 'settings',
                element: CheckReorderLanding,
                title: 'General Settings'
              },
              {
                id: 'check-reorder-harland',
                path: 'harland',
                element: CheckReorderLanding,
                title: 'Harland Check Reorder'
              },
              {
                id: 'check-reorder-main-street',
                path: 'main-street',
                element: CheckReorderLanding,
                title: 'Main Street Check Reorder'
              }
            ]
          },
          {
            id: 'info-image-estatements',
            path: 'info-image-estatements',
            element: InfoImageEStatementsLanding,
            title: 'Info Image eStatements',
            children: [
              {
                id: 'info-image-estatements-settings',
                path: 'settings',
                element: InfoImageEStatementsLanding,
                title: 'General Settings'
              },
              {
                id: 'info-image-estatements-documents',
                path: 'documents',
                element: InfoImageEStatementsLanding,
                title: 'Document Settings'
              },
              {
                id: 'info-image-estatements-integration',
                path: 'integration',
                element: InfoImageEStatementsLanding,
                title: 'Integration Settings'
              }
            ]
          },
          {
            id: 'custom-pages',
            path: 'custom-pages',
            element: CustomPagesLanding,
            title: 'Custom Pages',
            children: [
              {
                id: 'custom-pages-settings',
                path: 'settings',
                element: CustomPagesLanding,
                title: 'General Settings'
              },
              {
                id: 'custom-pages-management',
                path: 'management',
                element: CustomPagesLanding,
                title: 'Page Management'
              },
              {
                id: 'custom-pages-discount-tickets',
                path: 'discount-tickets',
                element: CustomPagesLanding,
                title: 'Discount Tickets'
              }
            ]
          }
        ]
      },
      {
        id: 'marketing-offers',
        path: 'marketing-offers',
        element: MarketingOffersLanding,
        title: 'Marketing & Offers',
        icon: LocalOfferIcon,
        children: [
          {
            id: 'marketing',
            path: 'marketing',
            element: MarketingLanding,
            title: 'Marketing',
            children: [
              {
                id: 'marketing-settings',
                path: 'settings',
                element: MarketingLanding,
                title: 'General Settings'
              },
              {
                id: 'marketing-deep-target',
                path: 'deep-target',
                element: MarketingLanding,
                title: 'Deep Target'
              },
              {
                id: 'marketing-skip-pay',
                path: 'skip-pay',
                element: MarketingLanding,
                title: 'Skip Pay'
              },
              {
                id: 'marketing-promotions',
                path: 'promotions',
                element: MarketingLanding,
                title: 'Promotions'
              }
            ]
          },
          {
            id: 'cardlytics',
            path: 'cardlytics',
            element: CardlyticsLanding,
            title: 'Cardlytics',
            children: [
              {
                id: 'cardlytics-settings',
                path: 'settings',
                element: CardlyticsLanding,
                title: 'General Settings'
              },
              {
                id: 'cardlytics-integration',
                path: 'integration',
                element: CardlyticsLanding,
                title: 'Integration Settings'
              },
              {
                id: 'cardlytics-offers',
                path: 'offers',
                element: CardlyticsLanding,
                title: 'Offer Management'
              }
            ]
          }
        ]
      },
      {
        id: 'compliance-support',
        path: 'compliance-support',
        element: ComplianceSupportLanding,
        title: 'Compliance & Support',
        icon: PolicyIcon,
        children: [
          {
            id: 'compliance',
            path: 'compliance',
            element: ComplianceSettingsLanding,
            title: 'Compliance Settings'
          },
          {
            id: 'support',
            path: 'support',
            element: SupportSettingsLanding,
            title: 'Support Settings'
          },
          {
            id: 'terms',
            path: 'terms',
            element: TermsConditionsLanding,
            title: 'Terms & Conditions'
          },
          {
            id: 'ada-compliance',
            path: 'ada-compliance',
            element: AdaComplianceLanding,
            title: 'ADA Compliance',
            children: [
              {
                id: 'ada-compliance-settings',
                path: 'settings',
                element: AdaComplianceLanding,
                title: 'ADA Settings'
              },
              {
                id: 'ada-compliance-doc-center',
                path: 'doc-center',
                element: AdaComplianceLanding,
                title: 'Doc Center Settings'
              },
              {
                id: 'ada-compliance-reports',
                path: 'reports',
                element: AdaComplianceLanding,
                title: 'Compliance Reports'
              }
            ]
          },
          {
            id: 'error-messages',
            path: 'error-messages',
            element: ErrorMessagesLanding,
            title: 'Error Messages',
            children: [
              {
                id: 'error-messages-settings',
                path: 'settings',
                element: ErrorMessagesLanding,
                title: 'General Settings'
              },
              {
                id: 'error-messages-templates',
                path: 'templates',
                element: ErrorMessagesLanding,
                title: 'Message Templates'
              },
              {
                id: 'error-messages-custom',
                path: 'custom',
                element: ErrorMessagesLanding,
                title: 'Custom Messages'
              },
              {
                id: 'error-messages-codes',
                path: 'codes',
                element: ErrorMessagesLanding,
                title: 'Error Codes'
              }
            ]
          },
          {
            id: 'co-browse',
            path: 'co-browse',
            element: CoBrowseLanding,
            title: 'Co-Browse',
            children: [
              {
                id: 'co-browse-settings',
                path: 'settings',
                element: CoBrowseLanding,
                title: 'General Settings'
              },
              {
                id: 'co-browse-security',
                path: 'security',
                element: CoBrowseLanding,
                title: 'Security Settings'
              },
              {
                id: 'co-browse-integration',
                path: 'integration',
                element: CoBrowseLanding,
                title: 'Integration Settings'
              },
              {
                id: 'co-browse-agent',
                path: 'agent',
                element: CoBrowseLanding,
                title: 'Agent Settings'
              }
            ]
          }
        ]
      },
      {
        id: 'misc',
        path: 'misc',
        element: MiscLanding,
        title: 'Miscellaneous',
        icon: WidgetsIcon,
        children: [
          {
            id: 'google',
            path: 'google',
            element: GoogleLanding,
            title: 'Google',
            children: [
              {
                id: 'google-settings',
                path: 'settings',
                element: GoogleLanding,
                title: 'General Settings'
              },
              {
                id: 'google-tags',
                path: 'tags',
                element: GoogleLanding,
                title: 'Google Tags'
              },
              {
                id: 'google-analytics',
                path: 'analytics',
                element: GoogleLanding,
                title: 'Analytics'
              },
              {
                id: 'google-api',
                path: 'api',
                element: GoogleLanding,
                title: 'API Settings'
              }
            ]
          },
          {
            id: 'better-lobby',
            path: 'better-lobby',
            element: BetterLobbyLanding,
            title: 'Better Lobby',
            children: [
              {
                id: 'better-lobby-settings',
                path: 'settings',
                element: BetterLobbyLanding,
                title: 'General Settings'
              },
              {
                id: 'better-lobby-integration',
                path: 'integration',
                element: BetterLobbyLanding,
                title: 'Integration Settings'
              },
              {
                id: 'better-lobby-customization',
                path: 'customization',
                element: BetterLobbyLanding,
                title: 'Customization'
              },
              {
                id: 'better-lobby-queue',
                path: 'queue',
                element: BetterLobbyLanding,
                title: 'Queue Management'
              }
            ]
          },
          {
            id: 'imi-mobile-text-banking',
            path: 'imi-mobile-text-banking',
            element: ImiMobileTextBankingLanding,
            title: 'IMI Mobile Text Banking',
            children: [
              {
                id: 'imi-mobile-text-banking-settings',
                path: 'settings',
                element: ImiMobileTextBankingLanding,
                title: 'General Settings'
              },
              {
                id: 'imi-mobile-text-banking-integration',
                path: 'integration',
                element: ImiMobileTextBankingLanding,
                title: 'Integration Settings'
              },
              {
                id: 'imi-mobile-text-banking-templates',
                path: 'templates',
                element: ImiMobileTextBankingLanding,
                title: 'Message Templates'
              },
              {
                id: 'imi-mobile-text-banking-security',
                path: 'security',
                element: ImiMobileTextBankingLanding,
                title: 'Security Settings'
              }
            ]
          }
        ]
      },
      {
        id: 'mobile',
        path: 'mobile',
        element: MobileLanding,
        title: 'Mobile',
        icon: SmartphoneIcon,
        children: [
          {
            id: 'mobile-app-settings',
            path: 'app-settings',
            element: MobileAppSettingsLanding,
            title: 'Mobile App Settings'
          },
          {
            id: 'mobile-features',
            path: 'features',
            element: MobileFeaturesLanding,
            title: 'Mobile Features'
          },
          {
            id: 'mobile-security',
            path: 'security',
            element: MobileSecurityLanding,
            title: 'Mobile Security'
          }
        ]
      }
    ]
  }
];

export default emergeConfigRoutes;