namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class RecurringBillPay : SettingsBaseHelper
    {
        public RecurringBillPay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.BillPay.RecurringBillPay.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.RecurringBillPay.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.RecurringBillPay.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.RecurringBillPay.AvailableRecurrenceTypes")]
        public string AvailableRecurrenceTypes
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
