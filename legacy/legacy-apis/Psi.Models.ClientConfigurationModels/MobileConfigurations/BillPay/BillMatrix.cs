namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class BillMatrix : SettingsBaseHelper
    {
        public BillMatrix(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        [SettingKey("Mobile.BillPay.BillMatrix.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("Mobile.BillPay.BillMatrix.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }
        [SettingKey("Mobile.BillPay.BillMatrix.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }
        [SettingKey("Mobile.BillPay.BillMatrix.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}