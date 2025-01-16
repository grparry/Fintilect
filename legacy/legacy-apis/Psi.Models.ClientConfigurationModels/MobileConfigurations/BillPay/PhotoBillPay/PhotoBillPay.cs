namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay.PhotoBillPay
{
	public class PhotoBillPay : SettingsBaseHelper
    {
	    public PhotoBillPay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.BillPay.PhotoBillPay.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.PhotoBillPay.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.PhotoBillPay.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.PhotoBillPay.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
