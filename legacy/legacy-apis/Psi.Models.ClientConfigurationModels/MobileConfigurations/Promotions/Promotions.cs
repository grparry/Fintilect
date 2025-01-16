namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Promotions
{
    public class PromoChannel : SettingsBaseHelper
    {
        public PromoChannel(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Promotions.PromoChannel.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Promotions.PromoChannel.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Promotions.PromoChannel.MobileSmall")]
        public int MobileSmall
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Promotions.PromoChannel.MobileMedium")]
        public int MobileMedium
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Promotions.PromoChannel.MobileLarge")]
        public int MobileLarge
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
    }
}