using System;

namespace Psi.Data.Models.ClientConfigurationModels.CreditCards
{
    public class GoToMyCard : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;
        
        public GoToMyCard(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("GoToMyCard.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("GoToMyCard.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.GoToMyCard.Url")]
        public Uri Url
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? null: new Uri(value);
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.GoToMyCard.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.GoToMyCard.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("GoToMyCard.ServiceUrl")]
        public string ServiceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("GoToMyCard.CertificateName")]
        public string CertificateName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("GoToMyCard.CuNumber")]
        public string CuNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("GoToMyCard.OpenInNewWindow")]
        public bool OpenInNewWindow
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("3AD62E4A-0154-43A2-81D5-6E12846A3DA5")));
            set => _authentication = value;
        }
    }
}