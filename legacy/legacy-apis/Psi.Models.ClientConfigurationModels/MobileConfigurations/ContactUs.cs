namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class ContactUs : SettingsBaseHelper
    {
        public ContactUs(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.ContactUs.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.ContactUs.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.ContactUs.ShouldUseNewContactUs")]
        public bool ShouldUseNewContactUs
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}

