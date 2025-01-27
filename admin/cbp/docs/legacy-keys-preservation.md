# Legacy Database Keys Preservation Checklist

## Instructions
We are adding `x-setting-key` and `x-legacy-model` properties to all models in `cbp-admin/src/api/models` to preserve information from `Psi.Models.ClientConfigurationModels`.

For each model we need to track:
1. All legacy database keys via `x-setting-key` properties (there may be multiple per model)
2. The original C# model class via the `x-legacy-model` property
3. The file location of both the new JSON Schema and original legacy model

### Handling Duplicate Setting Keys
When the same setting key appears in multiple legacy models:
1. Document all occurrences in a "Duplicate Settings" section below
2. Choose the most appropriate model based on:
   - Primary ownership (where the setting most logically belongs)
   - Current usage patterns in the legacy codebase
3. Add a comment in the JSON Schema noting other models that previously used this key
4. Use `x-legacy-models` (plural) instead of `x-legacy-model` to list all models that used this key

The process is as follows:
1. Each model listed here needs its legacy information preserved
2. The checkbox for each model indicates:
   - [ ] = Legacy information not yet added
   - [x] = Legacy information added and verified
3. Process:
   - Find the legacy model in `legacy/legacy-apis/Psi.Models.ClientConfigurationModels`
   - Extract all `[SettingKey("...")]` values from the model and its properties
   - Add corresponding `x-setting-key` properties to the new JSON Schema at appropriate levels
   - Do NOT make up settings based on best practices models that may exist in the AI.
   - If a legacy model isn't found, put an asterisk [*] in the checklist instead of an [x]
   - Document any duplicate keys in the "Duplicate Settings" section
   - Document the original C# model class(es) in `x-legacy-model` or `x-legacy-models`
   - Mark checkbox when complete
   - Document any discrepancies or notes

This information will help maintain traceability between old and new models throughout the migration process and beyond.

## Duplicate Settings
| Setting Key | Models | Primary Model | Notes |
|------------|--------|---------------|--------|

## 1. Account & Profile Management [ ]
- [x] Account Settings (`AccountSettings`) # Found in /account/account-settings.json
- [x] Account Attributes Settings (`AccountAttributesSettings`) # Found in /account/account-attributes-settings.json
- [x] Account Masking Settings (`AccountMaskingSettings`) # Found in /account/account-masking-settings.json
- [x] Account Opening Settings (`AccountOpening`) # Found in mobile-configuration.json under accountOpening
- [x] ACH Transfer Settings (`AchTransfer`) # Found in /account/ach-transfer.json
- [x] Any Member Transfers Settings (`AnyMemberTransfers`) # Found in /account/any-member-transfers.json
- [x] Cards Settings (`Cards`) # Found in /account/cards.json
- [x] Cross Account Settings (`CrossAccountSettings`) # Found in /account/cross-account-settings.json
- [x] Debit Cards Settings (`DebitCards`) # Found in /account/debit-cards.json
- [x] Escheat Settings (`Escheat`) # Found in /account/escheat.json
- [x] Joint Owners Settings (`JointOwners`) # Found in /account/joint-owners.json
- [x] Linked Account Settings (`LinkedAccount`) # Found in /account/linked-account.json
- [x] Place Holds on ACH Transactions Settings (`PlaceHoldsOnAchTransactions`) # Found in /ach/place-holds-on-ach-transactions.json
- [x] Scheduled Transfers Settings (`ScheduledTransfers`) # Found in /account/scheduled-transfers.json
- [x] Transfer Limits Settings (`TransferLimits`) # Found in /account/transfer-limits.json
- [x] Transfer Timeouts Settings (`TransferTimeouts`) # Found in /account/transfer-timeouts.json
- [x] Transfers Settings (`Transfers`) # Found in /account/transfers.json
- [x] USA ePay Settings (`UsaEpay`) # Found in /integrations/usa-epay.json
- [x] ACH Transaction Note Settings (`UseInformationalNoteInsteadOfTransferForAchTransactions`) # Found in /ach/ach-transaction-notes.json
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
- [*] Risk Assessment Settings (`RiskAssessment`) # Found in security-authentication.json under riskAssessment
- [*] Security Alerts Settings (`SecurityAlerts`) # Found in security-authentication.json under alertSettings
- [*] Encryption Settings (`Encryption`) # Found in security-authentication.json under encryptionPolicy
- [*] Fraud Detection Settings (`FraudDetection`) # Found in security-authentication.json under fraudDetection

