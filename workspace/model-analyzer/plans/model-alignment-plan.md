# Model Alignment Plan

## Goals
1. Align models in `cbp-admin/src/api/models` with legacy code in `legacy/legacy-apis/Psi.Models.ClientConfigurationModels`
2. Implement optimal JSON file structure for models directory

## Settings Consolidation

### 1. ADA Compliance Settings
- **Duplicates Found**: 
  - `compliance/ada-compliance-settings.json`
  - `compliance/compliance-settings.json`
- **Consolidation Target**: `compliance/ada-compliance-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ADACompliance.ADAComplianceSettings`
- **Legacy Settings Key**: `ADAComplianceSettings.*`

### 2. Cross Account Settings
- **Duplicates Found**:
  - `account/cross-account-settings.json`
  - `account/house-holding-settings.json`
- **Consolidation Target**: `account/cross-account-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Account.CrossAccountSettings`
- **Legacy Settings Key**: `Account.CrossAccount.*`

### 3. Card Management Settings
- **Duplicates Found**:
  - `card-management.json`
  - `cards/pin/card-pin-settings.json`
  - `cards/replacement/card-replacement-settings.json`
- **Consolidation Target**: Split into dedicated files under `cards/` directory
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Cards.*`
- **Legacy Settings Key**: `CardManagement.*`

### 4. Cardlytics Settings
- **Duplicates Found**:
  - `marketing/cardlytics-widget-settings.json`
  - `marketing/providers/cardlytics.json`
- **Consolidation Target**: `marketing/providers/cardlytics.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.Cardlytics.CardlyticsSettings`
- **Legacy Settings Key**: `Cardlytics.*`

### 5. Check Images Settings
- **Duplicates Found**:
  - `checks/check-images.json`
  - `services/check-images/check-images-settings.json`
- **Consolidation Target**: `documents/check-images/check-images-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.CheckImages.CheckImages`
- **Legacy Settings Key**: `CheckImages.*`

### 6. ConnectNative Transfers Settings
- **Duplicates Found**:
  - `native/connect-native-settings.json`
  - `native/connect-native-transfers.json`
- **Consolidation Target**: `native/connect-native-transfers.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ConnectNative.ConnectNativeTransfers`
- **Legacy Settings Key**: `ConnectNative.*`

### 7. InfoImage eStatements Settings
- **Duplicates Found**:
  - `documents/providers/info-image.json`
  - `documents/providers/info-image-estatements.json`
- **Consolidation Target**: `documents/providers/info-image-estatements.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.InfoImageEstatements.InfoImageEstatementsSettings`
- **Legacy Settings Key**: `InfoImageEstatements.*`

### 8. Synergy eStatements Settings
- **Duplicates Found**:
  - `documents/providers/synergy-estatements.json`
  - `documents/providers/synergy.json`
- **Consolidation Target**: `documents/providers/synergy-estatements.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.SynergyEstatements.SynergyEstatementsSettings`
- **Legacy Settings Key**: `SynergyEstatements.*`

### 9. EPL eStatements Settings
- **Duplicates Found**:
  - `documents/providers/epl-estatements.json`
  - `financial-cores/epl-settings.json`
  - `documents/estatements.json`
- **Consolidation Target**: `documents/providers/epl-estatements.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.Estatements.EplEstatements`
- **Legacy Settings Key**: `Estatements.Epl.*`

### 10. MeridianLink SSO Settings
- **Duplicates Found**:
  - `loans/sso/meridian-link.json`
  - `integrations/meridian-link/sso-settings.json`
- **Consolidation Target**: `lending/providers/meridian-link/meridian-link-settings.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.MeridianLinkSso.MeridianLinkSsoSettings`
- **Legacy Settings Key**: `MeridianLinkSso.*`

### 11. SegMint Settings
- **Duplicates Found**:
  - `marketing/providers/segmint.json`
  - `services/segmint/segmint-settings.json`
- **Consolidation Target**: `marketing/providers/segmint/segmint-settings.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.SegMint.SegMintSettings`
- **Legacy Settings Key**: `SegMint.*`

### 12. Card Alerts Settings
- **Duplicates Found**:
  - `alerts/alerts-settings.json`
  - `cards/alerts/card-alerts-settings.json`
  - `mobile/alerts/alerts.json`
- **Consolidation Target**: `cards/alerts/card-alerts-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardAlerts`
- **Legacy Settings Key**: `Mobile.CardAlerts.*`

### 13. Card Control Settings
- **Duplicates Found**:
  - `cards/control/card-control-settings.json`
  - `cards/security/card-security-settings.json`
  - `mobile/card-control/card-control.json`
- **Consolidation Target**: `cards/control/card-control-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.CardControl`
- **Legacy Settings Key**: `Mobile.CardControl.*`

### 14. OnDot SDK Settings
- **Duplicates Found**:
  - `mobile/ondot-sdk-settings.json`
  - `cards/control/card-control-settings.json`
  - `cards/security/card-security-settings.json`
- **Consolidation Target**: `cards/control/providers/ondot/sdk-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.OnDotSdkSettings`
- **Legacy Settings Key**: `Mobile.CardControl.OnDotSdk.*`

### 15. OnDot DX Settings
- **Duplicates Found**:
  - `mobile/ondot-dx-settings.json`
  - `cards/control/card-control-settings.json`
  - `cards/security/card-security-settings.json`
  - `mobile/card-control/card-control.json`
  - `mobile/devices/user-devices.json`
- **Consolidation Target**: `cards/control/providers/ondot/dx-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.OndotDxSettings`
- **Legacy Settings Key**: `Mobile.CardControl.OndotDx.*`

### 16. Checking Rewards Settings
- **Duplicates Found**: 
  - `rewards/checking-rewards-settings.json`
  - `financial-features/checking-rewards.json`
- **Consolidation Target**: `rewards/checking-rewards-settings.json`
- **Legacy Model**: `Psi.Models.ClientConfigurationModels.MobileConfigurations.Deals.CheckingRewards.CheckingRewards`
- **Legacy Settings Key**: `Account.Attributes.CheckingRewards.*`

### 17. Pin Encryption Settings
- **Duplicates Found**:
  - `cards/pin/card-pin-settings.json`
  - `security/security-authentication.json`
- **Consolidation Target**: `security/security-authentication.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.PinEncryption`
- **Legacy Settings Key**: `Mobile.PinEncryption.*`

### 18. Quick Access Pin Settings
- **Duplicates Found**:
  - `cards/pin/card-pin-settings.json`
  - `security/security-authentication.json`
  - `security/security-settings.json`
- **Consolidation Target**: `security/security-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.QuickAccess.QuickAccessPin`
- **Legacy Settings Key**: `Mobile.Security.QuickAccess.*`

### 19. Security Settings
- **Duplicates Found**:
  - `security/security-authentication.json`
  - `security/security-settings.json`
- **Consolidation Target**: `security/security-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Security`
- **Legacy Settings Key**: `AccessControl.*`

### 20. Phone Number Settings
- **Duplicates Found**:
  - `profile/change-phone-settings.json`
  - `profile/phone-number-settings.json`
- **Consolidation Target**: `profile/change-phone-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation.ChangePhoneNumbers`
- **Legacy Settings Key**: `ChangePhone.*`

### 21. Person Payment Security Settings
- **Duplicates Found**:
  - `payments/person-payment-security-settings.json`
  - `payments/person-payments-settings.json`
- **Consolidation Target**: `payments/person-payment-security-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PersonPaymentSecuritySettings`
- **Legacy Settings Key**: `PersonPaymentSecurity.*`

### 22. Zelle Settings
- **Duplicates Found**:
  - `payments/features.json`
  - `payments/person-payments-settings.json`
  - `payments/zelle-settings.json`
- **Consolidation Target**: `payments/zelle-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PersonPayments.ZelleSettings`
- **Legacy Settings Key**: `PersonPayments.Zelle.*`

### 23. Advance Pay Settings
- **Duplicates Found**:
  - `services/payday-loans/advance-pay-settings.json`
  - `payday-loans/advance-pay-settings.json`
- **Consolidation Target**: `payday-loans/advance-pay-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PaydayLoans.AdvancePay`
- **Legacy Settings Key**: `PaydayLoans.AdvancePay.*`

### 24. Payzur Settings
- **Duplicates Found**:
  - `integrations/person-payments/payzur.json`
  - `payments/features.json`
  - `payments/person-payments-settings.json`
- **Consolidation Target**: `payments/person-payments/providers/payzur/payzur-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PersonPayments.Payzur`
- **Legacy Settings Key**: `PersonPayments.Payzur.*`

### 25. Boku Settings
- **Duplicates Found**:
  - `admin/phone-identification-settings.json`
  - `boku/boku-settings.json`
- **Consolidation Target**: `mobile/security/providers/boku/boku-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Boku.BokuSettings`
- **Legacy Settings Key**: `Boku.*`

### 26. ACH Settings
- **Duplicates Found**:
  - `account/ach-transfer.json`
  - `ach/ach-settings.json`
  - `financial-cores/transaction-settings.json`
  - `ach/place-holds-on-ach-transactions.json`
  - `ach/ach-transaction-notes.json`
- **Consolidation Target**: `ach/ach-settings.json`
- **Legacy Models**: 
  - `Psi.Data.Models.ClientConfigurationModels.Account.AchTransfer`
  - `Psi.Data.Models.ClientConfigurationModels.Account.PlaceHoldsOnAchTransactions`
  - `Psi.Data.Models.ClientConfigurationModels.Account.UseInformationalNoteInsteadOfTransferForAchTransactions`
- **Legacy Settings Key**: `AchFileService.*`

### 27. Transfer Settings
- **Duplicates Found**:
  - `account/transfers.json`
  - `financial-cores/transfer-settings.json`
  - `account/transfer-limits.json`
  - `cards/limits/card-limits-settings.json`
- **Consolidation Target**: `account/transfers.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Account.Transfers`
- **Legacy Settings Key**: `Admin.Transfer.*`

### 28. Connect Native Transfer Settings
- **Duplicates Found**:
  - `native/connect-native-settings.json`
  - `native/connect-native-transfers.json`
- **Consolidation Target**: `native/connect-native-transfers.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ConnectNative.ConnectNativeTransfers`
- **Legacy Settings Key**: `ConnectNative.Transfers.*`

### 29. Member Settings
- **Duplicates Found**:
  - `admin/member-settings.json`
  - `admin/membership-settings.json`
- **Consolidation Target**: `admin/membership-settings.json`
- **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Membership.Flags`
- **Legacy Settings Key**: `Membership.*`

