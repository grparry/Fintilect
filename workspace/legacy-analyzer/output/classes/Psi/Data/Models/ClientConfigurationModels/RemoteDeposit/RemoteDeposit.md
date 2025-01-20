# RemoteDeposit

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.RemoteDeposit`

**Source File:** `Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs`

## Class Summary

public class RemoteDeposit

## Class Metadata

```typescript
public class RemoteDeposit
```

## Properties

### Ensenta

```typescript
type: Ensenta
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

### Vertifi

```typescript
type: Vertifi
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

### ProfitStars

```typescript
type: ProfitStars
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

### RemoteDepositServiceType

```typescript
type: [RemoteDepositServiceType](../../../RemoteDepositServiceType.md)
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.ServiceName")]
```

### ShouldDelayBeforeStatusUpdate

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.StatusUpdate.ShouldDelayBeforeStatusUpdate")]
```

### ShouldCheckReservedCheckingAccountSuffix

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.ShouldCheckReservedCheckingAccountSuffix")]
```

### ReservedCheckingAccountSuffix

```typescript
type: number
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.ReservedCheckingAccountSuffix")]
```

### DepositIntoAccountTypes

```typescript
type: string
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.DepositIntoAccountTypes")]
```

### RemoteDepositAccountFormat

```typescript
type: RemoteDepositAccountFormat
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.RemoteDepositAccountFormat")]
```

### ShouldShowLinksInEmergeBrowser

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.ShouldShowLinksInEmergeBrowser")]
```

### RelationshipCodeDepositLimitsEnabled

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.RelationshipCodeDepositLimits.Enabled")]
```

### List

```typescript
type: RelationshipCodeDepositLimits
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.RelationshipCodeDepositLimits")]
```

### RelationshipCodeSaveHoldInformationEnabled

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.RelationshipCode.SaveHoldInformationEnabled")]
```

### RelationshipCodeDetermineReleaseDateByBusinessDays

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.RelationshipCode.DetermineReleaseDateByBusinessDays")]
```

### AlternateCheckHoldsEnabled

```typescript
type: boolean
sourceFile: /Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels/RemoteDeposit/RemoteDeposit.cs
visibility: public
modifier: readonly
```

**Attributes:**
```csharp
[SettingKey("RemoteDeposit.AlternateCheckHolds.Enabled")]
```

## Enums

### RemoteDepositServiceType

```typescript
    None = 0
    Ensenta = 1
    Vertifi = 2
    ProfitStars = 3
```