## 4. Financial Services [ ]
- [x] Bill Pay Settings (`BillPaySettings`) # Found in /billpay/billpay-settings.json
- [x] Bill Matrix Settings (`BillMatrix`) # Found in /billpay/bill-matrix-settings.json
- [x] Bill Pay Provider Settings (`BillPayProvider`) # Found in /billpay/providers.json
- [x] Bill Pay Recurring Settings (`BillPayRecurring`) # Found in /billpay/recurring.json
- [x] Bill Pay Good Funds Settings (`BillPayGoodFunds`) # Found in /billpay/good-funds.json
- [x] Financial Core Settings (`FinancialCore`) # Found in /financial-cores/financial-core-settings.json
- [x] Loan Origination Settings (`LoanOrigination`) # Found in /financial-cores/loan-origination/loan-origination-settings.json
- [x] Money Desktop Settings (`MoneyDesktop`) # Found in /money-desktop/money-desktop-settings.json
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in /financial-features/checking-rewards.json
- [x] Overdraft Protection Settings (`OverdraftProtection`) # Found in /financial-features/overdraft-protection.json
- [x] ATM Settings (`ATMSettings`) # Found in /atm/atm-locator-settings.json
- [x] Card Management Settings (`CardManagement`) # Found in card-management.json
- [x] Credit Card Settings (`CreditCard`) # Found in /cards/credit-card-settings.json
- [x] Loan Settings (`Loan`) # Found in /loans/loan-settings.json
- [x] Loan Application Settings (`LoanApplication`) # Found in /loans/loan-application-settings.json
- [x] Payment Settings (`Payment`) # Found in /payments/person-payments-settings.json
- [x] Transaction Settings (`Transaction`) # Found in /financial-cores/financial-core-settings.json under transactionSettings
- [x] Transfer Settings (`Transfer`) # Found in /financial-cores/financial-core-settings.json under transferSettings

## 5. Cards & Payments [ ]
- [x] Card Management Settings (`CardManagementSettings`) # Found in card-management.json with comprehensive card type and limit settings
- [x] Card Control Settings (`CardControl`) # Found in /cards/control/card-control-settings.json
- [x] Card Type Settings (`CardTypeSettings`) # Found in card-management.json under cardTypes
- [x] Card Activation Settings (`CardActivation`) # Found in /cards/activation/card-activation-settings.json
- [x] Card Limits Settings (`CardLimits`) # Found in /cards/limits/card-limits-settings.json
- [x] Card Alerts Settings (`CardAlerts`) # Found in /cards/alerts/card-alerts-settings.json
- [x] Card Security Settings (`CardSecurity`) # Found in /cards/security/card-security-settings.json
- [x] Card Travel Settings (`CardTravel`) # Found in /cards/travel/card-travel-settings.json
- [x] Card Status Settings (`CardStatus`) # Found in /cards/status/card-status-settings.json
- [x] Card Replacement Settings (`CardReplacement`) # Found in /cards/replacement/card-replacement-settings.json
- [x] Card PIN Settings (`CardPIN`) # Found in /cards/pin/card-pin-settings.json
- [x] Card Design Settings (`CardDesign`) # Found in card-management.json under cardDesign
- [x] Card History Settings (`CardHistory`) # Found in /cards/history/card-history-settings.json
- [x] Card Preferences Settings (`CardPreferences`) # Found in /cards/preferences/card-preferences-settings.json
- [x] Card Integration Settings (`CardIntegration`) # Found in /cards/integration/card-integration-settings.json
- [x] Go To My Card Settings (`GoToMyCard`) # Found in /cards/go-to-my-card-settings.json
- [x] Omaha SSO Settings (`OmahaSso`) # Found in /cards/omaha-sso-settings.json
- [x] PSCU SSO Settings (`PscuSso`) # Found in /cards/pscu-sso-settings.json
- [x] Summary Credit Cards Settings (`Summary.CreditCards`) # Found in /summary/credit-cards-summary-settings.json
- [x] Person Payment Security Settings (`PersonPaymentSecuritySettings`) # Found in /payments/person-payments-settings.json
- [*] Offline Card Settings (`OfflineCard`) # Not found in legacy codebase
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
- [x] Credit Score Settings (`CreditScore`) # Found in /credit/credit-score-settings.json with history and provider settings
- [x] FICO Credit Score Settings (`FicoCreditScore`) # Found in /credit/providers/fico.json with SSO and certificate settings
- [x] SavvyMoney Settings (`SavvyMoneySettings`) # Found in /credit/credit-score-settings.json under savvyMoney
- [x] Meridian Link SSO Settings (`MeridianLinkSsoSettings`) # Found in /loans/sso/meridian-link.json with member info and version settings
- [x] QCash Loan Application Settings (`QcashLoanApplication`) # Found in /loans/loan-application-settings.json under qcash

