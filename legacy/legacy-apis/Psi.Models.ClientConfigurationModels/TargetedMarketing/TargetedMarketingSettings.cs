namespace Psi.Data.Models.ClientConfigurationModels.TargetedMarketing
{
    public class TargetedMarketingSettings : SettingsBaseHelper
    {
        public TargetedMarketingSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("TargetedMarketing.TargetedMarketingSettings.ImageDeliveryServiceClassName")]
        public string ImageDeliveryServiceClassName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TargetedMarketing.TargetedMarketingSettings.PSITargetedMarketingWebAPIAddress")]
        public string PSITargetedMarketingWebAPIAddress
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TargetedMarketingSettings.EnableTargetedMarketing")]
        public bool EnableTargetedMarketing
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TargetedMarketingSettings.GetImageUrl")]
        public string GetImageUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TargetedMarketingSettings.CanMapMemberNumberToEAgreementNumber")]
        public bool CanMapMemberNumberToEAgreementNumber
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TargetedMarketingSettings.CorsAllowedOrigin")]
        public string CorsAllowedOrigin
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}


