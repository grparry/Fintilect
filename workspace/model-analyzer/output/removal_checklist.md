# Settings Removal Checklist

Settings to be removed from each file. **Note: Some settings appear in multiple files and must be removed from all locations.**

## Settings in Multiple Files

### [x] History.Card.PscuSsoEnabled
- [x] card-integration-settings.json
- [x] pscu-sso-settings.json

### [x] IntegratedEnrollment.SSO.SkippedEnrollmentSteps
- [x] enrollment.json
- [x] integrated-enrollment-settings.json

### [x] Marketing.SegMint.SlotIdMappings
- [x] segmint.json
- [x] segmint-settings.json

### [x] Marketing.SegMint.ZoneIdMappings
- [x] segmint.json
- [x] segmint-settings.json

### [x] MeridianLinkSso.SendMemberInfo.FieldsToSend
- [x] meridian-link.json
- [x] sso-settings.json

### [x] Widgets.DashboardInitialSortOrder
- [x] widget-settings.json
- [x] widget-model.json


## Settings in Single Files

## [x] security-authentication.json
- [x] AccessControl.RBAC.DefaultRole
- [x] AccessControl.RBAC.Enabled
- [x] AccessControl.RBAC.PermissionInheritance
- [x] AccessControl.RBAC.RoleHierarchy
- [x] Mobile.PFM.Url
- [x] Mobile.PasswordComplexity.MinimumAndroidVersion
- [x] Mobile.PasswordComplexity.MinimumIosVersion
- [x] Mobile.PasswordComplexity.MinimumVersion
- [x] Mobile.PasswordExpiration.MinimumAndroidVersion
- [x] Mobile.PasswordExpiration.MinimumIosVersion
- [x] Mobile.PasswordExpiration.MinimumVersion
- [x] Mobile.PasswordHistory.MinimumAndroidVersion
- [x] Mobile.PasswordHistory.MinimumIosVersion
- [x] Mobile.PasswordHistory.MinimumVersion
- [x] Mobile.PasswordLockout.MinimumAndroidVersion
- [x] Mobile.PasswordLockout.MinimumIosVersion
- [x] Mobile.PasswordLockout.MinimumVersion

## [x] account-history-settings.json
- [x] AccountHistory.PendingTransactionTypeDisplayNames

## [x] providers.json
- [x] BillMatrixBillPaySso.ApiPassword
- [x] BillMatrixBillPaySso.Enabled
- [x] BillMatrixBillPaySso.MerchantId
- [x] BillMatrixBillPaySso.PaymentTypes
- [x] BillMatrixBillPaySso.ProcessingRules.CutoffTime
- [x] BillMatrixBillPaySso.ProcessingRules.ProcessingDelay
- [x] BillMatrixBillPaySso.ServiceUrl

## [x] billpay-settings.json
- [x] BillPaySettings

## [x] card-design-settings.json
- [x] Card.cardDesignImageArtifactId
- [x] CheckFreeAdminSso.AdminPortalUrl
- [x] CheckFreeAdminSso.Credentials.Password
- [x] CheckFreeAdminSso.Credentials.Username
- [x] CheckFreeAdminSso.Enabled
- [x] CheckFreeAdminSso.Permissions.PayeeManagement
- [x] CheckFreeAdminSso.Permissions.ReportAccess
- [x] CheckFreeAdminSso.Permissions.UserManagement
- [x] CheckFreeBillPaySso.AccountTypeMap
- [x] CheckFreeBillPaySso.Products

## [x] admin-settings.json
- [x] DeviceManagement.IdentificationMethods
- [x] DeviceManagement.LockoutDuration
- [x] DeviceManagement.LockoutThreshold
- [x] DeviceManagement.MaxDevicesPerUser
- [x] DeviceManagement.RequireMultipleFactors

## [x] loan-application-settings.json
- [x] LoanApplication.Enabled
- [x] MetavanteBillPaySso.Enabled
- [x] MetavanteBillPaySso.Environment
- [x] MetavanteBillPaySso.Features.Overnight
- [x] MetavanteBillPaySso.Features.SameDay
- [x] MetavanteBillPaySso.Features.Standard
- [x] MetavanteBillPaySso.InstitutionId
- [x] MetavanteBillPaySso.RoutingNumber
- [x] MetavanteBillPaySso.Security.CertificateThumbprint
- [x] MetavanteBillPaySso.Security.PrivateKeyPath

## [x] advance-pay-settings.json
- [x] Mobile.AdvancePay.ShowInMobileApp

## [x] pfm-settings.json
- [x] Mobile.PFM.Budgets.Enabled
- [x] Mobile.PFM.Budgets.MinVersion
- [x] Mobile.PFM.Enabled
- [x] Mobile.PFM.Goals.Enabled
- [x] Mobile.PFM.Goals.MinVersion
- [x] Mobile.PFM.MinAndroidVersion
- [x] Mobile.PFM.MinIosVersion
- [x] Mobile.PFM.MinVersion
- [x] Mobile.PFM.ShouldOpenInIframe
- [x] Mobile.PFM.Spending.Categories
- [x] Mobile.PFM.Spending.Enabled
- [x] Mobile.PFM.Spending.MinVersion