## 7. Documents & Statements [ ]
- [x] Check Images Settings (`CheckImages`) # Found in /checks/check-images.json with validation, Symnet, and Corporate One settings
- [x] Check Image Output Types Settings (`CheckImageOutputTypes`) # Found in /checks/check-images.json under settings
- [x] Check Image Validation Settings (`Validation`) # Found in /checks/check-images.json under validation
- [x] Check Image Simnet Settings (`SimnetConfiguration`) # Found in /checks/check-images.json under simnetConfiguration
- [x] Check Reorder Settings (`CheckReorder`) # Found in /checks/check-reorder-settings.json
- [x] Harland Check Reorder Settings (`HarlandCheckReorder`) # Found in /checks/check-reorder-settings.json under harland
- [x] Main Street Check Reorder Settings (`MainStreetCheckReorder`) # Found in /checks/check-reorder-settings.json under mainStreet
- [x] Estatements Settings (`Estatements`) # Found in /documents/estatements.json with EPL, Doxim, BIT, NCP, and Web API settings
- [x] EPL Estatements Settings (`EplEstatements`) # Found in /documents/providers/epl-estatements.json
- [x] Doxim Estatements Settings (`DoximEstatements`) # Found in /documents/providers/doxim-estatements.json
- [x] BIT Estatements Settings (`BitEstatements`) # Found in /documents/providers/bit-estatements.json
- [x] NCP Estatements Settings (`NcpEstatements`) # Found in /documents/providers/ncp-estatements.json
- [x] Web API Estatements Settings (`WebApiEstatementsSettings`) # Found in /documents/providers/web-api-estatements.json
- [x] Synergy Estatements Settings (`SynergyEstatements`) # Found in /documents/providers/synergy.json
- [x] Info Image Estatements Settings (`InfoImageEstatements`) # Found in /documents/providers/info-image.json
- [x] Document Architect SSO Settings (`DocumentArchitectSso`) # Found in /admin/document-architect-sso.json
- [x] Deep Target Settings (`DeepTarget`) # Found in marketing/deep-target-settings.json
- [x] Skip Pay Settings (`SkipPay`) # Found in marketing/skip-pay-settings.json
- [x] Google Tags Settings (`GoogleTags`) # Found in marketing/google-tags-settings.json

## 8. Marketing & Promotions [ ]
- [x] Targeted Marketing Settings (`TargetedMarketingSettings`) # Found in marketing/marketing-settings.json under targetedMarketing
- [x] Cardlytics Settings (`CardlyticsSettings`) # Found in marketing/marketing-settings.json under cardlytics
- [x] Cardlytics Widget Settings (`CardlyticsWidget`) # Found in marketing/cardlytics-widget-settings.json
- [x] Promotions Settings (`Promotions`) # Found in marketing/promotions-settings.json with features and settings
- [x] SegMint Settings (`SegMintSettings`) # Found in marketing/marketing-settings.json under segMint

