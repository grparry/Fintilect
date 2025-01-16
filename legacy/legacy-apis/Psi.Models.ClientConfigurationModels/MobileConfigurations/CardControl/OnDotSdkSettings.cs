namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class OnDotSdkSettings : SettingsBaseHelper
    {
        public OnDotSdkSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Mobile.CardControl.OnDotSdk.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.AndroidPublicKey")]
        public string AndroidPublicKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.IosPublicKey")]
        public string IosPublicKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.MultiUserModeEnabled ")]
        public bool MultiUserModeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.AppToken")]
        public string AppToken
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.FiToken")]
        public string FiToken
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.DeploymentToken")]
        public string DeploymentToken
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.EndpointUrl")]
        public string EndpointUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OnDotSdk.ConnectionSettings")]
        public string ConnectionSettings
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
