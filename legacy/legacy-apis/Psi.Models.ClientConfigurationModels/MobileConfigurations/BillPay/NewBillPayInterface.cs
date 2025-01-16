namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class NewBillPayInterface : SettingsBaseHelper
    {
        public NewBillPayInterface(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.BillPay.NewBillPayInterface.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.NewBillPayInterface.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.NewBillPayInterface.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}