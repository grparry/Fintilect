# BusinessBanking

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.BusinessBanking`

**Source File:** `Psi.Models.ClientConfigurationModels/BusinessBanking/BusinessBanking.cs`

## Class Summary

public class BusinessBanking
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class BusinessBanking
extends: SettingsBaseHelper
```

## Properties

### AccountSelectorEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("BusinessBanking.AccountSelector.Enabled")]
```

### ShouldBlockLoginForMasterUsers: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.ShouldBlockLoginForMasterUsers")]
```

### ShouldDisableUpdateUserInfoForMasterUsers: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.Admin.ShouldDisableUpdateUserInfoForMasterUsers")]
```

### SubUsersCanEditContactInfo: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUsersCanEditContactInfo")]
```

### DeleteSubUsersEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.DeleteSubUsers.Enabled")]
```

### HideDisabledSubUsersEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.HideDisabledSubUsers.Enabled")]
```

### ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDisabled")]
```

### AddSubUserAddressAndPhoneNumberRequired: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.AddSubUser.AddressAndPhoneNumberRequired")]
```

### CreateSubUserOnCoreEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.AddSubUser.CreateSubUserOnCore.Enabled")]
```

### FilterAvailableFeaturesEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.FilterAvailableFeatures.Enabled")]
```

### SubUserAvailableFeatures: `Dictionary<TieredAccessFeature, bool>`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUser.AvailableFeatures")]
```

### ShouldSetDisclosureAcceptanceOnCore: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUser.ShouldSetDisclosureAcceptanceOnCore")]
```

### ShouldAcceptDisclosureWhenCreated: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUser.ShouldAcceptDisclosureWhenCreated")]
```

### ShouldUseMasterAccountForMobileDeposit: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUser.ShouldUseMasterAccountForMobileDeposit")]
```

### EnableDailyLoginRestrictions: `bool`



**Attributes:**
```csharp
[SettingKey("BusinessBanking.SubUser.EnableDailyLoginRestrictions")]
```
