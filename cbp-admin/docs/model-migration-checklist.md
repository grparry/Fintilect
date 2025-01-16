# Legacy Model Migration Checklist

## Instructions
We are comparing the contents of this checklist to the contents of `cbp-admin/src/api/models`.
This checklist tracks the migration of legacy configuration models to the new configuration API. The process is as follows:

1. Each model listed here represents a configuration from the legacy system that needs to be migrated
2. The checkbox for each model indicates:
   - [ ] = Not yet implemented in the new API
   - [x] = Successfully implemented in the new API (found in `cbp-admin/src/api/models`)
3. Cross-checking process:
   - Review each model in the checklist
   - Check for matching implementation in `cbp-admin/src/api/models`
   - Utilize fuzzy name matching to identify potential matches
   - Mark checkbox if implementation exists
   - Document any discrepancies or notes
   - Do not change the items in the checklist unless you discover a discrepancy. Do not arbitrarily add or remove items.

## 1. Account & Profile Management [ ]
- [x] Account Settings (`AccountSettings`) # Found in /account/account-settings.json
- [x] Account Attributes Settings (`AccountAttributesSettings`) # Found in /account/account-attributes-settings.json
- [x] Account Masking Settings (`AccountMaskingSettings`) # Found in /account/account-masking-settings.json
- [x] Account Opening Settings (`AccountOpening`) # Found in mobile-configuration.json under accountOpening
- [x] ACH Transfer Settings (`AchTransfer`) # Found in /account/account-settings.json under achTransfer
- [x] Any Member Transfers Settings (`AnyMemberTransfers`) # Found in /account/account-settings.json under anyMemberTransfers
- [x] Cards Settings (`Cards`) # Found in /account/account-settings.json under cards
- [x] Cross Account Settings (`CrossAccountSettings`) # Found in /account/account-settings.json under crossAccount
- [x] Debit Cards Settings (`DebitCards`) # Found in cards/card-settings.json
- [x] Escheat Settings (`Escheat`) # Found in /account/account-settings.json under escheat
- [x] Joint Owners Settings (`JointOwners`) # Found in /account/account-settings.json under jointOwners
- [x] Linked Account Settings (`LinkedAccount`) # Found in /account/linked-account-settings.json
- [x] Place Holds on ACH Transactions Settings (`PlaceHoldsOnAchTransactions`) # Found in /ach/ach-service-settings.json
- [x] Scheduled Transfers Settings (`ScheduledTransfers`) # Found in /account/account-settings.json under scheduledTransfers
- [x] Transfer Limits Settings (`TransferLimits`) # Found in /account/account-settings.json under transferLimits
- [x] Transfer Timeouts Settings (`TransferTimeouts`) # Found in /account/account-settings.json under transferTimeouts
- [x] Transfers Settings (`Transfers`) # Found in /account/account-settings.json under transfers
- [x] USA ePay Settings (`UsaEpay`) # Found in /integrations/integration-settings.json
- [x] ACH Transaction Note Settings (`UseInformationalNoteInsteadOfTransferForAchTransactions`) # Found in /ach/ach-service-settings.json
- [x] Wire Transfer Settings (`WireTransfer`) # Found in /wire-transfer/wire-transfer-settings.json
- [x] Multiple Addresses Settings (`MultipleAddressesSettings`) # Found in /address/multiple-addresses-settings.json
- [x] Change Address Settings (`ChangeAddress`) # Found in /profile/change-address-settings.json
- [x] Change Email Settings (`ChangeEmail`) # Found in /profile/change-email-settings.json
- [x] Change Phone Settings (`ChangePhone`) # Found in /profile/change-phone-settings.json
- [x] Multiple Email Settings (`MultipleEmailSettings`) # Found in /profile/multiple-email-settings.json
- [x] Phone Number Settings (`PhoneNumber`) # Found in /profile/phone-number-settings.json
- [x] Beneficiary Settings (`BeneficiarySettings`) # Found in /beneficiary/beneficiary-settings.json
- [x] User Settings (`UserSettings`) # Found in /admin/admin-settings.json
- [x] User Security Settings (`UserSecurity`) # Found in security-authentication.json
- [x] Multi Account Access Settings (`MultiAccountAccess`) # Found in /account/multiple-account-access-settings.json
- [x] Remove Member Settings (`RemoveMemberFromOnlineBanking`) # Found in /admin/remove-member-settings.json

## 2. User Management [ ]
- [x] User Settings (`UserSettings`) # Found in /admin/admin-settings.json with references to enrollment, member, and security settings
- [x] User Profile Settings (`UserProfile`) # Found in /admin/member-settings.json
- [x] User Preferences Settings (`UserPreferences`) # Found in /admin/member-settings.json under preferences
- [x] User Security Settings (`UserSecurity`) # Found in security-authentication.json
- [x] User Verification Settings (`UserVerification`) # Found in /admin/security-code-verification.json
- [x] User Enrollment Settings (`EnrollmentFeature`) # Found in /admin/enrollment.json
- [x] User Email Settings (`ChangeEmail`) # Found in /profile/change-email-settings.json
- [x] Multiple Email Settings (`MultipleEmailSettings`) # Found in /profile/multiple-email-settings.json
- [x] User Password Settings (`UserPassword`) # Found in security-authentication.json under passwordPolicy
- [x] User PIN Settings (`UserPIN`) # Found in security-authentication.json under pinPolicy
- [x] User Access Settings (`UserAccess`) # Found in security-authentication.json under accessControl
- [x] User Roles Settings (`UserRoles`) # Found in security-authentication.json under accessControl.rbacEnabled
- [x] User Groups Settings (`UserGroups`) # Found in security-authentication.json under accessControl.groups
- [x] User Status Settings (`UserStatus`) # Found in /admin/member-settings.json under status
- [x] User Activity Settings (`UserActivity`) # Found in /admin/audit-logs.json
- [x] Member Profile Settings (`MemberProfile`) # Found in /admin/member-settings.json
- [x] Member Flags Settings (`Flags`) # Found in /admin/member-settings.json under flags

