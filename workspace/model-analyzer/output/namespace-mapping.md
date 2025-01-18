# Legacy Namespace to New Directory Mapping

## Core Namespaces

### Account Management
- `Psi.Data.Models.ClientConfigurationModels.Account.*` → `account/`
  - Account settings
  - Transfer settings
  - ACH settings
  - Wire transfer settings

### Authentication & Security
- `Psi.Data.Models.ClientConfigurationModels.Authentication.*` → `security/`
- `Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin.*` → `security/`
- `Psi.Data.Models.ClientConfigurationModels.Login.*` → `security/`
- `Psi.Data.Models.ClientConfigurationModels.PasswordVerification.*` → `security/`
- `Psi.Data.Models.ClientConfigurationModels.SmsSecurityCode.*` → `security/`

### Card Management
- `Psi.Data.Models.ClientConfigurationModels.CardManagement.*` → `cards/`
- `Psi.Data.Models.ClientConfigurationModels.CreditCards.*` → `cards/`
- `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.*` → `cards/control/`
- `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardAlerts.*` → `cards/alerts/`

### Documents & Statements
- `Psi.Data.Models.ClientConfigurationModels.CheckImages.*` → `documents/check-images/`
- `Psi.Data.Models.ClientConfigurationModels.Estatements.*` → `documents/`
- `Psi.Data.Models.ClientConfigurationModels.InfoImageEstatements.*` → `documents/providers/info-image/`
- `Psi.Data.Models.ClientConfigurationModels.SynergyEstatements.*` → `documents/providers/synergy/`

### Marketing & Promotions
- `Psi.Data.Models.ClientConfigurationModels.Marketing.*` → `marketing/`
- `Psi.Data.Models.ClientConfigurationModels.Cardlytics.*` → `marketing/providers/cardlytics/`
- `Psi.Data.Models.ClientConfigurationModels.SegMint.*` → `marketing/providers/segmint/`
- `Psi.Data.Models.ClientConfigurationModels.Promotions.*` → `marketing/promotions/`

### Payments & Transfers
- `Psi.Data.Models.ClientConfigurationModels.BillPay.*` → `payments/bill-pay/`
- `Psi.Data.Models.ClientConfigurationModels.PersonPayments.*` → `payments/p2p/`
- `Psi.Data.Models.ClientConfigurationModels.WireTransfer.*` → `payments/wire/`

### Financial Core Integration
- `Psi.Data.Models.ClientConfigurationModels.FinancialCores.*` → `financial-cores/`
- `Psi.Data.Models.ClientConfigurationModels.ConnectNative.*` → `native/`

### Mobile & UI Configuration
- `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.*` → `mobile/`
- `Psi.Data.Models.ClientConfigurationModels.Application.*` → `application/`
- `Psi.Data.Models.ClientConfigurationModels.PageDisplay.*` → `ui/`

### Administrative
- `Psi.Data.Models.ClientConfigurationModels.Admin.*` → `admin/`
- `Psi.Data.Models.ClientConfigurationModels.AuditLogging.*` → `admin/audit/`
- `Psi.Data.Models.ClientConfigurationModels.Monitoring.*` → `admin/monitoring/`

### Compliance
- `Psi.Data.Models.ClientConfigurationModels.ADACompliance.*` → `compliance/`
- `Psi.Data.Models.ClientConfigurationModels.RegularExpressions.*` → `compliance/validation/`
- `Psi.Data.Models.ClientConfigurationModels.RestrictedWords.*` → `compliance/validation/`

## Special Cases

### Test/Development
- `Global.TestSettingsHelper` → Development test helpers, not included in production
- `Global.TestSettingsModel` → Development test models, not included in production

### Base Classes/Helpers
- `Psi.Data.Models.ClientConfigurationModels.SettingKeyAttribute` → Base attribute class
- `Psi.Data.Models.ClientConfigurationModels.Settings` → Base settings class
- `Psi.Data.Models.ClientConfigurationModels.SettingsBaseHelper` → Base helper class

## Next Steps

1. Validate this mapping against our consolidation targets
2. Check for any namespaces that don't have a clear mapping
3. Identify any new directories that don't have legacy equivalents