## 9. Statements & Documents [x]
- [x] Estatements Settings (`EstatementsSettings`) # Found in /documents/estatements.json with EPL, Doxim, BIT, NCP, and Web API settings
- [x] Doxim Estatements Settings (`DoximEstatements`) # Found in /documents/providers/doxim.json
- [x] BIT Estatements Settings (`BitEstatements`) # Found in /documents/providers/bit.json
- [x] NCP Estatements Settings (`NcpEstatements`) # Found in /documents/providers/ncp.json
- [x] Web API Estatements Settings (`WebApiEstatementsSettings`) # Found in /documents/providers/web-api.json
- [x] Synergy Estatements Settings (`SynergyEstatements`) # Found in /documents/providers/synergy.json
- [x] InfoImage Estatements Settings (`InfoImageEstatements`) # Found in /documents/providers/info-image.json
- [x] Document Settings (`DocumentSettings`) # Found in /mobile/document-center/document-center.json
- [x] Document Center Settings (`DocumentCenterSettings`) # Same as Document Settings, found in /mobile/document-center/document-center.json
- [-] Document Management Settings (`DocumentManagementSettings`) # No legacy model found, skipping
- [-] Document Storage Settings (`DocumentStorageSettings`) # No legacy model found, skipping
- [-] Secure Document Settings (`SecureDocumentSettings`) # No legacy model found, skipping
- [-] Document Sharing Settings (`DocumentSharingSettings`) # No legacy model found, skipping

## 10. UI/UX & Customization [ ]
- [x] Theme Settings (`Themes`) # Found in /models/themes/theme-settings.json with legacy model references
- [-] Customization Settings (`CustomizationSettings`) # No legacy model found, skipping
- [x] Theme Connect Native Settings (`ConnectNative`) # Found in /models/native/connect-native-settings.json
- [x] Menu Items Settings (`MenuItems`) # Found in /models/navigation/menu-settings.json with legacy model references
- [x] Widget Settings (`WidgetSettings`) # Found in /widgets/widget-settings.json
- [-] Custom Pages Settings (`CustomPages`) # No legacy model found, skipping
- [x] Discount Tickets Settings (`DiscountTicketsSettings`) # Found in /models/discounts/discount-tickets-settings.json
- [x] Page Display Settings (`PageDisplaySettings`) # Found in /models/display/page-display-settings.json
- [x] Better Lobby Settings (`BetterLobbySettings`) # Found in /models/lobby/better-lobby-settings.json
- [x] Secure Forms Designer Settings (`SecureFormsDesigner`) # Found in /models/forms/secure-forms-designer-settings.json
- [x] Features Settings (`FeaturesSettings`) # Found in /models/features/feature-settings.json
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in /models/rewards/checking-rewards-settings.json and /models/financial-features/checking-rewards.json
- [x] Real Time Redemption Settings (`RealTimeRedemption`) # Found in /rewards/real-time-redemption-settings.json
- [-] Theme Models Settings (`ThemeModels`) # No legacy model found, skipping
- [x] Widget model (`Widget`) # Found in /widgets/widget-model.json with legacy model references from WidgetSettings and CardlyticsWidget

## 11. Business & Admin [ ]
- [-] Business Rules Settings (`BusinessRules`) # No legacy model found
- [-] Branches Settings (`Branches`) # No dedicated legacy model, functionality part of Omega.Features.AtmBranchLocations
- [-] Branch Locator Settings (`BranchLocator`) # No dedicated legacy model, functionality part of Omega.Features.AtmBranchLocations
- [x] ATM Locator Settings (`ATMLocator`) # Found in legacy AtmLocator/AtmLocatorSettings.cs
- [x] Admin Settings (`AdminSettings`) # Found in legacy Admin/AdminSettings.cs with nested settings models
- [x] Remove Member Settings (`RemoveMemberSettings`) # Found in legacy Membership/RemoveMemberFromOnlineBanking.cs
- [x] Boku Settings (`BokuSettings`) # Found in legacy Boku/BokuSettings.cs, JSON model updated with all setting keys
- [x] ACH File Service Settings (`AchFileService`) # Found in legacy AchService/AchFileService.cs, JSON model updated with all setting keys
- [x] Account Type Settings (`AccountTypeSettings`) # Found in legacy AccountTypeSettings.cs and AccountTypes.cs, JSON model updated with all setting keys
- [x] Pull Credit Settings (`PullCreditSettings`) # Found in legacy CorelationSettings/PullCreditSettings.cs, JSON model updated with all setting keys
- [x] Phone Identification Settings (`PhoneIdentificationSettings`) # Updated to reference BokuSettings, as phone identification is handled by Boku in legacy codebase
- [x] Audit Log Settings (`AuditLog`) # Found in legacy AuditLogs.cs and AuditLoggingFeature.cs, JSON model updated with all setting keys