## 3. Authentication & Security [ ]
- [x] Authentication Settings (`AuthenticationSettings`) # Found in security-authentication.json with comprehensive password and MFA policies
- [x] Security Settings (`SecuritySettings`) # Found in /security/security-settings.json with online banking API and monitoring
- [x] Out of Band Settings (`OutOfBand`) # Found in /security/out-of-band-settings.json and referenced in SecuritySettings
- [x] ReCaptcha Settings (`ReCaptcha`) # Found in /security/recaptcha-settings.json
- [x] Virus Scanning Settings (`VirusScanning`) # Found in /security/virus-scanning-settings.json
- [x] Two Factor Authentication Settings (`TwoFactorAuthentication`) # Found in security-authentication.json as multifactorAuthentication
- [x] Password Reset Settings (`PasswordReset`) # Found in security-authentication.json under passwordPolicy
- [x] Password Recovery Settings (`PasswordRecovery`) # Found in security-authentication.json under passwordPolicy
- [x] Password Expiration Settings (`PasswordExpiration`) # Found in security-authentication.json as expirationDays
- [x] Password History Settings (`PasswordHistory`) # Found in security-authentication.json as passwordHistory
- [x] Password Complexity Settings (`PasswordComplexity`) # Found in security-authentication.json under passwordPolicy
- [x] Password Lockout Settings (`PasswordLockout`) # Found in security-authentication.json as lockoutThreshold and lockoutDuration
- [x] Security Questions Settings (`SecurityQuestions`) # Found in /security/security-questions.json, modernized from legacy MFAQuestions
- [x] IP Blocking Settings (`IPBlocking`) # Found in security-authentication.json under accessControl
- [x] Device Authentication Settings (`DeviceAuthentication`) # Found in /admin/admin-settings.json under device settings
- [x] Biometric Authentication Settings (`BiometricAuthentication`) # Found in security-authentication.json under deviceManagement.deviceIdentification.methods
- [x] Session Management Settings (`SessionManagement`) # Found in security-authentication.json under sessionPolicy
- [x] Access Control Settings (`AccessControl`) # Found in security-authentication.json as accessControl with RBAC
- [x] Audit Logging Settings (`AuditLogging`) # Found in /monitoring/audit-settings.json
- [x] Fraud Detection Settings (`FraudDetection`) # Found in security-authentication.json under fraudDetection
- [x] Risk Assessment Settings (`RiskAssessment`) # Found in security-authentication.json under riskAssessment
- [x] Security Alerts Settings (`SecurityAlerts`) # Found in security-authentication.json under alertSettings
- [x] Encryption Settings (`Encryption`) # Found in security-authentication.json under encryptionPolicy

## 4. Financial Services [ ]
- [x] Bill Pay Settings (`BillPaySettings`) # Found in /billpay/billpay-settings.json
- [x] Bill Matrix Settings (`BillMatrix`) # Found in /billpay/bill-matrix-settings.json
- [x] Bill Pay Provider Settings (`BillPayProvider`) # Found in /billpay/providers.json
- [x] Bill Pay Recurring Settings (`BillPayRecurring`) # Found in /billpay/recurring.json
- [x] Bill Pay Good Funds Settings (`BillPayGoodFunds`) # Found in /billpay/good-funds.json
- [x] Financial Core Settings (`FinancialCore`) # Found in /financial-cores/financial-core-settings.json with comprehensive core integrations
- [x] Loan Origination Settings (`LoanOrigination`) # Found in /financial-cores/loan-origination.json
- [x] Money Desktop Settings (`MoneyDesktop`) # Found in /money-desktop/money-desktop-settings.json
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in /financial-features/checking-rewards.json
- [x] Overdraft Protection Settings (`OverdraftProtection`) # Found in /financial-features/overdraft-protection.json
- [x] ATM Settings (`ATMSettings`) # Found in /atm/atm-locator-settings.json
- [x] Card Management Settings (`CardManagement`) # Found in card-management.json and /cards/card-settings.json
- [x] Credit Card Settings (`CreditCard`) # Found in /cards/credit-card-settings.json, consolidated from multiple legacy sources
- [x] Loan Settings (`Loan`) # Found in /loans/loan-settings.json
- [x] Loan Application Settings (`LoanApplication`) # Found in /loans/loan-application-settings.json
- [x] Payment Settings (`Payment`) # Found in /payments/person-payments-settings.json
- [x] Transaction Settings (`Transaction`) # Found in /financial-cores/financial-core-settings.json under transactionSettings
- [x] Transfer Settings (`Transfer`) # Found in /financial-cores/financial-core-settings.json under transferSettings

