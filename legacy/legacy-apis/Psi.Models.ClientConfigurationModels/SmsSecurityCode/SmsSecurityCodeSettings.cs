namespace Psi.Data.Models.ClientConfigurationModels.SmsSecurityCode
{
    public class SmsSecurityCodeSettings : SettingsBaseHelper
    {
        public SmsSecurityCodeSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mfa.SmsSecurityCode.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.Length")]
        public int SecurityCodeLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.MinutesUntilCodeExpires")]
        public int MinutesUntilCodeExpires
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.ValidSecurityCodeCharacters")]
        public string ValidSecurityCodeCharacters
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.SkipEmail")]
        public bool SkipEmail
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceDeliveryEnabled")]
        public bool VoiceDeliveryEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceMessageApiBaseUrl")]
        public string VoiceMessageApiBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceServiceConfiguration")]
        public string VoiceServiceConfiguration
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SmsProvider")]
        public string SmsProvider
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceMessageSendUsernameEnabled")]
        public bool VoiceMessageSendUsernameEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceMessageSendPasswordEnabled")]
        public bool VoiceMessageSendPasswordEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mfa.SmsSecurityCode.EncryptionKey")]
        public string EncryptionKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.MaxCodeResends")]
        public int MaxCodeResends
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.ResendCodeEnabled")]
        public bool ResendCodeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceMessageCodeDelimitingEnabled")]
        public bool VoiceMessageCodeDelimitingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.VoiceMessageCodeDelimiter")]
        public string VoiceMessageCodeDelimiter
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mfa.SmsSecurityCode.UseForEnrollmentEnabled")]
        public bool UseForEnrollmentEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}