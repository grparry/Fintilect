# CardControl

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl`

**Source File:** `Psi.Models.ClientConfigurationModels/MobileConfigurations/CardControl/CardControl.cs`

## Class Summary

public class CardControl
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class CardControl
extends: SettingsBaseHelper
```

## Properties

### OndotDxSettings: `OndotDxSettings`

### OnDotSdk: `OnDotSdkSettings`

### Locations: `CardControlLocations`

### CreditCard: `CreditCardSettings`

### DebitCard: `DebitCardSettings`

### LostOrStolenCard: `LostOrStolenCardSettings`

### MinimumVersion: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.MinimumVersion")]
```

### MinimumAndroidVersion: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.MinimumAndroidVersion")]
```

### MinimumIosVersion: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.MinimumIosVersion")]
```

### Enabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Enabled")]
```

### SpendingLimitsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.SpendingLimitsEnabled")]
```

### TransactionTypesEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.TransactionTypesEnabled")]
```

### ManagePermissionsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ManagePermissionsEnabled")]
```

### UserDeviceSetupEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.UserDeviceSetupEnabled")]
```

### AlertPreferencesEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AlertPreferencesEnabled")]
```

### MerchantTypesEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.MerchantTypesEnabled")]
```

### CardOffFixedTimeEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.CardOffFixedTimeEnabled")]
```

### CardOffUserDefinedTimeEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.CardOffUserDefinedTimeEnabled")]
```

### LargeTransactionControlEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.LargeTransactionControlEnabled")]
```

### InternationalTransactionControlEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.InternationalTransactionControlEnabled")]
```

### MerchantStateListControlEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.MerchantStateListControlEnabled")]
```

### InternetTransactionControlEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.InternetTransactionControlEnabled")]
```

### TimeOfDayRangeControlEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.TimeOfDayRangeControlEnabled")]
```

### ActiveCardStateCommonCode: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ActiveCardStateCommonCode")]
```

### ClosedCardStateCommonCode: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ClosedCardStateCommonCode")]
```

### RestrictedCardStateCommonCode: `string`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.RestrictedCardStateCommonCode")]
```

### CardControlTypeIdentifierByCategory: `List<CardControlTypeIdentifierByCategorySetting>`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.CardControlTypeIdentifierByCategory")]
```

### Vendor: `CardControlVendor`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Vendor")]
```

### DebitCardVendor: `CardControlVendor`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.DebitCardVendor")]
```

### CreditCardVendor: `CardControlVendor`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.CreditCardVendor")]
```

### DeleteClosedCards: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.DeleteClosedCards")]
```

### AddPendingCards: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AddPendingCards")]
```

### HideCardNicknames: `bool`

**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.HideCardNicknames")]
```

### PscuClientID: `long`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.PscuClientID")]
```

### CorelationLockReasonSerial: `string`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.CorelationLockReasonSerial")]
```

### Authentication: `Authentication.Authentication`



### IgnoreReferenceIds: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.IgnoreReferenceIds")]
```

### HashKey: `string`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.HashKey")]
```

### ShowRegisterCardOption: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ShowRegisterCardOption")]
```

### ConnectNativeEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ConnectNative.Enabled")]
```

### MemberControlOfAlertsEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.MemberControlOfAlertsEnabled")]
```

### AllAlertsOnOffEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.AllAlertsOnOffEnabled")]
```

### SpendingLimitAlertsEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.SpendingLimitAlertsEnabled")]
```

### TransactionAmountAlertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.TransactionAmountAlertEnabled")]
```

### MonthlyTransactionAmountAlertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.MonthlyTransactionAmountAlertEnabled")]
```

### AlertsDeliveryTransactionAmountAlertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AlertsDelivery.TransactionAmountAlertEnabled")]
```

### AlertsDeliveryAnyTransactionAlertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AlertsDelivery.AnyTransactionAlertEnabled")]
```

### AlertsDeliveryShouldUseMessageText: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AlertsDelivery.ShouldUseMessageText")]
```

### AlertsDeliveryMonthlySpendingAlertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AlertsDelivery.MonthlySpendingAlertEnabled")]
```

### ReplaceCardEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ReplaceCardEnabled")]
```

### SymitarDebitCardTypeIds: `string`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Symitar.DebitCardTypeIds")]
```

### AtmCashWithdrawalLimitEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AtmCashWithdrawal.LimitEnabled")]
```

### AtmCashWithdrawalMaximumAmount: `long`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AtmCashWithdrawal.MaximumAmount")]
```

### AtmCashWithdrawalLimitFeeAmount: `long`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.AtmCashWithdrawal.LimitFeeAmount")]
```

### RequestTypesRequiringCredentials: `List<string>`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.RequestTypesRequiringCredentials")]
```

### SendAmountAsDollars: `bool`



**Attributes:**
```csharp
[SettingKey("Moblie.CardControl.Ondot.SendAmountAsDollars")]
```

### ShouldShowMemberNameFromCardRecord: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.ShouldShowMemberNameFromCardRecord")]
```

### UseCardNumberToDeriveSubscriptionAlerts: `bool`



**Attributes:**
```csharp
[SettingKey("Mobile.CardControl.Alerts.UseCardNumberToDeriveSubscriptionAlerts")]
```