## 12. Compliance & Monitoring [x]
- [x] Audit Settings (`AuditSettings`) # Found in legacy AuditLogs.cs and AuditLoggingFeature.cs, JSON model updated to match legacy settings
- [x] Audit Log Settings (`AuditLog`) # Found in /models/audit-logging.json
- [x] Compliance Settings (`Compliance`) # Found in legacy ADAComplianceSettings.cs, JSON model updated with all setting keys
- [x] ADA Settings (`ADA`) # Found in legacy ADAComplianceSettings.cs, JSON model updated with all setting keys
- [x] Doc Center Settings (`DocCenterSettings`) # Found in legacy ADACompliance/DocCenterSettings.cs, JSON model updated with all setting keys
- [x] Regular Expressions Settings (`RegularExpressionsFeature`) # Found in legacy RegularExpressionsFeature.cs, JSON model updated with all setting keys
- [x] Restricted Words Settings (`RestrictedWords`) # Found in legacy RestrictedWords.cs, JSON model updated with all setting keys
- [x] Monitoring Settings (`MonitoringSettings`) # Found in legacy MonitoringSettings.cs, JSON model updated with all setting keys
- [x] Better Lobby Settings (`BetterLobbySettings`) # Found in legacy BetterLobbySettings.cs, JSON model updated with all setting keys
- [x] ATM Locator Settings (`AtmLocator`) # Found in legacy AtmLocatorSettings.cs, JSON model updated with all setting keys

## 13. Integration & Core [ ]
- [x] Financial Core Settings (`FinancialCore`) # Found in /models/financial-cores/financial-core-settings.json
- [x] Corelation Settings (`Corelation`) # Found in /models/financial-cores/corelation/ with multiple settings files
- [x] Symitar Settings (`Symitar`) # Found in /models/financial-cores/symitar/remote-deposit-check-hold.json
- [x] DNA Settings (`DNA`) # Found in /models/financial-cores/dna-settings.json
- [x] EPL Settings (`EPL`) # Found in /models/financial-cores/epl-settings.json
- [x] PSI Core Settings (`PsiCore`) # Found in /models/financial-cores/psi-core-settings.json
- [x] Remote Deposit Check Hold Settings (`RemoteDepositCheckHoldSettings`) # Found in /models/deposits/remote-deposit-check-hold-settings.json
- [x] Summit Settings (`Summit`) # Found in /models/financial-cores/summit/regular-ach-transfers.json
- [x] Regular ACH Transfers Settings (`RegularAchTransfers`) # Found in /financial-cores/summit/regular-ach-transfers.json
- [x] ACH File Service Settings (`AchFileService`) # Found in /models/ach/ach-file-service-settings.json
- [x] Account Type Settings (`AccountTypeSettings`) # Found in /models/financial-cores/corelation/account-types.json
- [x] Pull Credit Settings (`PullCreditSettings`)
- [x] Person Type Settings (`PersonTypeSettings`) # Found in /models/financial-cores/corelation/person-type-settings.json
- [x] Draft Lookup Settings (`DraftLookup`) # Found in /models/financial-cores/corelation/draft-lookup-settings.json
- [x] Notes Settings (`Notes`) # Found in /models/financial-cores/notes-settings.json and /models/financial-cores/corelation/notes-settings.json
- [x] Application Settings (`Application`) # Found in /models/application/application-settings.json
- [x] Funding Settings (`Funding`) # Found in /models/financial-cores/corelation/funding-settings.json
- [x] Card Type Settings (`CardTypeSettings`) # Found in /models/financial-cores/corelation/card-type-settings.json
- [x] Identification Settings (`Identification`) # Found in /models/financial-cores/corelation/identification-settings.json
- [x] Loss Screening Settings (`LossScreeningSettings`) # Found in /models/financial-cores/corelation/loss-screening-settings.json
- [x] PSI Services Settings (`PsiServicesSettings`) # Found in /models/psi/psi-services-settings.json
- [x] PSCU Log File Transform Service Settings (`PscuLogFileTransformServiceSettings`) # Found in /models/pscu/pscu-log-file-transform-service-settings.json
- [x] Verafin File Batch Service Settings (`VerafinFileBatchServiceSettings`) # Found in /models/verafin/verafin-file-batch-service-settings.json
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /models/native/connect-native-settings.json
- [x] Boku Settings (`Boku`) # Found in /models/boku/boku-settings.json
- [x] Online Banking API Settings (`OnlineBankingApi`) # Found in /models/financial-cores/online-banking-api-settings.json