## 5. Cards & Payments [ ]
- [x] Card Management Settings (`CardManagementSettings`) # Found in card-management.json with comprehensive card type and limit settings
- [x] Card Control Settings (`CardControl`) # Found in /cards/card-settings.json and card-management.json under features
- [x] Card Type Settings (`CardTypeSettings`) # Found in card-management.json under cardTypes
- [x] Card Activation Settings (`CardActivation`) # Found in card-management.json under cardActivation
- [x] Card Limits Settings (`CardLimits`) # Found in card-management.json under limits
- [x] Card Alerts Settings (`CardAlerts`) # Found in card-management.json under alertSettings
- [x] Card Security Settings (`CardSecurity`) # Found in card-management.json under securitySettings
- [x] Card Travel Settings (`CardTravel`) # Found in card-management.json under travelSettings
- [x] Card Status Settings (`CardStatus`) # Found in card-management.json under statusSettings
- [x] Card Replacement Settings (`CardReplacement`) # Found in card-management.json under cardFulfillment
- [x] Card PIN Settings (`CardPIN`) # Found in card-management.json under pinSettings
- [x] Card Design Settings (`CardDesign`) # Found in card-management.json under cardDesign
- [x] Card History Settings (`CardHistory`) # Found in card-management.json under historySettings
- [x] Card Preferences Settings (`CardPreferences`) # Found in card-management.json under preferences
- [x] Card Integration Settings (`CardIntegration`) # Found in card-management.json under integrationSettings
- [x] Go To My Card Settings (`GoToMyCard`) # Found in /cards/go-to-my-card-settings.json
- [x] Omaha SSO Settings (`OmahaSso`) # Found in /cards/omaha-sso-settings.json
- [x] PSCU SSO Settings (`PscuSso`) # Found in /cards/pscu-sso-settings.json
- [x] Summary Credit Cards Settings (`Summary.CreditCards`) # Found in /summary/credit-cards-summary-settings.json
- [x] Person Payment Security Settings (`PersonPaymentSecuritySettings`) # Found in /payments/person-payments-settings.json
- [x] Offline Card Settings (`OfflineCard`) # Found in /cards/offline-card-settings.json
- [x] Good Funds Settings (`GoodFundsSettings`) # Found in /payments/good-funds-settings.json
- [x] Stop Payment Settings (`StopPaymentSettings`) # Found in /payments/stop-payment-settings.json
- [x] Zelle Settings (`ZelleSettings`) # Found in /payments/zelle-settings.json

## 6. Loans & Credit [ ]
- [x] Loan Settings (`LoanSettings`) # Found in /loans/loan-settings.json with comprehensive loan types and terms
- [x] Harland Loan Engine Settings (`HarlandLoanEngine`) # Found in /loans/loan-settings.json under sso.harlandLoanEngine
- [x] CU Direct Loan SSO Settings (`CUDirectLoanSso`) # Found in /loans/loan-settings.json under sso.cuDirect
- [x] Show Apply For Loan Or Card Button Settings (`ShowApplyForLoanOrCardButton`) # Found in /loans/loan-settings.json under sso.showApplyButton
- [x] Loan Offer Settings (`LoanOfferSettings`) # Found in /loans/loan-settings.json under offers and /loans/loan-application-settings.json under loanOffers
- [x] Payday Loan Settings (`PaydayLoan`) # Found in /loans/loan-application-settings.json under paydayLoans
- [x] Credit Card Settings (`CreditCard`) # Found in /cards/credit-card-settings.json, consolidated from multiple legacy sources
- [x] Credit Score Settings (`CreditScore`) # Found in /credit/credit-score-settings.json
- [x] FICO Credit Score Settings (`FicoCreditScore`) # Found in /credit/credit-score-settings.json under fico
- [x] SavvyMoney Settings (`SavvyMoneySettings`) # Found in /credit/credit-score-settings.json under savvyMoney
- [x] Meridian Link SSO Settings (`MeridianLinkSsoSettings`) # Found in /loans/loan-application-settings.json under meridianLink
- [x] QCash Loan Application Settings (`QcashLoanApplication`) # Found in /loans/loan-application-settings.json under qcash

## 7. Documents & Statements [ ]
- [x] Check Images Settings (`CheckImages`) # Found in checks/check-images-settings.json
- [x] Check Image Output Types Settings (`CheckImageOutputTypes`) # Found in checks/check-images-settings.json under settings
- [x] Check Image Validation Settings (`Validation`) # Found in checks/check-images-settings.json under validation
- [x] Check Image Simnet Settings (`SimnetConfiguration`) # Found in checks/check-images-settings.json under simnetConfiguration
- [x] Check Reorder Settings (`CheckReorder`) # Found in checks/check-reorder-settings.json
- [x] Harland Check Reorder Settings (`HarlandCheckReorder`) # Found in checks/check-reorder-settings.json under harland
- [x] Main Street Check Reorder Settings (`MainStreetCheckReorder`) # Found in checks/check-reorder-settings.json under mainStreet
- [x] Estatements Settings (`Estatements`) # Found in statements/estatements-settings.json
- [x] EPL Estatements Settings (`EplEstatements`) # Found in /statements/providers/epl-estatements.json
- [x] Doxim Estatements Settings (`DoximEstatements`) # Found in /statements/providers/doxim-estatements.json
- [x] BIT Estatements Settings (`BitEstatements`) # Found in /statements/providers/bit-estatements.json
- [x] NCP Estatements Settings (`NcpEstatements`) # Found in /statements/providers/ncp-estatements.json
- [x] Web API Estatements Settings (`WebApiEstatementsSettings`) # Found in /statements/providers/web-api-estatements.json
- [x] Synergy Estatements Settings (`SynergyEstatements`) # Found in statements/estatements-settings.json under synergy
- [x] Info Image Estatements Settings (`InfoImageEstatementsSettings`) # Found in statements/estatements-settings.json under infoImage
- [ ] Document Architect SSO Settings (`DocumentArchitectSso`)

