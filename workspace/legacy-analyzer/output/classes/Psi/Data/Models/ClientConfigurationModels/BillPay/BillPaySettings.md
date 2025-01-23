# BillPaySettings

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.BillPay`

**Source File:** `Psi.Models.ClientConfigurationModels/BillPay/BillPaySettings.cs`

## Class Summary

public class BillPaySettings
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class BillPaySettings
extends: SettingsBaseHelper
```

## Properties

### MinVersion: `double`

**Attributes:**
```csharp
[SettingKey("Billpay.BillPaySettings.MinVersion")]
```

### ShouldIgnoreLeadingZerosOnMicr: `bool`



**Attributes:**
```csharp
[SettingKey("Billpay.BillPaySettings.ShouldIgnoreLeadingZerosOnMicr")]
```

### DisplayNewMockUp: `bool`



**Attributes:**
```csharp
[Obsolete]
[SettingKey("Billpay.BillPaySettings.HomeBanking.DisplayNewMockUp")]
```

### UseMicrAsDraftAccountNumber: `bool`



**Attributes:**
```csharp
[SettingKey("Billpay.BillPaySettings.UseMicrAsDraftAccountNumber")]
```

### EnableMultiFundingAccount: `bool`



**Attributes:**
```csharp
[SettingKey("billpay.EnableMultiFundingAccount")]
```

### DefaultLeadDays: `int`



**Attributes:**
```csharp
[SettingKey("Billpay.DefaultLeadDays")]
```

### DeliverByDatesToCalculate: `int`



**Attributes:**
```csharp
[SettingKey("Billpay.DeliverByDatesToCalculate")]
```

### CalculateBillPayPaymentDatesMinVersion: `double`



**Attributes:**
```csharp
[SettingKey("Billpay.CalculateBillPayPaymentDates.MinVersion")]
```

### CalculateBillPayPaymentDatesEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.CalculateBillPayPaymentDates.Enabled")]
```

### GetPaymentOptions: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.GetPaymentOptions")]
```

### Enabled: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.BillPayEnabled")]
```

### CanChangeBillPayAmount: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.CanChangeBillPayAmount")]
```

### CanChangeBillPayDeliverByDate: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.CanChangeBillPayDeliverByDate")]
```

### ShowHelpTab: `bool`



**Attributes:**
```csharp
[SettingKey("Billpay.ShowHelpTab")]
```

### IpayCanUpdateSubscriberAddress: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.IpayCanUpdateSubscriberAddress")]
```

### ShouldSetIpayLoginIdAsGuid: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.ShouldSetIpayLoginIdAsGuid")]
```

### X_AppBolBillPayFlagNumber: `string`



**Attributes:**
```csharp
[SettingKey("X.App.HBBOL.BillPayFlagNumber")]
```

### BillPayAccounts: `List<string>`



**Attributes:**
```csharp
[SettingKey("X.App.HBBOL.BillPayAccounts")]
```

### ShouldShowAccountSelector: `bool`



**Attributes:**
```csharp
[SettingKey("BillPay.BusinessBillPay.ShouldShowAccountSelector")]
```

### IpayBusinessBillPayUrl: `string`



**Attributes:**
```csharp
[SettingKey("BillPay.Ipay.BusinessBillPayUrl")]
```

### IpayMaxReceivedMessageSize: `int`



**Attributes:**
```csharp
[SettingKey("BillPay.Ipay.IpayMaxReceivedMessageSize")]
```

### IpayMaxBufferSize: `int`



**Attributes:**
```csharp
[SettingKey("BillPay.Ipay.IpayMaxBufferSize")]
```

### RecurringBillPay: `RecurringBillPay`



### OutOfBand: `OutOfBand`



### GoodFunds: `GoodFunds`



### BillPay2: `BillPay2`



### CheckFree: `CheckFree`



### Help: `Help`



### Metavante: `Metavante`



### BillMatrix: `BillMatrix`



### Symmetry: `SymmetryBillPay`