### 30. Audit Settings
- **Duplicates Found**:
  - `monitoring/audit-settings.json`
  - `audit-logging.json`
- **Consolidation Target**: `monitoring/audit-settings.json`
- **Legacy Models**: 
  - `Psi.Data.Models.ClientConfigurationModels.Admin.AuditLogs`
  - `Psi.Data.Models.ClientConfigurationModels.AuditLogging.AuditLoggingFeature`
- **Legacy Settings Key**: `Admin.AuditLogs.*`

## File Migration Mapping

This section maps the original file locations to their new target locations to ensure accurate migration:

### ACH Files
- `services/ach/transactions/place-holds.json` → `transfers/ach-transaction-holds-settings.json`
- `services/ach/transactions/transaction-notes.json` → `transfers/ach-transaction-notes-settings.json`
- `services/ach/security/ach-security.json` → `transfers/ach-security-settings.json`

### Security Files
- `security/account/security.json` → `account/account-security-settings.json`
- `security/admin/authentication.json` → `admin/security-authentication-settings.json`
- `security/cards/security.json` → `cards/card-security-settings.json`
- `security/documents/security.json` → `documents/document-security-settings.json`
- `security/mobile/security.json` → `mobile/mobile-security-settings.json`
- `security/payments/security.json` → `payments/payment-security-settings.json`
- `security/profile/security.json` → `profile/profile-security-settings.json`