## 8. Marketing & Promotions [ ]
- [x] Targeted Marketing Settings (`TargetedMarketingSettings`) # Found in marketing/marketing-settings.json under targetedMarketing
- [x] Cardlytics Settings (`CardlyticsSettings`) # Found in marketing/marketing-settings.json under cardlytics
- [x] Cardlytics Widget Settings (`CardlyticsWidget`) # Found in marketing/cardlytics-widget-settings.json
- [ ] Deep Target Settings (`DeepTargetSettings`)
- [ ] Skip Pay Settings (`SkipPay`)
- [x] Promotions Settings (`Promotions`) # Found in marketing/promotions-settings.json with features and settings
- [ ] Google Tags Settings (`GoogleTags`)
- [x] SegMint Settings (`SegMintSettings`) # Found in marketing/marketing-settings.json under segMint

## 9. Statements & Documents [ ]
- [x] Estatements Settings (`EstatementsSettings`) # Found in /statements/estatements-settings.json
- [x] Doxim Estatements Settings (`DoximEstatements`) # Found in /statements/providers/doxim.json
- [x] BIT Estatements Settings (`BitEstatements`) # Found in /statements/providers/bit.json
- [x] NCP Estatements Settings (`NcpEstatements`) # Found in /statements/providers/ncp.json
- [x] Web API Estatements Settings (`WebApiEstatementsSettings`) # Found in /statements/providers/web-api.json
- [x] Synergy Estatements Settings (`SynergyEstatements`) # Found in /statements/providers/synergy.json
- [x] InfoImage Estatements Settings (`InfoImageEstatements`) # Found in /statements/providers/info-image.json
- [x] Document Settings (`DocumentSettings`) # Found in /mobile/document-center/document-center.json
- [x] Document Center Settings (`DocumentCenterSettings`) # Found in /mobile/document-center/document-center.json
- [x] Document Management Settings (`DocumentManagementSettings`) # Found in /mobile/document-center/document-management.json
- [x] Document Storage Settings (`DocumentStorageSettings`) # Found in /mobile/document-center/document-storage.json
- [x] Secure Document Settings (`SecureDocumentSettings`) # Found in /security/secure-document.json
- [x] Document Sharing Settings (`DocumentSharingSettings`) # Found in /mobile/document-center/document-sharing.json

## 10. UI/UX & Customization [ ]
- [x] Theme Settings (`Themes`) # Found in /models/themes/theme-settings.json
- [x] Theme Connect Native Settings (`ConnectNative`) # Found in /models/native/connect-native-settings.json
- [x] Theme Deployment Settings (`ThemeDeployment`) # Found in /themes/theme-deployment-settings.json
- [x] Menu Items Settings (`MenuItems`) # Found in /models/navigation/menu-settings.json
- [x] Widget Settings (`WidgetSettings`) # Found in /widgets/widget-settings.json
- [x] Custom Pages Settings (`CustomPages`) # Found in /models/pages/custom-pages-settings.json
- [x] Discount Tickets Settings (`DiscountTicketsSettings`) # Found in /models/discounts/discount-tickets-settings.json
- [x] Page Display Settings (`PageDisplaySettings`) # Found in /models/display/page-display-settings.json
- [x] Better Lobby Settings (`BetterLobbySettings`) # Found in /models/lobby/better-lobby-settings.json
- [x] Secure Forms Designer Settings (`SecureFormsDesigner`) # Found in /models/forms/secure-forms-designer-settings.json
- [x] Features Settings (`FeaturesSettings`) # Found in /models/features/feature-settings.json
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in /models/rewards/checking-rewards-settings.json and /models/financial-features/checking-rewards.json
- [x] Real Time Redemption Settings (`RealTimeRedemption`) # Found in /rewards/real-time-redemption-settings.json
- [x] Theme Models Settings (`ThemeModels`) # Found in /themes/theme-models-settings.json
- [x] Widget model (`Widget`) # Found in /widgets/widget-model.json

## 11. Business & Admin [ ]
- [x] Business Rules Settings (`BusinessRules`) # Found in /models/business/business-banking-settings.json
- [ ] Branches Settings (`Branches`)
- [x] Branch Locator Settings (`BranchLocator`) # Found in /location-search.json under searchTypes.branches
- [x] ATM Locator Settings (`ATMLocator`) # Found in /models/atm/atm-locator-settings.json
- [x] Admin Settings (`AdminSettings`) # Found in /models/admin/admin-settings.json
- [x] Remove Member Settings (`RemoveMemberSettings`) # Found in /models/admin/remove-member-settings.json
- [x] Boku Settings (`BokuSettings`) # Found in /models/boku/boku-settings.json
- [ ] Phone Identification Settings (`PhoneIdentificationSettings`)

## 12. Compliance & Monitoring [ ]
- [x] Audit Settings (`Audit`) # Found in /models/monitoring/audit-settings.json
- [x] Audit Log Settings (`AuditLog`) # Found in /models/audit-logging.json
- [x] Compliance Settings (`Compliance`) # Found in /models/compliance/compliance-settings.json
- [x] ADA Settings (`ADA`) # Found in /models/compliance/ada-compliance-settings.json
- [ ] Doc Center Settings (`DocCenterSettings`)
- [x] Regular Expressions Settings (`RegularExpressionsFeature`) # Found in /models/validation/regular-expressions.json
- [x] Restricted Words Settings (`RestrictedWords`) # Found in /models/validation/restricted-words.json
- [ ] Monitoring Settings (`MonitoringSettings`)
- [x] Better Lobby Settings (`BetterLobbySettings`) # Found in /models/lobby/better-lobby-settings.json
- [x] ATM Locator Settings (`AtmLocator`) # Found in /models/atm/atm-locator-settings.json