## 14. Enrollment & Access [ ]
- [x] Integrated Enrollment Settings (`IntegratedEnrollmentSettings`) # Found in /admin/admin-settings.json under integratedEnrollment
- [x] Authentication Settings (`Authentication`) # Found in security-authentication.json
- [x] Authentication Rules Settings (`AuthenticationRules`) # Found in security-authentication.json under authenticationRules
- [x] Mini OAO Settings (`MiniOaoSettings`) # Found in /admin/admin-settings.json under miniOao
- [x] Access Settings (`Access`) # Found in /models/admin/admin-settings.json under deviceManagement
- [x] Membership Settings (`MembershipFeature`) # Found in /admin/admin-settings.json under membership
- [x] Features Settings (`FeaturesSettings`) # Found in /models/features/feature-settings.json
- [x] IMI Mobile Text Banking Settings (`ImiMobileTextBankingSettings`) # Found in /models/text-banking/imi-mobile-settings.json

## 15. History & Records [ ]
- [x] Account History Settings (`AccountHistory`) # Found in /models/history/account-history-settings.json
- [x] Card History Settings (`CardHistory`) # Found in /models/history/card-history-settings.json
- [x] Connect Native Account History Settings (`ConnectNativeAccountHistory`) # Found in /models/native/connect-native-account-history.json
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /models/native/connect-native-settings.json
- [x] Connect Native Transfers Settings (`ConnectNativeTransfers`) # Found in /models/native/connect-native-transfers.json
- [x] History Date Settings (`HistoryDate`) # Found in /models/history/history-date-settings.json
- [x] History Share Settings (`HistoryShare`) # Found in /models/history/history-share-settings.json
- [x] Display Check Holds Settings (`DisplayCheckHolds`) # Found in /models/history/display-check-holds-settings.json
- [x] Linked Account History Settings (`LinkedAccountHistory`) # Found in /models/history/linked-account-history-settings.json
- [x] Summary Controls Settings (`SummaryControlsSettings`) # Found in /models/history/summary-controls-settings.json
- [x] Credit Score History Settings (`CreditScoreHistory`) # Found in /credit/credit-score-settings.json under creditScoreHistory

