# Model Alignment Plan

## Goals
- [ ] Align models in `cbp-admin/src/api/models` with legacy code in `legacy/legacy-apis/Psi.Models.ClientConfigurationModels`
- [x] Implement optimal JSON file structure for models directory

## Phase 1: Recommended Final Directory Structure

### Directory Creation
- [x] Create base directory: `src/api/models/`
- [x] Create feature directories:
  - [x] `account/`
  - [x] `admin/`
  - [x] `cards/`
  - [x] `compliance/`
  - [x] `documents/`
  - [x] `financial/`
  - [x] `lending/`
  - [x] `marketing/`
  - [x] `mobile/`
  - [x] `monitoring/`
  - [x] `payments/`
  - [x] `profile/`
  - [x] `rewards/`
  - [x] `transfers/`

### Migration Steps
For each file in the mapping:
- [x] Verify original file exists
- [x] Create new directory structure if needed
- [x] Copy file to new location, changing name if needed
- [x] Validate copied file
- [x] Update any references to the file in its old location, so those references point to the file in its new location
- [x] Remove original file after validation

### Phase 1 Reference: Files that will be renamed and not just moved

#### ACH Files
- [x] `services/ach/transactions/place-holds.json` → `transfers/ach-transaction-holds-settings.json`
- [x] `services/ach/transactions/transaction-notes.json` → `transfers/ach-transaction-notes-settings.json`
- [x] `services/ach/security/ach-security.json` → `transfers/ach-security-settings.json`

#### Security Files
- [x] `security/account/security.json` → `account/account-security-settings.json`
- [x] `security/admin/authentication.json` → `admin/security-authentication-settings.json`
- [x] `security/cards/security.json` → `cards/card-security-settings.json`
- [x] `security/documents/security.json` → `documents/document-security-settings.json`
- [x] `security/mobile/security.json` → `mobile/mobile-security-settings.json`
- [x] `security/payments/security.json` → `payments/payment-security-settings.json`
- [x] `security/profile/security.json` → `profile/profile-security-settings.json`

#### Provider Files
- [x] `providers/estatements/epl/estatements.json` → `documents/epl-estatements-settings.json`
- [x] `providers/estatements/info-image/estatements.json` → `documents/info-image-estatements-settings.json`
- [x] `providers/estatements/synergy/estatements.json` → `documents/synergy-estatements-settings.json`
- [x] `providers/ondot/dx-settings.json` → `cards/ondot-dx-settings.json`
- [x] `providers/ondot/sdk-settings.json` → `cards/ondot-sdk-settings.json`

#### Core Files
- [x] `core/card-management.json` → `cards/card-management-settings.json`
- [x] `core/connect-native/transfers.json` → `transfers/connect-native-transfers-settings.json`
- [x] `core/transfer-limits.json` → `transfers/transfer-limits-settings.json`
- [x] `core/audit/logging.json` → `monitoring/audit-logging-settings.json`
- [x] `core/notifications/alerts.json` → `mobile/mobile-alerts-settings.json`

#### Feature Files
- [x] `cards/alerts/card-alerts.json` → `cards/card-alerts-settings.json`
- [x] `cards/control/card-control.json` → `cards/card-control-settings.json`
- [x] `cards/design/card-design.json` → `cards/card-design-settings.json`
- [x] `cards/limits/card-limits.json` → `cards/card-limits-settings.json`
- [x] `cards/pin/card-pin.json` → `cards/card-pin-settings.json`
- [x] `cards/replacement/card-replacement.json` → `cards/card-replacement-settings.json`
- [x] `documents/check-images/check-images.json` → `documents/check-images-settings.json`
- [x] `lending/payday/advance-pay.json` → `lending/advance-pay-settings.json`

### Final Directory Structure
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
├── transfers/
|   ├── ach-security-settings.json
|   ├── ach-settings.json
|   ├── ach-transaction-holds-settings.json
|   ├── ach-transaction-notes-settings.json
|   ├── connect-native-settings.json
|   ├── connect-native-transfers-settings.json
|   ├── transfer-limits-settings.json
|   └── transfer-settings.json
└── security/
    └── authentication-security-settings.json
```

## Phase 2: Settings Consolidation

### 1. ADA Compliance Settings
- [x] Consolidate files:
  - **Consolidation Sources**: 
    - `src/api/models.old/compliance/compliance-settings.json`
  - **Consolidation Target**: `src/api/models/compliance/ada-compliance-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ADACompliance.ADAComplianceSettings`
  - **Legacy Settings Key**: `ADAComplianceSettings.*`

### 2. Cross Account Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/account/house-holding-settings.json`
  - **Consolidation Target**: `src/api/models/account/cross-account-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Account.CrossAccountSettings`
  - **Legacy Settings Key**: `Account.CrossAccount.*`

### 3. Card Management Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/cards/pin/card-pin-settings.json`
    - `src/api/models.old/cards/replacement/card-replacement-settings.json`
  - **Consolidation Target**: `src/api/models/cards/card-management-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Cards.*`
  - **Legacy Settings Key**: `CardManagement.*`

### 4. Cardlytics Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/marketing/providers/cardlytics.json`
  - **Consolidation Target**: `src/api/models/marketing/cardlytics-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.Cardlytics.CardlyticsSettings`
  - **Legacy Settings Key**: `Cardlytics.*`

### 5. Check Images Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/services/check-images/check-images-settings.json`
  - **Consolidation Target**: `src/api/models/documents/check-images-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.CheckImages.CheckImages`
  - **Legacy Settings Key**: `CheckImages.*`