## 13. Integration & Core [ ]
- [x] Financial Core Settings (`FinancialCore`) # Found in /models/financial-cores/financial-core-settings.json
- [x] Corelation Settings (`Corelation`) # Found in /models/financial-cores/corelation/ with multiple settings files
- [x] Symitar Settings (`Symitar`) # Found in /models/financial-cores/symitar/remote-deposit-check-hold.json
- [ ] DNA Settings (`DNA`)
- [ ] EPL Settings (`Epl`)
- [ ] PSI Core Settings (`PsiCore`)
- [x] Remote Deposit Check Hold Settings (`RemoteDepositCheckHoldSettings`) # Found in /models/deposits/remote-deposit-check-hold-settings.json
- [x] Summit Settings (`Summit`) # Found in /models/financial-cores/summit/regular-ach-transfers.json
- [x] Loan Origination Settings (`LoanOriginationSettings`) # Found in /models/financial-cores/loan-origination.json
- [x] Regular ACH Transfers Settings (`RegularAchTransfers`) # Found in /models/financial-cores/summit/regular-ach-transfers.json
- [x] ACH File Service Settings (`AchFileService`) # Found in /models/ach/ach-file-service-settings.json
- [x] Account Type Settings (`AccountTypeSettings`) # Found in /models/financial-cores/corelation/account-types.json
- [x] Pull Credit Settings (`PullCreditSettings`)
- [x] Person Type Settings (`PersonTypeSettings`) # Found in /models/financial-cores/corelation/person-type-settings.json
- [ ] Draft Lookup Settings (`DraftLookup`)
- [ ] Notes Settings (`Notes`)
- [x] Application Settings (`Application`) # Found in /models/application/application-settings.json
- [x] Funding Settings (`Funding`) # Found in /models/financial-cores/corelation/funding-settings.json
- [x] Card Type Settings (`CardTypeSettings`) # Found in /models/financial-cores/corelation/card-type-settings.json
- [ ] Identification Settings (`Identification`)
- [x] Loss Screening Settings (`LossScreeningSettings`) # Found in /models/financial-cores/corelation/loss-screening-settings.json
- [x] PSI Services Settings (`PsiServicesSettings`) # Found in /models/psi/psi-services-settings.json
- [x] PSCU Log File Transform Settings (`PscuLogFileTransformServiceSettings`) # Found in /models/pscu/pscu-log-file-transform-service-settings.json
- [x] Verafin File Batch Service Settings (`VerafinFileBatchServiceSettings`) # Found in /models/verafin/verafin-file-batch-service-settings.json
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /models/native/connect-native-settings.json
- [x] Boku Settings (`Boku`) # Found in /models/boku/boku-settings.json
- [x] Online Banking API Settings (`OnlineBankingApi`) # Found in /models/financial-cores/online-banking-api-settings.json

## 14. Enrollment & Access [ ]
- [x] Enrollment Settings (`EnrollmentFeature`) # Found in /admin/admin-settings.json under enrollment
- [x] Integrated Enrollment Settings (`IntegratedEnrollmentSettings`) # Found in /admin/admin-settings.json under integratedEnrollment
- [x] Authentication Settings (`Authentication`) # Found in security-authentication.json
- [x] Authentication Rules Settings (`AuthenticationRules`) # Found in security-authentication.json under authenticationRules
- [x] Mini OAO Settings (`MiniOaoSettings`) # Found in /admin/admin-settings.json under miniOao
- [x] Access Control Settings (`AccessControl`) # Found in security-authentication.json as accessControl with RBAC
- [x] Membership Settings (`MembershipFeature`) # Found in /admin/admin-settings.json under membership
- [x] Features Settings (`FeaturesSettings`) # Found in /models/features/feature-settings.json
- [ ] IMI Mobile Text Banking Settings (`ImiMobileTextBankingSettings`)

## 15. History & Records [ ]
- [x] Account History Settings (`AccountHistory`) # Found in /models/history/account-history-settings.json
- [x] Card History Settings (`CardHistory`) # Found in /models/history/card-history-settings.json
- [ ] Connect Native Account History Settings (`ConnectNativeAccountHistory`)
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /models/native/connect-native-settings.json
- [ ] Connect Native Transfers Settings (`ConnectNativeTransfers`)
- [x] History Date Settings (`HistoryDate`) # Found in /models/history/history-date-settings.json
- [x] History Share Settings (`HistoryShare`) # Found in /models/history/history-share-settings.json
- [ ] Display Check Holds Settings (`DisplayCheckHolds`)
- [ ] Linked Account History Settings (`LinkedAccountHistory`)
- [x] Summary Controls Settings (`SummaryControlsSettings`) # Found in /models/history/summary-controls-settings.json
- [x] Credit Score History Settings (`CreditScoreHistory`) # Found in /credit/credit-score-settings.json under creditScoreHistory