## 16. Application Configuration [ ]
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
- [x] Connect Native Settings (`ConnectNative`) # Found in /models/native/connect-native-settings.json
- [x] Mini OAO Settings (`MiniOao`) # Found in mobile-configuration.json under miniOao
- [x] Mobile Configuration Settings (`MobileConfiguration`) # Found in /models/mobile/mobile-configuration.json
- [x] Stop Pay Settings (`StopPay`) # Found in payments/stop-payment-settings.json
- [x] Advance Pay Settings (`AdvancePay`) # Found in /models/payday-loans/advance-pay-settings.json
- [x] Alerts Settings (`Alerts`) # Found in /models/alerts/alerts-settings.json
- [x] Authentication Settings (`Authentication`) # Found in security-authentication.json
- [x] Card Alerts Settings (`CardAlerts`) # Found in /models/alerts/alerts-settings.json under card alerts
- [x] Check Deposit Settings (`CheckDeposit`) # Found in /models/remote-deposit/remote-deposit.json
- [x] Account History Quick Actions Settings (`AccountHistoryQuickActions`) # Found in mobile-configuration.json under mobileAccounts.accountHistoryQuickActions
- [x] Account Nicknames Settings (`Nicknames`) # Found in mobile-configuration.json under mobileAccounts.nicknames
- [x] Account Opening Settings (`AccountOpening`) # Found in mobile-configuration.json under accountOpening
- [x] Accounts Settings (`Accounts`) # Found in mobile-configuration.json under mobileAccounts
- [x] Activation Settings (`Activation`) # Found in mobile-configuration.json under activation
- [x] Alerts Settings (`Alerts`) # Found in /models/alerts/alerts-settings.json
- [x] App Messages Settings (`AppMessages`) # Found in mobile-configuration.json under appMessages
- [x] Card Control Settings (`CardControl`) # Found in mobile-configuration.json and card-management.json
- [x] Cardlytics Settings (`Cardlytics`) # Found in marketing/cardlytics-widget-settings.json
- [x] Checking Rewards Settings (`CheckingRewards`) # Found in financial-features/checking-rewards.json
- [x] Contact Us Settings (`ContactUs`) # Found in mobile/mobile-settings.json as ContactUsSettings
- [x] Credit Card Settings (`CreditCardSettings`) # Found in cards/card-settings.json
- [x] Debit Card Settings (`DebitCardSettings`) # Found in cards/card-settings.json
- [x] Digital Wallet Settings (`DigitalWallet`) # Found in mobile-configuration.json and card-management.json
- [x] Direct Deposit Settings (`DirectDeposit`) # Found in /models/direct-deposit/direct-deposit-settings.json
- [x] Document Center Settings (`DocumentCenter`) # Found in mobile-configuration.json
- [x] Enrollment Settings (`Enrollment`) # Found in financial-cores/providers.json and mobile/mobile-settings.json
- [x] Estatements Settings (`Estatements`) # Found in /models/statements/estatements-settings.json
- [x] FICO Credit Score Settings (`FicoCreditScore`) # Found in mobile-configuration.json
- [x] Forgot Username Settings (`ForgotUsername`) # Found in mobile/mobile-settings.json under login/forgot-username.json
- [x] House Holding Settings (`HouseHolding`) # Found in mobile/mobile-settings.json and account-management.json
- [x] Join Credit Union Settings (`JoinCreditUnion`) # Found in /models/account-opening/join-credit-union-settings.json
- [x] Larky Settings (`Larky`) # Found in /models/mobile/larky-settings.json
- [x] Linked Accounts Settings (`LinkedAccounts`) # Found in /models/account/linked-account-settings.json
- [x] Loan Offers Settings (`LoanOffers`) # Found in /models/loans/loan-settings.json under loanOffers
- [x] Location Search Settings (`LocationSearch`) # Found in /models/location-search.json
- [x] Login Settings (`Login`) # Found in /models/login/home-banking-login.json
- [x] Lost Or Stolen Card Settings (`LostOrStolenCardSettings`) # Found in /models/cards/control/card-control-settings.json under lostOrStolen
- [x] Marketing Settings (`Marketing`) # Found in /models/marketing/marketing-settings.json
- [x] Mobile Estatements Settings (`Estatements`) # Found in /models/statements/estatements-settings.json
- [x] Mobile Login Settings (`Login`) # Found in /models/login/home-banking-login.json
- [x] Mobile Menu Settings (`MobileMenu`) # Found in mobile-configuration.json under mobileMenu
- [x] Mobile Web Views Settings (`MobileWebViews`) # Found in mobile-configuration.json under mobileWebViews
- [x] Money Desktop Settings (`MoneyDesktop`) # Found in /models/money-desktop/money-desktop-settings.json
- [x] My Card Info Settings (`MyCardInfo`) # Found in cards/card-settings.json
- [x] My CU Club Settings (`MyCuClub`) # Found in /models/mobile/my-cu-club-settings.json
- [x] Next Login Steps Settings (`NextLoginSteps`) # Found in mobile/mobile-settings.json under login/next-login-steps.json
- [x] Notifications Settings (`Notifications`) # Found in mobile-configuration.json under notifications
- [x] Ondot DX Settings (`OndotDxSettings`) # Found in mobile/mobile-settings.json under ondotDx
- [x] OnDot SDK Settings (`OnDotSdkSettings`) # Found in mobile/mobile-settings.json
- [x] Password Encryption Settings (`PasswordEncryption`) # Found in security-authentication.json under encryptionPolicy
- [x] Password Settings (`Password`) # Found in security-authentication.json under passwordPolicy
- [x] Pay Anyone Settings (`PayAnyone`) # Found in payments/person-payments-settings.json
- [x] Pay Bill Settings (`PayBill`) # Found in billpay/billpay-settings.json
- [x] Personal Finance Manager Settings (`PersonalFinanceManager`) # Found in mobile/pfm/pfm-settings.json
- [x] Personalization Settings (`Personalization`) # Found in personalization/personalization-settings.json with themes and promotions
- [x] PIN Change Settings (`PinChange`) # Found in cards/pin/card-pin-settings.json
- [x] PIN Encryption Settings (`PinEncryption`) # Found in cards/pin/card-pin-settings.json
- [x] Promotions Channel Settings (`PromoChannel`) # Found in marketing/settings.json under mobile.promoChannel
- [x] Push Notification Settings (`PushNotification`) # Found in mobile/notifications/notifications-settings.json
- [x] Quick Account Info Settings (`QuickAccountInfo`) # Found in mobile/accounts/quick-account-info-settings.json
- [x] Quick Balance Preferences Settings (`Preferences`) # Found in mobile/accounts/quick-balance-settings.json under preferences
- [x] Quick Balance Settings (`QuickBalance`) # Found in mobile/accounts/quick-balance-settings.json
- [x] Rate And Review Settings (`RateAndReview`) # Found in mobile/feedback/rate-and-review-settings.json
- [x] Rates Settings (`Rates`) # Found in financial-features/rates-settings.json
- [x] Relevant Solutions Settings (`RelevantSolutions`) # Found in mobile/deals/relevant-solutions-settings.json
- [x] Saved Transfers Settings (`SavedTransfers`) # Found in mobile/transfers/saved-transfers-settings.json
- [x] SavvyMoney Settings (`SavvyMoney`) # Found in mobile/integrations/savvy-money-settings.json
- [x] Scheduled Transfers Settings (`ScheduledTransfersSettings`) # Found in mobile/transfers/scheduled-transfers-settings.json
- [x] Secure Forms Settings (`SecureForms`) # Found in mobile/forms/secure-forms-settings.json
- [x] Send Money Settings (`SendMoney`) # Found in payments/person-payments-settings.json
- [x] Transfers Settings (`Transfers`) # Found in mobile/transfers/transfers-settings.json
- [x] User Devices Settings (`UserDevices`) # Found in mobile/devices/user-devices-settings.json
- [x] Version Management Settings (`VersionManagement`) # Found in application/application-settings.json
- [x] Welcome Settings (`Welcome`) # Found in mobile/welcome/welcome-settings.json

