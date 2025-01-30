# Emerge Configuration Component Mapping

This document outlines the detailed mapping of configuration models to their respective UI components and navigation groups. The structure maintains the current three-level hierarchy while organizing over 400 configuration items in a logical manner.

## 1. Core Settings

Core infrastructure and system-level configurations.

### ConnectNative
- `ConnectNative/ConnectNativeSettings.ts`
- `ConnectNative/ConnectNativeAccountHistory.ts`
- `ConnectNative/ConnectNativeTransfers.ts`

### Financial Cores
- `FinancialCores/FinancialCore.ts` (Base configuration)
- `FinancialCores/Corelation.ts`
- `FinancialCores/CorelationSettings/*` (All Corelation-specific settings)
- `FinancialCores/SymitarSettings/*` (All Symitar-specific settings)
- `FinancialCores/SummitSettings/*` (All Summit-specific settings)
- `FinancialCores/PsiCore.ts`
- `FinancialCores/Summit.ts`
- `FinancialCores/DNA.ts`
- `FinancialCores/Epl.ts`
- `FinancialCores/LoanOriginationSettings.ts`

### Institution Settings
- `Institution/Institution.ts`
- `Institution/MFAQuestions.ts`

### System Services
- `WindowsService/VerafinFileBatchServiceSettings.ts`
- `WindowsService/PscuLogFileTransformServiceSettings.ts`
- `WindowsService/PsiServicesSettings.ts`

### Application Settings
- `AppInfoSettings/AppInfoSettings.ts`
- `Deployment/ThemeDeployment.ts`
- `Features/FeaturesSettings.ts`

## 2. Accounts

Account management and related services.

### Account Management
- `Admin/AdminAccountSettings.ts`
- `Admin/AccountNumberReassignmentSettings.ts`
- `Admin/MemberSettings.ts`

### Account Features
- `OverdraftProtection/OverdraftProtectionSettings.ts`
- `CheckingRewards/RealTimeRedemption.ts`
- `DirectDeposit/DirectDepositConfiguration.ts`
- `PrimaryAccountSecurityCode/PrimaryAccountSecurityCode.ts`

### Address Management
- `Address/AddressVerificationSettings.ts`
- `Address/MultipleAddressesSettings.ts`
- `Address/ChangeAddress.ts`
- `Address/MultipleAddressesPage.ts`

## 3. Cards & Payments

Payment methods and card services.

### Card Management
- `CardManagement/CardManagementSettings.ts`
- `CreditCards/CreditCardSettings.ts`
- `CreditCards/PscuSso.ts`
- `CreditCards/OmahaSso.ts`
- `CreditCards/GoToMyCard.ts`

### Payment Services
- `PersonPayments/ZelleSettings.ts`
- `PersonPayments/Payzur.ts`
- `PersonPaymentSecuritySettings.ts`

### Bill Pay
- `BillPay/BillPaySettings.ts`
- `BillPay/CheckFree.ts`
- `BillPay/CheckFreeAdmin.ts`
- `BillPay/Metavante.ts`
- `BillPay/SymmetryBillPay.ts`
- `BillPay/BillMatrix.ts`
- `BillPay/GoodFunds.ts`
- `BillPay/OutOfBand.ts`
- `BillPay/RecurringBillPay.ts`
- `BillPay/BillPayAdminMemberMenu.ts`

### Check Services
- `CheckReorder/CheckReorder.ts`
- `CheckReorder/HarlandCheckReorder.ts`
- `CheckReorder/MainStreetCheckReorder.ts`

## 4. Authentication & Security

Security and access control.

### Login Settings
- `HomeBankingLogin/HomeBankingLoginConfiguration.ts`
- `HomeBankingLogin/PasswordSettings.ts`
- `HomeBankingLogin/UsernameSettings.ts`
- `HomeBankingLogin/ReCaptchaSettings.ts`

### Security Verification
- `PasswordVerification/PasswordVerificationSettings.ts`
- `Admin/SecurityCodeVerificationSettings.ts`
- `Admin/MfaSettings.ts`
- `Admin/DeviceSettings.ts`