## 16. Application Configuration [ ]
- [x] Enrollment Settings (`EnrollmentSettings`) # Found in /admin/admin-settings.json and /financial-cores/providers.json
- [x] Mobile Enrollment Settings (`MobileEnrollmentSettings`) # Found in /mobile/enrollment/enrollment.json
- [x] Online Banking Enrollment Settings (`OnlineBankingEnrollmentSettings`) # Found in /mobile/mobile-configuration.json
- [x] Financial Core Enrollment Settings (`FinancialCoreEnrollmentSettings`) # Found in /financial-cores/providers.json
- [x] Enrollment Verification Settings (`EnrollmentVerificationSettings`) # Found in /financial-cores/providers.json under verificationMethod
- [x] Member Registration Settings (`MemberRegistrationSettings`) # Found in /admin/member-settings.json
- [x] Auto Enrollment Settings (`AutoEnrollmentSettings`) # Found in /financial-cores/providers.json under autoEnroll
- [x] Required Services Settings (`RequiredServicesSettings`) # Found in /financial-cores/providers.json under requiredServices
- [x] Enrollment Integration Settings (`EnrollmentIntegrationSettings`) # Found in /integrations/integration-settings.json under enrollment
- [x] Mobile Registration Settings (`MobileRegistrationSettings`) # Found in /mobile/mobile-settings.json under enrollment

## 17. Mobile Configuration [ ]
- [x] Mobile Configuration Settings (`MobileConfiguration`) # Found in /models/mobile/mobile-configuration.json
- [ ] Advance Pay Settings (`AdvancePay`)
- [x] Alerts Settings (`Alerts`) # Found in /models/alerts/alerts-settings.json
- [x] Card Alerts Settings (`CardAlerts`) # Found in /models/alerts/alerts-settings.json under card alerts
- [x] Check Deposit Settings (`CheckDeposit`) # Found in /models/remote-deposit/remote-deposit.json
- [x] Connect Native Settings (`ConnectNative`) # Found in /models/native/connect-native-settings.json
- [x] Contact Us Settings (`ContactUs`) # Found in mobile/mobile-settings.json as ContactUsSettings
- [x] Digital Wallet Settings (`DigitalWallet`) # Found in mobile-configuration.json and card-management.json
- [x] Direct Deposit Settings (`DirectDeposit`) # Found in /models/direct-deposit/direct-deposit-settings.json
- [x] Document Center Settings (`DocumentCenter`) # Found in mobile-configuration.json
- [x] Enrollment Settings (`Enrollment`) # Found in financial-cores/providers.json and mobile/mobile-settings.json
- [x] Estatements Settings (`Estatements`) # Found in /models/statements/estatements-settings.json
- [x] FICO Credit Score Settings (`FicoCreditScore`) # Found in mobile-configuration.json
- [x] Forgot Username Settings (`ForgotUsername`) # Found in mobile/mobile-settings.json under login/forgot-username.json
- [x] House Holding Settings (`HouseHolding`) # Found in mobile/mobile-settings.json and account-management.json
- [ ] Larky Settings (`Larky`)
- [x] Location Search Settings (`LocationSearch`) # Found in /models/location-search.json
- [x] Login Settings (`Login`) # Found in /models/login/home-banking-login.json
- [x] Marketing Settings (`Marketing`) # Found in /models/marketing/marketing-settings.json
- [x] Mobile Menu Settings (`MobileMenu`) # Found in mobile-configuration.json under mobileMenu
- [x] Mobile Web Views Settings (`MobileWebViews`) # Found in mobile-configuration.json under mobileWebViews
- [x] Money Desktop Settings (`MoneyDesktop`) # Found in /models/money-desktop/money-desktop-settings.json
- [x] My Card Info Settings (`MyCardInfo`) # Found in cards/card-settings.json
- [ ] My CU Club Settings (`MyCuClub`)
- [x] Next Login Steps Settings (`NextLoginSteps`) # Found in mobile/mobile-settings.json under login/next-login-steps.json
- [x] Notifications Settings (`Notifications`) # Found in mobile-configuration.json under notifications
- [x] Password Settings (`Password`) # Found in security-authentication.json under passwordPolicy
- [x] Pay Anyone Settings (`PayAnyone`) # Found in payments/person-payments-settings.json
- [x] Pay Bill Settings (`PayBill`) # Found in billpay/billpay-settings.json
- [x] Personalization Settings (`Personalization`) # Found in mobile-configuration.json and marketing-promotions.json
- [x] Personal Finance Manager Settings (`PersonalFinanceManager`) # Found in mobile-configuration.json under pfm
- [x] Password Encryption Settings (`PasswordEncryption`) # Found in security-authentication.json under encryptionPolicy
- [x] PIN Change Settings (`PinChange`) # Found in security/security-settings.json
- [x] PIN Encryption Settings (`PinEncryption`) # Found in security/security-settings.json
- [x] Push Notification Settings (`PushNotification`) # Found in mobile-configuration.json
- [x] Quick Account Info Settings (`QuickAccountInfo`) # Found in mobile/mobile-settings.json
- [x] Rate And Review Settings (`RateAndReview`) # Found in mobile-configuration.json
- [x] Rates Settings (`Rates`) # Found in financial-features/rates-settings.json
- [x] SavvyMoney Settings (`SavvyMoney`) # Found in mobile/mobile-settings.json under savvy-money/savvy-money.json
- [x] Secure Forms Settings (`SecureForms`) # Found in mobile-configuration.json
- [x] Send Money Settings (`SendMoney`) # Found in payments/person-payments-settings.json
- [x] Stop Pay Settings (`StopPay`) # Found in payments/stop-payment-settings.json
- [x] Version Management Settings (`VersionManagement`) # Found in application/application-settings.json
- [x] Welcome Settings (`Welcome`) # Found in mobile-configuration.json
- [x] Account Opening Settings (`AccountOpening`) # Found in mobile-configuration.json under accountOpening
- [x] Authentication Settings (`Authentication`) # Found in security-authentication.json
- [x] Card Control Settings (`CardControl`) # Found in mobile-configuration.json and card-management.json
- [x] Credit Card Settings (`CreditCardSettings`) # Found in cards/card-settings.json
- [x] Debit Card Settings (`DebitCardSettings`) # Found in cards/card-settings.json
- [x] Lost Or Stolen Card Settings (`LostOrStolenCardSettings`) # Found in cards/card-settings.json
- [x] OnDot SDK Settings (`OnDotSdkSettings`) # Found in mobile/mobile-settings.json
- [x] Ondot DX Settings (`OndotDxSettings`) # Found in mobile/mobile-settings.json under ondotDx