### Provider Files
- `providers/estatements/epl/estatements.json` → `documents/epl-estatements-settings.json`
- `providers/estatements/info-image/estatements.json` → `documents/info-image-estatements-settings.json`
- `providers/estatements/synergy/estatements.json` → `documents/synergy-estatements-settings.json`
- `providers/ondot/dx-settings.json` → `cards/ondot-dx-settings.json`
- `providers/ondot/sdk-settings.json` → `cards/ondot-sdk-settings.json`

### Core Files
- `core/card-management.json` → `cards/card-management-settings.json`
- `core/connect-native/transfers.json` → `transfers/connect-native-transfers-settings.json`
- `core/transfer-limits.json` → `transfers/transfer-limits-settings.json`
- `core/audit/logging.json` → `monitoring/audit-logging-settings.json`
- `core/notifications/alerts.json` → `mobile/mobile-alerts-settings.json`

### Feature Files
- `cards/alerts/card-alerts.json` → `cards/card-alerts-settings.json`
- `cards/control/card-control.json` → `cards/card-control-settings.json`
- `cards/design/card-design.json` → `cards/card-design-settings.json`
- `cards/limits/card-limits.json` → `cards/card-limits-settings.json`
- `cards/pin/card-pin.json` → `cards/card-pin-settings.json`
- `cards/replacement/card-replacement.json` → `cards/card-replacement-settings.json`
- `documents/check-images/check-images.json` → `documents/check-images-settings.json`
- `lending/payday/advance-pay.json` → `lending/advance-pay-settings.json`

## Migration Steps

1. For each file in the mapping:
   a. Verify the original file exists
   b. Create the new directory structure if needed
   c. Copy the file to its new location with the new name
   d. Validate the copied file
   e. Update any references to the old location
   f. Only remove the original file after successful validation