### 6. ConnectNative Transfers Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/native/connect-native-transfers.json`
  - **Consolidation Target**: `src/api/models/transfers/connect-native-transfers-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ConnectNative.ConnectNativeTransfers`
  - **Legacy Settings Key**: `ConnectNative.*`

### 7. InfoImage eStatements Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/documents/providers/info-image-estatements.json`
  - **Consolidation Target**: `src/api/models/documents/info-image-estatements-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.InfoImageEstatements.InfoImageEstatementsSettings`
  - **Legacy Settings Key**: `InfoImageEstatements.*`

### 8. Synergy eStatements Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/documents/providers/synergy.json`
  - **Consolidation Target**: `src/api/models/documents/synergy-estatements-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.SynergyEstatements.SynergyEstatementsSettings`
  - **Legacy Settings Key**: `SynergyEstatements.*`

### 9. MeridianLink SSO Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/loans/sso/meridian-link.json`
    - `src/api/models.old/integrations/meridian-link/sso-settings.json`
  - **Consolidation Target**: `src/api/models/lending/meridian-link-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.MeridianLinkSso.MeridianLinkSsoSettings`
  - **Legacy Settings Key**: `MeridianLinkSso.*`

### 10. SegMint Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/marketing/providers/segmint.json`
    - `src/api/models.old/services/segmint/segmint-settings.json`
  - **Consolidation Target**: `src/api/models/marketing/segmint-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.SegMint.SegMintSettings`
  - **Legacy Settings Key**: `SegMint.*`

### 11. Card Alerts Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/cards/alerts/card-alerts.json`
    - `src/api/models.old/mobile/alerts/alerts.json`
  - **Consolidation Target**: `src/api/models/cards/card-alerts-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardAlerts`
  - **Legacy Settings Key**: `Mobile.CardAlerts.*`

### 12. Card Control Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/cards/security/card-security-settings.json`
    - `src/api/models.old/mobile/card-control/card-control.json`
  - **Consolidation Target**: `src/api/models/cards/card-control-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.CardControl`
  - **Legacy Settings Key**: `Mobile.CardControl.*`

### 13. Checking Rewards Settings
- [x] Consolidate files:
  - **Consolidation Sources**: 
    - `src/api/models.old/financial-features/checking-rewards.json`
  - **Consolidation Target**: `src/api/models/rewards/checking-rewards-settings.json`
  - **Legacy Model**: `Psi.Models.ClientConfigurationModels.MobileConfigurations.Deals.CheckingRewards.CheckingRewards`
  - **Legacy Settings Key**: `Account.Attributes.CheckingRewards.*`

### 14. Security Settings
- [x] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/security/security-authentication.json`
    - `src/api/models.old/security/security-questions.json`
  - **Consolidation Target**: `src/api/models/security/security-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.QuickAccess.QuickAccessPin`
  - **Legacy Settings Key**: `Mobile.Security.QuickAccess.*`

### 15. Phone Number Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/profile/phone-number-settings.json`
  - **Consolidation Target**: `src/api/models/profile/change-phone-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation.ChangePhoneNumbers`
  - **Legacy Settings Key**: `ChangePhone.*`

### 16. Person Payment Security Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/payments/person-payments-settings.json`
  - **Consolidation Target**: `src/api/models/payments/person-payment-security-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PersonPaymentSecuritySettings`
  - **Legacy Settings Key**: `PersonPaymentSecurity.*`

### 17. Advance Pay Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/services/payday-loans/advance-pay-settings.json`
  - **Consolidation Target**: `src/api/models/lending/advance-pay-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.PaydayLoans.AdvancePay`
  - **Legacy Settings Key**: `PaydayLoans.AdvancePay.*`

### 18. ACH Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/ach/place-holds-on-ach-transactions.json`
    - `src/api/models.old/ach/ach-transaction-notes.json`
    - `src/api/models.old/ach/ach-settings.json`
    - `src/api/models.old/financial-cores/transaction-settings.json`
  - **Consolidation Target**: `src/api/models/transfers/ach-settings.json`
  - **Legacy Models**: 
    - `Psi.Data.Models.ClientConfigurationModels.Account.AchTransfer`
    - `Psi.Data.Models.ClientConfigurationModels.Account.AchTransferLimits`
  - **Legacy Settings Key**: `Admin.ACH.*`

### 19. Transfer Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/account/transfers.json`
    - `src/api/models.old/financial-cores/transfer-settings.json`
    - `src/api/models.old/account/transfer-limits.json`
  - **Consolidation Target**: `src/api/models/transfers/transfer-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Account.Transfers`
  - **Legacy Settings Key**: `Admin.Transfer.*`

### 20. Connect Native Transfer Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/native/connect-native-transfers.json`
  - **Consolidation Target**: `src/api/models/transfers/connect-native-transfers-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.ConnectNative.ConnectNativeTransfers`
  - **Legacy Settings Key**: `ConnectNative.Transfers.*`

### 21. Member Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/admin/member-settings.json`
  - **Consolidation Target**: `src/api/models/admin/membership-settings.json`
  - **Legacy Model**: `Psi.Data.Models.ClientConfigurationModels.Membership.Flags`
  - **Legacy Settings Key**: `Membership.*`

### 22. Audit Settings
- [ ] Consolidate files:
  - **Consolidation Sources**:
    - `src/api/models.old/monitoring/audit-settings.json`
  - **Consolidation Target**: `src/api/models/monitoring/audit-logging-settings.json`
  - **Legacy Models**: 
    - `Psi.Data.Models.ClientConfigurationModels.Admin.AuditLogs`
  - **Legacy Settings Key**: `Admin.AuditLogs.*`

## Notes
- Primary data sources:
  - `workspace/model-analyzer/output/model_field_data.csv`
  - `workspace/legacy-analyzer/output/legacy_field_data.md`