## 18. Integrations & Services [ ]
### Third-Party Integrations
- [x] Integration Settings (`IntegrationSettings`) # Found in /integrations/integration-settings.json
- [x] Cardlytics Settings (`CardlyticsSettings`) # Found in /integrations/integration-settings.json under cardlytics
- [x] Connect Native Settings (`ConnectNativeSettings`) # Found in /integrations/integration-settings.json under connectNative
- [x] Connect Native Account History Settings (`ConnectNativeAccountHistorySettings`) # Found in /integrations/connect-native/account-history.json
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

## 19. Transfer & Payment Services [ ]
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

## Next Steps After Checklist is Complete

### 0. Find and remove all AI Hallucinations
- [ ] Remove all AI hallucinations from JSON Schema files

### 1. Analyze Setting Key Namespaces
- [ ] Extract all x-setting-key values from JSON Schema files
- [ ] Analyze namespace hierarchy (e.g., security.authentication.password)
- [ ] Propose new model directory structure based on natural groupings

### 2. Update API Structure
- [ ] Simplify to single set of CRUD endpoints for configuration table
- [ ] Define endpoints:
  - GET /settings - List all settings with filtering
  - GET /settings/{setting-key} - Get specific setting
  - POST /settings - Create/update settings
  - PUT /settings/{setting-key} - Update specific setting
  - DELETE /settings/{setting-key} - Delete specific setting
- [ ] Use x-setting-key properties to map between API models and database
- [ ] Update client-configuration-api.json to reflect new structure

### 3. Implement Service Layer
- [ ] Configure OpenAPI generator to include x-setting-key properties
- [ ] Generate TypeScript types from JSON Schema files
- [ ] Create ConfigurationService following ServiceFactory pattern with real/mock implementations