## [x] notifications-settings.json
- [x] Mobile.PushNotification.AvailableDeepLinks
- [x] Mobile.PushNotification.Enabled
- [x] Mobile.PushNotification.MinimumAndroidVersion
- [x] Mobile.PushNotification.MinimumIosVersion

## [x] security-questions.json
- [x] Mobile.SecurityQuestions.MinimumAndroidVersion
- [x] Mobile.SecurityQuestions.MinimumIosVersion
- [x] Mobile.SecurityQuestions.MinimumVersion

## [x] monitoring.json
- [x] Monitoring.AlertingEnabled
- [x] Monitoring.AlertingRecipients
- [x] Monitoring.MiddlewareHealthCheckInterval
- [x] Monitoring.MiddlewareHealthEnabled
- [x] OutOfBandSso.Actions
- [x] OutOfBandSso.Authentication.CodeLength
- [x] OutOfBandSso.Authentication.ExpirationMinutes
- [x] OutOfBandSso.Authentication.Method
- [x] OutOfBandSso.Enabled
- [x] PasswordPolicy.AllowedSpecialCharacters
- [x] PasswordPolicy.EnforceExpiration
- [x] PasswordPolicy.EnforceHistory
- [x] PasswordPolicy.ExpirationDays
- [x] PasswordPolicy.GraceLogins
- [x] PasswordPolicy.HistorySize
- [x] PasswordPolicy.LockoutDuration
- [x] PasswordPolicy.LockoutEnabled
- [x] PasswordPolicy.LockoutNotifyAdmin
- [x] PasswordPolicy.LockoutNotifyUser
- [x] PasswordPolicy.LockoutRequireAdminUnlock
- [x] PasswordPolicy.LockoutResetCounter
- [x] PasswordPolicy.LockoutThreshold
- [x] PasswordPolicy.MaxLength
- [x] PasswordPolicy.MinLength
- [x] PasswordPolicy.MinUniqueCharacters
- [x] PasswordPolicy.PreventReuse
- [x] PasswordPolicy.PreventUsernamePart
- [x] PasswordPolicy.RequireLowercase
- [x] PasswordPolicy.RequireNumbers
- [x] PasswordPolicy.RequireSpecialCharacters
- [x] PasswordPolicy.RequireUppercase
- [x] PasswordPolicy.ReuseDays
- [x] PasswordPolicy.WarningDays
- [x] PaydayLoans.AdvancePay.DatabaseTimeout

## [x] phone-identification-settings.json
- [x] PhoneIdentification.Boku

## [x] scheduled-transfers.json
- [x] ScheduledTransfers.CoreErrorCodeToTransferResultMappings
- [x] SessionManagement.Concurrent.MaxSessions
- [x] SessionManagement.Concurrent.PreventNewLogin
- [x] SessionManagement.Concurrent.TerminateOldest
- [x] SessionManagement.Persistence.MaxPersistentDays
- [x] SessionManagement.Persistence.PersistentSessions
- [x] SessionManagement.Persistence.RequireReauthentication
- [x] SessionManagement.Timeout.Duration
- [x] SessionManagement.Timeout.Enabled
- [x] SessionManagement.Timeout.ExtendOnActivity
- [x] SessionManagement.Timeout.WarningTime
- [x] SymmetryBillPaySso.ApiKey
- [x] SymmetryBillPaySso.ClientId
- [x] SymmetryBillPaySso.Enabled
- [x] SymmetryBillPaySso.Features.BillPresentation
- [x] SymmetryBillPaySso.Features.PayeeDirectory
- [x] SymmetryBillPaySso.Features.PaymentProcessing
- [x] SymmetryBillPaySso.Processing.BatchSize
- [x] SymmetryBillPaySso.Processing.RetryAttempts

## [x] any-member-transfers.json
- [x] Transfers.AnyMember.AccountSuffixMappings
- [x] Transfers.AnyMember.AccountTypeMappings
- [x] X.App.HomeBanking.AdvancePay.ShowAvailableAmount
- [x] X.App.HomeBanking.AdvancePay.ShowInHomeBanking
- [x] X.App.HomeBanking.AdvancePayMaxActiveLoans
- [x] X.App.HomeBanking.AdvancePayMaximumLoanAmount
- [x] X.App.HomeBanking.AdvancePayMinimumAccountAge
- [x] X.App.HomeBanking.AdvancePayMinimumDirectDepositAmount
- [x] X.App.HomeBanking.AdvancePayMinimumLoanAmount
- [x] X.App.HomeBanking.AdvancePayRequireDirectDeposit
