namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay.AddPayee
{
	public class AddPayee : SettingsBaseHelper
    {
	    public AddPayee(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.BillPay.AddPayee.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.AddPayee.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.AddPayee.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.AddPayee.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.AddPayee.IsAccountNumberRequired")]
        public bool IsAccountNumberRequired
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
