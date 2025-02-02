# ScheduledTransfers

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.Account`

## Class Summary

public class ScheduledTransfers
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class ScheduledTransfers
extends: SettingsBaseHelper
```

## Properties

### Enabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.Enabled")]
```

### MinVersion: `double`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.MinVersion")]
```

### MonthsToCalculate: `int`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.MonthsToCalculate")]
```

### AdjustForWeekendsAndHolidays: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.AdjustForWeekendsAndHolidays")]
```

### AddDayForWeekendOrHoliday: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.AddDayForWeekendOrHoliday")]
```

### MaxTransferAttempts: `int`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.MaxTransferAttempts")]
```

### HomeBankingBillPayAccounts: `string`

**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.BillPayAccounts")]
```

### TransferAtLeastMinPaymentForLoans: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.TransferAtLeastMinPaymentForLoans")]
```

### TransferAtLeastMinPaymentForCreditCards: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.TransferAtLeastMinPaymentForCreditCards")]
```

### ContinueIfMinPaymentCheckFails: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ContinueIfMinPaymentCheckFails")]
```

### DefaultSuffixMask: `string`

**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.DefaultSuffixMask")]
```

### ShouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.UseAmountDueInsteadOfPaymentForMinimumHelocPayment")]
```

### StartDateTimePickerHourOffset: `int`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.StartDateTimePickerHourOffset")]
```

### LastDayOfMonthSchedulingEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.LastDayOfMonthSchedulingEnabled")]
```

### CoreErrorCodeToTransferResultMappings: `Dictionary<string, ScheduledTransferResult>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.CoreErrorCodeToTransferResultMappings")]
```

### CoreErrorCodeToTransferResultMappingEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.CoreErrorCodeToTransferResultMappingEnabled")]
```

### UseScheduledRunTimeAsEffectiveDateEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.UseScheduledRunTimeAsEffectiveDate.Enabled")]
```

### CheckCoreForDuplicateTransactionsEnabled: `bool`

**Attributes:**
```csharp
[Obsolete("This isn't used right now. A future project may be completed that uses this setting.")]
[SettingKey("ScheduledTransfers.CheckCoreForDuplicateTransactions.Enabled")]
```

### ShouldSendSecureMessageWhenDuplicateIsDetected: `bool`

**Attributes:**
```csharp
[Obsolete("This isn't used right now. A future project may be completed that uses this setting.")]
[SettingKey("ScheduledTransfers.CheckCoreForDuplicateTransactions.ShouldSendSecureMessageWhenDuplicateIsDetected")]
```

### ReadOnlyEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ReadOnly.Enabled")]
```

### ValidateProcessingIndicatorsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ValidateProcessingIndicatorsEnabled")]
```

### ShouldSendSecureMessageWhenManualReviewIsRequired: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ShouldSendSecureMessageWhenManualReviewIsRequired")]
```

### ManualReviewRequiredSecureMessageCategory: `string`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ManualReviewRequiredSecureMessageCategory")]
```

### ManualReviewRequiredSecureMessageSenderMembershipUserId: `int`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ManualReviewRequiredSecureMessageSenderMembershipUserId")]
```

### ShouldStoreIdentifierForCreditCards: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ShouldStoreIdentifierForCreditCards")]
```

### InternalTransfersRecurrenceTypes: `List<RecurrenceType>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.InternalTransfers.RecurrenceTypes")]
```

### ExternalTransfersRecurrenceTypes: `List<RecurrenceType>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ExternalTransfers.RecurrenceTypes")]
```

### CreditCardTransfersRecurrenceTypes: `List<RecurrenceType>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.CreditCardTransfers.RecurrenceTypes")]
```

### EndOptions: `List<ScheduledTransferEndOption>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.EndOptions")]
```

### OnHostEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.OnHost.Enabled")]
```

### OnHostMinVersion: `double`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.OnHost.MinVersion")]
```

### AutomaticLoanPaymentsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.AutomaticLoanPayments.Enabled")]
```

### AutomaticLoanPaymentsLoanCategories: `List<string>`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.AutomaticLoanPayments.LoanCategories")]
```

### ShouldUseNewUserInterface: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.ShouldUseNewUserInterface")]
```

### CanSkipTransferOccurrence: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.CanSkipTransferOccurrence")]
```

### CanEditTransferAmount: `bool`

**Attributes:**
```csharp
[SettingKey("ScheduledTransfers.CanEditTransferAmount")]
```