2. Document any discrepancies or issues found during migration

## Recommended Actions

1. **Consolidate Settings**:
   - For each set of duplicates:
     1. Review all settings in the duplicate files
     2. Identify any unique settings that only exist in the non-target files
     3. Migrate those settings to the consolidation target
     4. Validate the consolidated settings are complete
     5. Remove the redundant files
   - Document any settings that were migrated for future reference

2. **Standardize File Structure**:
   - Group related settings under appropriate directories (e.g., all card-related settings under `cards/`)
   - Use consistent naming patterns (e.g., `*-settings.json` for settings files)
   - Place provider-specific settings under `providers/` subdirectories

3. **Update Legacy Model References**:
   - Ensure each JSON file has correct `x-legacy-model` reference
   - Validate that property names match legacy model properties

4. **Migration Strategy**:
   - Create scripts to handle file consolidation
   - Test impact on existing code
   - Plan rollout to minimize disruption

## Recommended Final Directory Structure

The following structure organizes settings by feature area while maintaining clear boundaries between different types of functionality:

```
src/api/models/
├── account/
│   ├── account-attributes-settings.json
│   ├── account-security-settings.json
│   └── cross-account-settings.json
├── admin/
│   ├── membership-settings.json
│   ├── phone-identification-settings.json
│   └── security-authentication-settings.json
├── cards/
│   ├── card-alerts-settings.json
│   ├── card-control-settings.json
│   ├── card-design-settings.json
│   ├── card-limits-settings.json
│   ├── card-management-settings.json
│   ├── card-pin-settings.json
│   ├── card-replacement-settings.json
│   ├── card-security-settings.json
│   ├── ondot-dx-settings.json
│   └── ondot-sdk-settings.json
├── compliance/
│   ├── ada-compliance-settings.json
│   └── compliance-settings.json
├── documents/
│   ├── check-images-settings.json
│   ├── document-security-settings.json
│   ├── document-settings.json
│   ├── epl-estatements-settings.json
│   ├── estatements-settings.json
│   ├── info-image-estatements-settings.json
│   └── synergy-estatements-settings.json
├── financial/
│   ├── epl-settings.json
│   └── financial-settings.json
├── lending/
│   ├── advance-pay-settings.json
│   ├── lending-settings.json
│   └── meridian-link-settings.json
├── marketing/
│   ├── cardlytics-settings.json
│   ├── marketing-settings.json
│   └── segmint-settings.json
├── mobile/
│   ├── mobile-alerts-settings.json
│   ├── mobile-security-settings.json
│   ├── mobile-settings.json
│   ├── boku-settings.json
│   └── quick-access-settings.json
├── monitoring/
│   ├── audit-logging-settings.json
│   └── monitoring-settings.json
├── payments/
│   ├── payment-security-settings.json
│   ├── payment-settings.json
│   ├── payzur-settings.json
│   ├── person-payment-security-settings.json
│   ├── person-payment-settings.json
│   └── zelle-settings.json
├── profile/
│   ├── change-email-settings.json
│   ├── change-phone-settings.json
│   ├── profile-security-settings.json
│   └── profile-settings.json
├── rewards/
│   ├── checking-rewards-settings.json
│   └── rewards-settings.json
└── transfers/
    ├── ach-security-settings.json
    ├── ach-settings.json
    ├── ach-transaction-holds-settings.json
    ├── ach-transaction-notes-settings.json
    ├── connect-native-settings.json
    ├── connect-native-transfers-settings.json
    ├── transfer-limits-settings.json
    └── transfer-settings.json
```

Key Changes:
1. Removed `/core` directories and moved settings to parent level
2. Removed `/providers` directories and moved provider settings to feature level
3. Maintained feature-specific organization (e.g., `/security`, `/alerts`)
4. Kept consistent `-settings.json` naming pattern

The flattened structure is more straightforward while still maintaining logical grouping by feature. Would you like me to make any other adjustments to improve navigation?

## Progress Tracking

### Current Status
- Phase: Analysis Complete
- Next Step: Create detailed migration scripts for each duplicate set

### Completed Steps
- [x] Created initial plan
- [x] Identified duplicate settings and determined consolidation targets
- [x] Proposed new file structure and migration plan
- [x] Analyzed all JSON files for duplicates
- [x] Mapped all duplicates to legacy models
- [x] Determined consolidation target for each duplicate set

### Notes
- Primary data sources:
  - `workspace/model-analyzer/output/model_field_data.csv`
  - `workspace/legacy-analyzer/output/legacy_field_data.md`
