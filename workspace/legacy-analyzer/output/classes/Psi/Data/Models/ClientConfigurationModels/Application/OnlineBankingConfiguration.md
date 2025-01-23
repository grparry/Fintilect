# OnlineBankingConfiguration

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.Application`

**Source File:** `Psi.Models.ClientConfigurationModels/Application/OnlineBankingConfiguration.cs`

## Class Summary

public class OnlineBankingConfiguration
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class OnlineBankingConfiguration
extends: SettingsBaseHelper
```

## Properties

### IgnoreCanRun: `bool`

**Attributes:**
```csharp
[SettingKey("Application.OnlineBanking.IgnoreCanRun")]
```

### Version: `double`

**Attributes:**
```csharp
[SettingKey("Application.OnlineBanking.Version")]
```

### FeeAccountsShareCategories: `List<string>`

**Attributes:**
```csharp
[SettingKey("Transfers.FeeAccounts.ShareCategories")]
```

### FeeAccountsLoanCategories: `List<string>`

**Attributes:**
```csharp
[SettingKey("Transfers.FeeAccounts.LoanCategories")]
```

### IsPersonCentricModeEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Application.OnlineBanking.IsPersonCentricModeEnabled")]
[SuppressMessage("ReSharper", "ExplicitCallerInfoArgument")]
```

### KeepAliveInterval: `int`



**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.KeepAliveInterval")]
```

### TimeoutWarningMessage: `string`



**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.TimeoutWarningMessage")]
```

### ForceLoginByAccountAlias: `bool`



**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.ForceLoginByAccountAlias")]
```

### AccountIDRegEx: `string`



**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.AccountIDRegEx")]
```