### Admin Security
- `Admin/AdminSettings.ts`
- `Admin/SmsSettings.ts`
- `Admin/AuditLogs.ts`

## 5. Loans & Credit

Loan services and credit products.

### Loan Management
- `Loans/LoanSettings.ts`
- `LoanOffers/LoanOfferSettings.ts`
- `QcashLoanApplication/QcashLoanApplicationSsoSettings.ts`

### Loan SSO Integrations
- `LoanSSO/CUDirectLoanSso.ts`
- `LoanSSO/HarlandLoanEngine.ts`
- `LoanSSO/ShowApplyForLoanOrCardButton.ts`
- `LoanOffersSso/CuNexusLoanOfferSso.ts`
- `MeridianLinkSso/MeridianLinkSsoSettings.ts`

### Credit Services
- `CreditScoreHistory/CreditScoreHistorySettings.ts`
- `FICO/FicoCreditScore.ts`
- `SavvyMoney/SavvyMoneySettings.ts`

## 6. User Services

User-facing features and services.

### Enrollment & Profile
- `Enrollment/EnrollmentFeature.ts`
- `Admin/Enrollment.ts`
- `PhoneNumber/ChangePhone.ts`

### Business Services
- `BusinessBanking/BusinessBanking.ts`
- `MiniOao/MiniOaoSettings.ts`

### Integration Services
- `MoneyDesktop/*` (All MoneyDesktop settings)
- `Alexa/AlexaFeature.ts`
- `Google/GoogleTags.ts`
- `Boku/BokuSettings.ts`

### Menu Configuration
- `Menu/MenuItems.ts`

## 7. Document Services

Document and communication management.

### Document Management
- `SecureFormsDesigner/SecureFormsDesignerSettings.ts`
- `InfoImageEstatements/InfoImageEstatementsSettings.ts`
- `SynergyEstatements/SynergyEstatementsSettings.ts`
- `CheckImages/Validation.ts`

### Secure Communication
- `SecureCommunication/SecureMessageSettings.ts`
- `SecureCommunication/VirusScanningSettings.ts`
- `SMTP/SMTPSettings.ts`

## 8. Marketing & Offers

Marketing and promotional features.

### Promotions
- `Promotions/Promotions.ts`
- `Promotions/DeepTargetSettings.ts`
- `Promotions/SkipPay.ts`

### Custom Content
- `CustomPages/DiscountTicketsSettings.ts`

## 9. Compliance & Support

Compliance, support, and assistance features.

### Compliance
- `ADACompliance/ADAComplianceSettings.ts`
- `ADACompliance/DocCenterSettings.ts`
- `RestrictedWords/RestrictedWordSettings.ts`
- `RegularExpressions/RegularExpressionsFeature.ts`

### Support Services
- `Chat/TalkativeChatSettings.ts`
- `Chat/Comm100.ts`
- `Chat/LiveChatSettings.ts`
- `Chat/GliaSettings.ts`
- `CoBrowse/CoBrowseSettings.ts`

### Error Handling
- `ErrorMessages/ErrorMessageConfiguration.ts`

## 10. Mobile Configurations

Mobile-specific settings and features.

### Mobile Settings
- `MobileConfigurations/Settings/*` (All mobile settings)
- `MobileConfigurations/NextLoginSteps.ts`
- `MobileConfigurations/ForgotUsername.ts`

### Mobile Features
- `MobileConfigurations/Estatements.ts`
- `MobileConfigurations/MyCuClub.ts`
- `MobileConfigurations/MoneyDesktop.ts`
- `MobileConfigurations/AccountOpening/*`

## Notes

1. This organization maintains the current route structure while providing logical groupings for the configuration items
2. Each group has a clear theme and purpose
3. Related vendor integrations are kept together with their primary feature area
4. The structure supports both broad categorization and detailed configuration
5. Mobile configurations could be promoted to a top-level section if mobile-specific settings become more numerous

## Recommendations

1. Consider adding search functionality within each section
2. Implement a "Recently Modified" or "Favorites" feature for quick access
3. Use consistent naming conventions across all configuration items
4. Consider adding tags or metadata to help with filtering and search
5. Maintain clear breadcrumb trails for navigation context