## 18. Mobile Configuration [ ]
- [x] Digital Wallet Settings (`DigitalWallet`) # Found in mobile-configuration.json and card-management.json
- [x] Document Center Settings (`DocumentCenter`) # Found in mobile-configuration.json
- [x] Contact Us Settings (`ContactUs`) # Found in mobile/mobile-settings.json as ContactUsSettings
- [x] Secure Forms Settings (`SecureForms`) # Found in mobile-configuration.json
- [x] Send Money Settings (`SendMoney`) # Found in payments/person-payments-settings.json
- [x] Check Deposit Settings (`CheckDeposit`) # Found in /models/remote-deposit/remote-deposit.json
- [x] Rate And Review Settings (`RateAndReview`) # Found in mobile-configuration.json
- [x] SavvyMoney Settings (`SavvyMoney`) # Found in mobile/mobile-settings.json under savvy-money/savvy-money.json
- [x] Rates Settings (`Rates`) # Found in financial-features/rates-settings.json
- [x] Pin Change Settings (`PinChange`) # Found in security/security-settings.json
- [x] Mobile Estatements Settings (`Estatements`) # Found in /models/statements/estatements-settings.json
- [x] Push Notification Settings (`PushNotification`) # Found in mobile-configuration.json
- [x] Mobile Menu Settings (`MobileMenu`) # Found in mobile-configuration.json under mobileMenu
- [x] Password Encryption Settings (`PasswordEncryption`) # Found in security-authentication.json under encryptionPolicy
- [x] My Card Info Settings (`MyCardInfo`) # Found in cards/card-settings.json
- [x] Next Login Steps Settings (`NextLoginSteps`) # Found in mobile/mobile-settings.json under login/next-login-steps.json
- [x] Forgot Username Settings (`ForgotUsername`) # Found in mobile/mobile-settings.json under login/forgot-username.json
- [x] Account Nicknames Settings (`Nicknames`) # Found in mobile-configuration.json under mobileAccounts.nicknames
- [x] Mobile Login Settings (`Login`) # Found in /models/login/home-banking-login.json
- [x] Welcome Settings (`Welcome`) # Found in mobile-configuration.json
- [x] Quick Account Info Settings (`QuickAccountInfo`) # Found in mobile/mobile-settings.json
- [x] Account History Quick Actions Settings (`AccountHistoryQuickActions`) # Found in mobile-configuration.json under mobileAccounts.accountHistoryQuickActions
- [x] User Devices Settings (`UserDevices`) # Found in mobile/mobile-settings.json
- [x] Join Credit Union Settings (`JoinCreditUnion`) # Found in mobile-configuration.json
- [x] FICO Credit Score Settings (`FicoCreditScore`) # Found in mobile-configuration.json
- [x] Quick Balance Settings (`QuickBalance`) # Found in mobile-configuration.json
- [x] Quick Balance Preferences Settings (`Preferences`) # Found in mobile-configuration.json under quickBalance.preferences
- [x] Promotions Channel Settings (`PromoChannel`) # Found in marketing/marketing-settings.json
- [x] Mobile Web Views Settings (`MobileWebViews`) # Found in mobile-configuration.json
- [x] Account Opening Settings (`AccountOpening`) # Found in mobile-configuration.json under accountOpening
- [x] Mini OAO Settings (`MiniOao`) # Found in mobile-configuration.json under miniOao
- [x] Linked Accounts Settings (`LinkedAccounts`) # Found in mobile-configuration.json under mobileAccounts.linkedAccounts
- [x] Saved Transfers Settings (`SavedTransfers`) # Found in mobile-configuration.json under savedTransfers
- [x] App Messages Settings (`AppMessages`) # Found in mobile-configuration.json under appMessages
- [x] Deals Settings (`Deals`) # Found in marketing/marketing-settings.json
- [x] Accounts Settings (`Accounts`) # Found in mobile-configuration.json under mobileAccounts
- [x] Connect Native Settings (`ConnectNative`) # Found in /models/native/connect-native-settings.json
- [x] Scheduled Transfers Settings (`ScheduledTransfersSettings`) # Found in mobile-configuration.json under scheduledTransfers
- [x] Transfers Settings (`Transfers`) # Found in mobile-configuration.json under transfers
- [x] Marketing Settings (`Marketing`) # Found in /models/marketing/marketing-settings.json
- [x] Cardlytics Settings (`Cardlytics`) # Found in marketing/cardlytics-widget-settings.json
- [x] House Holding Settings (`HouseHolding`) # Found in mobile/mobile-settings.json and account-management.json
- [x] Relevant Solutions Settings (`RelevantSolutions`) # Found in mobile-configuration.json under relevantSolutions
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in financial-features/checking-rewards.json
- [x] Lost Or Stolen Card Settings (`LostOrStolenCardSettings`) # Found in cards/card-settings.json
- [x] Loan Offers Settings (`LoanOffers`) # Found in loans/loan-settings.json
- [x] OnDot SDK Settings (`OnDotSdkSettings`) # Found in mobile/mobile-settings.json
- [x] Activation Settings (`Activation`) # Found in mobile-configuration.json under activation
- [x] Alerts Settings (`Alerts`) # Found in /models/alerts/alerts-settings.json
- [x] Debit Card Settings (`DebitCardSettings`) # Found in cards/card-settings.json

