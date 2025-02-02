# AchTransfer

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.Account`

## Class Summary

public class AchTransfer
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class AchTransfer
extends: SettingsBaseHelper
```

## Properties

### SameDayCutoffInLocalTime: `string`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.SameDayCutoffInLocalTime")]
```

### NextDayCutoffInLocalTime: `string`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.NextDayCutoffInLocalTime")]
```

### ShowCurrentAvailable: `bool`

**Attributes:**
```csharp
[SettingKey("Transfers.Messages.ShowCurrentAvailable")]
```

### ShowCurrentBalance: `bool`

**Attributes:**
```csharp
[SettingKey("Transfers.Messages.ShowCurrentBalance")]
```

### ServiceIdentifier: `Guid`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.TransactionServiceIdentifier")]
```

### CheckDepositPermissionEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.CheckDepositPermission.Enabled")]
```

### CheckDepositPermissionDisableTransfersWithoutPermission: `bool`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.CheckDepositPermission.DisableTransfersWithoutPermission")]
```

### AdminReadTransfersToProcessFromDatabase: `bool`

**Attributes:**
```csharp
[SettingKey("Transfers.Ach.Admin.ReadTransfersToProcessFromDatabase")]
```

### UsaEpay: `UsaEpay`

### PlaceHoldsOnAchTransactions: `PlaceHoldsOnAchTransactions`

### UseInformationalNoteInsteadOfTransferForAchTransactions: `UseInformationalNoteInsteadOfTransferForAchTransactions`
