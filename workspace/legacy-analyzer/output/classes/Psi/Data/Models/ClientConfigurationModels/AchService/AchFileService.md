# AchFileService

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.AchService`

**Source File:** `Psi.Models.ClientConfigurationModels/AchService/AchFileService.cs`

## Class Summary

public class AchFileService
implements: IAchFileServiceConfig
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class AchFileService
implements: IAchFileServiceConfig
extends: SettingsBaseHelper
```

## Properties

### IsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.IsEnabled")]
```

### MinVersion: `double`

**Attributes:**
```csharp
[SettingKey("AchFileService.MinVersion")]
```

### IsLoggingEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.IsLoggingEnabled")]
```

### LoggingDirectory: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.LoggingDirectory")]
```

### LoggingFileName: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.LoggingFileName")]
```

### DataSource: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.DataSource")]
```

### InitialCatalog: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.InitialCatalog")]
```

### DatabaseUserId: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.DatabaseUserId")]
```

### DatabasePassword: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.DatabasePassword")]
```

### RecordTerminator: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.RecordTerminator")]
```

### RunOnDemand: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.RunOnDemand")]
```

### ProcessWorkDays: `int`

**Attributes:**
```csharp
[SettingKey("AchFileService.ProcessWorkDays")]
```

### CutoffTime: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.CutoffTime")]
```

### AchFileConfigId: `int`

**Attributes:**
```csharp
[SettingKey("AchFileService.ACHFileConfigId")]
```

### SkipGlAccountRecords: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.SkipGLAccountRecords")]
```

### PadFileWithExtraLines: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.PadFileWithExtraLines")]
```

### ServiceName: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.ServiceName")]
```

### RunTime: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.RunTime")]
```

### MonitorJobStatus: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.MonitorJobStatus")]
```

### DecryptKey: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.DecryptKey")]
```

### ValidCharsForName: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.ValidCharsForName")]
```

### UseCuCompanyIdForFileHeader: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.UseCuCompanyIdForFileHeader")]
```

### UseWEBcodeInsteadOfPPDcode: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.UseWEBcodeInsteadOfPPDcode")]
```

### ExternalTransfersBypassSettlementAccountForLoansEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.ExternalTransfers.BypassSettlementAccountForLoansEnabled")]
```

### ExternalTransfersBypassSettlementAccountLoanTypes: `List<string>`

**Attributes:**
```csharp
[SettingKey("AchFileService.ExternalTransfers.BypassSettlementAccountLoanTypes")]
```

### UseSeparateInboundSettlementAccountEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("AchFileService.UseSeparateInboundSettlementAccountEnabled")]
```

### InboundSettlementAccount: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.InboundSettlementAccount")]
```

### InboundSettlementAccountSuffix: `string`

**Attributes:**
```csharp
[SettingKey("AchFileService.InboundSettlementAccountSuffix")]
```
