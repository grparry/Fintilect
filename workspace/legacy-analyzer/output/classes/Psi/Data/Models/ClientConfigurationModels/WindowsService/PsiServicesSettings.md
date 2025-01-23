# PsiServicesSettings

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.WindowsService`

**Source File:** `Psi.Models.ClientConfigurationModels/WindowsService/PsiServicesSettings.cs`

## Class Summary

public class PsiServicesSettings
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class PsiServicesSettings
extends: SettingsBaseHelper
```

## Properties

### HostedServices: `string`



**Attributes:**
```csharp
[SettingKey("PsiServices.HostedServices.Configuration")]
```

### DataFeedProcessing: `string`



**Attributes:**
```csharp
[SettingKey("PsiServices.DataFeedProcessing.Configuration")]
```

### ScheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds: `bool`



**Attributes:**
```csharp
[SettingKey("PsiServices.ScheduledTransferService.ShouldCheckNextHourTransfersForInsufficientFunds")]
```

### ScheduledTransfersMaxDegreeOfParallelism: `int`



**Attributes:**
```csharp
[SettingKey("PsiServices.ScheduledTransferService.MaxDegreeOfParallelism")]
```

### ScheduledTransfersBatchSize: `int`



**Attributes:**
```csharp
[SettingKey("PsiServices.ScheduledTransferService.BatchSize")]
```

### ScheduledTransfersValidTransferDaysRange: `int`



**Attributes:**
```csharp
[SettingKey("PsiServices.ScheduledTransferService.ValidTransferDaysRange")]
```