## 19. Integrations & Services [ ]
### Third-Party Integrations
- [x] Integration Settings (`IntegrationSettings`) # Found in /integrations/integration-settings.json
- [x] Cardlytics Settings (`CardlyticsSettings`) # Found in /integrations/integration-settings.json under cardlytics
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /integrations/integration-settings.json under connectNative
- [x] Connect Native Account History Settings (`ConnectNativeAccountHistorySettings`) # Found in /integrations/connect-native/account-history.json
- [x] Connect Native Transfers Settings (`ConnectNativeTransfersSettings`) # Found in /integrations/connect-native/transfers.json
- [x] Meridian Link SSO Settings (`MeridianLinkSsoSettings`) # Found in /integrations/meridian-link/sso-settings.json
- [x] Money Desktop Settings (`MoneyDesktopSettings`) # Found in /integrations/money-desktop-settings.json
- [x] Money Desktop Dashboard Settings (`DashboardSettings`) # Found in /integrations/money-desktop/dashboard.json
- [x] Money Desktop Enrollment Settings (`EnrollmentSettings`) # Found in /integrations/money-desktop/enrollment.json
- [x] Money Desktop Summary Settings (`SummarySettings`) # Found in /integrations/money-desktop/summary.json
- [x] Person Payments Settings (`PersonPaymentsSettings`) # Found in /integrations/integration-settings.json under personPayments
- [x] Payzur Settings (`PayzurSettings`) # Found in /integrations/person-payments/payzur.json
- [x] Zelle Settings (`ZelleSettings`) # Found in /integrations/person-payments/zelle.json

### Service Integrations
- [x] ACH File Service Settings (`AchFileServiceSettings`) # Found in /services/service-settings.json under achFileService
- [x] ATM Locator Settings (`AtmLocatorSettings`) # Found in /services/service-settings.json under atmLocator
- [x] Check Images Settings (`CheckImagesSettings`) # Found in /services/service-settings.json under checkImages
- [x] Discount Tickets Settings (`DiscountTicketsSettings`) # Found in /services/service-settings.json under discountTickets
- [x] OFX Configurations Settings (`OfxConfigurationsSettings`) # Found in /services/service-settings.json under ofxConfigurations
- [x] Payday Loan Settings (`PaydayLoanSettings`) # Found in /services/service-settings.json under paydayLoan
- [x] Public API Settings (`PublicApiSettings`) # Found in /services/service-settings.json under publicApi
- [x] SegMint Settings (`SegMintSettings`) # Found in /services/service-settings.json under segMint
- [x] Targeted Marketing Settings (`TargetedMarketingSettings`) # Found in /services/service-settings.json under targetedMarketing
- [x] Theme Deployment Settings (`ThemeDeploymentSettings`) # Found in /services/service-settings.json under themeDeployment

### System Services
- [x] Windows Service Settings (`WindowsServiceSettings`) # Found in /services/windows-service-settings.json
- [x] PSCU Log File Transform Service Settings (`PscuLogFileTransformServiceSettings`) # Found in /services/pscu/log-file-transform.json
- [x] PSI Services Settings (`PsiServicesSettings`) # Found in /services/psi/psi-services.json
- [x] Verafin File Batch Service Settings (`VerafinFileBatchServiceSettings`) # Found in /services/verafin/file-batch.json

## 20. Transfer & Payment Services [ ]
### Wire Transfer
- [x] Wire Transfer Settings (`WireTransferSettings`) # Found in /wire-transfer/wire-transfer-settings.json
- [x] Wire Transfer Features (`WireTransferFeatures`) # Found in /wire-transfer/settings.json

### ACH Services
- [x] ACH Service Settings (`ACHServiceSettings`) # Found in /ach/ach-service-settings.json
- [x] ACH Settings (`ACHSettings`) # Found in /ach/settings.json
- [x] Regular ACH Transfers (`RegularACHTransfers`) # Found in /financial-cores/summit/regular-ach-transfers.json

### Person-to-Person Payments
- [x] Person Payments Settings (`PersonPaymentsSettings`) # Found in /payments/person-payments-settings.json
- [x] Person Payment Security Settings (`PersonPaymentSecuritySettings`) # Found in /payments/security.json
- [x] Person Payment Features (`PersonPaymentFeatures`) # Found in /payments/features.json
- [x] Zelle Settings (`ZelleSettings`) # Found in /payments/zelle-settings.json
- [x] Zelle Features (`ZelleFeatures`) # Found in /payments/features.json

### Other Payment Services
- [x] Stop Payment Settings (`StopPaymentSettings`) # Found in /payments/stop-payment-settings.json
- [x] Stop Payment Features (`StopPaymentFeatures`) # Found in /payments/features.json
- [x] Good Funds Settings (`GoodFundsSettings`) # Found in /payments/good-funds-settings.json
- [x] Good Funds Features (`GoodFundsFeatures`) # Found in /payments/features.json

<!-- Progress Tracking -->
Total Models: 339
Completed: 54
Remaining: 285
