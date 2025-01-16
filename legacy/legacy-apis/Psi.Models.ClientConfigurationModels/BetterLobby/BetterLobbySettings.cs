using System;

namespace Psi.Data.Models.ClientConfigurationModels.BetterLobby
{
    public class BetterLobbySettings : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;
        
        public BetterLobbySettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("BetterLobby.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BetterLobby.SsoBaseUrl")]
        public Uri SsoBaseUrl
        {
            get => new Uri(GetValue());
            set => SetValue(value);
        }

        [SettingKey("BetterLobby.ClientId")]
        public string ClientId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BetterLobby.SecretKey")]
        public string SecretKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BetterLobby.KeySize")]
        public int KeySize
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("BetterLobby.DerivationIterations")]
        public int DerivationIterations
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("8ECE3411-6CC2-4AC6-93A2-4670F3DD4261")));
            set => _authentication = value;
        }
    }
}