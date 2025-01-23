# CardManagementSettings

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.CardManagement`

**Source File:** `Psi.Models.ClientConfigurationModels/CardManagement/CardManagementSettings.cs`

## Class Summary

public class CardManagementSettings
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class CardManagementSettings
extends: SettingsBaseHelper
```

## Properties

### IsPinChangeEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("CardManagement.IsPinChangeEnabled")]
```

### MinVersion: `double`

**Attributes:**
```csharp
[SettingKey("CardManagement.MinVersion")]
```

### CotsSettings: `CotsSettings`

**Attributes:**
```csharp
[SettingKey("CardManagement.COTS")]
```

### SupportedCardTypes: `IEnumerable<CardType>`

**Attributes:**
```csharp
[SettingKey("CardManagement.PinChange.SupportedCardTypes")]
```

### RemoveCvvValidationForTheseCardTypes: `IEnumerable<CardType>`

**Attributes:**
```csharp
[SettingKey("CardManagement.PinChange.RemoveCvvValidationForTheseCardTypes")]
```

### UnacceptablePins: `IEnumerable<string>`

**Attributes:**
```csharp
[SettingKey("CardManagement.PinChange.UnacceptablePins")]
```

### DnaShouldCallCoreForCardNumbers: `bool`

**Attributes:**
```csharp
[SettingKey("CardManagement.Dna.ShouldCallCoreForCardNumbers")]
```

### TransactionDisputeEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("CardManagement.TransactionDispute.Enabled")]
```
