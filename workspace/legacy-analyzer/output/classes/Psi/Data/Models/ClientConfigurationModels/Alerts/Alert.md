# Alert

**Namespace:** `Psi.Data.Models.ClientConfigurationModels.Alerts`

**Source File:** `Psi.Models.ClientConfigurationModels/Alerts/Alert.cs`

## Class Summary

public class Alert
extends: SettingsBaseHelper

## Class Metadata

```typescript
public class Alert
extends: SettingsBaseHelper
```

## Properties

### InactiveAccountsThresholdDayValues: `List<int>`

**Attributes:**
```csharp
[SettingKey("Alert.InactiveAccountsThresholdDayValues")]
```

### ScheduledAlertsEnabled: `bool`

**Attributes:**
```csharp
[SettingKey("Alert.ScheduledAlertsEnabled")]
```

### MinVersion: `double`

**Attributes:**
```csharp
[SettingKey("Alert.ScheduledAlerts.MinVersion")]
```

### CustomMessageAvailable: `bool`

**Attributes:**
```csharp
[SettingKey("Alert.CustomMessageAvailable")]
```

### MfaWhitelist: `string`

**Attributes:**
```csharp
[SettingKey("Alert.MfaWhitelist")]
```

### AvailableAccountCategoriesForAlerts: `List<string>`

**Attributes:**
```csharp
[SettingKey("Alert.AvailableAccountCategoriesForAlerts")]
```

### MemberCanReplyToUrgentAlertAfterLogin: `bool`

**Attributes:**
```csharp
[SettingKey("Alert.MemberCanReplyToUrgentAlertAfterLogin")]
```

### SetCurrentEmailAddressAsDefaultAlways: `bool`

**Attributes:**
```csharp
[SettingKey("Alert.SetCurrentEmailAddressAsDefaultAlways")]
```

### Alerts2Enabled: `bool`

**Attributes:**
```csharp
[SettingKey("X.App.HomeBanking.Alerts2Enabled")]
```

### AdHocAlerts: `AdHocAlerts`

### ExternalEvents: `ExternalEvents`

### MessagePumps: `MessagePumps`

### ShouldShowAlertsInboxLinkInTopNavigation: `bool`



**Attributes:**
```csharp
[SettingKey("Alert.ShowAlertsInboxLinkInTopNavigation")]
```

### ShouldShowAllCurrentEmailAddressUserDevices: `bool`



**Attributes:**
```csharp
[SettingKey("Alert.ShouldShowAllCurrentEmailAddressUserDevices")]
```

### DaysUntilOldDefaultDevicesShouldNotGetAlerts: `int`



**Attributes:**
```csharp
[SettingKey("X.App.HBBOL.AlertsToOldHostAddressDays")]
```

### SMSMessageMaxLength: `int`



**Attributes:**
```csharp
[SettingKey("Alert.SMSMessageMaxLength")]
```

### EmailMessageMaxLength: `int`



**Attributes:**
```csharp
[SettingKey("Alert.EmailMessageMaxLength")]
```

### OLBMessageMaxLength: `int`



**Attributes:**
```csharp
[SettingKey("Alert.OLBMessageMaxLength")]
```

### PushNotificationMessageMaxLength: `int`



**Attributes:**
```csharp
[SettingKey("Alert.PushNotificationMessageMaxLength")]
```

### DefaultDeliveryChannels: `List<string>`



**Attributes:**
```csharp
[SettingKey("Alerts.DefaultDeliveryChannels")]
```

### DatafeedAccountTypes: `List<DataFeedAccountType>`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.AccountTypes")]
```

### DataFeedBulkInsertEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.BulkInsertEnabled")]
```

### DataFeedBatchSize: `int`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.BatchSize")]
```

### DataFeedStopStoringTransactionFeedsEnabled: `bool`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.StopStoringTransactionFeedsEnabled")]
```

### DataFeedMetadataIdsToSave: `List<int>`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.MetadataIdsToSave")]
```

### DataFeedMetadataIdsThatDoNotGenerateAlerts: `List<int>`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.MetadataIdsThatDoNotGenerateAlerts")]
```

### DataFeedMaxDegreeOfParallelism: `int`



**Attributes:**
```csharp
[SettingKey("Alerts.DataFeed.MaxDegreeOfParallelism")]
```

### SmtpSettings: `AlertSmtpSettings`



**Attributes:**
```csharp
[SettingKey("X.App.HBBOL.Alerts2SmtpSettings")]
```
